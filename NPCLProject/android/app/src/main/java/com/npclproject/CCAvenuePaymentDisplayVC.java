package com.npclproject;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import application.utilities.Util;
import utility.AvenuesParams;
import utility.Constants;

public class CCAvenuePaymentDisplayVC extends ReactContextBaseJavaModule {

    public CCAvenuePaymentDisplayVC(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "CCAvenuePaymentDisplayVC";
    }

    @ReactMethod
    public void openPaymentView(String hostURL, ReadableMap userData, String netAmount, ReadableMap cred) {
        ReactApplicationContext context = getReactApplicationContext();
        try {
            String userId = cred.getString("user_id");
            String pswd = cred.getString("pswd");

            String d = Util.getdata(hostURL+"/thirdparty/api/getOrderID?login_id="+userId+"&password="+pswd+"&amount="+netAmount);

            JSONObject reader = new JSONObject(d);
            String orderIDD = "0";

            int rc = reader.getInt("rc");
            if (rc == 0) {
                orderIDD = reader.getString("order_id") != null ? reader.getString("order_id") : "";

                String BILLING_NAME_Val = userData.getString("consumer_name") != null ? userData.getString("consumer_name") : "";
                String BILLING_ADDRESS_Val = userData.getString("flat_number") != null ? userData.getString("flat_number") : "";
                String BILLING_CITY_Val = userData.getString("site_city") != null ? userData.getString("site_city") : "";
                String BILLING_STATE_Val = userData.getString("site_state") != null ? userData.getString("site_state") : "";
                String BILLING_COUNTRY_Val = userData.getString("site_country") != null ? userData.getString("site_country") : "";
                String BILLING_ZIP_Val = userData.getString("site_zipcode") != null ? userData.getString("site_zipcode") : "";
                String BILLING_TEL_Val = userData.getString("consumer_mobile_no") != null ? userData.getString("consumer_mobile_no") : "";
                String BILLING_EMAIL_Val = userData.getString("consumer_email_id") != null ? userData.getString("consumer_email_id") : "";
                String DELIVERY_NAME_Val = userData.getString("consumer_name") != null ? userData.getString("consumer_name") : "";

                String DELIVERY_ADDRESS_Val = userData.getString("flat_number") != null ? userData.getString("flat_number") : "";
                String DELIVERY_CITY_Val = userData.getString("site_city") != null ? userData.getString("site_city") : "";
                String DELIVERY_STATE_Val = userData.getString("site_state") != null ? userData.getString("site_state") : "";
                String DELIVERY_COUNTRY_Val = userData.getString("site_country") != null ? userData.getString("site_country") : "";
                String DELIVERY_ZIP_Val = userData.getString("site_zipcode") != null ? userData.getString("site_zipcode") : "";
                String DELIVERY_TEL_Val = userData.getString("consumer_mobile_no") != null ? userData.getString("consumer_mobile_no") : "";
                String DELIVERY_EMAIL_Val = userData.getString("consumer_email_id") != null ? userData.getString("consumer_email_id") : "";

                String MERCHANT_PARAM1_Val = "Radius Synergies Int. Pvt. ltd.";
                String MERCHANT_PARAM2_Val = userData.getString("location_id") != null ? userData.getString("location_id") : "";
                String MERCHANT_PARAM3_Val = userData.getString("flat_number") != null ? userData.getString("flat_number") : "";
                String MERCHANT_PARAM4_Val = userData.getString("site_id") != null ? userData.getString("site_id") : "";

                String siteCode = userData.getString("site_code") != null ? userData.getString("site_code") : "";
                String siteName = userData.getString("site_name") != null ? userData.getString("site_name") : "";
                String flatNumber = userData.getString("flat_number") != null ? userData.getString("flat_number") : "";

                String MERCHANT_PARAM5_Val = (siteCode + ":" + siteName);
                String CUSTOMER_IDENTIFIER_Val = (siteCode + ":" + flatNumber);

                Intent intent = new Intent(getReactApplicationContext(), WebViewActivity.class);
                JSONObject resourceObject = new JSONObject(reader.getString ("resource"));
                JSONArray keys = resourceObject.names ();

                for (int i = 0; i < keys.length (); i++) {

                    String key = keys.getString (i);
                    String value = resourceObject.getString (key) != null ? resourceObject.getString (key) : "";;
                    if(key.toString().equals("billing_address") || key.toString().equals("delivery_address")) {
                        value = BILLING_ADDRESS_Val;
                    }
                    else if(key.toString().equals("amount")) {
                        value = value.toString().trim();
                    }
                    intent.putExtra(key, value);
                }

                intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                intent.addCategory(Intent.CATEGORY_HOME);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

                intent.putExtra(AvenuesParams.ACCESS_CODE, Constants.ACCESS_CODE);
                intent.putExtra(AvenuesParams.MERCHANT_ID, Constants.MERCHANT_ID);
                intent.putExtra(AvenuesParams.CURRENCY, Constants.CURRENCY);
//                intent.putExtra(AvenuesParams.ORDER_ID, orderIDD);
//                intent.putExtra(AvenuesParams.AMOUNT, netAmount.toString().trim());
//
//                intent.putExtra(AvenuesParams.BILLING_NAME, BILLING_NAME_Val);
//                intent.putExtra(AvenuesParams.BILLING_ADDRESS, BILLING_ADDRESS_Val);
//                intent.putExtra(AvenuesParams.BILLING_CITY, BILLING_CITY_Val);
//                intent.putExtra(AvenuesParams.BILLING_STATE, BILLING_STATE_Val);
//                intent.putExtra(AvenuesParams.BILLING_COUNTRY, BILLING_COUNTRY_Val);
//                intent.putExtra(AvenuesParams.BILLING_ZIP, BILLING_ZIP_Val);
//                intent.putExtra(AvenuesParams.BILLING_TEL, BILLING_TEL_Val);
//                intent.putExtra(AvenuesParams.BILLING_EMAIL, BILLING_EMAIL_Val);
//
//                intent.putExtra(AvenuesParams.DELIVERY_NAME, DELIVERY_NAME_Val);
//                intent.putExtra(AvenuesParams.DELIVERY_ADDRESS, DELIVERY_ADDRESS_Val);
//                intent.putExtra(AvenuesParams.DELIVERY_CITY, DELIVERY_CITY_Val);
//                intent.putExtra(AvenuesParams.DELIVERY_STATE, DELIVERY_STATE_Val);
//                intent.putExtra(AvenuesParams.DELIVERY_COUNTRY, DELIVERY_COUNTRY_Val);
//                intent.putExtra(AvenuesParams.DELIVERY_ZIP, DELIVERY_ZIP_Val);
//                intent.putExtra(AvenuesParams.DELIVERY_TEL, DELIVERY_TEL_Val);
//                intent.putExtra(AvenuesParams.DELIVERY_EMAIL, DELIVERY_EMAIL_Val);
//
//                intent.putExtra(AvenuesParams.MERCHANT_PARAM1, MERCHANT_PARAM1_Val);
//                intent.putExtra(AvenuesParams.MERCHANT_PARAM2, MERCHANT_PARAM2_Val);
//                intent.putExtra(AvenuesParams.MERCHANT_PARAM3, MERCHANT_PARAM3_Val);
//                intent.putExtra(AvenuesParams.MERCHANT_PARAM4, MERCHANT_PARAM4_Val);
//                intent.putExtra(AvenuesParams.MERCHANT_PARAM5, MERCHANT_PARAM5_Val);
                intent.putExtra(AvenuesParams.CUSTOMER_IDENTIFIER, CUSTOMER_IDENTIFIER_Val);

                intent.putExtra(AvenuesParams.REDIRECT_URL, Constants.REDIRECT_URL);
                intent.putExtra(AvenuesParams.CANCEL_URL, Constants.CANCEL_URL);
                intent.putExtra(AvenuesParams.RSA_KEY_URL, Constants.RSA_KEY_URL);

                context.startActivity(intent);

            } else {
                String message = reader.getString("message");
                showToast(message);
                getCurrentActivity().finishActivity(1);
            }
        }
        catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public void showToast(String msg) {
        Toast.makeText(getReactApplicationContext(), "Toast: "+ msg, Toast.LENGTH_LONG).show();
    }

}
