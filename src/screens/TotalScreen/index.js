import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
/* Packages */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StackActions, NavigationActions } from 'react-navigation';
/* Components */
import { Button } from '../../components/Button';
/* Actions */
import { resetAll } from '../../redux/questions';

const mainActions = { resetAll };

const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'InitialScreen' }),
  ]
});

class TotalScreen extends Component {
  render() {
    const {
      totalScore,
      questions,
      resetAll,
      navigation: {
        dispatch
      },
      totalTime
    } = this.props;
    return (
      <View style={styles.conainer}>
        <Text style={styles.text}>Your total score is {totalScore}/{questions.length}</Text>
        <Text style={styles.text}>Total time: {totalTime} secounds</Text>
        <Button
          label="Play again"
          onPress={() => {
            dispatch(resetAction);
            resetAll();
          }}
          textStyle={{
            color: 'white'
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 17
  }
});

export default connect(
  ({ questions: { totalScore, questions, totalTime } }) => ({
    totalScore,
    questions,
    totalTime
  }),
  dispatch => bindActionCreators(mainActions, dispatch)
)(TotalScreen);