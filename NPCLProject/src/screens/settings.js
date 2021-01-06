
import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity,
    TextInput,
    Image,
    Switch
} from 'react-native';

import NoticeHeader from "../components/notice-header";
import UserData from '../utilities/models/user-data'

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class Settings extends Component {


    constructor(props) {
        super(props)

        this.userData = new UserData().getUserData();
        var dataResouces = this.userData.resource
        this.state = {
            nofity:dataResouces.notification_email==='Y',
            low_balance:dataResouces.notification_app_balance==='Y',
            power_cut_restore:dataResouces.power_cut_restore_notification==='Y',
            notify_recharge:dataResouces.recharge_notification==='Y',
        }
    }
    render() {
        var dataResouces = this.userData.resource
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
                                    
                                    <Text>{dataResouces.alert_daily_consumption_grid}</Text>
                                </View>
                                
                                <View style={{width:50,}}>
                                </View>
                            </View>
                            
                            <View style={{flex:1, marginLeft:10, marginRight:10, flexDirection:'row'}}>
                                <View style={{flex:1, justifyContent:'center'}}>
                                    <Text style={{color:kThemeBlueColor}}>DG UNIT</Text>
                                
                                    <Text>{dataResouces.alert_daily_consumption_dg}</Text>
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
                                
                                        <Text>{dataResouces.low_bal_alert}</Text>
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
                </View>
    }
}

export default Settings;