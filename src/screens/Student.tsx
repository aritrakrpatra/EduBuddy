import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FAB } from '@rneui/themed';

const Student = () => {
  const navigation = useNavigation();

  const [studentActivities, setStudentActivities] = useState([
    { id: '1', title: 'Completed Math assignment', timestamp: '2022-02-01 14:30' },
    { id: '2', title: 'Attended Science class', timestamp: '2022-02-02 09:45' },
    { id: '3', title: 'Submitted History project', timestamp: '2022-02-03 16:20' },
    // Add more activities as needed
  ]);

  const [newActivity, setNewActivity] = useState('');

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };

  const handleAddActivity = () => {
    if (newActivity.trim() === '') {
      Alert.alert('Error', 'Please enter a valid activity title.');
      return;
    }

    // Add the new activity
    const activity = {
      id: `${Date.now()}`,
      title: newActivity.trim(),
      timestamp: new Date().toLocaleString(),
    };

    setStudentActivities((prevActivities) => [activity, ...prevActivities]);
    setNewActivity('');

    Alert.alert('Activity Added', 'A new activity has been added!');
  };

  const handleDeleteActivity = (activityId) => {
    Alert.alert(
      'Delete Activity',
      'Are you sure you want to delete this activity?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedActivities = studentActivities.filter((activity) => activity.id !== activityId);
            setStudentActivities(updatedActivities);
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Student Activities</Text>
      </View>

      {/* Student Activities List */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {studentActivities.map((activity) => (
          <View key={activity.id} style={styles.activityCard}>
            <Text style={styles.activityTitle}>{activity.title}</Text>
            <Text style={styles.activityTimestamp}>{activity.timestamp}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteActivity(activity.id)}>
              <Text style={styles.deleteButtonText}>Delete Activity</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Add Activity Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter new activity..."
        placeholderTextColor="#000104" // Placeholder text color
        value={newActivity}
        onChangeText={(text) => setNewActivity(text)}
      />

      {/* Add Activity Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddActivity}>
        <Text style={styles.addButtonText}>Add Activity</Text>
      </TouchableOpacity>

      {/* Back to Home Button */}
      <FAB
        placement="right"
        color="#1D8BF9"
        size="large"
        title="Back to Home"
        icon={{ name: 'arrow-left', color: '#FFFFFF' }}
        onPress={handleBackToHome}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
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
  contentContainer: {
    flexGrow: 1,
    padding: 16,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  activityTimestamp: {
    fontSize: 14,
    color: '#666666',
  },
  // Add Activity Input Styles
  input: {
    height: 40,
    borderColor: '#1D8BF9',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    color: '#333333', // Text color when there is input
  },
  // Add Activity Button Styles
  addButton: {
    backgroundColor: '#1D8BF9',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 100, // Adjusted margin to prevent overlap
    elevation: 3, // Add elevation for a subtle shadow on Android
    shadowColor: '#000000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 3 }, // Shadow offset for iOS
    shadowOpacity: 0.3, // Shadow opacity for iOS
    shadowRadius: 2, // Shadow radius for iOS
  },
  addButtonText: {
    color: '#F8F9FB',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#1D8BF9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  deleteButtonText: {
    color: '#F8F9FB',
    fontWeight: 'bold',
  },
});

export default Student;
