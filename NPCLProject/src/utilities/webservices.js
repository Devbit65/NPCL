const kLoginURL = "https://myxenius.com/thirdparty/api/login"
const kRechargeCouponURL = "https://myxenius.com/thirdparty/api/recharge"
const kMessageURL = "https://myxenius.com/thirdparty/api/messages"
const kDateWiseURL = "https://myxenius.com/thirdparty/api/consumption/daily"
const kMonthWiseURL = "https://myxenius.com/thirdparty/api/consumption/monthly"
const kChangePasswordURl = "https://myxenius.com/thirdparty/api/change_password"
const kLoadSettingURL = "https://myxenius.com/thirdparty/api/config/set_load"
const kNotificationURL = "https://myxenius.com/thirdparty/api/config/set_config"
const kDisableLoadSettingsAPI = "https://myxenius.com/thirdparty/api/config/disable_load_settings"
const kForgotPassword = "https://www.myxenius.com/thirdparty/api/forget_password"
const kVerifyOTP = "https://www.myxenius.com/thirdparty/api/otp_varify"
const kResendOTP = "https://www.myxenius.com/thirdparty/api/resend_otp"
const kSetPassword = "https://www.myxenius.com/thirdparty/api/password_change"
const kRestoreAPI = "https://www.myxenius.com/thirdparty/api/restore"
const kVerifyBalance = "https://www.myxenius.com/thirdparty/api/validate_balance"
const kNotice = "https://www.myxenius.com/thirdparty/api/notice"
const kHistory = "https://www.myxenius.com/thirdparty/api/recharge_history"
const kCurrentRates = "https://myxenius.com//thirdparty/api/current_applicable_rates"
const kMonthlyBill = "https://myxenius.com//thirdparty/api/report"

import UserData from '../utilities/models/user-data'

export const fethcLogin = () => {
  var userCred = new UserData().getUserCredential()
  var req_url = kLoginURL+'?login_id='+userCred.user_id+'&password='+userCred.pswd
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
  var userCred = new UserData().getUserCredential()
  var req_url = kMessageURL+'?login_id='+userCred.user_id+'&password='+userCred.pswd
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
  var userCred = new UserData().getUserCredential()
  var req_url = kNotice+'?login_id='+userCred.user_id+'&password='+userCred.pswd
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
  var userCred = new UserData().getUserCredential()
  var req_url = kHistory+'?login_id='+userCred.user_id+'&password='+userCred.pswd
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
  var userCred = new UserData().getUserCredential()
  var req_url = kDateWiseURL+'?login_id='+userCred.user_id+'&password='+userCred.pswd+'&month='+month+'&year='+year
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
  var userCred = new UserData().getUserCredential()
  var req_url = kMonthWiseURL+'?login_id='+userCred.user_id+'&password='+userCred.pswd+'&year='+year
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
  var userCred = new UserData().getUserCredential()
  var req_url = kMonthWiseURL+'?login_id='+userCred.user_id+'&password='+userCred.pswd+'&month='+month+'&year='+year
  return fetch(req_url)
    .then((response) => response.json())
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
}