import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Rewards = () => {
  const insets = useSafeAreaInsets();

  // Mock data for rewards
  const rewardsData = [
    {
      id: '1',
      title: 'Welcome Bonus',
      points: 100,
      date: 'Oct 15, 2025',
      description: 'For joining CityCoupons',
    },
    {
      id: '2',
      title: 'Daily Check-in',
      points: 50,
      date: 'Nov 10, 2025',
      description: 'Consistent user bonus',
    },
    {
      id: '3',
      title: 'Referral Reward',
      points: 200,
      date: 'Nov 5, 2025',
      description: 'For inviting a friend',
    },
  ];

  const totalPoints = 350; // Mock total points

  const renderRewardItem = ({ item }) => (
    <View style={styles.rewardItem}>
      <View style={styles.rewardHeader}>
        <Text style={styles.rewardTitle}>{item.title}</Text>
        <Text style={styles.rewardPoints}>+{item.points} pts</Text>
      </View>
      <Text style={styles.rewardDate}>{item.date}</Text>
      <Text style={styles.rewardDescription}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: (Platform.OS === 'ios' ? 85 : 65) + insets.bottom,
        },
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Rewards</Text>
          <Text style={styles.headerSubtitle}>Earn points and redeem exciting offers!</Text>
        </View>

        {/* Points Card */}
        <View style={styles.pointsCard}>
          <Text style={styles.pointsLabel}>Total Points</Text>
          <Text style={styles.pointsValue}>{totalPoints}</Text>
          <TouchableOpacity style={styles.redeemButton}>
            <Text style={styles.redeemButtonText}>Redeem Now</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Rewards Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Rewards</Text>
          {rewardsData.map((item) => (
            renderRewardItem({ item })
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  pointsCard: {
    backgroundColor: '#F0F8FF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pointsLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  pointsValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 16,
  },
  redeemButton: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  redeemButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  rewardItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  rewardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
  },
  rewardPoints: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10B981',
  },
  rewardDate: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 14,
    color: '#666666',
  },
});

export default Rewards;