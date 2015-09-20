/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
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
  ListView
} = React;

var BuildsScreen = React.createClass({
  displayName: 'BuildsScreen',

  getInitialState: function() {
    return {
      loading: false,
      builds: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }).cloneWithRows([])
    };
  },

  componentWillMount: function() {
    var self = this;
    this.setState({
      loading: true
    });
    fetch('https://api.travis-ci.org/repos/ekonstantinidis/gitify/builds', {
      headers: {
        'Accept': 'application/vnd.travis-ci.2+json'
      }
    })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        var builds = json.builds;

        _.map(builds, function (obj) {
          var commit = _.find(json.commits, function(commit){
            return obj.commit_id == commit.id;
          });
          obj.commit = commit;
        });

        self.setState({
          loading: false,
          builds: self.state.builds.cloneWithRows(builds)
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
    var finishedDate = moment(rowData.finished_at).fromNow();
    var duration = moment.duration(rowData.duration, "seconds").format("[Run for] m [minutes], s [seconds]");
    var statusIcon = this.getStatusIcon(rowData.state);

    var stateClass;

    switch(rowData.state) {
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
        <View style={[styles.buildStatus, stateClass]}>
          <Icon name={statusIcon} style={styles.stateIcon} />
          <Text style={styles.buildType}>{rowData.pull_request}</Text>
        </View>
        <View style={styles.buildInfo}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.buildNumber}>#{rowData.number}</Text>
            <Text style={styles.buildFinished}>{finishedDate}</Text>
          </View>
          <Text style={styles.buildMessage} numberOfLines={1}>{rowData.commit.message}</Text>
          <Text style={styles.buildDuration}>Run for {duration}</Text>
        </View>
      </View>
    );
  },

  render: function() {
    var loading = this.state.loading ?
      ( <ActivityIndicatorIOS
          animating={this.state.loading}
          style={styles.loading}
          size="large" />) :
      ( <View/>);

    return (
      <View style={styles.container}>
        {loading}
        <ListView
          dataSource={this.state.builds}
          renderRow={this._renderBuildRow} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buildRow: {
    flex: 1,
    flexDirection: 'row',
    padding: 0,
    marginBottom: 1
  },
  buildStatus: {
    flex: 0.1,
    padding: 10
  },
  stateIcon: {
    justifyContent: 'center',
    fontSize: 24,
    color: 'white'
  },
  buildMessage: {
    flex: 1
  },
  buildType: {

  },
  buildInfo: {
    flex: 0.9,
    padding: 10
  },
  buildNumber: {
    flexDirection: 'column',
    flex: 0.2,
    fontWeight: 'bold'
  },
  buildFinished: {
    flexDirection: 'column',
    flex: 0.8,
  },
  buildDuration: {
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
