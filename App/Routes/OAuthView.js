import React from 'react-native';

var {
  AlertIOS,
  WebView,
} = React;

import Api from '../Utils/Api';
import AuthStore from '../Stores/Auth';
import Constants from '../Utils/Constants';
import Loading from '../Components/Loading';

export default class OAuthView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUrl: this.props.authUrl,
      loading: false
    };
  }

  componentWillMount() {
    this.setState({
      authUrl: this.props.authUrl
    });
  }

  requestGithubToken(code) {
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
        if (res.error && res.error_description) {
          AlertIOS.alert('Trevor', res.error_description);
        }

        if (res.access_token) {
          self.requestTravisToken(res.access_token);
        }
      });
  }

  requestTravisToken(githubToken) {
    var self = this;

    var data = JSON.stringify({
      github_token: githubToken
    });

    Api.getTravisToken(data, this.props.isPro)
      .then(function (res) {
        if (res && res.access_token) {
          AuthStore.setToken('token' + (self.props.isPro ? 'Pro' : 'Os'), res.access_token);
          self.props.navigator.pop();
        } else {
          AlertIOS.alert('Trevor', 'Couldn\'t authenticate you with Travis CI. ');
        }
      });
  }

  onNavigationStateChange(args) {
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
  }

  render() {
    if (this.state.loading || !this.props.authUrl) {
      return (
        <Loading text="Auth" />
      );
    }

    return (
      <WebView
        source={{uri: this.state.authUrl}}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        automaticallyAdjustContentInsets={true}
        startInLoadingState={true}
        scalesPageToFit={this.state.scalesPageToFit} />
    );
  }
};

OAuthView.propTypes = {
  authUrl: React.PropTypes.string.isRequired
};
