import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';

import {
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

import BarButton from '../Helpers/BarButton';
import Routes from '../Navigation/Routes';
import Loading from '../Components/Loading';
import LoginButton from '../Helpers/LoginButton';
import AccountsList from '../Components/AccountsList';
import Constants from '../Utils/Constants';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

class Dashboard extends Component {
  getAuthUrl(isPro) {
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

  _doLoginOs() {
    this.doLogin(false);
  }

  _doLoginPro() {
    this.doLogin(true);
  }

  doLogin(isPro) {
    var authUrl = this.getAuthUrl(isPro);
    const route = Routes.OAuth({
      isPro: isPro,
      authUrl: authUrl
    });

    this.props.navigator.push(route);
  }

  goToSearch() {
    const route = Routes.SearchPublic();
    this.props.navigator.push(route);
  }

  goToLatestPro() {
    const route = Routes.LatestPro();
    this.props.navigator.push(route);
  }

  render() {
    if (!this.props.auth.loaded) {
      return <Loading text="Trevor" />;
    }

    return (
      <View style={{flex: 1}}>
        <BarButton
          icon="search"
          text="Search Travis for Open Source"
          onPress={this.goToSearch.bind(this)} />

        <ScrollView style={styles.container}>
          {!this.props.auth.token.os ? (
            <LoginButton text="Login to Travis for Open Source" onPress={this._doLoginOs.bind(this)} />
          ) : <AccountsList navigator={this.props.navigator} isPro={false} />}

          {!this.props.auth.token.pro ? (
            <LoginButton text="Login to Travis Pro" onPress={this._doLoginPro.bind(this)} />
          ) : <AccountsList navigator={this.props.navigator} isPro={true} />}
        </ScrollView>

        {this.props.isLoggedInPro ? (
          <BarButton
            text="Latest Builds for Travis Pro"
            onPress={this.goToLatestPro.bind(this)} />
        ) : <View />}
      </View>
    );
  }
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, null)(Dashboard);
