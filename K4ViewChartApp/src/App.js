import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { HomeScreen, BasicChartScreen, DropdownChartScreen } from './components/screens'

// StackNavigator(config) functions; Returns react Component(s).
const MainStack = StackNavigator({    
    // Screens
    Home: {
       screen: HomeScreen,
      },
    Basic:{
       screen: BasicChartScreen,
      },
    Drop: {
       screen: DropdownChartScreen,
      },  
    },  // Configuration.
    {
      initialRouteName: 'Home',
      // Header style config from Home is now here.
      navigationOptions: {}
    }
  );

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








