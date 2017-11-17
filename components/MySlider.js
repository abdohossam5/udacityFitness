import React from 'react';
import { View, Text, Slider } from 'react-native';



export const MySlider = (props) => {

  const {name, value, onChange, maximumValue, step, unit} = props;

  return (
    <View>
      <Text> {name} </Text>
      <Slider
        minimumValue={0}
        maximumValue={maximumValue}
        onValueChange={onChange}
        value={value}
        step={step}
      />
      <Text>{value}</Text>
      <Text>{unit}</Text>
    </View>
  )
};