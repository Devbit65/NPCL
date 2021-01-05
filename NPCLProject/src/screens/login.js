
import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity,
    TextInput,
    Image
} from 'react-native';

import ConnectWithUs from "../components/connectwithus";
import Icon from 'react-native-vector-icons/Fontisto';
import {fethcLogin} from '../utilities/webservices'
import Spinner from '../components/activity-indicator'
import UserData from '../utilities/models/user-data'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userid:'101210007',
            password:'101210007',
            securePassword:true
        }
        this.spinner = new Spinner()
        this.userData = new UserData()
        this.userData.setUserCredential(this.state.userid, this.state.password)
    }

    onClickLogin() {
        
        this.spinner.startActivity();
        fethcLogin()
        .then(response=>{

            this.userData.setUserData(response)

            this.props.navigation.navigate("Welcome")
            this.spinner.stopActivity();
        })
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
            <View style={{ flex: 1}} >
                <View style={{flex:1, maxHeight:100, marginLeft:20}}>
                    <View style={{flex:1, justifyContent:'center'}}>
                        <Text style={{fontSize:30, fontWeight:'bold', color:'rgb(206, 0, 57)'}}> HELLO </Text>
                    </View>

                    <View style={{flex:1, alignItems:'center', flexDirection:'row'}}>
                        <Text style={{fontSize:30, fontWeight:'bold', color:'rgb(206, 0, 57)'}}> WE'RE </Text>
                        
                        <View >
                            <Image style={{width:120, height:40, resizeMode:'contain'}} source={require("../resources/Xenius_Registered_Logo.png")}></Image>
                            <Text style={{fontSize:6, alignSelf:'flex-end'}}> HUMANIZING MACHINES </Text>
                        </View>
                    </View>
                </View>
                
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <View style={{width:250, height:300, backgroundColor:'#FFF', borderRadius:5}}>
                        <View style={{flex:3}}>
                            <TextInput
                                style={{height: 25, borderWidth:0.5, borderRadius:5, margin:25,  marginTop:30}}
                                textAlign={'center'}
                                placeholder="USER ID"
                                onChangeText={text => this.setState({userid:text},()=>this.userData.setUserCredential(this.state.userid, this.state.password))}
                                defaultValue={this.state.userid}
                            />

                            <TextInput
                                style={{height: 25, borderWidth:0.5, borderRadius:5, margin:25, marginTop:0, marginBottom:5}}
                                textAlign={'center'}
                                placeholder="PASSWORD"
                                secureTextEntry={this.state.securePassword}
                                onChangeText={text => this.setState({password:text},()=>this.userData.setUserCredential(this.state.userid, this.state.password))}
                                defaultValue={this.state.password}
                            />

                            <TouchableOpacity onPress={()=>this.onClickShowPassword()} style={{marginLeft:25, marginRight:25,marginTop:5, flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                                <Icon size={10} name={this.state.securePassword?"checkbox-passive":"checkbox-active"} color="#000" />
                                
                                <Text style={{ fontSize:8, marginLeft:5}}>SHOW PASSWORD</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{flex:2, alignItems:'center', justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>this.onClickLogin()} style={{width:200, height:30,alignItems:'center', justifyContent:'center', backgroundColor:'red', borderRadius:5}}>
                                <Text style={{color:'#FFF', fontWeight:'bold'}}>SIGN IN</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={()=>this.onClickForgotPassword()} >
                                <Text style={{ fontSize:8, marginTop:5}}>FORG0T PASSWORD?</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{flex:1}}>
                            <ConnectWithUs callback={this.onClickConnectUs}/>
                        </View>
                    </View>
                </View>
                
                <View style={{flex:1, maxHeight:100,  alignItems:'center', justifyContent:'flex-end'}}>
                    <View style={{height:30, alignItems:'center', justifyContent:'center', flexDirection:'row',}}>
                        <Text style={{fontSize:11, color:'rgb(206, 0, 57)'}}> PREPAID METERING SOLUTION BY</Text>
                        
                        <Image style={{width:70, height:20, resizeMode:'contain'}} source={require("../resources/Xenius_Registered_Logo.png")}></Image>
                    </View>
                    
                </View>
            </View>
          );
    }
}
export default Login;