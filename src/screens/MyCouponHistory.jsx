// import React, { useEffect, useState, useMemo } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
//   SafeAreaView,
//   Image,
//   FlatList,
//   Dimensions,
//   ActivityIndicator,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import DatePicker from 'react-native-date-picker';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCouponHistory } from '../redux/reducers/auth'; // Update path if needed
// import { format, parseISO, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

// const { width } = Dimensions.get('window');

// const MyCouponHistory = ({ navigation }) => {
//   const insets = useSafeAreaInsets();
//   const dispatch = useDispatch();

//   const { userId } = useSelector((state) => state.Auth);
//   const { couponHistory, couponHistoryLoading, couponHistoryError } = useSelector((state) => state.Auth);

//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [open, setOpen] = useState(false);

//   const monthNames = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   // Current selected month/year for display
//   const selectedFilterText = `${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;

//   // Fetch coupon history on mount
//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchCouponHistory(userId));
//     }
//   }, [dispatch, userId]);

//   const handleFilterPress = () => {
//     setOpen(true);
//   };

//   const onDateConfirm = (date) => {
//     setOpen(false);
//     setSelectedDate(date);
//   };

//   const onDateCancel = () => {
//     setOpen(false);
//   };

//   // Filter coupons by selected month and year
//   const filteredCouponHistory = useMemo(() => {
//     if (!couponHistory || couponHistory.length === 0) return [];

//     const start = startOfMonth(selectedDate);
//     const end = endOfMonth(selectedDate);

//     return couponHistory.filter((item) => {
//       if (!item.usedAt) return false;

//       try {
//         // Handles ISO strings like "2025-04-15T10:20:30Z" or "2025-04-15"
//         const usedDate = parseISO(item.usedAt);

//         // Check if the date is valid
//         if (isNaN(usedDate.getTime())) return false;

//         return isWithinInterval(usedDate, { start, end });
//       } catch (error) {
//         console.warn('Invalid date format in coupon history:', item.usedAt);
//         return false;
//       }
//     });
//   }, [couponHistory, selectedDate]);

//   // Format date for display (e.g., 15 Apr 2025)
//   const formatUsedDate = (dateString) => {
//     try {
//       const date = parseISO(dateString);
//       return isNaN(date.getTime()) ? 'Invalid Date' : format(date, 'dd MMM yyyy');
//     } catch {
//       return 'Invalid Date';
//     }
//   };

//   const renderHistoryCard = ({ item }) => (
//     <View style={styles.historyCard}>
//       <Image
//         source={{ uri: item.vendorLogo }}
//         style={styles.storeLogo}
//         resizeMode="contain"
//         defaultSource={require('../assets/profile1.png')} // Fallback image
//       />
//       <View style={styles.historyDetails}>
//         <Text style={styles.storeName}>{item.vendorName || 'Unknown Vendor'}</Text>
//         <Text style={styles.offerText}>{item.title || 'Coupon Redeemed'}</Text>
//         <Text style={styles.redeemedText}>
//           Redeemed on: {formatUsedDate(item.usedAt)}
//         </Text>
//       </View>
//     </View>
//   );

//   const renderContent = () => {
//     if (couponHistoryLoading) {
//       return (
//         <View style={styles.center}>
//           <ActivityIndicator size="large" color="#002161" />
//           <Text style={styles.loadingText}>Loading your history...</Text>
//         </View>
//       );
//     }

//     if (couponHistoryError) {
//       return (
//         <View style={styles.center}>
//           <Text style={styles.errorText}>Failed to load history</Text>
//           <TouchableOpacity onPress={() => dispatch(fetchCouponHistory(userId))}>
//             <Text style={styles.retryText}>Tap to retry</Text>
//           </TouchableOpacity>
//         </View>
//       );
//     }

//     // Empty state: either no data at all, or no data in selected month
//     if (filteredCouponHistory.length === 0) {
//       const hasAnyHistory = couponHistory && couponHistory.length > 0;
//       return (
//         <View style={styles.center}>
//           <MaterialIcons name="receipt-long" size={60} color="#ccc" />
//           <Text style={styles.emptyText}>
//             {hasAnyHistory
//               ? `No coupons redeemed in ${selectedFilterText}`
//               : 'No coupons redeemed yet'}
//           </Text>
//         </View>
//       );
//     }

