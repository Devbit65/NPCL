/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
} from 'react-native';

import Route from './src/utilities/route'
import Spinner from './src/components/activity-indicator'



const App = () => {
  return (
    <View style={{flex:1}}>
      
      <StatusBar barStyle="dark-content" />
    
      <SafeAreaView  style={{flex:1}}>
        <Route >
        </Route>
        <Spinner />
      </SafeAreaView>
    </View>
  );
};

export default App;
