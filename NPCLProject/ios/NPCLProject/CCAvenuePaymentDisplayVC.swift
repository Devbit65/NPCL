//
//  CCAvenuePaymentDisplayVC.swift
//  Xenius
//
//  Created by Chauhan, Pankaj A. on 07/11/19.
//  Copyright © 2019 Synergy. All rights reserved.
//

import Foundation
import UIKit


@objc(CCAvenuePaymentDisplayVC)
class CCAvenuePaymentDisplayVC: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    @objc func goBackToPreviousController(){
        self.navigationController?.popViewController(animated: true);
    }
    
    
   // call api
    
    
  @objc func openPaymentView(_ hostURL:String, userData: Dictionary<String, Any>, netAmount: String, cred:Dictionary<String, String>) -> Void {
        let userId = cred["user_id"]
        let pswd = cred["pswd"]
        var urlStr = hostURL+"/thirdparty/api/getOrderID?login_id=" + userId! + "&password=" + pswd! + "&amount="
        urlStr = urlStr + netAmount

        let url = URL(string: urlStr)!
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        request.timeoutInterval = 30
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue("application/json", forHTTPHeaderField: "Accept")

        if !true {
            let alertController = UIAlertController(title: "Xenius", message: "Please check you internet connection", preferredStyle: UIAlertController.Style.alert)

            let okAction = UIAlertAction(title: "OK", style: UIAlertAction.Style.default)
            {
                (result : UIAlertAction) -> Void in
            }
            alertController.addAction(okAction)
            self.present(alertController, animated: true, completion: nil)
            return;
        }


        let task = URLSession.shared.dataTask(with: request) { data, response, error in

            DispatchQueue.main.async {
                guard let data = data, error == nil else {
                    return
                }

                do{
                    let jsonResult: NSDictionary! = try JSONSerialization.jsonObject(with: data, options: JSONSerialization.ReadingOptions.mutableContainers) as? NSDictionary

                    print("response from server",jsonResult.value(forKey: "order_id") ?? "")

                    let controller:CCWebViewController = CCWebViewController()
                    controller.accessCode = "AVIK82FL12AJ36KIJA".trimmingCharacters(in: .whitespacesAndNewlines)
                    controller.merchantId = "200641".trimmingCharacters(in: .whitespacesAndNewlines)
                    controller.amount = netAmount.trimmingCharacters(in: .whitespacesAndNewlines)
                  
                    controller.userData = userData
                    controller.currency = "INR"
                    controller.orderId = (jsonResult.value(forKey: "order_id") as! String).trimmingCharacters(in: .whitespacesAndNewlines)
                    controller.redirectUrl = "https://myxenius.com/Pg_responseController/responseMobileAPP/success".trimmingCharacters(in: .whitespacesAndNewlines)
                    controller.cancelUrl = "https://myxenius.com/Pg_responseController/responseMobileAPP/cancel".trimmingCharacters(in: .whitespacesAndNewlines)
                    controller.rsaKeyUrl = "https://myxenius.com/pg/android_response_handler/GetRSA.php".trimmingCharacters(in: .whitespacesAndNewlines)
                  
                    let resourceValue = jsonResult.value(forKey: "resource") as! NSDictionary
                    var KeyValueFromResponse : String = "";
                    for (key, value) in  resourceValue{
                      var valueForKey : String = "";
                      if value as? String != nil {
                        valueForKey = (value as! String).trimmingCharacters(in: .whitespacesAndNewlines);
                        valueForKey = valueForKey.trimmingCharacters(in: .punctuationCharacters);
                        
                      }
                      
                      let keyObj : String = key as! String;
                      if keyObj.caseInsensitiveCompare("billing_address") == .orderedSame || keyObj.caseInsensitiveCompare("delivery_address") == .orderedSame {
                        valueForKey = (userData["flat_number"]as? String) ?? ""
                      }
                      else if keyObj.caseInsensitiveCompare("amount") == .orderedSame  {
                        valueForKey = netAmount.trimmingCharacters(in: .whitespacesAndNewlines)
                      }
                      else if keyObj.caseInsensitiveCompare("tid") == .orderedSame {
                        continue;
                      }
                      KeyValueFromResponse = "\(KeyValueFromResponse)&\(key)=\(valueForKey)"
                        
                    }

                    controller.KeyValueFromResponse = KeyValueFromResponse
                  
                    //self.navigationController?.pushViewController(controller, animated: false)
//                    self.present(controller, animated: true, completion: nil)
                    let appDelegate = UIApplication.shared.delegate as! AppDelegate
                    appDelegate.window.rootViewController?.present(controller, animated: true, completion: nil)
                    // Do something

//                    self.viewActivityIndicator.stopAnimating()
                }
                catch let JSONError as NSError {
                    print("\(JSONError)")
//                    self.viewActivityIndicator.stopAnimating()

                    let alertController = UIAlertController(title: "Xenius", message: "Please retry it again later", preferredStyle: UIAlertController.Style.alert)

                    let okAction = UIAlertAction(title: "OK", style: UIAlertAction.Style.default)
                    {
                        (result : UIAlertAction) -> Void in
                    }
                    alertController.addAction(okAction)
                    self.present(alertController, animated: true, completion: nil)

                }
            }
         }
        task.resume()

    }
}


//public static final String RSA_KEY_URL = "https://vapt.myxenius.com/pg/ios_response_handler/GetRSA.php";
//public static final String REDIRECT_URL = "https://vapt.myxenius.com/Pg_responseController/responseMobileAPP/success";
//public static final String CANCEL_URL = "https://vapt.myxenius.com/Pg_responseController/responseMobileAPP/cancel";
//public static final String RSA_KEY_URL = "https://myxenius.com/pg/android_response_handler/GetRSA.php";
//public static final String REDIRECT_URL = "https://myxenius.com/Pg_responseController/responseMobileAPP/success";
//public static final String CANCEL_URL = "https://myxenius.com/Pg_responseController/responseMobileAPP/cancel";
