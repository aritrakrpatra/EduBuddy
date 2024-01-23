import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppwriteContext } from './appwrite/AppwriteContext';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Student from './screens/Student';
import Teacher from './screens/Teacher';
import Mentor from './screens/Mentor';
import Admin from './screens/Admin';
import StudyMat from '../src/screens/StudyMat'; 

const Stack = createNativeStackNavigator();

const App = () => {
  const { isLoggedIn } = useContext(AppwriteContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Student" component={Student} />
        <Stack.Screen name="Teacher" component={Teacher} />
        <Stack.Screen name="Mentor" component={Mentor} />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="StudyMat" component={StudyMat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
