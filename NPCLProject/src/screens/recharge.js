import React, { Component } from 'react';
import {
    Text, 
    View,
    Image,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native';

import UserData from '../utilities/models/user-data'
import {fethchRechargeHistory} from '../utilities/webservices'
import Spinner from '../components/activity-indicator'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { INITIATE_REFRESH } from '../redux/constants';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../redux/action';

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class Recharge extends Component {

    constructor(props) {
        super(props);
        this.spinner = new Spinner()
        this.userData = new UserData().getUserData();
        var dataResouces = this.userData.resource
        this.state = {
            balance_inr:Number(dataResouces.balance_amount).toFixed(2),
            balance_updated_on:dataResouces.last_reading_updated,
            sectioned_grid:dataResouces.grid_sanctioned_load,
            sectioned_dg:dataResouces.dg_sanctioned_load,
            recent_recharge: dataResouces.last_recharge_time,
            history:null,
            isOpenOnline:true,
            isOpenCoupon:false,
            couponAmout:null,
            rechargeAmount:null,
            paymentMethod:null
        }
    }

    componentDidMount() {
        this.fetchRechargeHisory();
    }

    fetchRechargeHisory() {
        this.spinner.startActivity();
        fethchRechargeHistory()
        .then(response=>{

            if(response.rc === 0){
                var history = this.parseHistory(response.resource)
                this.setState({
                    history : history
                })
            }
            else{
                var msg = response.message
                alert(msg)
            }
            
            this.spinner.stopActivity();
        })
        .catch(error=>{
            alert('Data not found')
            this.spinner.stopActivity();
        })

    }

    parseHistory(messages){

        var logMessages = []
        var keys = Object.keys(messages)
        for(var i=0; i<keys.length; i++){
            var message = messages[keys[i]];
            
            var messageArray = message.split('::')
            var date = messageArray[0]
            messageArray[1] = messageArray[1].trim()
            messageArray = messageArray[1].split(' ')
            var rechargeId = messageArray[2].split(',')[0]
            var amount = messageArray[5]
            var logData = {
                id:i.toString(),
                "date":date,
                "recharge_id":rechargeId,
                "amount":amount
            }

            logMessages.push(logData)
        }
        return logMessages;
    }

    openCoupon() {
        this.setState({
            isOpenOnline:false,
            isOpenCoupon:!this.state.isOpenCoupon
        })
    }

    openOnline() {

        this.setState({
            isOpenOnline:!this.state.isOpenOnline,
            isOpenCoupon:false
        })
    }

    payByCoupon() {
        console.log("payByCoupon")
    }

    payByOnline() {
        var url = ''
        var dataResouces = this.userData.resource
        switch (this.state.paymentMethod) {
            case "PAYTM":
                    url = dataResouces.paytm_mobile_url  
                break;
            case "MOBIKWIK":
                    url = dataResouces.mobikwik_mobile_url  
                break;
            case "HDFC":
                    url = dataResouces.paytm_mobile_url  
                break;
                
            default:
                break;
        }

        this.props.showPaymentView(true, url)
    }

    onSelectPaymentMethod(paymentMethod) {

        this.setState({
            paymentMethod:paymentMethod
        })
    }
    componentDidUpdate() {

        if(this.props.data) {
            switch (this.props.data.type) {
                case INITIATE_REFRESH:
                    this.fetchRechargeHisory()
                    this.props.onRefreshInitiated()
                    break;
            
                default:
                    break;
            }
        }
    }

    render() {
        var isPaytmEnabled = false
        var isMobikwikEnabled = false
        var isHDFCEnabled = false
        if(this.userData && this.userData.resource) {

            var dataResouces = this.userData.resource
            isPaytmEnabled = dataResouces.pg_enable_paytm === 'Y'
            isMobikwikEnabled = dataResouces.pg_enable_mobikwik === 'Y'
            isHDFCEnabled = dataResouces.pg_enable_hdfc === 'Y'
        }

        var onlineViewHeight = 75
        if(this.state.isOpenOnline) {
            if(isPaytmEnabled) {
                onlineViewHeight+=15   
            }

            if(isMobikwikEnabled) {
                onlineViewHeight+=15   
            }

            if(isHDFCEnabled) {
                onlineViewHeight+=15   
            }
            
        }
        else {
            onlineViewHeight = 30
        }
        
        
        return  <View style={{flex:1, backgroundColor:'#fff'}}>
                    <View style={{margin:5, alignItems:'flex-start', justifyContent:'center'}}>
                        <Text style={{color:kThemeRedColor, fontWeight:'bold', fontSize:30}}> RECHARGE </Text>
                    </View>
                    <View style={{flex:1}}>
                        <View style={[{ maxHeight:150, margin:5, marginBottom:5, borderRadius:5, backgroundColor:'rgb(242,242,242)'}, style.cardShadow]}>
                            <View style={[{ margin:10, padding:5, borderRadius:5, backgroundColor:'#FFF'},style.cardShadow]}>
                                <View style={{height:25,flexDirection:'row'}}>
                                    <Text style={{flex:1, fontWeight:'bold', color:kThemeBlueColor}}>AVAILABLE BALANCE</Text>
                                    <Text style={{color:kThemeRedColor, fontSize:12}}>{this.state.balance_inr}</Text>
                                </View>
                                                                    
                                <View style={{ height:20, flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
                                    <Text style={{flex:1, fontSize:12}}>UPDATED ON</Text>
                                    
                                    <Text style={{fontSize:10}}>{this.state.balance_updated_on}</Text>
                                </View>
                                <View style={{ height:20, flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
                                    <Text style={{flex:1, fontSize:12}}>RECENT RECHARGE</Text>
                                    
                                    <Text style={{fontSize:10}}>{this.state.recent_recharge}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={[{flex:1, maxHeight:this.state.isOpenOnline?onlineViewHeight : 30, margin:10, marginTop:5, borderRadius:5, backgroundColor:'rgb(242,242,242)', borderColor:kThemeBlueColor, borderWidth:1}, style.cardShadow]}>
                            
                            <View style={{ padding:5, backgroundColor:kThemeBlueColor, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                                <Text style={{flex:1, fontWeight:'bold', color:'#fff'}}>ONLINE</Text>
                                <TouchableOpacity onPress={()=>this.openOnline()} >
                                    <Icon size={20} name={this.state.isOpenOnline?"chevron-down-circle-outline":"chevron-up-circle-outline"} color="#fff" />
                                </TouchableOpacity>
                            </View>

                            {this.state.isOpenOnline && <View style={{flex:2,  flexDirection:'row'}}>
                                
                                <View style={{flex:1,alignItems:'flex-start', justifyContent:'center', margin:10}}>
                                    {isPaytmEnabled && <TouchableOpacity onPress={()=>this.onSelectPaymentMethod("PAYTM")} style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                        <Icon size={15} name={this.state.paymentMethod === "PAYTM" ? "radiobox-marked" : "radiobox-blank"}  color={kThemeBlueColor} />
                                        <Text style={{marginLeft:5}}>PAYTM</Text>
                                    </TouchableOpacity>}
                                    {isMobikwikEnabled && <TouchableOpacity onPress={()=>this.onSelectPaymentMethod("MOBIKWIK")} style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                        <Icon size={15} name={this.state.paymentMethod === "MOBIKWIK" ? "radiobox-marked" : "radiobox-blank"}   color={kThemeBlueColor} />
                                        <Text style={{marginLeft:5}}>MOBIKWIK</Text>
                                    </TouchableOpacity>}
                                    {isHDFCEnabled && <TouchableOpacity onPress={()=>this.onSelectPaymentMethod("HDFC")} style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                        <Icon size={15} name={this.state.paymentMethod === "HDFC" ? "radiobox-marked" : "radiobox-blank"}   color={kThemeBlueColor} />
                                        <Text style={{marginLeft:5}}>HDFC</Text>
                                    </TouchableOpacity>}
                                </View>

                                <View style={{flex:1,alignItems:'center', justifyContent:'center',}}>
                                    <TouchableOpacity onPress={()=>this.payByOnline()} disabled={this.state.paymentMethod === null} style={{ width:60, height:25, backgroundColor:kThemeBlueColor, borderRadius:5,}}>
                                        <View style={{flex:1, opacity:this.state.paymentMethod?1:0.5, alignItems:'center', justifyContent:'center',}}>
                                            <Text style={{color:'#fff'}}>PAY</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>}
                            
                        </View>

                        <View style={[{flex:1, maxHeight:this.state.isOpenCoupon?75 : 30, margin:10, marginTop:5, borderRadius:5, backgroundColor:'rgb(242,242,242)', borderColor:kThemeRedColor, borderWidth:1}, style.cardShadow]}>
                            <View style={{ padding:5, backgroundColor:kThemeRedColor, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                                <Text style={{flex:1, fontWeight:'bold', color:'#fff'}}>COUPON</Text>
                                <TouchableOpacity onPress={()=>this.openCoupon()} >
                                    <Icon size={20} name={this.state.isOpenCoupon?"chevron-down-circle-outline":"chevron-up-circle-outline"}  color="#fff" />
                                </TouchableOpacity>
                            </View>
                            
                            {this.state.isOpenCoupon && <View style={{flex:2,  flexDirection:'row'}}>
                                
                                <View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
                                    <TextInput
                                        style={{paddingLeft:5, fontSize:11, width:100, height: 25, borderWidth:0.5, borderRadius:5, paddingLeft:5, paddingRight:5, fontSize:10, padding:0}}
                                        textAlign={'left'}
                                        placeholder="ENTER AMOUNT"
                                        placeholderTextColor={"#000"}
                                        onChangeText={text => this.setState({couponAmout:text})}
                                        defaultValue={this.state.userid}
                                    />
                                </View>

                                <View style={{flex:1,alignItems:'center', justifyContent:'center',}}>
                                    <TouchableOpacity onPress={()=>this.payByCoupon()} style={{width:60, height:25, backgroundColor:kThemeRedColor, borderRadius:5}}>
                                        <View style={{flex:1, alignItems:'center', justifyContent:'center',}}>
                                            <Text style={{color:'#fff'}}>PAY</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>}
                            
                        </View>

                        <View style={[{ flex:1, margin:5, marginBottom:5, borderRadius:5, backgroundColor:'rgb(242,242,242)'}, style.cardShadow]}>
                            <Text style={{margin:5, fontWeight:'bold', color:kThemeBlueColor}}>RECHARGE HISTORY</Text>
                            <View style={[{ flex:1, margin:5, marginBottom:5, borderRadius:5, backgroundColor:'rgb(242,242,242)'}, style.cardShadow]}>
                                <FlatList
                                    data={this.state.history}
                                    showsVerticalScrollIndicator={true}
                                    renderItem={({ item, index, separators })=>{
                                        
                                        return  <View style={{borderWidth:1, borderColor:kThemeBlueColor, margin:5, borderRadius:5, padding:5}} >
                                                    <View style={{flex:1, alignItems:'center',  justifyContent:'center', flexDirection:'row'}}>
                                                        <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                                                            <Text style={{ fontSize:10}}>Date :</Text>
                                                        </View>
                                                        <View style={{flex:1, flexDirection:'row',alignItems:'center', marginLeft:5}}>
                                                            <Text style={{ fontSize:10}}>{item.date}</Text>
                                                        </View>
                                                        
                                                    </View>
                                                    <View style={{flex:1, alignItems:'center',  justifyContent:'center', flexDirection:'row'}}>
                                                        <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                                                            <Text style={{ fontSize:10}}>Recharged with :</Text>
                                                        </View>
                                                        <View style={{flex:1, flexDirection:'row',alignItems:'center', marginLeft:5}}>
                                                            <Text style={{ fontSize:10}}>{item.recharge_id}</Text>
                                                        </View>
                                                        
                                                    </View>
                                                    <View style={{flex:1, alignItems:'center',  justifyContent:'center', flexDirection:'row'}}>
                                                        <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                                                            <Text style={{ fontSize:10}}>Amount :</Text>
                                                        </View>
                                                        <View style={{flex:1, flexDirection:'row',alignItems:'center', marginLeft:5}}>
                                                            {/* <Icon size={10} name="currency-inr" color="rgb(206, 0, 57)" /> */}
                                                            <Image style={{width:8, height:8, resizeMode:'center'}}  source={require('../resources/rupee24.png')} />
                                                            <Text style={{ color:kThemeRedColor, fontWeight:'bold', fontSize:10}}>{item.amount}</Text>
                                                        </View>
                                                        
                                                    </View>
                                                </View>
                                    }}
                                />
                            </View>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Recharge);