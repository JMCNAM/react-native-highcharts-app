import React, { Component } from 'react';
import { View } from 'react-native';
import ChartView from 'native-highcharts-wrapper';
import Highcharts from 'highcharts';
import drilldown from 'highcharts/modules/drilldown.js';


export default class BarChart extends Component {
  state = {
    data: []
  };
  constructor(props){
    super(props);
  }
  render() {
    var Highcharts='Highcharts';

    var series = [];
    series.push({name: 'Solar', data: [{name: 'CNOR', y: 10, drilldown:'CNOR-Solar'}]});
    series.push({name: 'Wind', data:  [{name: 'CNOR', y: 10, drilldown:'CNOR-Wind'}]});
    series[0].data.push({name: 'NORD', y: 6, drilldown:'NORD-Solar'});
    series[1].data.push({name: 'NORD', y: 6, drilldown:'NORD-Wind'});
    var drilldownSeries = [{name: 'CNOR-Solar', id: 'CNOR-Solar' ,data: [['1', 4],['2', 2],['3', 1],['4', 2],['5', 1],['6', 4],['7', 2],['8', 1],['9', 2],['10', 1],['11', 4],['12', 2],['13', 1],['14', 2],['15', 1],['16', 4],['17', 2],['18', 1],['19', 2],['20', 5],['21', 3],['22', 9],['23', 6],['24', 5]]}];
    drilldownSeries.push({name: 'CNOR-Wind', id: 'CNOR-Wind' ,data: [['1', 4],['2', 2],['3', 1],['4', 2],['5', 1],['6', 4],['7', 2],['8', 1],['9', 2],['10', 1],['11', 4],['12', 2],['13', 1],['14', 2],['15', 1],['16', 4],['17', 2],['18', 1],['19', 2],['20', 5],['21', 3],['22', 9],['23', 6],['24', 5]]});

/*
    console.log("| - BarChart - |");
    // Set data and selection from props.
    var raw_data = this.props.data;
    // Data arrays for chart data.
    var Zones     = [];       // Stores all unique zone names.
    var windType  = [];       // Stores all row data of type wind.
    var solarType = [];       // Stores all row data of type solar.
    var Hours     = [];       // Stores all unique hour values.
    var plotData  = [];       // Stores {zone: name , windValues:[all], solarValues:[all]}
    var drilldownWind = [];
    var drilldownSolar = [];
    var drilldownSeries = [];
    var drill_str = "";
    // Iterate through table, pushing onto the above arrays.
    for (var row in raw_data){
      var zone = raw_data[row].Zona;
      if(Zones.indexOf(zone) == -1){
        Zones.push(zone);
        // Note, wind and solar values are not added here.
        plotData.push({"zone": raw_data[row].Zona,"windValues": [],"solarValues": []});

        drill_str = zone+'-Wind';
        drilldownWind.push({
            name: drill_str,
            id: drill_str,
            data: []
        });
        drill_str = zone+'-Solar';
        drilldownSolar.push({
            name: drill_str,
            id: drill_str,
            data: []
        });
      }
      var hr = raw_data[row].Hour;
      if(Hours.indexOf(hr) == -1){
        Hours.push(hr);
      }
      if( raw_data[row].Type === "EOLICO" ){
        windType.push(raw_data[row]);
       }else if (raw_data[row].Type === "FOTOVOLTAICO") {
        solarType.push(raw_data[row]);
      }
    }
    // Stores every value of each type, along with the zone.
    var zone_windVals = [];
    var zone_solarVals = [];
    var temp_str = "";
    // Iterate through rows of data.
    // For each row, iterate through Zones to find match.
    for (var row in windType){
      // Add data to the drilldown series.
      temp_str = windType[row].Zona+'-Wind';
      for(obj in drilldownWind){
          if(drilldownWind[obj].name === temp_str){
            drilldownWind[obj].data.push([windType[row].Hour ,windType[row].Value]);
          }
      }
      // Push the Zone name and type value onto array.
      for (var zn in Zones){
        if( Zones[zn] === windType[row].Zona ){
          zone_windVals.push([Zones[zn], windType[row].Value]);
        }
      }
    }
    // Repeat above for solar.
    for (var row in solarType){
      temp_str = windType[row].Zona+'-Solar';
      for(obj in drilldownSolar){
          if(drilldownSolar[obj].name === temp_str){
            drilldownSolar[obj].data.push([windType[row].Hour, solarType[row].Value]);
          }
      }
      for (var zn in Zones){
        if( Zones[zn] === solarType[row].Zona ){
          zone_solarVals.push([Zones[zn], solarType[row].Value]);
        }
      }
    }

    // Iterate through plotData, assigning zone value to var.
    for (var element in plotData){
      var zone = plotData[element].zone;
      // Iterate through all wind values, matching for zone.
      // If match, push the value into the wind array inside plotData.
      for (var entry in zone_windVals){
        if(zone_windVals[entry][0] === zone){
          plotData[element].windValues.push(zone_windVals[entry][1]);
        };
      }
    }
    // Repeat above for solar.
    for (var element in plotData){
      var zone = plotData[element].zone;
      for (var entry in zone_solarVals){
        if(zone_solarVals[entry][0] === zone){
          plotData[element].solarValues.push(zone_solarVals[entry][1]);
        };
      }
    }

    // Compute averages
    var series = [{name:'Solar', data:[]},{name:'Wind', data:[]}];
    for(var element in plotData){
      var win_sum = 0;
      var win_avg = 0;
      var sol_sum = 0;
      var sol_avg = 0;
      var zone;
      var win_data = [];
      var win_series = [];
      var sol_data = [];
      var sol_series = [];

      for (var i = 0; i < plotData[element].windValues.length; i++) {
        // Sum values for daily production.
        win_sum += plotData[element].windValues[i];
        sol_sum += plotData[element].solarValues[i];
        zone = plotData[element].zone;
      }

      // Calculate averages.
      win_avg = win_sum/Zones.length;
      sol_avg = sol_sum/Zones.length;
      //Push data into series array.
      series[0].data.push({name:zone, y:win_avg, drilldown: zone+'-Wind'});
      series[1].data.push({name:zone, y:sol_avg, drilldown: zone+'-Solar'});
    }
    // Combine two drilldown series into single series.
    for(var i = 0; i < drilldownWind.length; i++){
        drilldownSeries.push(drilldownWind[i],drilldownSolar[i]);
    }
*/
    console.log('| - SERIES - |');
    console.log(series);
    console.log('| - DRILLDOWN - |');
    console.log(drilldownSeries);
    console.log(Highcharts);
//    drilldown(Highcharts);
    var conf={
        chart: {
            type: 'column',
            marginRight: 10,
        },
        title: {
            text: "Renewable Production (daily avg.)",
            style: {color: "#333333",
                    fontSize: "20px"}
        },
        xAxis: {
            type: 'category',
            crosshair: true,
            lineColor: "#092938",
        },
        tooltip: {
            shared: true
        },
        yAxis: {
            title: {
                text: 'Average Production'
            },
        },
        exporting: {
            enabled: false
        },
        plotOptions:{
          series:{
            stacking: 'Normal'
          }
        },
        series: series,
        drilldown: {
          series: drilldownSeries
        }
    };
    return(
      <View style={styles.container}>
        <ChartView style={{height:"100%"}} config={conf}/>
      </View>
    );
  }
}
const styles = {
  container: {
    flex:1
  },
}
