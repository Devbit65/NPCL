

import React, { Component } from 'react';
import {
    Text, 
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';

import UserData from '../utilities/models/user-data'
import Spinner from '../components/activity-indicator'
import { evcdLogin, evcdStatus, startEVCDService, stopEVCDService, fetchEVDailyConsumption, fetchEVMonthlyConsumption} from '../utilities/webservices'
import { INITIATE_REFRESH } from '../redux/constants';

import PieChart from '../components/PieChart'

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../redux/action';

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class EVCD extends Component {

    constructor(props) {
        super(props);
        this.userData = new UserData().getUserData();

        var dataResouces = this.userData ? this.userData.resource:null
        this.state = {
            grid_start_time : dataResouces ? dataResouces.last_reading_updated_dg : '',
            daily_consumption_grid : dataResouces ? dataResouces.daily_grid_amount : '',
            daily_consumption_dg : dataResouces ? dataResouces.daily_dg_amount : '',
            monthly_consumption_grid : dataResouces ? dataResouces.monthly_grid_amount : '',
            monthly_consumption_dg : dataResouces ? dataResouces.monthly_dg_amount : '',
            daily_consumption_grid_unit : dataResouces ? dataResouces.daily_grid_unit : '',
            daily_consumption_dg_unit : dataResouces ? dataResouces.daily_dg_unit : '',
            monthly_consumption_grid_unit : dataResouces ? dataResouces.monthly_grid_unit : '',
            monthly_consumption_dg_unit : dataResouces ? dataResouces.monthly_dg_unit : '',
            monthly_consumption_fixed_charged : dataResouces ? dataResouces.fix_charges_monthly : '',
            load_unit : dataResouces ? dataResouces.load_unit : '',
            reading_unit : dataResouces ? dataResouces.reading_unit : '',
            currency : dataResouces ? dataResouces.currency : '',
            chartWidth : 0,
            chartHeight : 0,
            chartViewWidth:0,
            chartViewHeight:0,
            isShowingDaily : true,
            evcdId : dataResouces ? dataResouces.evcdId : null,
            gridAmount : 0.00,
            gridUnit : 0,
            voltage : 0,
            load : 0,
            current : 0,
            docCover: 0,
            highVol: 0,
            lowVoltage: 0,
            power: 0,
            serverLink: 0,
            gridStatus: 0,
            balance_amt: 0.00,
            kwh:  0,
            dgKwh: 0,
            chargingState : 0,
            showCharging : true,
            evcdDGIntegration : dataResouces ? dataResouces.evcdDGIntegration === 'Y' : false,
            autorefresh : dataResouces && dataResouces.autorefresh ? Number(dataResouces.autorefresh) : 0,
            daily_total_charging_hour : "00:00:00",
            monthly_total_charging_hour : "00:00:00"
        }

        if(this.state.autorefresh > 0) {
            this.autoRefreshInterval = setInterval(() => {
                this.fetchEVCDStatus(true)
            }, this.state.autorefresh*1000);
        }

        this.textBlinkingInterval = null
        this.spinner = new Spinner()
    }

    componentDidMount() {

        // this.fetchEVCDLogin()

        this.spinner.startActivity();
        this.fetchEVCDStatus()
    }

    componentWillUnmount() {
        if(this.autoRefreshInterval) {
            clearInterval(this.autoRefreshInterval)
        }

        if(this.textBlinkingInterval) {
            clearInterval(this.textBlinkingInterval)
        }
    }

    fetchEVCDLogin() {

        this.spinner.startActivity();

        if(!this.spinner.isNetConnected()){
            alert("Please check you internet connection.")
            this.spinner.stopActivity()
            return;
        }

        evcdLogin()
        .then(response=>{

            if(response && response["message"] === "Success"){

            }
            else {
                alert(response["message"])
            }
            this.spinner.stopActivity();
        })
        .catch(error=>{
            alert("Unable to fetch the data");
            this.spinner.stopActivity();
        })
    }

    fetchEVCDStatus(isCalledFromAutoRefresh = false) {

        if(this.textBlinkingInterval) {
            clearInterval(this.textBlinkingInterval)
            this.textBlinkingInterval = null
        }

        if(!this.spinner.isNetConnected()){
            alert("Please check you internet connection.")
            this.spinner.stopActivity()
            return;
        }

        evcdStatus(this.state.evcdId)
        .then(response=>{

            if(response && response["message"] === "Success"){

                this.setState({
                    grid_start_time : response.resource.StartTime,
                    dg_StartTime : response.resource.dg_StartTime,
                    gridAmount : response.resource.amount,
                    voltage : response.resource.voltage,
                    load : response.resource.load,
                    current : response.resource.current,
                    docCover: Number(response.resource.docCover),
                    highVol: Number(response.resource.highVol),
                    lowVoltage: Number(response.resource.lowVoltage),
                    power: Number(response.resource.power),
                    serverLink: Number(response.resource.serverLink),
                    gridStatus: Number(response.resource.gridStatus),
                    balance_amt: response.resource.balance_amt ? response.resource.balance_amt : 0.00,
                    dg_balance_amt: response.resource.dg_balance_amt ? response.resource.dg_balance_amt : 0.00,
                    kwh: response.resource.kwh ? response.resource.kwh : "--",
                    dgKwh: response.resource.dgKwh ? response.resource.dgKwh : 0,
                    chargingState : Number(response.resource.chargingState),
                    showCharging : true
                },()=>{
                    if(this.state.chargingState && !this.textBlinkingInterval) {

                        this.textBlinkingInterval = setInterval(() => {
                        
                            this.setState({
                                showCharging : !this.state.showCharging
                            })
                        }, 500);
                    }
                })
            }
            else {
                alert(response["message"])
            }
            if(isCalledFromAutoRefresh) {
                this.spinner.stopActivity();
            }
            else {
                this.fetchEVDailyConsumption();
            }
        })
        .catch(error=>{
            alert("Unable to fetch the data");
            this.spinner.stopActivity();
        })
    }

    fetchEVDailyConsumption() {

        if(!this.spinner.isNetConnected()){
            alert("Please check you internet connection.")
            this.spinner.stopActivity()
            return;
        }

        fetchEVDailyConsumption(this.state.evcdId)
        .then(response=>{

            if(response && response["message"] === "Success"){

                this.setState({
                    daily_consumption_grid_unit : response.resource.grid_consumption,
                    daily_consumption_grid : response.resource.grid_amt,
                    daily_consumption_dg_unit : this.state.evcdDGIntegration ? response.resource.dg_consumption : '',
                    daily_consumption_dg : this.state.evcdDGIntegration && response.resource.dg_amt ? response.resource.dg_amt : 0,
                    daily_total_charging_hour : response.resource.total_charging_hour ? response.resource.total_charging_hour : "00:00:00"
                })
            }
            this.fetchEVMonthlyConsumption()
        })
        .catch(error=>{
            alert("Unable to fetch the data");
            this.spinner.stopActivity();
        })
    }

    fetchEVMonthlyConsumption() {

        if(!this.spinner.isNetConnected()){
            alert("Please check you internet connection.")
            this.spinner.stopActivity()
            return;
        }

        fetchEVMonthlyConsumption(this.state.evcdId)
        .then(response=>{

            if(response && response["message"] === "Success"){

                this.setState({
                    monthly_consumption_grid_unit : response.resource.grid_consumption,
                    monthly_consumption_grid : response.resource.grid_amt,
                    monthly_consumption_dg_unit : this.state.evcdDGIntegration ? response.resource.dg_consumption : '',
                    monthly_consumption_dg : this.state.evcdDGIntegration && response.resource.dg_amt ? response.resource.dg_amt : 0,
                    monthly_total_charging_hour : response.resource.total_charging_hour ? response.resource.total_charging_hour : "00:00:00"
                })
            }
            else {
                alert(response["message"])
            }
            this.spinner.stopActivity();
        })
        .catch(error=>{
            alert("Unable to fetch the data");
            this.spinner.stopActivity();
        })
    }

    onRefreshClicked() {

        this.spinner.startActivity();

       this.fetchEVCDStatus()
    }


    componentDidUpdate() {

        if(this.props.data) {
            switch (this.props.data.type) {
                case INITIATE_REFRESH:
                    this.onRefreshClicked()
                    this.props.onRefreshInitiated()
                    break;
            
                default:
                    break;
            }
        }
    }

    getMonthlyConsumtionView() {
        return  <View style={{width:this.state.chartViewWidth, height:this.state.chartViewHeight}}>

                    <View style={{flex:1, maxHeight:25, borderRadius:5, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontWeight:'bold', color:kThemeBlueColor}}>MONTH'S CONSUMPTION</Text>
                    </View>

                    <View style={{flex:1,  alignItems:'center', justifyContent:'center'}} onLayout={(event)=>{
                        this.setState({
                            chartWidth:event.nativeEvent.layout.width,
                            chartHeight:event.nativeEvent.layout.height
                        })
                    }} >
                        <PieChart  
                            chartWidth={this.state.chartWidth}
                            chartHeight={this.state.chartHeight}
                            data = {{
                                daily_dg_unit : this.state.monthly_consumption_dg_unit,
                                daily_grid_unit : this.state.monthly_consumption_grid_unit,
                                load_unit : this.state.reading_unit
                            }}
                        />

                    </View>

                    <View style={{ height:125, paddingLeft:10, paddingRight:10, alignItems:'center', justifyContent:'center'}}>
                        <View style={[{height:20, margin:5, borderRadius:5, paddingLeft:10, flexDirection:'row', backgroundColor:'#fff', alignItems:'center'}, style.cardShadow]}>
                            <Text style={{flex:1, fontSize:11, color:kThemeBlueColor}}>GRID</Text>
                            
                            <Text style={{width:75, fontSize:11}}>{this.state.monthly_consumption_grid.toFixed(2)}</Text>
                        </View>
                        
                        {this.state.evcdDGIntegration && <View style={[{height:20, margin:5, borderRadius:5, paddingLeft:10, flexDirection:'row', backgroundColor:'#fff', alignItems:'center'}, style.cardShadow]}>
                            <Text style={{flex:1, fontSize:11, color:kThemeBlueColor}}>DG</Text>
                            
                            <Text style={{width:75, fontSize:11}}>{this.state.monthly_consumption_dg.toFixed(2)}</Text>
                        </View> }
                        <View style={[{ minHeight:20, margin:5, borderRadius:5, paddingLeft:10, flexDirection:'row', backgroundColor:'#fff', alignItems:'center'}, style.cardShadow]}>
                            <Text numberOfLines={2} style={{flex:1, fontSize:11, color:kThemeBlueColor}}>TOTAL CHARGING HOUR</Text>
                            
                            <Text style={{width:75, fontSize:11}}>{this.state.monthly_total_charging_hour}</Text>
                        </View>

                        <View style={{flex:0.5, flexDirection:'row'}}>
                            <Text style={{flex:1, fontSize:12}}></Text>
                            
                        </View>
                    </View>
                </View> 
    }


    getDailyConsumtionView() {
        return  <View style={{width:this.state.chartViewWidth, height:this.state.chartViewHeight}}>

                    <View style={{flex:1, maxHeight:25, borderRadius:5, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontWeight:'bold', color:kThemeBlueColor}}>TODAY'S CONSUMPTION</Text>
                    </View>

                    <View style={{flex:1,  alignItems:'center', justifyContent:'center'}} onLayout={(event)=>{
                        this.setState({
                            chartWidth:event.nativeEvent.layout.width,
                            chartHeight:event.nativeEvent.layout.height
                        })
                    }} >
                        <PieChart  
                            chartWidth={this.state.chartWidth}
                            chartHeight={this.state.chartHeight}
                            data = {{
                                daily_dg_unit : this.state.daily_consumption_dg_unit,
                                daily_grid_unit : this.state.daily_consumption_grid_unit,
                                load_unit : this.state.reading_unit
                            }}
                        />

                    </View>

                    <View style={{height:125, paddingLeft:10, paddingRight:10, alignItems:'center', justifyContent:'center'}}>
                        <View style={[{height:20, margin:5, borderRadius:5, paddingLeft:10, flexDirection:'row', backgroundColor:'#fff', alignItems:'center'}, style.cardShadow]}>
                            <Text style={{flex:1, fontSize:11, color:kThemeBlueColor}}>GRID</Text>
                            
                            <Text style={{width:75, fontSize:11}}>{this.state.daily_consumption_grid.toFixed(2)}</Text>
                        </View>
                        
                        {this.state.evcdDGIntegration && <View style={[{height:20, margin:5, borderRadius:5, paddingLeft:10, flexDirection:'row', backgroundColor:'#fff', alignItems:'center'}, style.cardShadow]}>
                            <Text style={{flex:1, fontSize:11, color:kThemeBlueColor}}>DG</Text>
                            
                            <Text style={{width:75, fontSize:11}}>{this.state.daily_consumption_dg.toFixed(2)}</Text>
                        </View>}
                        <View style={[{ minHeight:20, margin:5, borderRadius:5, paddingLeft:10, flexDirection:'row', backgroundColor:'#fff', alignItems:'center'}, style.cardShadow]}>
                            <Text numberOfLines={2} style={{flex:1, fontSize:11, color:kThemeBlueColor}}>TOTAL CHARGING HOUR</Text>
                            
                            <Text style={{width:75, fontSize:11}}>{this.state.daily_total_charging_hour}</Text>
                        </View>

                        <View style={{flex:0.5, flexDirection:'row'}}>
                            <Text style={{flex:1, fontSize:12}}></Text>
                            
                        </View>
                    </View>
                </View> 
    }

    onStartService() {

        this.spinner.startActivity();

        if(!this.spinner.isNetConnected()){
            alert("Please check you internet connection.")
            this.spinner.stopActivity()
            return;
        }

        startEVCDService(this.state.evcdId)
        .then(response=>{

            var msg = response.message
            alert(msg)

            this.spinner.stopActivity();
        })
        .catch(error=>{
            this.spinner.stopActivity();
        })
    }

    onStopService() {

        this.spinner.startActivity();

        if(!this.spinner.isNetConnected()){
            alert("Please check you internet connection.")
            this.spinner.stopActivity()
            return;
        }

        stopEVCDService(this.state.evcdId)
        .then(response=>{

            var msg = response.message
            alert(msg)

            this.spinner.stopActivity();
        })
        .catch(error=>{
            this.spinner.stopActivity();
        })
    }


    moveToNextPage(willMoveToDaily) {

        this.setState({
            isShowingDaily : willMoveToDaily
        },()=>{
            if(this._scrollView) {
                this._scrollView.scrollTo({x:willMoveToDaily?0:this.state.chartViewWidth, animated:true})
            }
        })
    }

    render() {
        var dataResouces = this.userData ? this.userData.resource : null
        return  <ScrollView style={{flex:1, marginBottom:10, backgroundColor:'#fff'}}>
                    
                    <View style={{height:40, margin:5, flexDirection:'row'}}>
                        <View style={{flex:1, alignItems:'flex-start', justifyContent:'center'}}>
                            <Text style={{color:kThemeRedColor, fontWeight:'bold', fontSize:30}}> MY EV </Text>
                        </View>
                        <TouchableOpacity style={{ width:40, height:40, marginRight:10, alignItems:'center', justifyContent:'center'}} onPress={()=>this.onRefreshClicked()}>
                            <Image style={{width:25, height:25, resizeMode:'stretch'}} source={require("../resources/Refresh_icon.png")}></Image>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex:1}}>
                        <View style={{flex:1, marginLeft:10, marginRight:10}}>
                            <View style={[{height:75, padding:5, margin:10, marginBottom:0, borderRadius:5, backgroundColor:'rgb(242,242,242)'}, style.cardShadow]}>
                                <View style={{flex:1, flexDirection:'row'}}>
                                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                                        <Image style={{width:15, height:15, resizeMode:'contain'}} source={this.state.power === 0 ? require("../resources/GreenLEDIcon.png") : require("../resources/RedLEDIcon.png")}></Image>
                                        <Text style={{color:kThemeBlueColor, fontWeight:'bold', marginLeft:5}}>POWER</Text>
                                    </View>
                                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                                        <Image style={{width:15, height:15, resizeMode:'contain'}} source={this.state.serverLink === 0 ? require("../resources/GreenLEDIcon.png") : require("../resources/RedLEDIcon.png")}></Image>
                                        <Text style={{color:kThemeBlueColor, fontWeight:'bold', marginLeft:5,}}>SERVER LINK</Text>
                                    </View>
                                </View>
                                <View style={{flex:1, flexDirection:'row'}}>
                                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                                        <Image style={{width:15, height:15, resizeMode:'contain'}} source={this.state.docCover === 0 ? require("../resources/GreenLEDIcon.png") : require("../resources/RedLEDIcon.png")}></Image>
                                        <Text style={{color:kThemeBlueColor, fontWeight:'bold', marginLeft:5,}} numberOfLines={2}>DOC COVER</Text>
                                    </View>
                                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                                        <Image style={{width:15, height:15, resizeMode:'contain'}} source={this.state.highVol === 0 && this.state.lowVoltage === 0 ? require("../resources/GreenLEDIcon.png") : require("../resources/RedLEDIcon.png")}></Image>
                                        <Text style={{color:kThemeBlueColor, fontWeight:'bold', marginLeft:5}}>VOLTAGE</Text>
                                    </View>
                                    
                                </View>
                            </View>

                            <View style={[{height:100, padding:5, margin:10, marginBottom:0, borderRadius:5, backgroundColor:'rgb(242,242,242)'}, style.cardShadow]}>
                                <View style={[{flex:1, padding:5, borderRadius:5, backgroundColor:'#FFF'}, style.cardShadow]}>
                                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                                        <Text style={{flex:1, color:kThemeBlueColor, fontWeight:'bold', marginRight:5}}>VOLTAGE </Text>
                                        <Text style={{flex:1, color:kThemeBlueColor, fontWeight:'bold', marginRight:5}}> : {this.state.voltage} V </Text>
                                    </View>
                                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                                        <Text style={{flex:1, color:kThemeBlueColor, fontWeight:'bold', marginRight:5}} numberOfLines={2}>CURRENT </Text>
                                        <Text style={{flex:1, color:kThemeBlueColor, fontWeight:'bold', marginRight:5}}> : {this.state.current} A </Text>
                                    </View>
                                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                                        <Text style={{flex:1, color:kThemeBlueColor, fontWeight:'bold', marginRight:5, }}>LOAD </Text>
                                        <Text style={{flex:1, color:kThemeBlueColor, fontWeight:'bold', marginRight:5}}> : {this.state.load} kW </Text>
                                    </View>
                                </View>
                                    
                            </View>

                            <View style={[{minHeight:160, padding:5, margin:10, marginBottom:5, borderRadius:5, backgroundColor:'rgb(242,242,242)'}, style.cardShadow]}>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <Text style={{ flex:1, fontWeight:'bold', margin:5, color:kThemeBlueColor}}>CHARGE MY EV</Text>
                                    {this.state.showCharging && <Text style={{fontWeight:'bold', fontSize:11, color:this.state.chargingState === 1?"#62c649":kThemeBlueColor}}>{this.state.chargingState === 1? "CHARGING" : "AVAILABLE"} </Text>}
                                </View>

                                <View style={[{flex:1, padding:5, borderRadius:5, backgroundColor:'#FFF'}, style.cardShadow]}>
                                    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                        <View style={{flex:2, flexDirection:'row', alignItems:'center'}}>
                                            <Text style={{fontWeight:'bold', color:kThemeBlueColor}}>GRID</Text>
                                            
                                            <Image style={{marginLeft:10, width:15, height:15, resizeMode:'contain'}} source={this.state.gridStatus === 1 ? require("../resources/GreenLEDIcon.png") : require("../resources/RedLEDIcon.png")}></Image>
                                        </View>
                                        <Text style={{ fontWeight:'bold', fontSize:10, }}> {dataResouces ? dataResouces.reading_unit : ''} {this.state.kwh} </Text>
                                    </View>
                                    
                                    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                        <View style={{flex:1}}>
                                            <Text style={{flex:1, fontSize:11}}>START TIME</Text>
                                            
                                            <Text style={{flex:1, fontSize:8}}>{this.state.grid_start_time}</Text>
                                        </View>
                                        <Text style={{ fontWeight:'bold', fontSize:10, color:kThemeRedColor}}> {dataResouces ? dataResouces.currency : ''} {this.state.balance_amt}</Text>
                                    </View>
                                    
                                </View>

                                {this.state.evcdDGIntegration &&<View style={[{flex:1, marginTop:10, padding:5, borderRadius:5, backgroundColor:'#FFF'}, style.cardShadow]}>
                                    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                        <View style={{flex:2, flexDirection:'row', alignItems:'center'}}>
                                            <Text style={{fontWeight:'bold', color:kThemeBlueColor}}>DG</Text>
                                            
                                            <Image style={{marginLeft:10, width:15, height:15, resizeMode:'contain'}} source={this.state.gridStatus === 1 ? require("../resources/GreenLEDIcon.png") : require("../resources/RedLEDIcon.png")}></Image>
                                        </View>
                                        <Text style={{ fontWeight:'bold', fontSize:10, }}> {dataResouces ? dataResouces.reading_unit : ''} {this.state.dgKwh} </Text>
                                    </View>
                                    
                                    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                        <View style={{flex:1}}>
                                            <Text style={{flex:1, fontSize:11}}>START TIME</Text>
                                            
                                            <Text style={{flex:1, fontSize:8}}>{this.state.dg_StartTime}</Text>
                                        </View>
                                        <Text style={{ fontWeight:'bold', fontSize:10, color:kThemeRedColor}}> {dataResouces ? dataResouces.currency : ''} {this.state.dg_balance_amt}</Text>
                                    </View>
                                    
                                </View>}

                                <View style={{height:50, marginTop:5,  flexDirection:'row', alignItems:'center' }}>
                                    <TouchableOpacity disabled={!this.state.evcdId} style={{width:75, height:40, backgroundColor:kThemeBlueColor, alignItems:'center', justifyContent:'center', borderRadius:10, opacity:this.state.evcdId?1:0.5}} onPress={()=>this.onStartService()}>
                                        <Text style={{color:'#fff'}}> START </Text>
                                    </TouchableOpacity>

                                    <View style={{flex:1}} />
                                    <TouchableOpacity disabled={!this.state.evcdId} style={{width:75, height:40, backgroundColor:kThemeRedColor, alignItems:'center', justifyContent:'center', borderRadius:10, opacity:this.state.evcdId?1:0.5}} onPress={()=>this.onStopService()}>
                                        <Text style={{color:'#fff'}}> STOP </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                            <View style={[{flex:1, minHeight:375, margin:10,  borderRadius:5, backgroundColor:'rgb(242,242,242)'}, style.cardShadow]} onLayout={(event)=>{
                                this.setState({
                                    chartViewWidth : event.nativeEvent.layout.width,
                                    chartViewHeight : event.nativeEvent.layout.height
                                })
                            }}>
                                <ScrollView
                                    style={{width:this.state.chartViewWidth, height:this.state.chartViewHeight}}
                                    ref={el => this._scrollView = el}
                                    horizontal={true}
                                    pagingEnabled={true}
                                    showsHorizontalScrollIndicator={false}
                                    alwaysBounceHorizontal={false}
                                    automaticallyAdjustContentInsets={false}
                                    onMomentumScrollEnd={(event)=>{
                                        this.setState({
                                            isShowingDaily : event.nativeEvent.contentOffset.x === 0 
                                        })
                                    }}
                                >
                                    {this.getDailyConsumtionView()}
                                    {this.getMonthlyConsumtionView()}
                                </ScrollView>
                                <TouchableOpacity onPress={()=>this.moveToNextPage(true)} style={{width:24, height:24, position:'absolute', bottom:5, left:(this.state.chartViewWidth-12)/2-10, alignItems:'center', justifyContent:'flex-end'}} >
                                    <View style={{width:10, height:10, backgroundColor:this.state.isShowingDaily?kThemeBlueColor:'gray', borderRadius:10}} ></View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=>this.moveToNextPage(false)} style={{width:24, height:24, position:'absolute', bottom:5, left:(this.state.chartViewWidth-12)/2+10, alignItems:'center', justifyContent:'flex-end'}} >
                                    <View style={{width:10, height:10, backgroundColor:this.state.isShowingDaily?'gray' : kThemeBlueColor, borderRadius:10}} ></View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                    </View>
                    
                </ScrollView>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(EVCD);