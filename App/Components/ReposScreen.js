'use strict';

var _ = require('underscore');
var React = require('react-native');
var RefreshableListView = require('react-native-refreshable-listview');

var {
  StyleSheet,
  View,
  ListView
} = React;

var Api = require('../Utils/Api');
var EmptyResults = require('../Components/EmptyResults');
var Loading = require('./Loading');
var LoadingPull = require('./LoadingPull');
var RepoItem = require('./RepoItem');
var SearchBar = require('./SearchBar');

var ReposScreen = React.createClass({
  displayName: 'ReposScreen',

  getInitialState: function() {
    return {
      loading: false,
      repos: [],
      reposSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }).cloneWithRows([])
    };
  },

  componentWillMount: function() {
    this.setState({
      loading: true
    });

    this.fetchData();
  },

  fetchData: function () {
    var self = this;

    Api.getRepos(this.props.username, this.props.isPro)
      .then(function (res) {
        var repos = _.filter(res.repos, function(obj) {
          return obj.active === true;
        });
        repos = _.sortBy(repos, 'last_build_finished_at');
        repos.reverse();

        self.setState({
          loading: false,
          repos: repos,
          reposSource: self.state.reposSource.cloneWithRows(repos)
        });
      });
  },

  _renderBuildRow: function (rowData: string, sectionID: number, rowID: number) {
    return (
      <RepoItem
        details={rowData}
        isPro={this.props.isPro}
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

  _renderHeader: function () {
    return (
      <SearchBar />
    );
  },

  render: function() {
    if (this.state.loading) {
      return (
        <Loading text='Repositories' />
      );
    }

    if (_.isEmpty(this.state.repos)) {
      return (
        <EmptyResults />
      );
    }

    return (
      <View style={styles.container}>
        <RefreshableListView
          dataSource={this.state.reposSource}
          renderHeaderWrapper={this._renderHeader}
          renderRow={this._renderBuildRow}
          renderSeparator={this._renderSeparator}
          loadData={this.fetchData}
          refreshingIndictatorComponent={<LoadingPull />}
          refreshDescription="Refreshing repos" />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  separator: {
    height: 2,
    backgroundColor: '#e9e9e9'
  }
});

module.exports = ReposScreen;
