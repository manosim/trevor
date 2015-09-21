'use strict';

var React = require('react-native');
var _ = require('underscore');
var Icon = require('react-native-vector-icons/Octicons');
var moment = require('moment');
require("moment-duration-format");

var {
  ActivityIndicatorIOS,
  StyleSheet,
  Text,
  View,
  ListView,
  SegmentedControlIOS
} = React;

var BuildsScreen = React.createClass({
  displayName: 'BuildsScreen',

  getInitialState: function() {
    return {
      loading: false,
      reposSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }).cloneWithRows([])
    };
  },

  componentWillMount: function() {
    var self = this;
    this.setState({
      loading: true
    });

    fetch('https://api.travis-ci.org/repos/ekonstantinidis', {
      headers: {
        'Accept': 'application/vnd.travis-ci.2+json'
      }
    })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        var repos = _.filter(json.repos, function(obj) {
          return obj.active === true;
        });
        repos.reverse();

        self.setState({
          loading: false,
          reposSource: self.state.reposSource.cloneWithRows(repos)
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  },

  getStatusIcon: function (status) {
    switch(status) {
      case "passed":
        return "check";
      case "failed":
        return "x";
      default:
        return "question";
    }
  },

  _renderBuildRow: function (rowData: string, sectionID: number, rowID: number) {
    var repoName = rowData.slug.split('/')[1];
    console.log(repoName);
    var finishedDate = moment(rowData.last_build_finished_at).fromNow();
    var duration = moment.duration(rowData.last_build_duration, "seconds").format("[Run for] m [minutes], s [seconds]");
    var statusIcon = this.getStatusIcon(rowData.last_build_state);

    var stateClass;
    switch(rowData.last_build_state) {
      case "passed":
        stateClass = styles.statePassed;
        break;
      case "failed":
        stateClass = styles.stateFailed;
        break;
      default:
        stateClass = styles.stateErrored;
    }

    return (
      <View style={styles.buildRow}>
        <View style={styles.buildInfo}>
          <Text style={[styles.repoName, {marginBottom: 2}]}>{repoName}</Text>
          <Text style={styles.buildFinished}>{finishedDate}</Text>
          <Text style={styles.buildDuration}>Run for {duration}</Text>
        </View>
        <View style={[styles.buildStatus, stateClass]}>
          <Icon name={statusIcon} style={styles.stateIcon} />
          <Text style={styles.buildNumber}>{rowData.last_build_number}</Text>
        </View>
      </View>
    );
  },

  _renderSeparator: function () {
    return (
      <View style={styles.separator} />
    );
  },

  render: function() {
    if (this.state.loading) {
      return (
        <View style={styles.containerloading}>
          <ActivityIndicatorIOS
            animating={this.state.loading}
            color="#357389"
            size="large" />
          <Text style={styles.loadingText}>Loading repositories</Text>
        </View>
      );
    };

    return (
      <ListView
        dataSource={this.state.reposSource}
        renderRow={this._renderBuildRow}
        renderSeparator={this._renderSeparator}>
      </ListView>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  containerloading: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingText: {
    fontSize: 20,
    margin: 15
  },
  segmentWrapper: {
    padding: 10,
    backgroundColor: '#357389'
  },
  segment: {
    color: 'white'
  },
  listWrapper: {

  },
  buildRow: {
    flexDirection: 'row',
    flex: 1,
    padding: 0
  },
  buildStatus: {
    flex: 0.1,
    padding: 10,
    justifyContent: 'center',

  },
  stateIcon: {
    fontSize: 24,
    color: 'white',
    justifyContent: 'center',
  },
  buildNumber: {
    flex: 1,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 10
  },
  repoName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  buildType: {

  },
  buildInfo: {
    flex: 0.9,
    padding: 10
  },
  buildFinished: {
    flexDirection: 'column',
    flex: 0.8,
  },
  buildDuration: {

  },
  separator: {
    height: 2,
    backgroundColor: '#e9e9e9'
  },
  statePassed: {
    backgroundColor: '#3FA75F'
  },
  stateFailed: {
    backgroundColor: '#DB423C'
  },
  stateErrored: {
    backgroundColor: '#A1A0A0'
  }
});

module.exports = BuildsScreen;
