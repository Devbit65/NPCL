
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/welcome'
import Login from '../screens/login'
import AppRouteConfig from "../screens/app-route-config";
import ConnectUs from "../screens/connect-us";
import PasswordReset from "../screens/password-reset";
import PDFViewer from "../screens/pdf-viewer";
import Payment from "../screens/payment";

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

          <Stack.Screen
              name="PasswordReset"
              component={PasswordReset}
              options={{ title: 'Forgot Password'}}
          />

          <Stack.Screen
              name="PDFViewer"
              component={PDFViewer}
              options={{ title: 'PDFViewer', headerShown: false }}
          />

          <Stack.Screen
              name="Payment"
              component={Payment}
              options={{ title: 'Payment', headerShown: false }}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;