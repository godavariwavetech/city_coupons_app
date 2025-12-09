import React, { useEffect, useState } from 'react';
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
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCouponHistory } from '../redux/reducers/auth'; // Update path accordingly
import { format } from 'date-fns';

const { width } = Dimensions.get('window');

const MyCouponHistory = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.Auth);
  const { couponHistory, couponHistoryLoading, couponHistoryError } = useSelector((state) => state.Auth);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const initialFormattedDate = `${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;
  const [selectedFilter, setSelectedFilter] = useState(initialFormattedDate);

  // Fetch coupon history when screen loads
  useEffect(() => {
    if (userId) {
      dispatch(fetchCouponHistory(userId));
    }
  }, [dispatch, userId]);

  const handleFilterPress = () => {
    setOpen(true);
  };

  const onDateConfirm = (date) => {
    setOpen(false);
    setSelectedDate(date);
    const formattedDate = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    setSelectedFilter(formattedDate);

    // Optional: Filter locally by month/year
    // You can implement filtering logic here if needed
  };

  const onDateCancel = () => {
    setOpen(false);
  };

  // Format usedAt date
  const formatUsedDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy');
    } catch {
      return 'Invalid Date';
    }
  };

  const renderHistoryCard = ({ item }) => (
    <View style={styles.historyCard}>
      <Image
        source={{ uri: item.vendorLogo }}
        style={styles.storeLogo}
        resizeMode="contain"
        defaultSource={require('../assets/profile1.png')} // optional fallback
      />
      <View style={styles.historyDetails}>
        <Text style={styles.storeName}>{item.vendorName || 'Unknown Vendor'}</Text>
        <Text style={styles.offerText}>{item.title}</Text>
        <Text style={styles.redeemedText}>
          Redeemed on: {formatUsedDate(item.usedAt)}
        </Text>
      </View>
    </View>
  );

  const renderContent = () => {
    if (couponHistoryLoading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1E3A8A" />
          <Text style={styles.loadingText}>Loading your history...</Text>
        </View>
      );
    }

    if (couponHistoryError) {
      return (
        <View style={styles.center}>
          <Text style={styles.errorText}>Failed to load history</Text>
          <TouchableOpacity onPress={() => dispatch(fetchCouponHistory(userId))}>
            <Text style={styles.retryText}>Tap to retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (!couponHistory || couponHistory.length === 0) {
      return (
        <View style={styles.center}>
          <MaterialIcons name="receipt-long" size={60} color="#ccc" />
          <Text style={styles.emptyText}>No coupons redeemed yet</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={couponHistory}
        renderItem={renderHistoryCard}
        keyExtractor={(item) => item.usageId.toString()}
        contentContainerStyle={[
          styles.listContainer,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={[styles.container, { paddingTop: insets.top + 15 }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
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

        {/* Dynamic Content */}
        {renderContent()}
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
        title="Select Month & Year"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
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
  placeholder: { width: 40 },
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
  listContainer: { paddingHorizontal: 16 },
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
    backgroundColor: '#f0f0f0',
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 8,
  },
  retryText: {
    color: '#1E3A8A',
    fontWeight: '600',
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#888',
  },
});

export default MyCouponHistory;