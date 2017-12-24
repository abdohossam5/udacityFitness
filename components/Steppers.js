import React from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {red, blue, white, gray, purple} from '../utils/colors';
import {FontAwesome} from '@expo/vector-icons'


export const Steppers = (props) => {

    const {onIncrement, onDecrement, value, unit} = props;

    return (
      <View style={[styles.container, {justifyContent: 'space-between'}]}>
          <View style={{flexDirection: 'row'}}>

              <TouchableOpacity
                onPress={onDecrement}
                style={[
                    Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn,
                    {borderBottomRightRadius: 0, borderTopRightRadius: 0}
                ]}
              >
                  <FontAwesome name="minus" color={
                      Platform.OS === 'ios' ? purple : white
                  } size={30}/>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onIncrement}
                style={[
                    Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn,
                    {borderBottomLeftRadius: 0, borderTopLeftRadius: 0}
                ]}
              >
                  <FontAwesome name="plus" color={
                      Platform.OS === 'ios' ? purple : white
                  } size={30}/>
              </TouchableOpacity>

          </View>

          <View style={styles.metrics}>
              <Text style={{fontSize: 24}}>{value}</Text>
              <Text style={{fontSize: 12, color: gray}}>{unit}</Text>
          </View>

      </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    iosBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: purple,
        borderRadius: 5,
        padding: 5,
        paddingLeft: 25,
        paddingRight: 25,
    },
    androidBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: purple,
        margin: 5,
        padding: 10,
    },
    metrics: {
        width: 85,
        justifyContent: 'center',
        alignItems: 'center'
    }
});