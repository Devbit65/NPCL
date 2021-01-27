package application.utilities;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;
import java.util.zip.GZIPInputStream;
import java.util.zip.InflaterInputStream;

public class HttpClient {
	private String ip;
	private int port;
	private String protocol;
	private String sessionId;
	
	public HttpClient(String ip, int port) {
		this.ip = ip;
		this.port = port;
		protocol = "http";
	}

	public HttpClient(String protocol, String ip, int port) {
		this.ip = ip;
		this.port = port;
		this.protocol = protocol;
	}


	void setSessionId(HttpURLConnection httpURLConnection) {
	 String cookie = httpURLConnection.getHeaderField("Set-Cookie");
     if (cookie != null)
        cookie = cookie.substring(0, cookie.indexOf(';'));
     if (cookie != null) {
    	 int index = cookie.indexOf('=');
    	 if (index > 0) {
	    	 sessionId = cookie.substring(index+1);
    	 }
     }
	}
	
	public String post(String serverURL, Map<String, Object> map) throws Exception {
		HttpURLConnection httpURLConnection;
		StringBuilder responseStr = new StringBuilder();
		try {
			String urlstr;
			urlstr = protocol + "://" + ip + ":" + port + "/";
			urlstr = urlstr+serverURL;
			
			URL url = new URL(urlstr);
			httpURLConnection = (HttpURLConnection) url.openConnection();
			httpURLConnection.setRequestMethod("POST");
			httpURLConnection.setDoInput(true);
			httpURLConnection.setDoOutput(true);
			httpURLConnection.setUseCaches(false);
			httpURLConnection.setRequestProperty("Content-Type",
					"application/x-www-form-urlencoded");
			
			if (sessionId != null) {
				httpURLConnection.setRequestProperty("cookie", "apiKey="+sessionId); 
			}
			String request = "";
			for (Map.Entry<String, Object> entry : map.entrySet()) {
				if (entry.getValue() != null) {
					if (!request.equals(""))
						request= request+"&";
					request = request +entry.getKey()+"="+entry.getValue();
				}
			}
			
			// M16Logger.info(request, M16HttpClient.class);
			OutputStreamWriter ouput = new OutputStreamWriter(
					httpURLConnection.getOutputStream());
			ouput.write(request);
			ouput.flush();
			ouput.close();

			InputStream input = httpURLConnection.getInputStream();
			setSessionId(httpURLConnection);
			String contentEncoding = httpURLConnection.getContentEncoding();
			// get correct input stream for compressed data:
			if (contentEncoding != null) {
				if (contentEncoding.equalsIgnoreCase("gzip"))
					input = new GZIPInputStream(input); // reads 2 bytes to
														// determine GZIP
														// stream!
				else if (contentEncoding.equalsIgnoreCase("deflate"))
					input = new InflaterInputStream(input);
			}

			int numOfTotalBytesRead;
			byte[] buffer = new byte[1024];
			while ((numOfTotalBytesRead = input.read(buffer, 0, buffer.length)) != -1) {
				responseStr.append(new String(buffer, 0, numOfTotalBytesRead));
			}
			input.close();
			httpURLConnection.disconnect();
		} catch (MalformedURLException mue) {
			System.err.println("Invalid URL");
			throw new Exception("Error in Fetching Data from "+ip);
		} catch (IOException ioe) {
			System.err.println("I/O Error - " + ioe);
			throw new Exception("Error in Fetching Data from "+ip);
		} catch (Exception e) {
			System.err.println("Error - " + e);
		}
		return responseStr.toString();
	}
	
}