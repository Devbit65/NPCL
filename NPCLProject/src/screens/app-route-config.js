
import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ImageBackground
} from 'react-native';

import SideMenu from "../components/side-menu";
import AppRoute from "../utilities/app-route"
import NoticeHeader from "../components/notice-header";
import UserData from '../utilities/models/user-data'
import Icon from 'react-native-vector-icons/Entypo';

class AppRouteConfig extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            menuIndex : 1
        }
    }
    navigateToNext(menuIndex){
        if(menuIndex === 8){
            var userData = new UserData()
            userData.setUserData(null)
            this.props.navigation.navigate("Login")
        }
        else{

            this.setState({
                menuIndex
            })
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor:'#fff'}} >

                <View style={{ flex: 1, maxHeight:64, justifyContent:'center', flexDirection:'row', backgroundColor:'#fff'}} >
                
                    <View style={{ width:50, alignItems:'center', justifyContent:'center', backgroundColor: '#134571'}} >
                        <Icon size={30} name="menu" color="#fff" />

                    </View>
                    <View style={{ flex: 1,}} >
                        <NoticeHeader />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection:'row', backgroundColor:'#fff'}} >
                    <View style={{ flex: 1, width:100, backgroundColor:'#fff'}} >
                        <SideMenu navigateToNext={this.navigateToNext.bind(this)}/>
                    </View>
                    
                    <View style={{ flex: 3, backgroundColor:'#fff'}} >
                    
                        <AppRoute nextScreenIndex={this.state.menuIndex} >
                        </AppRoute>
                    </View>  
                </View>   
            </View> 
        )
    }
}

export default AppRouteConfig;