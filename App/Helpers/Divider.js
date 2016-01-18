import React from 'react-native';

import Constants from '../Utils/Constants';

var {
  StyleSheet,
  Text,
  View
} = React;

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

export default class Divider extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
};
