import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Octicons';
import moment from 'moment';
require('moment-duration-format');

import {
  ListView,
  Linking,
  StyleSheet,
  ScrollView,
  Text,
  View
} from 'react-native';

import { fetchBuild } from '../Actions';
import CustomRefreshControl from '../Helpers/CustomRefreshControl';
import DetailRow from '../Helpers/DetailRow';
import Divider from '../Helpers/Divider';
import Loading from '../Components/Loading';
import JobsListView from '../Components/JobsListView';
import StatusSidebar from '../Components/StatusSidebar';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  buildDetailsWrapper: {
    flexDirection: 'row',
    flex: 1,
    height: 95,
    justifyContent: 'center',
  },
  buildDetails: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  buildDetailsText: {
    fontSize: 16,
  },
  commitMessage: {
    fontWeight: 'bold'
  },
  commitInfo: {
    padding: 15
  },
  githubButtonWrapper: {
    marginTop: 10
  },
  githubButton: {
    backgroundColor: '#2d2d2d',
  }
});

class BuildScreen extends Component {
  constructor(props) {
    super(props);
    var jobsSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1.state !== row2.state});

    this.state = {
      jobsSource: jobsSource.cloneWithRows([])
    };
  }

  componentWillMount() {
    this.props.fetchBuild(this.props.isPro, this.props.buildId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.build.response !== this.props.build.response) {
      this.setState({
        jobsSource: this.state.jobsSource.cloneWithRows(nextProps.build.response.jobs)
      });
    }
  }

  openGitHub() {
    const url = this.props.build.commit.compare_url;
    Linking.openURL(url);
  }

  render() {
    if (this.props.isFetching || !this.props.build.response.build) {
      return <Loading text="Build" />;
    }

    const buildDetails = this.props.build.response.build;

    const date = buildDetails.duration ?
      'Finished ' + moment(buildDetails.finished_at).fromNow() :
      'Started ' + moment(buildDetails.started_at).fromNow();

    const duration = moment.duration(buildDetails.duration, 'seconds')
      .format('[Run for] m [minutes], s [seconds]');

    const prText = buildDetails.pull_request ?
      buildDetails.pull_request_number + ': ' +
      buildDetails.pull_request_title : null;

    const durationText = buildDetails.duration ? 'Run for ' + duration : ' ';

    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <CustomRefreshControl
            refreshing={this.props.build.isReFetching}
            onRefresh={() => this.props.fetchBuild(this.props.isPro, this.props.buildId, true)} />
        }>

        <Divider text="Build Details"></Divider>
        <View style={styles.buildDetailsWrapper}>
          <StatusSidebar buildState={buildDetails.state} buildNumber={buildDetails.number} />
          <View style={styles.buildDetails}>
            <Text style={[styles.commitMessage, styles.buildDetailsText]} numberOfLines={2}>
              {this.props.build.response.commit.message}
            </Text>
            <Text style={styles.buildDetailsText}>{date}</Text>
            <Text style={styles.buildDetailsText}>{durationText}</Text>
          </View>
        </View>

        <Divider text="Commit Info"></Divider>
        <View style={styles.commitInfo}>
          <DetailRow icon="person" text={this.props.build.response.commit.author_name} />
          {prText ? ( <DetailRow icon="git-pull-request" text={prText} /> ) : null}
          <DetailRow icon="git-branch" text={this.props.build.response.commit.branch} />

          {this.props.isPro ? null : (
            <View style={styles.githubButtonWrapper}>
              <Icon.Button
                style={styles.githubButton}
                onPress={this.openGitHub.bind(this)}
                name="mark-github">
                  Compare commit on GitHub
              </Icon.Button>
            </View>
          )}
        </View>

        <Divider text="Jobs"></Divider>
        <JobsListView
          jobs={this.state.jobsSource}
          isPro={this.props.isPro}
          navigator={this.props.navigator} />
      </ScrollView>
    );
  }
};

function mapStateToProps(state) {
  return {
    build: state.build,
  };
};

export default connect(mapStateToProps, { fetchBuild })(BuildScreen);
