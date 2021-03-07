
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
import ReportChart from "../screens/report-chart";
import CurrentTarrif from "../screens/current-tarrif";
import PasswordReset from "../screens/password-reset";
import EVCD from "../screens/evcd";


const Stack = createStackNavigator();

class AppRoute extends Component {

    render(){

        return (
            <NavigationContainer independent={true}>
                <Stack.Navigator>
                    {this.props.nextScreenTitle === "OVERVIEW" && <Stack.Screen
                        name="Overview"
                        component={Overview}
                        options={{ title: 'Overview',headerShown: false }}
                    />}

                    {this.props.nextScreenTitle === "EVCD" && <Stack.Screen
                        name="EVCD"
                        component={EVCD}
                        options={{ title: 'EVCD',headerShown: false }}
                    />}
                    {this.props.nextScreenTitle === "RECHARGE" && <Stack.Screen
                        name="Recharge"
                        component={Recharge}
                        options={{ title: 'Recharge',headerShown: false }}
                    />}
                    
                    {this.props.nextScreenTitle === "REPORT" && <Stack.Screen
                        name="Report"
                        component={Report}
                        options={{ title: 'Report',headerShown: false }}
                    />}

                    {this.props.nextScreenTitle === "REPORT" && <Stack.Screen
                      name="ReportChart"
                      component={ReportChart}
                      options={{ title: 'ReportChart',headerShown: false }}
                    />}

                    {this.props.nextScreenTitle === "REPORT" && <Stack.Screen
                      name="CurrentTarrif"
                      component={CurrentTarrif}
                      options={{ title: 'CurrentTarrif',headerShown: false }}
                    />}

                    {this.props.nextScreenTitle === "SETTINGS" && <Stack.Screen
                        name="Settings"
                        component={Settings}
                        options={{ title: 'Settings',headerShown: false }}
                    />}

                    {this.props.nextScreenTitle === "PROFILE" && <Stack.Screen
                        name="Profile"
                        component={Profile}
                        options={{ title: 'Profile',headerShown: false }}
                    />}

                    {this.props.nextScreenTitle === "Profile" && <Stack.Screen
                        name="PasswordReset"
                        component={PasswordReset}
                        options={{ title: 'Change Password', headerShown: false }}
                    />}

                    {this.props.nextScreenTitle === "NOTICE" && <Stack.Screen
                      name="Notice"
                      component={Notice}
                      options={{ title: 'Notice',headerShown: false }}
                    />}
        
                    {this.props.nextScreenTitle === "EVENT-LOG" && <Stack.Screen
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