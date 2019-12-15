import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import SignIn from './pages/SignIn';
import HelpOrder from './pages/HelpOrder';
import Checkin from './pages/Checkin/list';

export default (signedIn = false) => createAppContainer(
  createSwitchNavigator({
    Sign:createSwitchNavigator({
      SignIn
    }),
    App: createBottomTabNavigator({
      Checkin,
      HelpOrder
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
