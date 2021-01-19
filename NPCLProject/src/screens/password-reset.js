
import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity,
    TextInput,
    Dimensions,
    ImageBackground,
    StyleSheet
} from 'react-native';

import Spinner from '../components/activity-indicator'
import {fetchReSendOTP, fetchVerifyOTP, fetchSetPassword, fetchChangePassword} from '../utilities/webservices'
import {SCREENTYPE} from '../utilities/utilities-methods'
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserData from '../utilities/models/user-data'

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class PasswordReset extends Component {

    constructor(props) {
        super(props)
        const { params } = this.props.route;
        this.spinner = new Spinner()
        this.userData = new UserData()
        this.state = {
            logDate : [],
            password:"",
            newPassword:"",
            logId:"",
            registeredMobile:"",
            screenType : params["type"],
            otp:''

        }
    }

    componentDidMount(){

        
    }

    onClickConnectUs(value) {

        this.props.navigation.navigate("ConnectUs", {'url':value})
    }

    onSubmitPress() {
        if(this.state.screenType === SCREENTYPE.FORGETPASSWORD) {

           this.resendOTP()
        }
        else if(this.state.screenType === SCREENTYPE.VERIFYOTP ) {

            this.verifyOTP()
        }
        else if(this.state.screenType === SCREENTYPE.SETNEWPASSWORD) {

            this.setNewPassword()
        }
        else if(this.state.screenType === SCREENTYPE.CHANGEPASSWORD) {

            this.changePassword()
        }
    }

    resendOTP() {

        this.spinner.startActivity();
        fetchReSendOTP(this.state.logId)
        .then(response=>{

            if(response.rc === -1){
                var msg = response.message
                msg = msg.split("!!!")[0]
                alert(msg)
            }
            else{
                var msg = response.message
                alert(msg)
                this.setState({
                    screenType : SCREENTYPE.VERIFYOTP
                })
            }
            this.spinner.stopActivity();
        })
    }

    verifyOTP() {

        this.spinner.startActivity();
        fetchVerifyOTP(this.state.logId, this.state.otp)
        .then(response=>{

            if(response.rc === -1){
                var msg = response.message
                msg = msg.replace("login_id", "LOGIN ID");
                msg = msg.replace("!!!", ":");
                alert(msg)
            }
            else{
                var msg = response.message
                alert(msg)
                this.setState({
                    screenType : SCREENTYPE.SETNEWPASSWORD
                })
            }
            this.spinner.stopActivity();
        })
    }

    setNewPassword() {

        this.spinner.startActivity();
        fetchSetPassword(this.state.logId, this.state.newPassword)
        .then(response=>{

            if(response.rc === -1){
                var msg = response.message
                msg = msg.split("!!!")[0]
                alert(msg)
            }
            else{
                var msg = response.message
                alert(msg)
                this.props.navigation.pop()
            }
            this.spinner.stopActivity();
        })
    }

    changePassword() {

        this.spinner.startActivity();
        fetchChangePassword(this.state.password, this.state.newPassword)
        .then(response=>{

            if(response.rc === -1){
                var msg = response.message
                alert(msg)
            }
            else{
                var userCred = this.userData.getUserCredential()
                this.userData.setUserCredential(userCred.user_id, this.state.newPassword)
                var msg = response.message
                alert(msg)
                this.props.navigation.pop()
            }
            this.spinner.stopActivity();
        })
    }

    onPressBackButton() {
        this.props.navigation.pop()
    }

    render() {
        return  <View style={{flex:1, backgroundColor:'#fff'}}>
                    {this.state.screenType === SCREENTYPE.CHANGEPASSWORD ?  
                        <View style={{flex:1}}>
                            <View style={{margin:5, alignItems:'flex-start', justifyContent:'center', backgroundColor:'#fff'}}>
                                <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity onPress={()=>this.onPressBackButton()} style={{width:25, alignItems:'center', justifyContent:'center'}}>
                                        <Icon size={16} name="arrow-back-ios" color="rgb(206, 0, 57)" />
                                    </TouchableOpacity>
                                    <View style={{flex:1, maxHeight:40, margin:5, flexDirection:'row'}}>
                                        <View style={{flex:1, alignItems:'flex-start', justifyContent:'center'}}>
                                            <Text style={{color:kThemeRedColor, fontWeight:'bold', fontSize:24}}> Change Password </Text>
                                        </View>
                                    </View>
                                </View>
                                
                            </View>
                            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                <View style={[{width:225, height:200, backgroundColor:'#FFF', borderRadius:5},style.cardShadow]}>

                                    <View style={{flex:3}}>
                                        <View style={{margin:25, }}>
                                            <Text style={{ fontSize:10, color:kThemeBlueColor}}>Password</Text>
                                            <TextInput
                                                style={{paddingLeft:5, fontSize:11, height: 25, borderWidth:0.5, borderRadius:5, borderColor:kThemeBlueColor, padding:0}}
                                                textAlign={'left'}
                                                placeholder="Password"
                                                secureTextEntry = {true}
                                                onChangeText={text => this.setState({password:text},()=>{})}
                                                defaultValue={this.state.password}
                                            />
                                        </View>

                                        <View style={{margin:25,}}>
                                            <Text style={{ fontSize:10, color:kThemeBlueColor}}>New Password</Text>
                                            <TextInput
                                                style={{paddingLeft:5, fontSize:11, height: 25, borderWidth:0.5, borderRadius:5, borderColor:kThemeBlueColor, padding:0}}
                                                textAlign={'left'}
                                                placeholder="New Password"
                                                secureTextEntry = {true}
                                                onChangeText={text => this.setState({newPassword:text},()=>{})}
                                                defaultValue={this.state.newPassword}
                                            />
                                        </View>
                                    </View>
                                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                        <TouchableOpacity onPress={()=>this.onSubmitPress()} style={{width:150, height:25,alignItems:'center', justifyContent:'center', backgroundColor:kThemeRedColor, borderRadius:5}}>
                                            <Text style={{color:'#FFF', fontWeight:'bold'}}>SUBMIT</Text>
                                        </TouchableOpacity>
                                        
                                    </View>
                                </View>
                            </View>
                        </View> :
                        <ImageBackground source={require('../resources/login_page_bg.png')} style={{width:Dimensions.get('window').width, height:Dimensions.get('screen').height-64}} resizeMode={'cover'}>

                            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                <View style={[{width:225, height:200, backgroundColor:'#FFF', borderRadius:5}, style.cardShadow]}>

                                    <View style={{flex:3}}>
                                        <View style={{margin:25,   marginTop:30,}}>
                                            <Text style={{ fontSize:10, color:kThemeBlueColor}}>LOGIN ID</Text>
                                            <TextInput
                                                style={{paddingLeft:5, fontSize:11, height: 25, borderWidth:0.5, borderRadius:5, borderColor:kThemeBlueColor, padding:0}}
                                                textAlign={'left'}
                                                placeholder="LOGIN ID"
                                                editable={this.state.screenType === SCREENTYPE.FORGETPASSWORD}
                                                onChangeText={text => this.setState({logId:text},()=>{})}
                                                defaultValue={this.state.logId}
                                            />
                                        </View>

                                        {this.state.screenType === SCREENTYPE.VERIFYOTP&& <View style={{margin:25, marginTop:0}}>
                                            <Text style={{ fontSize:10, color:kThemeBlueColor}}>VERIFY OTP</Text>
                                            <TextInput
                                                style={{paddingLeft:5, fontSize:11, height: 25, borderWidth:0.5, borderRadius:5, borderColor:kThemeBlueColor, padding:0}}
                                                textAlign={'left'}
                                                placeholder="VERIFY OTP"
                                                secureTextEntry = {true}
                                                onChangeText={text => this.setState({otp:text},()=>{})}
                                                defaultValue={this.state.otp}
                                            />
                                        </View>}

                                        {this.state.screenType === SCREENTYPE.SETNEWPASSWORD && <View style={{margin:25, marginTop:0}}>
                                            <Text style={{ fontSize:10, color:kThemeBlueColor}}>NEW PASSWORD</Text>
                                            <TextInput
                                                style={{paddingLeft:5, fontSize:11, height: 25, borderWidth:0.5, borderRadius:5, borderColor:kThemeBlueColor, padding:0}}
                                                textAlign={'left'}
                                                placeholder="NEW PASSWORD"
                                                secureTextEntry = {true}
                                                onChangeText={text => this.setState({newPassword:text},()=>{})}
                                                defaultValue={this.state.newPassword}
                                            />
                                        </View>}
                                    </View>
                                    
                                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                        <TouchableOpacity onPress={()=>this.onSubmitPress()} style={{width:150, height:25,alignItems:'center', justifyContent:'center', backgroundColor:kThemeRedColor, borderRadius:5}}>
                                            <Text style={{color:'#FFF', fontWeight:'bold'}}>SUBMIT</Text>
                                        </TouchableOpacity>
                                        
                                    </View>
                                    
                                </View>
                            </View>
                        </ImageBackground>
                    }
                </View>
    }
}

var style = StyleSheet.create({
    cardShadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,

        elevation: 1,
    }
})

export default PasswordReset;