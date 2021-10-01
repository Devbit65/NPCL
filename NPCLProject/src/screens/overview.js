import React, { Component } from 'react';
import {
    Text, 
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Platform
} from 'react-native';

import UserData from '../utilities/models/user-data'
import Spinner from '../components/activity-indicator'
import {fetchLoginToRefresh, fetchVerifyBalance, fetchRestoreAPI, fetchCRCRStatus} from '../utilities/webservices'
import { INITIATE_REFRESH } from '../redux/constants';

import PieChart from '../components/PieChart'

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../redux/action';

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class Overview extends Component {

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
            willShowResetButton : dataResouces && (dataResouces.current_status === "Overload GRID" || dataResouces.current_status === "Overload DG"),//(Number(dataResouces.grid_overload_setting) < Number(dataResouces.grid_load_alarm)) : '',
            chartWidth : 0,
            chartHeight : 0,
            chartViewWidth:0,
            chartViewHeight:0,
            isShowingDaily : true,
            current_status : dataResouces ? dataResouces.current_status : "--",
            overview_fc_name : dataResouces ? dataResouces.overview_fc_name : "Fixed Charges",
            drCrStatusValue : null
        }

        this.spinner = new Spinner()
    }

    componentDidMount() {
        this.spinner.startActivity();
        this.onRefreshClicked()
    }


    fetchCRCRStatus() {

        if(!this.spinner.isNetConnected()){
            alert("Please check you internet connection.")
            this.spinner.stopActivity()
            return;
        }

        this.spinner.startActivity();
        fetchCRCRStatus()
        .then(response=>{

            this.spinner.stopActivity();

            if(response && (response.status === 'Y' || response.status === 'y')){
                this.setState({
                    drCrStatusValue : {
                        name:response.name,
                        amount:response.amount,
                        type:response.type,
                        date:response.date
                    }
                })
            }
            else {
                this.setState({
                    drCrStatusValue : null
                })
            }
        })
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
                current_status : dataResouces ? dataResouces.current_status : "--",
                overview_fc_name : dataResouces ? dataResouces.overview_fc_name: "Fixed Charges",
                willShowResetButton : dataResouces && (dataResouces.current_status === "Overload GRID" || dataResouces.current_status === "Overload DG"),
            },()=>{
                this.fetchCRCRStatus()
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

                    <View style={{flex:1, maxHeight:25, borderRadius:5, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>this.moveToNextPage(true)} style={{width:25, height:25, alignItems:'center', justifyContent:'center'}} >
                            <Text style={{fontWeight:'bold', fontSize:20, color:kThemeBlueColor}}>{'<'}</Text>
                        </TouchableOpacity>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                            <Text style={{fontWeight:'bold', color:kThemeBlueColor}}>MONTH'S CONSUMPTION</Text>
                        </View>
                        
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
                            <Text numberOfLines={2} style={{flex:1, fontSize:11, color:kThemeBlueColor}}>{this.state.overview_fc_name}</Text>
                            
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

                    <View style={{flex:1, maxHeight:25, borderRadius:5, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                            <Text style={{fontWeight:'bold', color:kThemeBlueColor}}>TODAY'S CONSUMPTION</Text>
                        </View>
                        <TouchableOpacity onPress={()=>this.moveToNextPage(false)} style={{width:25, height:25, alignItems:'center'}} >
                            <Text style={{fontWeight:'bold', fontSize:20, color:kThemeBlueColor}}>{'>'}</Text>
                        </TouchableOpacity>
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
                            <Text numberOfLines={2} style={{flex:1, fontSize:11, color:kThemeBlueColor}}>{this.state.overview_fc_name}</Text>
                            
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
                    
                    <View style={{flex:1, maxHeight:40, margin:5, flexDirection:'row'}}>
                        <View style={{flex:1, alignItems:'flex-start', justifyContent:'center'}}>
                            <Text style={{color:kThemeRedColor, fontWeight:'bold', fontSize:22}}> OVERVIEW </Text>
                        </View>
                        <TouchableOpacity style={{ width:40, height:40, marginRight:10, alignItems:'center', justifyContent:'center'}} onPress={()=>this.onRefreshClicked()}>
                            <Image style={{width:25, height:25, resizeMode:'stretch'}} source={require("../resources/Refresh_icon.png")}></Image>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex:1}}>
                        <View style={{flex:4, marginLeft:10, marginRight:10}}>
                            <View style={[{flex:1, margin:10, marginBottom:5, borderRadius:5, backgroundColor:'rgb(242,242,242)'}, style.cardShadow]}>
                                <View style={[{height:60, margin:10,  padding:5, borderRadius:5, backgroundColor:'#FFF'},style.cardShadow]}>
                                    <View style={{flex:1}}>
                                        <Text style={{fontWeight:'bold', fontSize:12, color:kThemeBlueColor}}>AVAILABLE BALANCE</Text>
                                    </View>
                                    
                                    <View style={{flex:1, flexDirection:'row'}}>
                                        <View style={{flex:2, paddingRight:5}}>
                                            <Text style={{flex:1, color:kThemeRedColor, fontSize:11, textAlign:'right'}}>{dataResouces ? dataResouces.currency : 'RS'}</Text>
                                        </View>
                                        <View style={{flex:3}}>
                                            <Text style={{flex:1, color:kThemeRedColor, fontSize:10}}> : {this.state.balance_inr}</Text>
                                        </View>
                                    </View>
                                    
                                    <View style={{flex:1, flexDirection:'row'}}>
                                        <View style={{flex:2, paddingRight:5}}>
                                            <Text style={{flex:1, fontSize:11, textAlign:'right'}}>UPDATED ON</Text>
                                        </View>
                                        <View style={{flex:3}}>
                                            <Text style={{flex:1, fontSize:10}}> : {this.state.balance_updated_on}</Text>
                                        </View>
                                    </View>
                                </View>
                                
                                <View style={{height:150}}>
                                    <View style={[{flex:1, margin:10, marginTop:0, padding:5, borderRadius:5, backgroundColor:'#FFF'}, style.cardShadow]}>
                                        <View style={{flex:1, flexDirection:'row'}}>
                                            <Text style={{flex:1, fontWeight:'bold', color:kThemeBlueColor}}>GRID</Text>
                                            
                                            {dataResouces && dataResouces.energy_source === 'GRID' ? <Image style={{width:15, height:15, resizeMode:'contain'}} source={require("../resources/GreenLEDIcon.png")}></Image> : null}
                                        </View>
                                        
                                        {dataResouces && dataResouces.energy_source === 'GRID' ?
                                            <View style={{flex:1, flexDirection:'row'}}>
                                                <View style={{flex:2, paddingRight:5}}>
                                                    <Text style={{flex:1, fontSize:11, textAlign:'right'}}>START TIME</Text>
                                                </View>
                                                <View style={{flex:3}}>
                                                    <Text style={{flex:1, fontSize:10}}> : {this.state.grid_start_time}</Text>
                                                </View>
                                            </View> : 
                                            <View style={{flex:1, flexDirection:'row'}}>
                                                <View style={{flex:2, paddingRight:5}}>
                                                    <Text adjustsFontSizeToFit style={{flex:1, fontSize:11, textAlign:'right'}}>Status</Text>
                                                </View>
                                                <View style={{flex:3}}>
                                                    <Text style={{flex:1, fontSize:11, fontWeight:'bold'}}> : {dataResouces && dataResouces.energy_source === 'GRID' ? 'ON' : 'OFF'}</Text>
                                                </View>
                                            </View>
                                        }

                                        <View style={{flex:1, flexDirection:'row'}}>
                                            <View style={{flex:2, paddingRight:5}}>
                                                <Text adjustsFontSizeToFit style={{flex:1, fontSize:11, textAlign:'right'}}>Unit</Text>
                                            </View>
                                            <View style={{flex:3}}>
                                                <Text style={{flex:1, fontWeight:'bold', fontSize:10}}> : {this.state.grid_kwh} {dataResouces ? dataResouces.reading_unit : ''}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    
                                    <View style={[{flex:1, margin:10, marginTop:0, padding:5, borderRadius:5, backgroundColor:'#FFF'}, style.cardShadow]}>
                                        <View style={{flex:1, flexDirection:'row'}}>
                                            <Text style={{flex:1, fontWeight:'bold', color:kThemeBlueColor}}>DG</Text>
                                            
                                            {dataResouces && dataResouces.energy_source === 'DG' ? <Image style={{width:15, height:15, resizeMode:'contain'}} source={require("../resources/RedLEDIcon.png")}></Image> : null}
                                        </View>
                                        
                                        {dataResouces && dataResouces.energy_source === 'DG' ?
                                            <View style={{flex:1, flexDirection:'row'}}>
                                                <View style={{flex:2, paddingRight:5}}>
                                                    <Text style={{flex:1, fontSize:11, textAlign:'right'}}>START TIME</Text>
                                                </View>
                                                <View style={{flex:3}}>
                                                    <Text style={{flex:1, fontSize:10}}> : {this.state.grid_start_time}</Text>
                                                </View>
                                            </View> : 
                                            <View style={{flex:1, flexDirection:'row'}}>
                                                <View style={{flex:2, paddingRight:5}}>
                                                    <Text adjustsFontSizeToFit style={{flex:1, fontSize:11, textAlign:'right'}}>Status</Text>
                                                </View>
                                                <View style={{flex:3}}>
                                                    <Text style={{flex:1, fontSize:11, fontWeight:'bold'}}> : {dataResouces && dataResouces.energy_source === 'DG' ? 'ON' : 'OFF'}</Text>
                                                </View>
                                            </View>
                                        }

                                        <View style={{flex:1, flexDirection:'row'}}>
                                            <View style={{flex:2, paddingRight:5}}>
                                                <Text adjustsFontSizeToFit style={{flex:1, fontSize:11, textAlign:'right'}}>Unit</Text>
                                            </View>
                                            <View style={{flex:3}}>
                                                <Text style={{flex:1, fontWeight:'bold', fontSize:10}}> : {this.state.dg_kwh} {dataResouces ? dataResouces.reading_unit : ''}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                
                                <View style={[{maxHeight:75, margin:10, marginTop:0, padding:5, borderRadius:5, backgroundColor:'#FFF'},style.cardShadow]}>
                                    
                                    <View style={{marginTop:5, marginBottom:5, flexDirection:'row', alignItems:'center'}}>
                                        <Text style={{flex:2, fontWeight:'bold', color:kThemeBlueColor, fontSize:12}}>CURRENT STATUS</Text>
                                        
                                        <Text style={{flex:1, fontWeight:'bold', color:this.state.willShowResetButton || this.state.current_status === 'Disconnect' ? kThemeRedColor : kThemeBlueColor, fontSize:12}}>{this.state.current_status}</Text>
                                    </View>
                                    {this.state.willShowResetButton ? <View style={{alignItems:'center', justifyContent:'flex-end', flexDirection:'row', bottom:5 }}>
                                        {/* <TouchableOpacity onPress={()=>this.cancelReset()} style={{margin:10, width:80, height:25,alignItems:'center', justifyContent:'center', backgroundColor:kThemeRedColor, borderRadius:5}}>
                                            <Text style={{color:'#FFF', fontWeight:'bold'}}>CANCEL</Text>
                                        </TouchableOpacity> */}
                                        
                                        <TouchableOpacity onPress={()=>this.verifyBalance()} style={{margin:10, width:75, height:20,alignItems:'center', justifyContent:'center', backgroundColor:kThemeRedColor, borderRadius:5}}>
                                            <Text style={{color:'#FFF', fontSize:12, fontWeight:'bold'}}>RE-STORE</Text>
                                        </TouchableOpacity>
                                    </View>:null}
                                    
                                </View>
                            </View>
                            
                            <View style={[{flex:1, minHeight:375, margin:10, marginBottom:5, marginTop:5, borderRadius:5, backgroundColor:'rgb(242,242,242)'}, style.cardShadow]} onLayout={(event)=>{
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
                            
                            {this.state.drCrStatusValue && <View style={[{flex:1, margin:10, marginTop:5, borderRadius:5, backgroundColor:'rgb(242,242,242)'}, style.cardShadow]}>
                                <View style={{flex:1, backgroundColor:kThemeBlueColor, borderRadius:5, height:25, alignItems:'center', justifyContent:'center'}}>
                                    <Text style={{fontWeight:'bold', color:'#fff'}}>{this.state.drCrStatusValue.name}</Text>
                                </View>
                                
                                <View style={{flex:2, marginTop:5, marginBottom:5, marginRight:25, marginLeft:25, alignItems:'center', justifyContent:'center'}}>
                                    <View style={{flex:1, flexDirection:'row'}}>
                                        <Text style={{flex:1, fontSize:11, color:kThemeBlueColor}}>{this.state.drCrStatusValue.type}</Text>
                                        
                                        <Text style={{flex:1, fontSize:11, textAlign:'right'}}>{this.state.drCrStatusValue.amount}</Text>
                                    </View>

                                </View>
                            </View>}
                            <View style={[{flex:1, height:80, margin:10, marginTop:5, borderRadius:5, backgroundColor:'rgb(242,242,242)'}, style.cardShadow]}>
                                <View style={{flex:1, backgroundColor:kThemeBlueColor, borderRadius:5, alignItems:'center', justifyContent:'center'}}>
                                    <Text style={{fontWeight:'bold', color:'#fff'}}>SANCTIONED LOAD</Text>
                                </View>
                                
                                <View style={{flex:2, marginTop:5, marginRight:25, marginLeft:25, alignItems:'center', justifyContent:'center'}}>
                                    <View style={{flex:1, flexDirection:'row'}}>
                                        <Text style={{flex:1, fontSize:11, color:kThemeBlueColor}}>GRID</Text>
                                        
                                        <Text style={{flex:1, fontSize:11, textAlign:'right'}}>{this.state.sectioned_grid}</Text>
                                    </View>
                                    
                                    <View style={{flex:1, flexDirection:'row'}}>
                                        <Text style={{flex:1, fontSize:11, color:kThemeBlueColor}}>DG</Text>
                                        
                                        <Text style={{flex:1, fontSize:11, textAlign:'right'}}>{this.state.sectioned_dg}</Text>
                                    </View>

                                    <View style={{flex:0.5, flexDirection:'row'}}>
                                        <Text style={{flex:1, fontSize:12}}></Text>
                                        
                                        <Text style={{flex:1, fontSize:8, textAlign:'right'}}>VALUE IN {this.state.reading_unit}</Text>
                                    </View>

                                </View>
                            </View>
                        </View>
                        {/* {this.state.willShowResetButton ? <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', position:'absolute', bottom:0 }}>
                            <TouchableOpacity onPress={()=>this.cancelReset()} style={{margin:10, width:80, height:25,alignItems:'center', justifyContent:'center', backgroundColor:kThemeRedColor, borderRadius:5}}>
                                <Text style={{color:'#FFF', fontWeight:'bold'}}>CANCEL</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={()=>this.verifyBalance()} style={{margin:10, width:80, height:25,alignItems:'center', justifyContent:'center', backgroundColor:kThemeRedColor, borderRadius:5}}>
                                <Text style={{color:'#FFF', fontWeight:'bold'}}>RE-STORE</Text>
                            </TouchableOpacity>
                        </View>:null} */}
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Overview);