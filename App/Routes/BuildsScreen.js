import _ from 'underscore';
import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
var moment = require('moment');
require('moment-duration-format');

import { fetchBuilds } from '../Actions';
import Constants from '../Utils/Constants';
import CustomRefreshControl from '../Helpers/CustomRefreshControl';
import Loading from '../Components/Loading';
import Routes from '../Navigation/Routes';
import StatusSidebar from '../Components/StatusSidebar';

import {
  StyleSheet,
  Text,
  View,
  ListView,
  Platform,
  ScrollView,
  SegmentedControlIOS,
  TouchableHighlight
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  segmentWrapper: {
    padding: 10,
    backgroundColor: Constants.THEME_DARK_BLUE
  },
  buildRow: {
    flexDirection: 'row',
    flex: 1,
    height: 70
  },
  buildMessage: {
    fontWeight: 'bold'
  },
  buildInfo: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  buildDate: {

  },
  buildDuration: {

  },
  separator: {
    height: 2,
    backgroundColor: '#e9e9e9'
  }
});

class BuildsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      builds: [],
      buildsSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }).cloneWithRows([])
    };
  }

  componentWillMount() {
    this.props.fetchBuilds(this.props.isPro, this.props.slug);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.builds.response !== this.props.builds.response) {
      this.setState({
        builds: nextProps.builds.response,
        buildsSource: this.state.buildsSource.cloneWithRows(nextProps.builds.response)
      });
    }
  }

  _pressRow(details) {
    const route = Routes.Build(details.id, {
      isPro: this.props.isPro,
      buildId: details.id
    });

    this.props.navigator.push(route);
  }

  _renderBuildRow(rowData: string, sectionID: number, rowID: number) {
    const date = rowData.duration ? 'Finished ' + moment(rowData.finished_at).fromNow() :
      'Started ' + moment(rowData.started_at).fromNow();

    const duration = moment.duration(rowData.duration, 'seconds')
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
    switch (value) {
      case 'Builds':
        var filtered = _.filter(this.state.builds, (obj) => obj.pull_request === false);
        this.setState({
          buildsSource: this.state.buildsSource.cloneWithRows(filtered)
        });
        break;
      case 'Pull Requests':
        var filtered = _.filter(this.state.builds, (obj) => obj.pull_request === true);
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
    const segmentedControl = Platform.OS === 'ios' ? (
      <View style={styles.segmentWrapper}>
        <SegmentedControlIOS
          style={styles.segment}
          values={['All', 'Builds', 'Pull Requests']}
          tintColor="#FFF"
          selectedIndex={0}
          onValueChange={this._onSegmentChange.bind(this)} />
      </View>
    ) : <View />;

    return (
      <View>
        {refreshingIndicator}
        {segmentedControl}
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
    if (this.props.builds.isFetching) {
      return <Loading text="Builds" />;
    }

    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <CustomRefreshControl
            refreshing={this.props.builds.isReFetching}
            onRefresh={() => this.props.fetchBuilds(this.props.isPro, this.props.slug, true)} />
        }>
        <ListView
          contentContainerStyle={styles.listViewContainer}
          dataSource={this.state.buildsSource}
          renderHeader={this._renderHeader.bind(this)}
          renderRow={this._renderBuildRow.bind(this)}
          renderSeparator={this._renderSeparator} />
      </ScrollView>
    );
  }
};

function mapStateToProps(state) {
  return {
    builds: state.builds,
  };
};

export default connect(mapStateToProps, { fetchBuilds })(BuildsScreen);
