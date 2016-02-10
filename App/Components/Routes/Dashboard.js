import React from 'react-native';

var {
  StyleSheet,
  View,
  ScrollView
} = React;

import AuthStore from '../../Stores/Auth';
import BarButton from '../../Helpers/BarButton';
import Routes from '../Navigation/Routes';
import LoginButton from '../../Helpers/LoginButton';
import AccountsList from '../AccountsList';
import Constants from '../../Utils/Constants';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: {
        os: AuthStore.isLoggedIn(false),
        pro: AuthStore.isLoggedIn(true)
      }
    };
  }

  componentWillMount() {
    AuthStore.eventEmitter.addListener('authStateChanged', this.refreshAuthState.bind(this));
  }

  refreshAuthState() {
    this.setState({
      isLoggedIn: {
        os: AuthStore.isLoggedIn(false),
        pro: AuthStore.isLoggedIn(true)
      }
    });
  }

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
    return (
      <View style={{flex: 1}}>
        <BarButton
          icon="search"
          text="Search Travis for Open Source"
          onPress={this.goToSearch.bind(this)} />

        <ScrollView style={styles.container}>
          {!this.state.isLoggedIn.os ? (
            <LoginButton text="Login to Travis for Open Source" onPress={this._doLoginOs.bind(this)} />
          ) : <AccountsList navigator={this.props.navigator} isPro={false} />}

          {!this.state.isLoggedIn.pro ? (
            <LoginButton text="Login to Travis Pro" onPress={this._doLoginPro.bind(this)} />
          ) : <AccountsList navigator={this.props.navigator} isPro={true} />}
        </ScrollView>

        {this.state.isLoggedIn.pro ? (
          <BarButton
            text="Latest Builds for Travis Pro"
            onPress={this.goToLatestPro.bind(this)} />
        ) : <View /> }
      </View>
    );
  }
};
