import React, {Component} from 'react';
import {View, ScrollView, Text, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import {
    getMetricMetaInfo,
    timeToString,
    getDailyReminderValue,
    clearLocalNotification,
    setLocalNotification
} from '../utils/helpers';
import {MySlider} from './MySlider';
import {Steppers} from './Steppers';
import {DateHeader} from './DateHeader';
import { white, purple} from '../utils/colors';
import TextButton from './TextButton';
import {SimpleLineIcons} from '@expo/vector-icons';
import {removeEntry, submitEntry} from "../utils/api"
import {connect} from 'react-redux';
import {addEntry} from "../actions/index";
import {NavigationActions} from 'react-navigation';


class AddEntry extends Component {

    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0
    };

    increment(key) {
        const {max, step} = getMetricMetaInfo(key);
        const value = this.state[key] + step;
        this.setState({
            [key]: value <= max ? value : max
        })
    }

    decrement(key) {
        const {step} = getMetricMetaInfo(key);
        const value = this.state[key] - step;
        this.setState({
            [key]: value >= 0 ? value : 0
        })
    }

    slide(key, value) {
        this.setState({
            [key]: value
        })
    }

    submit() {
        const key = timeToString();
        const entry = this.state;
        submitEntry({key, entry});
        this.props.addEntry({[key]: entry});
        this.toHome();
        clearLocalNotification().then(setLocalNotification)
    }

    reset = () => {
        const key = timeToString();
        removeEntry(key);
        this.props.addEntry({
            [key]: getDailyReminderValue()
        });
        this.toHome();
    };

    toHome(){
        this.props.navigation.dispatch(NavigationActions.back({
            key: 'AddEntry'
        }))
    }

    render() {
        const metaInfo = getMetricMetaInfo();


        if (this.props.alreadyLogged) {
            return (
              <View style={styles.center}>
                  <SimpleLineIcons name="emotsmile" color="black" size={100}/>
                  <Text style={{padding: 10}}>You already logged your data for today</Text>
                  <TextButton onPress={this.reset} style="reset">
                      Reset
                  </TextButton>
              </View>
            )
        }

        return (
          <ScrollView style={styles.container}>

              <DateHeader date={(new Date()).toLocaleDateString()}/>

              {Object.keys(this.state).map(key => {
                  const value = this.state[key];

                  return (
                    <View key={key} style={styles.row}>
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

              <View >
                  <TouchableOpacity
                    onPress={() => this.submit()}
                    style={[styles.iosSubmitBtn, Platform.OS === 'android' && styles.androidSubmitBtn]}
                  >
                      <Text style={styles.submitBtnText} >SUBMIT</Text>
                  </TouchableOpacity>
              </View>
          </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 20,
        backgroundColor: white
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        marginBottom: 20
    },
    iosSubmitBtn:{
        backgroundColor: purple,
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 30,
        borderRadius: 8
    },
    androidSubmitBtn:{
        alignSelf: 'flex-end',
        marginRight: 20,
        width: 150,
        height: 45,
        borderRadius: 2
    },
    submitBtnText: {
        color: white,
        fontSize: 22

    },
    center: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 40,
        marginLeft: 40
    }
});

const mapStateToProps = (state) => {
    const key = timeToString();
    return {
        alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }
};

const mapDispatchToProps = (dispatch) => ({
    addEntry: (entry) => dispatch(addEntry(entry))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEntry)