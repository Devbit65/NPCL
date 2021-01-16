
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

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class PasswordReset extends Component {

    constructor(props) {
        super(props)
        const { params } = this.props.route;
        this.screenType = params["type"]
        this.spinner = new Spinner()
        this.state = {
            logDate : [],
            password:"",
            newPassword:"",
            logId:"",
            registeredMobile:""
        }
    }

    componentDidMount(){

        
    }

    onClickConnectUs(value) {

        this.props.navigation.navigate("ConnectUs", {'url':value})
    }

    onSubmitPress() {
        console.log("onSubmitPress ")
    }

    render() {
        return  <View style={{flex:1}}>
                    <ImageBackground source={require('../resources/login_page_bg.png')} style={{width:Dimensions.get('window').width, height:Dimensions.get('screen').height-64}} resizeMode={'cover'}>

                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <View style={{width:225, height:200, backgroundColor:'#FFF', borderRadius:5}}>

                            {this.screenType === "FORGETPASSWORD" ? 
                                <View style={{flex:3}}>
                                    <View style={{margin:25,   marginTop:30,}}>
                                        <Text style={{ fontSize:10, color:kThemeBlueColor}}>LOGIN ID</Text>
                                        <TextInput
                                            style={{paddingLeft:5, fontSize:11, height: 25, borderWidth:0.5, borderRadius:5, borderColor:kThemeBlueColor, padding:0}}
                                            textAlign={'left'}
                                            placeholder="LOGIN ID"
                                            onChangeText={text => this.setState({logId:text},()=>{})}
                                            defaultValue={this.state.userid}
                                        />
                                    </View>
                                    <View style={{margin:25, marginTop:0}}>
                                        <Text style={{ fontSize:10, color:kThemeBlueColor}}>REGISTERED MOBILE NUMBER</Text>
                                        <TextInput
                                            style={{paddingLeft:5, fontSize:11, height: 25, borderWidth:0.5, borderRadius:5, borderColor:kThemeBlueColor, padding:0}}
                                            textAlign={'left'}
                                            placeholder="REGISTERED MOBILE NUMBER"
                                            onChangeText={text => this.setState({registeredMobile:text},()=>{})}
                                            defaultValue={this.state.userid}
                                        />
                                    </View>

                                </View> : 
                                <View style={{flex:3}}>
                                    <View style={{margin:25,   marginTop:30,}}>
                                        <Text style={{ fontSize:10, color:kThemeBlueColor}}>PASSWORD</Text>
                                        <TextInput
                                            style={{paddingLeft:5, fontSize:11, height: 25, borderWidth:0.5, borderRadius:5, borderColor:kThemeBlueColor, padding:0}}
                                            textAlign={'left'}
                                            placeholder="PASSWORD"
                                            onChangeText={text => this.setState({userid:text},()=>this.userData.setUserCredential(this.state.userid, this.state.password))}
                                            defaultValue={this.state.userid}
                                        />
                                    </View>
                                    <View style={{margin:25, marginTop:0}}>
                                        <Text style={{ fontSize:10, color:kThemeBlueColor}}>NEW PASSWORD</Text>
                                        <TextInput
                                            style={{paddingLeft:5, fontSize:11, height: 25, borderWidth:0.5, borderRadius:5, borderColor:kThemeBlueColor, padding:0}}
                                            textAlign={'left'}
                                            placeholder="PASSWORD"
                                            onChangeText={text => this.setState({userid:text},()=>this.userData.setUserCredential(this.state.userid, this.state.password))}
                                            defaultValue={this.state.userid}
                                        />
                                    </View>

                                </View>
                            }
                            
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