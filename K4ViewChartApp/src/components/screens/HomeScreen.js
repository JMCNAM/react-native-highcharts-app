import React, { Component } from 'react';
import { Container, Content, Button, Card, CardItem } from 'native-base';
import {View, Text,  Image } from 'react-native';
import { CardSection, DateSelector } from './common';
import { StackNavigator } from 'react-navigation';

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
    const { container, dateStyle, logoStyle, imgStyle, buttonsSection } = styles;
        return(
          <Container style={container}>
            <Content>
              <Card>

                <CardItem>
                  <View style={dateStyle}>
                    <Text style={{fontSize:20, color:'white'}}>Options</Text>
                    <DateSelector />
                  </View>
                </CardItem>

                <CardItem>
                  <View style={logoStyle}>
                    <Image
                      style={imgStyle}
                      source={require("../images/logo.bmp")}/>
                  </View>
                </CardItem>

                <CardItem>
                  <View style={buttonsSection}>
                    <Button
                      block primary
                      ><Text>Basic Chart</Text></Button>
                      <Button
                        block primary
                        ><Text>Dropdown Chart</Text></Button>
                        <Button
                          block primary
                          ><Text>Drilldown Chart</Text></Button>
                  </View>
                </CardItem>

              </Card>
            </Content>
          </Container>
        );
      }
    }
const barData = require('../../data/renewableProductionForcast.json');

const styles = {
  container:{
    flex:1,
    backgroundColor: "#092938",
    flexDirection:'column',
    justifyContent: 'center',
    height: 100
  },
  dateStyle:{
    flex:1,
    backgroundColor: "#092938",
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logoStyle:{
    flex:1,
    backgroundColor: "#092938",
    justifyContent: 'center',
    alignItems: 'center',
    padding:10,
  },
  imgStyle:{
    width:200,
    height:200,
  },
  buttonsSection:{
    flex:1,
    backgroundColor: "#092938",
    justifyContent: 'space-around',
    alignItems: 'center',
    height:250,
    padding: 10
  },

export { HomeScreen };
