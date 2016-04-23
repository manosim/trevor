import React from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Routes from '../Navigation/Routes';
import Separator from '../Helpers/Separator';
import StatusSidebar from './StatusSidebar';

var {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

var styles = StyleSheet.create({
  jobRow: {
    flexDirection: 'row',
    flex: 1,
    height: 45
  },
  jobDetails: {
    flex: 0.8,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingLeft: 20,
  },
  jobText: {
    fontSize: 16,
  },
  caret: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCaret: {
    fontSize: 24,
    color: '#757575'
  }
});

export default class JobsListView extends React.Component {
  _pressRow(job) {
    const route = Routes.Log({
      isPro: this.props.isPro,
      logId: job.id
    });

    this.props.navigator.push(route);
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableHighlight
         activeOpacity={0.85}
         underlayColor={'white'}
         onPress={() => this._pressRow(rowData)}>
         <View style={styles.jobRow}>
          <StatusSidebar buildState={rowData.state} />
          <View style={styles.jobDetails}>
            <Text style={styles.jobText}>Job #{rowData.number} {rowData.state}</Text>
          </View>
          <View style={styles.caret}>
            <Icon style={styles.iconCaret} name="angle-right" />
          </View>
         </View>
      </TouchableHighlight>
    );
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <Separator key={'SEP_' + sectionID + '_' + rowID} style={styles.separator} />
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.props.jobs}
        renderRow={this._renderRow.bind(this)}
        renderSeparator={this._renderSeparator} />
    );
  }
};
