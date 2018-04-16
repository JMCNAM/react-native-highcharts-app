import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { AreaChart } from '../charts/AreaChart';
import { Card, CardSection, DropOption, DateSelector } from '../common';
import { StackNavigator } from 'react-navigation';
import DatePicker from 'react-native-datepicker'
// Local data import.
// const areaData = require('../../data/zonalPrices.json');

// Component class declatation.
export default class BasicChartScreen extends Component {
  // Navigation paramaters
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state.params || {};
    return {
      /* These values are used instead of the shared configuration! */
      title: params ? params.otherParam : 'Basic Chart',    
    };
  };



  // Component state properties.
  constructor(props){
    super(props);
    console.log("BASICCHARTSCREEN CONSTRUCTOR:");
      this.state = {
        dates: [],
        date: '',
        maxDate: '',
        minDate: '',

        data: this.props.navigation.state.params.data,
        series: []
      }
      console.log(this.state);
  }


  // Component logic, executed before rendering.
  componentDidMount(){
    console.log("BASIC DID MOUNT:");
    var raw_data = this.state.data;
    var dates = [], date = '';
    // Iterate through data, selecting unique dates.
    for(var row in raw_data){
      date = raw_data[row].D.slice(0,10);
      if(dates.indexOf(date) == -1){
        // Push unique date into array
        dates.push(date);
      }
    }
    console.log(dates);
    // Set state and return message.
    this.setState({dates:dates,
                  date: dates[0],
                  minDate:dates[0],
                  maxDate:dates[dates.length-1]}, () => {
        console.log("BCS state updated by DID", this.state);
    });
    console.log(this.state);
  }

  // Render method; processes data and renders chart.
  renderChart(){
    console.log("RENDERING BCS :");
    // Set data and selection from props.
    var raw_data = this.state.data;
    var series = [], date = "";
    // Data arrays for chart data.
    for(var row in raw_data){
      /// console.log(raw_data[row].D);
      date = raw_data[row].D.slice(0,10);
      if(date === this.state.date){
        series.push([raw_data[row].Hour, raw_data[row].Value]);
      }
    }
       console.log(series);
    return(
        <AreaChart
          series = {series}
        ></AreaChart>
    );
  }


// Render function returns single JSX object.
  render(){
    return(
      <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
        <Card>

          <CardSection style={{flex:0.1}}>
            <DatePicker
              changeDate={this.props.changeDate}
              style={{width: 200}}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate={this.state.minDate}
              maxDate={this.state.maxDate}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                },
                dateText:{color:'white'}
              }}
              onDateChange={date => this.setState({date: date})}
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
