import React, { Component } from 'react';
import { View, Text } from 'react-native';


export default class Lifecycle extends Component{

  constructor(props){
    super(props);
    console.log("CONSTRUCTOR:");
    console.log(this.state);
    this.state = {
      stateVar: 0,
      newVar: 2,
    }
    console.log(this.state);
  }
  componentWillMount(){
    console.log("COMPONENT WILL MOUNT:");
    this.setState({stateVar: 100});
    console.log(this.state);
  }
  componentDidMount(){
    console.log("COMPONENT DID MOUNT:");
    console.log(this.state);
    this.setState({stateVar: 2});
    console.log(this.state);
  }
  render(){
    // componenetDidMount();
    console.log("RENDERING:");
    console.log(this.state);
    return (
      <View style={{alignItems:'center', justifyContent:'center'}}>
        <Text>Lifecycle Component</Text>
      </View>
    );
  }
}
