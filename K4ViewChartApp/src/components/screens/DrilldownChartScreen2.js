import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { DrillChart } from '../charts';
import { Card, CardSection, DropOption, DateSelector } from '../common';
// Local data import.
// const barData = require('../../data/renewableProductionForcast.json');

// Component class declatation.
class DrilldownChartScreen2 extends Component {
// Navigaiton options passed as state paramaters.
static navigationOptions = ({ navigation, navigationOptions }) => {
  const { params } = navigation.state.params || {};
};
// Component state properties.
  constructor(props){
    super(props);
    console.log('SCREEN CONSTRUCTOR:');
    this.state = {
      selection: {value: "2018-02-08T00:00:00"},
      options: [],
      data: this.props.navigation.state.params.data,
      series: [],

      date: this.props.navigation.state.params.date,
      minDate: this.props.navigation.state.params.minDate,
      maxDate: this.props.navigation.state.params.maxDate,
    }
    console.log(this.state);
  }
  componentDidMount(){
    console.log("SCREEN WILL MOUNT:");
    // var ops = [];
    // var sel = "";
    // var ops=[];
    // var keys = Object.keys(this.state.data[0])
    // for(var i=2; i<keys.length;i++){
    //   ops.push({value: keys[i]})
    // };
    // this.setState({options: ops}, () => {
    //   console.log("state updated by did:", this.state)
    // })
    // this.setState({selection: ops[0]}, () => {
    //   console.log("state updated by did:", this.state)
    // })
    // console.log(this.state);
  }

  renderChart(){
    console.log("RENDERING CHART:");
    var COLUMN_PLOT_DATA = [], DRILLDOWN_SERIES = [], HOURS = [], ZONES = [];

    var windType = [];
    var solarType = [];
    var series = [];
    var drilldownWind = [];
    var drilldownSolar = [];

    var raw_data = this.state.data;
    // var selection = this.state.selection;
    /*  STAGE 1
     * 1 - Separate data into two arrays
     * 2 - Create arrays of unique hours and zones.
     * 3 - Create two drilldown arrays.
     */
    for(var row in raw_data){
      // Separate data into two arrays
      if( raw_data[row].Type === "EOLICO" ){
        windType.push(raw_data[row]);
      } else if (raw_data[row].Type === "FOTOVOLTAICO") {
        solarType.push(raw_data[row]);
      }

      // Create array of unique hours
      var hour = raw_data[row].Hour;
      if(HOURS.indexOf(hour) == -1){
        HOURS.push(hour);
      }

      // Create array of unique zones.
      var zone = raw_data[row].Zona;
      if(ZONES.indexOf(zone) == -1)
        ZONES.push(zone);
        // Array for final plot data to be added.
        COLUMN_PLOT_DATA.push({"zone": zone,"windValues": [],"solarValues": []});
    }

    console.log("STAGE 1");
    console.log(windType);
    console.log(solarType);
    console.log(drilldownSolar);
    console.log(drilldownWind);
    console.log("Plot Data:");
    console.log(COLUMN_PLOT_DATA);
    console.log(ZONES);
    console.log(HOURS);
    series = [{name:'Solar', data:[]},{name:'Wind', data:[]}];

    /*  STAGE 2
     * 1 - Iterate through the 6 Zones.
     * 2 - For each zone, iterate through wind data.
     * 3 - If zones match, track value and increment total.
     * 4 - Push average and drilldown data.
     */
     var wind_tot = 0, wind_avg = 0;
     var solar_tot = 0, solar_avg = 0;
     var solar_vals = [], wind_vals = [];
     for(var z in ZONES){

      // Wind
      for(var row in windType){
        if(ZONES[z] === windType[row].Zona){
          windType[row].Value
          wind_vals.push(windType[row].Value);
          wind_tot += windType[row].Value;
          }
       }
       // Push Average and Drilldown Data.
       wind_avg = wind_tot/HOURS.length;
       series[1].data.push({name:ZONES[z], y:wind_avg, drilldown: ZONES[z]+'-wind'});
       drill_str = ZONES[z] +'-wind';
       drilldownWind.push({
           name: drill_str,
           id: drill_str,
           data: wind_vals,
       });
       wind_vals = [];
       wind_tot = 0;
       wind_avg = 0;

       // Solar
       for(var row in solarType){
         if(ZONES[z] === solarType[row].Zona){
           solar_vals.push(solarType[row].Value);
           solar_tot += solarType[row].Value;
           }
        }
        // Push Average and Drilldown Data.
        solar_avg = solar_tot/HOURS.length;
        series[0].data.push({name:ZONES[z], y:solar_avg, drilldown: ZONES[z]+'-Solar'});
        drill_str = ZONES[z] +'-Solar';
        drilldownSolar.push({
            name: drill_str,
            id: drill_str,
            data: solar_vals,
        });
        solar_vals = [];
        solar_tot = 0;
        solar_avg = 0;
     }
     // Combine two drilldown series into single series.
     for(var i = 0; i < drilldownWind.length; i++){
         DRILLDOWN_SERIES.push(drilldownWind[i],drilldownSolar[i]);
     }
    console.log("|-- Final Data --|");
    console.log(series);
    console.log(DRILLDOWN_SERIES)

    // series = [];
    // DRILLDOWN_SERIES = [];
    //
    // series.push({name: 'Solar', data: [{name: 'CNOR', y: 10, drilldown:'CNOR-Solar'}]});
    // series.push({name: 'Wind', data:  [{name: 'CNOR', y: 10, drilldown:'CNOR-Wind'}]});
    // series[0].data.push({name: 'NORD', y: 6, drilldown:'NORD-Solar'});
    // series[1].data.push({name: 'NORD', y: 6, drilldown:'NORD-Wind'});
    // DRILLDOWN_SERIES.push({name: 'CNOR-Solar', id: 'CNOR-Solar' ,data: [['1', 4],['2', 2],['3', 1],['4', 2],['5', 1],['6', 4],['7', 2],['8', 1],['9', 2],['10', 1],['11', 4],['12', 2],['13', 1],['14', 2],['15', 1],['16', 4],['17', 2],['18', 1],['19', 2],['20', 5],['21', 3],['22', 9],['23', 6],['24', 5]]});
    // DRILLDOWN_SERIES.push({name: 'NORD-Solar', id: 'NORD-Solar' ,data: [['1', 4],['2', 2],['3', 1],['4', 2],['5', 1],['6', 4],['7', 2],['8', 1],['9', 2],['10', 1],['11', 4],['12', 2],['13', 1],['14', 2],['15', 1],['16', 4],['17', 2],['18', 1],['19', 2],['20', 5],['21', 3],['22', 9],['23', 6],['24', 5]]});

    return(
      <DrillChart
        series = {series}
        drilldownSeries = {DRILLDOWN_SERIES}
      ></DrillChart>
    );
  }
// Render function returns single JSX object.
  render(){

    return(
      <View style={{flex:1, flexDirection:'column', justifyContent:'center', paddingBottom: 10}}>
        <Card>
          <CardSection style={{flex:0.1}}>
            <DateSelector
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
export { DrilldownChartScreen2 };
