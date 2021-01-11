
import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity,
    Image
} from 'react-native';

const SocialMediaType = {
  FACEBOOK : 0,
  INSTAGRAM : 1,
  YOUTUBE : 2,
  TWITTER : 3,
  LINKDIN : 4
}

const SocialMediaURL = [
    "https://www.facebook.com",
    "https://www.instagram.com",
    "https://www.youtube.com",
    "https://www.twitter.com",
    "https://www.linkedin.com/"
]

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class ConnectWithUs extends Component {

    onClickConnectUs(value) {

        if(this.props.callback) {
            this.props.callback(value)
        }
      }

    render() {
        return  <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{color:kThemeRedColor, fontWeight:'bold', fontSize:12}}>CONNECT WITH US</Text>
                    
                    <View style={{width:150, height:35,alignItems:'center', justifyContent:'center'}}>
                        <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                            <TouchableOpacity onPress={()=>this.onClickConnectUs(SocialMediaURL[SocialMediaType.FACEBOOK])} style={{width:30, height:30, padding:5}}>
                                <Image style={{width:20, height:20}} source={require("../resources/FB.png")}></Image>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={()=>this.onClickConnectUs(SocialMediaURL[SocialMediaType.INSTAGRAM])} style={{width:30, height:30, padding:5}}>
                                <Image style={{width:20, height:20}} source={require("../resources/Instagram.png")}></Image>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={()=>this.onClickConnectUs(SocialMediaURL[SocialMediaType.YOUTUBE])} style={{width:30, height:30, padding:5}}>
                                <Image style={{width:20, height:20}} source={require("../resources/Youtube.png")}></Image>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={()=>this.onClickConnectUs(SocialMediaURL[SocialMediaType.TWITTER])} style={{width:30, height:30, padding:5}}>
                                <Image style={{width:20, height:20}} source={require("../resources/Twitter.png")}></Image>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={()=>this.onClickConnectUs(SocialMediaURL[SocialMediaType.LINKDIN])} style={{width:30, height:30, padding:5}}>
                                <Image style={{width:20, height:20}} source={require("../resources/Linkdin.png")}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
    }
}

export default ConnectWithUs;