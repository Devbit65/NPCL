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
import {fethchMessages} from '../utilities/webservices'
import Spinner from '../components/activity-indicator'

class EventLogging extends Component {

    constructor(props) {
        super(props)
        this.spinner = new Spinner()
        this.state = {
            logDate : null
        }
    }

    componentDidMount(){

        this.spinner.startActivity();
        fethchMessages()
        .then(response=>{

            var logMessages = this.parseMessages(response.resource)
            this.setState({
                logDate : logMessages
            })
            this.spinner.stopActivity();
        })

    }

    parseMessages(messages){

        var logMessages = []
        var keys = Object.keys(messages)
        for(var i=0; i<keys.length; i++){
            var message = messages[keys[i]];
            
            var messageArray = message.split('::')
            var date = messageArray[0]
            messageArray[1] = messageArray[1].trim()
            messageArray = messageArray[1].split(' ')
            var startDate = messageArray[3]
            var endDate = messageArray[5]
            var logData = {
                "date":date,
                "dg_start_date":startDate,
                "dg_end_date":endDate
            }

            console.log("messageArray ",messageArray)
            console.log("logData ",logData)
            logMessages.push(logData)
        }
        return logMessages;
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