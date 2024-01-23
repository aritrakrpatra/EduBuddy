import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-community/async-storage';
import Home from '../screens/Home';
import Admin from '../screens/Admin';

// react native elements
import { FAB } from '@rneui/themed';
// Snackbar
import Snackbar from 'react-native-snackbar';

// context API
import { AppwriteContext } from '../appwrite/AppwriteContext';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../routes/AuthStack';

type SignupScreenProps = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const Signup = ({ navigation }: SignupScreenProps) => {
  const { appwrite, setIsLoggedIn } = useContext(AppwriteContext);

  const [error, setError] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSignup = () => {
    if (
      name.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      repeatPassword.length < 1
    ) {
      setError('All fields are required');
    } else if (password !== repeatPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      setLoading(true);

      const user = {
        email,
        password,
        name,
        role, // Include the role in the user object
      };
      

      appwrite
        .createAccount(user)
        .then((response: any) => {
          setLoading(false);
          if (response) {
            const { user } = response;
      
            // Assuming the user object contains a 'role' field
            const userRole = user?.role || 'Student'; // Provide default role
            AsyncStorage.setItem('userRole', userRole);
            setIsLoggedIn(true);

            // Collect user data
          const userData = {
            name,
            email,
            role,
          };

          // Check if the user is an admin
          if (role === 'Admin') {
            // Set a default password for admin access
            const adminPassword = 'admin123';

            // If the password matches the default admin password, navigate to Admin screen
            if (password === adminPassword) {
              navigation.navigate('Admin',);
            } else {
              // Password is incorrect, you may want to handle this case
              setError('Unauthorized access. Incorrect password for admin role');
            }
          } else {
            // Navigate to the Home screen for non-admin roles
            
            navigation.navigate('Home', { role: userRole });
            // navigation.navigate('Login', { userData });
          }
          }
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
          setError(e.message);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.appName}>EduBuddy</Text>
        {loading && <ActivityIndicator size="large" color="#f02e65" />}

        {/* Name */}
        <TextInput
          value={name}
          onChangeText={(text) => {
            setError('');
            setName(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Name"
          style={styles.input}
          accessibilityLabel="Name Input"
        />

        {/* Email */}
        <TextInput
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => {
            setError('');
            setEmail(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Email"
          style={styles.input}
          accessibilityLabel="Email Input"
        />

        {/* Password */}
        <TextInput
          value={password}
          onChangeText={(text) => {
            setError('');
            setPassword(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Password"
          secureTextEntry={!showPassword}
          style={styles.input}
          accessibilityLabel="Password Input"
        />
        {/* Show/Hide Password Button */}
        <Pressable
          style={styles.passwordToggle}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.passwordToggleText}>
            {showPassword ? 'Hide Password' : 'Show Password'}
          </Text>
        </Pressable>

        {/* Repeat password */}
        <TextInput
          secureTextEntry
          value={repeatPassword}
          onChangeText={(text) => {
            setError('');
            setRepeatPassword(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Repeat Password"
          style={styles.input}
        />

        {/* Role selection */}
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
          placeholder="Role"
          style={[styles.picker, { marginTop: 5 }]}
        >
          <Picker.Item label="Student" value="Student" />
          <Picker.Item label="Teacher" value="Teacher" />
          <Picker.Item label="Mentor" value="Mentor" />
          <Picker.Item label="Admin" value="Admin" />
        </Picker>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable
          onPress={handleSignup}
          style={[styles.btn, { marginTop: error ? 10 : 20 }]}
        >
          <Text style={styles.btnText}>Sign Up</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Login')}
          style={styles.loginContainer}
        >
          <Text style={styles.haveAccountLabel}>
            Already have an account?{'  '}
            <Text style={styles.loginLabel}>Login</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F6FE', // Light blue background color
    justifyContent: 'center',
  },
  formContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
  },
  appName: {
    color: '#f02e65',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fef8fa',
    padding: 10,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,
    width: '80%',
    color: '#000000',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 1,
  },
  picker: {
    backgroundColor: '#fef8fa',
    padding: 10,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,
    width: '80%',
    color: '#000104',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 1,
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#ffffff',
    padding: 10,
    height: 45,
    alignSelf: 'center',
    borderRadius: 5,
    width: '80%',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
  },
  btnText: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  loginContainer: {
    marginTop: 60,
  },
  haveAccountLabel: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  loginLabel: {
    color: '#1d9bf0',
  },
  passwordToggle: {
    alignSelf: 'center',
    marginTop: 10,
  },
  passwordToggleText: {
    color: '#1d9bf0',
    fontSize: 15,
  },
});

export default Signup;

