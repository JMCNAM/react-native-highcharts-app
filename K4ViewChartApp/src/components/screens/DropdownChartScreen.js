import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { DropChart } from '../charts';
import { Card, CardSection, DropOption } from '../common';

const lineData = require('../../data/zonalMGPPricesHourly.json');

// Component class declatation.
class DropdownChartScreen extends Component {

  // Navigaiton options passed as state paramaters.
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state.params || {};
  }; 
  
  // Constructor.
  constructor(props){
    super(props);
    console.log('DDCHARTSCREEN CONSTRUCTOR:');

    var data = lineData;
    // Assign keys of data row to StringArray.
    var keys = Object.keys(data[0])
    var zns = [];
    // Iterate through keys, pushing zones.
    for(var i=2; i<keys.length ; i++){
      zns.push({value: keys[i]});
    }

    this.state = {
      selection: zns[0].value,
      zones: zns,
      data: this.props.navigation.state.params.data,
      series: [],
    }
    console.log(this.props);
  }

  // Set Options for Dropdown.
  componentDidMount(){
    console.log('DPCHARTSCREEN DID MOUNT:');
    /* 
        NB: State data is set by nav-props.
            Changing to local lineData import 
            for dev. NEED TO DATA IMPORTS!!
    */
    // Switch to local data
  }

   // Render method.
  renderChart(){
    console.log("Rendering DropdownChart:");
    console.log(this.state);
    
    // Set local data
    const data = lineData
    // var data = this.state.data;
    
    // Set selected zone from state.
    const selection = this.state.selection;
    console.log(selection);

    // Delare data arrays.
    var xHrs = [];
    var yZns = [];

    // Populate data arrays
    for(var row in data){
      for(var element in data[row]){
        if(element === "Hour"){
          xHrs.push(data[row].Hour);
        }
        const zn = selection;
        if(element === zn){
          yZns.push(data[row][zn]);
        }
      }  
    }
    // Map two arrays into one.
    const series = xHrs.map((a, i) => [a, yZns[i]]);
    console.log(series);
   
    // Return chart, passing generated series.
    return(
      <DropChart series = {series} />
    );
  }
  render(){
    console.log('RENDERING DPCHARTSCREEN:');
    console.log(this.state);
    return(
      <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
        <Card>
          <CardSection style={{flex:0.1}}>
          <DropOption
            label = "Select Zone:"
            value = {this.state.selection.value}
            data={ this.state.zones }
            onChangeText={ selection => this.setState({ selection }) }
          ></DropOption>
         </CardSection>
            {this.renderChart()}
          <CardSection style={{flex:0.9}}>
          </CardSection>
        </Card>
      </View>
    );
  }
}
export { DropdownChartScreen };