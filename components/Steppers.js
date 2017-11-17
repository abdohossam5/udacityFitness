import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import {red, blue, white, gray} from '../utils/colors';


export const Steppers = (props) => {

  const {name, onIncrement, onDecrement, value} = props;

  return (
    <View style={styles.container}>
      <Text> {name} </Text>
      <TouchableOpacity style={styles.btn_dec} onPress={onDecrement} >
        <Text style={{color: white}}>-</Text>
      </TouchableOpacity>
      <Text color={gray}> {value} </Text>
      <TouchableOpacity style={styles.btn_inc} onPress={onIncrement} >
        <Text style={{color: white}}>+</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = {
  container: {
    width:200,
    display: 'flex',
    flexDirection: 'row'
  },
  btn_inc: {
    width: 50,
    height: 50,
    backgroundColor: blue
  },
  btn_dec: {
    width: 50,
    height: 50,
    backgroundColor: red
  }
};