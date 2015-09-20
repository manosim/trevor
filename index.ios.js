/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var moment = require('moment');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} = React;

var Trevor = React.createClass({
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
    var finishedDate = moment(rowData.finished_at).format("YYYY-MM-DD")

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
    return (
      <ListView
        dataSource={this.state.builds}
        renderRow={this._renderBuildRow}
        style={styles.container} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  buildRow: {
    flex: 1,
    flexDirection: 'row',
    padding: 0,
  },
  buildStatus: {
    flex: 0.2,
    padding: 10,
    backgroundColor: 'red',
    color: 'white'
  },
  buildInfo: {
    flex: 0.8,
    padding: 10
  }
});

AppRegistry.registerComponent('trevor', () => Trevor);
