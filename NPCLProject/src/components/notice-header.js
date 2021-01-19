import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import MarqueeText from 'react-native-marquee';

import UserData from '../utilities/models/user-data'

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class NoticeHeader extends Component {

    constructor(props) {
        super(props)
        this.userData = new UserData().getUserData();
        this.state = {
          unit:this.userData && this.userData.resource.flat_number?this.userData.resource.flat_number:'--',
          headerNoticeText : this.userData && this.userData.resource.msg?this.userData.resource.msg:'',
        }
      }

    render() {
        return  <View style={{ height:44}}>
                    <View style={{flex:1, marginEnd:20, justifyContent:'center', alignItems:'flex-end'}}>
                        <Text style={{fontSize:10, fontWeight:'bold'}} >UNIT {this.state.unit}</Text>
                    </View>

                    <View style={{flex:1,backgroundColor:kThemeRedColor}}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <MarqueeText
                                style={{color:'#FFF', fontWeight:'bold',}}
                                duration={3000}
                                marqueeOnStart
                                loop
                                marqueeDelay={1000}
                                marqueeResetDelay={1000}
                                >
                                {this.state.headerNoticeText}
                            </MarqueeText>
                        </View>
                    </View>
                </View>
    }
}

export default NoticeHeader;