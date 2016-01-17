import React from 'react-native';

import Api from '../../Utils/Api';
import Loading from '../Loading';
import Divider from '../../Helpers/Divider';

var {
  StyleSheet,
  ScrollView,
  Text
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  buildDetailsWrapper: {
    width: 32,
    backgroundColor: '#357389',
    justifyContent: 'center',
    alignItems: 'center'
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

  render() {
    if (this.state.loading) {
      return (
        <Loading text='Build' />
      );
    }

    return (
      <ScrollView style={styles.container}>
        <Divider text='Build Details'></Divider>
        <View styles={styles.buildDetailsWrapper}>
          <Text>{this.state.build.number}</Text>
        </View>

        <Divider text='Commit Info'></Divider>
        <Text>{this.state.build.duration}</Text>

        <Divider text='Jobs'></Divider>
        <Text>{this.state.build.finished_at}</Text>
        <Text>{this.state.commit.message}</Text>
      </ScrollView>
    );
  }
};
