import _ from 'underscore';
import React from 'react-native';

var {
  AppRegistry,
  AsyncStorage,
  Navigator,
  StyleSheet,
  View
} = React;

import AuthStore from './App/Stores/Auth';
import Loading from './App/Components/Loading';
import RouteMapper from './App/Components/Navigation/RouteMapper';
import Routes from './App/Components/Navigation/Routes';
import SceneContainer from './App/Components/Navigation/SceneContainer';
import Constants from './App/Utils/Constants';

var styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  navbar: {
    backgroundColor: Constants.THEME_COLOR,
    flexDirection:'row',
    justifyContent: 'center',
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

  renderScene(route, navigator) {
    return (
      <SceneContainer
        title={route.title}
        route={route}
        navigator={navigator}
        onBack={() => {
          if (route.index > 0) {
            navigator.pop();
          }
        }}
        {...this.props}
      />
    );
  }

  render() {
    const dashboardRoute = Routes.Dashboard();

    if (this.state.loaded) {
      return (
        <View style={styles.appContainer}>
          <Navigator
            initialRoute={dashboardRoute}
            renderScene={this.renderScene}
            navigationBar={
              <Navigator.NavigationBar
                style={styles.navbar}
                routeMapper={RouteMapper} />
            } />
        </View>
      );
    } else {
      return (<Loading text='Trevor' />);
    }
  }
};

AppRegistry.registerComponent('Trevor', () => Trevor);
