
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/welcome'
import Login from '../screens/login'

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
            
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;