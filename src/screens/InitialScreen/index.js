import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
/* Packages */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* Components */
import { Button } from '../../components/Button';
/* Actions */
import { startQuiz } from '../../redux/questions';

const mainActions = { startQuiz };

class InitialScreen extends Component {
  render() {
    const {
      startQuiz,
      navigation: {
        navigate
      }
    } = this.props;
    return (
      <View style={styles.conainer}>
        <Text>Welcome to our Quiz</Text>
        <Button
          label="Start Quiz"
          onPress={() => {
            startQuiz();
            navigate('QuestionsScreen')
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
    alignItems: 'center'
  }
});

export default connect(
  () => ({}),
  dispatch => bindActionCreators(mainActions, dispatch)
)(InitialScreen);