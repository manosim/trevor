import React from 'react-native';
import Settings from '../../Utils/Constants';

var {
  StyleSheet,
  View
} = React;

var styles = StyleSheet.create({
  scene: {
    flex: 1,
    marginTop: Settings.NAVBAR_HEIGHT - 6
  }
});

export default class SceneContainer extends React.Component {
  render() {
    var Component = this.props.route.component;

    return (
      <View style={styles.scene}>
        <Component
          navigator={this.props.navigator}
          currentRoute={this.props.route}
          {...this.props.route.passProps}
        />
      </View>
    );
  }
};
