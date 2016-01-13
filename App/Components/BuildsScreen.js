import _ from 'underscore';
import React from 'react-native';
import RefreshableListView from 'react-native-refreshable-listview';
var moment = require('moment');
require('moment-duration-format');

import Api from '../Utils/Api';
import BuildScreen from './BuildScreen';
import StatusSidebar from './StatusSidebar';
import Loading from './Loading';
import LoadingPull from './LoadingPull';

var {
  StyleSheet,
  Text,
  View,
  ListView,
  SegmentedControlIOS,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  repoName: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
    textAlign: 'center'
  },
  segmentWrapper: {
    padding: 10,
    backgroundColor: '#357389'
  },
  buildRow: {
    flexDirection: 'row',
    flex: 1,
    padding: 0,
    marginBottom: 1
  },
  buildMessage: {
    marginBottom: 2
  },
  buildInfo: {
    flex: 0.85,
    padding: 10
  },
  buildDate: {
    flexDirection: 'column',
    flex: 0.8,
  },
  buildDuration: {
    marginBottom: 2
  },
  separator: {
    height: 2,
    backgroundColor: '#e9e9e9'
  }
});

export default class BuildsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      builds: [],
      buildsSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }).cloneWithRows([])
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

    Api.getBuilds(this.props.slug, this.props.isPro)
      .then(function (res) {
        var builds = res.builds;

        _.map(builds, function (obj) {
          var commit = _.find(res.commits, function(commit){
            return obj.commit_id == commit.id;
          });
          obj.commit = commit;
        });

        self.setState({
          loading: false,
          builds: builds,
          buildsSource: self.state.buildsSource.cloneWithRows(builds)
        });
      });
  }

  _pressRow(details) {
    this.props.navigator.push({
      title: 'Build #' + details.number,
      component: BuildScreen,
      passProps: {
        isPro: this.props.isPro,
        buildId: details.id
      }
    });
  }

  _renderBuildRow(rowData: string, sectionID: number, rowID: number) {
    var date = rowData.duration ? 'Finished ' + moment(rowData.finished_at).fromNow() :
      'Started ' + moment(rowData.started_at).fromNow();

    var duration = moment.duration(rowData.duration, 'seconds')
      .format('[Run for] m [minutes], s [seconds]');

    return (
      <TouchableHighlight
         activeOpacity={0.85}
         underlayColor={'white'}
         onPress={() => this._pressRow(rowData)}>
         <View style={styles.buildRow}>
           <StatusSidebar
             buildState={rowData.state}
             buildNumber={rowData.number} />

           <View style={styles.buildInfo}>
             <Text style={styles.buildMessage} numberOfLines={1}>{rowData.commit.message}</Text>

             {rowData.started_at ? (
               <Text style={styles.buildDate}>{date}</Text>
             ) : <View />}


             {rowData.duration ? (
               <Text style={styles.buildDuration}>Run for {duration}</Text>
             ) : (
               <Text style={styles.buildDuration}>
                 State: {rowData.state}
               </Text>
             )}
           </View>
         </View>
      </TouchableHighlight>
    );
  }

  _onSegmentChange(value) {
    switch(value) {
      case 'Builds':
        var filtered = _.filter(this.state.builds, function(obj) {
          return obj.pull_request == false;
        });
        this.setState({
          buildsSource: this.state.buildsSource.cloneWithRows(filtered)
        });
        break;
      case 'Pull Requests':
        var filtered = _.filter(this.state.builds, function (obj) {
          return obj.pull_request == true;
        });
        this.setState({
          buildsSource: this.state.buildsSource.cloneWithRows(filtered)
        });
        break;
      default:
        this.setState({
          buildsSource: this.state.buildsSource.cloneWithRows(this.state.builds)
        });
    }
  }

  _renderHeader(refreshingIndicator) {
    return (
      <View>
        {refreshingIndicator}
        <View style={styles.segmentWrapper}>
          <Text style={styles.repoName}>{this.props.slug}</Text>
          <SegmentedControlIOS
            style={styles.segment}
            values={['All', 'Builds', 'Pull Requests']}
            tintColor='#FFF'
            selectedIndex={0}
            onValueChange={this._onSegmentChange} />
        </View>
      </View>
    );
  }

  _renderSeparator(
    sectionID: number | string, rowID: number | string, adjacentRowHighlighted: boolean
  ) {
    return (
      <View key={'SEP_' + sectionID + '_' + rowID} style={styles.separator} />
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading text='Builds' />
      );
    }

    return (
      <RefreshableListView
        style={styles.container}
        dataSource={this.state.buildsSource}
        renderRow={this._renderBuildRow}
        renderHeaderWrapper={this._renderHeader}
        renderSeparator={this._renderSeparator}
        loadData={this.fetchData}
        refreshingIndictatorComponent={<LoadingPull />} />
    );
  }
};
