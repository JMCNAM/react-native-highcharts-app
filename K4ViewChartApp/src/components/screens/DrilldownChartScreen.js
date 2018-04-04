import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { DrillChart } from '../charts';
import { Card, CardSection, DropOption } from '../common';
const barData = require('../../data/renewableProductionForcast.json');
// Component class declatation.
class DrilldownChartScreen extends Component {
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
      data: barData,
      series: [],
    }
    console.log(this.state);
  }
  componentDidMount(){
    console.log("SCREEN WILL MOUNT:");
    var ops = [];
    var sel = "";
    var ops=[];
    var keys = Object.keys(barData[0])
    for(var i=2; i<keys.length;i++){
      ops.push({value: keys[i]})
    };
    this.setState({options: ops}, () => {
      console.log("state updated by did:", this.state)
    })
    this.setState({selection: ops[0]}, () => {
      console.log("state updated by did:", this.state)
    })
    // console.log(this.state);
  }

  renderChart(){
    console.log("RENDERING CHART:");
    // console.log(this.state.data);
    //     var sample_date;
    //     var date;
    // //    console.log(full_data);
    //     for(var row in this.state.data){
    // //      console.log(full_data[row].D);
    //       sample_date = raw_data[row].D;
    //       date = sample_date.slice(0,10);
    //       console.log(date + "  " + selection);
    //       if(date === selection){
    //         raw_data.push(data_data[row]);
    //       }
    //     }
    /*
        NB: State data is set by nav-props.
            Changing to local lineData import
            for dev.
    */
    // Switch to local data
    //
    // var raw_data = barData;
    // var selection = this.state.selection;
    // /*  STAGE 1
    //  * 1 - Separate data into two arrays
    //  * 2 - Create arrays of unique hours and zones.
    //  * 3 - Create two drilldown arrays.
    //  */
    // for(var row in raw_data){
    //   // Separate data into two arrays
    //   if( raw_data[row].Type === "EOLICO" ){
    //     windType.push(raw_data[row]);
    //   }else if (raw_data[row].Type === "FOTOVOLTAICO") {
    //     solarType.push(raw_data[row]);
    //   }
    //   // Create array of unique hours
    //   var hour = raw_data[row].Hour;
    //   if(HOURS.indexOf(hour) == -1){
    //     HOURS.push(hour);
    //   }
    //   // Create array of unique zones.
    //   var zone = raw_data[row].Zona;
    //   if(ZONES.indexOf(zone) == -1)
    //     ZONES.push(zone);
    //     console.log();
    //     // Array for final plot data to be added.
    //     COLUMN_PLOT_DATA.push({"zone": zone,"windValues": [],"solarValues": []});
    //     // Two arrays drilldown data.
    //     var drill_str = zone+'-Wind';
    //     drilldownWind.push({
    //         name: drill_str,
    //         id: drill_str,
    //         data: []
    //     });
    //     drill_str = zone+'-Solar';
    //     drilldownSolar.push({
    //         name: drill_str,
    //         id: drill_str,
    //         data: []
    //     });
    // }
    // console.log("STAGE 1");
    // console.log(windType);
    // console.log(solarType);
    // console.log(drilldownSolar);
    // console.log(drilldownWind);
    // console.log("Plot Data:");
    // console.log(COLUMN_PLOT_DATA);
    // console.log(ZONES);
    // console.log(HOURS);
    // /*
    //  * 1 - Iterate through rows of data
    //  * 2 - Push data into drilldown series.
    //  * 3 - Push zone and type into data array.
    //  */
    var zone_windVals = [];
    for (var row in windType){
      // Add data to the drilldown series.
      temp_str = windType[row].Zona+'-Wind';
      for(obj in drilldownWind){
          if(drilldownWind[obj].name === temp_str){
            drilldownWind[obj].data.push([windType[row].Hour ,windType[row].Value]);
          }
      }
      // Push the zone and type value onto array.
      for (var zn in ZONES){
        if( ZONES[zn] === windType[row].Zona ){
          zone_windVals.push([ZONES[zn], windType[row].Value]);
        }
      }
    }
    // Repeat above for solar.
    var zone_solarVals = [];
    for (var row in solarType){
      temp_str = windType[row].Zona+'-Solar';
      for(obj in drilldownSolar){
          if(drilldownSolar[obj].name === temp_str){
          drilldownSolar[obj].data.push([windType[row].Hour, solarType[row].Value]);
          }
      }
      for (var zn in ZONES) {
        if( ZONES[zn] === solarType[row].Zona ){
          zone_solarVals.push([ZONES[zn], solarType[row].Value]);
        }
      }
    }
    console.log('DRILLDOWN')
    console.log(drilldownSolar);
    console.log(drilldownWind);
    // /*
    //  * 1 - Iterate through each row in plot data.
    //  * 2 - Iterate through each type array.
    //  * 3 - If match, push value into plot data array.
    //  */
    // for(var element in COLUMN_PLOT_DATA){
    //   var zone = COLUMN_PLOT_DATA[element].zone;
    //   for (var entry in zone_windVals){
    //     if(zone_windVals[entry][0] === zone){
    //       COLUMN_PLOT_DATA[element].windValues.push(zone_windVals[entry][1]);
    //     };
    //   }
    //   // Repeat above for solar.
    //   for (var entry in zone_solarVals){
    //     if(zone_solarVals[entry][0] === zone){
    //       COLUMN_PLOT_DATA[element].solarValues.push(zone_solarVals[entry][1]);
    //     };
    //   }
    // }
    //

    var series = [];
    console.log("RENDERING CHART:");
    // Initialise the data arrays.
    var COLUMN_PLOT_DATA = [];
    var DRILLDOWN_SERIES = [];
    var HOURS = [];
    var ZONES = [];
    var windType = [];
    var solarType = [];
    var series = [];
    var drilldownWind = [];
    var drilldownSolar = [];

    var raw_data = barData;
    var selection = this.state.selection;
    /*  STAGE 1
     * 1 - Separate data into two arrays
     * 2 - Create arrays of unique hours and zones.
     * 3 - Create two drilldown arrays.
     */
    for(var row in raw_data){
      // Separate data into two arrays
      if( raw_data[row].Type === "EOLICO" ){
        windType.push(raw_data[row]);
      }else if (raw_data[row].Type === "FOTOVOLTAICO") {
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
        // Two arrays drilldown data.
        var drill_str = zone+'-Wind';
        // drilldownWind.push({
        //     name: drill_str,
        //     id: drill_str,
        //     data: []
        // });
        // drill_str = zone+'-Solar';
        // drilldownSolar.push({
        //     name: drill_str,
        //     id: drill_str,
        //     data: []
        // });
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
    // Populate the data series.
    for(var z in ZONES){
      var wind_tot = 0, wind_avg = 0;
      var solar_tot = 0, solar_avg = 0;
      var solar_vals = [], wind_vals = [];

      // Wind
      for(var vals in windType){
        if(ZONES[z] === windType[vals].Zona){
          wind_vals.push(windType[vals].Value);
          wind_tot += windType[vals].Value;
        }
      }
      drilldownWind.data = wind_vals;
      wind_avg = wind_tot/HOURS.length;
      series[1].data.push({name:ZONES[z], y:wind_avg, drilldown: ZONES[z]+'-Wind'});
      console.log(wind_tot);

      // Solar
      for(var vals in solarType){
        if(ZONES[z] === solarType[vals].Zona){
          solar_vals.push(solarType[vals].Value);
          solar_tot += solarType[vals].Value;
        }
      }
      drilldownSolar.data =
      solar_avg = solar_tot/HOURS.length;
      series[0].data.push({name:ZONES[z], y:solar_avg, drilldown: ZONES[z]+'-Wind'});
      console.log(solar_tot);
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
            <DropOption
            value={this.state.selection.value}
             label="Options"
             style={{color: '#ffffff'}}
             data={this.state.options}
             onChangeText={selection => this.setState({selection})}
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
