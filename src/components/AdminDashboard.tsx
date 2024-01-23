// AdminDashboard.tsx
// AdminDashboard.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AdminDashboard = () => {
  // Sample dashboard data (replace it with real data)
  const dashboardData = {
    totalUsers: 150,
    activeCourses: 20,
    pendingApprovals: 5,
    revenue: '₹ 15,000',
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.dashboardContainer}>
        <View style={styles.dashboardItem}>
          <Text style={styles.dashboardLabel}>Total Users</Text>
          <Text style={styles.dashboardValue}>{dashboardData.totalUsers}</Text>
        </View>

        <View style={styles.dashboardItem}>
          <Text style={styles.dashboardLabel}>Active Courses</Text>
          <Text style={styles.dashboardValue}>{dashboardData.activeCourses}</Text>
        </View>

        <View style={styles.dashboardItem}>
          <Text style={styles.dashboardLabel}>Pending Approvals</Text>
          <Text style={styles.dashboardValue}>{dashboardData.pendingApprovals}</Text>
        </View>

        <View style={styles.dashboardItem}>
          <Text style={styles.dashboardLabel}>Revenue</Text>
          <Text style={styles.dashboardValue}>{dashboardData.revenue}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  dashboardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: 0,
  },
  dashboardItem: {
    alignItems: 'center',
    marginBottom: 20,
    width: '45%', // Adjust the width as needed
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
  },
  dashboardLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  dashboardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default AdminDashboard;
