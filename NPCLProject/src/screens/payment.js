

import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';

import { WebView } from 'react-native-webview';
import Spinner from '../components/activity-indicator'
import NoticeHeader from "../components/notice-header";
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserData from '../utilities/models/user-data'

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../redux/action';

var paymentVC = require('react-native').NativeModules.CCAvenuePaymentDisplayVC;

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class Payment extends Component {

    constructor(props) {
        super(props)

        const { params } = this.props.route;
        this.userData = new UserData().getUserData();
        var dataResouces = this.userData ? this.userData.resource:null
        this.state = {
            amount : "",
            transCharges : dataResouces?Number(dataResouces.recharge_transitional_charge):0.00,
            transitionalName:dataResouces?dataResouces.recharge_transitional_name:"IGST",
            gstValue : dataResouces && dataResouces.recharge_tax ? dataResouces.recharge_tax:0.00,
            paymentMethod : params["paymentMethod"],
            paymentURL : null
        }
        this.spinner = new Spinner()
        this.spinner.startActivity()
        if(!this.spinner.isNetConnected()){
            alert("Please check you internet connection.")
            this.spinner.stopActivity()
        }
    }
    componentDidMount() {
        
        var url = null
        var dataResouces = this.userData.resource
        switch (this.state.paymentMethod) {
            case "PAYTM":
                    url = dataResouces.paytm_mobile_url  
                break;
            case "MOBIKWIK":
                    url = dataResouces.mobikwik_mobile_url  
                break;
            case "HDFC":
                this.spinner.stopActivity()
                    // url = dataResouces.paytm_mobile_url  
                break;
                
            default:
                break;
        }
        if(url) {
            this.setState({
                paymentURL:url
            })
        }
        
    }

    onFinishLoading() {
        this.spinner.stopActivity()
    }

    onPressBackButton() {
        this.props.showPaymentView(false)
        this.props.navigation.pop()
    }

    payByOnline(netAmount) {
        this.spinner.startActivity()

        if(!this.spinner.isNetConnected()){
            alert("Please check you internet connection.")
            this.spinner.stopActivity()
            return;
        }

        if(!Number(this.state.amount) || Number(this.state.amount) < Number(this.userData.resource.min_recharge) || Number(this.state.amount) > Number(this.userData.resource.max_recharge)) {
            alert("Please enter valid amount between "+this.userData.resource.min_recharge+" to "+this.userData.resource.max_recharge)
            this.spinner.stopActivity()
            return;
        }
        
        var userObj = new UserData();
        var hostURL = userObj.getBaseURL()
        if(!hostURL.includes('https://')){
            hostURL = 'https://'+hostURL
        }
        paymentVC.openPaymentView(hostURL, this.userData.resource, netAmount.toString(), userObj.getUserCredential())
        setTimeout(() => {
            this.spinner.stopActivity()
        }, 2000);
    }

    render() {
        const { params } = this.props.route;
        var gstValue = this.state.gstValue
        var netAmount = Number(this.state.amount) + Number(this.state.transCharges)+Number(gstValue)
        netAmount = parseFloat(netAmount).toFixed(2)
        return <View style={{flex:1, backgroundColor:'#fff'}}>
                    <View style={{ flex: 1, maxHeight:64, justifyContent:'center', flexDirection:'row', backgroundColor:'#fff'}} >
                        
                        <View style={{ flex: 1,}} >
                            <NoticeHeader />
                        </View>

                    </View>
                    <View style={{ flex: 1, backgroundColor:'#fff'}} >
                        <View style={{height:50, flexDirection:'row', marginLeft:10,}}>
                            <TouchableOpacity onPress={()=>this.onPressBackButton()} style={{width:25, alignItems:'center', justifyContent:'center'}}>
                                <Icon size={21} name="arrow-back-ios" color="rgb(206, 0, 57)" />
                            </TouchableOpacity>
                            <View style={{flex:1, height:50, margin:5, flexDirection:'row'}}>
                                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                    <Text style={{color:kThemeRedColor, fontWeight:'bold', fontSize:22}}> Online Recharge </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flex:1}}>
                            
                            {this.state.paymentURL && <WebView style={{flex:1}} source={{uri:this.state.paymentURL}}  onLoadEnd={this.onFinishLoading.bind(this)}/> }
                            
                            {this.state.paymentMethod === 'HDFC' && <View style={{flex:1, margin:25, borderRadius:10}}>
                                <View style={{margin:25,}}>
                                    <Text style={{ color:kThemeBlueColor}}>AMOUNT</Text>
                                    <TextInput
                                        value={this.state.amount}
                                        style={{paddingLeft:5, marginTop:5, height: 25, borderWidth:0.5, borderRadius:5, borderColor:kThemeBlueColor, padding:0}}
                                        textAlign={'left'}
                                        placeholder="Amount"
                                        keyboardType = 'numeric'
                                        onChangeText={text => this.setState({amount:text},()=>{})}
                                        defaultValue={this.state.amount}
                                    />
                                </View>
                                <View style={{marginLeft:25, marginRight:25, alignItems:'center', justifyContent:'center'}}>
                                    <Text style={{ fontSize:16, fontWeight:'bold', color:kThemeRedColor}}>Recharge Breakup</Text>
                                </View>
                                <View style={[{ borderWidth:1, borderColor:kThemeBlueColor, margin:25,marginTop:10, borderRadius:5, padding:5},style.cardShadow]}>

                                    <View style={{ margin:5, borderRadius:5, padding:5, height:25, borderBottomWidth:1, borderColor:kThemeBlueColor}} >
                                        <View style={{flex:1, alignItems:'center',  justifyContent:'center', flexDirection:'row'}}>
                                            <View style={{flex:2, alignItems:'flex-end', justifyContent:'center'}}>
                                                <Text style={{ fontSize:12, fontWeight:'bold'}}>Net Amount :</Text>
                                            </View>
                                            <View style={{flex:1, flexDirection:'row',alignItems:'center', marginLeft:5}}>
                                                <Text style={{ fontSize:12, color:kThemeBlueColor}}>{Number(this.state.amount)?this.state.amount:0}</Text>
                                            </View>
                                            
                                        </View>
                                        
                                    </View>

                                    <View style={{ margin:5, borderRadius:5, padding:5, height:25, borderBottomWidth:1, borderColor:kThemeBlueColor}} >
                                        <View style={{flex:1, alignItems:'center',  justifyContent:'center', flexDirection:'row'}}>
                                            <View style={{flex:2, alignItems:'flex-end', justifyContent:'center'}}>
                                                <Text style={{ fontSize:12, fontWeight:'bold'}}>Transaction Charges :</Text>
                                            </View>
                                            <View style={{flex:1, flexDirection:'row',alignItems:'center', marginLeft:5}}>
                                                <Text style={{ fontSize:12, color:kThemeBlueColor}}>{this.state.transCharges}</Text>
                                            </View>
                                            
                                        </View>
                                        
                                    </View>

                                    <View style={{ margin:5, borderRadius:5, padding:5, height:25, borderBottomWidth:1, borderColor:kThemeBlueColor}} >
                                        <View style={{flex:1, alignItems:'center',  justifyContent:'center', flexDirection:'row'}}>
                                            <View style={{flex:2, alignItems:'flex-end', justifyContent:'center'}}>
                                                <Text style={{ fontSize:12, fontWeight:'bold'}}>{this.state.transitionalName} :</Text>
                                            </View>
                                            <View style={{flex:1, flexDirection:'row',alignItems:'center', marginLeft:5}}>
                                                <Text style={{ fontSize:12, color:kThemeBlueColor}}>{gstValue}</Text>
                                            </View>
                                            
                                        </View>
                                        
                                    </View>

                                    <View style={{ margin:5, borderRadius:5, padding:5, height:25, borderBottomWidth:1, borderColor:kThemeBlueColor}} >
                                        <View style={{flex:1, alignItems:'center',  justifyContent:'center', flexDirection:'row'}}>
                                            <View style={{flex:2, alignItems:'flex-end', justifyContent:'center'}}>
                                                <Text style={{ fontSize:12, fontWeight:'bold'}}>Total Payable Amount :</Text>
                                            </View>
                                            <View style={{flex:1, flexDirection:'row',alignItems:'center', marginLeft:5}}>
                                                <Text style={{ fontSize:12, color:kThemeBlueColor}}>{netAmount}</Text>
                                            </View>
                                            
                                        </View>
                                        
                                    </View>

                                    <View style={{alignItems:'center', justifyContent:'center',}}>
                                        <TouchableOpacity disabled={isNaN(this.state.amount) || Number(this.state.amount)<=0} onPress={()=>this.payByOnline(netAmount)} style={{ width:120, height:25, backgroundColor:kThemeBlueColor, borderRadius:5, opacity:isNaN(this.state.amount) || this.state.amount<=0?0.5:1}}>
                                            <View style={{flex:1, alignItems:'center', justifyContent:'center',}}>
                                                <Text style={{color:'#fff'}}>PAY</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>}
                        </View>
                    </View>
                    
            </View>

    }
}

var style = StyleSheet.create({
    cardShadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,

        elevation: 1,
    }
})

function mapStateToProps(state) {
    return {
        data : state.appReducer.data
    };
  }
  
  function mapDispatchToProps(dispatch) { 
      return bindActionCreators(ActionCreators, dispatch); 
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
