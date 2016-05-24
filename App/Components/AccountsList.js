import _ from 'underscore';
import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import Icon from 'react-native-vector-icons/Octicons';

import Api from '../Utils/Api';
import Constants from '../Utils/Constants';
import Loading from '../Components/Loading';
import Separator from '../Helpers/Separator';
import Routes from '../Navigation/Routes';
// import AuthStore from '../Stores/Auth';

import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Constants.THEME_LIGHT_EXTRA_BLUE,
    paddingVertical: 7,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  headingTitle: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  logoutButton: {
    borderRadius: 6,
    borderColor: '#40454F',
    borderWidth: 0.5,
    paddingHorizontal: 5,
    paddingVertical: 3,

  },
  logoutButtonText: {
    color: '#FFFFFF',
    alignSelf: 'flex-end',
  },
  accountRow: {
    flexDirection: 'row',
    flex: 1,
    height: 60
  },
  avatarWrapper: {
    width: 55,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  accountInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5
  },
  typeWrapper: {
    width: 32,
    backgroundColor: Constants.THEME_LIGHT_BLUE,
    justifyContent: 'center',
    alignItems: 'center'
  },
  typeIcon: {
    fontSize: 17,
    color: 'white'
  },
  login: {
    fontWeight: 'bold',
    fontSize: 16
  },
  fullName: {

  },
  count: {
    color: '#919191',
    marginRight: 8,
    textAlign: 'right'
  }
});

export default class AccountsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      accounts: []
    };
  }

  componentWillMount() {
    this.loadAccounts(this.props.isPro);
  }

  loadAccounts(isPro) {
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
  }

  getTypeIcon(type) {
    switch (type) {
      case 'user':
        return 'person';
      case 'organization':
        return 'organization';
      default:
        return 'x';
    }
  }

  logout() {
    // AuthStore.logOut(this.props.isPro);
  }

  _pressRow(account) {
    const route = Routes.Repos({
      isPro: this.props.isPro,
      username: account.login
    });

    this.props.navigator.push(route);
  }

  _renderAccount(account) {
    var icon = this.getTypeIcon(account.type);
    var imageSource = account.avatar_url ? {uri: account.avatar_url}
      : require('../../images/logo-circle-red.png');

    return (
      <TouchableHighlight
        key={account.id}
        activeOpacity={0.85}
        underlayColor={'white'}
        onPress={() => this._pressRow(account)}>
        <View>
          <View style={styles.accountRow}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={styles.avatarWrapper}>
                <Image style={styles.avatar} source={imageSource} />
              </View>
              <View style={styles.accountInfo}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={styles.login} numberOfLines={1}>{account.login}</Text>
                  <Text style={styles.count} numberOfLines={1}>{account.repos_count} Repos</Text>
                </View>
                <Text style={styles.fullName} numberOfLines={1}>{account.name || ' '}</Text>
              </View>
              <View style={styles.typeWrapper}>
                <Icon style={styles.typeIcon} name={icon} />
              </View>
            </View>
          </View>
          <Separator />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    var self = this;
    var heading = this.props.isPro ? 'Travis Pro' : 'Travis for Open Source';

    if (this.state.loading) {
      return (
        <View style={styles.loadingWrapper}>
          <View style={styles.heading}>
            <Text style={styles.headingTitle}>{heading}</Text>
          </View>
          <Loading hideText={true} style={{margin: 30}} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingTitle}>{heading}</Text>
          <TouchableHighlight
            style={styles.logoutButton}
            onPress={this.logout.bind(this)}
            underlayColor={'#40454F'}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableHighlight>
        </View>
        {_.map(this.state.accounts, function (account) {
          return self._renderAccount(account);
        })}
      </View>
    );
  }
}
