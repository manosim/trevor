import _ from 'underscore';
import React from 'react-native';

import Api from '../../Utils/Api';
import EmptyResults from '../EmptyResults';
import Loading from '../Loading';
import RepoItem from '../RepoItem';

var {
  RefreshControl
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

export default class CustomRefreshControl extends React.Component {

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      loading: false,
      repos: [],
      reposSource: ds.cloneWithRows([])
    };
  }

  render() {
    return (
      <RefreshControl
        refreshing={this.state.loading}
        onRefresh={this.fetchData.bind(this)}
        tintColor="#ff0000"
        title="Loading..."
        colors={['#ff0000', '#00ff00', '#0000ff']}
        progressBackgroundColor="#ffff00" />
    );
  }
};
