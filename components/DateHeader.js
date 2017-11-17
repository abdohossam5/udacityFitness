import React from 'react';
import { View, Text} from 'react-native';


export const DateHeader = ({date}) => {

  return (
    <View>
      <Text>{date}</Text>
    </View>
  )
}