
import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ImageBackground,
    BackHandler,
    Alert,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';

import ConnectWithUs from "../components/connectwithus";
import Icon from 'react-native-vector-icons/Fontisto';
import {fetchSocialMediaURLs, fethcLogin} from '../utilities/webservices'
import Spinner from '../components/activity-indicator'
import UserData from '../utilities/models/user-data'
import * as Keychain from 'react-native-keychain';
import {SCREENTYPE} from '../utilities/utilities-methods'
import { Platform } from 'react-native';

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userid:'',//101210007 //2121101 //900201502
            password:'',
            securePassword:true,
            socialMediaURLs : null
        }
        this.spinner = new Spinner()
        this.userData = new UserData()

        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction.bind(this)
        );

        this.onClickLogin = this.onClickLogin.bind(this)
    }

    componentDidMount() {
        this.spinner.startActivity();
        this.getSocialMediaURLs()
    }

    getSocialMediaURLs() {

        fetchSocialMediaURLs()
        .then(response=>{

            console.log("response ",response)
            this.setState({
                socialMediaURLs : response
            },()=>{
                this.userData.setSocialMediaURLs(response)
                this.spinner.stopActivity();
                this.getCredFromKeyChain()
            })
        })
    }


    backAction() {
        if(this.props.navigation.isFocused()){

            Alert.alert("Warning!", "Are you sure you want to exit the App?", [
                {
                  text: "Cancel",
                  onPress: () => null,
                  style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
              ]);
        }
        return true;
    }

    onClickLogin() {

        Keyboard.dismiss();

        var userId_errorMsg = ""
        var pwd_errorMsg = ""

        if(this.state.userid === '' || this.state.password === ''){
            userId_errorMsg = this.state.userid === '' ? " User ID" : ''
            pwd_errorMsg = this.state.password === '' ? userId_errorMsg === ""?" Password." : " & Password." : '.'
            alert("Please enter"+userId_errorMsg+pwd_errorMsg)
            return;
        }
        
        this.spinner.startActivity();

        if(!this.spinner.isNetConnected()){
            alert("Please check you internet connection.")
            this.spinner.stopActivity()
            return;
        }

        var devToken = this.userData.getDeviceToken()

        fethcLogin(devToken)
        .then(response=>{

            this.spinner.stopActivity();
            if(!response){
                alert("Unable to login into App !!!")
                return;
            }

            if(response && !response.message.includes('SUCCESS')){
                alert(response.message)
                return;
            }
            else if(response.resource && response.resource.mobile_app_status != 'Y') {

                alert("Login restricted. Please contact support team !!!")
                return;
            }

            this.userData.setUserData(response)

            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Welcome' }]
            })
            
            this.saveCredToKeyChain();
            this.setState({
                userid:'',
                password:''
            })
        })
    }
    
    onClickForgotPassword(type) {
        
        this.props.navigation.navigate("PasswordReset", {'type':type})
    }

    onClickConnectUs(value) {

        if(!this.spinner.isNetConnected()){
            alert("Please check you internet connection.")
            return;
        }
        this.props.navigation.navigate("ConnectUs", {'url':value})
    }

    onClickShowPassword() {
        this.setState({
            securePassword:!this.state.securePassword
        })
    }

    async saveCredToKeyChain() {

        const username = this.state.userid;
        const password = this.state.password;
        
        await Keychain.setGenericPassword(username, password);
    }

    async getCredFromKeyChain() {

        try {
            const credentials = await Keychain.getGenericPassword();
            if(credentials && credentials.username && credentials.password){

                this.setState({
                    userid:credentials.username,
                    password:credentials.password
                },()=>{
                    this.userData.setUserCredential(this.state.userid, this.state.password)
                    this.onClickLogin()
                })
            }
        }
        catch (error) {
          }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()} style={{flex:1, backgroundColor:'#fff'}}>
                <View style={{ flex: 1, backgroundColor:'#fff'}} >
                    <ImageBackground source={require('../resources/login_page_bg.png')} style={{flex:1, backgroundColor:'#fff'}} resizeMode={'stretch'}>
                        <View style={{flex:1, maxHeight:75, marginLeft:20}}>
                            <View style={{flex:1, justifyContent:'center'}}>
                                <Text style={{fontSize:30, fontWeight:'bold', color:kThemeRedColor}}> {`HELLO\n`} </Text>
                            </View>

                            <View style={{flex:1, alignItems:'center', flexDirection:'row'}}>
                                <Text style={{fontSize:30, fontWeight:'bold', color:kThemeRedColor}}> WE'RE </Text>
                                
                                <View >
                                    <Image style={{width:120, height:40, resizeMode:'contain'}} source={require("../resources/Xenius_Registered_Logo.png")}></Image>
                                    <Text style={{fontSize:6, alignSelf:'flex-end'}}> HUMANIZING MACHINES </Text>
                                </View>
                            </View>
                        </View>
                        
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                            <View style={{width:'85%', height:400, backgroundColor:'#FFF', borderRadius:5}}>
                                <View style={{flex:3}}>
                                    <TextInput
                                        style={{paddingLeft:5, height: 35, borderWidth:0.5, borderRadius:5, margin:25,  marginTop:30, borderColor:kThemeBlueColor, padding:0}}
                                        textAlign={'left'}
                                        placeholder="USER ID"
                                        onChangeText={text => this.setState({userid:text},()=>this.userData.setUserCredential(this.state.userid, this.state.password))}
                                        defaultValue={this.state.userid}
                                    />

                                    <TextInput
                                        style={{paddingLeft:5, height: 35, borderWidth:0.5, borderRadius:5, margin:25, marginTop:0, marginBottom:5, borderColor:kThemeBlueColor, padding:0}}
                                        textAlign={'left'}
                                        placeholder="PASSWORD"
                                        secureTextEntry={this.state.securePassword}
                                        onChangeText={text => this.setState({password:text},()=>this.userData.setUserCredential(this.state.userid, this.state.password))}
                                        defaultValue={this.state.password}
                                        returnKeyType={'go'}
                                        onSubmitEditing={this.onClickLogin}
                                    />

                                    <TouchableOpacity onPress={()=>this.onClickShowPassword()} style={{marginLeft:25, marginRight:25,marginTop:5, flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                                        <Icon size={10} name={this.state.securePassword?"checkbox-passive":"checkbox-active"} color={kThemeBlueColor} />
                                        
                                        <Text style={{ marginLeft:5, color:kThemeBlueColor}}>SHOW PASSWORD</Text>
                                    </TouchableOpacity>
                                </View>
                                
                                <View style={{flex:2, alignItems:'center', justifyContent:'center'}}>
                                    <TouchableOpacity onPress={()=>this.onClickLogin()} style={{width:150, height:35,alignItems:'center', justifyContent:'center', backgroundColor:kThemeRedColor, borderRadius:5}}>
                                        <Text style={{color:'#FFF', fontWeight:'bold'}}>SIGN IN</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity onPress={()=>this.onClickForgotPassword(SCREENTYPE.FORGETPASSWORD)} >
                                        <Text style={{ marginTop:5, color:kThemeBlueColor}}>FORGOT PASSWORD?</Text>
                                    </TouchableOpacity>

                                </View>
                                
                                <View style={{flex:1}}>
                                    <ConnectWithUs socialMediaURLs={this.state.socialMediaURLs} callback={this.onClickConnectUs.bind(this)}/>
                                </View>
                            </View>
                        </View>
                        
                    </ImageBackground>
                    <View style={{flex:1, maxHeight:Platform.OS === 'ios'? 45:25,  alignItems:'center', justifyContent:'center'}}>
                        <View style={{width:'100%', height:Platform.OS === 'ios'? 50:25, backgroundColor:'#fff', alignItems:'center', justifyContent:'center', flexDirection:'row',}}>
                            <Text style={{fontSize:11, color:kThemeRedColor}}> PREPAID METERING SOLUTION BY</Text>
                            
                            <Image style={{width:90, height:20, resizeMode:'contain'}} source={require("../resources/radius-logo.png")}></Image>
                        </View>
                        
                    </View>
                </View>
            </TouchableWithoutFeedback>
          );
    }
}
export default Login;