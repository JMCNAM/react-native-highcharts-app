import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Card, CardSection } from './index.js'

const DropOption = ({label,onChangeText,selection, data,itemCount})=>{
  const { containerStyle, textStyle } = styles;
    return(
      <View style={containerStyle}>
        <Dropdown
          data={data}
          label={label}
          style={textStyle}
          itemCount={itemCount}
          onChangeText={onChangeText}
          textColor='white'
          placeholderTextColor='white'
        >
        </Dropdown>
      </View>
    );
};
const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: "#092938",
  },
  textStyle: {
    alignSelf: 'center',
    color: 'white',
  },
  label: {
    color: 'white',
    fontSize: 15,
  }
};
export { DropOption };
