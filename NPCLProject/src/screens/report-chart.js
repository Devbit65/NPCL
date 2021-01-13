import React, { Component } from 'react';
import {
    Text, 
    View,
    Image,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native';

import UserData from '../utilities/models/user-data'
import {fetchDailyReport, fetchMonthlyReport} from '../utilities/webservices'
import Spinner from '../components/activity-indicator'
import Icon from 'react-native-vector-icons/MaterialIcons';

import { StackedAreaChart, YAxis, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class ReportChart extends Component {
    constructor(props){
        super(props)

        this.state={
            chartData : [],
            period : ""
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
            period : params["period"]
        },()=>{

            if(this.state.period === "MONTHLY"){
                this.fetchMonthlyReport(2020);
            }
            else if(this.state.period === "DAILY"){
                this.fetchDailyReport(11, 2020);
            }
        })
    }

    fetchDailyReport(month, year) {

        this.spinner.startActivity();
        fetchDailyReport(month, year)
        .then(response=>{
            
            if(response.resource) {
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

    fetchMonthlyReport(year) {

        this.spinner.startActivity();
        fetchMonthlyReport(year)
        .then(response=>{

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

    render(){
        var dataResouces = this.userData.resource
        const contentInset = { top: 20, bottom: 20 }

        return  <View style={{flex:1, backgroundColor:'#fff'}}>
                    <View style={{margin:5, alignItems:'flex-start', justifyContent:'center', backgroundColor:'#fff'}}>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity onPress={()=>this.onPressBackButton()} style={{width:25, alignItems:'center', justifyContent:'center'}}>
                                <Icon size={21} name="arrow-back-ios" color="rgb(206, 0, 57)" />
                            </TouchableOpacity>
                            <Text adjustsFontSizeToFit={true} style={{color:kThemeRedColor, fontWeight:'bold', fontSize:25}}> REPORT - {this.state.period} </Text>
                        </View>
                    </View>
                    <View style={{flex:1, backgroundColor:'#fff'}}>

                        <View style={[{ flex:1, margin:15, padding:5, borderRadius:5, backgroundColor:'rgb(242,242,242)'}, style.cardShadow]}>
                            <Text style={{color:kThemeBlueColor, fontSize:9, alignSelf:'center', fontWeight:'bold'}}> GRID CONSUMPTION </Text>
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
                                        style={{ height: 200, paddingVertical: 16, paddingHorizontal:10}}
                                        data={this.state.chartData}
                                        keys={['dg_unit','grid_unit']}
                                        colors={[kThemeRedColor,kThemeBlueColor]}
                                        curve={shape.curveNatural}
                                        showGrid={true}
                                    >
                                        <Grid />
                                    </StackedAreaChart>
                                </View>
                            </View>}
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
                                        style={{ height: 200, paddingVertical: 16, paddingHorizontal:10 }}
                                        data={this.state.chartData}
                                        keys={['dg_amt','grid_amt']}
                                        colors={[kThemeRedColor,kThemeBlueColor]}
                                        curve={shape.curveNatural}
                                        showGrid={false}
                                    >
                                        <Grid />
                                    </StackedAreaChart>
                                </View>
                            </View>}
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