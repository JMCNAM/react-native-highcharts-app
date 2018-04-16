import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { DrillChart } from '../charts';
import { Card, CardSection, DropOption, DateSelector } from '../common';
import DatePicker from 'react-native-datepicker';
// Local data import.
// const barData = require('../../data/renewableProductionForcast.json');

// Component class declatation.
class DrilldownChartScreen extends Component {
  // Navigaiton options passed as state paramaters.
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state.params || {};
    return {
      /* These values are used instead of the shared configuration! */
      title: params ? params.otherParam : 'Drilldown Chart',
    };
  };

  // Constructor.
  constructor(props){
    super(props);
    console.log('SCREEN CONSTRUCTOR:');
    this.state = {
      // Data
      series: [],
      data: this.props.navigation.state.params.data,
      // Dates
      dates: [],
      date: '',
      maxDate: '',
      minDate: '',
    }
    console.log(this.state);
  }

  // Logic executed after component mounts.
  componentDidMount(){
    console.log("DLDNCHARTSCREEN DID MOUNT:");
    var data = this.state.data;
    var dates = [];
    var opts = [];
    var date;
    for(var row in data){
      date = data[row].D.slice(0,10);
      if(dates.indexOf(date) == -1){
        // Push unique date into array
        dates.push(date);
        opts.push(date);
      }
    }
    console.log(dates);
    // Set state and return message.
    this.setState({dates:opts,
                  date: opts[0],
                  minDate:opts[0],
                  maxDate:opts[opts.length-1]}, () => {
        console.log("DLDN state updated by DID", this.state);
    });
  }

  // Manipulate data and render chart component.
  renderChart(){    
    console.log("RENDERING DLDN CHART:");
    const full_data = this.state.data;

    // Extract data of state date.
    var date = "", data = [];
    for(var row in full_data){
      date = full_data[row].D.slice(0,10);
      if(date === this.state.date){
        data.push(full_data[row]);
      }
    }

    // Arrays for data manipulation.
    var COLUMN_PLOT_DATA = [], DRILLDOWN_SERIES = [], HOURS = [], ZONES = [];
    var windType = [], solarType = [];
    var drilldownWind = [], drilldownSolar = [];
    // Series format for double-column chart.
    var series = [{name:'Solar', data:[]},{name:'Wind', data:[]}];
    // Set local data.
    var raw_data = data;
    console.log('Data for date selected: ');
    console.log(date);
    console.log(raw_data);


    /*  STAGE 1
    * 1 - Separate data into two arrays
    * 2 - Create arrays of unique hours and zones.
    * 3 - Store zone and type-series in PLOT_DATA.
    */
    for(var row in raw_data){
      // Separate data by type into two arrays
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




      // console.log("STAGE 1");
      // console.log(windType);
      // console.log(solarType);
      // console.log(drilldownSolar);
      // console.log(drilldownWind);
      // console.log("Plot Data:");
      // console.log(COLUMN_PLOT_DATA);
      // console.log(ZONES);
      // console.log(HOURS);


      /*  STAGE 2
      * 1 - Iterate through the 6 Zones.
      * 2 - For each zone, iterate through wind data.
      * 3 - If zones match, track value and increment total.
      * 4 - Push average and drilldown data.
      */
      // Variables for data manipulation.
      var wind_tot = 0, wind_avg = 0, solar_tot = 0, solar_avg = 0;
      var solar_vals = [], wind_vals = [];
      // Data is extracted by zone, so iterate over zone array.
      for(var z in ZONES){

        // Wind
        for(var row in windType){
          // If main-zone matches the data-zone.
          if(ZONES[z] === windType[row].Zona){
            // Push data-value into array and increment total.
            wind_vals.push(windType[row].Value);
            wind_tot += windType[row].Value;
            }
        }
        // Calculate average. 
        wind_avg = wind_tot/HOURS.length;

        
        // Set string for drilldown config.
        drill_str = ZONES[z] +'-wind';
        // Push entries into plot-series and drilldown sub-series.
        series[1].data.push({
          name:      ZONES[z],
          y:         wind_avg,
          drilldown: drill_str});
        drilldownWind.push({
            name: drill_str,
            id:   drill_str,
            data: wind_vals,
        });
        // Re-set data-variables.
        wind_vals = [];
        wind_tot = 0;
        wind_avg = 0;


        // Repeat above for solar-data.
        for(var row in solarType){
          if(ZONES[z] === solarType[row].Zona){
            solar_vals.push(solarType[row].Value);
            solar_tot += solarType[row].Value;
            }
          }
          solar_avg = solar_tot/HOURS.length;
          drill_str = ZONES[z] +'-Solar';
          series[0].data.push({name:ZONES[z], y:solar_avg, drilldown: drill_str});
          drilldownSolar.push({name: drill_str,id: drill_str,data: solar_vals});
          solar_vals = [];
          solar_tot = 0;
          solar_avg = 0;
      } // END for-ZONES-loop.

      // Combine two drilldown sub-series into single series.
      for(var i = 0; i < drilldownWind.length; i++){
          DRILLDOWN_SERIES.push(drilldownWind[i],drilldownSolar[i]);
      }

      // Testing Configuration.
        // series = [];
        // DRILLDOWN_SERIES = [];
        // series.push({name: 'Solar', data: [{name: 'CNOR', y: 10, drilldown:'CNOR-Solar'}]});
        // series.push({name: 'Wind', data:  [{name: 'CNOR', y: 10, drilldown:'CNOR-Wind'}]});
        // series[0].data.push({name: 'NORD', y: 6, drilldown:'NORD-Solar'});
        // series[1].data.push({name: 'NORD', y: 6, drilldown:'NORD-Wind'});
        // DRILLDOWN_SERIES.push({name: 'CNOR-Solar', id: 'CNOR-Solar' ,data: [['1', 4],['2', 2],['3', 1],['4', 2],['5', 1],['6', 4],['7', 2],['8', 1],['9', 2],['10', 1],['11', 4],['12', 2],['13', 1],['14', 2],['15', 1],['16', 4],['17', 2],['18', 1],['19', 2],['20', 5],['21', 3],['22', 9],['23', 6],['24', 5]]});
        // DRILLDOWN_SERIES.push({name: 'NORD-Solar', id: 'NORD-Solar' ,data: [['1', 4],['2', 2],['3', 1],['4', 2],['5', 1],['6', 4],['7', 2],['8', 1],['9', 2],['10', 1],['11', 4],['12', 2],['13', 1],['14', 2],['15', 1],['16', 4],['17', 2],['18', 1],['19', 2],['20', 5],['21', 3],['22', 9],['23', 6],['24', 5]]});
        
      console.log("|-- Final Data --|");
      console.log(series);
      console.log(DRILLDOWN_SERIES)
      // Return chart element with formatted data.
      return(
        <DrillChart
          series = {series}
          drilldownSeries = {DRILLDOWN_SERIES}
        ></DrillChart>
      );
    }

    
  // Render function returns single JSX object.
    render(){
      console.log("RENDERING DLDNCHARTSCREEN");
      console.log(this.state);
      // Return Single JSON object.
      return(
        <View style={{flex:1, flexDirection:'column', justifyContent:'center', paddingBottom: 10}}>
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
  export { DrilldownChartScreen };
