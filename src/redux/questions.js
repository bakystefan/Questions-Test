// Actions types
export const START_QUIZ = 'questions/START_QUIZ';
export const GET_QUESTION_START = 'questions/GET_QUESTION_START';
export const GET_QUESTION_SUCCESS = 'questions/GET_QUESTION_SUCCESS';
export const GET_QUESTION_FAILED = 'questions/GET_QUESTION_FAILED';
export const ANSWER_SET = 'questions/ANSWER_SET';
export const RESET_ALL = 'questions/RESET_ALL';
export const FINISHED = 'questions/FINISHED';

// Packages
import moment from 'moment';
// Api instance
import Api from '../Helper/Api';

// Helpers
import { transform } from '../Helper/transform';

const initialState = {
  questions: [],
  loading: false,
  startTime: moment(),
  endTime: moment(),
  error: null,
  numbOfAnswer: 0,
  totalScore: 0,
  totalTime: moment()
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case START_QUIZ:
      return {
        ...state,
        startTime: payload.startTime
      };
    case GET_QUESTION_START:
      return {
        ...state,
        loading: true,
      };
    case GET_QUESTION_SUCCESS:
      return {
        ...state,
        questions: payload,
        loading: false,
      };
    case GET_QUESTION_FAILED:
      return {
        ...state,
        error: payload
      };
    case ANSWER_SET:
      return {
        ...state,
        questions: payload,
        numbOfAnswer: payload.filter(item => item.isAnswered).length,
        totalScore: payload.filter(item => item.correct_answer === item.answer).length,
      };
    case FINISHED:
      return {
        ...state,
        endTime: payload,
        totalTime: Math.abs(state.startTime.diff(payload, 'second'))
      };
    case RESET_ALL:
      return { initialState };
    default:
      return state
  }
}

export const startQuiz = () => {
  return dispatch => {
    dispatch({
      type: START_QUIZ,
      payload: {
        startTime: moment()
      }
    });
    dispatch(getQuestions());
  }
}


export const getQuestions = () => {
  const api = new Api();
  return dispatch => {
    dispatch({ type: GET_QUESTION_START });
    api.fetch('GET', '/api.php?amount=10&type=boolean&encode=url3986', {})
      .then(res => {
        if (res.status === 200) {
          const { data: { results } } = res;
          const transformedData = transform(results);
          return dispatch({
            type: GET_QUESTION_SUCCESS,
            payload: transformedData
          })
        }
        dispatch({ type: GET_QUESTION_FAILED, payload: res })
      })
      .catch(err => dispatch({ type: GET_QUESTION_FAILED, payload: err }));
      // this is one way to handle async action
      // another way is async await 
  }
}

export const answerOnQuestion = (id, answer, responseType) => {
  return (dispatch, getState) => {
    const { questions: questionsReducer } = getState();
    const { questions } = questionsReducer;
    const withAnswer = questions.map((item, index) => {
      if (index === id) {
        const responseAnswer = {
          ...item,
          answer,
          isAnswered: true,
          isCheckedTrue: responseType === 'Yes' ? true : false,
          isCheckedFalse: responseType === 'No' ? true : false
        };
        return responseAnswer;
      }
      return item;
    });

    dispatch({
      type: ANSWER_SET,
      payload: withAnswer
    });
  }
}

export const finished = () => ({
  type: FINISHED,
  payload: moment()
})

export const resetAll = () => ({
  type: RESET_ALL
})