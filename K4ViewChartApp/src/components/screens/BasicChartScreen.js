import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { AreaChart } from '../charts/AreaChart';
import { Card, CardSection, DropOption, DateSelector } from '../common';
import { StackNavigator } from 'react-navigation';

// Local data import.
// const areaData = require('../../data/zonalPrices.json');

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
        options: [],
        series: [],
        // Data set from navigation paramaters.
        date: this.props.navigation.state.params.date,
        data: this.props.navigation.state.params.data,
        minDate: this.props.navigation.state.params.minDate,
        maxDate: this.props.navigation.state.params.maxDate,
      }
      console.log(this.props.navigation.state.params);
      console.log('RENDERING');
  }
  // Render method; processes data and renders chart.
  renderChart(){
    console.log("Rendering AreaChart:");
    // Set data and selection from props.
    var raw_data = this.state.data;
    // Data arrays for chart data.
    var series = [];
    var date = "";
    console.log(this.state.date);
    for(var row in raw_data){
      date = raw_data[row].D.slice(0,10);
      if(date === this.state.date){
      //console.log(raw_data[row].Value);
      series.push([raw_data[row].Hour, raw_data[row].Value]);
      }
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
              onDateChange={(date) => {this.setState({date: date})}}
              minDate={ this.state.minDate }
              maxDate={ this.state.maxDate }
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
