import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Header, Card, CardSection, DropOption } from './components/common';
import Counter from './components/Counter';
import LifeCycles from './components/LifeCycles';
// Chart components
import TestChart from './components/charts/TestChart';
import AreaChart from './components/charts/AreaChart';
import DataChart from './components/charts/DataChart';
import BarChart from './components/charts/BarChart';
// Screen components.
import ChartScreen from './components/ChartScreen';
import BasicChartScreen from './components/BasicChartScreen';
import DrilldownChartScreen from './components/DrilldownChartScreen'
import DropdownChartScreen from './components/DropdownChartScreen';
import HomeScreen from './components/HomeScreen';
// Data import
const barData = require('./data/renewableProductionForcast.json')
const chartData = require('./data/powerMGPPrices.json');
const areaData = require('./data/powerCCTPUNZonalHourly.json')
// Component Class description.
export default class App extends Component {
  // State initialization.
  constructor(props){
    super(props)
    console.log("APP CONSTRUCTOR:");
    this.state ={
      areaChartData: areaData,
      zonalChartData: chartData,
      barChartData: barData,
    }
    console.log(this.state);
  }
  // Render Component
  render() {
    console.log("RENDERING APP:");
    console.log(this.state);
    return (
        <HomeScreen />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
//    alignItems: 'stretch',
    width:'100%',
    backgroundColor: '#F5FCFF',
  },
});
