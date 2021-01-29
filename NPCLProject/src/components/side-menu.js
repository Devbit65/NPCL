
import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity,
    Alert,
    Image,
    ScrollView,
    Dimensions
} from 'react-native';

import BottomNavigator from "../components/button-navigator";
import ConnectWithUs from "../components/connectwithus";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class SideMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedMenu : 1
        }
    }


    navigateToNext(menuIndex){

        if(menuIndex === 8) {
            Alert.alert(
                "Logout Confirmation!",
                "Are you sure want to logout?",
                [
                    {
                        text: "Cancel",
                        onPress: () => {
                            this.setState({
                                menuIndex:3
                            })
                        },
                        style: "cancel"
                    },
                    { 
                        text: "OK", 
                        onPress: () => {

                            this.setState({selectedMenu:menuIndex})
                            if(this.props.navigateToNext){
                                this.props.navigateToNext(menuIndex)
                            }
                        } 
                    }
                ],
                { cancelable: false }
            );
        }
        else{

            this.setState({selectedMenu:menuIndex})
            if(this.props.navigateToNext){
                this.props.navigateToNext(menuIndex)
            }
        }
        
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} > 
            <View style={{ flex:1, backgroundColor:'red'}} >
                
                <View style={{ flex: this.state.selectedMenu === 1?1.5:1,  backgroundColor:'#fff',  }} >
                    {this.state.selectedMenu === 1?(
                        <View style={{height:100, width:'100%', backgroundColor: kThemeBlueColor, flex:1,borderTopEndRadius:1000,  borderBottomEndRadius:1000, alignItems:'center', justifyContent:'center'}}>
                            <Image style={{width:50, height:50}} resizeMode='center' source={require("../resources/overview1.png")} />
                        </View>
                    ):( 
                        <TouchableOpacity style={{ height:75, flexDirection:'row', backgroundColor:'#fff'}} onPress={()=>{this.navigateToNext(1)}}>
                            
                            <View style={{ flex:1, alignItems:'center', justifyContent:'center', backgroundColor: kThemeBlueColor}} >
                                <Image style={{width:30, height:30}} resizeMode='center' source={require("../resources/overview.png")} />

                            </View>
                            <View style={{ flex:1,backgroundColor:'#fff',  }} >

                            </View>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={{ flex: this.state.selectedMenu === 2?1.5:1, backgroundColor:'#fff',  }} >
                    {this.state.selectedMenu === 2?(
                        <View style={{height:100, width:'100%', backgroundColor: kThemeBlueColor, flex:1,borderTopEndRadius:1000,  borderBottomEndRadius:1000, alignItems:'center', justifyContent:'center'}}>
                            <Image style={{width:50, height:50}} resizeMode='center' source={require("../resources/recharge1.png")} />
                        </View>
                    ):( 
                        <TouchableOpacity style={{ height:75, flexDirection:'row', backgroundColor:'#fff'}} onPress={()=>{this.navigateToNext(2)}}>
                            
                            <View 
                                style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor: kThemeBlueColor}} onLayout={(event)=>{
                                        this.props.updateHambugerMenuWidth ? this.props.updateHambugerMenuWidth(event.nativeEvent.layout.width):null
                                    }}  >
                                <Image style={{width:30, height:30}} resizeMode='center' source={require("../resources/recharge.png")} />

                            </View>
                            <View style={{ flex: 1,backgroundColor:'#fff',  }} >

                            </View>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={{ flex: this.state.selectedMenu === 3?1.5:1, backgroundColor:'#fff'}} >
                    {this.state.selectedMenu === 3?(
                        <View style={{height:100, width:'93%', backgroundColor: kThemeBlueColor, flex:1,borderTopEndRadius:150,  borderBottomEndRadius:150, alignItems:'center', justifyContent:'center'}}>
                            <Image style={{width:50, height:50}} resizeMode='center' source={require("../resources/report1.png")} />
                        </View>
                    ):( 
                        <TouchableOpacity style={{ height:75,  flexDirection:'row'}} onPress={()=>{this.navigateToNext(3)}}>
                            
                            <View style={{ flex:1, alignItems:'center', justifyContent:'center', backgroundColor: kThemeBlueColor}} >
                                <Image style={{width:30, height:30}} resizeMode='center' source={require("../resources/report.png")} />

                            </View>
                            <View style={{ flex:1,backgroundColor:'#fff'}} >

                            </View>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={{ flex: this.state.selectedMenu === 4?1.5:1, backgroundColor:'#fff'}} >
                    {this.state.selectedMenu === 4?(
                        <View style={{height:100, width:'93%', backgroundColor: kThemeBlueColor, flex:1,borderTopEndRadius:1000,  borderBottomEndRadius:1000, alignItems:'center', justifyContent:'center'}}>
                            <Image style={{width:50, height:50}} resizeMode='center' source={require("../resources/setting1.png")} />
                        </View>
                    ):( 
                        <TouchableOpacity style={{ height:75,  flexDirection:'row'}} onPress={()=>{this.navigateToNext(4)}}>
                            
                            <View style={{ flex:1, alignItems:'center', justifyContent:'center', backgroundColor: kThemeBlueColor}} >
                                <Image style={{width:30, height:30}} resizeMode='center' source={require("../resources/setting.png")} />

                            </View>
                            <View style={{ flex:1,backgroundColor:'#fff'}} >

                            </View>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={{ flex: this.state.selectedMenu === 5?1.5:1, backgroundColor:'#fff'}} >
                    {this.state.selectedMenu === 5?(
                        <View style={{height:100, width:'93%', backgroundColor: kThemeBlueColor, flex:1,borderTopEndRadius:1000,  borderBottomEndRadius:1000, alignItems:'center', justifyContent:'center'}}>
                            <View style={{width:50, height:50, borderRadius:50, backgroundColor:'#fff', alignItems:'center', justifyContent:'center'}}>
                                <Image style={{width:40, height:40}} resizeMode='center' source={require("../resources/icon.png")} />
                            </View>
                        </View>
                    ):( 
                        <TouchableOpacity style={{ height:75,  flexDirection:'row'}} onPress={()=>{this.navigateToNext(5)}}>
                            
                            <View style={{ flex:1, alignItems:'center', justifyContent:'center', backgroundColor: kThemeBlueColor}} >
                                <Image style={{width:30, height:30}} resizeMode='center' source={require("../resources/icon.png")} />

                            </View>
                            <View style={{ flex:1,backgroundColor:'#fff'}} >

                            </View>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={{ flex: this.state.selectedMenu === 6?1.5:1, backgroundColor:'#fff'}} >
                    {this.state.selectedMenu === 6?(
                        <View style={{height:100, width:'93%', backgroundColor: kThemeBlueColor, flex:1,borderTopEndRadius:1000,  borderBottomEndRadius:1000, alignItems:'center', justifyContent:'center'}}>
                            <Image style={{width:50, height:50}} resizeMode='center' source={require("../resources/notification1.png")} />
                        </View>
                    ):( 
                        <TouchableOpacity style={{ height:75,  flexDirection:'row'}} onPress={()=>{this.navigateToNext(6)}}>
                            
                            <View style={{ flex:1, alignItems:'center', justifyContent:'center', backgroundColor: kThemeBlueColor}} >
                                <Image style={{width:30, height:30}} resizeMode='center' source={require("../resources/notification.png")} />

                            </View>
                            <View style={{ flex:1,backgroundColor:'#fff'}} >

                            </View>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={{ flex: this.state.selectedMenu === 7?1.5:1, backgroundColor:'#fff'}} >
                    {this.state.selectedMenu === 7?(
                        <View style={{height:100, width:'93%', backgroundColor: kThemeBlueColor, flex:1,borderTopEndRadius:1000,  borderBottomEndRadius:1000, alignItems:'center', justifyContent:'center'}}>
                            <Image style={{width:50, height:50}} resizeMode='center' source={require("../resources/DG1.png")} />
                        </View>
                    ):( 
                        <TouchableOpacity style={{ height:75,  flexDirection:'row'}} onPress={()=>{this.navigateToNext(7)}}>
                            
                            <View style={{ flex:1, alignItems:'center', justifyContent:'center', backgroundColor: kThemeBlueColor}} >
                                <Image style={{width:30, height:30}} resizeMode='center' source={require("../resources/DG.png")} />

                            </View>
                            <View style={{ flex:1,backgroundColor:'#fff'}} >

                            </View>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={{ flex: 1, backgroundColor:'#fff'}} >
                    <TouchableOpacity style={{ height:75, flexDirection:'row'}} onPress={()=>{this.navigateToNext(8)}}>
                            
                        <View style={{ flex:1, alignItems:'center', justifyContent:'center', backgroundColor: kThemeBlueColor}} >
                            <Icon size={40} name="dots-vertical" color="#fff" />

                        </View>
                        <View style={{ flex:1,backgroundColor:'#fff'}} >

                        </View>
                    </TouchableOpacity>

                </View>
                
            </View>
            </ScrollView>
        )
    }
}

export default SideMenu;