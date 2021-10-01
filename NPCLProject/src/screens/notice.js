import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';

import {fethchNotice} from '../utilities/webservices'
import Spinner from '../components/activity-indicator'
import { INITIATE_REFRESH } from '../redux/constants';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../redux/action';

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class Notice extends Component {

    constructor(props) {
        super(props)
        this.spinner = new Spinner()
        this.state = {
            logDate : [],
            dataNotFound : "Loading notice..."
        }
    }

    componentDidMount(){
        this.fetchNotice()
    }

    fetchNotice() {

        this.spinner.startActivity();
        this.setState({
            dataNotFound: "Loading notice..."
        }) 
        
        if(!this.spinner.isNetConnected()){
            alert("Please check you internet connection.")
            this.spinner.stopActivity()
            return;
        }

        fethchNotice()
        .then(response=>{

            if(response.resource) {
                this.setState({
                    logDate:response.resources
                })
            }
            else {
                this.setState({
                    dataNotFound:"No Notice Found."
                })   
            }
            this.spinner.stopActivity();
        })
    }

    componentDidUpdate() {

        if(this.props.data) {
            switch (this.props.data.type) {
                case INITIATE_REFRESH:
                    this.fetchNotice()
                    this.props.onRefreshInitiated()
                    break;
            
                default:
                    break;
            }
        }
    }

    render() {
        return  <View style={{flex:1, backgroundColor:'#fff'}}>
                    
                    <View style={{height:50, margin:5, flexDirection:'row'}}>
                        <View style={{flex:1, margin:5, alignItems:'flex-start', justifyContent:'center'}}>
                            <Text style={{color:kThemeRedColor, fontWeight:'bold', fontSize:22}}> NOTICE </Text>
                        </View>
                        <TouchableOpacity style={{ width:40, height:40, marginRight:10, alignItems:'center', justifyContent:'center'}} onPress={()=>this.fetchNotice()}>
                            <Image style={{width:25, height:25, resizeMode:'stretch'}} source={require("../resources/Refresh_icon.png")}></Image>
                        </TouchableOpacity>
                    </View>
                    
                    {this.state.logDate && this.state.logDate.length > 0 ? <FlatList
                        data={this.state.logDate}
                        renderItem={({ item, index, separators })=>{
                            return  <View key={index} style={{flex:1, height:60, marginLeft:10, marginRight:10, alignItems:'center', justifyContent:'center'}}>
                                        
                                        <View style={{flex:1, margin:5, borderRadius:5, backgroundColor:'rgb(242,242,242)', borderWidth:1, borderColor:"gray", flexDirection:'row'}}>

                                            <View style={{flex:1, paddingLeft:20, justifyContent:'center'}}>
                                                <Image style={{width:25, height:25, resizeMode:'contain'}} source={require("../resources/alram.png")}></Image>
                                            </View>
                                            
                                            <View style={{flex:3,  justifyContent:'center'}}>
                                            
                                                <Text style={{fontSize:8, textAlign:'justify',}}>{item.message}</Text>
                                            </View>
                                            <View style={{flex:1, paddingLeft:20, alignItems:'center', justifyContent:'center'}}>
                                                
                                                {item.isNew && <TouchableOpacity onPress={()=>this.onClickGetStarted()} style={{width:30, height:20,alignItems:'center', justifyContent:'center', backgroundColor:'red', borderRadius:5}}>
                                                    <Text style={{color:'#FFF', fontSize:10, fontWeight:'bold'}}>New</Text>
                                                </TouchableOpacity>}
                                            </View>
                                        </View>
                                    </View>
                        }}
                    />:<View style={{flex:1, alignItems:'center', justifyContent:'flex-start', marginTop:150}}>
                            <Text style={{ fontWeight:'bold'}}>{this.state.dataNotFound}</Text>
                        </View>
                    }

                    
                </View>
    }
}

function mapStateToProps(state) {
    return {
        data : state.appReducer.data
    };
  }
  
  function mapDispatchToProps(dispatch) { 
      return bindActionCreators(ActionCreators, dispatch); 
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Notice);