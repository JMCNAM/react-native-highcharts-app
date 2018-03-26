import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { HomeScreen } from './components/screens'
// StackNavigator(config) functions; Returns react Component(s).
const MainStack = StackNavigator({    Home: { screen: HomeScreen, },});
const RootStack = StackNavigator({    Main: { screen: MainStack, },
  },{
    mode: 'modal',
    headerMode: 'none',
  });

export default class App extends Component {
  
  render() {
    return (
      <RootStack />
    );
  }
}
;








