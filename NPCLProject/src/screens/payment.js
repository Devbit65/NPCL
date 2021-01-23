

import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

import { WebView } from 'react-native-webview';
import Spinner from '../components/activity-indicator'
import NoticeHeader from "../components/notice-header";
import Icon from 'react-native-vector-icons/MaterialIcons';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../redux/action';

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class Payment extends Component {

    constructor(props) {
        super(props)

        this.spinner = new Spinner()
        this.spinner.startActivity()
    }

    onFinishLoading() {
        this.spinner.stopActivity()
    }

    onPressBackButton() {
        this.props.showPaymentView(false)
        this.props.navigation.pop()
    }

    render() {
        const { params } = this.props.route;
        return <View style={{flex:1, backgroundColor:'#fff'}}>
                    <View style={{ flex: 1, maxHeight:64, justifyContent:'center', flexDirection:'row', backgroundColor:'#fff'}} >
                        
                        <View style={{ flex: 1,}} >
                            <NoticeHeader />
                        </View>

                    </View>
                    <View style={{ flex: 1, backgroundColor:'#fff'}} >
                        <View style={{height:44, flexDirection:'row', marginLeft:10,}}>
                            <TouchableOpacity onPress={()=>this.onPressBackButton()} style={{width:25, alignItems:'center', justifyContent:'center'}}>
                                <Icon size={21} name="arrow-back-ios" color="rgb(206, 0, 57)" />
                            </TouchableOpacity>
                            <View style={{flex:1, maxHeight:40, margin:5, flexDirection:'row'}}>
                                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                    <Text style={{color:kThemeRedColor, fontWeight:'bold', fontSize:30}}> Online Recharge </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flex:1}}>
                            <WebView style={{flex:1}} source={{uri:params["paymentURL"]}}  onLoadEnd={this.onFinishLoading.bind(this)}/>
                        </View>
                    </View>
                    
            </View>

    }
}

function mapStateToProps(state) {
    return {
        data : state.appReducer.data
    };
  }
  
  function mapDispatchToProps(dispatch) { 
      return bindActionCreators(ActionCreators, dispatch); 
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
