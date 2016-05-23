import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

import {
  StyleSheet,
  View,
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 2,
    backgroundColor: '#e9e9e9'
  }
});

export default class Separator extends Component {
  render() {
    return (
      <View style={styles.container} />
    );
  }
};
