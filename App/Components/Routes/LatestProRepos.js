import _ from 'underscore';
import React from 'react-native';

import Api from '../../Utils/Api';
import EmptyResults from '../EmptyResults';
import Loading from '../Loading';
import RepoItem from '../RepoItem';

var {
  StyleSheet,
  ListView,
  View
} = React;

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

export default class LatestProRepos extends React.Component {

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      loading: false,
      repos: [],
      reposSource: ds.cloneWithRows([])
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    const self = this;

    this.setState({
      loading: true
    });

    Api.getLatestPro()
      .then(function (res) {
        self.setState({
          loading: false,
          repos: res.repos,
          reposSource: self.state.reposSource.cloneWithRows(res.repos)
        });
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
        <Loading text='Latest' />
      );
    }

    if (_.isEmpty(this.state.repos)) {
      return (
        <EmptyResults />
      );
    }

    return (
      <View style={styles.container}>
        <ListView
          contentContainerStyle={styles.listViewContainer}
          dataSource={this.state.reposSource}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={this._renderSeparator} />
      </View>
    );
  }
};
