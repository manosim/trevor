import React from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

import Constants from '../Utils/Constants';

var {
  StyleSheet,
  Text,
  View,
} = React;

var styles = StyleSheet.create({
  container: {
    width: 50,
    paddingVertical: 10,
    paddingHorizontal: 2,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  statusIcon: {
    fontSize: 24,
    color: 'white'
  },
  buildNumber: {
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8
  },
  stateStarted: { //eslint-disable-line react-native/no-unused-styles
    backgroundColor: Constants.statusStarted
  },
  statePassed: { //eslint-disable-line react-native/no-unused-styles
    backgroundColor: Constants.statusPassed
  },
  stateFailed: { //eslint-disable-line react-native/no-unused-styles
    backgroundColor: Constants.statusFailed
  },
  stateErrored: { //eslint-disable-line react-native/no-unused-styles
    backgroundColor: Constants.statusErrored
  }
});

export default class StatusSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      statusIcon: '',
      stateClass: ''
    };
  }

  componentWillMount() {
    this.setOptions();
  }

  componentWillReceiveProps() {
    this.setOptions();
  }

  setOptions() {
    var statusIcon, stateClass;

    switch (this.props.buildState) {
      case 'started':
      case 'created':
        statusIcon = 'primitive-dot';
        stateClass = styles.stateStarted;
        break;
      case 'passed':
        statusIcon = 'check';
        stateClass = styles.statePassed;
        break;
      case 'failed':
        statusIcon = 'x';
        stateClass = styles.stateFailed;
        break;
      case 'errored':
        statusIcon = 'alert';
        stateClass = styles.stateErrored;
        break;
      default:
        statusIcon = 'question';
        stateClass = styles.stateErrored;
    }

    this.setState({
      statusIcon: statusIcon,
      stateClass: stateClass
    });
  }

  render() {
    return (
      <View style={[styles.container, this.state.stateClass]}>
        <Icon style={styles.statusIcon} name={this.state.statusIcon} />
        {this.props.buildNumber ? (
          <Text style={styles.buildNumber} numberOfLines={1}>{this.props.buildNumber}</Text>
        ) : <View />}
      </View>
    );
  }
};
