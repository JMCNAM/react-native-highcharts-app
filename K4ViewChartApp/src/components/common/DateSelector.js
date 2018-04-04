import React, {Component} from 'react';
import { Text, View } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { Card, CardSection } from './index.js'

class DateSelector extends Component {
  constructor(props){
    super(props)
    this.state = {
        date: this.props.date,
        minDate: this.props.minDate,
        maxDate: this.props.maxDate,
      }
  }

  render(){
    console.log(this.props);
    return(
      <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate= {this.props.minDate}
        maxDate= {this.props.maxDate}
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
            marginLeft: 36,
          },
          placeholderText: {
                      fontSize: 18,
                      color: 'white'
                  },
         dateText:{
          color: 'white',
          fontSize: 18,
        }

        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
    );
  }
}

export { DateSelector };
