import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { HomeScreen } from './components/screens'
// StackNavigator(config) functions; Returns react Component(s).
const MainStack = StackNavigator({    
  
      Home: { screen: HomeScreen, },
      
      });
// RootStack contains MainStack, rendered by App component.
const RootStack = StackNavigator({    
  
      Main: { screen: MainStack, },
      },{
        mode: 'modal',
        headerMode: 'none',
      });
// App component.
export default class App extends Component {
  // Render method.
  render() {
    return (
      <RootStack />
    );
  }
};








