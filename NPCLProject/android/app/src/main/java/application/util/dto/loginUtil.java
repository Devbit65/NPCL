package application.util.dto;

import org.json.JSONException;
import org.json.JSONObject;

public class loginUtil {
	private String location_no="";
	private String serial_no="";
	private String consumer_name="";
	private String KWh="";
	private String KVAh="";
	private String grid_load_sanctioned="";
	private String dg_load_sanctioned="";
	private String last_reading_updated="";
	private String grid_overload_setting="";
	private String dg_overload_setting="";
	private Double instant_R_KW;
	private Double instant_Y_KW;
	private Double instant_B_KW;
	private Double instant_R_KVA;
	private Double instant_Y_KVA;
	private Double instant_B_KVA;
	private Double instant_cum_KVA;
	private String instant_cum_KW;
	private String R_Current="";
	private String Y_Current="";
	private String B_Current="";
	private String R_Voltage="";
	private String Y_Voltage="";	
	private String B_Voltage="";
	private String R_PF="";
	private String Y_PF="";	
	private String B_PF="";
	private String mobile_no = "";
	private String email_id = "";
	private String supervisor_name = "";
	private String supervisor_contact_no = "";
	private String supervisor_email = "";
	private String support_name = "";
	private String today_consumed_KWh = "";
	private String today_consumed_KVAh = "";
	private String monthly_consumed_KWh = "";
	private String monthly_consumed_KVAh = "";
	
	private String support_contact_no = "";
	private String support_email = "";
	private int meter_type;
	private Double cumm_PF;
	private String notification_email;
	private String notification_sms;
	private String notification_app_esource;
	private String notification_app_unit_consumption;

	
	//***** Getter & Setters *****//
	
