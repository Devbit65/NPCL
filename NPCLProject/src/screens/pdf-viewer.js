
import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';

import NoticeHeader from "../components/notice-header";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Pdf from 'react-native-pdf';
import UserData from '../utilities/models/user-data'
import {fetchMonthlyBillURL} from '../utilities/webservices'
import Spinner from '../components/activity-indicator'

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../redux/action';

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class PDFViewer extends Component {

    constructor(props) {
        super(props);

        const { params } = this.props.route;
        var curDate = params["url"]
        var newDate = new Date(curDate)        
        this.state = {
            billURL : fetchMonthlyBillURL(newDate.getMonth()+1, newDate.getFullYear())
        }
        this.userData = new UserData().getUserData();
        this.spinner = new Spinner()
        this.spinner.startActivity()
    }
    onPressBackButton() {
        this.props.showPDFView(false)
        this.props.navigation.pop()
    }
    render(){

        const source = {uri:this.state.billURL,cache:true};

        return  <View style={{flex:1}}>
                    <View style={{ flex: 1, maxHeight:64, justifyContent:'center', flexDirection:'row', backgroundColor:'#fff'}} >
                        
                        <View style={{ flex: 1,}} >
                            <NoticeHeader />
                        </View>

                    </View>
                    <View style={{ flex: 1, backgroundColor:'#fff'}} >
                        <View style={{height:44, flexDirection:'row', marginLeft:10,}}>
                            <TouchableOpacity onPress={()=>this.onPressBackButton()} style={{width:25, alignItems:'center', justifyContent:'center'}}>
                                <Icon size={21} name="arrow-back-ios" color="rgb(206, 0, 57)" />
                            </TouchableOpacity>
                            <View style={{flex:1, maxHeight:40, margin:5, flexDirection:'row'}}>
                                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                    <Text style={{color:kThemeRedColor, fontWeight:'bold', fontSize:30}}> REPORT </Text>
                                </View>
                            </View>
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
