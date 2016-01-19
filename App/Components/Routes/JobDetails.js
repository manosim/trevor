import React from 'react-native';

import Api from '../../Utils/Api';
import Loading from '../Loading';

var {
  StyleSheet,
  View,
  WebView
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
      log: null
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

    Api.getLog(this.props.jobId, this.props.isPro)
      .then(function (res) {
        console.log(res);
        self.setState({
          loading: false,
          log: res
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
      <WebView
        style={styles.container}
        html={this.state.log}
        javaScriptEnabled={true} />
    );
  }
};
