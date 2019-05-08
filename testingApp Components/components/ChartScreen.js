import React, { Component } from 'react';
import {View, Text } from 'react-native';
import { Card, CardSection, DropOption, Header } from './common';
import {DropChart} from './charts/DropChart';

const lineData = require('../data/powerMGPPrices.json');

export default class ChartScreen extends Component {

  constructor(props){
    super(props)
    console.log("CHARTSCREEN CONSTRUCTOR:");
    this.state = {
      options: [],
      selection: {value: "Selection"},
      data: lineData,
      series:[],
    }
    console.log(this.state);
  }
  renderChart(){
    console.log("RENDERING CHART COMPONENT");
    var raw_data = lineData;
    var selection = this.state.selection;
    var series = [];
    console.log(selection.value);
    for(var row in raw_data){
      var h = raw_data[row].Hour;
      for(var element in raw_data[row]){
        var e = element;
        console.log(raw_data[row][selection]);
        if(e === selection){
          // console.log(element);

          var d = raw_data[row][selection];
        }
      }
      series.push([h, d]);
    }
    console.log(series);
    console.log(selection)
    // this.setState({series:series, selection:selection});
    console.log("Return Chart component:");
    return(
      <DropChart
        selection={selection}
        series = {series}
      />
    );
  }
  componentWillMount(){
    console.log("CHARTSCREEN WILL MOUNT");
    var opts = [];
    var keys = Object.keys(lineData[0])
    for(var i=2; i<keys.length;i++){
      opts.push({value: keys[i]})
    };
    this.setState({options: opts}, () => {
      console.log("state options updated by did:", this.state)
    })
    this.setState({selection: "PUN"}, () => {
      console.log("state options updated by did:", this.state)
    })
    console.log(this.state);
  }
  render(){
    console.log("RENDERING CHARTSCREEN:");
      console.log("this.state");
      console.log(this.state);
      console.log("end state");
    return(
      <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
        <Card>
          <CardSection>
            <DropOption
              label = "Select Option"
              data = {this.state.options}
              onChangeText = {selection => this.setState({selection})}
              value = {this.state.selection}
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
