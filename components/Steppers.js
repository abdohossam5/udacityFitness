import React from 'react';
import { View, Text, Button } from 'react-native';


export const Steppers = (props) => {

  const {name, onIncrement, onDecrement, value} = props;

  return (
    <View>
      <Text> {name} </Text>
      <Button onPress={onIncrement} title="+"/>
      <Text> {value} </Text>
      <Button onPress={onDecrement} title="-"/>
    </View>
  )
};