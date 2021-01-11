
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/welcome'
import Login from '../screens/login'
import AppRouteConfig from "../screens/app-route-config";
import ConnectUs from "../screens/connect-us";

const Stack = createStackNavigator();

const Route = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{ headerShown: false }}
          />
          
          <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ title: 'Welcome',headerShown: false }}
          />

          <Stack.Screen
              name="AppRouteConfig"
              component={AppRouteConfig}
              options={{ title: 'AppRouteConfig',headerShown: false }}
          />

          <Stack.Screen
              name="ConnectUs"
              component={ConnectUs}
              options={{ title: 'ConnectUs'}}
          />
            
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;