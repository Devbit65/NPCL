import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import MarqueeText from 'react-native-marquee';

import UserData from '../utilities/models/user-data'

class NoticeHeader extends Component {

    constructor(props) {
        super(props)
        this.userData = new UserData().getUserData();
        this.state = {
          unit:this.userData.resource.flat_number,
          headerNoticeText : this.userData.resource.msg,
        }
      }

    render() {
        return  <View style={{ height:64}}>
                    <View style={{flex:1, marginEnd:20, justifyContent:'center', alignItems:'flex-end'}}>
                        <Text >UNIT {this.state.unit}</Text>
                    </View>

                    <View style={{flex:1,backgroundColor:'red'}}>
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