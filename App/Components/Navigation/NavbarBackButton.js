import React from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import Constants from '../../Utils/Constants';

var {
  StyleSheet,
  TouchableHighlight,
  View,
} = React;

var styles = StyleSheet.create({
  container: {
    marginTop: 5,
    paddingHorizontal: 10
  },
  toolbarButton: {
    width: 80,
  },
  icon: {
    fontSize: Constants.NAVBAR_BUTTON_ICON_SIZE + 10,
    color: '#FFF'
  }
});

export default class NavigationButton extends React.Component {
  _goBack() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.toolbarButton}
          underlayColor={Constants.THEME_COLOR}
          onPress={this._goBack.bind(this)}>
          <Icon name="chevron-left" style={styles.icon} />
        </TouchableHighlight>
      </View>
    );
  }
}
