import _ from 'underscore';
import React from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

import Api from '../Utils/Api';
import Loading from '../Components/Loading';
import Separator from '../Helpers/Separator';
import ReposScreen from '../Components/ReposScreen';
var AuthStore = require('../Stores/Auth');

var {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  heading: {
    flexDirection: 'row',
    backgroundColor: '#5E8599',
    paddingVertical: 7,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  headingTitle: {
    flex: 0.7,
    color: '#FFFFFF',
    fontSize: 16,

  },
  logoutButtonWrapper: {
    flex: 0.3,
    alignItems: 'flex-end'

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
  },
  avatarWrapper: {
    flexDirection: 'column',
    flex: 0.2,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    marginTop: 10
  },
  accountInfo: {
    flexDirection: 'column',
    flex: 0.7,
    paddingVertical: 10
  },
  typeWrapper: {
    flex: 0.1,
    backgroundColor: '#357389',
    justifyContent: 'center',
    alignItems: 'center'
  },
  typeIcon: {
    fontSize: 20,
    color: 'white',
    marginTop: 16
  },
  login: {
    flexDirection: 'column',
    flex: 0.6,
    fontWeight: 'bold',
    fontSize: 16
  },
  fullName: {

  },
  count: {
    flexDirection: 'column',
    flex: 0.4,
    color: '#919191',
    paddingRight: 15,
    textAlign: 'right'
  }
});

export default class AccountsList extends React.Component {
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
    AuthStore.logOut(this.props.isPro);
  }

  _pressRow(account) {
    this.props.navigator.push({
      title: 'Repos',
      component: ReposScreen,
      passProps: {
        isPro: this.props.isPro,
        username: account.login
      }
    });
  }

  _renderAccount(account) {
    var icon = this.getTypeIcon(account.type);
    var imageSource = account.avatar_url ? {uri: account.avatar_url}
      : require('image!logo-circle-red');

    return (
      <TouchableHighlight
        key={account.id}
        activeOpacity={0.85}
        underlayColor={'white'}
        onPress={() => this._pressRow(account)}>
        <View>
          <View style={styles.accountRow}>
            <View style={styles.avatarWrapper}>
              <Image style={styles.avatar} source={imageSource} />
            </View>
            <View style={styles.accountInfo}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.login}>{account.login}</Text>
                <Text style={styles.count}>{account.repos_count} Repos</Text>
              </View>
              <Text style={styles.fullName} numberOfLines={1}>{account.name}</Text>
            </View>
            <View style={styles.typeWrapper}>
              <Icon style={styles.typeIcon} name={icon} />
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
          <View style={styles.logoutButtonWrapper}>
            <TouchableHighlight
              style={styles.logoutButton}
              onPress={this.logout}
              underlayColor={'#40454F'}>
              <Text style={styles.logoutButtonText}>Log Out</Text>
            </TouchableHighlight>
          </View>
        </View>
        {_.map(this.state.accounts, function (account) {
          return self._renderAccount(account);
        })}
      </View>
    );
  }
};
