import React from 'react-native';

import Constants from '../Utils/Constants';

var {
  RefreshControl,
} = React;

export default class CustomRefreshControl extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      refreshing: props.refreshing
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      refreshing: nextProps.refreshing
    });
  }

  render() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this.props.onRefresh}
        tintColor={Constants.THEME_DARK_BLUE}
        title="Loading..."
        progressBackgroundColor={Constants.THEME_COLOR} />
    );
  }
};