//     return (
//       <FlatList
//         data={filteredCouponHistory}
//         renderItem={renderHistoryCard}
//         keyExtractor={(item) => item.usageId?.toString() || Math.random().toString()}
//         contentContainerStyle={[
//           styles.listContainer,
//           { paddingBottom: insets.bottom + 20 },
//         ]}
//         showsVerticalScrollIndicator={false}
//       />
//     );
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
//       <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

//       <View style={[styles.container, { paddingTop: insets.top + 15 }]}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//             <MaterialIcons name="arrow-back" size={24} color="#fff" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>My Coupon History</Text>
//           <View style={styles.placeholder} />
//         </View>

//         {/* Month/Year Filter */}
//         <View style={styles.filterContainer}>
//           <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
//             <Text style={styles.filterText}>{selectedFilterText}</Text>
//             <MaterialCommunityIcons name="calendar-blank" size={18} color="#002161" />
//           </TouchableOpacity>
//         </View>

//         {/* Main Content */}
//         {renderContent()}
//       </View>

//       {/* Date Picker Modal */}
//       <DatePicker
//         modal
//         open={open}
//         date={selectedDate}
//         onConfirm={onDateConfirm}
//         onCancel={onDateCancel}
//         mode="date"
//         maximumDate={new Date()}
//         minimumDate={new Date(2020, 0, 1)} // Adjust as needed
//         title="Select Month & Year"
//         confirmText="Apply"
//         cancelText="Cancel"
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F5F5F5' },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   backButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#6B7280',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000',
//     flex: 1,
//     textAlign: 'center',
//     marginRight: -40, // To center title properly
//   },
//   placeholder: { width: 40 },
//   filterContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     alignItems: 'flex-end',
//   },
//   filterButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     gap: 8,
//     elevation: 1,
//   },
//   filterText: {
//     fontSize: 14,
//     color: '#002161',
//     fontWeight: '500',
//   },
//   listContainer: { paddingHorizontal: 16 },
//   historyCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   storeLogo: {
//     width: 50,
//     height: 50,
//     borderRadius: 8,
//     backgroundColor: '#f0f0f0',
//   },
//   historyDetails: {
//     flex: 1,
//     marginLeft: 12,
//   },
//   storeName: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 4,
//   },
//   offerText: {
//     fontSize: 13,
//     color: '#666',
//     marginBottom: 4,
//   },
//   redeemedText: {
//     fontSize: 12,
//     color: '#999',
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 32,
//   },
//   loadingText: {
//     marginTop: 12,
//     color: '#666',
//     fontSize: 14,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   retryText: {
//     color: '#002161',
//     fontWeight: '600',
//     fontSize: 15,
//   },
//   emptyText: {
//     marginTop: 16,
//     fontSize: 16,
//     color: '#888',
//     textAlign: 'center',
//   },
// });

