
import React, { Component } from 'react';
import {
    Text, 
    View,
    TouchableOpacity,
    TextInput,
    Image
} from 'react-native';

import BottomNavigator from "../components/button-navigator";
import ConnectWithUs from "../components/connectwithus";
import Icon from 'react-native-vector-icons/Fontisto';

class SideMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedMenu : 1
        }
    }


    navigateToNext(menuIndex){

        this.setState({selectedMenu:menuIndex})
        if(this.props.navigateToNext){
            this.props.navigateToNext(menuIndex)
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor:'transparent'}} >

                <View style={{ flex: 1, justifyContent:'center', flexDirection:'row'}} >
                
                <View style={{ flex: 3, alignItems:'center', justifyContent:'center', backgroundColor: '#134571'}} >
                    <Image style={{width:30, height:30}} resizeMode='center' source={require("../resources/overview.png")} />

                </View>
                <View style={{ flex: 2,}} >

                </View>
                </View>
                <View style={{ flex: 1, backgroundColor:'transparent'}} >
                    {this.state.selectedMenu === 1?(
                        <View style={{backgroundColor: '#134571', flex:1, borderTopRightRadius: 1000, borderBottomRightRadius:1000, alignItems:'center', justifyContent:'center'}}>
                            <Image style={{width:60, height:60}} resizeMode='center' source={require("../resources/overview1.png")} />
                        </View>
                    ):( 
                        <TouchableOpacity style={{ flex: 1, flexDirection:'row'}} onPress={()=>{this.navigateToNext(1)}}>
                            
                            <View style={{ flex: 3, alignItems:'center', justifyContent:'center', backgroundColor: '#134571'}} >
                                <Image style={{width:30, height:30}} resizeMode='center' source={require("../resources/overview.png")} />

                            </View>
                            <View style={{ flex: 2,}} >

                            </View>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={{ flex: 1, backgroundColor:'transparent'}} >
                    {this.state.selectedMenu === 2?(
                        <View style={{backgroundColor: '#134571', flex:1, borderTopRightRadius: 1000, borderBottomRightRadius:1000, alignItems:'center', justifyContent:'center'}}>
                            <Image style={{width:60, height:60}} resizeMode='center' source={require("../resources/recharge1.png")} />
                        </View>
                    ):( 
                        <TouchableOpacity style={{ flex: 1, flexDirection:'row'}} onPress={()=>{this.navigateToNext(2)}}>
                            
                            <View style={{ flex: 3, alignItems:'center', justifyContent:'center', backgroundColor: '#134571'}} >
                                <Image style={{width:30, height:30}} resizeMode='center' source={require("../resources/recharge.png")} />

                            </View>
                            <View style={{ flex: 2,}} >

                            </View>
                        </TouchableOpacity>
                    )}
                </View><View style={{ flex: 1, backgroundColor:'transparent'}} >
                    {this.state.selectedMenu === 3?(
                        <View style={{backgroundColor: '#134571', flex:1, borderTopRightRadius: 1000, borderBottomRightRadius:1000, alignItems:'center', justifyContent:'center'}}>
                            <Image style={{width:60, height:60}} resizeMode='center' source={require("../resources/report1.png")} />
                        </View>
                    ):( 
                        <TouchableOpacity style={{ flex: 1, flexDirection:'row'}} onPress={()=>{this.navigateToNext(3)}}>
                            
                            <View style={{ flex: 3, alignItems:'center', justifyContent:'center', backgroundColor: '#134571'}} >
                                <Image style={{width:30, height:30}} resizeMode='center' source={require("../resources/report.png")} />

                            </View>
                            <View style={{ flex: 2,}} >

                            </View>
                        </TouchableOpacity>
                    )}
                </View><View style={{ flex: 1, backgroundColor:'transparent'}} >
                    {this.state.selectedMenu === 4?(
                        <View style={{backgroundColor: '#134571', flex:1, borderTopRightRadius: 1000, borderBottomRightRadius:1000, alignItems:'center', justifyContent:'center'}}>
                            <Image style={{width:60, height:60}} resizeMode='center' source={require("../resources/setting1.png")} />
                        </View>
                    ):( 
                        <TouchableOpacity style={{ flex: 1, flexDirection:'row'}} onPress={()=>{this.navigateToNext(4)}}>
                            
                            <View style={{ flex: 3, alignItems:'center', justifyContent:'center', backgroundColor: '#134571'}} >
                                <Image style={{width:30, height:30}} resizeMode='center' source={require("../resources/setting.png")} />

                            </View>
                            <View style={{ flex: 2,}} >

                            </View>
                        </TouchableOpacity>
                    )}
                </View><View style={{ flex: 1, backgroundColor:'transparent'}} >
                    {this.state.selectedMenu === 5?(
                        <View style={{backgroundColor: '#134571', flex:1, borderTopRightRadius: 1000, borderBottomRightRadius:1000, alignItems:'center', justifyContent:'center'}}>
                            <View style={{width:60, height:60, borderRadius:60, backgroundColor:'#fff', alignItems:'center', justifyContent:'center'}}>
                                <Image style={{width:50, height:50}} resizeMode='center' source={require("../resources/icon.png")} />
                            </View>
                        </View>
                    ):( 
                        <TouchableOpacity style={{ flex: 1, flexDirection:'row'}} onPress={()=>{this.navigateToNext(5)}}>
                            
                            <View style={{ flex: 3, alignItems:'center', justifyContent:'center', backgroundColor: '#134571'}} >
                                <Image style={{width:30, height:30}} resizeMode='center' source={require("../resources/icon.png")} />

                            </View>
                            <View style={{ flex: 2,}} >

                            </View>
                        </TouchableOpacity>
                    )}
                </View><View style={{ flex: 1, backgroundColor:'transparent'}} >
                    {this.state.selectedMenu === 6?(
                        <View style={{backgroundColor: '#134571', flex:1, borderTopRightRadius: 1000, borderBottomRightRadius:1000, alignItems:'center', justifyContent:'center'}}>
                            <Image style={{width:60, height:60}} resizeMode='center' source={require("../resources/notification1.png")} />
                        </View>
                    ):( 
                        <TouchableOpacity style={{ flex: 1, flexDirection:'row'}} onPress={()=>{this.navigateToNext(6)}}>
                            
                            <View style={{ flex: 3, alignItems:'center', justifyContent:'center', backgroundColor: '#134571'}} >
                                <Image style={{width:30, height:30}} resizeMode='center' source={require("../resources/notification.png")} />

                            </View>
                            <View style={{ flex: 2,}} >

                            </View>
                        </TouchableOpacity>
                    )}
                </View><View style={{ flex: 1, backgroundColor:'transparent'}} >
                    {this.state.selectedMenu === 7?(
                        <View style={{backgroundColor: '#134571', flex:1, borderTopRightRadius: 1000, borderBottomRightRadius:1000, alignItems:'center', justifyContent:'center'}}>
                            <Image style={{width:60, height:60}} resizeMode='center' source={require("../resources/DG1.png")} />
                        </View>
                    ):( 
                        <TouchableOpacity style={{ flex: 1, flexDirection:'row'}} onPress={()=>{this.navigateToNext(7)}}>
                            
                            <View style={{ flex: 3, alignItems:'center', justifyContent:'center', backgroundColor: '#134571'}} >
                                <Image style={{width:30, height:30}} resizeMode='center' source={require("../resources/DG.png")} />

                            </View>
                            <View style={{ flex: 2,}} >

                            </View>
                        </TouchableOpacity>
                    )}
                </View><View style={{ flex: 1, backgroundColor:'transparent'}} >
                    {this.state.selectedMenu === 8?(
                        <View style={{backgroundColor: '#134571', flex:1, borderTopRightRadius: 1000, borderBottomRightRadius:1000, alignItems:'center', justifyContent:'center'}}>
                            <Image style={{width:60, height:60}} resizeMode='center' source={require("../resources/overview1.png")} />
                        </View>
                    ):( 
                        <TouchableOpacity style={{ flex: 1, flexDirection:'row'}} >
                            
                            <View style={{ flex: 3, alignItems:'center', justifyContent:'center', backgroundColor: '#134571'}} >
                                <Image style={{width:30, height:30}} resizeMode='center' source={require("../resources/overview.png")} />

                            </View>
                            <View style={{ flex: 2,}} >

                            </View>
                        </TouchableOpacity>
                    )}
                </View>
                
            </View>
        )
    }
}

export default SideMenu;