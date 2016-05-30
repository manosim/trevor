import _ from 'underscore';
import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';

import {
  ListView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

import { fetchRepos } from '../Actions';
import CustomRefreshControl from '../Helpers/CustomRefreshControl';
import EmptyResults from '../Components/EmptyResults';
import Loading from '../Components/Loading';
import RepoItem from '../Components/RepoItem';
import SearchBar from '../Components/SearchBar';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  separator: {
    height: 2,
    backgroundColor: '#e9e9e9'
  }
});

class ReposScreen extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      clearSearch: false,
      repos: [],
      reposSource: ds.cloneWithRows([])
    };
  }

  componentWillMount() {
    this.setState({
      clearSearch: false
    });

    this.props.fetchRepos(this.props.isPro, this.props.username);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.repos.response !== this.props.repos.response) {
      this.setState({
        repos: nextProps.repos.response,
        reposSource: this.state.reposSource.cloneWithRows(nextProps.repos.response)
      });
    }
  }

  _renderBuildRow(rowData: string, sectionID: number, rowID: number) {
    return (
      <RepoItem
        details={rowData}
        isPro={this.props.isPro}
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

  searchRepos(keyword) {
    var results = _.filter(this.state.repos, function (obj) {
      return obj.slug.split('/')[1].indexOf(keyword) > -1;
    });

    this.setState({
      reposSource: this.state.reposSource.cloneWithRows(results)
    });
  }

  _renderHeader(refreshingIndicator) {
    return (
      <View>
        {refreshingIndicator}
        <SearchBar search={this.searchRepos.bind(this)} clear={this.state.clearSearch} />
      </View>
    );
  }

  render() {
    if (this.props.repos.isFetching) {
      return <Loading text="Repositories" />;
    }

    if (!this.props.repos.response.length) {
      return <EmptyResults />;
    }

    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <CustomRefreshControl
            refreshing={this.props.repos.isReFetching}
            onRefresh={() => this.props.fetchRepos(this.props.isPro, this.props.username, true)} />
        }>
        <ListView
          contentContainerStyle={styles.listViewContainer}
          dataSource={this.state.reposSource}
          renderHeader={this._renderHeader.bind(this)}
          renderRow={this._renderBuildRow.bind(this)}
          renderSeparator={this._renderSeparator} />
      </ScrollView>
    );
  }
};


function mapStateToProps(state) {
  return {
    repos: state.repos,
  };
};

export default connect(mapStateToProps, { fetchRepos })(ReposScreen);
