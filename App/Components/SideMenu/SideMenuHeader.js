import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars

import {
  StyleSheet,
  Image,
  View
} from 'react-native';

var styles = StyleSheet.create({
  container: {

  },
  logo: {
    width: 50,
    height: 50,
    marginVertical: 30,
    alignSelf: 'center',
  }
});

export default class SideMenuFooter extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../../images/logo-circle-red.png')} />
      </View>
    );
  }
};
