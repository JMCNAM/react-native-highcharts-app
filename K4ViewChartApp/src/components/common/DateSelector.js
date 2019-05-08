import React, {Component} from 'react';
import { Text, View } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { Card, CardSection } from './index.js'

class DateSelector extends Component {
  constructor(props){
    super(props)
    this.state = {
        date: "",
      }
  }

  render(){
    console.log("RENDERING DATESELECTOR");
    return(
      <DatePicker
        style={{width: 200}}
        date={this.props.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
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
          }
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
    );
  }
}

export { DateSelector };
