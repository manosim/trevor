import React from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

var {
  StyleSheet,
  Text,
  View,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 2,
    justifyContent: 'center'
  },
  icon: {
    fontSize: 16,
    textAlign: 'center',
    width: 25
  },
  text: {
    flex: 1,
    fontSize: 16,
    lineHeight: 17
  }
});

export default class DetailRow extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon style={styles.icon} name={this.props.icon} />
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
};
