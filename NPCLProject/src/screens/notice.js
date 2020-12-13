import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';

import NoticeHeader from "../components/notice-header";

import * as Utilities from "../utilities/utilities-methods";


class Notice extends Component {

    constructor(props) {
        super(props)
        this.state = {
            logDate : [
                {
                    "message":"LEOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. LABORE ET DOLORE MAGNA ALIQUA.",
                    "isNew":true
                },
                {
                    "message":"LEOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. LABORE ET DOLORE MAGNA ALIQUA.",
                    "isNew":true
                },
                {
                    "message":"LEOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. LABORE ET DOLORE MAGNA ALIQUA.",
                    "isNew":false
                },
                {
                    "message":"LEOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. LABORE ET DOLORE MAGNA ALIQUA.",
                    "isNew":false
                },
                {
                    "message":"LEOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. LABORE ET DOLORE MAGNA ALIQUA.",
                    "isNew":false
                },
            ]
        }
    }

    render() {
        return  <View style={{flex:1, backgroundColor:'#fff'}}>
                    <NoticeHeader />
                    
                    <View style={{margin:5, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{color:'#F00', fontWeight:'bold', fontSize:30}}> NOTICE </Text>
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

export default Notice;