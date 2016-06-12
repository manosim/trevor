import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

import Constants from '../Utils/Constants';

import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Constants.THEME_DARK_BLUE,
    padding: (Platform.OS === 'ios' ? 15 : 10),
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputText: {
    flex: 1,
    height: (Platform.OS === 'ios' ? 30 : 35),
    fontSize: 14,
    color: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 5
  },
  submitButton: {
    width: 80,
    paddingVertical: 6,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constants.THEME_RED,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF'
  }
});

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clear) {
      this.setState({
        text: ''
      });
    }
  }

  changeText(text) {
    if (!this.props.hasSubmit) {
      this.props.search(text);
    }

    this.setState({
      text: text
    });
  }

  doSearch() {
    this.props.search(this.state.text);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputText}
          onChangeText={this.changeText.bind(this)}
          value={this.state.text}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Enter Search Keywords..."
          placeholderTextColor="#b0b0b0"
          clearButtonMode="always"
          returnKeyType="search" />
        {this.props.hasSubmit ? (
          <TouchableHighlight
            style={styles.submitButton}
            underlayColor="#A53230"
            onPress={this.doSearch.bind(this)}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableHighlight>
        ) : <View /> }
      </View>
    );
  }
}
