import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';

import Constants from '../../Utils/Constants';
import Divider from '../../Helpers/Divider';
import Routes from '../../Navigation/Routes.js';
import SideMenuButton from './SideMenuButton';
import SideMenuHeader from './SideMenuHeader';
import SideMenuFooter from './SideMenuFooter';

import {
  StyleSheet,
  View
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.THEME_DARK_BLUE
  },
  main: {
    flex: 1
  }
});

class SideMenu extends Component {
  _getAuthUrl(isPro) {
    var scopes = Constants.oAuthOptions.scopes;
    if (isPro) {
      scopes.push('repo');
    }

    var authUrl = [
      'https://github.com/login/oauth/authorize',
      '?client_id=' + Constants.oAuthOptions.client_id,
      '&client_secret=' + Constants.oAuthOptions.client_secret,
      '&scope=' + scopes
    ].join('');

    return authUrl;
  }

  _doLogin(isPro) {
    var authUrl = this._getAuthUrl(isPro);
    const route = Routes.OAuth({
      isPro: isPro,
      authUrl: authUrl
    });

    this.props.pushRoute(route);
  }

  render() {
    const isLoggedInOs = this.props.auth.token.os !== null;
    const isLoggedInPro = this.props.auth.token.pro !== null;
    const isLoggedInEither = isLoggedInOs || isLoggedInPro;

    return (
      <View style={styles.container}>
        <SideMenuHeader />

        <View style={styles.main}>
          <Divider theme="red" text="Navigation" />
          <SideMenuButton show={isLoggedInEither} icon="heart" text="Favourites" />
          <SideMenuButton show={isLoggedInEither} icon="gear" text="Settings" />

          <Divider theme="red" text="Travis for Open Source" />
          <SideMenuButton
            show={!isLoggedInOs}
            icon="key"
            text="Authenticate"
            onPress={() => this._doLogin(false)} />

          <Divider theme="red" text="Travis Pro" />
          <SideMenuButton
            show={!isLoggedInPro}
            icon="key"
            text="Authenticate"
            onPress={() => this._doLogin(true)} />
        </View>

        <SideMenuFooter />
      </View>
    );
  }
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, null)(SideMenu);
