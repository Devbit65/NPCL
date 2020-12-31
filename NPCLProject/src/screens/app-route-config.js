
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
            <View style={{ flex: 1, flexDirection:'row', backgroundColor:'transparent'}} >

                <View style={{ flex: 1, backgroundColor:'transparent'}} >
                    <SideMenu navigateToNext={this.navigateToNext.bind(this)}/>
                </View>
                
                <View style={{ flex: 3, backgroundColor:'transparent'}} >
                
                    <AppRoute nextScreenIndex={this.state.menuIndex} >
                    </AppRoute>
                </View>     
            </View> 
        )
    }
}

export default AppRouteConfig;