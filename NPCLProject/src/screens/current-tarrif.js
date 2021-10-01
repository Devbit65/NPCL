

import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from 'react-native';

import Spinner from '../components/activity-indicator'
import {fetchCurrentApplicableRates} from '../utilities/webservices'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { INITIATE_REFRESH } from '../redux/constants';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../redux/action';

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class CurrentTarrif extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tarifData : null,
            dataNotFound:'Data Loading...'
        }

        this.spinner = new Spinner()
        this.fetchCurrentApplicableRates()
    }

    fetchCurrentApplicableRates() {
        
        this.spinner.startActivity()
        
        if(!this.spinner.isNetConnected()){
            alert("Please check you internet connection.")
            this.spinner.stopActivity()
            return;
        }
        
        fetchCurrentApplicableRates()
        .then(response=>{
            this.spinner.stopActivity();
            if(response.resource) {
                for(var i=0; i<response.resource.length; i++){
                    response.resource[i].id = i.toString()
                }
                this.setState({
                    tarifData : response.resource
                })
            }
            else{
                this.setState({
                    dataNotFound:'Data not found'
                })
            }
        })
    }

    onFinishLoading() {
        this.spinner.stopActivity()
    }

    onPressBackButton() {
        this.props.navigation.pop()
    }

    componentDidUpdate() {

        if(this.props.data) {
            switch (this.props.data.type) {
                case INITIATE_REFRESH:
                    this.fetchCurrentApplicableRates()
                    this.props.onRefreshInitiated()
                    break;
            
                default:
                    break;
            }
        }
    }

    render() {
        return  <View style={{flex:1}}>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>this.onPressBackButton()} style={{width:25, alignItems:'center', justifyContent:'center'}}>
                            <Icon size={16} name="arrow-back-ios" color="rgb(206, 0, 57)" />
                        </TouchableOpacity>
                        <View style={{margin:5, alignItems:'flex-start', justifyContent:'center'}}>
                            <Text style={{color:kThemeRedColor, fontWeight:'bold', fontSize:22}}> CURRENT TARRIF </Text>
                        </View>
                    </View>
                    <View style={[{ borderWidth:1, borderColor:kThemeBlueColor, margin:5, borderRadius:5, padding:5},style.cardShadow]}>

                        {this.state.tarifData ? <FlatList
                            data={this.state.tarifData}
                            scrollEnabled = {false}
                            renderItem={({ item, index, separators })=>{
                                return  <View style={{ margin:5, borderRadius:5, padding:5}} >
                                            <View style={{flex:1, alignItems:'center',  justifyContent:'center', flexDirection:'row'}}>
                                                <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                                                    <Text style={{ fontSize:12, fontWeight:'bold'}}>{item.heading} :</Text>
                                                </View>
                                                <View style={{flex:1, flexDirection:'row',alignItems:'center', marginLeft:5}}>
                                                    <Text style={{ fontSize:12, color:kThemeBlueColor}}>{item.content}</Text>
                                                </View>
                                                
                                            </View>
                                            
                                        </View>
                            }}
                        />: <View style={{ alignItems:'center', justifyContent:'center'}}>
                                <Text style={{ fontSize:12, fontWeight:'bold'}}>{this.state.dataNotFound}</Text>
                            </View>}

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
        data : state.appReducer.data
    };
  }
  
  function mapDispatchToProps(dispatch) { 
      return bindActionCreators(ActionCreators, dispatch); 
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(CurrentTarrif);