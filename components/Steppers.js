import React from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import {red, blue, white, gray} from '../utils/colors';
import {FontAwesome} from '@expo/vector-icons'


export const Steppers = (props) => {

    const {name, onIncrement, onDecrement, value} = props;

    return (
      <View style={styles.container}>
          <View>
              <Text> {name} </Text>
              <TouchableOpacity style={styles.btn_dec} onPress={onDecrement}>
                  <FontAwesome name="minus" color={"black"} size={30}/>
              </TouchableOpacity>
              <Text color={gray}> {value} </Text>
              <TouchableOpacity style={styles.btn_inc} onPress={onIncrement}>
                  <FontAwesome name="plus" color={"black"} size={30}/>
              </TouchableOpacity>
          </View>

      </View>
    )
};

const styles = {
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
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