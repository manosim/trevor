import React from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Constants from '../Utils/Constants';

var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

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

export default class LoginButton extends React.Component {
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

LoginButton.propTypes = {
  text: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func.isRequired
};
