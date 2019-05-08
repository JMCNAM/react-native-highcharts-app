import React, { Component } from 'react';
import {View, Text } from 'react-native';
import DataChart from './charts/DataChart';
import { Card, CardSection, DropOption } from './common';
const lineData = require('../data/powerMGPPrices.json');
// Component class declatation.
export default class DropdownChartScreen extends Component {
// Component state properties.
  constructor(props){
    super(props);
    console.log('SCREEN CONSTRUCTOR:');
    this.state = {
      selection: "S",
      options: [],
    }
    console.log(this.state);
  }

  componentWillMount(){
    console.log("SCREEN WILL MOUNT:");
    console.log(this.state);
    var ops = [];
    var sel = "";
    var ops=[];
    var keys = Object.keys(lineData[0])
    for(var i=2; i<keys.length;i++){
      ops.push({value: keys[i]})
    };
    this.setState({options: ops}, () => {
      console.log("state updated by did:", this.state)
    })
    this.setState({selection: ops[0]}, () => {
      console.log("state updated by did:", this.state)
    })
    console.log(this.state);
  }

  componentDidUpdate(){
    console.log("SCREEN DID UPDATE:");

    console.log(this.state);
  }
// Component logic, executed before rendering.
  componentDidMount(){
    console.log('SCREEN DID MOUNT:');
    console.log(this.state);
    var ops = [];
    var sel = "";
    var ops=[];
    var keys = Object.keys(lineData[0])
    for(var i=2; i<keys.length;i++){
      ops.push({value: keys[i]})
    };
    console.log(this.state);
    return (this.setState({options: ops}, () => {
      console.log("state updated by did:", this.state)
      })
    );

  }
// Render function returns single JSX object.
  render(){
    console.log('RENDERING SCREEN:');
    console.log(this.state);
    return(
      <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
        <Card>
          <CardSection style={{flex:0.1}}>
            <DropOption
             value={this.state.selection.value}
             label="Select Zone"
             style={{color: '#ffffff'}}
             data={this.state.options}
           />
         </CardSection>

          <CardSection style={{flex:0.9}}>
            <DataChart
              data = {lineData}
              selection = {this.state.selection}
              onChangeText={this.onChangeText}
            ></DataChart>
          </CardSection>
        </Card>
      </View>
    );
  }
}
