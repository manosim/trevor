import React from 'react-native';

var {
  StyleSheet,
  TextInput,
  View
} = React;

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
    this.props.search(text);

    this.setState({
      text: text
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputText}
          onChangeText={this.changeText.bind(this)}
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
};
