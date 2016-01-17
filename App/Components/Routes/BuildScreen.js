import React from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import moment from 'moment';
require('moment-duration-format');

import Api from '../../Utils/Api';
import Loading from '../Loading';
import Divider from '../../Helpers/Divider';

var {
  StyleSheet,
  ScrollView,
  Text,
  View
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  buildDetailsWrapper: {
    flexDirection: 'row',
    flex: 1,
    height: 105,
    justifyContent: 'center',
  },
  buildDetails: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  statusSidebar: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  commitMessage: {
    fontWeight: 'bold'
  },
  buildStatusIcon: {
    fontSize: 24,
    color: 'white'
  },
  stateStarted: { //eslint-disable-line react-native/no-unused-styles
    backgroundColor: '#D2C93B'
  },
  statePassed: { //eslint-disable-line react-native/no-unused-styles
    backgroundColor: '#3FA75F'
  },
  stateFailed: { //eslint-disable-line react-native/no-unused-styles
    backgroundColor: '#DB423C'
  },
  stateErrored: { //eslint-disable-line react-native/no-unused-styles
    backgroundColor: '#A1A0A0'
  }
});

export default class BuildScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      build: {},
      commit: {},
      jobs: []
    };
  }

  componentWillMount() {
    this.setState({
      loading: true
    });

    this.fetchData();
  }

  fetchData() {
    var self = this;

    Api.getBuild(this.props.buildId, this.props.isPro)
      .then(function (res) {
        console.log(res);
        self.setState({
          loading: false,
          build: res.build,
          commit: res.commit,
          jobs: res.jobs
        });
      });
  }

  getStatus() {
    var statusIcon, stateClass;
    switch(this.state.build.state) {
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

    return {
      statusIcon: statusIcon,
      stateClass: stateClass
    };
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading text='Build' />
      );
    }

    const date = this.state.build.duration ? 'Finished ' + moment(this.state.build.finished_at).fromNow() :
      'Started ' + moment(this.state.build.started_at).fromNow();

    const duration = moment.duration(this.state.build.duration, 'seconds')
      .format('[Run for] m [minutes], s [seconds]');

    const buildStatus = this.getStatus();
    const statusSidebar = (
      <View style={[styles.statusSidebar, buildStatus.stateClass]}>
        <Icon
          style={styles.buildStatusIcon}
          name={buildStatus.statusIcon} />
      </View>
    );

    return (
      <ScrollView style={styles.container}>
        <Divider text='Build Details'></Divider>
        <View style={styles.buildDetailsWrapper}>
          {statusSidebar}
          <View style={styles.buildDetails}>
            <Text style={styles.commitMessage} numberOfLines={2}>{this.state.commit.message}</Text>
            <Text>Build Number {this.state.build.number}</Text>
            <Text>{date}</Text>
            <Text>Run for {duration}</Text>
          </View>
        </View>

        <Divider text='Commit Info'></Divider>
        <Text>Commit Author: {this.state.commit.author_name}</Text>
        <Text>Build Duration {this.state.build.duration}</Text>

        <Divider text='Jobs'></Divider>
      </ScrollView>
    );
  }
};
