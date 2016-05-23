import _ from 'underscore';
import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

import Api from '../Utils/Api';
import EmptyResults from '../Components/EmptyResults';
import Loading from '../Components/Loading';
import RepoItem from '../Components/RepoItem';
import CustomRefreshControl from '../Helpers/CustomRefreshControl';

import {
  ListView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  listViewContainer: {
    flex: 1,

  },
  separator: {
    height: 2,
    backgroundColor: '#e9e9e9'
  }
});

export default class LatestProRepos extends Component {

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      loading: false,
      refreshing: false,
      reposSource: ds.cloneWithRows([])
    };
  }

  componentWillMount() {
    this.fetchData(false);
  }

  fetchData(refresh) {
    const self = this;

    if (refresh) {
      this.setState({ refreshing: true });
    } else {
      this.setState({ loading: true });
    }

    Api.getLatestPro()
      .then(function (res) {
        const updateSource = self.state.reposSource.cloneWithRows(res.repos);
        if (refresh) {
          self.setState({
            refreshing: false,
            reposSource: updateSource
          });
        } else {
          self.setState({
            loading: false,
            reposSource: updateSource
          });
        }
      });
  }

  _renderRow(rowData: string, sectionID: number, rowID: number) {
    return (
      <RepoItem
        details={rowData}
        isPro={true}
        navigator={this.props.navigator} />
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
        <Loading text="Latest" />
      );
    }

    if (_.isEmpty(this.state.reposSource)) {
      return (
        <EmptyResults />
      );
    }

    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <CustomRefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.fetchData.bind(this, true)} />
        }>
        <ListView
          contentContainerStyle={styles.listViewContainer}
          dataSource={this.state.reposSource}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={this._renderSeparator} />
      </ScrollView>
    );
  }
};
