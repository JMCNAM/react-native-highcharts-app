import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Card, CardSection, DropOptions } from '../common';

class HomeScreen extends Component {
      state = {
        selection: 'Select Series',
        options:[],
        data:[],
      }
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
  };
  // Render function; return screen
  render() {
    var dates = [];
    var options = [];
    var date;
    for(var row in barData){
      date = barData[row].D.slice(0,10);
      if(dates.indexOf(date) == -1){
        dates.push(date);
        options.push({value: date});
      }
    }
    this.state.options = options;
    return (
      <View style={{flex:1,}}>
        <Card style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        
          <CardSection>
            <DropOptions
              style={{flex: 1}}
              label="Options"
              style={{color: '#ffffff'}}
              data={this.state.options}
              onChangeText={selection => this.setState({selection})}
              />
            </CardSection>
          
          <CardSection>
            <Button
              title="Go to Chart 1"
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                this.props.navigation.navigate('PowerZonal',{ selection:this.state.selection });
              }}
              />
            </CardSection>

          <CardSection>
            <Button
              title="Go to Chart 2"
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                this.props.navigation.navigate('RenewableProduction',{ selection:this.state.selection });
              }}
              />
            </CardSection>
        
          <CardSection>
            <Button
              title="Go to Chart 3"
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                this.props.navigation.navigate('PowerPrices',{ selection:this.state.selection });
              }}
              />
            </CardSection>
        </Card>
      </View>
    );
  }
}
const barData = require('../../data/renewableProductionForcast.json');
export { HomeScreen };


