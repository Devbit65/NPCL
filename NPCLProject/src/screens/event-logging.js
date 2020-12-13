import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';

import NoticeHeader from "../components/notice-header";

import * as Utilities from "../utilities/utilities-methods";


class EventLogging extends Component {

    constructor(props) {
        super(props)
        this.state = {
            logDate : [
                {
                    "date":"05/10/2020",
                    "dg_start_date":Utilities.changeDateFormate(Date()),
                    "dg_end_date":Utilities.changeDateFormate(Date())
                },
                {
                    "date":"05/10/2020",
                    "dg_start_date":Utilities.changeDateFormate(Date()),
                    "dg_end_date":Utilities.changeDateFormate(Date())
                }
            ]
        }
    }

    render() {
        return  <View style={{flex:1, backgroundColor:'#fff'}}>
                    <NoticeHeader />
                    
                    <View style={{margin:5, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{color:'#F00', fontWeight:'bold', fontSize:30}}> DG EVENT LOGGING </Text>
                    </View>
                    
                    <FlatList
                        data={this.state.logDate}
                        renderItem={({ item, index, separators })=>{
                            return  <View key={index} style={{flex:1, height:75, marginLeft:10, marginRight:10, alignItems:'center', justifyContent:'center'}}>
                                        <Text style={{fontSize:11}}> Date - {item.date} </Text>
                                        
                                        <View style={{flex:1, maxHeight:40, margin:10, marginTop:5, borderRadius:5, backgroundColor:'rgb(242,242,242)', borderWidth:1, borderColor:"gray", flexDirection:'row'}}>

                                            <View style={{flex:2, paddingLeft:20, justifyContent:'center'}}>
                                                <Text style={{fontSize:10}}> DG START DATE </Text>
                                            
                                                <Text style={{fontSize:8}}> {item.dg_start_date} </Text>
                                            </View>
                                            
                                            <View style={{flex:1,  justifyContent:'center'}}>
                                                <Text style={{fontSize:10}}> DG END DATE </Text>
                                            
                                                <Text style={{fontSize:8}}> {item.dg_start_date} </Text>
                                            </View>
                                        </View>
                                    </View>
                        }}
                    />

                    
                </View>
    }
}

export default EventLogging;