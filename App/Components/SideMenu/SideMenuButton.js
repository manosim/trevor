import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import Icon from 'react-native-vector-icons/Octicons';

import Constants from '../../Utils/Constants';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.THEME_DARK_BLUE,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    fontSize: 18,
    color: '#FFF',
    width: 25
  },
  text: {
    fontSize: 16,
    color: '#FFF'
  }
});

export default class SideMenuButton extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  }

  render() {
    return (
      <TouchableHighlight
        style={styles.container}
        onPress={() => {}}>
        <View style={styles.buttonContent}>
          <Icon style={styles.icon} name={this.props.icon} />
          <Text style={styles.text}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
};
