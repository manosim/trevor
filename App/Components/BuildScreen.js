'use strict';

// var _ = require('underscore');
var React = require('react-native');
// var moment = require('moment');
// require('moment-duration-format');

var Api = require('../Utils/Api');
var Loading = require('./Loading');
// var LoadingPull = require('./LoadingPull');

var {
  StyleSheet,
  ScrollView,
  Text,
  View
} = React;

var BuildScreen = React.createClass({
  displayName: 'BuildScreen',

  getInitialState: function() {
    return {
      loading: false,
      build: {},
      commit: {},
      jobs: []
    };
  },

  componentWillMount: function() {
    this.setState({
      loading: true
    });

    this.fetchData();
  },

  fetchData: function () {
    var self = this;

    Api.getBuild(this.props.buildId, this.props.isPro)
      .then(function (res) {
        self.setState({
          loading: false,
          build: res.build,
          commit: res.commit,
          jobs: res.jobs
        });
      });
  },

  render: function() {
    if (this.state.loading) {
      return (
        <Loading text='Build' />
      );
    }

    return (
      <ScrollView style={styles.container}>
        <Text>{this.state.build.number}</Text>
        <Text>{this.state.build.duration}</Text>
        <Text>{this.state.build.finished_at}</Text>
        <Text>{this.state.commit.message}</Text>
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

module.exports = BuildScreen;
