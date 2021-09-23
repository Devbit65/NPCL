
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
                    <Text style={{color:kThemeRedColor, fontWeight:'bold'}}>CONNECT WITH US ON</Text>
                    
                    <View style={{width:'85%', height:50,alignItems:'center', justifyContent:'center'}}>
                        <View style={{ flexDirection:'row'}}>
                            <TouchableOpacity onPress={()=>this.onClickConnectUs(this.props.socialMediaURLs['facebook'])} style={{flex:1, alignItems:'center', justifyContent:'center',}}>
                                <Image style={{width:30, height:30}} resizeMode="contain" source={require("../resources/FB.png")}></Image>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={()=>this.onClickConnectUs(this.props.socialMediaURLs['instagram'])} style={{flex:1, alignItems:'center', justifyContent:'center',}}>
                                <Image style={{width:30, height:30}} resizeMode="contain" source={require("../resources/Instagram.png")}></Image>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={()=>this.onClickConnectUs(this.props.socialMediaURLs['youtube'])} style={{flex:1, alignItems:'center', justifyContent:'center',}}>
                                <Image style={{width:30, height:30}} resizeMode="contain" source={require("../resources/Youtube.png")}></Image>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={()=>this.onClickConnectUs(this.props.socialMediaURLs['twitter'])} style={{flex:1, alignItems:'center', justifyContent:'center',}}>
                                <Image style={{width:30, height:30}} resizeMode="contain" source={require("../resources/Twitter.png")}></Image>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={()=>this.onClickConnectUs(this.props.socialMediaURLs['linked_in'])} style={{flex:1, alignItems:'center', justifyContent:'center',}}>
                                <Image style={{width:30, height:30}} resizeMode="contain" source={require("../resources/Linkdin.png")}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
    }
}

export default ConnectWithUs;