/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var moment = require('moment');

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
        self.setState({
          loading: false,
          builds: self.state.builds.cloneWithRows(json.builds)
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  },

  _renderBuildRow: function (rowData: string, sectionID: number, rowID: number) {
    var finishedDate = moment(rowData.finished_at).fromNow();
    var duration = moment.duration(rowData.duration, "seconds").humanize(false);
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
          <Text style={styles.stateIcon}>✔︎</Text>
          <Text style={styles.buildType}>{rowData.pull_request}</Text>
        </View>
        <View style={styles.buildInfo}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.buildNumber}>#{rowData.number}</Text>
            <Text style={styles.buildDuration}>Run for {duration}</Text>
          </View>
          <Text>{finishedDate}</Text>
          <Text>{rowData.state}</Text>
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
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
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
    fontSize: 14,
    fontWeight: 'bold'
  },
  buildDuration: {
    flexDirection: 'column',
    flex: 0.8,
    fontSize: 14,
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
