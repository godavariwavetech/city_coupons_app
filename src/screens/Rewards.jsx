// import React, { useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   Platform,
//   ScrollView,
//   ActivityIndicator,
//   FlatList,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchUserProfile } from '../redux/reducers/auth';
// import { fetchRewardsCoupons } from '../redux/reducers/auth';

// const Rewards = () => {
//   const insets = useSafeAreaInsets();
//   const dispatch = useDispatch();

//   const { profile, loading: profileLoading } = useSelector((state) => state.Auth);
//   const { rewardsCoupons, rewardsLoading } = useSelector((state) => state.Auth);
//   const userId = useSelector((state) => state.Auth.userId);

//   const totalPoints = profile?.points ?? 0;

//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchUserProfile(userId));
//       dispatch(fetchRewardsCoupons(userId));
//     }
//   }, [userId, dispatch]);

//   const renderRedeemedCoupon = ({ item }) => {
//     const usedDate = new Date(item.usedDate);
    
//     const formattedDate = usedDate.toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });

//     const formattedTime = usedDate.toLocaleTimeString('en-US', {
//       hour: 'numeric',
//       minute: '2-digit',
//       hour12: true,
//     });

//     return (
//       <View style={styles.rewardItem}>
        
//           {/* Points in top-right */}
         
        

//         <View style={styles.couponInfo}>
//           <View style={{flexDirection:"row",justifyContent:"space-between"}}>
//             <Text style={styles.couponTitle}>{item.title || item.couponName}</Text>
//  <View style={styles.pointsBadge}>
//            <Text style={styles.pointsText}>{item.points} pts</Text>
//           </View>
           
//           </View>
          

//           {/* Optional: Show couponName if different */}
//           {item.couponName && item.title && item.couponName !== item.title && (
//             <Text style={styles.couponName}>{item.couponName}</Text>
//           )}

//           {/* Used Date */}
//           <Text style={styles.usedDateText}>
//             Used on {formattedDate}
           
//           </Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView
//       style={[
//         styles.container,
//         {
//           paddingTop: insets.top,
//           paddingBottom: (Platform.OS === 'ios' ? 85 : 65) + insets.bottom,
//         },
//       ]}
//     >
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

//       <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
//         {/* Header */}
//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>My Rewards History</Text>
//           <Text style={styles.headerSubtitle}>Coupons you've redeemed with your points</Text>
//         </View>

//         {/* Current Points Card */}
//         <View style={styles.pointsCard}>
//           <Text style={styles.pointsLabel}>Your Current Points</Text>
//           {profileLoading ? (
//             <ActivityIndicator size="large" color="#1E3A8A" />
//           ) : (
//             <Text style={styles.pointsValue}>{totalPoints}</Text>
//           )}
//           <Text style={styles.pointsNote}>Keep earning to unlock more rewards!</Text>
//         </View>

//         {/* Redeemed Coupons List */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Redeemed Coupons</Text>

