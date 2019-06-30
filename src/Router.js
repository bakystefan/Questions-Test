import {
  InitialScreen,
  QuestionsScreen,
  TotalScreen
} from './screens';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

const AppStack = createStackNavigator(
  {
    InitialScreen: {
      screen: InitialScreen,
      navigationOptions: {
        header: null
      }
    },
    QuestionsScreen: {
      screen: QuestionsScreen,
    },
    TotalScreen: {
      screen: TotalScreen
    }
  },
  {
    initialRouteName: 'InitialScreen',
  }
);

export default Router = createAppContainer(AppStack);