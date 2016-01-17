import React from 'react-native';

var {
  ActivityIndicatorIOS,
  StyleSheet,
  View
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default class LoadingPull extends React.Component {

  // FIXME:
  // Support Both Platforms

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicatorIOS
          animating={true}
          color="#357389" />
      </View>
    );
  }
};
