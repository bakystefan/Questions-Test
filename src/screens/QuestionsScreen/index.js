import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView
} from 'react-native';
/* Packages */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CheckBox from 'react-native-check-box'
/* Actions */
import { answerOnQuestion, finished } from '../../redux/questions';

const mainActions = { answerOnQuestion, finished };

class QuestionsScreen extends Component {

  componentDidUpdate() {
    const { questions, numbOfAnswer } = this.props;
    if (questions.length === numbOfAnswer) {
      const {
        navigation: {
          navigate
        },
        finished
      } = this.props;
      finished();
      navigate('TotalScreen');
    }
  }

  renderQuestion = (question, key, isCheckedTrue, isCheckedFalse) => (
    <View
      style={styles.questionWrapper}
      key={key}
    >
      <Text style={styles.questionText}>{question}</Text>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <CheckBox
          style={styles.checkBox}
          onClick={()=> this.props.answerOnQuestion(key, true, 'Yes')}
          isChecked={isCheckedTrue}
          rightText="Yes"
        />
        <CheckBox
          style={styles.checkBox}
          onClick={()=> this.props.answerOnQuestion(key, false, 'No')}
          isChecked={isCheckedFalse}
          rightText="No"
        />
      </View>
    </View>
  );

  render() {
    const { loading, questions } = this.props;
    if (loading) {
      return (
        <View style={styles.conainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <ScrollView
        contentContainerStyle={styles.conainer}
      >
        <Text>Good luck</Text>
        {
          questions.map((item, key) =>
            this.renderQuestion(item.question, key, item.isCheckedTrue, item.isCheckedFalse)
          )
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  conainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionWrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  questionText: {
    color: 'black',
    textAlign: 'center'
  },
  checkBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default connect(
  ({ questions: { questions, loading, numbOfAnswer } }) => ({
    questions,
    loading,
    numbOfAnswer
  }),
  dispatch => bindActionCreators(mainActions, dispatch)
)(QuestionsScreen);