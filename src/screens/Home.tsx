import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Pressable,ScrollView } from 'react-native';
import { FAB } from '@rneui/themed';
import Snackbar from 'react-native-snackbar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppwriteContext } from '../appwrite/AppwriteContext';
import Student from '../screens/Student';
import Teacher from '../screens/Teacher';
import Mentor from '../screens/Mentor';
import Admin from '../screens/Admin';
import StudyMat from './StudyMat';
import useNavigation from '@react-navigation/native';
import Login from '../screens/Login';
import { AuthStackParamList } from '../routes/AuthStack';
type HomeScreenProps = NativeStackScreenProps<AuthStackParamList, 'Home'>;

const getRoleSpecificMessage = (role) => {
  switch (role) {
    case 'student':
      return 'Welcome, Student! Explore and track your educational activities.';
    case 'teacher':
      return 'Welcome, Teacher! Manage and monitor your classroom activities.';
    case 'mentor':
      return 'Welcome, Mentor! Guide and support your students on their educational journey.';
    case 'admin':
      return 'Welcome, Admin! Administer and oversee the EduBuddy platform.';
    case 'studymat':
      return 'Explore Study Materials!';
    default:
      return 'Welcome to EduBuddy! Your personalized education companion.';
  }
};

const Home = ({ route, navigation }: HomeScreenProps) => {
  const { appwrite, setIsLoggedIn, logout } = useContext(AppwriteContext);
  const [userData, setUserData] = useState<any>(null);
  const role = userData?.role || route?.params?.role;
  useEffect(() => {
    // Fetch user role from AsyncStorage
    const fetchUserRole = async () => {
      try {
        const storedUserRole = await AsyncStorage.getItem('userRole');
        if (storedUserRole) {
          setUserData({ role: storedUserRole });
        }
      } catch (error) {
        console.error('Error fetching user role from AsyncStorage:', error);
      }
    };

    // Fetch user data from Appwrite
    const fetchUserData = () => {
      appwrite
        .getCurrentUser()
        .then((response) => {
          if (response) {
            console.log('User Data:', response);
            setUserData(response);
          } else {
            setUserData(null);
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    };

    fetchUserRole();
    fetchUserData();
  }, [appwrite]);

  const handleLogout = () => {
    logout()
      .then(() => {
        setIsLoggedIn(false);
        Snackbar.show({
          text: 'Logout Successful',
          duration: Snackbar.LENGTH_SHORT,
        });
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };
  const handleLogout = () => {
    logout()
      .then(() => {
        setIsLoggedIn(false);
        Snackbar.show({
          text: 'Logout Successful',
          duration: Snackbar.LENGTH_SHORT,
        });
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      
        <View style={styles.header}>
          <Text style={styles.headerText}>EduBuddy</Text>
        </View>

        <View style={styles.userContainer}>
          <Text style={styles.userDetailsTitle}>User Details</Text>
          <Text style={styles.userDetails}>Name: {userData?.name || 'N/A'}</Text>
          <Text style={styles.userDetails}>Email: {userData?.email || 'N/A'}</Text>
          <Text style={styles.userDetails}>Role: {route.params?.role || 'N/A'}</Text>
        </View>

        <View style={styles.roleContainer}>
          <View style={styles.roleRow}>
            <Pressable
              style={styles.roleBox}
              onPress={() => navigation.navigate('Student')}>
              <Text style={styles.roleText}>Activity</Text>
            </Pressable>

            <Pressable
              style={styles.roleBox}
              onPress={() => navigation.navigate('Mentor')}>
              <Text style={styles.roleText}>Mentor</Text>
            </Pressable>
          </View>

          <View style={styles.roleRow}>
            {userData?.role === 'Admin' && (
              <Pressable
                style={styles.roleBox}
                onPress={() => navigation.navigate('Admin')}>
                <Text style={styles.roleText}>Admin</Text>
              </Pressable>
            )}

            <Pressable
              style={styles.roleBox}
              onPress={() => navigation.navigate('Teacher')}>
              <Text style={styles.roleText}>Teacher</Text>
            </Pressable>

            {/* Study Mat Role */}
            <Pressable
              style={styles.roleBox}
              onPress={() => navigation.navigate('StudyMat', { role: 'studymat' })}>
              <Text style={styles.roleText}>Study Mat</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.middleContent}>
          <Text style={styles.message}>{getRoleSpecificMessage(route.params?.role)}</Text>
        </View>

        {/* {userData && (
          <View style={styles.userContainer}>
            <Text style={styles.userDetailsTitle}>User Details</Text>
            <Text style={styles.userDetails}>Name: {userData.name}</Text>
            <Text style={styles.userDetails}>Email: {userData.email}</Text>
            <Text style={styles.userDetails}>
              Role: {userData?.role || 'Student'}
            </Text>
          </View>
        )} */}

        <FAB
          placement="right"
          color="#f02e65"
          size="large"
          title="Logout"
          icon={{ name: 'logout', color: '#FFFFFF' }}
          onPress={handleLogout}
          style={styles.logoutButton} // Apply the logoutButton style
          />
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D32',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#1d9bf0',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userContainer: {
    margin: 20,
    padding: 12,
    backgroundColor: '#1d9bf0',
    borderRadius: 10,
  },
  userDetailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  userDetails: {
    fontSize: 15,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  roleContainer: {
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  roleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  roleBox: {
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  roleText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  middleContent: {
    alignItems: 'center',
    marginTop: 20,
  },
  message: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 10,
  },
  logoutButton: {
    position: 'absolute',
    marginBottom: 20,
    right: 20,
  },
});

export default Home;