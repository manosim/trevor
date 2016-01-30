import React from 'react-native';

import Constants from '../Utils/Constants';

var {
  RefreshControl,
} = React;

export default class CustomRefreshControl extends React.Component {
  render() {
    return (
      <RefreshControl
        refreshing={this.props.refreshing}
        onRefresh={this.props.onRefresh}
        tintColor={Constants.THEME_DARK_BLUE}
        title="Loading..."
        progressBackgroundColor={Constants.THEME_COLOR} />
    );
  }
};