	public String getLocation_no() {
		return location_no;
	}
	public void setLocation_no(String location_no) {
		this.location_no = location_no;
	}
	public String getConsumer_name() {
		return consumer_name;
	}
	public void setConsumer_name(String consumer_name) {
		this.consumer_name = consumer_name;
	}
	public String getMobile_no() {
		return mobile_no;
	}
	public void setMobile_no(String mobile_no) {
		this.mobile_no = mobile_no;
	}
	public String getEmail_id() {
		return email_id;
	}
	public void setEmail_id(String email_id) {
		this.email_id = email_id;
	}
	public String getSupport_name() {
		return support_name;
	}
	public void setSupport_name(String support_name) {
		this.support_name = support_name;
	}
	public String getSupport_contact_no() {
		return support_contact_no;
	}
	public void setSupport_contact_no(String support_contact_no) {
		this.support_contact_no = support_contact_no;
	}
	public String getSupport_email() {
		return support_email;
	}
	public void setSupport_email(String support_email) {
		this.support_email = support_email;
	}
	public String getSupervisor_name() {
		return supervisor_name;
	}
	public void setSupervisor_name(String supervisor_name) {
		this.supervisor_name = supervisor_name;
	}
	public String getSupervisor_contact_no() {
		return supervisor_contact_no;
	}
	public void setSupervisor_contact_no(String supervisor_contact_no) {
		this.supervisor_contact_no = supervisor_contact_no;
	}
	public String getSupervisor_email() {
		return supervisor_email;
	}
	public void setSupervisor_email(String supervisor_email) {
		this.supervisor_email = supervisor_email;
	}
	public int getMeter_type() {
		return meter_type;
	}
	public void setMeter_type(int meter_type) {
		this.meter_type = meter_type;
	}
	public String getSerial_no() {
		return serial_no;
	}
	public void setSerial_no(String serial_no) {
		this.serial_no = serial_no;
	}
	public String getKWh() {
		return KWh;
	}
	public void setKWh(String KWh) {
		this.KWh = KWh;
	}
	public String getKVAh() {
		return KVAh;
	}	
	public void setKVAh(String KVAh) {
		this.KVAh = KVAh;
	}
	public String getGrid_load_sanctioned() {
		return grid_load_sanctioned;
	}
	public void setGrid_load_sanctioned(String grid_load_sanctioned) {
		this.grid_load_sanctioned = grid_load_sanctioned;
	}
	public String getDg_load_sanctioned() {
		return dg_load_sanctioned;
	}
	public void setDg_load_sanctioned(String dg_load_sanctioned) {
		this.dg_load_sanctioned = dg_load_sanctioned;
	}
	public String getLast_reading_updated() {
		return last_reading_updated;
	}
	public void setLast_reading_updated(String last_reading_updated) {
		this.last_reading_updated = last_reading_updated;
	}
	public String getGrid_overload_setting() {
		return grid_overload_setting;
	}
	public void setGrid_overload_setting(String grid_overload_setting) {
		this.grid_overload_setting = grid_overload_setting;
	}
	public String getDg_overload_setting() {
		return dg_overload_setting;
	}
	public void setDg_overload_setting(String dg_overload_setting) {
		this.dg_overload_setting = dg_overload_setting;
	}
	public Double getInstant_R_KW() {
		return instant_R_KW;
	}
	public void setInstant_R_KW(Double instant_R_KW) {
		this.instant_R_KW = instant_R_KW;
	}
	public Double getInstant_Y_KW() {
		return instant_Y_KW;
	}
	public void setInstant_Y_KW(Double instant_Y_KW) {
		this.instant_Y_KW = instant_Y_KW;
	}
	public Double getInstant_B_KW() {
		return instant_B_KW;
	}
	public void setInstant_B_KW(Double instant_B_KW) {
		this.instant_B_KW = instant_B_KW;
	}
	public Double getInstant_R_KVA() {
		return instant_R_KVA;
	}
	public void setInstant_R_KVA(Double instant_R_KVA) {
		this.instant_R_KVA = instant_R_KVA;
	}
	public Double getInstant_Y_KVA() {
		return instant_Y_KVA;
	}
	public void setInstant_Y_KVA(Double instant_Y_KVA) {
		this.instant_Y_KVA = instant_Y_KVA;
	}
	public Double getInstant_B_KVA() {
		return instant_B_KVA;
	}
	public void setInstant_B_KVA(Double instant_B_KVA) {
		this.instant_B_KVA = instant_B_KVA;
	}
	public Double getInstant_cum_KVA() {
		return instant_cum_KVA;
	}
	public void setInstant_cum_KVA(Double instant_cum_KVA) {
		this.instant_cum_KVA = instant_cum_KVA;
	}
	public String getInstant_cum_KW() {
		return instant_cum_KW;
	}
	public void setInstant_cum_KW(String instant_cum_KW) {
		this.instant_cum_KW = instant_cum_KW;
	}
	public String getR_Current() {
		return R_Current;
	}
	public void setR_Current(String R_Current) {
		this.R_Current = R_Current;
	}
	public String getY_Current() {
		return Y_Current;
	}
	public void setY_Current(String Y_Current) {
		this.Y_Current = Y_Current;
	}
	public String getB_Current() {
		return B_Current;
	}
	public void setB_Current(String B_Current) {
		this.B_Current = B_Current;
	}	
	public String getR_Voltage() {
		return R_Voltage;
	}
	public void setR_Voltage(String R_Voltage) {
		this.R_Voltage = R_Voltage;
	}
	public String getY_Voltage() {
		return Y_Voltage;
	}
	public void setY_Voltage(String Y_Voltage) {
		this.Y_Voltage = Y_Voltage;
	}
	public String getB_Voltage() {
		return B_Voltage;
	}
	public void setB_Voltage(String B_Voltage) {
		this.B_Voltage = B_Voltage;
	}
	public String getR_PF() {
		return R_PF;
	}
	public void setR_PF(String R_PF) {
		this.R_PF = R_PF;
	}
	public String getY_PF() {
		return Y_PF;
	}
	public void setY_PF(String Y_PF) {
		this.Y_PF = Y_PF;
	}
	public String getB_PF() {
		return B_PF;
	}
	public void setB_PF(String B_PF) {
		this.B_PF = B_PF;
	}
	public Double getCumm_PF() {
		return cumm_PF;
	}
	public void setCumm_PF(Double cumm_PF) {
		this.cumm_PF = cumm_PF;
	}	
	public String getToday_consumed_KWh() {
		return today_consumed_KWh;
	}
	public void setToday_consumed_KWh(String today_consumed_KWh) {
		this.today_consumed_KWh = today_consumed_KWh;
	}
	public String getToday_consumed_KVAh() {
		return today_consumed_KVAh;
	}
	public void setToday_consumed_KVAh(String today_consumed_KVAh) {
		this.today_consumed_KVAh = today_consumed_KVAh;
	}
	public String getMonthly_consumed_KWh() {
		return monthly_consumed_KWh;
	}
	public void setMonthly_consumed_KWh(String monthly_consumed_KWh) {
		this.monthly_consumed_KWh = monthly_consumed_KWh;
	}
	public String getMonthly_consumed_KVAh() {
		return monthly_consumed_KVAh;
	}
	public void setMonthly_consumed_KVAh(String monthly_consumed_KVAh) {
		this.monthly_consumed_KVAh = monthly_consumed_KVAh;
	}
	public String getNotification_email() {
		return notification_email;
	}
	public void setNotification_email(String notification_email) {
		this.notification_email = notification_email;
	}
	public String getNotification_sms() {
		return notification_sms;
	}
	public void setNotification_sms(String notification_sms) {
		this.notification_sms = notification_sms;
	}
	public String getNotification_app_esource() {
		return notification_app_esource;
	}
	public void setNotification_app_esource(String notification_app_esource) {
		this.notification_app_esource = notification_app_esource;
	}
	public String getNotification_app_unit_consumption() {
		return notification_app_unit_consumption;
	}
	public void setNotification_app_unit_consumption(String notification_app_unit_consumption) {
		this.notification_app_unit_consumption = notification_app_unit_consumption;
	}
		//***** Method *****//
	
