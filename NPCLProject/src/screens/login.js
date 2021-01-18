
import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ImageBackground,
} from 'react-native';

import ConnectWithUs from "../components/connectwithus";
import Icon from 'react-native-vector-icons/Fontisto';
import {fethcLogin} from '../utilities/webservices'
import Spinner from '../components/activity-indicator'
import UserData from '../utilities/models/user-data'
import * as Keychain from 'react-native-keychain';

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userid:'',//101210007 //2121101 //900201502
            password:'',
            securePassword:true
        }
        this.spinner = new Spinner()
        this.userData = new UserData()
    }

    componentDidMount() {
        this.getCredFromKeyChain()
    }

    onClickLogin() {

        if(this.state.userid === '' || this.state.password === '') {
            alert("Please enter valid User-Id and Password")
            return;
        }
        this.spinner.startActivity();
        fethcLogin()
        .then(response=>{

            this.spinner.stopActivity();

            if(response && !response.message.includes('SUCCESS')){
                alert(response.message)
                return;
            }

            this.userData.setUserData(response)

            this.props.navigation.navigate("Welcome")
            
            this.saveCredToKeyChain();
            this.setState({
                userid:'',
                password:''
            })
        })
    }
    
    onClickForgotPassword() {
        
        this.props.navigation.navigate("PasswordReset", {'type':"FORGETPASSWORD"})
    }

    onClickConnectUs(value) {

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
            <View style={{ flex: 1}} >
                <ImageBackground source={require('../resources/login_page_bg.png')} style={{flex:1}} resizeMode={'stretch'}>
                    <View style={{flex:1, maxHeight:75, marginLeft:20}}>
                        <View style={{flex:1, justifyContent:'center'}}>
                            <Text style={{fontSize:30, fontWeight:'bold', color:kThemeRedColor}}> HELLO </Text>
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
                        <View style={{width:225, height:275, backgroundColor:'#FFF', borderRadius:5}}>
                            <View style={{flex:3}}>
                                <TextInput
                                    style={{paddingLeft:5, fontSize:11, height: 25, borderWidth:0.5, borderRadius:5, margin:25,  marginTop:30, borderColor:kThemeBlueColor, padding:0}}
                                    textAlign={'left'}
                                    placeholder="USER ID"
                                    onChangeText={text => this.setState({userid:text},()=>this.userData.setUserCredential(this.state.userid, this.state.password))}
                                    defaultValue={this.state.userid}
                                />

                                <TextInput
                                    style={{paddingLeft:5, fontSize:11, height: 25, borderWidth:0.5, borderRadius:5, margin:25, marginTop:0, marginBottom:5, borderColor:kThemeBlueColor, padding:0}}
                                    textAlign={'left'}
                                    placeholder="PASSWORD"
                                    secureTextEntry={this.state.securePassword}
                                    onChangeText={text => this.setState({password:text},()=>this.userData.setUserCredential(this.state.userid, this.state.password))}
                                    defaultValue={this.state.password}
                                />

                                <TouchableOpacity onPress={()=>this.onClickShowPassword()} style={{marginLeft:25, marginRight:25,marginTop:5, flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                                    <Icon size={10} name={this.state.securePassword?"checkbox-passive":"checkbox-active"} color={kThemeBlueColor} />
                                    
                                    <Text style={{ fontSize:8, marginLeft:5, color:kThemeBlueColor}}>SHOW PASSWORD</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <View style={{flex:2, alignItems:'center', justifyContent:'center'}}>
                                <TouchableOpacity onPress={()=>this.onClickLogin()} style={{width:150, height:25,alignItems:'center', justifyContent:'center', backgroundColor:kThemeRedColor, borderRadius:5}}>
                                    <Text style={{color:'#FFF', fontWeight:'bold'}}>SIGN IN</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity onPress={()=>this.onClickForgotPassword()} >
                                    <Text style={{ fontSize:8, marginTop:5, color:kThemeBlueColor}}>FORGOT PASSWORD?</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <View style={{flex:1}}>
                                <ConnectWithUs callback={this.onClickConnectUs.bind(this)}/>
                            </View>
                        </View>
                    </View>
                    
                </ImageBackground>
                <View style={{flex:1, maxHeight:20,  alignItems:'center', justifyContent:'center'}}>
                    <View style={{width:'100%', height:20, backgroundColor:'#fff', alignItems:'center', justifyContent:'center', flexDirection:'row',}}>
                        <Text style={{fontSize:11, color:kThemeRedColor}}> PREPAID METERING SOLUTION BY</Text>
                        
                        <Image style={{width:90, height:20, resizeMode:'contain'}} source={require("../resources/radius-logo.png")}></Image>
                    </View>
                    
                </View>
            </View>
          );
    }
}
export default Login;