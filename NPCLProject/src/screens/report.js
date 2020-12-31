import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity,
    Image
} from 'react-native';

import NoticeHeader from "../components/notice-header";

import * as Utilities from "../utilities/utilities-methods";


class Report extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return  <View style={{flex:1}}>
                    {/* <NoticeHeader /> */}
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <Text>Report</Text>
                    </View>
                </View>
    }
}

export default Report;