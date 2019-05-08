import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Card, CardSection } from './common';

export default class Counter extends Component {
  state = {
    count: 0
  };
  increment = () =>
  this.setState(prevState => {
    return{
      count: prevState.count + 1,
    }
  })
  render() {
    console.log(this.state.count);
    return(
      <View style={styles.container}>

        <View style={styles.subContainer}>
        <Text
            style={styles.textBox}
            title='display-count-text'
            accessible={true}
          >Count: {this.state.count}</Text>
        </View>

        <View style={styles.subContainer}>
        <Button
            style={styles.textBox}
            onPress={ this.increment }
          >+</Button>
        </View>

      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FBFBFB',
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
  },
  buttonText:{
    fontSize: 20,
  },
  subContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox:{
    fontSize: 20,
    fontWeight: 'bold',
  }
}
