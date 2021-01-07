import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';

import UserData from '../utilities/models/user-data'

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class Report extends Component {

    constructor(props) {
        super(props);
        this.userData = new UserData().getUserData();
        var dataResouces = this.userData.resource
        this.state={
            monthly_bill_enable : dataResouces.monthly_bill_enable //'N'
        }
    }

    onPressDaily() {
        this.props.navigation.navigate("ReportChart",{ "period":"DAILY" },)
    }

    onPressMonthly() {
        this.props.navigation.navigate("ReportChart",{ "period":"MONTHLY" },)
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

    render() {
        return  <View style={{flex:1, backgroundColor:'#fff'}}>
                    <View style={{margin:5, alignItems:'flex-start', justifyContent:'center'}}>
                        <Text style={{color:kThemeRedColor, fontWeight:'bold', fontSize:30}}> REPORT </Text>
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