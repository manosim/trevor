import React from 'react-native';

import Api from '../../Utils/Api';
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
  separator: {
    height: 2,
    backgroundColor: '#e9e9e9'
  }
});

export default class LatestProRepos extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      reposSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }).cloneWithRows([])
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    var self = this;

    this.setState({
      loading: true
    });

    Api.getLatestPro()
      .then(function (res) {

        self.setState({
          loading: false,
          reposSource: self.state.reposSource.cloneWithRows(res.repos)
        });
      });
  }

  _renderBuildRow(rowData: string, sectionID: number, rowID: number) {
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

    return (
      <ListView
        contentContainerStyle={styles.container}
        dataSource={this.state.reposSource}
        renderRow={this._renderBuildRow.bind(this)}
        renderSeparator={this._renderSeparator} />
    );
  }
};
