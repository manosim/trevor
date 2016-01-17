import React from 'react-native';

import Constants from '../Utils/Constants';

var {
  StyleSheet,
  Text,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: Constants.THEME_DARK_BLUE,
    color: '#FFF',
    fontSize: 16
  }
});

export default class Divider extends React.Component {
  render() {
    return (
      <Text style={styles.container}>{this.props.text}</Text>
    );
  }
};
