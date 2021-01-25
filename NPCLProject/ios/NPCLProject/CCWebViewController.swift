//
//  CCWebViewController.swift
//  CCIntegrationKit_Swift
//
//  Created by Ram Mhapasekar on 7/4/17.
//  Copyright © 2017 Ram Mhapasekar. All rights reserved.
//

import UIKit
import Foundation

//new keys to be added
let BILLING_NAME = "billing_name";
let BILLING_ADDRESS = "billing_address";
let BILLING_CITY = "billing_city";
let BILLING_STATE = "billing_state";
let BILLING_COUNTRY = "billing_country";
let BILLING_ZIP = "billing_zip";
let BILLING_TEL = "billing_tel";
let BILLING_EMAIL = "billing_email";
let DELIVERY_NAME = "delivery_name";
let DELIVERY_ADDRESS = "delivery_address";
let DELIVERY_CITY = "delivery_city";
let DELIVERY_STATE = "delivery_state";
let DELIVERY_COUNTRY = "delivery_country";
let DELIVERY_ZIP = "delivery_zip";
let DELIVERY_TEL = "delivery_tel";
let DELIVERY_EMAIL = "delivery_email";
let MERCHANT_PARAM1 = "merchant_param1";
let MERCHANT_PARAM2 = "merchant_param2";
let MERCHANT_PARAM3 = "merchant_param3";
let MERCHANT_PARAM4 = "merchant_param4";
let MERCHANT_PARAM5 = "merchant_param5";
let CUSTOMER_IDENTIFIER = "customer_identifier";



//import OpenSSL

/**
 * class: CCWebViewController
 * CCWebViewController is responsible for to take all the values from the merchant and process futher for the payment
 * We will generate the RSA Key for this transaction first by using access code of the merchant and the unique order id for this transaction
 * After generating Successful RSA Key we will use that key for encrypting amount and currency and the encrypted details will use for intiate the transaction
 * Once the transaction is done  we will pass the transaction result to the next page (ie CCResultViewController here)
 */


class CCWebViewController: UIViewController,UIWebViewDelegate {
    
    var accessCode = String()
    var merchantId = String()
    var orderId = String()
    var amount = String()
    var currency = String()
    var redirectUrl = String()
    var cancelUrl = String()
    var rsaKeyUrl = String()
    var rsaKeyDataStr = String()
    var rsaKey = String()
    static var statusCode = 0//zero means success or else error in encrption with rsa
    var encVal = String()
    
