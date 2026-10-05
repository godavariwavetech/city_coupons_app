// // screens/RedeemCouponsScreen.js
// import React, { useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   FlatList,
//   Image,
//   ActivityIndicator,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchRedeemableCoupons } from '../redux/reducers/auth'; // adjust path
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// const RedeemCouponsScreen = ({ route, navigation }) => {
//   const insets = useSafeAreaInsets();
//   const dispatch = useDispatch();
//   const { pointsEntered } = route.params || {};

//   const { coupons, couponsLoading, couponsError } = useSelector((state) => state.Auth);

//   useEffect(() => {
//     if (pointsEntered) {
//       dispatch(fetchRedeemableCoupons(pointsEntered));
//     }
//   }, [pointsEntered, dispatch]);

//   const renderCoupon = ({ item }) => (
//     <View style={styles.couponCard}>
//       <Image source={{ uri: item.imageUrl }} style={styles.couponImage} />
    
//     </View>
//   );

//   if (couponsLoading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <ActivityIndicator size="large" color="#1E3A8A" style={{ marginTop: 50 }} />
//         <Text style={styles.loadingText}>Loading available coupons...</Text>
//       </SafeAreaView>
//     );
//   }

//   if (couponsError) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Text style={styles.errorText}>{couponsError}</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={[styles.container,]}>
//       <View style={[styles.header,{paddingTop:insets.top+20}]}>
//         <Text style={styles.headerTitle}>Redeem with {pointsEntered} Points</Text>
//         <Text style={styles.headerSubtitle}>
//           {coupons.length > 0
//             ? 'Choose a coupon to redeem'
//             : 'No coupons available for this point value'}
//         </Text>
//       </View>

