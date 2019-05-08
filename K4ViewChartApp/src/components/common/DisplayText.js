import React, {Component} from 'react';
import { Text, View } from 'react-native';

const DisplayText = ( props ) => {
  const { containerStyle, textStyle } = styles;
  return(

    <View style={containerStyle}>
      <Text>
        {props.children}
        </Text>
    </View>
  );
};
const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
  },
};

export { DisplayText };