    //new keys to be added
    var BILLING_NAME_Val = String()
    var BILLING_ADDRESS_Val = String()
    var BILLING_CITY_Val = String()
    var BILLING_STATE_Val = String()
    var BILLING_COUNTRY_Val = String()
    var BILLING_ZIP_Val = String()
    var BILLING_TEL_Val = String()
    var BILLING_EMAIL_Val = String()
    var DELIVERY_NAME_Val = String()
    var DELIVERY_ADDRESS_Val = String()
    var DELIVERY_CITY_Val = String()
    var DELIVERY_STATE_Val = String()
    var DELIVERY_COUNTRY_Val = String()
    var DELIVERY_ZIP_Val = String()
    var DELIVERY_TEL_Val = String()
    var DELIVERY_EMAIL_Val = String()
    var MERCHANT_PARAM1_Val = String()
    var MERCHANT_PARAM2_Val = String()
    var MERCHANT_PARAM3_Val = String()
    var MERCHANT_PARAM4_Val = String()
    var MERCHANT_PARAM5_Val = String()
    var CUSTOMER_IDENTIFIER_Val = String()
    
    
    lazy var viewWeb: UIWebView = {
        let webView = UIWebView()
        webView.backgroundColor = .white
        webView.translatesAutoresizingMaskIntoConstraints = false
        webView.delegate = self
        webView.scalesPageToFit = true
        webView.contentMode = UIView.ContentMode.scaleAspectFill
        return webView
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white
        setupWebView()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        
        //fill the required values to be passes to the payment web page
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        
        if ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "consumer_name") as? String) != nil{
            BILLING_NAME_Val = ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "consumer_name") as? String)!
        }
        
        
        if ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "flat_number") as? String) != nil{
            BILLING_ADDRESS_Val = ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "flat_number") as? String)!
        }
        
        if ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "site_city")) != nil{
            BILLING_CITY_Val = ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "site_city") as? String)!
        }
        
        if ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "site_state") as? String) != nil{
             BILLING_STATE_Val = ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "site_state") as? String)!
        }
       
        if ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "site_country") as? String) != nil{
            BILLING_COUNTRY_Val = ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "site_country") as? String)!
        }
        
        if ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "site_zipcode") as? String) != nil{
            BILLING_ZIP_Val = ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "site_zipcode") as? String)!
        }
        
        if ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "consumer_mobile_no") as? String) != nil{
            BILLING_TEL_Val = ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "consumer_mobile_no") as? String)!
        }
        
        if ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "consumer_email_id") as? String) != nil{
            BILLING_EMAIL_Val = ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "consumer_email_id") as? String)!
        }
        
        if ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "consumer_name" ) as? String) != nil{
            DELIVERY_NAME_Val = ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "consumer_name" ) as? String)!
        }
        
        if ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "flat_number") as? String) != nil{
            DELIVERY_ADDRESS_Val = ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "flat_number") as? String)!
        }
        
        if ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "site_city") as? String) != nil{
            DELIVERY_CITY_Val = ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "site_city") as? String)!
        }
        
        if ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "site_state") as? String) != nil{
            DELIVERY_STATE_Val = ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "site_state") as? String)!
        }
        
        if ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "site_country") as? String) != nil {
            DELIVERY_COUNTRY_Val = ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "site_country") as? String)!
        }
        
        if ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "site_zipcode") as? String) != nil {
            DELIVERY_ZIP_Val = ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "site_zipcode") as? String)!
        }
        
        if ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "consumer_mobile_no") as? String) != nil {
            DELIVERY_TEL_Val = ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "consumer_mobile_no") as? String)!
        }
        
        if ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "consumer_email_id") as? String) != nil {
            DELIVERY_EMAIL_Val = ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "consumer_email_id") as? String)!
        }
        
        MERCHANT_PARAM1_Val = "Radius Synergies Int. Pvt. ltd."
        
        if ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "location_id") as? String) != nil {
            MERCHANT_PARAM2_Val = ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "location_id") as? String)! // login id of user is location id
        }
        
        if ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "flat_number") as? String) != nil {
            MERCHANT_PARAM3_Val = ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "flat_number") as? String)!
        }
        
        if ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "site_id") as? String) != nil {
            MERCHANT_PARAM4_Val = ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "site_id") as? String)!
        }
        
        if ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "site_code") as? String) != nil && ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "site_name") as? String) != nil {
            MERCHANT_PARAM5_Val = ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "site_code") as? String)! + ":" + ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "site_name") as? String)!
        }
        
        if ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "site_code") as? String) != nil && ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "flat_number") as? String) != nil {
            CUSTOMER_IDENTIFIER_Val = ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "site_code") as? String)! + ":" + ((appDelegate.billDataDict.object(forKey: "resource") as? NSDictionary)?.value(forKey: "flat_number") as? String)!
        }
        
        
        
        
        /**
         * In viewWillAppear we will call gettingRsaKey method to generate RSA Key for the transaction and use the same to encrypt data
         */
        
        
        
        self.gettingRsaKey(){
            (success, object) -> () in
            DispatchQueue.main.sync {
                if success {
                    self.encyptCardDetails(data: object as! Data)
                }
                else{
                    self.displayAlert(msg: object as! String)
                }
            }
        }
    }
    
    override func viewDidAppear(_ animated: Bool) {
        LoadingOverlay.shared.showOverlay(view: self.view)
    }
    
    //MARK:
    //MARK: setupWebView
    
    private func setupWebView(){
        
        //setup webview
        view.addSubview(viewWeb)
        if #available(iOS 11.0, *) {
            viewWeb.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor).isActive = true
            viewWeb.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor).isActive = true
        } else {
            // Fallback on earlier versions
            viewWeb.topAnchor.constraint(equalTo: view.topAnchor).isActive = true
            viewWeb.bottomAnchor.constraint(equalTo: view.bottomAnchor).isActive = true
        }
        
        viewWeb.leftAnchor.constraint(equalTo: view.leftAnchor).isActive = true
        
        viewWeb.rightAnchor.constraint(equalTo: view.rightAnchor).isActive = true
        
        _ = [viewWeb .setContentCompressionResistancePriority(1000, for: NSLayoutConstraint.Axis.vertical)]
    }
    
    
    //MARK:
    //MARK: Get RsaKey & encrypt card details
    
    /**
     * In this method we will generate RSA Key from the URL for this we will pass order id and the access code as the request parameter
     * after the successful key generation we'll pass the data to the request handler using complition block
     */
    
    private func gettingRsaKey(completion: @escaping (_ success: Bool, _ object: AnyObject?) -> ()){
        
        let serialQueue = DispatchQueue(label: "serialQueue", qos: .userInitiated)
        
        serialQueue.sync {
            self.rsaKeyDataStr = "access_code=\(self.accessCode)&order_id=\(self.orderId)"
            //            let requestData = self.rsaKeyDataStr.data(using: String.Encoding.utf8, allowLossyConversion: true)
            
            let requestData = self.rsaKeyDataStr.data(using: String.Encoding.utf8)
            
            guard let urlFromString = URL(string: self.rsaKeyUrl) else{
                return
            }
            var urlRequest = URLRequest(url: urlFromString)
            urlRequest.setValue("application/x-www-form-urlencoded", forHTTPHeaderField: "content-type")
            urlRequest.httpMethod = "POST"
            urlRequest.httpBody = requestData
            
            let session = URLSession(configuration: URLSessionConfiguration.default)
            print("session",session)
            
            
            session.dataTask(with: urlRequest as URLRequest) {
                (data, response, error) -> Void in
                
                if let response = response as? HTTPURLResponse, 200...299 ~= response.statusCode{
                    
                    guard let data = data else{
                        print("No value for data")
                        completion(false, "Not proper data for RSA Key" as AnyObject?)
                        return
                    }
                    print("data :: ",data)
                    completion(true, data as AnyObject?)
                }
                else{
                    completion(false, "Unable to generate RSA Key please check" as AnyObject?)
                }
                }.resume()
        }
    }
    
    var request: NSMutableURLRequest?
    
    /**
     * encyptCardDetails method we will use the rsa key to encrypt amount and currency and onece the encryption is done we will pass this encrypted data to the initTrans to initiate payment
     */
    
    private func encyptCardDetails(data: Data){
        guard let rsaKeytemp = String(bytes: data, encoding: String.Encoding.ascii) else{
            print("No value for rsaKeyTemp")
            return
        }
        rsaKey = rsaKeytemp
        rsaKey = self.rsaKey.trimmingCharacters(in: CharacterSet.newlines)
        rsaKey =  "-----BEGIN PUBLIC KEY-----\n\(self.rsaKey)\n-----END PUBLIC KEY-----\n"
        print("rsaKey :: ",rsaKey)
        
        let myRequestString = "amount=\(amount)&currency=\(currency)"
        
        let ccTool = CCTool()
        var encVal = ccTool.encryptRSA(myRequestString, key: rsaKey)
        
        encVal = CFURLCreateStringByAddingPercentEscapes(
            nil,
            encVal! as CFString,
            nil,
            "!*'();:@&=+$,/?%#[]" as CFString,
            CFStringBuiltInEncodings.UTF8.rawValue) as String?
        CCWebViewController.statusCode = 0
        
        //Preparing for webview call
        if CCWebViewController.statusCode == 0{
            //let urlAsString = "https://secure.ccavenue.com/transaction/initTrans"
           let urlAsString = "https://secure.ccavenue.com/transaction/initTrans"
            let encryptedStr = "merchant_id=\(merchantId)&order_id=\(orderId)&redirect_url=\(redirectUrl)&cancel_url=\(cancelUrl)&enc_val=\(encVal!)&access_code=\(accessCode)&\(BILLING_NAME)=\(BILLING_NAME_Val)&\(BILLING_ADDRESS)=\(BILLING_ADDRESS_Val)&\(BILLING_CITY)=\(BILLING_CITY_Val)&\(BILLING_STATE)=\(BILLING_STATE_Val)&\(BILLING_COUNTRY)=\(BILLING_COUNTRY_Val)&\(BILLING_ZIP)=\(BILLING_ZIP_Val)&\(BILLING_TEL)=\(BILLING_TEL_Val)&\(BILLING_EMAIL)=\(BILLING_EMAIL_Val)&\(DELIVERY_NAME)=\(DELIVERY_NAME_Val)&\(DELIVERY_ADDRESS)=\(DELIVERY_ADDRESS_Val)&\(DELIVERY_CITY)=\(DELIVERY_CITY_Val)&\(DELIVERY_STATE)=\(DELIVERY_STATE_Val)&\(DELIVERY_COUNTRY)=\(DELIVERY_COUNTRY_Val)&\(DELIVERY_ZIP)=\(DELIVERY_ZIP_Val)&\(DELIVERY_TEL)=\(DELIVERY_TEL_Val)&\(DELIVERY_EMAIL)=\(DELIVERY_EMAIL_Val)&\(MERCHANT_PARAM1)=\(MERCHANT_PARAM1_Val)&\(MERCHANT_PARAM2)=\(MERCHANT_PARAM2_Val)&\(MERCHANT_PARAM3)=\(MERCHANT_PARAM3_Val)&\(MERCHANT_PARAM4)=\(MERCHANT_PARAM4_Val)&\(MERCHANT_PARAM5)=\(MERCHANT_PARAM5_Val)&\(CUSTOMER_IDENTIFIER)=\(CUSTOMER_IDENTIFIER_Val)"
            
            print("encValue :: \(encVal ?? "No val for encVal")")
            
            print("encryptedStr :: ",encryptedStr)
            let myRequestData = encryptedStr.data(using: String.Encoding.utf8)
           // request = NSMutableURLRequest(url: URL(string: urlAsString)!)
            
            request  = NSMutableURLRequest(url: URL(string: urlAsString)! as URL, cachePolicy: NSURLRequest.CachePolicy.reloadIgnoringCacheData, timeoutInterval: 30)
            request?.setValue("application/x-www-form-urlencoded", forHTTPHeaderField: "content-type")
            request?.setValue(urlAsString, forHTTPHeaderField: "Referer")
            request?.httpMethod = "POST"
            request?.httpBody = myRequestData
            print("\n\n\nwebview :: ",request?.url as Any)
            print("\n\n\nwebview :: ",request?.description as Any)
            print("\n\n\nwebview :: ",request?.httpBody?.description as Any)
            print("\n\n\nwebview :: ",request?.allHTTPHeaderFields! as Any)
            
            let session = URLSession(configuration: URLSessionConfiguration.default)
            print("session",session)
            
            session.dataTask(with: request! as URLRequest) {
                (data, response, error) -> Void in
                
                if let response = response as? HTTPURLResponse, 200...299 ~= response.statusCode{
                    
                    guard let data = data else{
                        print("No value for data")
                        return
                    }
                    DispatchQueue.main.async {
                        self.viewWeb.loadRequest(self.request! as URLRequest)
                    }
                    print("data :: ",data)
                }
                else{
                    print("into else")
                    self.displayAlert(msg: "Unable to load webpage currently, Please try again later.")
                }
                }.resume()
            
            print(viewWeb.isLoading)
        }
        else{
            print("Unable to create requestURL")
            displayAlert(msg: "Unable to create requestURL")
        }
    }
    
    func displayAlert(msg: String){
        let alert: UIAlertController = UIAlertController(title: "ERROR", message: msg, preferredStyle: UIAlertController.Style.alert)
        let okAction = UIAlertAction(title: "OK", style: UIAlertAction.Style.default) {
            UIAlertAction in
            LoadingOverlay.shared.hideOverlayView()
            self.dismiss(animated: true, completion: nil)
        }
        alert.addAction(okAction)
        self.present(alert, animated: true, completion: nil)
    }
    
    private func encryptRSA(raw: String, key pubKey: String) {
        
    }
    
    
    //MARK:
    //MARK: WebviewDelegate Methods
    
    func webViewDidStartLoad(_ webView: UIWebView) {
        print("webViewDidStartLoad",webView.request!)
        print(viewWeb.isLoading)
        print(request?.httpBodyStream as Any)
        print(request?.httpBody as Any)
        
    }
    
    func webView(_ webView: UIWebView, didFailLoadWithError error: Error) {
        print("Failed to load  webview")
    }
    func webView(_ webView: UIWebView, shouldStartLoadWith request: URLRequest, navigationType: UIWebView.NavigationType) -> Bool {
        print("webview should start",request)
        let urlString = (request.url?.absoluteString)!
        if(urlString.contains("http://google.com")){
            self.dismiss(animated: true, completion: nil);
            return false
        }
        return true
    }
    
    func webViewDidFinishLoad(_ webView: UIWebView) {
        LoadingOverlay.shared.hideOverlayView()

        //covert the response url to the string and check for that the response url contains the redirect/cancel url if true then chceck for the transaction status and pass the response to the result controller(ie. CCResultViewController)
        let string = (webView.request?.url?.absoluteString)!
        print("String :: \(string)")
        
        if(string.contains(redirectUrl)) //("http://122.182.6.216/merchant/ccavResponseHandler.jsp"))//
        {
            print(viewWeb.isLoading)
            guard let htmlTemp:NSString = webView.stringByEvaluatingJavaScript(from: "document.documentElement.outerHTML") as NSString? else{
                print("failed to evaluate javaScript")
                return
            }
            
            let html = htmlTemp
            print("html :: ",html)
            var transStatus = "Not Known"
            
            if ((html ).range(of: "Aborted").location != NSNotFound) || ((html ).range(of: "Cancel").location != NSNotFound) {
                transStatus = "Transaction Cancelled"
                let controller: CCResultViewController = CCResultViewController()
                controller.transStatus = transStatus
                controller.objCCResultVC = self
                self.present(controller, animated: true, completion: nil)
            }
            else if ((html ).range(of: "Success").location != NSNotFound) {
//                transStatus = "Transaction Successful"
//                let controller: CCResultViewController = CCResultViewController()
//                controller.transStatus = transStatus
//                controller.objCCResultVC = self
//                self.present(controller, animated: true, completion: { _ in })
            }
            else if ((html ).range(of: "Fail").location != NSNotFound) {
                transStatus = "Transaction Failed"
                let controller: CCResultViewController = CCResultViewController()
                controller.transStatus = transStatus
                controller.objCCResultVC = self
                self.present(controller, animated: true, completion: nil)
            }
            /*
            if ((html ).range(of: "tracking_id").location != NSNotFound) && ((html ).range(of: "bin_country").location != NSNotFound) {
                if ((html ).range(of: "Aborted").location != NSNotFound) || ((html ).range(of: "Cancel").location != NSNotFound) {
                    transStatus = "Transaction Cancelled"
                    let controller: CCResultViewController = CCResultViewController()
                    controller.transStatus = transStatus
                    self.present(controller, animated: true, completion: nil)
                }
                else if ((html ).range(of: "Success").location != NSNotFound) {
                    transStatus = "Transaction Successful"
                    let controller: CCResultViewController = CCResultViewController()
                    controller.transStatus = transStatus
                    self.present(controller, animated: true, completion: { _ in })
                }
                else if ((html ).range(of: "Fail").location != NSNotFound) {
                    transStatus = "Transaction Failed"
                    let controller: CCResultViewController = CCResultViewController()
                    controller.transStatus = transStatus
                    self.present(controller, animated: true, completion: { _ in })
                } 
            }
            else{
                print("html does not contain any related data")
                displayAlert(msg: "html does not contain any related data for this transaction.")
                
            }*/
        }
        else if(string.contains(cancelUrl)){
            let controller: CCResultViewController = CCResultViewController()
            controller.transStatus = "Transaction Cancelled"
            controller.objCCResultVC = self
            self.present(controller, animated: true, completion: nil)
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}
