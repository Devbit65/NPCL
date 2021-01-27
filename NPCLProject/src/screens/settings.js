
import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity,
    TextInput,
    Image,
    Switch
} from 'react-native';

import UserData from '../utilities/models/user-data'
import {fetchSaveSettings, fethcLogin} from '../utilities/webservices'
import Spinner from '../components/activity-indicator'
import { INITIATE_REFRESH } from '../redux/constants';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../redux/action';

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class Settings extends Component {


    constructor(props) {
        super(props)

        this.userData = new UserData().getUserData();
        var dataResouces = this.userData.resource
        this.state = {
            nofity:dataResouces.notification_app_load==='Y',
            low_balance:dataResouces.notification_app_balance==='Y',
            power_cut_restore:dataResouces.power_cut_restore_notification==='Y',
            notify_recharge:dataResouces.recharge_notification==='Y',
            grid_unit:dataResouces.alert_daily_consumption_grid,
            dg_unit:dataResouces.alert_daily_consumption_dg,
            low_bal_alert : dataResouces.low_bal_alert
        }
        this.spinner = new Spinner()
    }

    resetData() {
        this.spinner.startActivity();

        if(!this.spinner.isNetConnected()){
            alert("Please check you internet connection.")
            this.spinner.stopActivity()
            return;
        }

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
                nofity:dataResouces.notification_app_load==='Y',
                low_balance:dataResouces.notification_app_balance==='Y',
                power_cut_restore:dataResouces.power_cut_restore_notification==='Y',
                notify_recharge:dataResouces.recharge_notification==='Y',
                grid_unit:dataResouces.alert_daily_consumption_grid,
                dg_unit:dataResouces.alert_daily_consumption_dg,
                low_bal_alert : dataResouces.low_bal_alert
            })
        })
    }

    isResetDisabled(){
        var dataResouces = this.userData.resource
        return  (this.state.nofity ? dataResouces.notification_app_load==='Y':dataResouces.notification_app_load==='N') && 
                (this.state.low_balance ? dataResouces.notification_app_balance==='Y':dataResouces.notification_app_balance==='N') &&
                (this.state.power_cut_restore ? dataResouces.power_cut_restore_notification==='Y':dataResouces.power_cut_restore_notification==='N') && 
                (this.state.notify_recharge ? dataResouces.recharge_notification==='Y':dataResouces.recharge_notification==='N') &&
                (this.state.grid_unit === dataResouces.alert_daily_consumption_grid) &&
                (this.state.dg_unit === dataResouces.alert_daily_consumption_dg) &&
                (this.state.low_bal_alert === dataResouces.low_bal_alert)
    }

    saveData() {

        this.spinner.startActivity();

        if(!this.spinner.isNetConnected()){
            alert("Please check you internet connection.")
            this.spinner.stopActivity()
            return;
        }

        var dataResouces = this.userData.resource
        var saveData = {
            'notification_app_load':this.state.nofity || this.state.nofity==='YES'?'Y':'N',
            'notification_app_balance':this.state.low_balance || this.state.low_balance==='YES'?'Y':'N',
            'low_bal_alert':this.state.low_bal_alert,
            'notification_app_esource':dataResouces.notification_app_esource,
            'notification_app_unit_consumption':dataResouces.notification_app_unit_consumption,
            'alert_daily_consumption_grid':this.state.grid_unit,
            'alert_daily_consumption_dg':this.state.dg_unit,
            'grid_load_alarm':dataResouces.grid_load_alarm,
            'dg_load_alarm':dataResouces.dg_load_alarm,
            "recharge_notification" : this.state.notify_recharge || this.state.notify_recharge==='YES'?'Y':'N',
            "power_cut_restore_notification" : this.state.power_cut_restore || this.state.power_cut_restore==='YES'?'Y':'N',
        }

        fetchSaveSettings(saveData)
        .then(response=>{
            this.resetData()
        })
    }

    componentDidUpdate() {

        if(this.props.data) {
            switch (this.props.data.type) {
                case INITIATE_REFRESH:
                    this.resetData()
                    this.props.onRefreshInitiated()
                    break;
            
                default:
                    break;
            }
        }
    }

    render() {
        var isResetDisabled = this.isResetDisabled()
        return  <View style={{flex:1, backgroundColor:'#fff'}}>
                    
                    <View style={{margin:5, alignItems:'flex-start', justifyContent:'center'}}>
                        <Text style={{color:kThemeRedColor, fontWeight:'bold', fontSize:30}}> SETTINGS </Text>
                    </View>

                    <View style={{flex:1,}}>
                        <View style={{height:175, margin:15}}>
                            <Text style={{fontWeight:'bold', color:kThemeBlueColor}}>CONSUMPTION EXCEEDED PER DAY</Text>

                            <View style={{flex:1, marginLeft:10, marginRight:10, flexDirection:'row'}}>
                                    
                                <View style={{flex:1, justifyContent:'center'}}>
                                    <Text style={{color:kThemeBlueColor}}>NOTIFY</Text>
                                    
                                    <Text>{this.state.nofity? "YES": "NO"}</Text>
                                </View>
                                    
                                <View style={{width:50, justifyContent:'center' }}>
                                    <Switch
                                        style={{ transform: [{ scaleX: .5 }, { scaleY: .5 }] }}
                                        trackColor={{ false: "gray", true: 'rgba(19,69,113,0.4)' }}
                                        thumbColor={kThemeBlueColor}
                                        onValueChange={()=>{this.setState({nofity:!this.state.nofity})}}
                                        value={this.state.nofity}
                                    />
                                </View>
                            </View>
                            
                            <View style={{flex:1, marginLeft:10, marginRight:10, flexDirection:'row'}}>
                                <View style={{flex:1, justifyContent:'center'}}>
                                    <Text style={{color:kThemeBlueColor}}>GRID UNIT</Text>
                                    
                                    <TextInput
                                        style={{ width:77, paddingLeft:5, fontSize:11, height: 20, borderWidth:0.5, borderRadius:5, borderColor:kThemeBlueColor, padding:0}}
                                        textAlign={'left'}
                                        placeholder="GRID UNIT"
                                        onChangeText={text => this.setState({grid_unit:text})}
                                        defaultValue={this.state.grid_unit}
                                    />
                                </View>
                                
                                <View style={{width:50,}}>
                                </View>
                            </View>
                            
                            <View style={{flex:1, marginLeft:10, marginRight:10, flexDirection:'row'}}>
                                <View style={{flex:1, justifyContent:'center'}}>
                                    <Text style={{color:kThemeBlueColor}}>DG UNIT</Text>
                                
                                    <TextInput
                                        style={{ width:75, paddingLeft:5, fontSize:11, height: 20, borderWidth:0.5, borderRadius:5, borderColor:kThemeBlueColor, padding:0}}
                                        textAlign={'left'}
                                        placeholder="DG UNIT"
                                        onChangeText={text => this.setState({dg_unit:text})}
                                        defaultValue={this.state.dg_unit}
                                    />
                                </View>
                                
                                <View style={{width:50, }}>
                                </View>
                            </View>
                        </View>

                        <View style={{flex:1, maxHeight:1, marginLeft:10, marginRight:10, backgroundColor:'#000'}}>
                        </View>

                        <View style={{height:175,  margin:15}}>
                            <View style={{flex:1}}>
                                <Text style={{fontWeight:'bold',color:kThemeBlueColor}}>MISCELLANEOUS</Text>
                                
                                <View style={{flex:1, marginLeft:10, marginRight:10, flexDirection:'row'}}>
                                    <View style={{flex:1, justifyContent:'center'}}>
                                        <Text style={{color:kThemeBlueColor}}>LOW BALANCE</Text>
                                
                                        <TextInput
                                            style={{ width:100, paddingLeft:5, fontSize:11, height: 20, borderWidth:0.5, borderRadius:5, borderColor:kThemeBlueColor, padding:0}}
                                            textAlign={'left'}
                                            placeholder="LOW BALANCE"
                                            onChangeText={text => this.setState({low_bal_alert:text})}
                                            defaultValue={this.state.low_bal_alert}
                                        />
                                    </View>
                                    <View style={{width:50, justifyContent:'center' }}>
                                        <Switch
                                            style={{ transform: [{ scaleX: .5 }, { scaleY: .5 }] }}
                                            trackColor={{ false: "gray", true: 'rgba(19,69,113,0.4)' }}
                                            thumbColor={kThemeBlueColor}
                                            onValueChange={()=>{this.setState({low_balance:!this.state.low_balance})}}
                                            value={this.state.low_balance}
                                        />
                                    </View>
                                </View>
                                
                                <View style={{flex:1, marginLeft:10, marginRight:10, flexDirection:'row'}}>
                                    <View style={{flex:1, justifyContent:'center'}}>
                                        <Text style={{color:kThemeBlueColor}}>POWER CUT/RESTORE</Text>
                                
                                        <Text>{this.state.power_cut_restore? "YES": "NO"}</Text>
                                    </View>
                                    <View style={{width:50, justifyContent:'center' }}>
                                        <Switch
                                            style={{ transform: [{ scaleX: .5 }, { scaleY: .5 }] }}
                                            trackColor={{ false: "gray", true: 'rgba(19,69,113,0.4)' }}
                                            thumbColor={kThemeBlueColor}
                                            onValueChange={()=>{this.setState({power_cut_restore:!this.state.power_cut_restore})}}
                                            value={this.state.power_cut_restore}
                                        />
                                    </View>
                                </View>
                                
                                <View style={{flex:1, marginLeft:10, marginRight:10, flexDirection:'row'}}>
                                    <View style={{flex:1, justifyContent:'center'}}>
                                        <Text style={{color:kThemeBlueColor}}>NOTIFY RECHARGE</Text>
                                
                                        <Text>{this.state.notify_recharge? "YES": "NO"}</Text>
                                    </View>
                                    <View style={{width:50, justifyContent:'center' }}>
                                        <Switch
                                            style={{ transform: [{ scaleX: .5 }, { scaleY: .5 }] }}
                                            trackColor={{ false: "gray", true: 'rgba(19,69,113,0.4)' }}
                                            thumbColor={kThemeBlueColor}
                                            onValueChange={()=>{this.setState({notify_recharge:!this.state.notify_recharge})}}
                                            value={this.state.notify_recharge}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', }}>
                        <TouchableOpacity disabled={isResetDisabled} onPress={()=>this.resetData()} style={{margin:10, width:80, height:25,alignItems:'center', justifyContent:'center', backgroundColor:kThemeRedColor, borderRadius:5,opacity:isResetDisabled?0.5:1}}>
                            <Text style={{color:'#FFF', fontWeight:'bold'}}>RE-SET</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={()=>this.saveData()} style={{margin:10, width:80, height:25,alignItems:'center', justifyContent:'center', backgroundColor:kThemeRedColor, borderRadius:5}}>
                            <Text style={{color:'#FFF', fontWeight:'bold'}}>SAVE</Text>
                        </TouchableOpacity>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Settings);