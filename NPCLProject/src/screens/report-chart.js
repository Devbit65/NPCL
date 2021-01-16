import React, { Component } from 'react';
import {
    Text, 
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Platform
} from 'react-native';

import UserData from '../utilities/models/user-data'
import {fetchDailyReport, fetchMonthlyReport} from '../utilities/webservices'
import Spinner from '../components/activity-indicator'
import Icon from 'react-native-vector-icons/MaterialIcons';

import { StackedAreaChart, YAxis, XAxis, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import moment from 'moment';
import MonthPicker, { ACTION_DATE_SET, ACTION_DISMISSED, ACTION_NEUTRAL } from 'react-native-month-year-picker';

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class ReportChart extends Component {
    constructor(props){
        super(props)

        const { params } = this.props.route;
        this.state={
            chartData : [],
            period : "",
            date:params["selecteDate"],
            willShowCallendar : false,
            xAxisDate:[]
        }
        this.period = ""
        this.chart1UnitYAxis = []
        this.chart1AmountYAxis = []
        this.chart2YAxis = []
        this.spinner = new Spinner()
        this.userData = new UserData().getUserData();
    }

    componentDidMount() {

        const { params } = this.props.route;

        this.setState({
            period : params["period"],
            date: params["selecteDate"]
        },()=>this.fetchReport(params["selecteDate"]))
    }

    fetchReport(newDate) {

        var curDate = moment(newDate).format('DD-MM-YYYY');
        var dateArray = curDate.split('-')
        newDate = {day:dateArray[0], month:dateArray[1], year:dateArray[2]}

        if(this.state.period === "MONTHLY"){
            this.fetchMonthlyReport(newDate.year);
        }
        else if(this.state.period === "DAILY"){
            this.fetchDailyReport(newDate.month, newDate.year);
        }
    }

    fetchDailyReport(month, year) {

        this.spinner.startActivity();
        fetchDailyReport(month, year)
        .then(response=>{
            if(response.resource) {
                response.resource = response.resource.sort(this.GetSortOrder("date"))
                var maxUnit = 0
                var maxAmount = 0
                for(var i=0; i<response.resource.length; i++){
                    if(Number(response.resource[i].grid_unit) > maxUnit)
                        maxUnit = Number(response.resource[i].grid_unit)

                    if(Number(response.resource[i].grid_amt) > maxAmount)
                        maxAmount = Number(response.resource[i].grid_amt)
                }
                this.chart1UnitYAxis = [0, maxUnit];
                this.chart1AmountYAxis = [0, maxAmount];
                this.setState({
                    chartData : response.resource
                })
            }
            this.spinner.stopActivity();
        })
        .catch(error=>{

        })

    }

    GetSortOrder(prop) {    
        return function(a, b) {    
            if (a[prop] > b[prop]) {    
                return 1;    
            } else if (a[prop] < b[prop]) {    
                return -1;    
            }    
            return 0;    
        }    
    } 

    fetchMonthlyReport(year) {

        this.spinner.startActivity();
        fetchMonthlyReport(year)
        .then(response=>{
            response.resource = response.resource.sort(this.GetSortOrder("date"))
            var maxUnit = 0
            var maxAmount = 0
            for(var i=0; i<response.resource.length; i++){
                if(Number(response.resource[i].grid_unit) > maxUnit)
                    maxUnit = Number(response.resource[i].grid_unit)

                if(Number(response.resource[i].grid_amt) > maxAmount)
                    maxAmount = Number(response.resource[i].grid_amt)
            }
            this.chart1UnitYAxis = [0, maxUnit];
            this.chart1AmountYAxis = [0, maxAmount];
            if(response.resource) {
                this.setState({
                    chartData : response.resource
                })
            }
            this.spinner.stopActivity();
        })

    }

    onPressBackButton() {
        this.props.navigation.pop()
    }

    onSelectDate(newDate) {
        var curDate = moment(newDate).format('DD-MMM-YYYY');
        this.setState({
            date:curDate,
            willShowCallendar:false,
        },()=>this.fetchReport(curDate))
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

    render(){
        var dataResouces = this.userData.resource
        const contentInset = { bottom: 20 }

        var newDate = {day:"-", month:"-", year:"-"}
        if(this.state.date) {

            var dateArray = this.state.date.split('-')
            newDate = {day:dateArray[0], month:dateArray[1], year:dateArray[2]}
        }

        return  <View style={{flex:1, backgroundColor:'#fff'}}>
                    <View style={{margin:5, alignItems:'flex-start', justifyContent:'center', backgroundColor:'#fff'}}>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity onPress={()=>this.onPressBackButton()} style={{width:25, alignItems:'center', justifyContent:'center'}}>
                                <Icon size={21} name="arrow-back-ios" color="rgb(206, 0, 57)" />
                            </TouchableOpacity>
                            <View style={{flex:1, maxHeight:40, margin:5, flexDirection:'row'}}>
                                <View style={{flex:1, alignItems:'flex-start', justifyContent:'center'}}>
                                    <Text style={{color:kThemeRedColor, fontWeight:'bold', fontSize:30}}> REPORT </Text>
                                </View>
                                <TouchableOpacity style={{backgroundColor:'#ededed', marginRight:10}} onPress={()=>this.openCallendar()}>
                                    {this.state.period === "DAILY" && <View style={{flex:1, backgroundColor:kThemeRedColor, alignItems:'center', justifyContent:'center'}}>
                                        <Text style={{color:'#fff', fontWeight:'bold', fontSize:12, textAlign:'right'}}> {newDate.month.toUpperCase()} </Text>
                                    </View>}
                                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                        <Text style={{color:kThemeBlueColor, fontWeight:'bold', fontSize:11,textAlign:'right',}}> {newDate.year} </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{flex:1, backgroundColor:'#fff'}}>

                        <View style={[{ flex:1, margin:15, padding:5, borderRadius:5, backgroundColor:'rgb(242,242,242)'}, style.cardShadow]}>
                            <Text style={{color:kThemeBlueColor, fontSize:9, alignSelf:'center', fontWeight:'bold'}}> GRID CONSUMPTION </Text>
                            <View style={{flex:1}}>
                                {this.state.chartData && this.state.chartData.length>0 &&  <View style={{ flex:1, flexDirection:'row'}}>
                                    <YAxis
                                        data={this.chart1UnitYAxis}
                                        contentInset={contentInset}
                                        svg={{
                                            fill: 'grey',
                                            fontSize: 10,
                                        }}
                                        numberOfTicks={10}
                                        formatLabel={(value) => `${value}`}
                                    />
                                    <View style={{ flex:1}}>
                                        <StackedAreaChart
                                            style={{ height: '90%', paddingVertical: 1, paddingHorizontal:10}}
                                            data={this.state.chartData}
                                            keys={['dg_unit','grid_unit']}
                                            colors={[kThemeRedColor,kThemeBlueColor]}
                                            curve={shape.curveNatural}
                                            showGrid={true}
                                        >
                                            <Grid />
                                        </StackedAreaChart>
                                        <XAxis
                                            data={this.state.chartData}
                                            style={{width:'100%', height:20}}
                                            formatLabel={(value, index) => index+1}
                                            contentInset={{ left: 10, right: 10 }}
                                            svg={{ fontSize: 6, fill: 'grey',  rotation: -90,originY: 10, y:10 }}
                                        />
                                    </View>
                                    
                                </View>}
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                    <Icon size={10} name="check-box-outline-blank" color={kThemeBlueColor} />
                                    <Text style={{color:kThemeBlueColor, fontSize:9, alignSelf:'center', textAlign:'center'}}> GRID {dataResouces.reading_unit} </Text>
                                </View>
                                <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                    <Icon size={10} name="check-box-outline-blank" color="rgb(206, 0, 57)" />
                                    <Text style={{color:kThemeRedColor, fontSize:9, alignSelf:'center', textAlign:'center'}}> DG {dataResouces.reading_unit} </Text>
                                </View>
                            </View>
                        </View>

                        <View style={[{ flex:1, margin:15, padding:5, borderRadius:5, backgroundColor:'rgb(242,242,242)'}, style.cardShadow]}>
                            <Text style={{color:kThemeBlueColor, fontSize:9, alignSelf:'center', fontWeight:'bold'}}> COST CONSUMPTION </Text>
                            <View style={{flex:1}}>
                                {this.state.chartData && this.state.chartData.length>0 && <View style={{ flex:1, flexDirection:'row'}}>
                                    <YAxis
                                        data={this.chart1AmountYAxis}
                                        contentInset={contentInset}
                                        svg={{
                                            fill: 'grey',
                                            fontSize: 10,
                                        }}
                                        numberOfTicks={10}
                                        formatLabel={(value) => `${value}`}
                                    />
                                    <View style={{ flex:1}}>
                                        <StackedAreaChart
                                            style={{ height: '90%', paddingVertical: 1, paddingHorizontal:10}}
                                            data={this.state.chartData}
                                            keys={['dg_amt','grid_amt']}
                                            colors={[kThemeRedColor,kThemeBlueColor]}
                                            curve={shape.curveNatural}
                                            showGrid={false}
                                        >
                                            <Grid />
                                        </StackedAreaChart>
                                        <XAxis
                                            data={this.state.chartData}
                                            style={{width:'100%', height:20}}
                                            formatLabel={(value, index) => index+1}
                                            contentInset={{ left: 10, right: 10 }}
                                            svg={{ fontSize: 6, fill: 'grey',  rotation: -90,originY: 10, y:10 }}
                                        />
                                    </View>
                                </View>}
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                    <Icon size={10} name="check-box-outline-blank" color={kThemeBlueColor} />
                                    <Text style={{color:kThemeBlueColor, fontSize:9, alignSelf:'center', textAlign:'center'}}> GRID {dataResouces.currency} </Text>
                                </View>
                                <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                    <Icon size={10} name="check-box-outline-blank" color="rgb(206, 0, 57)" />
                                    <Text style={{color:kThemeRedColor, fontSize:9, alignSelf:'center', textAlign:'center'}}> DG {dataResouces.currency} </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {this.state.willShowCallendar && Platform.OS === 'ios'  && (
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

                    {this.state.willShowCallendar && Platform.OS === 'android' && (
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

export default ReportChart;