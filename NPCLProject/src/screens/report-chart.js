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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { StackedAreaChart, YAxis, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

class ReportChart extends Component {
    constructor(props){
        super(props)

        this.state={
            chardData : []
        }
        this.chart1UnitYAxis = []
        this.chart1AmountYAxis = []
        this.chart2YAxis = []
        this.spinner = new Spinner()
        this.userData = new UserData().getUserData();
    }

    componentDidMount() {

        this.fetchMonthlyReport(2020);
        // this.fetchDailyReport(11, 2020);
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
                    chardData : response.resource
                })
            }
            this.spinner.stopActivity();
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
                    chardData : response.resource
                })
            }
            this.spinner.stopActivity();
        })

    }

    render(){
        var dataResouces = this.userData.resource
        const contentInset = { top: 20, bottom: 20 }
        const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
        return  <View style={{flex:1, backgroundColor:'#fff'}}>
                    <View style={{margin:5, alignItems:'flex-start', justifyContent:'center', backgroundColor:'#fff'}}>
                        <Text style={{color:'rgb(206, 0, 57)', fontWeight:'bold', fontSize:30}}> REPORT </Text>
                    </View>
                    <View style={{flex:1, backgroundColor:'#fff'}}>

                        <View style={[{ flex:1, margin:15, padding:5, borderRadius:5, backgroundColor:'rgb(242,242,242)'}, style.cardShadow]}>
                            <Text style={{color:'rgb(19,69,113)', fontSize:9, alignSelf:'center', fontWeight:'bold'}}> GRID CONSUMPTION </Text>
                            <View style={{ flex:1, flexDirection:'row'}}>
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
                                        data={this.state.chardData}
                                        keys={['dg_unit','grid_unit']}
                                        colors={['rgb(206, 0, 57)','rgb(19,69,113)']}
                                        curve={shape.curveNatural}
                                        showGrid={true}
                                    >
                                        <Grid />
                                    </StackedAreaChart>
                                </View>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                <Text style={{flex:1, color:'rgb(19,69,113)', fontSize:9, alignSelf:'center', textAlign:'center'}}> GRID {dataResouces.reading_unit} </Text>
                                <Text style={{flex:1, color:'rgb(206, 0, 57)', fontSize:9, alignSelf:'center', textAlign:'center'}}> DG {dataResouces.reading_unit} </Text>
                            </View>
                        </View>

                        <View style={[{ flex:1, margin:15, padding:5, borderRadius:5, backgroundColor:'rgb(242,242,242)'}, style.cardShadow]}>
                            <Text style={{color:'rgb(19,69,113)', fontSize:9, alignSelf:'center', fontWeight:'bold'}}> COST CONSUMPTION </Text>
                            <View style={{ flex:1, flexDirection:'row'}}>
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
                                        data={this.state.chardData}
                                        keys={['dg_amt','grid_amt']}
                                        colors={['rgb(206, 0, 57)','rgb(19,69,113)']}
                                        curve={shape.curveNatural}
                                        showGrid={false}
                                    >
                                        <Grid />
                                    </StackedAreaChart>
                                </View>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                <Text style={{flex:1, color:'rgb(19,69,113)', fontSize:9, alignSelf:'center', textAlign:'center'}}> GRID {dataResouces.currency} </Text>
                                <Text style={{flex:1, color:'rgb(206, 0, 57)', fontSize:9, alignSelf:'center', textAlign:'center'}}> DG {dataResouces.currency} </Text>
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