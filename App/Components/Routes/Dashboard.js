import React from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

var {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} = React;

import AuthStore from '../../Stores/Auth';
import Routes from '../Navigation/Routes';
import AccountsList from '../AccountsList';
import Constants from '../../Utils/Constants';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  loginButton: {
    height: 40,
    justifyContent: 'center',
    backgroundColor: Constants.THEME_BLUE,
    margin: 10,
  },
  loginButtonText: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: 'white',
    textAlign: 'center'
  },
  barButton: {
    flexDirection: 'row',
    backgroundColor: Constants.THEME_DARK_BLUE,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  barButtonIcon: {
    fontSize: 16,
    marginRight: 10,
    color: '#FFF'
  },
  barButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center'
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
        <ScrollView style={styles.container}>
          <TouchableHighlight
            underlayColor='#A53230'
            onPress={this.goToSearch.bind(this)}>
              <View style={styles.barButton}>
                <Icon style={styles.barButtonIcon} name="search" />
                <Text style={styles.barButtonText}>Search Travis for Open Source</Text>
              </View>
          </TouchableHighlight>

          {!this.state.isLoggedIn.os ? (
            <TouchableHighlight
              style={styles.loginButton}
              underlayColor={Constants.THEME_DARK_BLUE}
              onPress={this._doLoginOs.bind(this)}>
              <Text style={styles.loginButtonText}>Login to Travis for Open Source</Text>
            </TouchableHighlight>
          ) : <AccountsList navigator={this.props.navigator} isPro={false} />}

          {!this.state.isLoggedIn.pro ? (
            <TouchableHighlight
              style={styles.loginButton}
              underlayColor={Constants.THEME_DARK_BLUE}
              onPress={this._doLoginPro.bind(this)}>
              <Text style={styles.loginButtonText}>Login to Travis Pro</Text>
            </TouchableHighlight>
          ) : <AccountsList navigator={this.props.navigator} isPro={true} />}

        </ScrollView>

        {this.state.isLoggedIn.pro ? (
          <TouchableHighlight
            style={styles.barButton}
            underlayColor='#A53230'
            onPress={this.goToLatestPro.bind(this)}>
              <Text style={styles.barButtonText}>Latest Builds for Travis Pro</Text>
          </TouchableHighlight>
        ) : <View /> }
      </View>
    );
  }
};
