'use strict';

var React = require('react-native');
var _ = require('underscore');

var Loading = require('./Loading');

var {
  StyleSheet,
  Text,
  LinkingIOS,
  View,
  ScrollView,
  TouchableHighlight
} = React;

var Api = require('../Utils/Api');
var ReposScreen = require('./ReposScreen');

var options = {
    client_id: '1977d96493704415daa0',
    client_secret: '05a3daa3b49f5fc3684b031dcad1862223c2c2fb',
    scope: [
        "user:email", "read:org", "repo_deployment",
        "repo:status", "write:repo_hook"
    ]
};

var Dashboard = React.createClass({
  displayName: 'Dashboard',

  getInitialState: function() {
    return {
      loading: false
    };
  },

  _doLogin: function (val) {
    var self = this;
    LinkingIOS.addEventListener('url', handleUrl)

    function handleUrl (event) {
      var url = event.url;
      var raw_code = /code=([^&]*)/.exec(url) || null;
      var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
      var error = /\?error=(.+)$/.exec(url);

      // If there is a code, proceed to get token from github
      if (code) {
        self.requestGithubToken(code);
      } else if (error) {
        // Raise Alert - Ooops!
      }

      LinkingIOS.removeEventListener('url', handleUrl)
    }

    LinkingIOS.openURL([
      'https://github.com/login/oauth/authorize',
      '?client_id=' + options.client_id,
      '&client_secret=' + options.client_secret,
      '&scope=' + options.scope
    ].join(''))
  },

  requestGithubToken: function (code) {
    var self = this;

    this.setState({
      loading: true
    });

    var data = JSON.stringify({
      client_id: options.client_id,
      client_secret: options.client_secret,
      code: code
    });

    Api.getGithubToken(data)
      .then(function (res) {
        self.requestTravisToken(res.access_token);
      });
  },

  requestTravisToken: function (githubToken) {
    var self = this;
    var data = JSON.stringify({
      github_token: githubToken
    });

    Api.getTravisToken(data)
      .then(function (res) {
        // FIXME: Store the token

        self.props.navigator.push({
          title: "Repos",
          component: ReposScreen,
          passProps: {isPro: false}
        });
      });
  },

  render: function() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.description}>
          Access Travis CI, simply everywhere
        </Text>
        <TouchableHighlight style={styles.loginButton} onPress={() => this._doLogin('test')}>
          <Text style={styles.loginButtonText}>Login to Travis for Open Source</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  description: {
    fontSize: 20,
    padding: 15,
    textAlign: 'center'
  },
  loginButton: {
    backgroundColor: '#357389',
    margin: 10,
  },
  loginButtonText: {
    fontSize: 16,
    padding: 10,
    color: 'white',
    textAlign: 'center'

  }
});

module.exports = Dashboard;
