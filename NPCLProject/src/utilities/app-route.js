
import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Report from '../screens/report'
import Recharge from '../screens/recharge'
import Overview from "../screens/overview";
import EventLogging from "../screens/event-logging";
import Notice from "../screens/notice";
import Profile from "../screens/profile";
import Settings from "../screens/settings";


const Stack = createStackNavigator();

class AppRoute extends Component {

    render(){

        return (
            <NavigationContainer independent={true}>
                <Stack.Navigator>
                    {this.props.nextScreenIndex === 1 && <Stack.Screen
                        name="Overview"
                        component={Overview}
                        options={{ title: 'Overview',headerShown: false }}
                    />}

                    {this.props.nextScreenIndex === 2 && <Stack.Screen
                        name="Recharge"
                        component={Recharge}
                        options={{ title: 'Recharge',headerShown: false }}
                    />}
                    
                    {this.props.nextScreenIndex === 3 && <Stack.Screen
                        name="Report"
                        component={Report}
                        options={{ title: 'Report',headerShown: false }}
                    />}

                    {this.props.nextScreenIndex === 4 && <Stack.Screen
                        name="Settings"
                        component={Settings}
                        options={{ title: 'Settings',headerShown: false }}
                    />}

                    {this.props.nextScreenIndex === 5 && <Stack.Screen
                        name="Profile"
                        component={Profile}
                        options={{ title: 'Profile',headerShown: false }}
                    />}

                    {this.props.nextScreenIndex === 6 && <Stack.Screen
                      name="Notice"
                      component={Notice}
                      options={{ title: 'Notice',headerShown: false }}
                    />}
        
                    {this.props.nextScreenIndex === 7 && <Stack.Screen
                      name="EventLogging"
                      component={EventLogging}
                      options={{ title: 'EventLogging',headerShown: false }}
                    />}
                                
                    </Stack.Navigator>
            </NavigationContainer>
          );
    }
}

export default AppRoute;