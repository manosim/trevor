import React from 'react-native';
import AnsiUp from 'ansi_up';

import Api from '../../Utils/Api';
import Loading from '../Loading';

var {
  StyleSheet,
  WebView
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343434'
  }
});

export default class JobDetails extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      html: ''
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  setHtml(log) {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            word-wrap: break-word;
            background-color: #343434;
            color: #FFF;
          }
        </style>
      </head>
      <body>
        <pre>${AnsiUp.ansi_to_html(log)}</pre>
      </body>
    </html>`;

    this.setState({
      html: html
    });
  }

  fetchData() {
    var self = this;

    this.setState({
      loading: true
    });

    Api.getLog(this.props.logId, this.props.isPro)
      .then(function (res) {
        self.setHtml.bind(self)(res);
        self.setState({
          loading: false,
        });
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading text='Log' />
      );
    }

    return (
      <WebView
        style={styles.container}
        html={this.state.html}
        javaScriptEnabled={true} />
    );
  }
};
