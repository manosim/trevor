import React from 'react-native';

var {
  StyleSheet,
  Text,
  TouchableHighlight,
} = React;

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#40454F',
    height: 45
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    paddingVertical: 12,
    alignSelf: 'center'
  }
});

import LatestProRepos from '../Components/LatestProRepos';

export default class Footer extends React.Component {
  pressButton() {
    this.props.navigator.push({
      title: 'Latest Builds',
      component: LatestProRepos
    });
  }

  render() {
    return (
      <TouchableHighlight
        style={styles.container}
        underlayColor='#A53230'
        onPress={this.pressButton.bind(this)}>
          <Text style={styles.buttonText}>Latest Builds for Travis Pro</Text>
      </TouchableHighlight>
    );
  }
};
