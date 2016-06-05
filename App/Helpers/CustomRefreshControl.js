import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

import Constants from '../Utils/Constants';

import {
  RefreshControl,
} from 'react-native';

export default class CustomRefreshControl extends Component {
  render() {
    return (
      <RefreshControl
        refreshing={this.props.refreshing}
        onRefresh={this.props.onRefresh}
        tintColor={Constants.THEME_DARK_BLUE}
        title="Loading..."
        progressBackgroundColor={Constants.THEME_RED} />
    );
  }
};
