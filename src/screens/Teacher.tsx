// TeacherScreen.tsx
// Teacher.tsx
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';
import { FAB, Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const Teacher = () => {
  const navigation = useNavigation();

  const handleContactButtonClick = () => {
    // For demo purpose, show an alert when the contact button is pressed
    Alert.alert('Contact Pressed', 'This is a demo alert for contacting the teacher!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Teacher Profile</Text>
        </View>

        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: 'https://randomuser.me/api/portraits/women/2.jpg',
            }}
            style={styles.profileImage}
          />
          <Text style={styles.profileInfo}>
            <Text style={{ fontWeight: 'bold' }}>Name:</Text> Dr. Emily Johnson{'\n'}
            <Text style={{ fontWeight: 'bold' }}>Subjects:</Text> Mathematics, Physics{'\n'}
            <Text style={{ fontWeight: 'bold' }}>Introduction:</Text>{' '}
            Passionate about making learning fun and interactive.
          </Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.message}>
            Welcome to the Teacher Profile! Explore the world of knowledge with EduBuddy.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          {/* Add a button to contact the teacher */}
          <Button
            style={styles.contactButton}
            onPress={handleContactButtonClick}
            appearance="outline"
          >
            Contact Teacher
          </Button>
        </View>
      </ScrollView>

      {/* Add a floating action button for navigation */}
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
    backgroundColor: '#3498db',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2c3e50',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  contentContainer: {
    padding: 12,
    flex: 1,
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    padding: 16,
    alignItems: 'center',
  },
  contactButton: {
    width: '80%',
    marginTop: 10,
  },
});

export default Teacher;
