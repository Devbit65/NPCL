import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity,
    Image
} from 'react-native';

import NoticeHeader from "../components/notice-header";

import * as Utilities from "../utilities/utilities-methods";
import UserData from '../utilities/models/user-data'


class Overview extends Component {

    constructor(props) {
        super(props);
        this.userData = new UserData().getUserData();

        console.log("this.userData ",this.userData)
        this.state = {
            balance_inr:this.userData.resource.balance_amount,
            balance_updated_on:this.userData.resource.last_reading_updated,
            grid_start_time:this.userData.resource.last_reading_updated_dg,
            grid_kwh:this.userData.resource.grid_reading,
            dg_kwh:this.userData.resource.dg_reading,
            sectioned_grid:this.userData.resource.grid_sanctioned_load,
            sectioned_dg:this.userData.resource.dg_sanctioned_load,
            consumption_grid:this.userData.resource.monthly_grid_unit,
            consumption_dg:this.userData.resource.monthly_dg_unit,
            consumption_fixed_charged:this.userData.resource.fix_charges,
            consumption_total:this.userData.resource.monthly_grid_amount,
            load_unit:this.userData.resource.load_unit,
            currency:this.userData.resource.currency
        }
    }

    render() {
        return  <View style={{flex:1, backgroundColor:'#fff'}}>
                    <NoticeHeader />
                    
                    <View style={{margin:5, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{color:'#F00', fontWeight:'bold', fontSize:30}}> OVERVIEW </Text>
                    </View>

                    <View style={{flex:1}}>
                        <View style={{flex:4, marginLeft:10, marginRight:10}}>
                            <View style={{flex:1, maxHeight:150, margin:10, marginBottom:5, borderRadius:5, backgroundColor:'rgb(242,242,242)', borderWidth:1, borderColor:"gray"}}>
                                <View style={{flex:1, margin:10, padding:5, borderRadius:5, backgroundColor:'#FFF'}}>
                                    <View style={{flex:1.5}}>
                                        <Text style={{fontWeight:'bold'}}>AVAILABLE BALANCE</Text>
                                    </View>
                                    
                                    <View style={{flex:1, flexDirection:'row'}}>
                                        <Text style={{flex:1, color:'red', fontSize:12}}>{this.userData.resource.currency}</Text>
                                        
                                        <Text style={{flex:1, color:'red', fontSize:12}}>{this.state.balance_inr}</Text>
                                    </View>
                                    
                                    <View style={{flex:1, flexDirection:'row'}}>
                                        <Text style={{flex:1, fontSize:12}}>UPDATED ON</Text>
                                        
                                        <Text style={{flex:1, fontSize:10}}>{this.state.balance_updated_on}</Text>
                                    </View>
                                </View>
                                
                                <View style={{flex:1.5, flexDirection:'row'}}>
                                    <View style={{flex:1, margin:10, marginTop:0, padding:5, borderRadius:5, backgroundColor:'#FFF'}}>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{flex:1, fontWeight:'bold'}}>GRID</Text>
                                            
                                            <View style={{width:15, height:15, borderRadius:15, backgroundColor:'#0F0'}}>
                                            </View>
                                        </View>
                                        
                                        <Text style={{flex:1, fontSize:12}}>START TIME</Text>
                                        
                                        <Text style={{flex:1, fontSize:8}}>{this.state.grid_start_time}</Text>
                                        
                                        <Text style={{flex:1, fontSize:10}}>{this.state.grid_kwh} {this.userData.resource.reading_unit}</Text>
                                    </View>
                                    
                                    <View style={{flex:1, margin:10, marginTop:0, padding:5, borderRadius:5, backgroundColor:'#FFF'}}>
                                        <Text style={{fontWeight:'bold'}}>DG</Text>
                                        <Text style={{flex:1, fontSize:12}}>OFF</Text>
                                        <Text style={{flex:1, fontSize:9}}></Text>
                                        <Text style={{flex:1, fontSize:10}}>{this.state.dg_kwh} {this.userData.resource.reading_unit}</Text>
                                    </View>
                                </View>
                                
                            </View>
                            
                            <View style={{flex:1, margin:10, marginBottom:5, marginTop:5, borderRadius:5, backgroundColor:'rgb(242,242,242)', borderWidth:1, borderColor:"gray"}}>
                                <View style={{flex:1, maxHeight:25, borderRadius:5, alignItems:'center', justifyContent:'center'}}>
                                    <Text style={{fontWeight:'bold'}}>TODAY'S CONSUMPTION</Text>
                                </View>

                                <View style={{flex:2}}>
                                    <Text>Charts</Text>
                                </View>
                                <View style={{flex:3, paddingLeft:20, paddingRight:20}}>
                                    <View style={{flex:1, maxHeight:25, margin:5, borderWidth:0.5, borderRadius:5, paddingLeft:10, flexDirection:'row', backgroundColor:'#fff', alignItems:'center'}}>
                                        <Text style={{flex:1, fontSize:12}}>GRID</Text>
                                        
                                        <Text style={{width:75, fontSize:12}}>{this.state.consumption_grid}</Text>
                                    </View>
                                    
                                    <View style={{flex:1, maxHeight:25, margin:5, borderWidth:0.5, borderRadius:5, paddingLeft:10, flexDirection:'row', backgroundColor:'#fff', alignItems:'center'}}>
                                        <Text style={{flex:1, fontSize:12}}>DG</Text>
                                        
                                        <Text style={{width:75, fontSize:12}}>{this.state.consumption_dg}</Text>
                                    </View>
                                    <View style={{flex:1, maxHeight:25, margin:5, borderWidth:0.5, borderRadius:5, paddingLeft:10, flexDirection:'row', backgroundColor:'#fff', alignItems:'center'}}>
                                        <Text style={{flex:1, fontSize:12}}>FIXED CHARGED</Text>
                                        
                                        <Text style={{width:75, fontSize:12}}>{this.state.consumption_fixed_charged}</Text>
                                    </View>
                                    <View style={{flex:1, maxHeight:25, margin:5, borderWidth:0.5,  borderRadius:5, paddingLeft:10, flexDirection:'row', backgroundColor:'#fff', alignItems:'center'}}>
                                        <Text style={{flex:1, fontSize:12}}>TOTAL</Text>
                                        
                                        <Text style={{width:75, fontSize:12}}>{this.state.consumption_total}</Text>
                                    </View>

                                    <View style={{flex:0.5, flexDirection:'row'}}>
                                        <Text style={{flex:1, fontSize:12}}></Text>
                                        
                                        <Text style={{flex:1, fontSize:8, textAlign:'right'}}>VALUE IN {this.userData.resource.currency}</Text>
                                    </View>
                                </View>
                            </View>
                            
                            <View style={{flex:1, maxHeight:75, margin:10, marginTop:5, borderRadius:5, backgroundColor:'rgb(242,242,242)', borderWidth:1, borderColor:"gray"}}>
                                <View style={{flex:1, backgroundColor:'rgb(19,69,113)', borderRadius:5, alignItems:'center', justifyContent:'center'}}>
                                    <Text style={{fontWeight:'bold', color:'#fff'}}>SECTIONED LOAD</Text>
                                </View>
                                
                                <View style={{flex:2, marginRight:25, marginLeft:25}}>
                                    <View style={{flex:1, flexDirection:'row'}}>
                                        <Text style={{flex:1, fontSize:12}}>GRID</Text>
                                        
                                        <Text style={{flex:1, fontSize:12, textAlign:'right'}}>{this.state.sectioned_grid}</Text>
                                    </View>
                                    
                                    <View style={{flex:1, flexDirection:'row'}}>
                                        <Text style={{flex:1, fontSize:12}}>DG</Text>
                                        
                                        <Text style={{flex:1, fontSize:12, textAlign:'right'}}>{this.state.sectioned_dg}</Text>
                                    </View>

                                    <View style={{flex:0.5, flexDirection:'row'}}>
                                        <Text style={{flex:1, fontSize:12}}></Text>
                                        
                                        <Text style={{flex:1, fontSize:8, textAlign:'right'}}>VALUE IN {this.state.load_unit}</Text>
                                    </View>

                                </View>
                            </View>
                        </View>
                    </View>
                    
                </View>
    }
}

export default Overview;