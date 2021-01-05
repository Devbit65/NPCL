
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
        return  <View style={{flex:1}}>
                    {/* <NoticeHeader /> */}
                    
                    <View style={{margin:5, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{color:'rgb(206, 0, 57)', fontWeight:'bold', fontSize:30}}> SETTINGS </Text>
                    </View>

                    <View style={{flex:1,}}>
                        <View style={{flex:1, marginLeft:15, marginRight:15}}>
                            <Text style={{fontWeight:'bold'}}>CONSUMPTION EXCEEDED PER DAY</Text>
                            
                            <View style={{flex:1, marginLeft:10, marginRight:10, flexDirection:'row'}}>
                                <View style={{flex:1, justifyContent:'center'}}>
                                    <Text>NOTIFY</Text>
                                    
                                    <Text>{this.state.nofity? "YES": "NO"}</Text>
                                </View>
                                
                                <View style={{width:50, justifyContent:'center' }}>
                                    <Switch
                                        style={{ transform: [{ scaleX: .5 }, { scaleY: .5 }] }}
                                        trackColor={{ false: "gray", true: "blue" }}
                                        thumbColor={"#fff"}
                                        onValueChange={()=>{this.setState({nofity:!this.state.nofity})}}
                                        value={this.state.nofity}
                                    />
                                </View>
                            </View>
                            
                            <View style={{flex:1, marginLeft:10, marginRight:10, flexDirection:'row'}}>
                                <View style={{flex:1, justifyContent:'center'}}>
                                    <Text>GRID UNIT</Text>
                                    
                                    <Text>{dataResouces.alert_daily_consumption_grid}</Text>
                                </View>
                                
                                <View style={{width:50,}}>
                                </View>
                            </View>
                            
                            <View style={{flex:1, marginLeft:10, marginRight:10, flexDirection:'row'}}>
                                <View style={{flex:1, justifyContent:'center'}}>
                                    <Text>DG UNIT</Text>
                                
                                    <Text>{dataResouces.alert_daily_consumption_dg}</Text>
                                </View>
                                
                                <View style={{width:50, }}>
                                </View>
                            </View>
                        </View>

                        <View style={{flex:1, maxHeight:1, marginBottom:10, backgroundColor:'#000'}}>
                        </View>

                        <View style={{flex:1,  marginLeft:15, marginRight:15}}>
                            <View style={{flex:1, marginLeft:15, marginRight:15}}>
                                <Text style={{fontWeight:'bold'}}>MISCELLANEOUS</Text>
                                
                                <View style={{flex:1, marginLeft:10, marginRight:10, flexDirection:'row'}}>
                                    <View style={{flex:1, justifyContent:'center'}}>
                                        <Text>LOW BALANCE</Text>
                                
                                        <Text>{dataResouces.low_bal_alert}</Text>
                                    </View>
                                    <View style={{width:50, justifyContent:'center' }}>
                                        <Switch
                                            style={{ transform: [{ scaleX: .5 }, { scaleY: .5 }] }}
                                            trackColor={{ false: "gray", true: "blue" }}
                                            thumbColor={"#fff"}
                                            onValueChange={()=>{this.setState({low_balance:!this.state.low_balance})}}
                                            value={this.state.low_balance}
                                        />
                                    </View>
                                </View>
                                
                                <View style={{flex:1, marginLeft:10, marginRight:10, flexDirection:'row'}}>
                                    <View style={{flex:1, justifyContent:'center'}}>
                                        <Text>POWER CUT/RESTORE</Text>
                                
                                        <Text>{this.state.power_cut_restore? "YES": "NO"}</Text>
                                    </View>
                                    <View style={{width:50, justifyContent:'center' }}>
                                        <Switch
                                            style={{ transform: [{ scaleX: .5 }, { scaleY: .5 }] }}
                                            trackColor={{ false: "gray", true: "blue" }}
                                            thumbColor={"#fff"}
                                            onValueChange={()=>{this.setState({power_cut_restore:!this.state.power_cut_restore})}}
                                            value={this.state.power_cut_restore}
                                        />
                                    </View>
                                </View>
                                
                                <View style={{flex:1, marginLeft:10, marginRight:10, flexDirection:'row'}}>
                                    <View style={{flex:1, justifyContent:'center'}}>
                                        <Text>NOTIFY RECHARGE</Text>
                                
                                        <Text>{this.state.notify_recharge? "YES": "NO"}</Text>
                                    </View>
                                    <View style={{width:50, justifyContent:'center' }}>
                                        <Switch
                                            style={{ transform: [{ scaleX: .5 }, { scaleY: .5 }] }}
                                            trackColor={{ false: "gray", true: "blue" }}
                                            thumbColor={"#fff"}
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