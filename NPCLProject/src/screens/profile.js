
import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity,
    TextInput,
    Image
} from 'react-native';

import NoticeHeader from "../components/notice-header";

import * as Utilities from "../utilities/utilities-methods";
import Icon from 'react-native-vector-icons/FontAwesome';
import MailIcon from 'react-native-vector-icons/Ionicons';

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userName:'KALPANA MISHRA',
            meterId:'837731951202',
            customerId:'CS5-1202',
            phone:'8925402809',
            email:'KALPANA.MISHRA@RADIUS.CO.IN'
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
        console.log("onClickShowPassword")
        this.setState({
            securePassword:!this.state.securePassword
        })
    }

    render() {
        return (
            <View style={{ flex: 1}} >
                
                <NoticeHeader />
                    
                <View style={{margin:5, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{color:'#F00', fontWeight:'bold', fontSize:30}}> PROFILE </Text>
                </View>
                <View style={{flex:1, marginTop:50}}>
                    
                    <View style={{flex:1, margin:25, maxHeight:350, backgroundColor:'#FFF', borderRadius:5}}>
                        <View style={{width:152, height:152, borderRadius:150, alignSelf:'center', position:'absolute', top:-75}}>
                            <Image style={{width:150, height:150, borderRadius:150,borderWidth:5, borderColor:'red'}} source={{uri: "https://lh3.googleusercontent.com/ogw/ADGmqu-9yiHVpiKJ0fcCRlKUZl1ayq4rk_ydcfzvY1qlnw=s192-c-mo"}}/>
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
export default Profile;