import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { AreaChart } from '../charts/AreaChart';
import { Card, CardSection, DropOption, DateSelector } from '../common';
import { StackNavigator } from 'react-navigation';

//const areaData = require('../../data/zonalPrices.json');

// Component class declatation.
class BasicChartScreen extends Component {
  // Set navigation paramaters.
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state || {};
  };

  // Constructor.
  constructor(props){
    super(props);
    console.log("BASICCHARTSCREEN CONSTRUCTOR:");
      this.state = {
        selection: 'Select Series',
        options: [],
        // Data set from navigation paramaters.
        data: this.props.navigation.state.params.data,
        series: []
      }
      console.log(this.props);
  }


  // Render method; processes data and renders chart.
  renderChart(){
    console.log("Rendering AreaChart:");
    // Set data and selection from props.
    var raw_data = this.state.data;
    // Data arrays for chart data.
    var series = [];
    for(var row in raw_data){
      //console.log(raw_data[row].Value);
      series.push([raw_data[row].Hour, raw_data[row].Value]);
    }
    console.log(series);
    return(
        <AreaChart series = {series} />
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



export { BasicChartScreen };