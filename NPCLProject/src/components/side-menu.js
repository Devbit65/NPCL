
import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Alert,
    Image,
    ScrollView,
    FlatList
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {getSideMenu} from '../utilities/utilities-methods'

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

class SideMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedMenu : 0,
            height:100
        }

        this.sideMenu = getSideMenu()
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
                this.props.navigateToNext(menuIndex+1)
            }
        }
        
    }

    render() {
        return (
            <View style={{ flex:1}} onLayout={(event)=>{
                var height  = (event.nativeEvent.layout.height-50)/(this.sideMenu.length+1)
                height = height < 60 ? 60 : height
                
                this.setState({
                    height : height
                })
            }} >
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{flex:1}} > 
                    <FlatList
                        data={this.sideMenu}
                        renderItem={({ item, index, separators })=>{
                            return  <View style={{ height: this.state.selectedMenu === index?this.state.height+50 : this.state.height,  backgroundColor:'#fff',  }} >
                            {this.state.selectedMenu === index?(
                                <View style={{flex:1, backgroundColor: kThemeBlueColor, flex:1,borderTopEndRadius:1000,  borderBottomEndRadius:1000, alignItems:'center', justifyContent:'center'}}>
                                    <Image style={{width:"75%", height:"75%"}} resizeMode='contain' source={item.selImage} />
                                </View>
                            ):( 
                                <TouchableOpacity style={{ flex:1, flexDirection:'row', backgroundColor:'#fff'}} onPress={()=>{this.navigateToNext(index)}}>
                                    
                                    <View style={{ flex:1, alignItems:'center', justifyContent:'center', backgroundColor: kThemeBlueColor}} onLayout={(event)=>{
                                        this.props.updateHambugerMenuWidth ? this.props.updateHambugerMenuWidth(event.nativeEvent.layout.width):null
                                    }} >
                                        <Image style={{width:30, height:30}} resizeMode='contain' source={item.image} />
        
                                    </View>
                                    <View style={{ flex:1,backgroundColor:'#fff',  }} >
        
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>
                        }}
                    />
                
                    <View style={{ height: this.state.height}} >
                        <TouchableOpacity style={{ flex:1, maxHeight:this.state.height,flexDirection:'row'}} onPress={()=>{this.navigateToNext(8)}}>
                                
                            <View style={{ flex:1, alignItems:'center', justifyContent:'center', backgroundColor: kThemeBlueColor}} >
                                <Icon size={40} name="dots-vertical" color="#fff" />

                            </View>
                            <View style={{ flex:1,backgroundColor:'#fff'}} >

                            </View>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>
            
        )
    }
}

export default SideMenu;