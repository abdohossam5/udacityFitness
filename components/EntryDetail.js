import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {red, orange, blue,lightPurple, pink, purple, white} from '../utils/colors';
import MetricCard from './MetricCard';

class EntryDetail extends Component {

    render () {
        return (
          <View style={styles.container}>
              <MetricCard metrics={this.props.metrics}/>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 20
    }
});

const mapStateToProps = (entries, {navigation}) => {
  const key = navigation.state.params.entryId;
  return{
      metrics: entries[key]
  }
};

export default connect(mapStateToProps)(EntryDetail);