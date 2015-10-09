'use strict';

var React = require('react-native');

var {
  AlertIOS,
  WebView,
} = React;

var Api = require('../Utils/Api');
var AuthStore = require('../Stores/Auth');
var Constants = require('../Utils/Constants');
var Loading = require('./Loading');

var OAuthView = React.createClass({
  displayName: 'OAuthView',

  propTypes: {
    authUrl: React.PropTypes.string.isRequired
  },

  componentWillMount: function() {
    this.setState({
      authUrl: this.props.authUrl
    });
  },

  getInitialState: function () {
    return {
      authUrl: this.props.authUrl,
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
        if (res.error&& res.error_description) {
          AlertIOS.alert('Trevor', 'Oops! ',  res.error_description);
        }

        if (!res.access_token) {
          console.log('no no no no no no no no no no no');
          console.log('no no no no no no no no no no no');
          console.log(res);
          console.log('no no no no no no no no no no no');
          console.log('no no no no no no no no no no no');
        }

        if (res.access_token) {
          self.requestTravisToken(res.access_token);
        }
      });
  },

  requestTravisToken: function (githubToken) {
    var self = this;

    var data = JSON.stringify({
      github_token: githubToken
    });

    Api.getTravisToken(data, this.props.isPro)
      .then(function (res) {
        if (!res.access_token) {
          console.log('NO NO ONON NO NO ON ON NO NO');
          console.log('NO NO ONON NO NO ON ON NO NO');
          console.log(res);
          console.log('NO NO ONON NO NO ON ON NO NO');
          console.log('NO NO ONON NO NO ON ON NO NO');
        }
        if (res.access_token) {
          AuthStore.setToken('token' + (self.props.isPro ? 'Pro' : 'Os'), res.access_token);
          self.props.navigator.pop();
        }
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
        url={this.state.authUrl}
        onNavigationStateChange={this.onNavigationStateChange}
        automaticallyAdjustContentInsets={true}
        startInLoadingState={true}
        scalesPageToFit={this.state.scalesPageToFit} />
    );
  }
});

module.exports = OAuthView;
