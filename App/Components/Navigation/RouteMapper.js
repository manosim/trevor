import React from 'react-native'; // eslint-disable-line no-unused-vars

import NavigationTitle from './navbar-title';
import NavigationButton from './navbar-button';
import NavigationBackButton from './navbar-back-button';


export default {

  LeftButton(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    // var previousRoute = navState.routeStack[index - 1];
    return (
      <NavigationBackButton navigator={navigator} direction="left" />
    );
  },

  RightButton(route, navigator, index, navState) {
    return (
      <NavigationButton route={route} index={index} navigator={navigator} direction="right" />
    );
  },

  Title(route, navigator, index, navState) {
    return (
      <NavigationTitle route={route} />
    );
  },

};
