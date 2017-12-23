import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { getMetricMetaInfo, timeToString } from '../utils/helpers';
import { MySlider } from  './MySlider';
import { Steppers } from  './Steppers';
import { DateHeader } from  './DateHeader';
import {red, blue, white, gray} from '../utils/colors';
import TextButton from './TextButton';
import { SimpleLineIcons } from '@expo/vector-icons';
import {removeEntry, submitEntry} from "../utils/api"



export default class AddEntry extends Component {

  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  };

  increment(key){
    const {max, step} = getMetricMetaInfo(key);
    const value = this.state[key] + step;
    this.setState({
      [key]: value <= max ? value :  max
    })
  }

  decrement(key){
    const {step} = getMetricMetaInfo(key);
    const value = this.state[key] - step;
    this.setState({
      [key]: value >= 0 ? value :  0
    })
  }

  slide(key, value){
    this.setState({
      [key]: value
    })
  }

  submit(){
    const key = timeToString();
    const entry = this.state;
    submitEntry({key, entry})
  }

  reset = () =>{
      const key = timeToString();
      removeEntry(key)
  };


    render() {
        const metaInfo = getMetricMetaInfo();


        if (this.props.alreadyLogged) {
            return (
              <View>
                <SimpleLineIcons name="emotsmile" color="black" size={32}/>
                <Text>You already logged your data for today</Text>
                <TextButton onPress={this.reset}>
                  Reset
                </TextButton>
              </View>
            )
        }

        return (
          <ScrollView>

            <DateHeader date={(new Date()).toLocaleDateString()}/>

              {Object.keys(this.state).map(key => {
                  const value = this.state[key];

                  return (
                    <View key={key}>
                        {metaInfo[key].getIcon()}
                        {metaInfo[key].type === 'slider' ? (
                          <MySlider
                            name={key}
                            maximumValue={metaInfo[key].max}
                            value={value}
                            onChange={(value) => this.slide(key, value)}
                            step={metaInfo[key].step}
                            unit={metaInfo[key].unit}
                          />
                        ) : (
                          <Steppers
                            name={key}
                            value={value}
                            onIncrement={() => this.increment(key)}
                            onDecrement={() => this.decrement(key)}
                            unit={metaInfo[key].unit}
                          />
                        )}
                    </View>
                  )
              })}

            <TouchableOpacity onPress={() => this.submit()}>
              <Text style={{
                  backgroundColor: blue,
                  width: 100,
                  padding: 10
              }}>SUBMIT</Text>
            </TouchableOpacity>
          </ScrollView>
        )
    }

}