import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { DropChart } from '../charts';
import { Card, CardSection, DropOption, DateSelector } from '../common';
import DatePicker from 'react-native-datepicker'
import { Dropdown } from 'react-native-material-dropdown';
// Local data import.
// const lineData = require('../../data/zonalMGPPricesHourly.json');

// Component class declatation.
class DropdownChartScreen extends Component {
  // Navigaiton options passed as state paramaters.
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state.params || {};
    return {
      /* These values are used instead of the shared configuration! */
      title: params ? params.otherParam : 'Dropdown Chart',
    };
  };

  // Constructor.
  constructor(props){
    super(props);
    console.log('DDCHARTSCREEN CONSTRUCTOR:');

    // Set state based on extracted data.
    this.state = {
      data: this.props.navigation.state.params.data,
      selection: "",
      zones: [],
      series: [],

      dates: [],
      date: '',
      minDate: '',
      maxDate: '',
    }
    console.log(this.props);
  }


  // Set Dates and Zones.
  componentDidMount(){
    console.log('DPCHARTSCREEN DID MOUNT:');
    // DATES
    var data = this.state.data;
    var date, dates = [], opts = [];
    // Iterate over data, selecting dates.
    for(var row in data){
      date = data[row].D.slice(0,10);
      if(dates.indexOf(date) == -1){
        // Push unique date into array
        dates.push(date);
        opts.push(date);
      }
    }
    // ZONES
    // Assign keys of data row to StringArray.
    var keys = Object.keys(data[0])
    var zns = [];
    // Iterate through keys, pushing zones.
    for(var i=2; i<keys.length ; i++){
      zns.push({value: keys[i]});
    }
    // Set state and return message.
    this.setState({
          dates:opts,
          date: opts[0],
          minDate:opts[0],
          maxDate:opts[opts.length-1],
          selection: zns[0].value,
          zones: zns,}, () => {
    console.log("HS state updated by DID", this.state);
    });
  }


  // Manipulate data and render chart component.
  renderChart(){
    console.log("Rendering DropdownChart:");
    // Set local data
    const full_data = this.state.data;
    var date = "", data = [];
    // Iterate through data, selecting by date.
    for(var row in full_data){
      date = full_data[row].D.slice(0,10);
      if(date === this.state.date){
        data.push(full_data[row]);
      }
    }

    // Set selected zone from state.
    const selection = this.state.selection;
    // Delare data arrays.
    var xHrs = [], yZns = [];
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
    // Return chart, passing generated series.
    return(
      <DropChart series = {series} selection = {selection} />
    );
  }


  // Main render method.
  render(){
    console.log('RENDERING DPCHARTSCREEN:');
    console.log(this.state);
    // Return single JSON object.
    return(
      <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
        <Card>

            <CardSection style={{flex:0.1}}>
              
              <View style={{ flex: 1 }}>
                <Text style={{color:'white'}}>Select Zone</Text>
                  <Dropdown
                    label = ":"
                    value = {this.state.selection.value}
                    data={ this.state.zones }
                    onChangeText={ selection => this.setState({ selection }) }
                    containerStyle={styles.dropStyle}
                  >
                    </Dropdown>
              </View>
              
              <View style={{ flex: 1 }}>
                <Text style={{color:'white'}}>Select Date</Text>
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
              </View>
            </CardSection>

            <CardSection style={{flex:0.9}}>
              {this.renderChart()}
            </CardSection>

        </Card>
      </View>
    );
  }
}


const styles = {
  dropStyle: {
    backgroundColor:'#0d394e',
  },
}
export { DropdownChartScreen };
