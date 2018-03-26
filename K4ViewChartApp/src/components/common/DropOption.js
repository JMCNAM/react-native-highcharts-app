import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Card, CardSection } from './index.js'

const DropOptions = ({label,onChangeText,selection, data,itemCount})=>{
  const { containerStyle, textStyle } = styles;
    return(
      <View style={containerStyle}>
        <Dropdown
          data={data}
          label={label}
          style={textStyle}
          itemCount={itemCount}
          onChangeText={onChangeText}
        >
        </Dropdown>
      </View>
    );
};
const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textStyle: {
    alignSelf: 'center',
    color: '#000',
  },
};
export { DropOptions };
