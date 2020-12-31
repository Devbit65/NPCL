

export default class UserData {

    static singletonObject = null
    constructor(){

        if(!UserData.singletonObject ){
            this.userData = null
            UserData.singletonObject = this;
        }
        
        return UserData.singletonObject;
        
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