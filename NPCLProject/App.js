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



const App = () => {
  return (
    <View style={{flex:1}}>
      
      <StatusBar barStyle="dark-content" />
    
      <SafeAreaView  style={{flex:1}}>
        <Route >
        </Route>
      </SafeAreaView>
    </View>
  );
};

export default App;
