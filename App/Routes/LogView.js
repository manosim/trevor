import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
// import AnsiUp from 'ansi_up';
// import Icon from 'react-native-vector-icons/Octicons';

import { fetchLog } from '../Actions';
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
  // toolbarButtonRight: {
  //   paddingHorizontal: 10,
  //   marginHorizontal: 2
  // },
  toolbarButtonText: {
    color: '#FFF',
    fontSize: 18
  },
  // toolbarButtonIcon: {
  //   color: '#FFF',
  //   fontSize: 22
  //
  // },
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
    if (nextProps.log.isArchived !== this.props.log.isArchived) {
      console.log('IS ARCHIVED.');
      this.props.fetchArchivedLog(nextProps.log.location);
    }
  }

  fetchData() {
    // Api.getLog(this.props.logId, this.props.isPro)
    //   .then(function (res) {
    //     if (res.isArchived) {
    //       return self.fetchArchivedLog(res.url);
    //     } else {
    //       self.setHtml.bind(self)(res.log.body);
    //       self.setState({
    //         loading: false,
    //       });
    //     }
    //   });
  }

  fetchArchivedLog(url) {
    // Api.getLogFromS3(url)
    //   .then(function (res) {
    //     self.setHtml.bind(self)(res);
    //     self.setState({
    //       isArchived: true,
    //       log_url: url,
    //       loading: false,
    //     });
    //   });
  }

  // setHtml(log) {
  //   const html = `
  //   <!DOCTYPE html>
  //   <html>
  //     <head>
  //       <style>
  //         body {
  //           word-wrap: break-word;
  //           background-color: #343434;
  //           color: #FFF;
  //         }
  //       </style>
  //     </head>
  //     <body>
  //       <pre>${AnsiUp.ansi_to_html(log)}</pre>
  //     </body>
  //   </html>`;
  //
  //   this.setState({
  //     html: html
  //   });
  // }

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
            {/*this.state.isArchived ? <View /> : (
              <TouchableHighlight
                style={[styles.toolbarButton, styles.toolbarButtonRight]}
                underlayColor={Constants.THEME_DARK_BLUE}
                onPress={this.fetchData.bind(this)}>
                <Icon style={styles.toolbarButtonIcon} name="sync" />
              </TouchableHighlight> )*/}
          </View>
        </View>

        <WebView
          style={styles.webView}
          source={{html: this.props.log.response || ''}}
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

export default connect(mapStateToProps, { fetchLog })(LogView);
