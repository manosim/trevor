'use strict';

var React = require('react-native');
var _ = require('underscore');

var {
  StyleSheet,
  View,
  ListView
} = React;

var Api = require('../Utils/Api');
var EmptyResults = require('../Components/EmptyResults');
var Loading = require('./Loading');
var RepoItem = require('./RepoItem');

var ReposScreen = React.createClass({
  displayName: 'ReposScreen',

  getInitialState: function() {
    return {
      loading: false,
      emptyResults: false,
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

    Api.getRepos(this.props.username, this.props.isPro)
      .then(function (res) {
        var repos = _.filter(res.repos, function(obj) {
          return obj.active === true;
        });
        repos = _.sortBy(repos, 'last_build_finished_at');
        repos.reverse();

        self.setState({
          loading: false,
          emptyResults: _.isEmpty(repos),
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

  render: function() {
    if (this.state.loading) {
      return (
        <Loading text='Repositories' />
      );
    }

    if (this.state.emptyResults) {
      return (
        <EmptyResults />
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
  separator: {
    height: 2,
    backgroundColor: '#e9e9e9'
  }
});

module.exports = ReposScreen;
