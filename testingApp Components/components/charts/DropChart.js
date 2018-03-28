import React, { Component } from 'react';
import { View } from 'react-native';
import ChartView from 'react-native-highcharts';

const DropChart = (props) => {
  console.log("CHART COMPONENT");
  console.log(props);
  var conf={
      chart: {
          type: 'line',
          marginBottom: 100,
      },
      title: {
          text: props.selection,
          style: {
            color: "#333333",
            fontSize: "20px"
          }
      },
      xAxis: {
          tickInterval: 1,
          title: {
              text: 'Hour'
          },
        },
      yAxis: {
          title: {
              text: '€/MH'
          },
        },
      exporting: {
          enabled: false
      },
      plotOptions: {
        series: {
            color: "#617685",
            fillOpacity: 0.2
        }
  },
      series: [{
          name: 'Prices per Hour',
          data: props.series,
          selection: props.selection,
      }]
  };
    return(
      <View style={styles.container}>
        <ChartView style={{height:"90%"}} config={conf}/>
      </View>
    );
  }
const styles = {
  container: {
    flex:1
  },
}
export {DropChart};
