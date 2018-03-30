import React, { Component } from 'react';
import { View } from 'react-native';
import ChartView from 'react-native-highcharts';

const AreaChart = (props) => {
  console.log("CHART COMPONENT");
  console.log(props);
    var conf={
        chart: {
            type: 'area',
            marginBottom: 100,
        },
        title: {
            text: "Power : Zonal (NORD)",
            style: {color: "#333333",
                    fontSize: "20px"}
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
// Series data set by props.
    series: [{
        name: 'Power Houly Prices',
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
    flex:1,
    flexGrow: 1
    },
    }
export { AreaChart };