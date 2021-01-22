import React, { Component } from 'react';
import {
    Text, 
    View,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import UserData from '../utilities/models/user-data'
import Pie from 'react-native-pie'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from '../components/activity-indicator'
import {fethcLogin, fetchVerifyBalance, fetchRestoreAPI} from '../utilities/webservices'
import { INITIATE_REFRESH } from '../redux/constants';

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
        this.state = {
            balance_inr : dataResouces ? Number(dataResouces.balance_amount).toFixed(2) : "",
            balance_updated_on : dataResouces ? dataResouces.last_reading_updated : '',
            grid_start_time : dataResouces ? dataResouces.last_reading_updated_dg : '',
            grid_kwh : dataResouces ? Number(dataResouces.grid_reading).toFixed(2) : '',
            dg_kwh : dataResouces ? Number(dataResouces.dg_reading).toFixed(2) : '',
            sectioned_grid : dataResouces ? dataResouces.grid_sanctioned_load : '',
            sectioned_dg : dataResouces ? dataResouces.dg_sanctioned_load : '',
            consumption_grid : dataResouces ? dataResouces.monthly_grid_unit : '',
            consumption_dg : dataResouces ? dataResouces.monthly_dg_unit : '',
            consumption_fixed_charged : dataResouces ? dataResouces.fix_charges : '',
            consumption_total : dataResouces ? dataResouces.monthly_grid_amount : '',
            load_unit : dataResouces ? dataResouces.load_unit : '',
            currency : dataResouces ? dataResouces.currency : '',
            willShowResetButton : dataResouces ? (Number(dataResouces.grid_overload_setting) < Number(dataResouces.grid_load_alarm)) : ''
        }

        this.spinner = new Spinner()
    }



    onRefreshClicked() {

        this.spinner.startActivity();
        fethcLogin()
        .then(response=>{

            this.spinner.stopActivity();

            if(response && !response.message.includes('SUCCESS')){
                alert(response.message)
                return;
            }

            new UserData().setUserData(response);
            this.userData = new UserData().getUserData();;

            var dataResouces = this.userData.resource
            this.setState({
                balance_inr:Number(dataResouces.balance_amount).toFixed(2),
                balance_updated_on:dataResouces.last_reading_updated,
                grid_start_time:dataResouces.last_reading_updated_dg,
                grid_kwh:Number(dataResouces.grid_reading).toFixed(2),
                dg_kwh:Number(dataResouces.dg_reading).toFixed(2),
                sectioned_grid:dataResouces.grid_sanctioned_load,
                sectioned_dg:dataResouces.dg_sanctioned_load,
                consumption_grid:dataResouces.monthly_grid_unit,
                consumption_dg:dataResouces.monthly_dg_unit,
                consumption_fixed_charged:dataResouces.fix_charges,
                consumption_total:dataResouces.monthly_grid_amount,
                load_unit:dataResouces.load_unit,
                currency:dataResouces.currency
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

    render() {
        var dataResouces = this.userData ? this.userData.resource : null
        var totalUnit = dataResouces ? Number(dataResouces.daily_dg_unit) + Number(dataResouces.daily_grid_unit):0
        var gridPer = dataResouces ? dataResouces.daily_grid_unit*100/totalUnit : 0
        var dgPer = dataResouces ? dataResouces.daily_dg_unit*100/totalUnit : 0
        return  <View style={{flex:1, backgroundColor:'#fff'}}>
                    
                    <View style={{flex:1, maxHeight:40, margin:5, flexDirection:'row'}}>
                        <View style={{flex:1, alignItems:'flex-start', justifyContent:'center'}}>
                            <Text style={{color:kThemeRedColor, fontWeight:'bold', fontSize:30}}> OVERVIEW </Text>
                        </View>
                        <TouchableOpacity style={{ width:40, height:40, marginRight:10, alignItems:'center', justifyContent:'center'}} onPress={()=>this.onRefreshClicked()}>
                            <Image style={{width:25, height:25, resizeMode:'stretch'}} source={require("../resources/Refresh_icon.png")}></Image>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex:1}}>
                        <View style={{flex:4, marginLeft:10, marginRight:10}}>
                            <View style={[{flex:1, maxHeight:155, margin:10, marginBottom:5, borderRadius:5, backgroundColor:'rgb(242,242,242)'}, style.cardShadow]}>
                                <View style={[{flex:1, margin:10, marginBottom:5, padding:5, borderRadius:5, backgroundColor:'#FFF'},style.cardShadow]}>
                                    <View style={{flex:1}}>
                                        <Text style={{fontWeight:'bold', color:kThemeBlueColor}}>AVAILABLE BALANCE</Text>
                                    </View>
                                    
                                    <View style={{flex:1, flexDirection:'row'}}>
                                        <Text style={{flex:1, color:kThemeRedColor, fontSize:12}}>{dataResouces ? dataResouces.currency : 'RS'}</Text>
                                        
                                        <Text style={{flex:1, color:kThemeRedColor, fontSize:12}}>{this.state.balance_inr}</Text>
                                    </View>
                                    
                                    <View style={{flex:1, flexDirection:'row'}}>
                                        <Text style={{flex:1, fontSize:12}}>UPDATED ON</Text>
                                        
                                        <Text style={{flex:1, fontSize:10}}>{this.state.balance_updated_on}</Text>
                                    </View>
                                </View>
                                
                                <View style={{flex:1.5, flexDirection:'row'}}>
                                    <View style={[{flex:1, margin:10, marginTop:0, padding:5, borderRadius:5, backgroundColor:'#FFF'}, style.cardShadow]}>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{flex:1, fontWeight:'bold', color:kThemeBlueColor}}>GRID</Text>
                                            
                                            {dataResouces && dataResouces.energy_source === 'GRID' && <Image style={{width:15, height:15, resizeMode:'contain'}} source={require("../resources/GreenLEDIcon.png")}></Image>}
                                        </View>
                                        
                                        <Text style={{flex:1, fontSize:11}}>START TIME</Text>
                                        
                                        <Text style={{flex:1, fontSize:8}}>{this.state.grid_start_time}</Text>
                                        
                                        <Text style={{flex:1, fontWeight:'bold', fontSize:10}}>{this.state.grid_kwh} {dataResouces ? dataResouces.reading_unit : ''}</Text>
                                    </View>
                                    
                                    <View style={[{flex:1, margin:10, marginTop:0, padding:5, borderRadius:5, backgroundColor:'#FFF'}, style.cardShadow]}>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{flex:1, fontWeight:'bold', color:kThemeBlueColor}}>DG</Text>
                                            
                                            {dataResouces && dataResouces.energy_source === 'DG' && <Image style={{width:15, height:15, resizeMode:'contain'}} source={require("../resources/RedLEDIcon.png")}></Image>}
                                        </View>
                                        <Text style={{flex:1, fontSize:11}}>OFF</Text>
                                        <Text style={{flex:1, fontSize:8}}></Text>
                                        <Text style={{flex:1, fontWeight:'bold', fontSize:10}}>{this.state.dg_kwh} {dataResouces ? dataResouces.reading_unit : ''}</Text>
                                    </View>
                                </View>
                                
                            </View>
                            
                            <View style={[{flex:1, margin:10, marginBottom:5, marginTop:5, borderRadius:5, backgroundColor:'rgb(242,242,242)'}, style.cardShadow]}>
                                <View style={{flex:1, maxHeight:25, borderRadius:5, alignItems:'center', justifyContent:'center'}}>
                                    <Text style={{fontWeight:'bold', color:kThemeBlueColor}}>TODAY'S CONSUMPTION</Text>
                                </View>

                                <View style={{flex:1,  alignItems:'center', justifyContent:'center'}}>
                                    {gridPer ? <Pie
                                        radius={50}
                                        innerRadius={25}
                                        sections={
                                            [
                                                {
                                                    percentage: gridPer,
                                                    color:kThemeBlueColor,
                                                },
                                                {
                                                    percentage: dgPer,
                                                    color:kThemeRedColor,
                                                },
                                            
                                        ]}
                                        dividerSize={2}
                                        strokeCap={'butt'}
                                    />:null}
                                     <View style={{flexDirection:'row'}}>
                                        <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                            <Icon size={10} name="check-box-outline-blank" color={kThemeBlueColor} />
                                            <Text style={{color:kThemeBlueColor, fontSize:9, alignSelf:'center', textAlign:'center'}}> GRID </Text>
                                        </View>
                                        <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                            <Icon size={10} name="check-box-outline-blank" color="rgb(206, 0, 57)" />
                                            <Text style={{color:kThemeRedColor, fontSize:9, alignSelf:'center', textAlign:'center'}}> DG </Text>
                                        </View>
                                    </View>

                                </View>
                                <View style={{flex:1, maxHeight:150, paddingLeft:20, paddingRight:20, alignItems:'center', justifyContent:'center'}}>
                                    <View style={[{flex:1, maxHeight:25, margin:5, borderRadius:5, paddingLeft:10, flexDirection:'row', backgroundColor:'#fff', alignItems:'center'}, style.cardShadow]}>
                                        <Text style={{flex:1, fontSize:11, color:kThemeBlueColor}}>GRID</Text>
                                        
                                        <Text style={{width:75, fontSize:11}}>{this.state.consumption_grid}</Text>
                                    </View>
                                    
                                    <View style={[{flex:1, maxHeight:25, margin:5, borderRadius:5, paddingLeft:10, flexDirection:'row', backgroundColor:'#fff', alignItems:'center'}, style.cardShadow]}>
                                        <Text style={{flex:1, fontSize:11, color:kThemeBlueColor}}>DG</Text>
                                        
                                        <Text style={{width:75, fontSize:11}}>{this.state.consumption_dg}</Text>
                                    </View>
                                    <View style={[{flex:1, maxHeight:25, margin:5, borderRadius:5, paddingLeft:10, flexDirection:'row', backgroundColor:'#fff', alignItems:'center'}, style.cardShadow]}>
                                        <Text style={{flex:1, fontSize:11, color:kThemeBlueColor}}>FIXED CHARGES</Text>
                                        
                                        <Text style={{width:75, fontSize:11}}>{this.state.consumption_fixed_charged}</Text>
                                    </View>
                                    <View style={[{flex:1, maxHeight:25, margin:5,  borderRadius:5, paddingLeft:10, flexDirection:'row', backgroundColor:'#fff', alignItems:'center'}, style.cardShadow]}>
                                        <Text style={{flex:1, fontSize:11, color:kThemeBlueColor}}>TOTAL</Text>
                                        
                                        <Text style={{width:75, fontSize:11}}>{this.state.consumption_total}</Text>
                                    </View>

                                    <View style={{flex:0.5, flexDirection:'row'}}>
                                        <Text style={{flex:1, fontSize:12}}></Text>
                                        
                                        <Text style={{flex:1, fontSize:8, textAlign:'right'}}>VALUE IN {dataResouces ? dataResouces.currency : 'RS'}</Text>
                                    </View>
                                </View>
                            </View>
                            
                            <View style={[{flex:1, maxHeight:70, margin:10, marginTop:5, borderRadius:5, backgroundColor:'rgb(242,242,242)'}, style.cardShadow]}>
                                <View style={{flex:1, backgroundColor:kThemeBlueColor, borderRadius:5, alignItems:'center', justifyContent:'center'}}>
                                    <Text style={{fontWeight:'bold', color:'#fff'}}>SECTIONED LOAD</Text>
                                </View>
                                
                                <View style={{flex:2, marginRight:25, marginLeft:25, alignItems:'center', justifyContent:'center'}}>
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
                                        
                                        <Text style={{flex:1, fontSize:8, textAlign:'right'}}>VALUE IN {this.state.load_unit}</Text>
                                    </View>

                                </View>
                            </View>
                        </View>
                        {this.state.willShowResetButton ? <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', position:'absolute', bottom:0 }}>
                            <TouchableOpacity onPress={()=>this.cancelReset()} style={{margin:10, width:80, height:25,alignItems:'center', justifyContent:'center', backgroundColor:kThemeRedColor, borderRadius:5}}>
                                <Text style={{color:'#FFF', fontWeight:'bold'}}>CANCEL</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={()=>this.verifyBalance()} style={{margin:10, width:80, height:25,alignItems:'center', justifyContent:'center', backgroundColor:kThemeRedColor, borderRadius:5}}>
                                <Text style={{color:'#FFF', fontWeight:'bold'}}>RE-STORE</Text>
                            </TouchableOpacity>
                        </View>:null}
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Overview);