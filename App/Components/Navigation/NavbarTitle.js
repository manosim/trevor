import React from 'react-native';

var {
  StyleSheet,
  Text,
  View,
} = React;

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 10
  },
  title: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    color: '#FFF'
  }
});

export default class NavigationTitle extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.route.title}</Text>
      </View>
    );
  }
}
