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
import Loading from './Loading';
var LoadingPull = require('./LoadingPull');
var RepoItem = require('./RepoItem');
import SearchBar from './SearchBar';

var ReposScreen = React.createClass({
  displayName: 'ReposScreen',

  getInitialState: function() {
    return {
      clearSearch: false,
      loading: false,
      repos: [],
      reposSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }).cloneWithRows([])
    };
  },

  componentWillMount: function() {
    this.setState({
      clearSearch: false,
      loading: true
    });

    this.fetchData();
  },

  fetchData: function () {
    var self = this;

    this.setState({
      clearSearch: true,
    });

    Api.getRepos(this.props.username, this.props.isPro)
      .then(function (res) {
        var repos = _.filter(res.repos, function(obj) {
          return obj.active === true;
        });
        repos = _.sortBy(repos, 'last_build_finished_at');
        repos.reverse();

        self.setState({
          clearSearch: false,
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

  searchRepos: function (keyword) {
    var results = _.filter(this.state.repos, function (obj) {
      return obj.slug.split('/')[1].indexOf(keyword) > -1;
    });

    this.setState({
      reposSource: this.state.reposSource.cloneWithRows(results)
    });
  },

  _renderHeader: function (refreshingIndicator) {
    return (
      <View>
        {refreshingIndicator}
        <SearchBar search={this.searchRepos} clear={this.state.clearSearch} />
      </View>
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
          refreshingIndictatorComponent={<LoadingPull />} />
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
