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
