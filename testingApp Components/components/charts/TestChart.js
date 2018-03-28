import React, { Component } from 'react';
import { View } from 'react-native';
import ChartView from 'react-native-highcharts';

export default class TestChart extends Component {

  render() {
    var Highcharts='Highcharts';
    var conf={
        chart: {
            type: 'spline',
            //marginRight: 10,
            marginBottom: 100,
        },
        title: {
            text: 'Test Chart',
            style: {
              color: "#333333",
              fontSize: "20px"
            }
          },
        xAxis: {
            title: {
              text: 'Continuous Variable',
            },
            type: 'X-Axis',
            tickInterval: 2,
            lineColor: "#092938",
        },
        yAxis: {
            title: {
                text: 'Value'
            },
        },
        exporting: {
            enabled: false
        },
        series: [
          {
            type: 'column',
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
          },
          {
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4].reverse()
          }]
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
