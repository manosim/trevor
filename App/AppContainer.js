import _ from 'underscore';
import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import Drawer from 'react-native-drawer';

import {
  AsyncStorage,
  Navigator,
  StyleSheet,
  View,
} from 'react-native';

import AuthStore from './Stores/Auth';
import Constants from './Utils/Constants';
import Loading from './Components/Loading';
import SideMenu from './Components/SideMenu/SideMenu';
import RouteMapper from './Navigation/RouteMapper';
import Routes from './Navigation/Routes';
import SceneContainer from './Navigation/SceneContainer';

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

export default class Trevor extends Component {
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
        {...this.props} />
    );
  }

  render() {
    const dashboardRoute = Routes.Dashboard();

    if (this.state.loaded) {
      return (
        <Drawer
          content={<SideMenu />}
          openDrawerOffset={120}
          tapToClose={true}>
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
        </Drawer>
      );
    } else {
      return (<Loading text="Trevor" />);
    }
  }
}
