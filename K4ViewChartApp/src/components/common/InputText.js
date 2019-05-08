import React from 'react';
import { View, Text, TextInput } from 'react-native';

const InputText = ({ label, value, onChangeText, placeholder }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;
  return(
    <View style={containerStyle}>
      <Text>
        {label}
      </Text>
      <TextInput
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        autocorrect={false}>
        </TextInput>
    </View>
  );
};


const styles = {
  inputStyle:{
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
  },
  labelStyle:{
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
  },
  containerStyle:{
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }
}

export { InputText }
