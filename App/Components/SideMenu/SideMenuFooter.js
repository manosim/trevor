import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 25
  },
  buttonGitHub: {
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 10,
  },
  buttonGitHubText: {
    color: '#FFF',
    textAlign: 'center'
  }
});

export default class SideMenuFooter extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => {}}
          style={styles.buttonGitHub}>
          <Text style={styles.buttonGitHubText}>View on GitHub</Text>
        </TouchableHighlight>
      </View>
    );
  }
};
