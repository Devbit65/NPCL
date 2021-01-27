
import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity,
    Image,
    ImageBackground,
} from 'react-native';

import ConnectWithUs from "../components/connectwithus";
import NoticeHeader from "../components/notice-header";
import UserData from '../utilities/models/user-data'
import Spinner from '../components/activity-indicator'

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class Welcome extends Component {

  constructor(props) {
    super(props)
    this.userData = new UserData()
    this.state = {
      userName : this.userData.getUserName()
    }
    this.spinner = new Spinner()
  }

  onClickGetStarted() {

    this.props.navigation.reset({
      index: 0,
      routes: [{ name: 'AppRouteConfig' }]
    })
  }

  onClickConnectUs(value) {

    if(!this.spinner.isNetConnected()){
      alert("Please check you internet connection.")
      return;
    }
    this.props.navigation.navigate("ConnectUs", {'url':value})
  }
  render() {
      return (
          <View style={{ flex: 1}}>
            <ImageBackground source={require('../resources/welcome_bg.png')} style={{flex:1}} resizeMode={'stretch'}>
            
              <NoticeHeader />
            
              <View style={{flex:1, flexDirection:'row'}}>
                <View style={{flex:1}}>
                </View>

                <View style={{flex:5}}>
                  <View style={{flex:1,}}>
                    <View style={{flex:1, alignItems:'flex-start', justifyContent:'center'}}>
                      <Text style={{color:kThemeRedColor, fontWeight:'bold', fontSize:30}}> WELCOME </Text>
                    </View>

                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                      <Text style={{color:'#000', fontWeight:'bold',}}> {this.state.userName} </Text>
                    </View>
                  </View>

                  <View style={{flex:2, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{textAlign:'justify', fontSize:9}}>
                      LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMOD TEMPOR INDIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. QUIS IPSUM SUSPENDISSE ULTICES GRAVIDA, RISUS COMMODO VIVERRA MAECE. LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMOD TEMPOR INDIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. QUIS IPSUM SUSPENDISSE ULTICES GRAVIDA, RISUS COMMODO VIVERRA MAECE.
                    </Text>
                  </View>

                  <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>this.onClickGetStarted()} style={{width:150, height:35,alignItems:'center', justifyContent:'center', backgroundColor:kThemeRedColor, borderRadius:5}}>
                      <Text style={{color:'#FFF', fontWeight:'bold'}}>GET STARTED</Text>
                    </TouchableOpacity>
                  </View>

                  <ConnectWithUs callback={this.onClickConnectUs.bind(this)} />

                  <View style={{flex:2}}>
                  </View>
                </View>

                <View style={{flex:1}}>
                </View>
              </View>
            </ImageBackground>
          </View>
        );
  }
}
export default Welcome;