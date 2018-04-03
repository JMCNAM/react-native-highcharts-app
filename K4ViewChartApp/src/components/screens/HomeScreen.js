import React, { Component } from 'react';
import { Container, Content, Button, Card, CardItem } from 'native-base';
import { View, Text,  Image } from 'react-native';
import { DateSelector } from '../common';
import { StackNavigator } from 'react-navigation';

const areaData = require('../../data/zonalPrices.json');

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
        selection: 'Select Series',
        dates:[],
        data:[],
        minDate:"",
        maxDate:"",
      }
  }


// Method to select dates from data executed when component mounts.
  componentDidMount(){
    console.log("HOMESCREEN DID MOUNT");
    var dates = [];
    var opts = [];
    var date;
    for(var row in barData){
      date = barData[row].D.slice(0,10);
      if(dates.indexOf(date) == -1){
        // Push unique date into array
        dates.push(date);
        opts.push({value: date});
      }
    }
    // Set state and return message.
    this.setState({dates:opts, minDate:opts[0], maxDate:[opts.length-1]}, () => {
        console.log("HS state updated by DID", this.state);
    });
    //
    this.setState({data:areaData}, ()=> {
        console.log("HS state updated by DID", this.state);
    });
  }

  // Render function; return screen
  render() {
    console.log("RENDERING HOMESCREEN");
    console.log(this.state);
    const { container, dateStyle, logoStyle, imgStyle, buttonsSection } = styles;
        return(
          <Container style={container}>
            <Content>
              <Card>

                <CardItem>
                  <View style={dateStyle}>
                    <Text style={{fontSize:20, color:'white'}}>Options</Text>
                    <DateSelector
                      onDateChange={(date) => {this.setState({date: date})}} 
                      minDate={ this.state.minDate }
                      maxDate={ this.state.maxDate }
                      />
                  </View>
                </CardItem>

                <CardItem>
                  <View style={logoStyle}>
                    <Image
                      style={imgStyle}
                      source={require("../../images/logo.bmp")}/>
                  </View>
                </CardItem>

                <CardItem>
                  <View style={buttonsSection}>
                    <Button
                      block primary
                      onPress={ ()=> {this.props.navigation.navigate(
                          'Basic',{selection:this.state.selection, 
                                   data:this.state.data})}}
                        ><Text>Basic Chart</Text>
                      </Button>
                   
                      <Button
                      block primary
                      onPress={ ()=> {this.props.navigation.navigate(
                        'Drop',{selection:this.state.selection, 
                                 data:this.state.data})}}
                      
                        ><Text>Dropdown Chart</Text>
                      </Button>

                      <Button
                        block primary
                        onPress={ ()=> {this.props.navigation.navigate(
                          'Drill',{selection:this.state.selection, 
                                   data:this.state.data})}}
                        ><Text>Drilldown Chart</Text>
                      </Button>
                      
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
}
export { HomeScreen };