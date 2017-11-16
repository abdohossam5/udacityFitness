import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { getMetricMetaInfo } from '../utils/helpers';
import { MySlider } from  './MySlider';
import { Steppers } from  './Steppers';


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


  render(){

    return (
      <View>
        {Object.keys(this.state).map(key => {
          const value = this.state[key];
          const metaInfo = getMetricMetaInfo(key);

          return (
            <View key={key}>
              {metaInfo.getIcon()}
              {metaInfo.type === 'slider'? (
                <MySlider
                  name={key}
                  maximumValue = {metaInfo.max}
                  value={value}
                  onChange={(value) => this.slide(key, value)}
                  step={metaInfo.step}
                />
              ) :(
                <Steppers
                  name={key}
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                />
              )}
            </View>
          )
        })}
      </View>
    )
  }
}