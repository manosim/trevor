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

    console.log(code);

    fetch('https://github.com/login/oauth/access_token', {
      method: 'post',
      body: JSON.stringify({
        client_id: options.client_id,
        client_secret: options.client_secret,
        code: code
      }),
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(function(response) {
        console.log(response);
        return response.json()
      }).then(function(json) {
        console.log(json.body.access_token);
      })
      .catch((error) => {
        console.warn(error);
      });
  },

  doCallback: function () {

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
