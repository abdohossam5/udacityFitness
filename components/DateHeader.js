import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {purple} from '../utils/colors';


export const DateHeader = ({date}) => {

  return (
    <View>
      <Text style={{fontSize: 20, color: purple}}>{date}</Text>
    </View>
  )
};

