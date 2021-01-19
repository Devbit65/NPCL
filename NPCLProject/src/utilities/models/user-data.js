

export default class UserData {

    static singletonObject = null
    constructor(){

        if(!UserData.singletonObject ){
            this.userData = null
            this.userCred = null;
            this.baseURL = "myxenius.com";
            UserData.singletonObject = this;
        }
        
        return UserData.singletonObject;
        
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

    getUserName(){

        return this.userData ? this.userData.resource.consumer_name:"";
    }
}