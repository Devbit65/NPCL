import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    Modal,
    Platform
} from 'react-native';

import moment from 'moment';

import UserData from '../utilities/models/user-data'
import MonthPicker, { ACTION_DATE_SET, ACTION_DISMISSED, ACTION_NEUTRAL } from 'react-native-month-year-picker';

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class Report extends Component {

    constructor(props) {
        super(props);
        this.userData = new UserData().getUserData();
        var dataResouces = this.userData.resource
        var curDate = moment(new Date()).format('DD-MMM-YYYY');
        
        this.state={
            monthly_bill_enable : dataResouces.monthly_bill_enable, //'N'
            date : curDate,
            willShowCallendar : false
        }
    }

    onPressDaily() {
        this.props.navigation.navigate("ReportChart",{ "period":"DAILY", "selecteDate":this.state.date })
    }

    onPressMonthly() {
        this.props.navigation.navigate("ReportChart",{ "period":"MONTHLY", "selecteDate":this.state.date })
    }

    onPressComparative() {
        console.log("onPressComparative")
    }

    onPressCurrentTarrif() {
        console.log("onPressCurrentTarrif")
    }

    onPressBillDownload() {
        console.log("onPressBillDownload")
    }

    onSelectDate(newDate) {
        var curDate = moment(newDate).format('DD-MMM-YYYY');
        this.setState({
            date:curDate,
            willShowCallendar:false
        })
    }

    openCallendar() {

        this.setState({
            willShowCallendar:true
        })
    }

    closeCallendar() {
        this.setState({
            willShowCallendar:false
        })
    }

    onValueChange = (event, newDate) => {
        switch(event) {
          case ACTION_DATE_SET:
            this.onSelectDate(newDate)
            break;
          case ACTION_NEUTRAL:
          case ACTION_DISMISSED:
          default:
            this.closeCallendar(); //when ACTION_DISMISSED new date will be undefined
        }
      }

    render() {
        var dateArray = this.state.date.split('-')
        var newDate = {day:dateArray[0], month:dateArray[1], year:dateArray[2]}
        return  <View style={{flex:1, backgroundColor:'#fff'}}>
                    <View style={{flex:1, maxHeight:40, margin:5, flexDirection:'row'}}>
                        <View style={{flex:1, alignItems:'flex-start', justifyContent:'center'}}>
                            <Text style={{color:kThemeRedColor, fontWeight:'bold', fontSize:30}}> REPORT </Text>
                        </View>
                        <TouchableOpacity style={{backgroundColor:'#ededed', marginRight:10}} onPress={()=>this.openCallendar()}>
                            <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                                <Text style={{color:kThemeBlueColor, fontWeight:'bold', fontSize:11, textAlign:'right'}}> {newDate.day} </Text>
                            </View>
                            <View style={{flex:1, backgroundColor:kThemeRedColor, alignItems:'flex-end', justifyContent:'center'}}>
                                <Text style={{color:'#fff', fontWeight:'bold', fontSize:12, textAlign:'right', backgroundColor:kThemeRedColor}}> {newDate.month.toUpperCase()} </Text>
                            </View>
                            <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                                <Text style={{color:kThemeBlueColor, fontWeight:'bold', fontSize:11, textAlign:'right'}}> {newDate.year} </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row', margin:5}}>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>this.onPressDaily()} style={[{ width:100, height:100, margin:5, borderRadius:5, backgroundColor:'#fff', alignItems:'center', justifyContent:'center'}, style.cardShadow]}>
                                <Image style={{width:75, height:75, resizeMode:'center' }}  source={require("../resources/daily.png")}/>
                                <Text style={{marginTop:5, fontSize:11, fontWeight:'bold', color:kThemeBlueColor}}>DAILY</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>this.onPressMonthly()} style={[{ width:100, height:100, margin:5, borderRadius:5, backgroundColor:'#fff', alignItems:'center', justifyContent:'center'}, style.cardShadow]}>
                                <Image style={{width:75, height:75, resizeMode:'center' }}  source={require("../resources/monthly.jpg")}/>
                                <Text style={{marginTop:5, fontSize:11, fontWeight:'bold', color:kThemeBlueColor}}>MONTHLY</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', margin:5, marginTop:20}}>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>this.onPressComparative()} style={[{ width:100, height:100, margin:5, borderRadius:5, backgroundColor:'#fff', alignItems:'center', justifyContent:'center'}, style.cardShadow]}>
                                <Image style={{width:75, height:75, resizeMode:'center' }}  source={require("../resources/comparative.png")}/>
                                <Text style={{marginTop:5, fontSize:11, fontWeight:'bold', color:kThemeBlueColor}}>COMPARATIVE</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>this.onPressCurrentTarrif()} style={[{ width:100, height:100, margin:5, borderRadius:5, backgroundColor:'#fff', alignItems:'center', justifyContent:'center'}, style.cardShadow]}>
                                <Image style={{width:75, height:75, resizeMode:'center' }}  source={require("../resources/current-tariff.png")}/>
                                <Text style={{marginTop:5, fontSize:11, fontWeight:'bold', color:kThemeBlueColor}}>CURRENT TARRIF</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {this.state.monthly_bill_enable === 'Y' && <View style={{flexDirection:'row', margin:15, marginTop:20}}>
                        <TouchableOpacity onPress={()=>this.onPressBillDownload()} style={[{flex:1, height:54, margin:5, borderRadius:5, backgroundColor:'#fff', flexDirection:'row', alignItems:'center', justifyContent:'center'}, style.cardShadow]}>
                            <View style={{flex:1, marginLeft:10, alignItems:'flex-start', justifyContent:'center'}}>
                            <Image style={{ width:45, height:45, resizeMode:'center' }}  source={require("../resources/bill-download.png")}/>
                            </View>
                            <Text style={{ flex:1, marginTop:5, fontSize:11, fontWeight:'bold', color:kThemeBlueColor}}>BILL DOWNLOAD</Text>
                        </TouchableOpacity>
                    </View>}

                    {this.state.willShowCallendar && Platform.OS === 'ios' &&(
                        <Modal
                            style={{backgroundColor:'red'}}
                            animationType="slide"
                            transparent={true}
                            visible={this.state.willShowCallendar}
                            onRequestClose={() => {
                                this.setState({
                                    willShowCallendar:false
                                })
                        }}>
                            <MonthPicker
                                onChange={this.onValueChange}
                                value={new Date(this.state.date)}
                                minimumDate={new Date(1900, 1)}
                                maximumDate={new Date()}
                                locale="en"
                            />
                        </Modal>
                    )}

                    {this.state.willShowCallendar && Platform.OS === 'android' &&(
                            <MonthPicker
                                onChange={this.onValueChange}
                                value={new Date(this.state.date)}
                                minimumDate={new Date(1900, 1)}
                                maximumDate={new Date()}
                                locale="en"
                            />
                    )}
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

export default Report;