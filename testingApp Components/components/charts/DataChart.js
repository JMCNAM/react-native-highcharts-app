import React, { Component } from 'react';
import { View } from 'react-native';
import ChartView from 'react-native-highcharts';

export default class DataChart extends Component {

  constructor(props){
    super(props);
    console.log('CHART CONSTRUCTOR:');
    this.state = {
      data: this.props.data,
      series: [],
      selection: this.props.selection,
    };
    console.log("props=>");
    console.log(this.props);
    console.log("state=>");
    console.log(this.state);
  }
  componentDidMount(props){
    console.log('CHART DID MOUNT:');
    console.log(this.props);
    console.log(this.state);
    this.setState({data:this.props.data}, () => {
      console.log("chart data updated by did:", this.state)
    })
    this.setState({selection:this.props.selection}, () => {
      console.log("chart selection updated by did:", this.state)
    })
    // Set data and selection from props.
    var raw_data = this.props.data;
    var selection = this.props.selection;
    // console.log(selection);
    // console.log(raw_data);
    var series = [];
    for(var row in raw_data){
      var h = raw_data[row].Hour;
      // console.log(raw_data[row].Hour+" "+raw_data[row][selection]);
      for(var element in raw_data[row]){
        if(element === selection){
          var d = raw_data[row][selection];
          // console.log(d);
        }
      }
      series.push([h, d]);
    }
    //console.log(series);
    this.setState({series: series}, () => {
      console.log("chart series updated by did:", this.state)
    });
    console.log(this.state.series);
  }

  componentWillUpdate(){
    console.log("CHART DID UPDATE:");

    console.log(this.state);
  }

  render() {
    console.log('RENDERING CHART:');
    console.log(this.state);
/*
    // Set data and selection from props.
    var raw_data = this.props.data;
//    console.log(raw_data);
    var selection = this.props.selection;
//    console.log(selection);
    // Data arrays for chart data.
    var yData = [];
    var xData = [];
  S  var data_points = [];
    // Put selected data in arrays.
    for(var row in raw_data){
      for(var element in raw_data[row]){
        if(element === "Hour"){
          yData.push(raw_data[row].Hour);
        }
        if(element === selection){
          var d = raw_data[row][selection];
          console.log(d);
          xData.push(raw_data[row][selection]);
        }
      }
    }
    // Combine chart data for plotting.
    for(var i=0; i<xData.length; i++){
      data_points.push([yData[i], xData[i]])
    }
*/
    var Highcharts='Highcharts';
    var conf={
        chart: {
            type: 'line',
            marginBottom: 100,
        },
        title: {
            text: this.state.selection,
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
            name: 'Pirces per Hour',
            data: this.state.series,
        }]
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
