'use strict';

var React = require('react-native');
var Icon = require('react-native-vector-icons/Octicons');
var moment = require('moment');
require('moment-duration-format');

var BuildsScreen = require('./BuildsScreen');
var Loading = require('./Loading');
var StatusSidebar = require('./StatusSidebar');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var RepoItem = React.createClass({
  displayName: 'RepoItem',

  _pressRow: function (details) {
    this.props.navigator.push({
      title: 'Builds',
      component: BuildsScreen,
      passProps: {
        isPro: this.props.isPro,
        slug: details.slug
      }
    });
  },

  render: function() {
    var repoName = this.props.details.slug.split('/')[1];
    var startedDate = moment(this.props.details.last_build_started_at).fromNow();
    var finishedDate = moment(this.props.details.last_build_finished_at).fromNow();
    var duration = moment.duration(this.props.details.last_build_duration, 'seconds')
      .format('[Run for] m [minutes], s [seconds]');

    return (
      <TouchableHighlight
        activeOpacity={0.85}
        underlayColor={'white'}
        onPress={() => this._pressRow(this.props.details)}>
        <View style={styles.buildRow} >
          <View style={styles.buildInfo}>
            <Text style={styles.repoName}>{repoName}</Text>

            {this.props.details.last_build_duration ? (
              <Text style={styles.buildFinished}>Finished {finishedDate}</Text>
            ) : <Text style={styles.buildFinished}>{startedDate}</Text> }

            {this.props.details.last_build_duration ? (
              <Text style={styles.buildDuration}>Run for {duration}</Text>
            ) : <Text style={styles.buildDuration}>{this.props.details.last_build_state}</Text> }
          </View>
          <StatusSidebar
            buildState={this.props.details.last_build_state}
            buildNumber={this.props.details.last_build_number} />
        </View>
      </TouchableHighlight>
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
    flex: 0.85,
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

module.exports = RepoItem;
