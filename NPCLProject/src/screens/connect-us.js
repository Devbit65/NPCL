

import React, { Component } from 'react';
import {
    View,
} from 'react-native';

import { WebView } from 'react-native-webview';
import Spinner from '../components/activity-indicator'

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class ConnectUs extends Component {

    constructor(props) {
        super(props)

        this.spinner = new Spinner()
        this.spinner.startActivity()
    }

    onFinishLoading() {
        this.spinner.stopActivity()
    }
    render() {
        const { params } = this.props.route;
        return <View style={{flex:1}}>
                    <WebView style={{flex:1}} source={{uri:params["url"]}}  onLoadEnd={this.onFinishLoading.bind(this)}/>
            </View>
    }
}

export default ConnectUs;