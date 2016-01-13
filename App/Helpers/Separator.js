import React from 'react-native';

var {
  StyleSheet,
  View,
} = React;

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 2,
    backgroundColor: '#e9e9e9'
  }
});

export default class Separator extends React.Component {
  render() {
    return (
      <View style={styles.container} />
    );
  }
};
