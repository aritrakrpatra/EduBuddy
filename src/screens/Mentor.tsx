import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { FAB, Card } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const Mentor = () => {
  const navigation = useNavigation();
  const [feedback, setFeedback] = useState('');
  const [mentees, setMentees] = useState([
    { id: '1', name: 'Mentor 1' },
    { id: '2', name: 'Mentor 2' },
    { id: '3', name: 'Mentor 3' },
    // Add more mentees as needed
  ]);

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };

  const handleSubmitFeedback = () => {
    if (feedback.trim() !== '') {
      // Logic to submit feedback or perform other actions
      alert(`Feedback submitted: ${feedback}`);
      setFeedback('');
    } else {
      alert('Please provide feedback before submitting.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Mentor Screen</Text>
      </View>

      {/* Mentor Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.message}>
          Welcome to the Mentor Screen! Here, mentors can provide guidance and support to students.
        </Text>

        {/* Feedback Input */}
        <TextInput
          style={styles.input}
          placeholder="Provide Feedback"
          placeholderTextColor="#757575"
          multiline
          value={feedback}
          onChangeText={(text) => setFeedback(text)}
        />

        {/* Submit Feedback Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitFeedback}>
          <Text style={styles.submitButtonText}>Submit Feedback</Text>
        </TouchableOpacity>

        {/* Mentees List */}
        <Text style={styles.sectionTitle}>Your Mentors</Text>
        <FlatList
          data={mentees}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.menteeCard}>
              <Text style={styles.menteeName}>{item.name}</Text>
              {/* Add more mentee details as needed */}
            </Card>
          )}
        />

        {/* Upcoming Events Section */}
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <Card style={styles.eventCard}>
          <Text style={styles.eventTitle}>Mentorship Workshop</Text>
        </Card>
        <Card style={styles.eventCard}>
          <Text style={styles.eventTitle}>Career Guidance Session</Text>
        </Card>
        {/* Add more upcoming events as needed */}
      </View>

      {/* Back to Home FAB */}
      <FAB
        placement="right"
        color="#03A9F4"
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
    backgroundColor: '#F1E3D0',
  },
  header: {
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#03A9F4',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  contentContainer: {
    padding: 16,
  },
  message: {
    fontSize: 18,
    color: '#424242',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
    color: '#000000',
    textAlignVertical: 'top', // Align text to the top in multiline mode
  },
  submitButton: {
    backgroundColor: '#03A9F4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#424242',
    marginTop: 8,
    marginBottom: 8,
  },
  menteeCard: {
    marginBottom: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#81C784',
  },
  menteeName: {
    fontSize: 16,
    color: '#424242',
    fontWeight: 'bold',
  },
  eventCard: {
    marginBottom: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFD54F',
  },
  eventTitle: {
    fontSize: 16,
    color: '#424242',
    fontWeight: 'bold',
  },
});

export default Mentor;
