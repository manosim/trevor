import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars

import Constants from '../Utils/Constants';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 7,
  },
  themeBlue: { //eslint-disable-line react-native/no-unused-styles
    backgroundColor: Constants.THEME_DARK_BLUE,
  },
  themeRed: { //eslint-disable-line react-native/no-unused-styles
    backgroundColor: Constants.THEME_RED,
  },
  text: {
    color: '#FFF',
    fontSize: 16,
  }
});

export default class Divider extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    theme: PropTypes.string
  }

  static defaultProps = {
    theme: 'blue'
  };

  render() {
    const themeStyles = this.props.theme === 'blue' ? styles.themeBlue : styles.themeRed;

    return (
      <View style={[styles.container, themeStyles]}>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
};
