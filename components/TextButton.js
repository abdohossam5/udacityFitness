import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { purple} from '../utils/colors';

export default function TextButton ({children, onPress, style}) {
    return (
          <TouchableOpacity onPress={onPress}>
              <Text style={styles[style]}>
                  {children}
              </Text>
          </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
   reset:{
       textAlign: 'center',
       color: purple
   },
    resetBtn: {
        flexDirection: 'row',
        alignSelf: 'center',
        margin:20
    }
});