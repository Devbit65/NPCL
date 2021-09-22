import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    Modal,
    Platform,
    PermissionsAndroid,
    FlatList
} from 'react-native';

import moment from 'moment';

import UserData from '../utilities/models/user-data'
import MonthPicker, { ACTION_DATE_SET, ACTION_DISMISSED, ACTION_NEUTRAL } from 'react-native-month-year-picker';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../redux/action';
import {fetchMonthlyBillURL} from '../utilities/webservices'
import Spinner from '../components/activity-indicator'
import RNFetchBlob from 'rn-fetch-blob'


const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class Report extends Component {

    constructor(props) {
        super(props);
        this.userData = new UserData().getUserData();
        var dataResouces = this.userData ? this.userData.resource : null
        var curDate = moment(new Date()).format('DD-MMM-YYYY');
        
        this.state={
            monthly_bill_enable : dataResouces ? dataResouces.monthly_bill_enable : 'N',
            date : curDate,
            willShowCallendar : false,
            monthlyBillList : []
        }
        this.spinner = new Spinner()
    }

    componentDidMount() {

        var dataResouces = this.userData ? this.userData.resource : null
        var monthly_bill_no_of_month =  this.state.monthly_bill_enable ? dataResouces.monthly_bill_no_of_month : 0
        
        const newDate = new Date()
        var currentMonth = newDate.getMonth()+1
        var currentYear = newDate.getFullYear()
        var monthlyBillList = []
        for(var idx = 0; idx < monthly_bill_no_of_month; idx++){

            currentMonth = Number(currentMonth) - 1
            
            if(currentMonth === 0){
                currentMonth = 12
                currentYear = Number(currentYear) - 1
            }
            var date = moment(new Date(currentMonth+"/"+"01"+"/"+currentYear)).format('DD-MMMM-YYYY');
            var dateArray = date.split("-")

            var pdfData = {
                month : currentMonth,
                monthName : dateArray[1],
                year : dateArray[2]
            }

            monthlyBillList.push(pdfData)
        }

        this.setState({
            monthlyBillList:monthlyBillList
        })
    }

    onPressDaily() {
        this.spinner.startActivity()
        this.props.navigation.navigate("ReportChart",{ "period":"DAILY", "selecteDate":this.state.date })
    }

    onPressMonthly() {
        this.props.navigation.navigate("ReportChart",{ "period":"MONTHLY", "selecteDate":this.state.date })
    }

    onPressComparative() {
        this.props.navigation.navigate("ReportChart",{ "period":"COMPARATIVE", "selecteDate":this.state.date })
    }

    onPressCurrentTarrif() {
        this.props.navigation.navigate("CurrentTarrif")
    }

    async onPressBillDownload(pdfData) {

        if(Platform.OS === 'android'){

            try {
                const READ_PERMISSION = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
                const WRITE_PERMISSION = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                
                const granted = await PermissionsAndroid.requestMultiple(
                        [
                            READ_PERMISSION,
                            WRITE_PERMISSION
                        ]
                        
                    // {
                    //     title: "App need Storage Permission",
                    //     message:
                    //     "App need you device storage permesion " +
                    //     "so you can download monthly bill.",
                    //     buttonNeutral: "Ask Me Later",
                    //     buttonNegative: "Cancel",
                    //     buttonPositive: "OK"
                    // }
                );
                if (granted[READ_PERMISSION] === PermissionsAndroid.RESULTS.GRANTED && granted[WRITE_PERMISSION] === PermissionsAndroid.RESULTS.GRANTED) {
                } else {
                    
                    return;
                }
            } catch (err) {
                console.warn(err);
                return;
            }
        }

        this.spinner.startActivity();
        if(!this.spinner.isNetConnected()){
            alert("Please check you internet connection.")
            this.spinner.stopActivity()
            return;
        }

        const month = pdfData.month
        const monthName = pdfData.monthName
        const year = pdfData.year

        const monthlyBillURL = fetchMonthlyBillURL(month, year)
        const pdfName = "Monthly_Bill_"+monthName+"_"+year+".pdf"

        const { dirs } = RNFetchBlob.fs;
        const dirToSave = Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir
        const configfb = {
            fileCache: true,
            useDownloadManager: true,
            notification: true,
            mediaScannable: true,
            title: pdfName,
            path: `${dirToSave}/${pdfName}`,
        }
        const configOptions = Platform.select({
            ios: {
                fileCache: configfb.fileCache,
                title: configfb.title,
                path: configfb.path,
                appendExt: 'pdf',
            },
            android: configfb,
        });
        RNFetchBlob
        .config(configOptions)
        .fetch('GET', monthlyBillURL, {
            //some headers ..
        })
        .progress({ count : 20 },(received, total) => {
            
        })
        .then((res) => {
            var newPath =  res.path()
            if(Platform.OS === 'android'){

                RNFetchBlob.android.addCompleteDownload({
                    title: pdfName,
                    description: pdfName,
                    mime: 'application/pdf',
                    path: newPath,
                    showNotification: true
                })
            }
            
            alert("Bill downloaded successfully.")
            this.props.showPDFView(true, newPath)
        })
        .catch((error)=>{
            this.spinner.stopActivity()
            alert("Unable to download bill for Month : "+monthName+" Year : "+year+". Please try again.")
        })

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
        <View style={{flex:1, backgroundColor:'rgb(242,242,242)', marginBottom:25, margin:5}}>
                    <View style={{flex:1, maxHeight:40, margin:5, flexDirection:'row'}}>
                        <View style={{flex:1, alignItems:'flex-start', justifyContent:'center'}}>
                            <Text style={{color:kThemeRedColor, fontWeight:'bold', fontSize:30}}> REPORT </Text>
                        </View>
                        {/* <TouchableOpacity style={{backgroundColor:'#ededed', marginRight:10}} onPress={()=>this.openCallendar()}>
                            <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                                <Text style={{color:kThemeBlueColor, fontWeight:'bold', fontSize:11, textAlign:'right'}}> {newDate.day} </Text>
                            </View>
                            <View style={{flex:1, backgroundColor:kThemeRedColor, alignItems:'flex-end', justifyContent:'center'}}>
                                <Text style={{color:'#fff', fontWeight:'bold', fontSize:12, textAlign:'right', backgroundColor:kThemeRedColor}}> {newDate.month.toUpperCase()} </Text>
                            </View>
                            <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                                <Text style={{color:kThemeBlueColor, fontWeight:'bold', fontSize:11, textAlign:'right'}}> {newDate.year} </Text>
                            </View>
                        </TouchableOpacity> */}
                    </View>
                    <View style={{flexDirection:'row', margin:5}}>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>this.onPressDaily()} style={[{ width:100, height:100, margin:5, borderRadius:5, backgroundColor:'#fff', alignItems:'center', justifyContent:'center'}, style.cardShadow]}>
                                <Image style={{width:75, height:75, resizeMode:'contain' }}  source={require("../resources/daily.png")}/>
                                <Text style={{marginTop:5, fontSize:11, fontWeight:'bold', color:kThemeBlueColor}}>DAILY</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>this.onPressMonthly()} style={[{ width:100, height:100, margin:5, borderRadius:5, backgroundColor:'#fff', alignItems:'center', justifyContent:'center'}, style.cardShadow]}>
                                <Image style={{width:75, height:75, resizeMode:'contain' }}  source={require("../resources/monthly.jpg")}/>
                                <Text style={{marginTop:5, fontSize:11, fontWeight:'bold', color:kThemeBlueColor}}>MONTHLY</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', margin:5, marginTop:20}}>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>this.onPressComparative()} style={[{ width:100, height:100, margin:5, borderRadius:5, backgroundColor:'#fff', alignItems:'center', justifyContent:'center'}, style.cardShadow]}>
                                <Image style={{width:75, height:75, resizeMode:'contain' }}  source={require("../resources/comparative.png")}/>
                                <Text style={{marginTop:5, fontSize:11, fontWeight:'bold', color:kThemeBlueColor}}>COMPARATIVE</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>this.onPressCurrentTarrif()} style={[{ width:100, height:100, margin:5, borderRadius:5, backgroundColor:'#fff', alignItems:'center', justifyContent:'center'}, style.cardShadow]}>
                                <Image style={{width:75, height:75, resizeMode:'contain' }}  source={require("../resources/current-tariff.png")}/>
                                <Text style={{marginTop:5, fontSize:11, fontWeight:'bold', color:kThemeBlueColor}}>CURRENT TARRIF</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {this.state.monthly_bill_enable === 'Y' && 
                        <View style={{flex:1, marginTop:20}}>
                            <FlatList
                                data={this.state.monthlyBillList}
                                renderItem={({ item, index, separators })=>{
                                    return  <View style={{flexDirection:'row', margin:15, marginTop:5, marginBottom:0}}>
                                        <TouchableOpacity onPress={()=>this.onPressBillDownload(item)} style={[{flex:1, height:54, margin:5, borderRadius:5, backgroundColor:'#fff', flexDirection:'row', alignItems:'center', justifyContent:'center'}, style.cardShadow]}>
                                            <View style={{flex:1, marginLeft:10, alignItems:'flex-start', justifyContent:'center'}}>
                                                <Image style={{ width:45, height:45, resizeMode:'contain' }}  source={require("../resources/bill-download.png")}/>
                                            </View>
                                            
                                            <View style={{ flex:1, margin:5}}>
                                                <View style={{ flex:1, alignItems:'flex-start', justifyContent:'center'}}>
                                                    <Text style={{textAlign:'justify', fontSize:12, fontWeight:'bold', color:kThemeBlueColor}}>{item.monthName} - {item.year}</Text>
                                                </View>
                                                
                                                <View style={{ flex:1, alignItems:'flex-start', justifyContent:'center'}}>
                                                    <Text style={{fontSize:11, fontWeight:'bold', color:kThemeBlueColor}}>BILL DOWNLOAD</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                }}
                            />
                        </View>
                    }

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
        
    };  
  }
  
  function mapDispatchToProps(dispatch) { 
      return bindActionCreators(ActionCreators, dispatch); 
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Report);
