
import React, { Component } from 'react';
import {
    Text, 
    View,
    Image,
    StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import MailIcon from 'react-native-vector-icons/Ionicons';
import UserData from '../utilities/models/user-data'

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class Profile extends Component {

    constructor(props) {
        super(props)
        this.userData = new UserData().getUserData();

        var dataResouces = this.userData.resource
        this.state = {
            userName:dataResouces.consumer_name,
            meterId:dataResouces.tp_token_id,
            customerId:dataResouces.location_id,
            phone:dataResouces.consumer_mobile_no,
            email:dataResouces.consumer_email_id
        }
    }

    onClickLogin() {
        this.props.navigation.navigate("Notice")
    }
    
    onClickForgotPassword() {
        console.log("onClickForgotPassword")
    }

    onClickConnectUs(value) {

        console.log("onClickConnectUs ",value);
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
                    
                    <View style={[{flex:1, margin:25, maxHeight:350, backgroundColor:'#FFF', borderRadius:5},style.cardShadow]}>
                        <View style={{width:140, height:140, borderRadius:150, alignSelf:'center', alignItems:'center', justifyContent:'center', position:'absolute', top:-75, borderRadius:150,borderWidth:5, borderColor:kThemeRedColor, backgroundColor:'#fff'}}>
                            <Image style={{width:110, height:110, resizeMode:'center' }}  source={require("../resources/icon.png")}/>
                        </View>
                        <View style={{height:75}}>
                        </View>
                        <Text style={{alignSelf:'center', fontSize:22, fontWeight:'bold'}}>{this.state.userName}</Text>
                        
                        <View style={{flex:1, alignSelf:'center', alignItems:'center'}}>
                            <View style={{ height:40, flexDirection:'row', alignItems:'center'}}>
                                <Text style={{flex:1, textAlign:'right'}} >
                                    <Icon size={15} name="tachometer" color="#000" />
                                </Text>
                                <Text style={{width:25,}}></Text>
                                <Text style={{flex:2, fontSize:10}}>{this.state.meterId}</Text>
                            </View>

                            <View style={{ height:40, flexDirection:'row', alignItems:'center'}}>
                                <Text style={{flex:1, textAlign:'right'}} >
                                    <Icon size={15} name="superpowers" color="#000" />
                                </Text>
                                <Text style={{width:25,}}></Text>
                                <Text style={{flex:2, fontSize:10}}>{this.state.customerId}</Text>
                            </View>

                            <View style={{ height:40, flexDirection:'row', alignItems:'center'}}>
                                <Text style={{flex:1, textAlign:'right'}} >
                                    <Icon size={15} name="phone" color="#000" />
                                </Text>
                                <Text style={{width:25,}}></Text>
                                <Text style={{flex:2, fontSize:10}}>{this.state.phone}</Text>
                            </View>

                            <View style={{ height:40, flexDirection:'row', alignItems:'center'}}>
                                <Text style={{flex:1, textAlign:'right'}} >
                                    <MailIcon size={15} name="mail" color="#000" />
                                </Text>
                                <Text style={{width:25,}}></Text>
                                <Text style={{flex:2, fontSize:10}}>{this.state.email}</Text>
                            </View>
                        </View>
                       
                        <View style={{alignItems:'center', marginTop:10, justifyContent:'center'}}>
                            <View style={{borderRadius:5, borderWidth:0.5,  width:150, height:30, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                <Text >
                                    <Icon size={15} name="phone" color="#000" />
                                </Text>
                                <Text style={{fontSize:12}}>  Help & Support</Text>
                            </View>
                        </View>
                        
                        <View style={{alignItems:'center', marginTop:10, marginBottom:10, justifyContent:'center'}}>
                            <View style={{borderRadius:5, borderWidth:0.5,  width:150, height:30, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                <Text >
                                    <Icon size={15} name="key" color="#000" />
                                </Text>
                                <Text style={{fontSize:11}}>  CHANGE PASSWORD &gt; </Text>
                            </View>
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