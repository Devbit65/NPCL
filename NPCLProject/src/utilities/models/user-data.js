

export default class UserData {

    static singletonObject = null
    constructor(){

        if(!UserData.singletonObject ){
            this.userData = null
            this.userCred = null;
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
        this.userData = userData;
    }

    getUserData(){
        return this.userData;
    }

    getUserName(){
        return this.userData.resource.consumer_name;
    }
}