//       {coupons.length === 0 ? (
//         <Text style={styles.emptyText}>No redeemable coupons found for {pointsEntered} points.</Text>
//       ) : (
//         <FlatList
//           data={coupons}
//           keyExtractor={(item) => item.couponId.toString()}
//           renderItem={renderCoupon}
//           contentContainerStyle={styles.listContent}
//           showsVerticalScrollIndicator={false}
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   header: {
//     padding: 20,
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEE',
//   },
//   headerTitle: {
//     fontSize: 22,
//     // fontWeight: '700',
//     color: '#000',
//      fontFamily:"SF-Pro-Display-Bold",
//     //  paddingTop:5
//   },
//   headerSubtitle: {
//     fontSize: 16,
//     color: '#666',
//     marginTop: 8,
//      fontFamily:"SF-Pro-Display-Medium"
//   },
//   listContent: {
//     padding: 16,
//   },
//   couponCard: {
//     backgroundColor: '#FFF',
//     borderRadius: 16,
//     marginBottom: 16,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 5,
//   },
//   couponImage: {
//     width: '100%',
//     height: 180,
//     resizeMode: 'cover',
//   },
//   couponInfo: {
//     padding: 16,
//   },
//   vendorName: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1E3A8A',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#000',
//     marginVertical: 6,
//   },
//   couponName: {
//     fontSize: 16,
//     color: '#DC2626',
//     marginBottom: 8,
//   },
//   pointsRow: {
//     backgroundColor: '#FEE2E2',
//     alignSelf: 'flex-start',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//     marginBottom: 10,
//   },
//   pointsText: {
//     fontWeight: 'bold',
//     color: '#DC2626',
//   },
//   description: {
//     fontSize: 14,
//     color: '#444',
//     marginBottom: 8,
//   },
//   validity: {
//     fontSize: 13,
//     color: '#666',
//     fontStyle: 'italic',
//   },
//   loadingText: {
//     textAlign: 'center',
//     marginTop: 20,
//     fontSize: 16,
//     color: '#666',
//   },
//   errorText: {
//     textAlign: 'center',
//     marginTop: 50,
//     fontSize: 18,
//     color: '#DC2626',
//     paddingHorizontal: 20,
//   },
//   emptyText: {
//     textAlign: 'center',
//     marginTop: 60,
//     fontSize: 18,
//     color: '#999',
//          fontFamily:"SF-Pro-Display-Regular"
//   },
// });

// export default RedeemCouponsScreen;
// screens/RedeemCouponsScreen.js
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchRedeemableCoupons } from '../redux/reducers/auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const RedeemCouponsScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { pointsEntered } = route.params || {};

  const { coupons, couponsLoading, couponsError, userId } = useSelector((state) => state.Auth);

  useEffect(() => {

     console.log('RedeemCouponsScreen useEffect triggered');
  console.log('pointsEntered from params:', pointsEntered);
  console.log('userId from Redux:', userId);
    if (pointsEntered && userId) {
      dispatch(fetchRedeemableCoupons({ userId, points: pointsEntered }));
    }
  }, [pointsEntered, userId, dispatch]);

  const handleCouponPress = (coupon) => {
    if (coupon.isUsed === 1) return; // Prevent navigation if used
    navigation.navigate('CoffeeOfferScreen', { coupon });
  };

  const renderCoupon = ({ item }) => {
    const isUsed = item.isUsed === 1;

    return (
      <View style={[styles.couponCard, isUsed && styles.disabledCard]}>
        {/* Touchable only if NOT used */}
        {isUsed ? (
          <View style={styles.disabledContent}>
            <Image
              source={{ uri: item.imageUrl || item.shopImage }}
              style={styles.couponImage}
            />
            {/* USED Overlay */}
            <View style={styles.usedOverlay}>
              <Text style={styles.usedText}>USED</Text>
            </View>

            {/* <View style={styles.couponInfo}>
              {item.vendorLogo && (
                <Image source={{ uri: item.vendorLogo }} style={styles.vendorLogo} resizeMode="contain" />
              )}
              <Text style={styles.vendorName}>{item.vendorName || 'Vendor'}</Text>
              <Text style={styles.title}>{item.title || item.couponName}</Text>

              <View style={styles.pointsRow}>
                <Text style={styles.pointsText}>{pointsEntered} Points</Text>
              </View>

              {item.description && (
                <Text style={styles.description} numberOfLines={3}>
                  {item.description}
                </Text>
              )}

              {item.validity && (
                <Text style={styles.validity}>Valid until: {item.validity}</Text>
              )}
            </View> */}
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => handleCouponPress(item)}
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: item.imageUrl || item.shopImage }}
              style={styles.couponImage}
            />

            {/* <View style={styles.couponInfo}>
              {item.vendorLogo && (
                <Image source={{ uri: item.vendorLogo }} style={styles.vendorLogo} resizeMode="contain" />
              )}
              <Text style={styles.vendorName}>{item.vendorName || 'Vendor'}</Text>
              <Text style={styles.title}>{item.title || item.couponName}</Text>

              <View style={styles.pointsRow}>
                <Text style={styles.pointsText}>{pointsEntered} Points</Text>
              </View>

              {item.description && (
                <Text style={styles.description} numberOfLines={3}>
                  {item.description}
                </Text>
              )}

              {item.validity && (
                <Text style={styles.validity}>Valid until: {item.validity}</Text>
              )}
            </View> */}
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (couponsLoading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color="#003366" style={{ marginTop: 50 }} />
        <Text style={styles.loadingText}>Loading available coupons...</Text>
      </View>
    );
  }

  if (couponsError) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.errorText}>{couponsError}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <TouchableOpacity
          style={[styles.backButton, { top: insets.top + 20 }]}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={26} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Redeem with {pointsEntered} Points</Text>
        <Text style={styles.headerSubtitle}>
          {coupons.length > 0
            ? 'Choose a coupon to redeem'
            : 'No coupons available for this point value'}
        </Text>
      </View>

      {coupons.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.emptyText}>
            No redeemable coupons found for {pointsEntered} points.
          </Text>
        </View>
      ) : (
        <FlatList
          data={coupons}
          keyExtractor={(item) => item.couponId.toString()}
          renderItem={renderCoupon}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    paddingHorizontal: 48, // keep the centered title clear of the back button
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 22,
    color: '#000',
    fontFamily: 'SF-Pro-Display-Bold',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    fontFamily: 'SF-Pro-Display-Medium',
  },
  listContent: {
    padding: 16,
  },
  couponCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  disabledCard: {
    opacity: 0.6, // Grayed out look
  },
  disabledContent: {
    // Just a wrapper to maintain structure
  },
  couponImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  usedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  usedText: {
    color: '#f50404ff',
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'SF-Pro-Display-Bold',
  },
  couponInfo: {
    padding: 16,
  },
  vendorLogo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f0f0f0',
  },
  vendorName: {
    fontSize: 16,
    color: '#003366',
    fontFamily: 'SF-Pro-Display-Medium',
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 6,
    fontFamily: 'SF-Pro-Display-Bold',
  },
  pointsRow: {
    backgroundColor: '#FEF3C7',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
  },
  pointsText: {
    fontWeight: 'bold',
    color: '#92400E',
    fontSize: 15,
    fontFamily: 'SF-Pro-Display-Semibold',
  },
  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    fontFamily: 'SF-Pro-Display-Regular',
  },
  validity: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 8,
    fontFamily: 'SF-Pro-Display-Regular',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
    fontFamily: 'SF-Pro-Display-Regular',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#DC2626',
    paddingHorizontal: 20,
    fontFamily: 'SF-Pro-Display-Medium',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
    paddingHorizontal: 40,
    fontFamily: 'SF-Pro-Display-Regular',
  },
});

export default RedeemCouponsScreen;