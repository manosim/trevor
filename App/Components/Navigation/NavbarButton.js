import React from 'react-native';
import Routes from './Routes';

var {
  View,
} = React;

export default class NavigationButton extends React.Component {
  _goTo() {
    const route = Routes.example({});
    this.props.navigator.push(route);
  }

  render() {
    // FIXME
    return <View />;
  }
}
