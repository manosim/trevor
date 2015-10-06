'use strict';

var React = require('react-native');
var _ = require('underscore');

var {
  AlertIOS,
  StyleSheet,
  Text,
  WebView,
  View,
} = React;

var Api = require('../Utils/Api');
var AuthStore = require('../Stores/Auth');
var Constants = require('../Utils/Constants');
var Loading = require('./Loading');
var Dashboard = require('./Dashboard');

var OAuthView = React.createClass({
  displayName: 'OAuthView',

  propTypes: {
    authUrl: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    return {
      loading: false
    };
  },

  requestGithubToken: function (code) {
    var self = this;

    this.setState({
      loading: true
    });

    var data = JSON.stringify({
      client_id: Constants.oAuthOptions.client_id,
      client_secret: Constants.oAuthOptions.client_secret,
      code: code
    });

    Api.getGithubToken(data)
      .then(function (res) {
        AuthStore.setToken('tokenGithub', res.access_token);
        self.requestTravisToken(res.access_token);
      });
  },

  requestTravisToken: function (githubToken) {
    var self = this;

    var data = JSON.stringify({
      github_token: githubToken
    });

    Api.getTravisToken(data, this.props.isPro)
      .then(function (res) {
        AuthStore.setToken('token' + (self.props.isPro ? 'Pro' : 'Os'), res.access_token);
        self.props.navigator.pop();
      });
  },

  onNavigationStateChange: function (args) {
    var url = args.url;
    var raw_code = /code=([^&]*)/.exec(url) || null;
    var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
    var error = /\?error=(.+)$/.exec(url);

    // If there is a code, proceed to get token from github
    if (code) {
      this.setState({
        loading: false
      });
      this.requestGithubToken(code);
      return;
    }

    if (error) {
      this.setState({
        loading: false
      });
      AlertIOS.alert('Trevor', 'Oops! Something went wrong and we couldn\'t log' +
        'you in. Please try again.');
    }
  },

  render: function() {
    if (this.state.loading || !this.props.authUrl) {
      return (
        <Loading text='Auth' />
      );
    }

    return (
      <WebView
        url={this.props.authUrl}
        onNavigationStateChange={this.onNavigationStateChange}
        automaticallyAdjustContentInsets={true}
        startInLoadingState={true}
        scalesPageToFit={this.state.scalesPageToFit} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

module.exports = OAuthView;
