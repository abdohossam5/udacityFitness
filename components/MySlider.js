import React from 'react';
import { View, Text, Slider } from 'react-native';



export const MySlider = (props) => {

  const {name, value, onChange, maximumValue, step} = props;

  return (
    <View>
      <Text> {name} </Text>
      <Slider
        minimumValue={0}
        maximumValue={maximumValue}
        onSlidingComplete={onChange}
        value={value}
        step={step}
      />
      <Text>{value}</Text>
    </View>
  )
};