//           {rewardsLoading ? (
//             <ActivityIndicator size="large" color="#1E3A8A" style={{ marginVertical: 40 }} />
//           ) : !rewardsCoupons || rewardsCoupons.length === 0 ? (
//             <Text style={styles.emptyText}>You haven't redeemed any coupons yet.</Text>
//           ) : (
//             <FlatList
//               data={rewardsCoupons}
//               keyExtractor={(item) => item.couponId.toString()}
//               renderItem={renderRedeemedCoupon}
//               scrollEnabled={false}
//             />
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   header: {
//     alignItems: 'center',
//     marginTop: 20,
//     marginBottom: 30,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#000000',
//   },
//   headerSubtitle: {
//     fontSize: 16,
//     color: '#666666',
//     marginTop: 8,
//     textAlign: 'center',
//   },
//   pointsCard: {
//     backgroundColor: '#F0F8FF',
//     borderRadius: 16,
//     padding: 24,
//     alignItems: 'center',
//     marginBottom: 30,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   pointsLabel: {
//     fontSize: 16,
//     color: '#666666',
//     marginBottom: 8,
//   },
//   pointsValue: {
//     fontSize: 48,
//     fontWeight: 'bold',
//     color: '#1E3A8A',
//     marginBottom: 8,
//   },
//   pointsNote: {
//     fontSize: 14,
//     color: '#666666',
//     textAlign: 'center',
//   },
//   section: {
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#000000',
//     marginBottom: 16,
//   },
//   emptyText: {
//     textAlign: 'center',
//     color: '#999',
//     fontSize: 16,
//     paddingVertical: 60,
//   },
//   rewardItem: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 4,
//     elevation: 3,
//     overflow: 'hidden',
//   },
//   couponHeader: {
//     padding: 16,
//     paddingBottom: 0,
//     alignItems: 'flex-end',
//   },
//   pointsBadge: {
//     backgroundColor: '#FEE2E2',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//   },
//   pointsText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#DC2626',
//   },
//   couponInfo: {
//     padding: 16,
//     paddingTop: 12,
//   },
//   couponTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#000000',
//     marginBottom: 6,
//   },
//   couponName: {
//     fontSize: 14,
//     color: '#666666',
//     marginBottom: 10,
//   },
//   usedDateText: {
//     fontSize: 14,
//     color: '#666666',
//     fontStyle: 'italic',
//   },
// });

// export default Rewards;
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from '../redux/reducers/auth';
import { fetchRewardsCoupons } from '../redux/reducers/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Rewards = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const { profile, loading: profileLoading } = useSelector((state) => state.Auth);
  const { rewardsCoupons, rewardsLoading } = useSelector((state) => state.Auth);
  const userId = useSelector((state) => state.Auth.userId);

  const totalPoints = profile?.points ?? 0;

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [pointsInput, setPointsInput] = useState('');

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile(userId));
      dispatch(fetchRewardsCoupons(userId));
    }
  }, [userId, dispatch]);

  const handleRedeemPress = () => {
    setModalVisible(true);
    setPointsInput(''); // clear previous input
  };

  // const handleSubmitPoints = () => {
  //   const enteredPoints = parseInt(pointsInput, 10);

  //   if (isNaN(enteredPoints) || enteredPoints <= 0) {
  //     Alert.alert('Invalid Input', 'Please enter a valid number of points greater than 0.');
  //     return;
  //   }

  //   if (enteredPoints > totalPoints) {
  //     Alert.alert(
  //       'Insufficient Points',
  //       `You only have ${totalPoints} points available.\nYou cannot redeem ${enteredPoints} points.`
  //     );
  //     return;
  //   }

  //   // Valid → close modal and navigate
  //   setModalVisible(false);
  //   setPointsInput('');
  //   console.log(enteredPoints,"poits entered by user+++++++++++")
  //   navigation.navigate('RedeemCouponsScreen', { pointsEntered: enteredPoints });
  // };
