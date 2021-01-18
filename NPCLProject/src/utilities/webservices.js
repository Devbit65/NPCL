const kLoginURL = "/thirdparty/api/login"
const kRechargeCouponURL = "/thirdparty/api/recharge"
const kMessageURL = "/thirdparty/api/messages"
const kDateWiseURL = "/thirdparty/api/consumption/daily"
const kMonthWiseURL = "/thirdparty/api/consumption/monthly"
const kChangePasswordURl = "/thirdparty/api/change_password"
const kLoadSettingURL = "/thirdparty/api/config/set_load"
const kNotificationURL = "/thirdparty/api/config/set_config"
const kDisableLoadSettingsAPI = "/thirdparty/api/config/disable_load_settings"
const kForgotPassword = "/thirdparty/api/forget_password"
const kVerifyOTP = "/thirdparty/api/otp_varify"
const kResendOTP = "/thirdparty/api/resend_otp"
const kSetPassword = "/thirdparty/api/password_change"
const kRestoreAPI = "/thirdparty/api/restore"
const kVerifyBalance = "/thirdparty/api/validate_balance"
const kNotice = "/thirdparty/api/notice"
const kHistory = "/thirdparty/api/recharge_history"
const kCurrentRates = "/thirdparty/api/current_applicable_rates"
const kMonthlyBill = "/thirdparty/api/report"

const baseURL = "myxenius.com"

import UserData from '../utilities/models/user-data'

export const fethcLogin = () => {
  var userData = new UserData()
  var userCred = userData.getUserCredential()
  
  var url = userData.getBaseURL()
  if(url){
    url = baseURL
  }
  var req_url = 'https://'+url+kLoginURL+'?login_id='+userCred.user_id+'&password='+userCred.pswd
  return fetch(req_url)
    .then((response) => response.json())
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
};

export const fethchMessages = () => {
  var userData = new UserData()
  var userCred = userData.getUserCredential()
  
  var url = userData.getBaseURL()
  if(url){
    url = baseURL
  }
  var req_url = 'https://'+url+kMessageURL+'?login_id='+userCred.user_id+'&password='+userCred.pswd
  return fetch(req_url)
    .then((response) => response.json())
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
};

export const fethchNotice= () => {
  var userData = new UserData()
  var userCred = userData.getUserCredential()
  
  var url = userData.getBaseURL()
  if(url){
    url = baseURL
  }
  var req_url = 'https://'+url+kNotice+'?login_id='+userCred.user_id+'&password='+userCred.pswd
  return fetch(req_url)
    .then((response) => response.json())
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
};


export const fethchRechargeHistory = () => {
  var userData = new UserData()
  var userCred = userData.getUserCredential()
  
  var url = userData.getBaseURL()
  if(url){
    url = baseURL
  }
  var req_url = 'https://'+url+kHistory+'?login_id='+userCred.user_id+'&password='+userCred.pswd
  return fetch(req_url)
    .then((response) => response.json())
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
};

export const fetchDailyReport = (month, year) => {
  var userData = new UserData()
  var userCred = userData.getUserCredential()
  
  var url = userData.getBaseURL()
  if(url){
    url = baseURL
  }
  var req_url = 'https://'+url+kDateWiseURL+'?login_id='+userCred.user_id+'&password='+userCred.pswd+'&month='+month+'&year='+year
  return fetch(req_url)
    .then((response) => response.json())
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
}

export const fetchMonthlyReport = (year) => {
  var userData = new UserData()
  var userCred = userData.getUserCredential()
  
  var url = userData.getBaseURL()
  if(url){
    url = baseURL
  }
  var req_url = 'https://'+url+kMonthWiseURL+'?login_id='+userCred.user_id+'&password='+userCred.pswd+'&year='+year
  return fetch(req_url)
    .then((response) => response.json())
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
}

export const fetchMonthlyComparativeReport = (month, year) => {
  var userData = new UserData()
  var userCred = userData.getUserCredential()
  
  var url = userData.getBaseURL()
  if(url){
    url = baseURL
  }
  var req_url = 'https://'+url+kMonthWiseURL+'?login_id='+userCred.user_id+'&password='+userCred.pswd+'&month='+month+'&year='+year
  return fetch(req_url)
    .then((response) => response.json())
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
}

export const fetchCurrentApplicableRates = () => {
  var userData = new UserData()
  var userCred = userData.getUserCredential()
  
  var url = userData.getBaseURL()
  if(url){
    url = baseURL
  }
  var req_url = 'https://'+url+kCurrentRates+'?login_id='+userCred.user_id+'&password='+userCred.pswd
  return fetch(req_url)
    .then((response) => response.json())
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
};