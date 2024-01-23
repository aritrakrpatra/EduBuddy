// AdminScreen.tsx
// Admin.tsx
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Alert } from 'react-native';
import { FAB } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import AdminDashboard from '../components/AdminDashboard';
import Home from '../screens/Home';

const Admin = () => {
  const navigation = useNavigation();

  const handleButtonClick = () => {
    // For demo purpose, show an alert when the button is pressed
    Alert.alert('Button Pressed', 'This is a demo alert!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Admin Screen</Text>
      </View>

      <AdminDashboard />

      <View style={styles.contentContainer}>
        {/* <Image
          source={{
            uri: 'https://images.pexels.com/photos/9180717/pexels-photo-9180717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            width: 300,
            height: 100,
            cache: 'default',
          }}
          resizeMode="cover"
          style={styles.image}
        /> */}
        <Text style={styles.message}>
          Welcome to the Admin Screen! Manage and oversee the educational
          platform with EduBuddy.
        </Text>
      </View>

      <FAB
        placement="right"
        color="#f02e65"
        size="large"
        title="Back to Home"
        icon={{ name: 'arrow-left', color: '#FFFFFF' }}
        onPress={() => {
          navigation.navigate('Home');
        }}
      />

      <FAB
        placement="center"
        color="#f02e65"
        size="large"
        title="Press Me"
        icon={{ name: 'star', color: '#FFFFFF' }}
        onPress={handleButtonClick}
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
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#f39c12',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  contentContainer: {
    padding: 12,
    flex: 1,
    alignItems: 'center',
  },
  image: {
    borderRadius: 10,
    marginBottom: 0,
    marginTop: 10,
  },
  message: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom:10,
  },
});

export default Admin;