import React, { Component } from 'react';
import {
    Text, 
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

import {fethchMessages} from '../utilities/webservices'
import Spinner from '../components/activity-indicator'
import { INITIATE_REFRESH } from '../redux/constants';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../redux/action';

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class EventLogging extends Component {

    constructor(props) {
        super(props)
        this.spinner = new Spinner()
        this.state = {
            logDate : null
        }
    }

    componentDidMount(){

        this.fethchMessages()
    }

    fethchMessages() {

        this.spinner.startActivity();

        if(!this.spinner.isNetConnected()){
            alert("Please check you internet connection.")
            this.spinner.stopActivity()
            return;
        }

        fethchMessages()
        .then(response=>{

            var logMessages = this.parseMessages(response.resource)
            this.setState({
                logDate : logMessages
            })
            this.spinner.stopActivity();
        })
        .catch(error=>{
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
                id:i.toString(),
                "date":date,
                "dg_start_date":date+":: "+startDate,
                "dg_end_date":date+":: "+endDate
            }

            logMessages.push(logData)
        }
        return logMessages;
    }

    componentDidUpdate() {

        if(this.props.data) {
            switch (this.props.data.type) {
                case INITIATE_REFRESH:
                    this.fethchMessages()
                    this.props.onRefreshInitiated()
                    break;
            
                default:
                    break;
            }
        }
    }

    render() {
        return  <View style={{flex:1, backgroundColor:'#fff'}}>
                    
                    <View style={{flex:1, maxHeight:80, margin:5}}>
                        <View style={{flex:1, margin:5, alignItems:'flex-start', justifyContent:'center'}}>
                            <Text style={{color:kThemeRedColor, fontWeight:'bold', fontSize:26}}> DG EVENT LOGGING </Text>
                        </View>
                        <TouchableOpacity style={{ flex:1, width:40, height:40, marginRight:10, alignItems:'center', justifyContent:'center', alignSelf:'flex-end'}} onPress={()=>this.fethchMessages()}>
                            <Image style={{width:25, height:25, resizeMode:'stretch'}} source={require("../resources/Refresh_icon.png")}></Image>
                        </TouchableOpacity>
                    </View>
                    
                    <FlatList
                        data={this.state.logDate}
                        renderItem={({ item, index, separators })=>{
                            return  <View key={index} style={{flex:1, height:75, marginLeft:10, marginRight:10, alignItems:'center', justifyContent:'center'}}>
                                        <Text style={{fontSize:11, color:kThemeBlueColor}}> Date - {item.date} </Text>
                                        
                                        <View style={[{flex:1, maxHeight:40, margin:10, marginTop:5, borderRadius:5, backgroundColor:'#fff', flexDirection:'row'},style.cardShadow]}>

                                            <View style={{flex:1, paddingLeft:20, justifyContent:'center'}}>
                                                <Text style={{fontSize:10, color:kThemeBlueColor}}> DG START DATE </Text>
                                            
                                                <Text style={{fontSize:8}}> {item.dg_start_date} </Text>
                                            </View>
                                            
                                            <View style={{flex:1,  justifyContent:'center'}}>
                                                <Text style={{fontSize:10, color:kThemeBlueColor}}> DG END DATE </Text>
                                            
                                                <Text style={{fontSize:8}}> {item.dg_end_date} </Text>
                                            </View>
                                        </View>
                                    </View>
                        }}
                    />

                    
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
  
export default connect(mapStateToProps, mapDispatchToProps)(EventLogging);