import React from 'react-native';

import Constants from '../Utils/Constants';

var {
  StyleSheet,
  Text,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  loginButton: {
    height: 40,
    justifyContent: 'center',
    backgroundColor: Constants.THEME_BLUE,
    margin: 10,
  },
  loginButtonText: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: 'white',
    textAlign: 'center'
  }
});

export default class LoginButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.loginButton}
        underlayColor={Constants.THEME_DARK_BLUE}
        onPress={this.props.onPress}>
        <Text style={styles.loginButtonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
};

LoginButton.propTypes = {
  text: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func.isRequired
};