const handleSubmitPoints = () => {
  const enteredPoints = parseInt(pointsInput, 10);

  if (isNaN(enteredPoints) || enteredPoints <= 0) {
    Alert.alert('Invalid Input', 'Please enter a valid number of points greater than 0.');
    return;
  }

  if (enteredPoints > totalPoints) {
    Alert.alert(
      'Insufficient Points',
      `You only have ${totalPoints} points available.\nYou cannot redeem ${enteredPoints} points.`
    );
    return;
  }

  // ADD THESE LOGS
  console.log('About to dispatch fetchRedeemableCoupons');
  console.log('userId:', userId);
  console.log('pointsEntered:', enteredPoints);
  console.log('Type of userId:', typeof userId);
  console.log('Type of pointsEntered:', typeof enteredPoints);

  if (!userId) {
    Alert.alert('Error', 'User not logged in. Please restart the app.');
    return;
  }

  setModalVisible(false);
  setPointsInput('');

  navigation.navigate('RedeemCouponsScreen', { pointsEntered: enteredPoints });
};
  const renderRedeemedCoupon = ({ item }) => {
    const usedDate = new Date(item.usedDate);
    
    const formattedDate = usedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const formattedTime = usedDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    return (
      <View style={styles.rewardItem}>
        <View style={styles.couponInfo}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.couponTitle}>{item.title || item.couponName}</Text>
            <View style={styles.pointsBadge}>
              <Text style={styles.pointsText}>{item.points} pts</Text>
            </View>
          </View>

          {item.couponName && item.title && item.couponName !== item.title && (
            <Text style={styles.couponName}>{item.couponName}</Text>
          )}

          <Text style={styles.usedDateText}>
            Used on {formattedDate}
          </Text>
        </View>
      </View>
    );
  };

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
          <Text style={styles.headerTitle}>My Rewards History</Text>
          <Text style={styles.headerSubtitle}>Coupons you've redeemed with your points</Text>
        </View>

        {/* Current Points Card */}
        <View style={styles.pointsCard}>
          <Text style={styles.pointsLabel}>Your Current Points</Text>
          {profileLoading ? (
            <ActivityIndicator size="large" color="#1E3A8A" />
          ) : (
            <>
              <Text style={styles.pointsValue}>{totalPoints}</Text>

              {/* REDEEM NOW BUTTON */}
              <TouchableOpacity style={styles.redeemButton} onPress={handleRedeemPress}>
                <Text style={styles.redeemButtonText}>Redeem Now</Text>
              </TouchableOpacity>
            </>
          )}
          <Text style={styles.pointsNote}>Keep earning to unlock more rewards!</Text>
        </View>

        {/* Redeemed Coupons List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Redeemed Coupons</Text>

          {rewardsLoading ? (
            <ActivityIndicator size="large" color="#1E3A8A" style={{ marginVertical: 40 }} />
          ) : !rewardsCoupons || rewardsCoupons.length === 0 ? (
            <Text style={styles.emptyText}>You haven't redeemed any coupons yet.</Text>
          ) : (
            <FlatList
              data={rewardsCoupons}
              keyExtractor={(item) => item.couponId.toString()}
              renderItem={renderRedeemedCoupon}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>

      {/* MODAL: Enter Points to Redeem */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Redeem Your Points</Text>
            <Text style={styles.modalSubtitle}>
              You have {totalPoints} points available
            </Text>

            <TextInput
              style={styles.pointsInput}
              keyboardType="numeric"
              placeholder="Enter points to redeem"
              placeholderTextColor="#999999"
              value={pointsInput}
              onChangeText={setPointsInput}
              autoFocus
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setPointsInput('');
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleSubmitPoints}
              >
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'SF-Pro-Display-Bold',        // Bold for main title
    color: '#000000',
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'SF-Pro-Display-Regular',
    color: '#666666',
    marginTop: 8,
    textAlign: 'center',
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
    fontSize: 16,
    fontFamily: 'SF-Pro-Display-Medium',
    color: '#666666',
    marginBottom: 8,
  },
  pointsValue: {
    fontSize: 48,
    fontFamily: 'SF-Pro-Display-Bold',
    color: '#1E3A8A',
    marginBottom: 16,
  },
  redeemButton: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 16,
  },
  redeemButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'SF-Pro-Display-Semibold',
  },
  pointsNote: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Display-Regular',
    color: '#666666',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'SF-Pro-Display-Semibold',
    color: '#000000',
    marginBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    fontFamily: 'SF-Pro-Display-Medium',
    paddingVertical: 60,
  },
  rewardItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  pointsBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pointsText: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Display-Bold',
    color: '#DC2626',
  },
  couponInfo: {
    padding: 16,
    paddingTop: 12,
  },
  couponTitle: {
    fontSize: 18,
    fontFamily: 'SF-Pro-Display-Semibold',
    color: '#000000',
    marginBottom: 6,
  },
  couponName: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Display-Medium',
    color: '#666666',
    marginBottom: 10,
  },
  usedDateText: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Display-Regular',
    color: '#666666',
    fontStyle: 'italic',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    width: '85%',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: 'SF-Pro-Display-Bold',
    color: '#000',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    fontFamily: 'SF-Pro-Display-Medium',
    color: '#666666',
    marginBottom: 24,
    textAlign: 'center',
  },
  pointsInput: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 12,
    width: '100%',
    padding: 16,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#F9F9F9',
    marginBottom: 30,
    color: '#000',
    fontFamily: 'SF-Pro-Display-Medium',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#EEEEEE',
  },
  cancelText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'SF-Pro-Display-Semibold',
  },
  submitButton: {
    backgroundColor: '#1E3A8A',
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'SF-Pro-Display-Semibold',
  },
});

export default Rewards;