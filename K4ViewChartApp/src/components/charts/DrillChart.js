import React, { Component } from 'react';
import { View } from 'react-native';
import ChartView from 'native-highcharts-wrapper';

const DrillChart = (props) => {
  console.log("CHART COMPONENT");
  console.log(props);
  // Decalre Highcharts variable
  var Highcharts='Highcharts';
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
//
      series: props.series,
      drilldown: {
        series: props.drilldownSeries
      }
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
export { DrillChart };
