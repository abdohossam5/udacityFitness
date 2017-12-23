import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import AddEntry from './components/AddEntry';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers'

const store = createStore(reducer);

export default class App extends React.Component {
    render() {
        return (
          <Provider store={store}>
              <View>
                  <AddEntry/>
              </View>
          </Provider>
        );
    }
}
