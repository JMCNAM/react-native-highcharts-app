import React, {Component} from 'react';
import { Text, View } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { Card, CardSection } from './index.js'

class DateSelector extends Component {
  constructor(props){
    super(props)
    this.state = {
        date: "",
        minDate: this.props.minDate,
        maxDate: this.props.maxDate,
      }
  }

  render(){
    return(
      <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate= { this.state.minDate } // "2018-03-20"
        maxDate= { this.state.maxDate } // "2018-03-27"
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
