import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';

import {
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

import BarButton from '../Helpers/BarButton';
import Routes from '../Navigation/Routes';
import AccountsList from '../Components/AccountsList';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

class Dashboard extends Component {
  goToSearch() {
    const route = Routes.SearchPublic();
    this.props.navigator.push(route);
  }

  goToLatestPro() {
    const route = Routes.LatestPro();
    this.props.navigator.push(route);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <BarButton
          icon="search"
          text="Search Travis for Open Source"
          onPress={this.goToSearch.bind(this)} />

        <ScrollView style={styles.container}>
          {!this.props.auth.token.os ? <View /> : <AccountsList navigator={this.props.navigator} isPro={false} />}
          {!this.props.auth.token.pro ? <View /> : <AccountsList navigator={this.props.navigator} isPro={true} />}
        </ScrollView>

        {this.props.isLoggedInPro ? (
          <BarButton
            text="Latest Builds for Travis Pro"
            onPress={this.goToLatestPro.bind(this)} />
        ) : <View />}
      </View>
    );
  }
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, null)(Dashboard);