// export default MyCouponHistory;
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native'; // <-- Important import
import { fetchCouponHistory } from '../redux/reducers/auth';
import { format, parseISO, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

const { width } = Dimensions.get('window');

const MyCouponHistory = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.Auth);
  const { couponHistory, couponHistoryLoading, couponHistoryError } = useSelector((state) => state.Auth);

  // This will be reset to current month every time screen is opened
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const selectedFilterText = `${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;

  // Reset to current month whenever screen comes into focus
  useFocusEffect(
    useCallback(() => {
      setSelectedDate(new Date()); // Always show current month by default

      // Optional: refetch latest data when coming back to screen
      if (userId) {
        dispatch(fetchCouponHistory(userId));
      }
    }, [dispatch, userId])
  );

  // Also fetch on first mount (in case focus effect doesn't trigger immediately)
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
  };

  const onDateCancel = () => {
    setOpen(false);
  };

  // Filter data based on selected month/year
  const filteredCouponHistory = useMemo(() => {
    if (!couponHistory || couponHistory.length === 0) return [];

    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);

    return couponHistory.filter((item) => {
      if (!item.usedAt) return false;

      try {
        const usedDate = parseISO(item.usedAt);
        if (isNaN(usedDate.getTime())) return false;

        return isWithinInterval(usedDate, { start, end });
      } catch (error) {
        console.warn('Invalid date:', item.usedAt);
        return false;
      }
    });
  }, [couponHistory, selectedDate]);

  const formatUsedDate = (dateString) => {
    try {
      const date = parseISO(dateString);
      return isNaN(date.getTime()) ? 'Invalid Date' : format(date, 'dd MMM yyyy');
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
        defaultSource={require('../assets/profile1.png')}
      />
      <View style={styles.historyDetails}>
        <Text style={styles.storeName}>{item.vendorName || 'Unknown Vendor'}</Text>
        <Text style={styles.offerText}>{item.title || 'Coupon Redeemed'}</Text>
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
          <ActivityIndicator size="large" color="#002161" />
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

    // if (filteredCouponHistory.length === 0) {
    //   const hasAnyHistory = couponHistory && couponHistory.length > 0;
    //   return (
    //     <View style={styles.center}>
    //       <MaterialIcons name="receipt-long" size={60} color="#ccc" />
    //       <Text style={styles.emptyText}>
    //         {hasAnyHistory
    //           ? `No coupons redeemed in ${selectedFilterText}`
    //           : 'No coupons redeemed yet'}
    //       </Text>
    //     </View>
    //   );
    // }
if (filteredCouponHistory.length === 0) {
  const hasAnyHistory = couponHistory && couponHistory.length > 0;
  return (
    // Wrap in an extra View with flex: 1 to push it to the true center of the screen
    <View style={{ flex: 1 }}> 
      <View style={styles.center}>
        <MaterialIcons name="receipt-long" size={60} color="#ccc" />
        <Text style={styles.emptyText}>
          {hasAnyHistory
            ? `No coupons redeemed in ${selectedFilterText}`
            : 'No coupons redeemed yet'}
        </Text>
      </View>
    </View>
  );
}
    return (
      <FlatList
        data={filteredCouponHistory}
        renderItem={renderHistoryCard}
        keyExtractor={(item) => item.usageId?.toString() || Math.random().toString()}
        contentContainerStyle={[
          styles.listContainer,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={[styles.container, { paddingTop: insets.top + 15 }]}>
        {/* Header */}
        <View style={styles.header}>
         
          <Text style={styles.headerTitle}>My Coupon History</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Month/Year Filter */}
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
            <Text style={styles.filterText}>{selectedFilterText}</Text>
          <MaterialCommunityIcons name="calendar-month" size={18} color="#002161" />
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        {renderContent()}
      </View>

      {/* Date Picker Modal */}
      <DatePicker
        modal
        theme="light"
        open={open}
        date={selectedDate}
        onConfirm={onDateConfirm}
        onCancel={onDateCancel}
        mode="date"
        maximumDate={new Date()}
        minimumDate={new Date(2020, 0, 1)}
        title="Select Month & Year"
        confirmText="Apply"
        cancelText="Cancel"
      />
    </View>
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
    fontSize: 20,
    // fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'center',
    marginRight: -40,
    fontFamily:"SF-Pro-Display-Bold"
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
    elevation: 1,
  },
  filterText: {
    fontSize: 14,
    color: '#002161',
    fontWeight: '500',
    fontFamily:"SF-Pro-Display-Regular"
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
    color: '#000',
    marginBottom: 4,
    fontFamily:"SF-Pro-Display-Bold"
  },
  offerText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
     fontFamily:"SF-Pro-Display-Regular"
  },
  redeemedText: {
    fontSize: 12,
    color: '#999',
    fontFamily:"SF-Pro-Display-Regular"
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
    color: '#002161',
    fontWeight: '600',
    fontSize: 15,
  },
  emptyText: {
    // marginTop: 16,
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    fontFamily:"SF-Pro-Display-Regular"
  },

  center: {
  flex: 1, // This tells the view to take up all available space
  justifyContent: 'center', // Centers vertically
  alignItems: 'center',     // Centers horizontally
  paddingHorizontal: 32,
  paddingBottom: 100, // Optional: Offset the height of the header/filter to make it "visually" centered
},
});

export default MyCouponHistory;