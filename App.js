import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from './redux/store';
import Posts from './screens/Posts';
import Comments from './screens/Comments';
import EditComment from './screens/EditComment';

export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Posts'>
          <Stack.Screen name="Posts" component={Posts} />
          <Stack.Screen name="Comments" component={Comments} />
          <Stack.Screen name="Edit Comment" component={EditComment} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}