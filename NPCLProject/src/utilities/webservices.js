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
const kCRCRStatus = "/thirdparty/api/dr_cr"
const kEVCDLogin = "/thirdparty/ev_login"
const kEVCDStatus = "/ev_api/api/status"
const kEVCDStartService = "/ev_api/api/start"
const kEVCDStopService = "/ev_api/api/stop"
const kEVDailyConsumption = "/ev_api/api/ev_daily"
const kEVMonthlyConsumption = "/ev_api/api/ev_monthly"
const kSocialMediaURL = "/thirdparty/api/social_media_url"

const baseURL = "myxenius.com"

import { Platform } from 'react-native'
import UserData from '../utilities/models/user-data'

export const fethcLogin = (devToken) => {
  var userData = new UserData()
  var userCred = userData.getUserCredential()
  
  var url = userData.getBaseURL()
  if(!url.includes('https://')){
    url = 'https://'+url
  }
  var req_url = url+kLoginURL

  // alert("Loging with Push Notification Device Token : "+devToken)
  var reqBody = {
    "login_id" : userCred.user_id,
    "password" : userCred.pswd,
    device_token : devToken,
    device_OS : devToken === " " ? " " : Platform.OS
  }
  return fetch(req_url,{
    
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqBody), 
  })
  .then((response) => response.json())
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
};

export const fetchLoginToRefresh = () => {
  var userData = new UserData()
  var userCred = userData.getUserCredential()
  
  var url = userData.getBaseURL()
  if(!url.includes('https://')){
    url = 'https://'+url
  }
  var req_url = url+kLoginURL+'?login_id='+userCred.user_id+'&password='+userCred.pswd
  return fetch(req_url)
    .then((response) => response.json())
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
}

export const fethchMessages = () => {
  var userData = new UserData()
  var userCred = userData.getUserCredential()
  
  var url = userData.getBaseURL()
  if(!url.includes('https://')){
    url = 'https://'+url
  }
  var req_url = url+kMessageURL+'?login_id='+userCred.user_id+'&password='+userCred.pswd
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
  if(!url.includes('https://')){
    url = 'https://'+url
  }
  var req_url = url+kNotice+'?login_id='+userCred.user_id+'&password='+userCred.pswd
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
  if(!url.includes('https://')){
    url = 'https://'+url
  }
  var req_url = url+kHistory+'?login_id='+userCred.user_id+'&password='+userCred.pswd
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
  if(!url.includes('https://')){
    url = 'https://'+url
  }
  var req_url = url+kDateWiseURL+'?login_id='+userCred.user_id+'&password='+userCred.pswd+'&month='+month+'&year='+year
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
  if(!url.includes('https://')){
    url = 'https://'+url
  }
  var req_url = url+kMonthWiseURL+'?login_id='+userCred.user_id+'&password='+userCred.pswd+'&year='+year
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
  if(!url.includes('https://')){
    url = 'https://'+url
  }
  var req_url = url+kMonthWiseURL+'?login_id='+userCred.user_id+'&password='+userCred.pswd+'&month='+month+'&year='+year
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
  if(!url.includes('https://')){
    url = 'https://'+url
  }
  var req_url = url+kCurrentRates+'?login_id='+userCred.user_id+'&password='+userCred.pswd
  return fetch(req_url)
    .then((response) => response.json())
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
};

export const fetchSaveSettings = (data) => {
  var userData = new UserData()
  var userCred = userData.getUserCredential()
  
  var url = userData.getBaseURL()
  if(!url.includes('https://')){
    url = 'https://'+url
  }
  var req_url = url+kNotificationURL+'?login_id='+userCred.user_id+'&password='+userCred.pswd+'&notification_app_load='+data.notification_app_load+'&notification_app_balance='+data.notification_app_balance+'&low_bal_alert='+data.low_bal_alert+'&notification_app_esource='+data.notification_app_esource+'&notification_app_unit_consumption='+data.notification_app_unit_consumption+'&alert_daily_consumption_grid='+data.alert_daily_consumption_grid+'&alert_daily_consumption_dg='+data.alert_daily_consumption_dg+'&grid_load_alarm='+data.grid_load_alarm+'&dg_load_alarm='+data.dg_load_alarm+'&notification_app_recharge='+data.recharge_notification+'&notification_power_cut_restore='+data.power_cut_restore_notification
  return fetch(req_url)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
};


export const fetchReSendOTP = (user_id) => {
  var userData = new UserData()
  
  var url = userData.getBaseURL()
  if(!url.includes('https://')){
    url = 'https://'+url
  }
  var req_url = url+kResendOTP+'?login_id='+user_id
  return fetch(req_url)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
};

export const fetchVerifyOTP = (user_id, otp) => {
  var userData = new UserData()
  
  var url = userData.getBaseURL()
  if(!url.includes('https://')){
    url = 'https://'+url
  }
  var req_url = url+kVerifyOTP+'?login_id='+user_id+'&otp='+otp
  return fetch(req_url)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
};

export const fetchChangePassword = (password, new_password) => {
  var userData = new UserData()
  var userCred = userData.getUserCredential()
  
  var url = userData.getBaseURL()
  if(!url.includes('https://')){
    url = 'https://'+url
  }
  var req_url = url+kChangePasswordURl+'?login_id='+userCred.user_id+'&password='+password+'&new_password='+new_password
  return fetch(req_url)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
};

