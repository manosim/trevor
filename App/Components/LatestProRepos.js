'use strict';

var React = require('react-native');

var Api = require('../Utils/Api');
var Loading = require('./Loading');
var RepoItem = require('./RepoItem');

var {
  StyleSheet,
  ListView,
  View
} = React;

var LatestProRepos = React.createClass({
  displayName: 'LatestProRepos',

  getInitialState: function() {
    return {
      loading: false,
      reposSource: new ListView.DataSource({
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

    Api.getLatest(true)
      .then(function (res) {

        self.setState({
          loading: false,
          reposSource: self.state.reposSource.cloneWithRows(res.repos)
        });
      });
  },

  _renderBuildRow: function (rowData: string, sectionID: number, rowID: number) {
    return (
      <RepoItem
        details={rowData}
        isPro={rowData.isPro}
        navigator={this.props.navigator} />
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
        <Loading text='Latest' />
      );
    }

    return (
      <ListView
        dataSource={this.state.reposSource}
        renderRow={this._renderBuildRow}
        renderHeader={this._renderHeader}
        renderFooter={this._renderFooter}
        renderSeparator={this._renderSeparator} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  segmentWrapper: {
    padding: 10,
    backgroundColor: '#357389'
  },
  separator: {
    height: 2,
    backgroundColor: '#e9e9e9'
  },
  footerWrapper: {
    padding: 10,
    backgroundColor: '#357389'
  }
});

module.exports = LatestProRepos;
