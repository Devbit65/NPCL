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
            logDate : []
        }
    }

    componentDidMount(){
        this.fetchNotice()
    }

    fetchNotice() {

        this.spinner.startActivity();
        fethchNotice()
        .then(response=>{

            this.setState({
                logDate:response.resources
            })
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
                    
                    <View style={{margin:5, alignItems:'flex-start', justifyContent:'center'}}>
                        <Text style={{color:kThemeRedColor, fontWeight:'bold', fontSize:30}}> NOTICE </Text>
                    </View>
                    
                    <FlatList
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
                    />

                    
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