'use strict';

var React = require('react-native');
var _ = require('underscore');
var Icon = require('react-native-vector-icons/Octicons');
var moment = require('moment');
require("moment-duration-format");

var {
  StyleSheet,
  Text,
  View,
} = React;

var StatusSidebar = React.createClass({
  displayName: 'StatusSidebar',

  getInitialState: function() {
    return {
      statusIcon: "",
      stateClass: ""
    };
  },

  componentWillMount: function() {
    var statusIcon, stateClass;

    console.log(this.props.buildState);
    switch(this.props.buildState) {
      case "passed":
        statusIcon = "check";
        stateClass = styles.statePassed;
        break;
      case "failed":
        statusIcon = "x";
        stateClass = styles.stateFailed;
        break;
      default:
        statusIcon = "question";
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
    flex: 0.1,
    padding: 10,
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
