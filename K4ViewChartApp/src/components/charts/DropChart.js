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
              text: '',
          },
          xAxis: {
              tickInterval: 1,
              title: {
                  text: 'Hour',
              },
            },
          yAxis: {
              title: {
                  text: '€/MWh'
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
// Series data set by props.
        series: [{
            name: props.selection,
            data: props.series,
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
export { DropChart };
