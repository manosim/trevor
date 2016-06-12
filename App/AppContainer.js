import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { Provider } from 'react-redux';
import Drawer from 'react-native-drawer';

import {
  Navigator,
  StyleSheet
} from 'react-native';

import configureStore from './Store/configureStore';
import Constants from './Utils/Constants';
import SideMenu from './Components/SideMenu/SideMenu';
import RouteMapper from './Navigation/RouteMapper';
import Routes from './Navigation/Routes';
import SceneContainer from './Navigation/SceneContainer';

// Store
const store = configureStore();

var styles = StyleSheet.create({
  navbar: {
    backgroundColor: Constants.THEME_RED,
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

export default class Trevor extends Component {
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

  goToRoute(route) {
    this.refs.navigator.push(route);
    this.refs.drawer.close();
  }

  render() {
    const dashboardRoute = Routes.Dashboard();

    return (
      <Provider store={store}>
         <Drawer
          ref="drawer"
          content={<SideMenu pushRoute={(route) => this.goToRoute(route)}/>}
          openDrawerOffset={120}
          tapToClose={true}>
          <Navigator
            ref="navigator"
            initialRoute={dashboardRoute}
            renderScene={this.renderScene}
            navigationBar={<Navigator.NavigationBar style={styles.navbar} routeMapper={RouteMapper} />} />
        </Drawer>
      </Provider>
    );
  }
}
