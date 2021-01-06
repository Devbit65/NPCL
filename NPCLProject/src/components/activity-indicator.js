import React, { Component } from 'react';
import {
   ActivityIndicator,
   View,
   StyleSheet,
   Dimensions,
   Text,
   TouchableOpacity
} from 'react-native';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var indicatorWidth = 125;//deviceWidth*3/4;
var indicatorHeight = 125;

let singletonObj = null;

const kThemeRedColor = 'rgb(206, 0, 57)'
const kThemeBlueColor = 'rgb(19,69,113)'

export default class AppSpinner extends Component {

   constructor(props) {
	  super(props);
	  
	  if(!singletonObj){
      singletonObj = this;
      this.state = {
        showActivityIndicator:false,
      }
      this.startActivity = this.startActivity.bind(this);
      this.stopActivity = this.stopActivity.bind(this);
      this.isActivityStarted = this.isActivityStarted.bind(this);

    }
    
    return singletonObj;
	}
  
  isActivityStarted(){
    return this.state.showActivityIndicator;
  }
  startActivity(){
    this.setState({showActivityIndicator:true})
  }


  stopActivity(){
    this.setState({showActivityIndicator:false})
    if(AppSpinner.reqCounter<=0){
        AppSpinner.reqCounter= 0
    }
  }

   render(){
   return (
    this.state.showActivityIndicator ?(
      <View style = {[styles.container,{width: deviceWidth, height:deviceHeight}]}>
          <View style ={[styles.topView, {width: deviceWidth, height:deviceHeight}]}  />

         {/* <View style = {styles.indicatorView}> */}
                <ActivityIndicator animating = {true}
                    style = {styles.activityIndicator} size = "large"
                    color = {kThemeRedColor}
                />
                {/* <Text style={{flex:1, color:'#FFF'}}>Fetching Data ...</Text> */}
          {/* </View>   */}
      </View>):null
  
  );
}  
}

const styles = StyleSheet.create ({
  container:{
    position: 'absolute',
      width: deviceWidth,
      height:deviceHeight,
      top: 0,
      left: 0,
      justifyContent: 'center',
      alignItems: 'center',
      
  },

   topView: {
     position: 'absolute',
      width: deviceWidth,
      height: deviceHeight,
      top: 0,
      left: 0,
      opacity:0.25,
      backgroundColor : 'black',
      flex:1,
   },
   activityIndicator: {
      flex: 2,
      justifyContent:'center',//'flex-end',
      alignItems: 'center',
      opacity:1,
   },

   indicatorTopView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#b2b2b2",
    opacity:1,
    width:300, 
    height:150
 },

   indicatorView: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'rgba(0,0,0,0.5)',
      borderRadius : 30,
      width:indicatorWidth,
      height:indicatorHeight,
      opacity:1,
   }
})