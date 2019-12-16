import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import Checkin from './pages/Checkin/list';
import HelpOrderList from './pages/HelpOrder/list';
import HelpOrderDetail from './pages/HelpOrder/detail';
import HelpOrderNew from './pages/HelpOrder/new';

export default (signedIn = false) => createAppContainer(
  createSwitchNavigator({
    Sign:createSwitchNavigator({
      SignIn
    }),
    App: createBottomTabNavigator({
      Checkin:{
        screen: createStackNavigator(
          {
            Checkin,
          },{
            defaultNavigationOptions:{
             headerTintColor: '#ee4d64',
             headerLeftContainerStyle:{
               marginLeft: 20,
             },
            },
          }
        ),
        navigationOptions: {
          // tabBarVisible:false,
           tabBarLabel: 'Pedir ajuda',
           tabBarIcon: ({tintColor}) => (
             <Icon name="edit-location" size={20} color={tintColor} />
           ),
         },
      },
      HelpOrder: {
        screen: createStackNavigator(
          {
            HelpOrderList,
            HelpOrderDetail,
            HelpOrderNew,
          },{
            defaultNavigationOptions:{
             headerTintColor: '#ee4d64',
             headerLeftContainerStyle:{
               marginLeft: 20,
             },
            },
          }),
        navigationOptions: {
         // tabBarVisible:false,
          tabBarLabel: 'Pedir ajuda',
          tabBarIcon: ({tintColor}) => (
            <Icon name="live-help" size={20} color={tintColor} />
          ),
        },
      },
    },{
      tabBarOptions:{
       keyboardHidesTabBar:true,
       activeTintColor: '#ee4e62',
       inactiveTintColor: '#999999',
       style:{
        backgroundColor:'#FFF',
       },
      },
    }),
  },{
    initialRouteName: signedIn?'App':'Sign'
  }),
);
