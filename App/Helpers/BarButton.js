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
  barButton: {
    flexDirection: 'row',
    backgroundColor: Constants.THEME_DARK_BLUE,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  barButtonIcon: {
    fontSize: 16,
    marginRight: 10,
    color: '#FFF'
  },
  barButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center'
  }
});

export default class BarButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor='#A53230'
        onPress={this.props.onPress}>
        <View style={styles.barButton}>
          {this.props.icon ? (
            <Icon style={styles.barButtonIcon} name={this.props.icon} />
          ) : <View />}
          <Text style={styles.barButtonText}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
};

BarButton.propTypes = {
  icon: React.PropTypes.string,
  text: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func.isRequired
};
