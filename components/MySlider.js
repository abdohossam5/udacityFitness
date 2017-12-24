import React from 'react';
import { View, Text, Slider, StyleSheet } from 'react-native';
import {red, blue, white, gray, purple} from '../utils/colors';


export const MySlider = (props) => {

  const {name, value, onChange, maximumValue, step, unit} = props;

  return (
    <View style={styles.row}>
        <Slider
          minimumValue={0}
          maximumValue={maximumValue}
          onValueChange={onChange}
          value={value}
          step={step}
          style={styles.slider}
        />
        <View style={styles.metrics}>
            <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
            <Text style={{fontSize: 12, color: gray}}>{unit}</Text>
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flex:1,

    },
    slider:{
        flex:1,
    },
    metrics: {
        width: 85,
        justifyContent: 'center',
        alignItems: 'center',
    }
});