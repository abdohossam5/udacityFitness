import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {red, orange, blue,lightPurple, pink, purple, white} from '../utils/colors';
import MetricCard from './MetricCard';
import {addEntry} from '../actions';
import {removeEntry} from '../utils/api';
import TextButton from './TextButton';
import {timeToString, getDailyReminderValue} from '../utils/helpers';

class EntryDetail extends Component {

    reset = () => {
        const {remove, goBack} = this.props;
        remove();
        goBack()
    };

    shouldComponentUpdate(nextProps){
        return nextProps.metrics !== null && !nextProps.metrics.today
    }

    render () {
        return (
          <View style={styles.container}>
              <MetricCard metrics={this.props.metrics}/>
              <TextButton style="resetBtn" onPress={this.reset} >
                  Reset
              </TextButton>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 20
    },
});

const mapStateToProps = (entries, {navigation}) => {
  const key = navigation.state.params.entryId;
  return{
      metrics: entries[key]
  }
};

const mapDispatchToProps = (dispatch, {navigation}) => {
    const key = navigation.state.params.entryId;
    return {
        remove: () => {
            dispatch(addEntry({
                [key]:  timeToString() === key ?
                  getDailyReminderValue() :
                  null
            }));
            removeEntry(key)
        },
        goBack: () => navigation.goBack()
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);