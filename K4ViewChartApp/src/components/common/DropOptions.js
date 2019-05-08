import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Card, CardSection } from './index.js'

const DropOptions = ({label,onChangeText,selection, data,itemCount})=>{
  const { containerStyle, textStyle } = styles;
    return(
      <View style={containerStyle}>
        <Dropdown
          label={label}
          onChangeText={onChangeText}
          data={data}
          itemCount={itemCount}
          style={textStyle}
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
    color: '#ffffff',


  },
};
export { DropOptions };
