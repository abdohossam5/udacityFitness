import React, {Component} from 'react';
import {View, ScrollView, Text, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import {getMetricMetaInfo, timeToString, getDailyReminderValue} from '../utils/helpers';
import {connect} from 'react-redux';
import {fetchCalendar} from '../utils/api';
import {receiveEntries} from '../actions';
import UdaciFitnessCalendar from 'udacifitness-calendar';

class History extends Component {

    componentDidMount(){
        fetchCalendar().then(entries => {
            if(!entries[timeToString()]){
                entries[timeToString()] = getDailyReminderValue()
            }
            this.props.dispatch(receiveEntries(entries))
        })
    }

    renderItem = ({today, ...metrics}, formattedDate, key) => (
      <View>
          {today
            ? <Text> { JSON.stringify(today) } </Text>
            : <Text> { JSON.stringify(metrics) } </Text>}
      </View>
    );

    renderEmptyDate(formattedDate){
        return (
          <View>
              <Text> No DATA </Text>
          </View>
        )
    }


    render(){
        const {entries} = this.props;
        return (
         <UdaciFitnessCalendar
           items={entries}
           renderItem={this.renderItem}
           renderEmptyDate={this.renderEmptyDate}
         />
        )
    }
}
const mapStateToProps = (entries) => ({
    entries
});
export default connect(mapStateToProps)(History)