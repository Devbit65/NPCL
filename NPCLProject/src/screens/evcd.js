

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
import {fetchLoginToRefresh, fetchVerifyBalance, fetchRestoreAPI, startEVCDService, stopEVCDService} from '../utilities/webservices'
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
        var daily_totalConsumption = 0
        var monthly_totalConsumption = 0
        if(dataResouces) {
            daily_totalConsumption = Number(dataResouces.daily_dg_amount) + Number(dataResouces.daily_grid_amount) + Number(dataResouces.fix_charges)
            monthly_totalConsumption = Number(dataResouces.monthly_dg_amount) + Number(dataResouces.monthly_grid_amount) + Number(dataResouces.fix_charges_monthly)
        }
        this.state = {
            balance_inr : dataResouces ? Number(dataResouces.balance_amount).toFixed(2) : "",
            balance_updated_on : dataResouces ? dataResouces.last_reading_updated : '',
            grid_start_time : dataResouces ? dataResouces.last_reading_updated_dg : '',
            grid_kwh : dataResouces ? Number(dataResouces.grid_reading).toFixed(2) : '',
            dg_kwh : dataResouces ? Number(dataResouces.dg_reading).toFixed(2) : '',
            sectioned_grid : dataResouces ? dataResouces.grid_sanctioned_load : '',
            sectioned_dg : dataResouces ? dataResouces.dg_sanctioned_load : '',
            daily_consumption_grid : dataResouces ? dataResouces.daily_grid_amount : '',
            daily_consumption_dg : dataResouces ? dataResouces.daily_dg_amount : '',
            monthly_consumption_grid : dataResouces ? dataResouces.monthly_grid_amount : '',
            monthly_consumption_dg : dataResouces ? dataResouces.monthly_dg_amount : '',
            daily_consumption_grid_unit : dataResouces ? dataResouces.daily_grid_unit : '',
            daily_consumption_dg_unit : dataResouces ? dataResouces.daily_dg_unit : '',
            monthly_consumption_grid_unit : dataResouces ? dataResouces.monthly_grid_unit : '',
            monthly_consumption_dg_unit : dataResouces ? dataResouces.monthly_dg_unit : '',
            daily_consumption_fixed_charged : dataResouces ? dataResouces.fix_charges : '',
            monthly_consumption_fixed_charged : dataResouces ? dataResouces.fix_charges_monthly : '',
            dialy_consumption_total : daily_totalConsumption,
            monthly_consumption_total : monthly_totalConsumption,
            load_unit : dataResouces ? dataResouces.load_unit : '',
            reading_unit : dataResouces ? dataResouces.reading_unit : '',
            currency : dataResouces ? dataResouces.currency : '',
            willShowResetButton : dataResouces ? (Number(dataResouces.grid_overload_setting) < Number(dataResouces.grid_load_alarm)) : '',
            chartWidth : 0,
            chartHeight : 0,
            chartViewWidth:0,
            chartViewHeight:0,
            isShowingDaily : true,
        }

        this.spinner = new Spinner()
    }



    onRefreshClicked() {

        this.spinner.startActivity();

        if(!this.spinner.isNetConnected()){
            alert("Please check you internet connection.")
            this.spinner.stopActivity()
            return;
        }

        fetchLoginToRefresh()
        .then(response=>{

            this.spinner.stopActivity();

            if(response && !response.message.includes('SUCCESS')){
                alert(response.message)
                return;
            }

            new UserData().setUserData(response);
            this.userData = new UserData().getUserData();;

            var dataResouces = this.userData.resource

            var daily_totalConsumption = 0
            var monthly_totalConsumption = 0
            if(dataResouces) {
                daily_totalConsumption = Number(dataResouces.daily_dg_amount) + Number(dataResouces.daily_grid_amount) + Number(dataResouces.fix_charges)
                monthly_totalConsumption = Number(dataResouces.monthly_dg_amount) + Number(dataResouces.monthly_grid_amount) + Number(dataResouces.fix_charges_monthly)
            }
    
            this.setState({
                balance_inr:Number(dataResouces.balance_amount).toFixed(2),
                balance_updated_on:dataResouces.last_reading_updated,
                grid_start_time:dataResouces.last_reading_updated_dg,
                grid_kwh:Number(dataResouces.grid_reading).toFixed(2),
                dg_kwh:Number(dataResouces.dg_reading).toFixed(2),
                sectioned_grid:dataResouces.grid_sanctioned_load,
                sectioned_dg:dataResouces.dg_sanctioned_load,
                daily_consumption_grid : dataResouces.daily_grid_amount,
                daily_consumption_dg : dataResouces.daily_dg_amount,
                monthly_consumption_grid : dataResouces.monthly_grid_amount,
                monthly_consumption_dg : dataResouces.monthly_dg_amount,
                daily_consumption_fixed_charged : dataResouces.fix_charges,
                monthly_consumption_fixed_charged : dataResouces.fix_charges_monthly,
                daily_consumption_grid_unit : dataResouces.daily_grid_unit,
                daily_consumption_dg_unit : dataResouces.daily_dg_unit,
                monthly_consumption_grid_unit : dataResouces.monthly_grid_unit,
                monthly_consumption_dg_unit : dataResouces.monthly_dg_unit,
                dialy_consumption_total : daily_totalConsumption,
                monthly_consumption_total : monthly_totalConsumption,
                load_unit:dataResouces.load_unit,
                reading_unit : dataResouces.reading_unit,
                currency:dataResouces.currency,
                isShowingDaily : true,
            },()=>{
                if(this._scrollView) {
                    this._scrollView.scrollTo({x:0, animated:true})
                }
            })
        })
    }

    cancelReset() {

        this.setState({
            willShowResetButton : false
        })
    }

    verifyBalance() {

        this.spinner.startActivity();

        if(!this.spinner.isNetConnected()){
            alert("Please check you internet connection.")
            this.spinner.stopActivity()
            return;
        }

        fetchVerifyBalance()
        .then(response=>{

            if(response.rc === -1) {
                var msg = response.message
                alert(msg)
            }
            else{
                
                var balance = Number(response.message)
                if(balance < 0){
                    alert("Unable to Re-store due to low balance !!!")
                }
                else {
                    this.restoreApi()
                }
            }
            this.spinner.stopActivity();
        })
        .catch(error=>{
            alert('Data not found')
            this.spinner.stopActivity();
        })
    }

    restoreApi() {

        this.spinner.startActivity();

        if(!this.spinner.isNetConnected()){
            alert("Please check you internet connection.")
            this.spinner.stopActivity()
            return;
        }

        fetchRestoreAPI()
        .then(response=>{

            var msg = response.message
            alert(msg)
            this.setState({
                willShowResetButton:false
            })

            this.spinner.stopActivity();
        })
        .catch(error=>{
            alert('Data not found')
            this.spinner.stopActivity();
        })
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
        var dataResouces = this.userData ? this.userData.resource : null
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

                    <View style={{ height:150, paddingLeft:20, paddingRight:20, alignItems:'center', justifyContent:'center'}}>
                        <View style={[{height:20, margin:5, borderRadius:5, paddingLeft:10, flexDirection:'row', backgroundColor:'#fff', alignItems:'center'}, style.cardShadow]}>
                            <Text style={{flex:1, fontSize:11, color:kThemeBlueColor}}>GRID</Text>
                            
                            <Text style={{width:75, fontSize:11}}>{this.state.monthly_consumption_grid.toFixed(2)}</Text>
                        </View>
                        
                        <View style={[{height:20, margin:5, borderRadius:5, paddingLeft:10, flexDirection:'row', backgroundColor:'#fff', alignItems:'center'}, style.cardShadow]}>
                            <Text style={{flex:1, fontSize:11, color:kThemeBlueColor}}>DG</Text>
                            
                            <Text style={{width:75, fontSize:11}}>{this.state.monthly_consumption_dg.toFixed(2)}</Text>
                        </View>
                        <View style={[{minHeight:20, margin:5, borderRadius:5, paddingLeft:10, flexDirection:'row', backgroundColor:'#fff', alignItems:'center'}, style.cardShadow]}>
                            <Text numberOfLines={2} style={{flex:1, fontSize:11, color:kThemeBlueColor}}>FIXED CHARGES</Text>
                            
                            <Text style={{width:75, fontSize:11}}>{this.state.monthly_consumption_fixed_charged.toFixed(2)}</Text>
                        </View>
                        <View style={[{height:20, margin:5,  borderRadius:5, paddingLeft:10, flexDirection:'row', backgroundColor:'#fff', alignItems:'center'}, style.cardShadow]}>
                            <Text style={{flex:1, fontSize:11, color:kThemeBlueColor}}>TOTAL</Text>
                            
                            <Text style={{width:75, fontSize:11}}>{this.state.monthly_consumption_total.toFixed(2)}</Text>
                        </View>

                        <View style={{flex:0.5, flexDirection:'row'}}>
                            <Text style={{flex:1, fontSize:12}}></Text>
                            
                            <Text style={{flex:1, fontSize:8, textAlign:'right'}}>VALUE IN {dataResouces ? dataResouces.currency : 'RS'}</Text>
                        </View>
                    </View>
                </View> 
    }


    getDailyConsumtionView() {
        var dataResouces = this.userData ? this.userData.resource : null
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

                    <View style={{height:150, paddingLeft:20, paddingRight:20, alignItems:'center', justifyContent:'center'}}>
                        <View style={[{height:20, margin:5, borderRadius:5, paddingLeft:10, flexDirection:'row', backgroundColor:'#fff', alignItems:'center'}, style.cardShadow]}>
                            <Text style={{flex:1, fontSize:11, color:kThemeBlueColor}}>GRID</Text>
                            
                            <Text style={{width:75, fontSize:11}}>{this.state.daily_consumption_grid.toFixed(2)}</Text>
                        </View>
                        
                        <View style={[{height:20, margin:5, borderRadius:5, paddingLeft:10, flexDirection:'row', backgroundColor:'#fff', alignItems:'center'}, style.cardShadow]}>
                            <Text style={{flex:1, fontSize:11, color:kThemeBlueColor}}>DG</Text>
                            
                            <Text style={{width:75, fontSize:11}}>{this.state.daily_consumption_dg.toFixed(2)}</Text>
                        </View>
                        <View style={[{ minHeight:20, margin:5, borderRadius:5, paddingLeft:10, flexDirection:'row', backgroundColor:'#fff', alignItems:'center'}, style.cardShadow]}>
                            <Text numberOfLines={2} style={{flex:1, fontSize:11, color:kThemeBlueColor}}>FIXED CHARGES</Text>
                            
                            <Text style={{width:75, fontSize:11}}>{this.state.daily_consumption_fixed_charged.toFixed(2)}</Text>
                        </View>
                        <View style={[{height:20, margin:5,  borderRadius:5, paddingLeft:10, flexDirection:'row', backgroundColor:'#fff', alignItems:'center'}, style.cardShadow]}>
                            <Text style={{flex:1, fontSize:11, color:kThemeBlueColor}}>TOTAL</Text>
                            
                            <Text style={{width:75, fontSize:11}}>{this.state.dialy_consumption_total.toFixed(2)}</Text>
                        </View>

                        <View style={{flex:0.5, flexDirection:'row'}}>
                            <Text style={{flex:1, fontSize:12}}></Text>
                            
                            <Text style={{flex:1, fontSize:8, textAlign:'right'}}>VALUE IN {dataResouces ? dataResouces.currency : 'RS'}</Text>
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

        var deviceId = "30-30-34-30-36-35-38-33-33-32"
        startEVCDService(deviceId)
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

        var deviceId = "30-30-34-30-36-35-38-33-33-32"
        stopEVCDService(deviceId)
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
        return  <View style={{flex:1, backgroundColor:'#fff'}}>
                    
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
                                        <Image style={{width:15, height:15, resizeMode:'contain'}} source={require("../resources/RedLEDIcon.png")}></Image>
                                        <Text style={{color:kThemeBlueColor, fontWeight:'bold', marginLeft:5}}>POWER</Text>
                                    </View>
                                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                                        <Image style={{width:15, height:15, resizeMode:'contain'}} source={require("../resources/GreenLEDIcon.png")}></Image>
                                        <Text style={{color:kThemeBlueColor, fontWeight:'bold', marginLeft:5,}}>SERVER LINK</Text>
                                    </View>
                                </View>
                                <View style={{flex:1, flexDirection:'row'}}>
                                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                                        <Image style={{width:15, height:15, resizeMode:'contain'}} source={require("../resources/GreenLEDIcon.png")}></Image>
                                        <Text style={{color:kThemeBlueColor, fontWeight:'bold', marginLeft:5,}} numberOfLines={2}>DOCKER COVER</Text>
                                    </View>
                                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                                        <Image style={{width:15, height:15, resizeMode:'contain'}} source={require("../resources/GreenLEDIcon.png")}></Image>
                                        <Text style={{color:kThemeBlueColor, fontWeight:'bold', marginLeft:5}}>VOLTAGE</Text>
                                    </View>
                                    
                                </View>
                            </View>

                            <View style={[{height:200, padding:5, margin:10, marginBottom:5, borderRadius:5, backgroundColor:'rgb(242,242,242)'}, style.cardShadow]}>
                                <Text style={{ fontWeight:'bold', margin:5, color:kThemeBlueColor}}>CHARGE MY EV</Text>

                                <View style={[{flex:1, padding:5, borderRadius:5, backgroundColor:'#FFF'}, style.cardShadow]}>
                                    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                        <View style={{flex:2, flexDirection:'row', alignItems:'center'}}>
                                            <Text style={{fontWeight:'bold', color:kThemeBlueColor}}>GRID</Text>
                                            
                                            {dataResouces && dataResouces.energy_source === 'GRID' && <Image style={{marginLeft:10, width:15, height:15, resizeMode:'contain'}} source={require("../resources/GreenLEDIcon.png")}></Image>}
                                        </View>
                                        <Text style={{ fontWeight:'bold', fontSize:10, }}>{this.state.grid_kwh} {dataResouces ? dataResouces.reading_unit : ''}</Text>
                                    </View>
                                    
                                    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                        <View style={{flex:1}}>
                                            <Text style={{flex:1, fontSize:11}}>START TIME</Text>
                                            
                                            <Text style={{flex:1, fontSize:8}}>{this.state.grid_start_time}</Text>
                                        </View>
                                        <Text style={{ fontWeight:'bold', fontSize:10}}>{this.state.grid_kwh} {dataResouces ? dataResouces.reading_unit : ''}</Text>
                                    </View>
                                    
                                </View>

                                <View style={[{flex:1, marginTop:5, padding:5, borderRadius:5, backgroundColor:'#FFF'}, style.cardShadow]}>
                                    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                        <View style={{flex:2, flexDirection:'row', alignItems:'center'}}>
                                            <Text style={{fontWeight:'bold', color:kThemeBlueColor}}>DG</Text>
                                            
                                            {dataResouces && dataResouces.energy_source === 'DG' && <Image style={{width:15, height:15, resizeMode:'contain'}} source={require("../resources/RedLEDIcon.png")}></Image>}
                                            <Text style={{flex:1, fontSize:11, marginLeft:10}}>OFF</Text>
                                        </View>
                                        <Text style={{ fontWeight:'bold', fontSize:10, }}>{this.state.grid_kwh} {dataResouces ? dataResouces.reading_unit : ''}</Text>
                                    </View>
                                    
                                    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                        <View style={{flex:1}}>
                                            <Text style={{flex:1, fontSize:11}}>START TIME</Text>
                                            
                                            <Text style={{flex:1, fontSize:8}}>{this.state.grid_start_time}</Text>
                                        </View>
                                        <Text style={{ fontWeight:'bold', fontSize:10}}>{this.state.grid_kwh} {dataResouces ? dataResouces.reading_unit : ''}</Text>
                                    </View>
                                    
                                </View>

                                <View style={{height:44, marginTop:5,  flexDirection:'row', alignItems:'center' }}>
                                    <TouchableOpacity style={{width:75, height:40, backgroundColor:kThemeBlueColor, alignItems:'center', justifyContent:'center', borderRadius:10}} onPress={()=>this.onStartService()}>
                                        <Text> START </Text>
                                    </TouchableOpacity>

                                    <View style={{flex:1}} />
                                    <TouchableOpacity style={{width:75, height:40, backgroundColor:kThemeRedColor, alignItems:'center', justifyContent:'center', borderRadius:10}} onPress={()=>this.onStopService()}>
                                        <Text> STOP </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                            <View style={[{flex:1, margin:10, marginBottom:5, marginTop:5, borderRadius:5, backgroundColor:'rgb(242,242,242)'}, style.cardShadow]} onLayout={(event)=>{
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
  
export default connect(mapStateToProps, mapDispatchToProps)(EVCD);