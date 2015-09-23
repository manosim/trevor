'use strict';

var React = require('react-native');
var _ = require('underscore');
var Icon = require('react-native-vector-icons/Octicons');

var Api = require('../Utils/Api');
var Loading = require('./Loading');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var AccountsList = React.createClass({
  displayName: 'AccountsList',

  getInitialState: function() {
    return {
      loading: false,
      accounts: []
    };
  },

  componentWillMount: function() {
    this.loadAccounts(this.props.isPro);
  },

  loadAccounts: function (isPro) {
    var self = this;

    this.setState({
      loading: true
    });

    Api.getAccounts(isPro)
      .then(function (res) {
        self.setState({
          loading: false,
          accounts: res.accounts
        });
      });
  },

  getTypeIcon: function (type) {
    console.log(type);
    switch (type) {
      case 'user':
        return 'person';
      case 'organization':
        return 'organization';
      default:
        return 'x';
    }
  },

  _renderAccount: function (account) {
    console.log('........');
    console.log(account);
    console.log(account.type);
    console.log('........');
    var icon = this.getTypeIcon(account.type);

    return (
      <View style={styles.accountRow}>
        <View style={styles.buildInfo}>
          <Icon style={styles.typeIcon} name={icon} />
          <Text style={styles.login}>{account.login}</Text>
          <Text style={styles.fullName} numberOfLines={1}>{account.name}</Text>
          <Text style={styles.count}>{account.repos_count}</Text>
        </View>
      </View>
    );
  },

  render: function() {
    var self = this;

    if (this.state.loading) {
      return (
        <Loading text="Accounts" />
      );
    }

    return (
      <View>
        {_.map(this.state.accounts, function (account) {
          return self._renderAccount(account);
        })}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  typeIcon: {
    fontSize: 24,
    color: 'red',
    justifyContent: 'center',
  },
  accountRow: {
    flexDirection: 'row',
  },
  login: {
    fontWeight: 'bold',
    fontSize: 16
  },
  fullName: {

  },
  count: {
    backgroundColor: 'yellow'
  }
});

module.exports = AccountsList;
