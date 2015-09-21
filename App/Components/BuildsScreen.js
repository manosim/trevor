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
      segmentIndex: 0,
      builds: [],
      buildsSource: new ListView.DataSource({
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
          builds: builds,
          buildsSource: self.state.buildsSource.cloneWithRows(builds)
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
          <View style={{flexDirection: 'row', marginBottom: 2}}>
            <Text style={styles.buildNumber}>#{rowData.number}</Text>
            <Text style={styles.buildFinished}>{finishedDate}</Text>
          </View>
          <Text style={[styles.buildMessage, {marginBottom: 2}]} numberOfLines={1}>{rowData.commit.message}</Text>
          <Text style={styles.buildDuration}>Run for {duration}</Text>
        </View>
      </View>
    );
  },

  _onSegmentChange: function (value) {
    switch(value) {
      case "Builds":
        var filtered = _.filter(this.state.builds, function(obj) {
          console.log(obj.pull_request);
          return obj.pull_request == false;
        });
        this.setState({
          buildsSource: this.state.buildsSource.cloneWithRows(filtered)
        });
        break;
      case "Pull Requests":
        var filtered = _.filter(this.state.builds, function (obj) {
          console.log(obj.pull_request);
          return obj.pull_request == true;
        });
        this.setState({
          buildsSource: this.state.buildsSource.cloneWithRows(filtered)
        });
        break;
      default:
        this.setState({
          buildsSource: this.state.buildsSource.cloneWithRows(this.state.builds)
        });
      }
  },

  _renderHeader: function () {
    return (
      <View style={styles.segmentWrapper}>
        <SegmentedControlIOS
          style={styles.segment}
          values={['All', 'Builds', 'Pull Requests']}
          tintColor="#FFF"
          selectedIndex={0}
          onValueChange={this._onSegmentChange} />
      </View>
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
          <Text style={styles.loadingText}>Loading builds</Text>
        </View>
      );
    };

    return (
      <ListView
        dataSource={this.state.buildsSource}
        renderRow={this._renderBuildRow}
        renderHeader={this._renderHeader}>
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
