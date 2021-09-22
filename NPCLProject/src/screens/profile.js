
import React, { Component } from 'react';
import {
    Text, 
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Linking, 
    Alert, 
    Platform
} from 'react-native';

import UserData from '../utilities/models/user-data'
import {SCREENTYPE} from '../utilities/utilities-methods'

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class Profile extends Component {

    constructor(props) {
        super(props)
        this.userData = new UserData().getUserData();

        var dataResouces = this.userData.resource
        this.state = {
            userName:dataResouces.consumer_name,
            meterId:dataResouces.meter_serial_no,
            customerId:dataResouces.location_id,
            phone:dataResouces.consumer_mobile_no,
            email:dataResouces.consumer_email_id
        }
    }

    onClickLogin() {
        this.props.navigation.navigate("Notice")
    }
    
    onClickForgotPassword() {
        this.props.navigation.navigate("PasswordReset", {'type':SCREENTYPE.CHANGEPASSWORD})
    }

    onClickConnectUs(phone) {

        let phoneNumber = phone;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${phone}`;
        }
        else  {
            phoneNumber = `tel:${phone}`;
        }
        Linking.canOpenURL(phoneNumber)
        .then(supported => {
            if (!supported) {
                Alert.alert('Phone number is not available');
            } else {
                return Linking.openURL(phoneNumber);
            }
        })
        .catch(err => {
            Alert.alert('Phone number is not available');
        });
    }

    onClickShowPassword() {
        this.setState({
            securePassword:!this.state.securePassword
        })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor:'#fff'}} >
                
                <View style={{margin:5, alignItems:'flex-start', justifyContent:'center'}}>
                    <Text style={{color:kThemeRedColor, fontWeight:'bold', fontSize:30}}> PROFILE </Text>
                </View>
                <View style={{flex:1, marginTop:50}}>
                    
                    <View style={[{flex:1, margin:5, marginTop:25, maxHeight:350, backgroundColor:'rgb(242,242,242)', borderRadius:5},style.cardShadow]}>
                        <View style={{width:140, height:140, borderRadius:150, alignSelf:'center', alignItems:'center', justifyContent:'center', position:'absolute', top:-75, backgroundColor:'#fff'}}>
                            <Image style={{width:140, height:140, resizeMode:'contain' }}  source={require("../resources/profile_pic.png")}/>
                        </View>
                        <View style={{height:75}}>
                        </View>
                        <Text style={{ textAlign:'center', fontSize:20, padding:2, fontWeight:'bold'}}>{this.state.userName}</Text>

                        <View style={{flex:1, alignSelf:'center', alignItems:'center'}}>
                            <View style={{ height:30, flexDirection:'row', alignItems:'center'}}>
                                <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}} >
                                    <Image style={{width:15, height:15, resizeMode:'contain'}} source={require('../resources/meter.png')} />
                                </View>
                                <View style={{width:20}} />
                                <View style={{flex:2, alignItems:'flex-start', justifyContent:'center'}} >
                                    <Text style={{ fontSize:12}}>{this.state.meterId}</Text>
                                </View>
                            </View>

                            <View style={{ height:30, flexDirection:'row', alignItems:'center'}}>
                                <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}} >
                                    <Image style={{width:15, height:15, resizeMode:'contain'}} source={require('../resources/locId.png')} />
                                </View>
                                <View style={{width:20}} />
                                <View style={{flex:2, alignItems:'flex-start', justifyContent:'center'}} >
                                    <Text style={{ fontSize:12}}>{this.state.customerId}</Text>
                                </View>
                            </View>

                            {this.state.phone && <View style={{ height:30, flexDirection:'row', alignItems:'center'}}>
                                <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}} >
                                    <Image style={{width:15, height:15, resizeMode:'contain'}} source={require('../resources/phone.png')} />
                                </View>
                                <View style={{width:20}} />
                                <View style={{flex:2, alignItems:'flex-start', justifyContent:'center'}} >
                                    <Text style={{ fontSize:12}}>{this.state.phone}</Text>
                                </View>
                            </View>}

                            {this.state.email && <View style={{ height:30, flexDirection:'row', alignItems:'center'}}>
                                <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}} >
                                    <Image style={{width:15, height:15, resizeMode:'contain'}} source={require('../resources/email.png')} />
                                </View>
                                <View style={{width:20}} />
                                <View style={{flex:2, alignItems:'flex-start', justifyContent:'center'}} >
                                    <Text style={{ fontSize:12}}>{this.state.email}</Text>
                                </View>
                            </View>}
                        </View>
                       
                        <View style={{alignItems:'center', justifyContent:'center'}}>
                            <TouchableOpacity style={[{width:175, borderRadius:5, height:25, flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'#fff'},style.cardShadow]} onPress={()=>this.onClickConnectUs(this.userData.resource.site_support_contact_no)}>
                                <Image style={{width:20, height:20, resizeMode:'contain'}} source={require('../resources/help_support.png')} />
                                <Text style={{fontSize:12}}>  Help & Support</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{alignItems:'center', marginTop:20, marginBottom:10, justifyContent:'center'}}>
                            <TouchableOpacity style={[{width:175, borderRadius:5, height:25, flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'#fff'},style.cardShadow]} onPress={()=>this.onClickForgotPassword()}>
                                <Image style={{width:20, height:20, resizeMode:'contain'}} source={require('../resources/change_password.png')} />
                                <Text style={{fontSize:11}}>  CHANGE PASSWORD </Text>
                                <Image style={{width:15, height:15, resizeMode:'contain'}} source={require('../resources/arrow.png')} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                
            </View>
          );
    }
}

var style = StyleSheet.create({
    cardShadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3,

        elevation: 5,
    }
})

export default Profile;