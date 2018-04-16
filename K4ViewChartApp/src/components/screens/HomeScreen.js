import React, { Component } from 'react';
import { Container, Content, Button, Card, CardItem } from 'native-base';
import { View, Text,  Image } from 'react-native';
import { DateSelector } from '../common';
import { StackNavigator } from 'react-navigation';
//import Images from 'assets/images';

const logo = require("assets/app/images/logo.bmp");
// Data
const areaData = require('../../data/zonalPrices.json');
const lineData = require('../../data/zonalMGPPricesHourly.json');
const barData = require('../../data/renewableProductionForcast.json');
// Class declaration
class HomeScreen extends Component {
  // Navigaiton passed as state paramater.
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state || {};
  };
  // Constructor.
  constructor(props){
    super(props)
      this.state = {
        // Data
        basicData: areaData,
        dropData: lineData,
        drillData: barData,
      }
  }

  // Render function; return homescreen content.
  render() {
    console.log("RENDERING HOMESCREEN");
    console.log(this.state);
    // Destruct styles.
    const { container, 
            cardStyle, 
            cardItemStyle, 
            dateStyle, 
            logoStyle, 
            imgStyle, 
            buttonsSection, 
            buttonStyle, 
            buttonText } = styles;

        return(
          <Container style={container}>
            <Content>
              <Card style={cardStyle}>

                <CardItem style={cardItemStyle}>
                  <View style={logoStyle}>
                    <Image
                      style={imgStyle}
                      source={logo}/>
                  </View>
                </CardItem>

                <CardItem style={cardItemStyle}>
                  <View style={buttonsSection}>

                    <Button
                      style={buttonStyle}
                      block primary
                      onPress={ ()=> {this.props.navigation.navigate(
                          'Basic',{ data:this.state.basicData })}}
                        ><Text style={buttonText}>Basic Chart</Text>
                      </Button>

                    <Button
                        style={buttonStyle}
                        block primary
                        onPress={ ()=> {this.props.navigation.navigate(
                          'Drop',{ data:this.state.dropData})}}
                        ><Text style={buttonText} >Dropdown Chart</Text>
                      </Button>

                    <Button
                        style={buttonStyle}
                        block primary
                        onPress={ ()=> {this.props.navigation.navigate(
                          'Drill',{ data:this.state.drillData})}}
                        ><Text style={buttonText} >Drilldown Chart</Text>
                      </Button>

                  </View>
                </CardItem>

              </Card>
            </Content>
          </Container>
        );
      }
    }
    
// Component styles.
const styles = {
  container:{
    flex:1,
    backgroundColor: "#092938",
    flexDirection:'column',
    justifyContent: 'center',
    height: 100
  },
  cardStyle:{
    backgroundColor: "#092938",
  },
  cardItemStyle:{
    backgroundColor: "#092938",
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
  buttonStyle:{
    backgroundColor: 'white',
  },
  buttonText:{
    fontSize:15,
    fontWeight: 'bold',
  }
}
// Export Component.
export { HomeScreen };
