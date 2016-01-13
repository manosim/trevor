import React from 'react-native';

var {
  Image,
  StyleSheet,
  Text,
  View
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 100,
    height: 100
  },
  text: {
    fontSize: 32,
    color: '#40454F',
    paddingVertical: 20,
    paddingHorizontal: 10,
    textAlign: 'center',

  }
});

export default class EmptyResults extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.icon}
          source={require('image!logo-circle-red')} />
        <Text style={styles.text}>Wow! Nothing to see here!</Text>
      </View>
    );
  }
};
