'use strict';

var React = require('react-native');

var {
  StyleSheet,
  TextInput,
  View
} = React;

var SearchBar = React.createClass({
  displayName: 'SearchBar',

  getInitialState: function() {
    return {
      text: ''
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.clear) {
      this.setState({
        text: ''
      });
    }
  },

  changeText: function (text) {
    this.props.search(text);

    this.setState({
      text: text
    });
  },

  render: function() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputText}
          onChangeText={this.changeText}
          value={this.state.text}
          autoCapitalize='none'
          autoCorrect={false}
          placeholder='Enter Search Keywords...'
          placeholderTextColor='#b0b0b0'
          clearButtonMode='always'
          returnKeyType='search' />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#40454F',
    paddingVertical: 15,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputText: {
    height: 30,

    fontSize: 14,

    color: '#FFFFFF',
    paddingHorizontal: 10,

    borderColor: '#FFFFFF',
    borderWidth: 0.5,
    borderRadius: 5,

  }
});

module.exports = SearchBar;
