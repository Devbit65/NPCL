
import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity,
    Image
} from 'react-native';

import ConnectWithUs from "../components/connectwithus";

const SocialMediaType = {
  FACEBOOK : 1,
  INSTAGRAM : 2,
  YOUTUBE : 3,
  TWITTER : 4,
  LINKDIN : 5
}

class Welcome extends Component {

  constructor(props) {
    super(props)
    this.state = {
      unit:1202,
      headerNoticeText : 'IMPORTANT NOTICE    IMPORTANT NOTICE',
      userName : 'KALPANA MISHRA'
    }
  }

  onClickGetStarted() {

    this.props.navigation.navigate("Login")
  }

  onClickConnectUs(value) {

    console.log("onClickConnectUs ",value);
  }
  render() {
      return (
          <View style={{ flex: 1}}>
            
            <View style={{ height:64}}>
              <View style={{flex:1, marginEnd:20, justifyContent:'center', alignItems:'flex-end'}}>
                <Text >UNIT {this.state.unit}</Text>
              </View>

              <View style={{flex:1,backgroundColor:'red'}}>
                <View style={{flex:1, marginEnd:20, marginStart:20, justifyContent:'center', alignItems:'center'}}>
                  <Text style={{color:'#FFF', fontWeight:'bold',}}>{this.state.headerNoticeText}</Text>
                </View>
              </View>
            </View>
            
            <View style={{flex:1, flexDirection:'row'}}>
              <View style={{flex:1}}>
              </View>

              <View style={{flex:5}}>
                <View style={{flex:1,}}>
                  <View style={{flex:1, alignItems:'flex-start', justifyContent:'center'}}>
                    <Text style={{color:'#F00', fontWeight:'bold',}}> WELCOME </Text>
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
                  <TouchableOpacity onPress={()=>this.onClickGetStarted()} style={{width:150, height:35,alignItems:'center', justifyContent:'center', backgroundColor:'red', borderRadius:5}}>
                    <Text style={{color:'#FFF', fontWeight:'bold'}}>GET STARTED</Text>
                  </TouchableOpacity>
                </View>

                <ConnectWithUs callback={this.onClickConnectUs} />

                <View style={{flex:2}}>
                </View>
              </View>

              <View style={{flex:1}}>
              </View>
            </View>
          </View>
        );
  }
}
export default Welcome;