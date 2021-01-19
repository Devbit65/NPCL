
import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity,
    TextInput,
    Dimensions,
    ImageBackground
} from 'react-native';

import Spinner from '../components/activity-indicator'
import {fetchReSendOTP, fetchVerifyOTP, fetchSetPassword} from '../utilities/webservices'
import {SCREENTYPE} from '../utilities/utilities-methods'

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class PasswordReset extends Component {

    constructor(props) {
        super(props)
        const { params } = this.props.route;
        this.spinner = new Spinner()
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

    render() {
        return  <View style={{flex:1}}>
                    <ImageBackground source={require('../resources/login_page_bg.png')} style={{width:Dimensions.get('window').width, height:Dimensions.get('screen').height-64}} resizeMode={'cover'}>

                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                            <View style={{width:225, height:200, backgroundColor:'#FFF', borderRadius:5}}>

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
                </View>
    }
}

export default PasswordReset;