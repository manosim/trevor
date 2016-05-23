import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import Icon from 'react-native-vector-icons/Octicons';
import Constants from '../Utils/Constants';

import {
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  toolbarButton: {
    paddingHorizontal: 10,
  },
  icon: {
    fontSize: Constants.NAVBAR_BUTTON_ICON_SIZE,
    color: '#FFF'
  }
});

export default class NavigationButton extends Component {
  static contextTypes = {
    drawer: React.PropTypes.object
  }

  _goBack() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.toolbarButton}
          underlayColor={Constants.THEME_COLOR}
          onPress={this.context.drawer.toggle}>
          <Icon name="three-bars" style={styles.icon} />
        </TouchableHighlight>

        {/*
        <TouchableHighlight
          style={styles.toolbarButton}
          underlayColor={Constants.THEME_COLOR}
          onPress={this._goBack.bind(this)}>
          <Icon name="angle-left" style={styles.icon} />
        </TouchableHighlight>
        */}
      </View>
    );
  }
}
