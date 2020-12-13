import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity,
    Image
} from 'react-native';

class NoticeHeader extends Component {

    constructor(props) {
        super(props)
        this.state = {
          unit:1202,
          headerNoticeText : 'IMPORTANT NOTICE    IMPORTANT NOTICE',
        }
      }

    render() {
        return  <View style={{ height:64}}>
                    <View style={{flex:1, marginEnd:20, justifyContent:'center', alignItems:'flex-end'}}>
                        <Text >UNIT {this.state.unit}</Text>
                    </View>

                    <View style={{flex:1,backgroundColor:'red'}}>
                        <View style={{flex:1, marginEnd:20, marginStart:20, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{color:'#FFF', fontWeight:'bold',}}>{this.state.headerNoticeText}</Text>
                        </View>
                    </View>
                </View>
    }
}

export default NoticeHeader;