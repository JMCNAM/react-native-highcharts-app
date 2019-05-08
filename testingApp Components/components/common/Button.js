import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Button = ({onPress, children}) => {
  const {buttonStyle, textStyle} = styles; // Destructuring styles.
  return (
      <TouchableOpacity onPress={onPress} style={buttonStyle}>
        <Text style={textStyle}>
          {children}
        </Text>
      </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    width:50,
    height:50,
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:30,
    marginRight:30,
    backgroundColor:'#00BCD4',
    borderRadius:100,
    borderWidth: 1,
    borderColor: '#fff'
  },
  textStyle:{
      color:'#fff',
      textAlign:'center',
  }
}

export { Button };
