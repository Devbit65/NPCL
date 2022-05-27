
import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    PermissionsAndroid,
    Platform
} from 'react-native';

import NoticeHeader from "../components/notice-header";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Pdf from 'react-native-pdf';
import UserData from '../utilities/models/user-data'
import Spinner from '../components/activity-indicator'
import RNFetchBlob from 'rn-fetch-blob'

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../redux/action';

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class PDFViewer extends Component {

    constructor(props) {
        super(props);

        const { params } = this.props.route;
        this.state = {
            billURL : params["pdfURL"]
        }
        this.userData = new UserData().getUserData();
        this.spinner = new Spinner()
        this.spinner.startActivity()
    }
    onPressBackButton() {
        this.props.showPDFView(false)
        this.props.navigation.pop()
    }

    onFinishLoading() {
        this.spinner.stopActivity()
    }

    async onPressBillDownload() {

        if(Platform.OS === 'android'){

            try {
                const READ_PERMISSION = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
                const WRITE_PERMISSION = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                
                const granted = await PermissionsAndroid.requestMultiple(
                        [
                            // READ_PERMISSION,
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
                // if (granted[READ_PERMISSION] === PermissionsAndroid.RESULTS.GRANTED && granted[WRITE_PERMISSION] === PermissionsAndroid.RESULTS.GRANTED) {
                if (granted[WRITE_PERMISSION] === PermissionsAndroid.RESULTS.GRANTED) {
                    this.initiateDownload();
                } else {
                    
                    return;
                }
            } catch (err) {
                console.warn(err);
                return;
            }
        }
        else {
            this.initiateDownload();
        }
    }

    initiateDownload() {

        this.spinner.startActivity();
        if(!this.spinner.isNetConnected()){
            alert("Please check you internet connection.")
            this.spinner.stopActivity()
            return;
        }

        const monthlyBillURL =this.state.billURL
        var params = {};
        monthlyBillURL.split('?')[1].split('&').forEach(function(i){
            params[i.split('=')[0]]=i.split('=')[1];
        });
        // const params = new URL(monthlyBillURL).searchParams;
        var monthIdx = params['month']-1
        monthIdx = monthIdx < 0 ? 0 : monthIdx > 11 ? 11 : monthIdx
        const monthName = monthNames[monthIdx];
        const year= params['year'];

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
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                mediaScannable: true,
                title: pdfName,
                path: `${dirToSave}/${pdfName}`,
            },
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
            this.spinner.stopActivity()
        })
        .catch((error)=>{
            this.spinner.stopActivity()
            alert("Unable to download bill for Month : "+monthName+" Year : "+year+". Please try again.")
        })

    }

    render(){

        const source = {uri:this.state.billURL,cache:true};

        return  <View style={{flex:1, backgroundColor:'#fff'}}>
                    <View style={{ flex: 1, maxHeight:64, justifyContent:'center', flexDirection:'row', backgroundColor:'#fff'}} >
                        
                        <View style={{ flex: 1,}} >
                            <NoticeHeader />
                        </View>

                    </View>
                    <View style={{ flex: 1, backgroundColor:'#fff'}} >
                        <View style={{height:44, flexDirection:'row', marginLeft:10, marginRight:10}}>
                            <TouchableOpacity onPress={()=>this.onPressBackButton()} style={{width:50, alignItems:'flex-start', justifyContent:'center'}}>
                                <Icon size={21} name="arrow-back-ios" color="rgb(206, 0, 57)" />
                            </TouchableOpacity>
                            <View style={{flex:1, maxHeight:40, margin:5, flexDirection:'row'}}>
                                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                    <Text style={{color:kThemeRedColor, fontWeight:'bold', fontSize:22}}> REPORT </Text>
                                </View>
                            </View>

                            <TouchableOpacity onPress={()=>this.onPressBillDownload()} style={{width:50, alignItems:'flex-end', justifyContent:'center'}}>
                                <Icon size={21} name="file-download" color="rgb(206, 0, 57)" />
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1}}>
                            <Pdf
                                source={source}
                                onLoadComplete={(numberOfPages,filePath)=>{
                                    this.spinner.stopActivity()
                                }}
                                onPageChanged={(page,numberOfPages)=>{
                                }}
                                onError={(error)=>{
                                    this.spinner.stopActivity()
                                }}
                                onPressLink={(uri)=>{
                                }}
                                style={styles.pdf}/>
                        </View>
                    </View>
                </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:'100%',
        height:'100%'
    }
});

function mapStateToProps(state) {
    return {
    };
  }
  
  function mapDispatchToProps(dispatch) { 
      return bindActionCreators(ActionCreators, dispatch); 
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(PDFViewer);
