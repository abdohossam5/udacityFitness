import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {Ionicons, FontAwesome} from '@expo/vector-icons';
import AddEntry from './components/AddEntry';
import History from './components/History';
import EntryDetail from './components/EntryDetail';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers'
import { StackNavigator, TabNavigator } from 'react-navigation';
import {red, orange, blue,lightPurple, pink, purple, white} from './utils/colors';
import {Constants} from 'expo';

const store = createStore(reducer);

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={{backgroundColor:backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const Tabs = TabNavigator({
    History: {
        screen: History,
        navigationOptions: {
            tabBarLabel: 'History',
            tabBarIcon: ({tintColor}) => <FontAwesome name="bookmark" color={tintColor} size={30} />
        }
    },
    AddEntry:{
        screen: AddEntry,
        navigationOptions: {
            tabBarLabel: 'Add Entry',
            tabBarIcon: ({tintColor}) => <Ionicons name="ios-add" color={tintColor} size={30} />
        }
    }
}, {
    navigationOptions:{header: null},
    animationEnabled: true,
    tabBarOptions:{
        activeTintColor: purple,
        style:{
            height: 56,
            backgroundColor: white,
            shadowColor: 'rgba(0,0,0,0.24)',
            shadowRadius: 5,
            shadowOpacity: 1,
            shadowOffset:{
                width: 0,
                height:3
            }
        }
    }
});

const MainNavigator = StackNavigator({
   Home: {
       screen: Tabs
   },
    EntryDetail: {
       screen: EntryDetail,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.entryId}`,
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple
            }
        }),
    }
});

export default class App extends React.Component {
    render() {
        return (
          <Provider store={store}>
              <View style={styles.mainContainer}>
                  <MyStatusBar backgroundColor={purple} barStyle="light-content"/>
                  <MainNavigator/>
              </View>
          </Provider>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer:{flex:1}
});