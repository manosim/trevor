'use strict';

var React = require('react-native');
var _ = require('underscore');
var Icon = require('react-native-vector-icons/Octicons');

var Api = require('../Utils/Api');
var StatusSidebar = require('./StatusSidebar');
var Loading = require('./Loading');
var BuildsScreen = require('./BuildsScreen');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} = React;

var AccountsList = React.createClass({
  displayName: 'AccountsList',

  getInitialState: function() {
    return {
      loading: false,
      accounts: [],
      accountsSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }).cloneWithRows([]),
    };
  },

  componentWillMount: function() {
    this.loadAccounts(this.props.isPro);
  },

  loadAccounts: function (isPro) {
    var self = this;

    Api.getAccounts(isPro)
      .then(function (res) {
        self.setState({
          loading: false,
          accounts: res.accounts,
          accountsSource: self.state.accountsSource.cloneWithRows(res.accounts)
        });
      });
  },

  _renderBuildRow: function (rowData: string, sectionID: number, rowID: number) {
    return (
      <View style={styles.accountRow}>
        <View style={styles.buildInfo}>
          <Text style={styles.fullName} numberOfLines={1}>{rowData.name}</Text>
          <Text style={styles.login}>{rowData.login}</Text>
        </View>
      </View>
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
    return (
      <ListView
        dataSource={this.state.accountsSource}
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
  accountRow: {
    flexDirection: 'row',
    flex: 1
  }
});

module.exports = AccountsList;
