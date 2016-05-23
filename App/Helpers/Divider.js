import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

import Constants from '../Utils/Constants';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.THEME_DARK_BLUE,
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 7,
  },
  text: {
    color: '#FFF',
    fontSize: 16,
  }
});

export default class Divider extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
};
