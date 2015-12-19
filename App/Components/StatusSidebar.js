'use strict';

var React = require('react-native');
var Icon = require('react-native-vector-icons/Octicons');

var {
  StyleSheet,
  Text,
  View,
} = React;

var StatusSidebar = React.createClass({
  displayName: 'StatusSidebar',

  getInitialState: function() {
    return {
      statusIcon: '',
      stateClass: ''
    };
  },

  componentWillMount: function() {
    this.setOptions();
  },

  componentWillReceiveProps: function() {
    this.setOptions();
  },

  setOptions: function () {
    var statusIcon, stateClass;

    switch(this.props.buildState) {
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
  },

  render: function() {
    return (
      <View style={[styles.container, this.state.stateClass]}>
        <Icon style={styles.statusIcon} name={this.state.statusIcon} />
        <Text style={styles.buildNumber}>{this.props.buildNumber}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 0.15,
    paddingVertical: 10,
    paddingHorizontal: 2,
    justifyContent: 'center',
  },
  statusIcon: {
    fontSize: 24,
    color: 'white',
    justifyContent: 'center',
  },
  buildNumber: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 10
  },
  stateStarted: {
    backgroundColor: '#D2C93B'
  },
  statePassed: {
    backgroundColor: '#3FA75F'
  },
  stateFailed: {
    backgroundColor: '#DB423C'
  },
  stateErrored: {
    backgroundColor: '#A1A0A0'
  }
});

module.exports = StatusSidebar;
