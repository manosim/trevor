import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import Icon from 'react-native-vector-icons/FontAwesome';

import Constants from '../Utils/Constants';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

var styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
    paddingVertical: 10,
    margin: 10,
    backgroundColor: Constants.THEME_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  loginButtonText: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: 'white',
    textAlign: 'center'
  },
  buttonIcon: {
    fontSize: 16,
    marginRight: 5,
    color: '#FFF'
  }
});

export default class LoginButton extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor={Constants.THEME_DARK_BLUE}
        onPress={this.props.onPress}>
        <View style={styles.buttonWrapper}>
          <Icon style={styles.buttonIcon} name="github" />
          <Text style={styles.loginButtonText}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
};
