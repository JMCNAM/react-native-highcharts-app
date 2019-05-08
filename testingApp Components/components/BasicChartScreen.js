import React, { Component } from 'react';
import {View, Text } from 'react-native';
import {AreaChart} from './charts/AreaChart';
import { Card, CardSection, DropOption, DateSelector } from './common';
const areaData = require('../data/powerCCTPUNZonalHourly.json');
// Component class declatation.
export default class BasicChartScreen extends Component {
// Component state properties.
  constructor(props){
    super(props);
    console.log("BASICCHARTSCREEN CONSTRUCTOR:");
      this.state = {
        selection: 'Select Series',
        options: [],
        data: areaData,
        series: []
      }
      console.log(this.state);
  }
  renderChart(){
    console.log("BASIC Will MOUNT:");
    // Set data and selection from props.
    var raw_data = this.state.data;
    var series = [];
    // Data arrays for chart data.
    for(var row in raw_data){
      //console.log(raw_data[row].Value);
      series.push([raw_data[row].Hour, raw_data[row].Value]);
    }
    console.log(series);
    return(
        <AreaChart
          series = {series}
        ></AreaChart>
    );
  }
// Component logic, executed before rendering.
  componentWillMount(){
    console.log("BASIC Will MOUNT:");
  }
// Render function returns single JSX object.
  render(){
    return(
      <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
        <Card>
          <CardSection style={{flex:0.1}}>
            <DateSelector
           />
         </CardSection>
          <CardSection style={{flex:0.9}}>
              {this.renderChart()}
          </CardSection>
        </Card>
      </View>
    );
  }
}
