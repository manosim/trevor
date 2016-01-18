import React from 'react-native';

import Api from '../../Utils/Api';
import Loading from '../Loading';

var {
  StyleSheet,
  Text,
  View
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
});

export default class JobDetails extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      details: {}
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

    console.log(this.props.jobId, this.props.isPro);

    Api.getJobDetails(this.props.jobId, this.props.isPro)
      .then(function (res) {
        console.log(res);
        self.setState({
          loading: false,
          details: res
        });
      });
  }


  render() {
    if (this.state.loading) {
      return (
        <Loading text='Job Details' />
      );
    }

    return (
      <View style={styles.container}>
        <Text>
          asd
        </Text>
      </View>
    );
  }
};
