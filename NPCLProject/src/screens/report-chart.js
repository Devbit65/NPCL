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
import {fetchDailyReport} from '../utilities/webservices'
import Spinner from '../components/activity-indicator'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class ReportChart extends Component {
    constructor(props){
        super(props)

        this.spinner = new Spinner()
        this.userData = new UserData().getUserData();
    }

    componentDidMount() {

        this.fetchDailyReport();
    }

    fetchDailyReport() {

        this.spinner.startActivity();
        fetchDailyReport()
        .then(response=>{

            console.log("response ",response)
            this.spinner.stopActivity();
        })

    }
    render(){
        var dataResouces = this.userData.resource
        return  <View style={{flex:1, backgroundColor:'#fff'}}>
                    <View style={{margin:5, alignItems:'flex-start', justifyContent:'center', backgroundColor:'#fff'}}>
                        <Text style={{color:'rgb(206, 0, 57)', fontWeight:'bold', fontSize:30}}> REPORT </Text>
                    </View>
                    <View style={{flex:1, backgroundColor:'#fff'}}>

                        <View style={[{ flex:1, margin:15, padding:5, borderRadius:5, backgroundColor:'rgb(242,242,242)'}, style.cardShadow]}>
                            <Text style={{color:'rgb(19,69,113)', fontSize:9, alignSelf:'center'}}> GRID CONSUMPTION </Text>
                            <View style={{flex:1}}>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                <Text style={{flex:1, color:'rgb(19,69,113)', fontSize:9, alignSelf:'center', textAlign:'center'}}> GRID {dataResouces.reading_unit} </Text>
                                <Text style={{flex:1, color:'rgb(206, 0, 57)', fontSize:9, alignSelf:'center', textAlign:'center'}}> DG {dataResouces.reading_unit} </Text>
                            </View>
                        </View>

                        <View style={[{ flex:1, margin:15, padding:5, borderRadius:5, backgroundColor:'rgb(242,242,242)'}, style.cardShadow]}>
                            <Text style={{color:'rgb(19,69,113)', fontSize:9, alignSelf:'center'}}> COST CONSUMPTION </Text>
                            <View style={{flex:1}}>
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