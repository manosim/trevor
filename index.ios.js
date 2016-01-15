import _ from 'underscore';
import React from 'react-native';

var {
  AppRegistry,
  AsyncStorage,
  NavigatorIOS,
  StyleSheet,
} = React;

import AuthStore from './App/Stores/Auth';
import Dashboard from './App/Components/Dashboard';
import Loading from './App/Components/Loading';

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class Trevor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      isEitherLoggedIn: AuthStore.isEitherLoggedIn()
    };
  }

  componentDidMount() {
    var self = this;

    AuthStore.eventEmitter.addListener('authStateChanged', function () {
      self.setState({
        isEitherLoggedIn: AuthStore.isEitherLoggedIn()
      });
    });

    this._loadInitialState();
  }

  _loadInitialState() {
    var self = this;

    AsyncStorage.multiGet(['tokenOs', 'tokenPro']).then(function (pairs) {
      _.map(pairs, function (pair) {
        var key = pair[0];
        var value = pair[1];
        if (value) {
          AuthStore[key] = value;
        }
      });

      AuthStore.eventEmitter.emit('authStateChanged');

      self.setState({
        loaded: true
      });
    }).done();
  }

  render() {
    if (this.state.loaded) {
      return (
        <NavigatorIOS
          ref="nav"
          style={styles.container}
          barTintColor='#A53230'
          titleTextColor='#FFFFFF'
          tintColor='#FFFFFF'
          initialRoute={{
            title: 'Dashboard',
            component: Dashboard
          }} />
      );
    } else {
      return (<Loading text='Trevor' />);
    }
  }
};

AppRegistry.registerComponent('Trevor', () => Trevor);