	public void convertJSON2Resource(JSONObject obj) {
		System.out.println(obj);
		try {
			if (obj.get("location_no") != null) {
				setLocation_no(obj.getString("location_no"));
			}
			if (obj.get("consumer_name") != null) {
				setConsumer_name(obj.getString("consumer_name"));
			}
			if (obj.get("mobile_no") != null) {
				setMobile_no(obj.getString("mobile_no"));
			}
			if (obj.get("email_id") != null) {
				setEmail_id(obj.getString("email_id"));
			}
			if (obj.get("supervisor_name") != null) {
				setSupervisor_name(obj.getString("supervisor_name"));
			}
			if (obj.get("supervisor_contact_no") != null) {
				setSupervisor_contact_no(obj.getString("supervisor_contact_no"));
			}
			if (obj.get("supervisor_email_id") != null) {
				setSupervisor_email(obj.getString("supervisor_email_id"));
			}
			if (obj.get("support_concern_name") != null) {
				setSupport_name(obj.getString("support_concern_name"));
			}
			if (obj.get("support_contact_no") != null) {
				setSupport_contact_no(obj.getString("support_contact_no"));
			}
			if (obj.get("support_emailId") != null) {
				setSupport_email(obj.getString("support_emailId"));
			}	
			if (obj.get("meter_type") != null) {
				setMeter_type(Integer.parseInt((obj.getString("meter_type"))));
			}
			if (obj.get("KWh") != null) {
				setKWh(obj.getString("KWh"));
			}
			if (obj.get("KVAh") != null) {
				setKVAh(obj.getString("KVAh"));
			}
			if (obj.get("serial_no") != null) {
				setSerial_no(obj.getString("serial_no"));
			}
			if (obj.get("grid_load_sanctioned") != null) {
				setGrid_load_sanctioned(obj.getString("grid_load_sanctioned"));
			}
			if (obj.get("dg_load_sanctioned") != null) {
				setDg_load_sanctioned(obj.getString("dg_load_sanctioned"));
			}
			if (obj.get("last_reading_updated") != null) {
				setLast_reading_updated(obj.getString("last_reading_updated"));
			}
			if (obj.get("grid_overload_setting") != null) {
				setGrid_overload_setting(obj.getString("grid_overload_setting"));
			}
			if (obj.get("dg_overload_setting") != null) {
				setDg_overload_setting(obj.getString("dg_overload_setting"));
			}
			if (obj.get("instant_R_KW") != null) {
				setInstant_R_KW(Double.parseDouble(obj.getString("instant_R_KW")));
			}
			if (obj.get("instant_Y_KW") != null) {
				setInstant_Y_KW(Double.parseDouble(obj.getString("instant_Y_KW")));
			}
			if (obj.get("instant_B_KW") != null) {
				setInstant_B_KW(Double.parseDouble(obj.getString("instant_B_KW")));
			}
			if (obj.get("instant_R_KVA") != null) {
				setInstant_R_KVA(Double.parseDouble(obj.getString("instant_R_KVA")));
			}			
			if (obj.get("instant_Y_KVA") != null) {
				setInstant_Y_KVA(Double.parseDouble(obj.getString("instant_Y_KVA")));
			}
			if (obj.get("instant_B_KVA") != null) {
				setInstant_B_KVA(Double.parseDouble(obj.getString("instant_B_KVA")));
			}
			if (obj.get("instant_cum_KVA") != null) {
				setInstant_cum_KVA(Double.parseDouble(obj.getString("instant_cum_KVA")));
			}
			if (obj.get("instant_cum_KW") != null) {
				setInstant_cum_KW(obj.getString("instant_cum_KW"));
			}
			if (obj.get("R_Current") != null) {
				setR_Current(obj.getString("R_Current"));
			}
			if (obj.get("Y_Current") != null) {
				setY_Current(obj.getString("Y_Current"));
			}
			if (obj.get("B_Current") != null) {
				setB_Current(obj.getString("B_Current"));
			}
			if (obj.get("R_Voltage") != null) {
				setR_Voltage(obj.getString("R_Voltage"));
			}
			if (obj.get("Y_Voltage") != null) {
				setY_Voltage(obj.getString("Y_Voltage"));
			}
			if (obj.get("B_Voltage") != null) {
				setB_Voltage(obj.getString("B_Voltage"));
			}
			if (obj.get("R_PF") != null) {
				setR_PF(obj.getString("R_PF"));
			}
			if (obj.get("Y_PF") != null) {
				setY_PF(obj.getString("Y_PF"));
			}
			if (obj.get("B_PF") != null) {
				setB_PF(obj.getString("B_PF"));
			}
			if (obj.get("cumm_PF") != null) {
				setCumm_PF(Double.parseDouble(obj.getString("cumm_PF")));
			}
			if (obj.get("notification_email") != null) {
				setNotification_email(obj.getString("notification_email"));
			}
			if (obj.get("notification_sms") != null) {
				setNotification_sms(obj.getString("notification_sms"));
			}
			if (obj.get("notification_app_esource") != null) {
				setNotification_app_esource(obj.getString("notification_app_esource"));
			}
			if (obj.get("notification_app_unit_consumption") != null) {
				setNotification_app_unit_consumption(obj.getString("notification_app_unit_consumption"));
			}

		} catch (JSONException e) {
			e.printStackTrace();
		}
	}
	
	public void convertJSON2DailyResouce(JSONObject obj) {
		try {
			if (obj.get("consumed_KWh") != null) {
				setToday_consumed_KWh(obj.getString("consumed_KWh"));
			}
			if (obj.get("consumed_KVAh") != null) {
				setToday_consumed_KVAh(obj.getString("consumed_KVAh"));
			}
			
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}
	
	public void convertJSON2MonthlyResouce(JSONObject obj) {
		try {
			if (obj.get("consumed_KWh") != null) {
				setMonthly_consumed_KWh(obj.getString("consumed_KWh"));
			}
			if (obj.get("consumed_KVAh") != null) {
				setMonthly_consumed_KVAh(obj.getString("consumed_KVAh"));
			}
			
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}
	
}
