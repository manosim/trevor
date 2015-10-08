'use strict';

var React = require('react-native');
var _ = require('underscore');

var Api = require('../Utils/Api');
var AuthStore = require('../Stores/Auth');
var Loading = require('./Loading');
var RepoItem = require('./RepoItem');

var {
  StyleSheet,
  View,
  ListView,
  SegmentedControlIOS
} = React;

var LatestRepos = React.createClass({
  displayName: 'LatestRepos',

  getInitialState: function() {
    return {
      loading: false,
      isLoggedIn: {
        os: AuthStore.isLoggedIn(false),
        pro: AuthStore.isLoggedIn(true)
      },
      repos: [],
      reposSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }).cloneWithRows([]),
      showType: 'All'
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

    var updatedRepos = [];

    if (this.state.isLoggedIn.os) {
      Api.getLatest(false)
        .then(function (res) {
          _.each(res.repos, function(element, index) {
            	_.extend(element, {isPro: false});
            updatedRepos.push(element);
          });

          self.setState({
            loading: false,
            repos: updatedRepos,
            reposSource: self.state.reposSource.cloneWithRows(updatedRepos)
          });
        });
    }

    if (this.state.isLoggedIn.pro) {
      Api.getLatest(true)
        .then(function (res) {
          console.log(res.repos);
          _.each(res.repos, function(element, index) {
            	_.extend(element, {isPro: true});
            updatedRepos.push(element);
          });

          self.setState({
            loading: false,
            repos: updatedRepos,
            reposSource: self.state.reposSource.cloneWithRows(updatedRepos)
          });
        });
    }
  },

  _onSegmentChange: function (value) {
    switch(value) {
      case 'Open Source':
        var filtered = _.filter(this.state.repos, function(obj) {
          return obj.isPro == false;
        });

        this.setState({
          loading: false,
          reposSource: this.state.reposSource.cloneWithRows(filtered),
          showType: 'Pro'
        });
        break;
      case 'Travis Pro':
        var filtered = _.filter(this.state.repos, function(obj) {
          return obj.isPro == true;
        });

        this.setState({
          loading: false,
          reposSource: this.state.reposSource.cloneWithRows(filtered),
          showType: 'Pro'
        });
        break;
      default:
        this.setState({
          loading: false,
          reposSource: this.state.reposSource.cloneWithRows(this.state.repos),
          showType: 'All'
        });
    }
  },

  _renderHeader: function () {
    return (
      <View style={styles.segmentWrapper}>
        <SegmentedControlIOS
          values={['All', 'Open Source', 'Travis Pro']}
          tintColor='#FFF'
          selectedIndex={0}
          onValueChange={this._onSegmentChange} />
      </View>
    );
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
  }
});

module.exports = LatestRepos;