export const fetchSetPassword = (user_id, password) => {
  var userData = new UserData()
  
  var url = userData.getBaseURL()
  if(!url.includes('https://')){
    url = 'https://'+url
  }
  var req_url = url+kSetPassword+'?login_id='+user_id+'&password='+password
  return fetch(req_url)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
};

export const fetchRestoreAPI = () => {

  var userData = new UserData()
  var userCred = userData.getUserCredential()
  
  var url = userData.getBaseURL()
  if(!url.includes('https://')){
    url = 'https://'+url
  }
  var req_url = url+kRestoreAPI+'?login_id='+userCred.user_id+'&password='+userCred.pswd
  return fetch(req_url)
    .then((response) => response.json())
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
};


export const fetchVerifyBalance = () => {

  var userData = new UserData()
  var userCred = userData.getUserCredential()
  
  var url = userData.getBaseURL()
  if(!url.includes('https://')){
    url = 'https://'+url
  }
  var req_url = url+kVerifyBalance+'?login_id='+userCred.user_id+'&password='+userCred.pswd
  return fetch(req_url)
    .then((response) => response.json())
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
}

export const fetchMonthlyBillURL = (month, year) => {

  var userData = new UserData()
  var userCred = userData.getUserCredential()
  
  var url = userData.getBaseURL()
  if(!url.includes('https://')){
    url = 'https://'+url
  }
  var req_url = url+kMonthlyBill+'?login_id='+userCred.user_id+'&password='+userCred.pswd+'&month='+month+'&year='+year
  return req_url
}

export const payByCoupon = (coupon) => {

  var userData = new UserData()
  var userCred = userData.getUserCredential()
  
  var url = userData.getBaseURL()
  if(!url.includes('https://')){
    url = 'https://'+url
  }
  var req_url = url+kRechargeCouponURL+'?login_id='+userCred.user_id+'&password='+userCred.pswd+'&coupon_id='+coupon
  return fetch(req_url)
    .then((response) => response.json())
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
}

export const evcdLogin = () => {

  var userData = new UserData()
  var userCred = userData.getUserCredential()
  
  var url = userData.getBaseURL()
  if(!url.includes('https://')){
    url = 'https://'+url
  }
  var req_url = url+kEVCDLogin+'?login_id='+userCred.user_id+'&password='+userCred.pswd
  return fetch(req_url)
    .then((response) => response.json())
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
}

export const evcdStatus = (deviceId) => {

  var userData = new UserData()
  var url = userData.getEVCDURL()
  if(!url.includes('https://')){
    url = 'https://'+url
  }
  
  var req_url = url+kEVCDStatus+'?device_id='+deviceId
  return fetch(req_url)
    .then((response) => response.json())
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
}

export const startEVCDService = (evcdId) => {
  
  var userData = new UserData()
  var url = userData.getEVCDURL()
  if(!url.includes('https://')){
    url = 'https://'+url
  }
  
  var req_url = url+kEVCDStartService+'?device_id='+evcdId
  return fetch(req_url)
    .then((response) => response.json())
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
}

export const stopEVCDService = (evcdId) => {
  
  var userData = new UserData()
  var url = userData.getEVCDURL()
  if(!url.includes('https://')){
    url = 'https://'+url
  }
  
  var req_url = url+kEVCDStopService+'?device_id='+evcdId
  return fetch(req_url)
    .then((response) => response.json())
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
}

export const fetchEVDailyConsumption = (evcdId) => {
  
  var userData = new UserData()
  var url = userData.getEVCDURL()
  if(!url.includes('https://')){
    url = 'https://'+url
  }

  var userCred = userData.getUserCredential()
  
  var req_url = url+kEVDailyConsumption+'?login='+userCred.user_id+'&password='+userCred.pswd+'&device_id='+evcdId
  return fetch(req_url)
    .then((response) => response.json())
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
}

export const fetchEVMonthlyConsumption = (evcdId) => {
  
  var userData = new UserData()
  var url = userData.getEVCDURL()
  if(!url.includes('https://')){
    url = 'https://'+url
  }

  var userCred = userData.getUserCredential()
  
  var req_url = url+kEVMonthlyConsumption+'?login='+userCred.user_id+'&password='+userCred.pswd+'&device_id='+evcdId
  return fetch(req_url)
    .then((response) => response.json())
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
}

export const fetchCRCRStatus = () => {
  
  var userData = new UserData()
  var url = userData.getEVCDURL()
  if(!url.includes('https://')){
    url = 'https://'+url
  }

  var userCred = userData.getUserCredential()
  
  var req_url = url+kCRCRStatus+'?login_id='+userCred.user_id+'&password='+userCred.pswd
  return fetch(req_url)
    .then((response) => response.json())
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
}

export const fetchSocialMediaURLs = () => {
  
  var userData = new UserData()
  var url = userData.getBaseURL()
  if(!url.includes('https://')){
    url = 'https://'+url
  }

  var req_url = url+kSocialMediaURL
  return fetch(req_url)
    .then((response) => response.json())
    .then((json) => {
        return json;
    })
    .catch((error) => {
      return null
    });
}