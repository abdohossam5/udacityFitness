import React, {Component} from 'react';
import {View, ScrollView, Text, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import {getMetricMetaInfo, timeToString, getDailyReminderValue} from '../utils/helpers';
import {connect} from 'react-redux';
import {fetchCalendar} from '../utils/api';
import {receiveEntries} from '../actions';
import UdaciFitnessCalendar from 'udacifitness-calendar';
import {white} from "../utils/colors";
import {DateHeader} from './DateHeader';
import MetricCard from './MetricCard';
import {AppLoading} from 'expo'

class History extends Component {
    state = {
        ready: false
    }

    componentDidMount(){
        fetchCalendar().then(entries => {
            if(!entries[timeToString()]){
                entries[timeToString()] = getDailyReminderValue()
            }
            this.props.dispatch(receiveEntries(entries))
        }).then(() => this.setState({ready:true}))
    }

    renderItem = ({today, ...metrics}, formattedDate, key) => (
      <View style={styles.item}>
          {today
            ? (
              <View>
                  <DateHeader date={formattedDate}/>
                  <Text style={styles.noDataTxt}>
                      {today}
                  </Text>
              </View>
            )
            :(
              <TouchableOpacity onPress={() => this.props.navigation.navigate(
                'EntryDetail', {entryId: key}
              )}>
              <MetricCard date={formattedDate} metrics={metrics}/>
              </TouchableOpacity>
            )
          }
      </View>
    );

    renderEmptyDate(formattedDate){
        return (
          <View style={styles.item}>
              <DateHeader date={formattedDate}/>
              <Text style={styles.noDataTxt}>You haven't logged any data for that day </Text>
          </View>
        )
    }


    render(){
        const {entries} = this.props;
        const {ready} = this.state;
        if(!ready){
            return (
              <AppLoading/>
            )
        }
        return (
         <UdaciFitnessCalendar
           items={entries}
           renderItem={this.renderItem}
           renderEmptyDate={this.renderEmptyDate}
         />
        )
    }
}


const styles = StyleSheet.create({
    item: {
        padding: 20,
        justifyContent: 'center',
        backgroundColor: white,
        borderRadius: 16,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowRadius: 5,
        shadowOpacity: 0.8,
        shadowOffset:{
            width: 0,
            height:3
        }
    },
    noDataTxt: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20
    }
});

const mapStateToProps = (entries) => ({
    entries
});
export default connect(mapStateToProps)(History)