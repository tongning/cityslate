import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import MapScreen from '../screens/MapScreen';
import QuestionScreen from '../screens/QuestionScreen';

const QuestionStack = createStackNavigator({
  Questions: QuestionScreen,
});


QuestionStack.navigationOptions = {
  tabBarVisible:true,
};


export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main:MainTabNavigator,
  Question: QuestionStack,
  
}));