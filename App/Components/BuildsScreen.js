'use strict';

var React = require('react-native');
var _ = require('underscore');
var Icon = require('react-native-vector-icons/Octicons');
var moment = require('moment');
require('moment-duration-format');

var Api = require('../Utils/Api');
var StatusSidebar = require('./StatusSidebar');
var Loading = require('./Loading');

var {
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
      builds: [],
      buildsSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }).cloneWithRows([])
    };
  },

  componentWillMount: function() {
    this.fetchData();
  },

  fetchData: function () {
    var self = this;
    this.setState({
      loading: true
    });

    Api.getBuilds(this.props.slug, this.props.isPro)
      .then(function (res) {
        var builds = res.builds;

        _.map(builds, function (obj) {
          var commit = _.find(res.commits, function(commit){
            return obj.commit_id == commit.id;
          });
          obj.commit = commit;
        });

        self.setState({
          loading: false,
          builds: builds,
          buildsSource: self.state.buildsSource.cloneWithRows(builds)
        });
      });
  },

  _renderBuildRow: function (rowData: string, sectionID: number, rowID: number) {
    var finishedDate = moment(rowData.finished_at).fromNow();
    var duration = moment.duration(rowData.duration, 'seconds')
      .format('[Run for] m [minutes], s [seconds]');

    return (
      <View style={styles.buildRow}>
        <StatusSidebar
          buildState={rowData.state}
          buildNumber={rowData.number} />

        <View style={styles.buildInfo}>
          <Text style={styles.buildMessage} numberOfLines={1}>{rowData.commit.message}</Text>
          <Text style={styles.buildDuration}>Run for {duration}</Text>
          <Text style={styles.buildFinished}>Finished {finishedDate}</Text>
        </View>
      </View>
    );
  },

  _onSegmentChange: function (value) {
    switch(value) {
      case 'Builds':
        var filtered = _.filter(this.state.builds, function(obj) {
          return obj.pull_request == false;
        });
        this.setState({
          buildsSource: this.state.buildsSource.cloneWithRows(filtered)
        });
        break;
      case 'Pull Requests':
        var filtered = _.filter(this.state.builds, function (obj) {
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
        <Text style={styles.repoName}>{this.props.slug}</Text>
        <SegmentedControlIOS
          style={styles.segment}
          values={['All', 'Builds', 'Pull Requests']}
          tintColor='#FFF'
          selectedIndex={0}
          onValueChange={this._onSegmentChange} />
      </View>
    );
  },

  _renderSeparator: function (
    sectionID: number | string, rowID: number | string, adjacentRowHighlighted: boolean
  ) {
    return (
      <View key={'SEP_' + sectionID + '_' + rowID} style={styles.separator} />
    );
  },

  render: function() {
    if (this.state.loading) {
      return (
        <Loading text='Builds' />
      );
    }

    return (
      <ListView
        dataSource={this.state.buildsSource}
        renderRow={this._renderBuildRow}
        renderHeader={this._renderHeader}
        renderSeparator={this._renderSeparator} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  repoName: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
    textAlign: 'center'
  },
  segmentWrapper: {
    padding: 10,
    backgroundColor: '#357389'
  },
  buildRow: {
    flexDirection: 'row',
    flex: 1,
    padding: 0,
    marginBottom: 1
  },
  buildMessage: {
    marginBottom: 2
  },
  buildInfo: {
    flex: 0.85,
    padding: 10
  },
  buildFinished: {
    flexDirection: 'column',
    flex: 0.8,
  },
  buildDuration: {
    marginBottom: 2
  },
  separator: {
    height: 2,
    backgroundColor: '#e9e9e9'
  }
});

module.exports = BuildsScreen;
