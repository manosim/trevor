import React from 'react-native';
import Routes from './Routes';
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
  _goComposer() {
    const route = Routes.example({

    });
    this.props.navigator.push(route);
  }

  render() {
    // FIXME
    return <View />;

    if (this.props.route.id === 'compose-view') {
      return <View />;
    }

    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.toolbarButton}
          underlayColor={Constants.LIGHT_GRAY}
          onPress={this._goComposer.bind(this)}>
          <Icon name="pencil-square-o" style={styles.icon} />
        </TouchableHighlight>
      </View>
    );
  }
}
