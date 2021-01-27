
import React, { Component } from 'react';
import {
    View,
    ScrollView,
    RefreshControl,
    TouchableOpacity
} from 'react-native';

import SideMenu from "../components/side-menu";
import AppRoute from "../utilities/app-route"
import NoticeHeader from "../components/notice-header";
import UserData from '../utilities/models/user-data'
import Icon from 'react-native-vector-icons/Entypo';
import * as Keychain from 'react-native-keychain';
import { SHOW_PDF_VIEW, SHOW_PAYMENT_VIEW } from '../redux/constants';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../redux/action';

class AppRouteConfig extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            menuIndex : 1,
            refreshing:false,
            willShowSideMenu:true
        }
    }
    navigateToNext(menuIndex){
        if(menuIndex === 8){
            this.logoutApp()
        }
        else{

            this.setState({
                menuIndex
            })
        }
    }

    async logoutApp() {

        try {
            const credentials = await Keychain.resetGenericPassword();
            var userData = new UserData()
            userData.setUserData(null)
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }]
              })
                
        } catch (error) {
        }
        
    }
    componentDidUpdate() {

        if(this.props.data) {
            switch (this.props.data.type) {
                case SHOW_PDF_VIEW:
                    
                    if(this.props.data.willShowPdfView) {
                        this.props.navigation.navigate("PDFViewer", {'pdfURL':this.props.data.pdfURL})
                    }
                    break;
                
                case SHOW_PAYMENT_VIEW:
                
                    if(this.props.data.willShowPaymentView) {
                        this.props.navigation.navigate("Payment", {'paymentMethod':this.props.data.paymentMethod})
                    }
                    break;
            
                default:
                    break;
            }
        }
    }

    onRefreshing() {

        this.setState({
          refreshing:false
        },()=>this.props.inInitiateRefresh())
        
      }

    onPressHamburgerMenu() {
        this.setState({
            willShowSideMenu:!this.state.willShowSideMenu
        })
    }
    render() {
        return (
            <ScrollView
            contentContainerStyle={{flex:1}}
            refreshControl={
              <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefreshing.bind(this)} />
            }
          >
            <View style={{ flex: 1, backgroundColor:'#fff'}} >

                <View style={{ flex: 1, maxHeight:64, justifyContent:'center', flexDirection:'row', backgroundColor:'#fff'}} >
                
                    {this.state.willShowSideMenu && <View style={{ width:50, alignItems:'center', justifyContent:'center', backgroundColor: '#134571'}} >
                        <TouchableOpacity style={{flex:1, alignItems:'center', justifyContent:'center', position:'absolute'}} onPress={()=>this.onPressHamburgerMenu()}>
                            <Icon size={30} name="menu" color="#fff" />
                        </TouchableOpacity>

                    </View>} 
                    <View style={{ flex: 1,}} >
                     
                        <NoticeHeader />
                        {!this.state.willShowSideMenu &&<View style={{ width:50,  position:'absolute'}} >
                            <TouchableOpacity style={{flex:1, alignItems:'center', justifyContent:'center'}} onPress={()=>this.onPressHamburgerMenu()}>
                                <Icon size={30} name="menu" color="#134571" />
                            </TouchableOpacity>

                        </View>}
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection:'row', backgroundColor:'#fff'}} >
                    <View style={{ flex: 1, maxWidth:this.state.willShowSideMenu? 100 : 0, backgroundColor:'#fff'}} >
                        <SideMenu navigateToNext={this.navigateToNext.bind(this)}/>
                    </View>
                    
                    <View style={{ flex: 3, backgroundColor:'#fff'}} >
                    
                        <AppRoute nextScreenIndex={this.state.menuIndex} >
                        </AppRoute>
                    </View>  
                </View>   
            </View> 
            </ScrollView>
        )
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
  
export default connect(mapStateToProps, mapDispatchToProps)(AppRouteConfig);
