'use strict';

var React = require('react-native');
var _ = require('underscore');
var Icon = require('react-native-vector-icons/Octicons');
var moment = require('moment');
require("moment-duration-format");

var StatusSidebar = require('./StatusSidebar');
var Loading = require('./Loading');
var BuildsScreen = require('./BuildsScreen');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} = React;

var ReposScreen = React.createClass({
  displayName: 'ReposScreen',

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

  _pressRow: function (details) {
    this.props.navigator.push({
      title: "Builds",
      component: BuildsScreen,
      passProps: {slug: details.slug}
    });
  },

  _renderBuildRow: function (rowData: string, sectionID: number, rowID: number) {
    var repoName = rowData.slug.split('/')[1];
    var finishedDate = moment(rowData.last_build_finished_at).fromNow();
    var duration = moment.duration(rowData.last_build_duration, "seconds").format("[Run for] m [minutes], s [seconds]");

    return (
      <TouchableHighlight activeOpacity={0.85} underlayColor={'white'} onPress={() => this._pressRow(rowData)}>
        <View style={styles.buildRow} >
          <View style={styles.buildInfo}>
            <Text style={styles.repoName}>{repoName}</Text>
            <Text style={styles.buildFinished}>{finishedDate}</Text>
            <Text style={styles.buildDuration}>Run for {duration}</Text>
          </View>
          <StatusSidebar
            buildState={rowData.last_build_state}
            buildNumber={rowData.last_build_number} />
        </View>
      </TouchableHighlight>
    );
  },

  _renderSeparator: function (sectionID: number | string, rowID: number | string, adjacentRowHighlighted: boolean) {
    return (
      <View key={"SEP_" + sectionID + "_" + rowID} style={styles.separator} />
    );
  },

  render: function() {
    if (this.state.loading) {
      return (
        <Loading text='Repositories' />
      );
    }

    return (
      <ListView
        dataSource={this.state.reposSource}
        renderRow={this._renderBuildRow}
        renderSeparator={this._renderSeparator} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  buildRow: {
    flexDirection: 'row',
    flex: 1,
    padding: 0
  },
  repoName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  buildInfo: {
    flex: 0.9,
    padding: 10
  },
  buildFinished: {

  },
  buildDuration: {

  },
  separator: {
    height: 2,
    backgroundColor: '#e9e9e9'
  }
});

module.exports = ReposScreen;
