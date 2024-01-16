import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppwriteContext } from './appwrite/AppwriteContext';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

const App = () => {
  const { isLoggedIn } = useContext(AppwriteContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
