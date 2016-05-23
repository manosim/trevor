import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

import Constants from '../../Utils/Constants';
import Divider from '../../Helpers/Divider';
import SideMenuButton from './SideMenuButton';
import SideMenuHeader from './SideMenuHeader';
import SideMenuFooter from './SideMenuFooter';

import {
  StyleSheet,
  View
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.THEME_DARK_BLUE
  },
  main: {
    flex: 1
  }
});

export default class SideMenu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SideMenuHeader />

        <View style={styles.main}>
          <Divider theme="red" text="Navigation" />
          <SideMenuButton icon="heart" text="Favourites" />
          <SideMenuButton icon="gear" text="Settings" />

          <Divider theme="red" text="Travis for Open Source" />
          <SideMenuButton icon="key" text="Authenticate" />

          <Divider theme="red" text="Travis Pro" />
          <SideMenuButton icon="key" text="Authenticate" />
        </View>

        <SideMenuFooter />
      </View>
    );
  }
};
