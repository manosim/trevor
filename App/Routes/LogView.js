import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import AnsiUp from 'ansi_up';
import Icon from 'react-native-vector-icons/Octicons';

import { fetchLog, fetchLogArchived } from '../Actions';
import Loading from '../Components/Loading';
import Constants from '../Utils/Constants';

import {
  // Linking,
  StyleSheet,
  TouchableHighlight,
  Text,
  WebView,
  View
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: Constants.THEME_DARK_BLUE,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  toolbarLeft: {
    flex: 0.5
  },
  toolbarRight: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  toolbarButton: {
    paddingVertical: 10,
    alignItems: 'center'
  },
  toolbarButtonRight: {
    paddingHorizontal: 10,
    marginHorizontal: 2
  },
  toolbarButtonText: {
    color: '#FFF',
    fontSize: 18
  },
  toolbarButtonIcon: {
    color: '#FFF',
    fontSize: 22

  },
  webView: {
    flex: 1,
    backgroundColor: '#343434'
  }
});

class LogView extends Component {
  componentWillMount() {
    this.props.fetchLog(this.props.isPro, this.props.logId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.log.isArchived !== this.props.log.isArchived && nextProps.log.location) {
      console.log('IS ARCHIVED.');
      this.props.fetchLogArchived(nextProps.log.location);
    }
  }

  setHtml(log) {
    return `
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
  }

  openInBrowser() {
    // FIXME!
    // const url = this.state.log_url;
    // if (!url) { return; }
    // Linking.openURL(url);
  }

  render() {

    if (this.props.log.isFetching) {
      return <Loading text="Log" />;
    }

    const log = this.setHtml(this.props.log.response);

    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <View style={styles.toolbarLeft}>
            <TouchableHighlight
              style={styles.toolbarButton}
              underlayColor={Constants.THEME_DARK_BLUE}
              onPress={this.openInBrowser.bind(this)}>
              <Text style={styles.toolbarButtonText}>Open in Browser</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.toolbarRight}>
            {this.props.log.isArchived ? <View /> : (
              <TouchableHighlight
                style={[styles.toolbarButton, styles.toolbarButtonRight]}
                underlayColor={Constants.THEME_DARK_BLUE}
                onPress={() => this.props.fetchLog(this.props.isPro, this.props.logId)}>
                <Icon style={styles.toolbarButtonIcon} name="sync" />
              </TouchableHighlight> )}
          </View>
        </View>

        <WebView
          style={styles.webView}
          source={{html: log || ''}}
          javaScriptEnabled={true} />
      </View>
    );
  }
};


function mapStateToProps(state) {
  return {
    log: state.log
  };
};

export default connect(mapStateToProps, { fetchLog, fetchLogArchived })(LogView);
