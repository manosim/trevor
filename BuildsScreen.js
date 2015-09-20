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

    return (
      <View style={styles.buildRow}>
        <View style={styles.buildStatus}>
          <Text>✔︎</Text>
          <Text>{rowData.number}</Text>
        </View>
        <View style={styles.buildInfo}>
          <Text>{rowData.id}</Text>
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
    padding: 10,
    backgroundColor: '#DB423C'
  },
  buildInfo: {
    flex: 0.9,
    padding: 10
  }
});

module.exports = BuildsScreen;
