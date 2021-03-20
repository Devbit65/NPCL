/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component }  from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';

import UserData from './src/utilities/models/user-data'
import Route from './src/utilities/route'
import Spinner from './src/components/activity-indicator'
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import reducer from './src/redux/reducer';

import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);

const {height, width} = Dimensions.get('window'); 
const aspectRatio = height/width;
const isIphone = (aspectRatio>1.6 && Platform.OS === "ios")
let lIsIOSXCategory = (height>=812 && isIphone)




class AppRoute extends Component {

  componentDidMount(){

    this.registerPushNotificaiton()
  }

  registerPushNotificaiton() {
  
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        alert("PushNotification :: Token :: "+JSON.stringify(token))
        var userData = new UserData();
        const devToken = token?token.token:''
        userData.setDeviceToken(devToken)
      },
    
      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
    
        // process the notification
    
        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
    
      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
    
        // process the action
      },
    
      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function(err) {
        // alert("PushNotification :: ERRor :: ",JSON.stringify(err))
        alert("onRegistrationError "+JSON.stringify(err))
        console.error(err.message, err);
      },
    
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
    
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
    
      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          
          <StatusBar barStyle="dark-content" />
        
            <SafeAreaView  style={{flex: 1,marginBottom:lIsIOSXCategory ?-35:0}}>
              <Route >
              </Route>
              <Spinner />
            </SafeAreaView>
        </View>
      </Provider>
    )
  }
}
const App = () => {
  return (
    <AppRoute />
  );
};

export default App;
