// StudyMaterial.tsx
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FAB } from '@rneui/themed';

const StudyMat = () => {
  const navigation = useNavigation();
  // Dummy study material data for demonstration
  const studyMaterialData = [
    {
      id: 1,
      title: 'Mathematics Basics',
      description: 'Learn the fundamentals of mathematics.',
    },
    {
      id: 2,
      title: 'History of Science',
      description: 'Explore the history of scientific discoveries.',
    },
    {
      id: 3,
      title: 'Introduction to Programming',
      description: 'Get started with programming concepts.',
    },
    {
      id: 4,
      title: 'Literature Classics',
      description: 'Read timeless literature masterpieces.',
    },
    {
      id: 5,
      title: 'Geography Insights',
      description: 'Discover interesting facts about world geography.',
    },
  ];
  const handleBackToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Study Material</Text>
      </View>

      <View style={styles.studyMaterialContainer}>
        {studyMaterialData.map((item) => (
          <View key={item.id} style={styles.studyMaterialCard}>
            <Text style={styles.studyMaterialTitle}>{item.title}</Text>
            <Text style={styles.studyMaterialDescription}>{item.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>

    {/* Back to Home Button */}
    <FAB
    placement="right"
    color="#1D8BF9"
    size="large"
    title="Back to Home"
    icon={{ name: 'arrow-left', color: '#FFFFFF' }}
    onPress={handleBackToHome}
    style={styles.fab}
  />
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    backgroundColor: '#1d9bf0',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  studyMaterialContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 16,
  },
  studyMaterialCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 8,
    padding: 16,
    width: '45%', // Adjust the width as per your preference
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  studyMaterialTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  studyMaterialDescription: {
    fontSize: 14,
    color: '#555555',
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});

export default StudyMat;
