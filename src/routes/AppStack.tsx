// AppStack.tsx or wherever your navigation stack is defined

import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Student from '../screens/Student';
import Teacher from '../screens/Teacher';
import StudyMat from '../screens/StudyMat'; 

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Student" component={Student} />
      <Stack.Screen name="Teacher" component={Teacher} />
      <Stack.Screen name="StudyMat" component={StudyMat} />

    </Stack.Navigator>
  );
};

export default AppStack;
