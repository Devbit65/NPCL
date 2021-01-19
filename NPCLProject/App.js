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
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import reducer from './src/redux/reducer';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);


const App = () => {
  return (
    <Provider store={store}>
      <View style={{flex:1}}>
        
        <StatusBar barStyle="dark-content" />
      
        <SafeAreaView  style={{flex:1}}>
          <Route >
          </Route>
          <Spinner />
        </SafeAreaView>
      </View>
    </Provider>
  );
};

export default App;
