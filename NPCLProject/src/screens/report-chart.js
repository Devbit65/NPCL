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
import {fetchDailyReport, fetchMonthlyReport, fetchMonthlyComparativeReport} from '../utilities/webservices'
import Spinner from '../components/activity-indicator'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { INITIATE_REFRESH } from '../redux/constants';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../redux/action';

import moment from 'moment';
import MonthPicker, { ACTION_DATE_SET, ACTION_DISMISSED, ACTION_NEUTRAL } from 'react-native-month-year-picker';
import BarChart from '../components/BarChart'
import AreaChart from '../components/areaChart'

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class ReportChart extends Component {
    constructor(props){
        super(props)

        const { params } = this.props.route;
        this.state={
            chartData : null,
            period : "",
            date:params["selecteDate"],
            willShowCallendar : false,
            xAxisDate:[],
            chartWidth:0,
            chartHeight:0,
            showChartInFullScreen : false,
            fullScreenChartType :null,
            prevDate:null
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
            prevDate : this.state.date,
            date: params["selecteDate"]
        },()=>this.fetchReport(params["selecteDate"]))
    }

    fetchReport(newDate) {

        this.spinner.startActivity()

        var curDate = moment(newDate).format('DD-MM-YYYY');
        var dateArray = curDate.split('-')
        newDate = {day:dateArray[0], month:dateArray[1], year:dateArray[2]}

        if(this.state.period === "MONTHLY"){
            this.fetchMonthlyReport(newDate.year);
        }
        else if(this.state.period === "DAILY"){
            this.fetchDailyReport(newDate.month, newDate.year);
        }
        if(this.state.period === "COMPARATIVE"){
            this.state.chartData = []
            this.fetchComparativeReport(newDate.month, newDate.year);
        }
    }

    fetchDailyReport(month, year) {

        this.spinner.startActivity();

        if(!this.spinner.isNetConnected()){
            alert("Please check you internet connection.")
            this.spinner.stopActivity()
            return;
        }

        fetchDailyReport(month, year)
        .then(response=>{
            if(response && response.rc === 0 && response.resource) {
                response.resource = response.resource.sort(this.GetSortOrder("date"))
                var maxUnit = 0
                var maxAmount = 0
                var data = {
                    "Unit":{
                        DG:[],
                        GRID:[],
                        "Month":[]
                    },
                    "Amount":{
                        DG:[],
                        GRID:[],
                        "Month":[]
                    },
                    
                }
                for(var i=0; i<response.resource.length; i++){
                    data["Unit"]["Month"].push(response.resource[i]["date"])
                    data["Unit"]['DG'].push(Number(response.resource[i]["dg_unit"]))
                    data["Unit"]['GRID'].push(Number(response.resource[i]["grid_unit"]))
                    data["Amount"]['DG'].push(Number(response.resource[i]["dg_amt"]))
                    data["Amount"]['GRID'].push(Number(response.resource[i]["grid_amt"]))
                    data["Amount"]["Month"].push(response.resource[i]["date"])
                }
                this.chart1UnitYAxis = [0, maxUnit];
                this.chart1AmountYAxis = [0, maxAmount];
                this.setState({
                    chartData : data
                })
            }
            else {
                var msg = response.message
                alert(msg)
                this.setState({
                    date : this.state.prevDate,
                    prevDate : ''
                })
            }
            this.spinner.stopActivity();
        })
        .catch(error=>{
            alert('Data not found')
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

        if(!this.spinner.isNetConnected()){
            alert("Please check you internet connection.")
            this.spinner.stopActivity()
            return;
        }

        fetchMonthlyReport(year)
        .then(response=>{
            if(response && response.rc === 0 && response.resource){

                response.resource = response.resource.sort(this.GetSortOrder("date"))
                var data = {
                    "Unit":{
                        DG:[],
                        GRID:[],
                        "Month":[]
                    },
                    "Amount":{
                        DG:[],
                        GRID:[],
                        "Month":[]
                    },
                    
                }
                for(var i=0; i<response.resource.length; i++){
                    data["Unit"]["Month"].push(response.resource[i]["month"])
                    data["Unit"]['DG'].push(Number(response.resource[i]["dg_unit"]))
                    data["Unit"]['GRID'].push(Number(response.resource[i]["grid_unit"]))
                    data["Amount"]['DG'].push(Number(response.resource[i]["dg_amt"]))
                    data["Amount"]['GRID'].push(Number(response.resource[i]["grid_amt"]))
                    data["Amount"]["Month"].push(response.resource[i]["month"])
                }
                if(response.resource) {
                    this.setState({
                        chartData : data
                    })
                }
            }
            else {
                var msg = response.message
                alert(msg)
                this.setState({
                    date : this.state.prevDate,
                    prevDate : ''
                })
            }
            this.spinner.stopActivity();
        })
        .catch(error=>{
            alert('Data not found')
        })

    }

    fetchComparativeReport(month, year){

        this.spinner.startActivity();

        if(!this.spinner.isNetConnected()){
            alert("Please check you internet connection.")
            this.spinner.stopActivity()
            return;
        }

        var _this = this
        fetchMonthlyComparativeReport(month, year)
        .then(response=>{
            if(response && response.rc === 0 && response.resource){
                _this.state.chartData.push(response.resource[0])
                if(_this.state.chartData.length < 2) {

                    year = Number(year)
                    year = year - 1

                    _this.fetchComparativeReport(month, year)
                }
                else{
                    var data = {
                            "Unit":{
                                DG:[],
                                GRID:[],
                                "Month":[]
                            },
                            "Amount":{
                                DG:[],
                                GRID:[],
                                "Month":[]
                            },
                            
                        }
                    for(var i = 0; i<_this.state.chartData.length; i++){


                        data["Unit"]["Month"].push(_this.state.chartData[i]["month"])
                        data["Unit"]['DG'].push(Number(_this.state.chartData[i]["dg_unit"]))
                        data["Unit"]['GRID'].push(Number(_this.state.chartData[i]["grid_unit"]))
                        data["Amount"]['DG'].push(Number(_this.state.chartData[i]["dg_amt"]))
                        data["Amount"]['GRID'].push(Number(_this.state.chartData[i]["grid_amt"]))
                        data["Amount"]["Month"].push(_this.state.chartData[i]["month"])

                    }
                    _this.setState({
                        chartData : data
                    },()=>{
                        this.spinner.stopActivity();
                    }) 
                }
            }
            else {
                var msg = response.message
                alert(msg)
                _this.setState({
                    date : this.state.prevDate,
                    prevDate : ''
                })
                this.spinner.stopActivity();
            }
        })
        .catch(error=>{
            alert('Data not found')
            this.spinner.stopActivity();
        })
    }

    getDailyMonthlyReportChart(key) {

        return  <View style={{ flex:1, flexDirection:'row'}} onLayout={(event)=>{
                    this.setState({
                        chartWidth:event.nativeEvent.layout.width,
                        chartHeight:event.nativeEvent.layout.height
                    })
                }}>
                    <AreaChart  
                        chartWidth={this.state.chartWidth}
                        chartHeight={this.state.chartHeight}
                        chartData={this.state.chartData[key]}
                        load_unit ={key === "Unit"?this.userData.resource.load_unit:this.userData.resource.currency}
                    />
                    
                </View>
    }

    getComparativeReportChart(key) {

        if(!this.state.chartData[key])
            return null
        return (
            <View style={{ flex:1, flexDirection:'row'}} onLayout={(event)=>{
                this.setState({
                    chartWidth:event.nativeEvent.layout.width,
                    chartHeight:event.nativeEvent.layout.height
                })
            }}>
                 <BarChart  
                    chartWidth={this.state.chartWidth}
                    chartHeight={this.state.chartHeight}
                    chartData={this.state.chartData[key]}
                    load_unit ={key === "Unit"?this.userData.resource.load_unit:this.userData.resource.currency}
                 />

            </View>            
        )
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

    componentDidUpdate() {

        if(this.props.data) {
            switch (this.props.data.type) {
                case INITIATE_REFRESH:
                    this.fetchReport(this.state.date)
                    this.props.onRefreshInitiated()
                    break;
            
                default:
                    break;
            }
        }
    }

    willShowFullScreen(chartType) {
        this.setState({
            showChartInFullScreen:true,
            fullScreenChartType : chartType
        })
    }

    closeFullScreen() {
        var chartData = this.state.chartData
        this.setState({
            chartData:null,
            showChartInFullScreen : false
        },()=>{
            this.setState({
                chartData:chartData
            })
        })
    }

    render(){
        var newDate = {day:"-", month:"-", year:"-"}
        if(this.state.date) {

            var dateArray = this.state.date.split('-')
            newDate = {day:dateArray[0], month:dateArray[1], year:dateArray[2]}
        }

        return  <View 
                    style={{flex:1, backgroundColor:'#fff'}} 
                    onLayout={(e)=>{{
                        var chartData = this.state.chartData
                        this.setState({
                            chartData:null
                        },()=>{
                            this.setState({
                                chartData:chartData
                            },()=>{
                            }) 
                        })
                    }}}
                >
                    <View style={{margin:5, alignItems:'flex-start', justifyContent:'center', backgroundColor:'#fff'}}>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity onPress={()=>this.onPressBackButton()} style={{width:25, alignItems:'center', justifyContent:'center'}}>
                                <Icon size={21} name="arrow-back-ios" color="rgb(206, 0, 57)" />
                            </TouchableOpacity>
                            <View style={{flex:1, height:40, flexDirection:'row'}}>
                                <View style={{flex:1, alignItems:'flex-start', justifyContent:'center'}}>
                                    <Text style={{color:kThemeRedColor, fontWeight:'bold', fontSize:this.state.period === "COMPARATIVE"?18:22}}>REPORT {'>'} {this.state.period}</Text>
                                </View>
                                <TouchableOpacity style={{backgroundColor:'#ededed', marginRight:10}} onPress={()=>this.openCallendar()}>
                                    {(this.state.period === "DAILY" || this.state.period === "COMPARATIVE") && <View style={{flex:1, backgroundColor:kThemeRedColor, alignItems:'center', justifyContent:'center'}}>
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
                            <View style={{width:'100%', height:20, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                                <View style={{flex:1}}/>
                                
                                <Text style={{ color:kThemeBlueColor, fontSize:9, alignSelf:'center', fontWeight:'bold'}}> GRID CONSUMPTION </Text>
                                
                                <TouchableOpacity onPress={()=>this.willShowFullScreen("Unit")} style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                                    <Icon size={18} name="open-in-full" color={kThemeBlueColor} />
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:1}}>
                                {this.state.chartData && this.state.period === "COMPARATIVE"? this.getComparativeReportChart("Unit"):this.state.chartData ?this.getDailyMonthlyReportChart("Unit"):null}
                            </View>
                        </View>

                        <View style={[{ flex:1, margin:15, padding:5, borderRadius:5, backgroundColor:'rgb(242,242,242)'}, style.cardShadow]}>
                            <View style={{width:'100%', height:20, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                                <View style={{flex:1}}/>
                                
                                <Text style={{color:kThemeBlueColor, fontSize:9, alignSelf:'center', fontWeight:'bold'}}> COST CONSUMPTION </Text>
                                
                                <TouchableOpacity onPress={()=>this.willShowFullScreen("Amount")} style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                                    <Icon size={18} name="open-in-full" color={kThemeBlueColor} />
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:1}}>
                                {this.state.chartData && this.state.period === "COMPARATIVE"? this.getComparativeReportChart("Amount"):this.state.chartData ?this.getDailyMonthlyReportChart("Amount"):null}
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

                    {this.state.showChartInFullScreen && <Modal animated={true} animationType={"slide"} isVisible={true} >
                        <View style={{ flex: 1, margin:20, marginTop:44, }}>
                            <View style={{margin:5, alignSelf:'flex-end'}}>
                                <TouchableOpacity onPress={()=>this.closeFullScreen()} style={{ alignItems:'center', justifyContent:'center', borderRadius:5}}>
                                    <Icon size={21} name="close-fullscreen" color={kThemeRedColor} />
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:1, backgroundColor:'rgb(242,242,242)', padding:10, borderRadius:10,}}>
                                {this.state.chartData && this.state.period === "COMPARATIVE"? this.getComparativeReportChart(this.state.fullScreenChartType):this.state.chartData ?this.getDailyMonthlyReportChart(this.state.fullScreenChartType):null}
                            </View>
                        </View>
                    </Modal>}
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
  
export default connect(mapStateToProps, mapDispatchToProps)(ReportChart);