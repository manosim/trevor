import React from 'react-native';
var moment = require('moment');
require('moment-duration-format');

import BuildsScreen from './BuildsScreen';
import StatusSidebar from './StatusSidebar';

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

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
  buildDate: {

  },
  buildDuration: {

  }
});

export default class RepoItem extends React.Component {

  _pressRow(details) {
    this.props.navigator.push({
      title: 'Builds',
      component: BuildsScreen,
      passProps: {
        isPro: this.props.isPro,
        slug: details.slug
      }
    });
  }

  render() {
    var repoName = this.props.details.slug.split('/')[1];
    var date = this.props.details.last_build_duration ? 'Finished ' +
      moment(this.props.details.last_build_finished_at).fromNow() :
      'Started ' + moment(this.props.details.last_build_started_at).fromNow();

    var duration = moment.duration(this.props.details.last_build_duration, 'seconds')
      .format('[Run for] m [minutes], s [seconds]');

    return (
      <TouchableHighlight
        style={styles.container}
        activeOpacity={0.85}
        underlayColor={'white'}
        onPress={() => this._pressRow(this.props.details)}>
        <View style={styles.buildRow} >
          <StatusSidebar
            buildState={this.props.details.last_build_state}
            buildNumber={this.props.details.last_build_number} />
          <View style={styles.buildInfo}>
            <Text style={styles.repoName}>{repoName}</Text>

            {this.props.details.last_build_started_at ? (
              <Text style={styles.buildDate}>{date}</Text>
            ) : <View />}

            {this.props.details.last_build_duration ? (
              <Text style={styles.buildDuration}>Run for {duration}</Text>
            ) : (
              <Text style={styles.buildDuration}>
                State: {this.props.details.last_build_state}
              </Text>
            )}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
};
