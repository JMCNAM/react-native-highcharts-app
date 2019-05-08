import React, { Component } from 'react';
import { View } from 'react-native';
import ChartView from 'native-highcharts-wrapper';
//import Highcharts from 'highcharts/highcharts.src.js';
//import drilldown from 'highcharts/modules/drilldown.src.js';
import MyChart from './MyChart';
//drilldown(Highcharts);

export default class DrillChart extends Component {
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
        <ChartView style={{height:"90%"}} config={conf}/>
      </View>
    );
  }
}
const styles = {
  container: {
    flex:1
  },
}
