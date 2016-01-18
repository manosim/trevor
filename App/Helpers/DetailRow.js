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
    justifyContent: 'center',
    marginVertical: 2
  },
  icon: {
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'center',
    width: 25
  },
  text: {
    alignSelf: 'center',
    flex: 1,
    fontSize: 16
  }
});

export default class DetailRow extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon style={styles.icon} name={this.props.icon} />
        <Text style={styles.text} numberOfLines={1}>{this.props.text}</Text>
      </View>
    );
  }
};
