import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

import Constants from '../Utils/Constants';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Constants.THEME_DARK_BLUE
  }
});

export default class Menu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is a menu.</Text>
      </View>
    );
  }
};
