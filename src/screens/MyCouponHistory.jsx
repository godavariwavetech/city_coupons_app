import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';

const { width } = Dimensions.get('window');

const MyCouponHistory = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  // Format current month for initial filter display
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const initialFormattedDate = `${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;
  const [selectedFilter, setSelectedFilter] = useState(initialFormattedDate);

  // Sample coupon history data
  const couponHistory = [
    {
      id: '1',
      storeName: 'Café Coffee Day – Gokavaram Road',
      offer: 'Flat 20% OFF on all Beverages',
      redeemedDate: '12 Oct 2025',
      logo: require('../assets/cafelogo.png'),
    },
    {
      id: '2',
      storeName: 'Café Coffee Day – Gokavaram Road',
      offer: 'Flat 20% OFF on all Beverages',
      redeemedDate: '12 Oct 2025',
      logo: require('../assets/cafelogo.png'),
    },
    {
      id: '3',
      storeName: 'Café Coffee Day – Gokavaram Road',
      offer: 'Flat 20% OFF on all Beverages',
      redeemedDate: '12 Oct 2025',
      logo: require('../assets/cafelogo.png'),
    },
    {
      id: '4',
      storeName: 'Café Coffee Day – Gokavaram Road',
      offer: 'Flat 20% OFF on all Beverages',
      redeemedDate: '12 Oct 2025',
      logo: require('../assets/cafelogo.png'),
    },
    {
      id: '5',
      storeName: 'Café Coffee Day – Gokavaram Road',
      offer: 'Flat 20% OFF on all Beverages',
      redeemedDate: '12 Oct 2025',
      logo: require('../assets/cafelogo.png'),
    },
  ];

  const handleFilterPress = () => {
    setOpen(true);
  };

  const onDateConfirm = (date) => {
    setOpen(false);
    setSelectedDate(date);
    const formattedDate = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    setSelectedFilter(formattedDate);
  };

  const onDateCancel = () => {
    setOpen(false);
  };

  const renderHistoryCard = ({ item }) => (
    <View style={styles.historyCard}>
      <Image source={item.logo} style={styles.storeLogo} resizeMode="contain" />
      <View style={styles.historyDetails}>
        <Text style={styles.storeName}>{item.storeName}</Text>
        <Text style={styles.offerText}>{item.offer}</Text>
        <Text style={styles.redeemedText}>Redeemed on: {item.redeemedDate}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={[styles.container, { paddingTop: insets.top + 15 }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Coupon History</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Filter Button */}
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
            <Text style={styles.filterText}>{selectedFilter}</Text>
            <MaterialCommunityIcons name="calendar-blank" size={18} color="#1E3A8A" />
          </TouchableOpacity>
        </View>

        {/* History List */}
        <FlatList
          data={couponHistory}
          renderItem={renderHistoryCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.listContainer,
            { paddingBottom: insets.bottom + 20 },
          ]}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <DatePicker
        modal
        open={open}
        date={selectedDate}
        onConfirm={onDateConfirm}
        onCancel={onDateCancel}
        maximumDate={new Date()}
        minimumDate={new Date(2020, 0, 1)}
        mode="date"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6B7280',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'flex-end',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 8,
  },
  filterText: {
    fontSize: 14,
    color: '#1E3A8A',
    fontWeight: '500',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  storeLogo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  historyDetails: {
    flex: 1,
    marginLeft: 12,
  },
  storeName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  offerText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  redeemedText: {
    fontSize: 12,
    color: '#999',
  },
});

export default MyCouponHistory;