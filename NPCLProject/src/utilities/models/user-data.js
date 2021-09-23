const kBaseURL = "myxenius.com"
const kEVCDURL = "radiusm2m.com"

export default class UserData {

    static singletonObject = null
    constructor(){

        if(!UserData.singletonObject ){
            this.userData = null
            this.userCred = null;
            this.deviceToken = null;
            this.baseURL = kBaseURL;
            this.evcdURL = kEVCDURL;
            this.socialMediaURLs = null
            UserData.singletonObject = this;
        }
        
        return UserData.singletonObject;
        
    }

    setDeviceToken(deviceToken){
        this.deviceToken = deviceToken
    }

    getDeviceToken(){
        return this.deviceToken
    }

    setUserCredential(user_id, pswd){
        if(user_id || pswd){

            this.userCred = {
                user_id : user_id,
                pswd : pswd
            }
        }
        else {
            this.userCred = null;
        }
    }

    getUserCredential() {
        return this.userCred;
    }

    setUserData(userData){
        if(userData){

            this.setBaseURL(userData.app_base_url)
            this.setEVCDURL(userData.evcdURL)
        }
        else {

            this.setBaseURL(kBaseURL)
            this.setEVCDURL(kEVCDURL)
        }
        this.userData = userData;
    }

    getUserData(){
        return this.userData;
    }

    setBaseURL(url){
        if(url){
            this.baseURL = url;
        }
    }

    getBaseURL(){
        return this.baseURL;
    }

    setEVCDURL(url){
        if(url){
            this.evcdURL = url;
        }
    }

    getEVCDURL(){
        return this.evcdURL;
    }

    getUserName(){

        return this.userData ? this.userData.resource.consumer_name:"";
    }

    setSocialMediaURLs(mediaURLs) {
        this.socialMediaURLs = mediaURLs
    }

    getSocialMediaURLs() {
        return this.socialMediaURLs
    }
}