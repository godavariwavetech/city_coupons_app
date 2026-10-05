// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
//   SafeAreaView,
//   Image,
//   FlatList,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // [web:52]

// const CouponsListScreen = ({ navigation }) => {
//   const insets = useSafeAreaInsets(); // [web:51]

//   // Sample coupon data - replace with your API data
//   const coupons = [
//     {
//       id: '1',
//       code: 'YUSREHNDHJSYUJAH',
//       discount: '50% off on first purchase',
//       expiryDate: '01-12-2025',
//     },
//     {
//       id: '2',
//       code: 'YUSREHNDHJSYUJAH',
//       discount: '50% off on first purchase',
//       expiryDate: '01-12-2025',
//     },
//     {
//       id: '3',
//       code: 'YUSREHNDHJSYUJAH',
//       discount: '50% off on first purchase',
//       expiryDate: '01-12-2025',
//     },
//     {
//       id: '4',
//       code: 'YUSREHNDHJSYUJAH',
//       discount: '50% off on first purchase',
//       expiryDate: '01-12-2025',
//     },
//     {
//       id: '5',
//       code: 'YUSREHNDHJSYUJAH',
//       discount: '50% off on first purchase',
//       expiryDate: '01-12-2025',
//     },
//   ];

//   const handleShowQR = (coupon) => {
//     console.log('Show QR for:', coupon.code);
//   };

//   const handleSubscribe = () => {
//     console.log('Subscribe clicked');
//   };

//   const renderCouponCard = ({ item }) => (
//     <View style={styles.couponCard}>
//       {/* Left side with icon and details */}
//       <View style={styles.couponLeftSection}>
//         <MaterialCommunityIcons name="ticket-percent" size={20} color="#000" />

//         <View style={styles.couponDetails}>
//           <Text style={styles.couponCode}>{item.code}</Text>

//           <View style={styles.discountBadge}>
//             <Text style={styles.discountText}>{item.discount}</Text>
//           </View>

//           <Text style={styles.expiryText}>Expires on {item.expiryDate}</Text>
//         </View>
//       </View>

//       {/* Dotted divider */}
//       <View style={styles.couponDivider} />

//       {/* Right side with QR button */}
//       <TouchableOpacity
//         style={styles.qrButtonNew}
//         onPress={() => handleShowQR(item)}
//         activeOpacity={0.7}
//       >
//         <View style={styles.qrIconWrapper}>
//           <MaterialCommunityIcons name="qrcode-scan" size={22} color="#fff" />
//         </View>
//         <Text style={styles.qrButtonTextNew}>Show QR</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
//       <StatusBar
//         translucent
//         backgroundColor="transparent"
//         barStyle="dark-content"
//       />

//       <View style={[styles.container, { paddingTop: insets.top }]}>
//         {/* Header with Back Button */}
//         <View style={styles.header}>
//           <TouchableOpacity
//             style={styles.backButton}
//             onPress={() => navigation.goBack()}
//           >
//             <MaterialIcons name="arrow-back" size={24} color="#000" />
//           </TouchableOpacity>
//         </View>

//         {/* Brand Section */}
//         <View style={styles.brandSection}>
//           <View style={styles.logoContainer}>
//             <Image
//               source={require('../assets/cafelogo.png')}
//               style={styles.brandLogo}
//               resizeMode="contain"
//             />
//           </View>
//           <Text style={styles.brandName}>BrewBuzz</Text>
//           <Text style={styles.couponCount}>6 Coupons | 3 Cashback</Text>
//         </View>

//         {/* Subscribe Button */}
//         <TouchableOpacity
//           style={styles.subscribeButton}
//           onPress={handleSubscribe}
//         >
//           <Text style={styles.subscribeButtonText}>Subscribe</Text>
//           <MaterialCommunityIcons
//             name="bell-outline"
//             size={20}
//             color="#fff"
//             style={styles.bellIcon}
//           />
//         </TouchableOpacity>

//         {/* Coupons List */}
//         <FlatList
//           data={coupons}
//           renderItem={renderCouponCard}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={[
//             styles.listContainer,
//             { paddingBottom: insets.bottom + 20 },
//           ]}
//           showsVerticalScrollIndicator={false}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   header: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//   },
//   backButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#E0E0E0',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   brandSection: {
//     alignItems: 'center',
//     paddingVertical: 20,
//     paddingHorizontal: 16,
//   },
//   logoContainer: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: '#1A1A1A',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   brandLogo: {
//     width: 60,
//     height: 60,
//   },
//   brandName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 4,
//   },
//   couponCount: {
//     fontSize: 14,
//     color: '#666',
//   },
//   subscribeButton: {
//     backgroundColor: '#E53935',
//     marginHorizontal: 16,
//     paddingVertical: 14,
//     borderRadius: 8,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },
//   subscribeButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   bellIcon: {
//     marginLeft: 8,
//   },
//   listContainer: {
//     paddingHorizontal: 16,
//   },

//   // Coupon card styles (updated)
//   couponCard: {
//     backgroundColor: '#ffffff',
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     paddingVertical: 12,
//     marginBottom: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.08,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 2,
//   },
//   couponLeftSection: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },
//   couponDetails: {
//     marginLeft: 10,
//     flex: 1,
//   },
//   couponCode: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#000',
//     marginBottom: 6,
//   },
//   discountBadge: {
//     backgroundColor: '#16A34A',
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 6,
//     alignSelf: 'flex-start',
//     marginBottom: 6,
//   },
//   discountText: {
//     fontSize: 12,
//     fontWeight: '500',
//     color: '#fff',
//   },
//   expiryText: {
//     fontSize: 11,
//     color: '#6B7280',
//   },
//   couponDivider: {
//     width: 1,
//     height: '80%',
//     borderLeftWidth: 1,
//     borderStyle: 'dashed',
//     borderColor: '#E5E7EB',
//     marginHorizontal: 10,
//   },
//   qrButtonNew: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   qrIconWrapper: {
//     width: 40,
//     height: 40,
//     borderRadius: 8,
//     backgroundColor: '#0F172A',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 4,
//   },
//   qrButtonTextNew: {
//     fontSize: 11,
//     color: '#4B5563',
//     fontWeight: '500',
//   },
// });

// export default CouponsListScreen;
// import React, { useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
//   SafeAreaView,
//   Image,
//   FlatList,
//   ActivityIndicator,
//   ImageBackground,
//   Dimensions,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchVendorCoupons } from '../redux/reducers/auth';

// const { width } = Dimensions.get('window');

// const CouponsListScreen = () => {
//   const insets = useSafeAreaInsets();
//   const route = useRoute();
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   const { vendorId } = route.params || {};
//  const { userId } = useSelector((state) => state.Auth);
//   const {
//     vendorCoupons = [],
//     vendorCouponsLoading = false,
//     vendorCouponsError,
//     vendorInfo,
//   } = useSelector((state) => state.Auth || {});
// useEffect(() => {
//   if (userId && vendorId) {
//     dispatch(fetchVendorCoupons({ userId, vendorId }));
//   }
// }, [userId, vendorId, dispatch]);
//   const handleShowQR = (coupon) => {
//     navigation.navigate('QRCodeScreen', { coupon });
//   };

//   const handleSubscribe = () => {
//     console.log('Subscribed to', vendorInfo?.vendorName);
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB');
//   };

// const renderCouponImageCard = ({ item }) => {
//   const isUsed = item.isUsed === 1;

//   return (
//     <View style={[styles.couponContainer, isUsed && styles.usedCouponContainer]}>
//       {/* Used Overlay */}
//       {isUsed && (
//         <View style={styles.usedOverlay}>
//           <Text style={styles.usedText}>ALREADY USED</Text>
//         </View>
//       )}

//       <TouchableOpacity
//         activeOpacity={isUsed ? 0.7 : 0.9}
//         onPress={() => !isUsed && navigation.navigate('CoffeeOfferScreen', { coupon: item })}
//         disabled={isUsed}
//       >
//         <Image
//           source={{ uri: item.imageUrl }}
//           style={[
//             styles.couponImage,
//             isUsed && styles.usedCouponImage,
//           ]}
//           resizeMode="cover"
//         />

//         {/* Optional: Show code or title */}
//         {/* <View style={styles.couponFooter}>
//           <Text style={[styles.couponTitleFooter, isUsed && styles.usedTextFooter]}>
//             {item.title}
//           </Text>
//           {item.couponCode && (
//             <Text style={[styles.couponCodeFooter, isUsed && styles.usedTextFooter]}>
//               Code: {item.couponCode}
//             </Text>
//           )}
//         </View> */}
//       </TouchableOpacity>
//     </View>
//   );
// };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
//       <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

//       <View style={[styles.container, { paddingTop: insets.top }]}>
//         {/* Back Button */}
//         <View style={styles.header}>
//           <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//             <MaterialIcons name="arrow-back" size={24} color="#000" />
//           </TouchableOpacity>
//         </View>

//         {/* Loading State */}
//         {vendorCouponsLoading && (
//           <View style={styles.loadingContainer}>
//             <ActivityIndicator size="large" color="#003366" />
//             <Text style={styles.loadingText}>Loading amazing offers...</Text>
//           </View>
//         )}

//         {/* Vendor Header */}
//         {!vendorCouponsLoading && vendorInfo && (
//           <>
//             <View style={styles.brandSection}>
//               <View style={styles.logoContainer}>
//                 <Image
//                   source={{ uri: vendorInfo.vendorLogo }}
//                   style={styles.brandLogo}
//                   resizeMode="contain"
//                   defaultSource={require('../assets/profile1.png')}
//                 />
//               </View>
//               <Text style={styles.brandName}>{vendorInfo.vendorName}</Text>
//               <Text style={styles.couponCount}>
//                 {vendorCoupons.length} Active Offer{vendorCoupons.length !== 1 ? 's' : ''}
//               </Text>
//             </View>

//             <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
//               <Text style={styles.subscribeButtonText}>Subscribe for Updates</Text>
//               <MaterialCommunityIcons name="bell-outline" size={20} color="#fff" style={styles.bellIcon} />
//             </TouchableOpacity>
//           </>
//         )}

//         {/* Coupons List - Image Based */}
//         {!vendorCouponsLoading && vendorCoupons.length > 0 && (
//           <FlatList
//             data={vendorCoupons}
//             renderItem={renderCouponImageCard}
//             keyExtractor={(item) => item.couponId.toString()}
//             contentContainerStyle={[
//               styles.listContainer,
//               { paddingBottom: insets.bottom + 100 },
//             ]}
//             showsVerticalScrollIndicator={false}
//             snapToInterval={width - 32 + 16} // optional: for card snapping
//             decelerationRate="fast"
//             pagingEnabled={vendorCoupons.length === 1 ? false : true} // nice for 1-3 coupons
//           />
//         )}

//         {/* Empty State */}
//         {!vendorCouponsLoading && vendorCoupons.length === 0 && !vendorCouponsError && (
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyText}>No offers available at the moment</Text>
//             <Text style={styles.emptySubText}>Check back later!</Text>
//           </View>
//         )}

//         {/* Error State */}
//         {vendorCouponsError && (
//           <View style={styles.errorContainer}>
//             <Text style={styles.errorText}>{vendorCouponsError}</Text>
//             <TouchableOpacity
//               style={styles.retryButton}
//               onPress={() => vendorId && dispatch(fetchVendorCoupons(vendorId))}
//             >
//               <Text style={styles.retryText}>Try Again</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F5F5F5' },
//   header: { paddingHorizontal: 16, paddingVertical: 10 },
//   backButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   brandSection: { alignItems: 'center', paddingVertical: 20 },
//   logoContainer: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     backgroundColor: '#fff',
//     padding: 5,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.15,
//     elevation: 5,
//   },
//   brandLogo: { width: 80, height: 80, borderRadius: 40 },
//   brandName: { fontSize: 24, fontWeight: 'bold', color: '#000' },
//   couponCount: { fontSize: 15, color: '#666', marginTop: 4 },
//   subscribeButton: {
//     backgroundColor: '#E53935',
//     marginHorizontal: 16,
//     paddingVertical: 16,
//     borderRadius: 16,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     elevation: 5,
//   },
//   subscribeButtonText: { fontSize: 17, fontWeight: 'bold', color: '#fff' },
//   bellIcon: { marginLeft: 10 },

//   // Image Card Styles
//   couponContainer: {
//     marginHorizontal: 16,
//     marginBottom: 20,
//     borderRadius: 20,
//     overflow: 'hidden',
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOpacity: 0.18,
//     shadowRadius: 12,
//     shadowOffset: { width: 0, height: 6 },
//     elevation: 10,
//   },
//   couponImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 20,
//   },
//   overlayContent: {
//     padding: 18,
//     backgroundColor: '#fff',
//   },
//   textContent: {
//     marginBottom: 16,
//   },
//   couponTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#1A1A1A',
//     marginBottom: 6,
//   },
//   couponCode: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#003366',
//     marginBottom: 6,
//   },
//   description: {
//     fontSize: 15,
//     color: '#444',
//     lineHeight: 22,
//     marginBottom: 8,
//   },
//   terms: {
//     fontSize: 13,
//     color: '#E53935',
//     fontWeight: '600',
//     marginTop: 4,
//   },
//   expiry: {
//     fontSize: 13,
//     color: '#666',
//     marginTop: 10,
//     fontStyle: 'italic',
//   },
//   qrButton: {
//     backgroundColor: '#0F172A',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 14,
//     borderRadius: 12,
//   },
//   qrButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 10,
//   },

//   // States
//   loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   loadingText: { marginTop: 16, fontSize: 16, color: '#666' },
//   emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
//   emptyText: { fontSize: 18, color: '#888', textAlign: 'center' },
//   emptySubText: { fontSize: 14, color: '#aaa', marginTop: 8 },
//   errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
//   errorText: { color: 'red', fontSize: 16, textAlign: 'center', marginBottom: 16 },
//   retryButton: { padding: 12, backgroundColor: '#003366', borderRadius: 8 },
//   retryText: { color: '#fff', fontWeight: '600' },
//   listContainer: { paddingTop: 10 },
//   usedCouponContainer: {
//   opacity: 0.6,
// },
// usedCouponImage: {
//   opacity: 0.5,
// },
// usedOverlay: {
//   position: 'absolute',
//   top: 16,
//   left: 16,
//   backgroundColor: '#E53935',
//   paddingHorizontal: 12,
//   paddingVertical: 6,
//   borderRadius: 20,
//   zIndex: 10,
// },
// usedText: {
//   color: '#fff',
//   fontWeight: 'bold',
//   fontSize: 12,
// },
// couponFooter: {
//   padding: 16,
//   backgroundColor: '#fff',
// },
// couponTitleFooter: {
//   fontSize: 18,
//   fontWeight: 'bold',
//   color: '#000',
// },
// couponCodeFooter: {
//   fontSize: 14,
//   color: '#003366',
//   fontWeight: '600',
//   marginTop: 4,
// },
// usedTextFooter: {
//   color: '#999',
// }
// });

// export default CouponsListScreen;
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendorCoupons } from '../redux/reducers/auth';

// Shimmer Imports
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const { width } = Dimensions.get('window');

const CouponsListScreen = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { vendorId } = route.params || {};
  const { userId } = useSelector((state) => state.Auth);
  const {
    vendorCoupons = [],
    vendorCouponsLoading = false,
    vendorCouponsError,
    vendorInfo,
  } = useSelector((state) => state.Auth || {});

  useEffect(() => {
    if (userId && vendorId) {
      dispatch(fetchVendorCoupons({ userId, vendorId }));
    }
  }, [userId, vendorId, dispatch]);

  const handleShowQR = (coupon) => {
    navigation.navigate('QRCodeScreen', { coupon });
  };

  const handleSubscribe = () => {
    console.log('Subscribed to', vendorInfo?.vendorName);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  const renderCouponImageCard = ({ item }) => {
    const isUsed = item.isUsed === 1;

    return (
      <View style={[styles.couponContainer, isUsed && styles.usedCouponContainer]}>
        {isUsed && (
          <View style={styles.usedOverlay}>
            <Text style={styles.usedText}>ALREADY USED</Text>
          </View>
        )}

        <TouchableOpacity
          activeOpacity={isUsed ? 0.7 : 0.9}
          onPress={() => !isUsed && navigation.navigate('CoffeeOfferScreen', { coupon: item })}
          disabled={isUsed}
        >
          <Image
            source={{ uri: item.imageUrl }}
            style={[
              styles.couponImage,
              isUsed && styles.usedCouponImage,
            ]}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    );
  };

  // Shimmer Placeholder for Loading State
  const renderShimmerCoupon = () => (
    <View style={styles.couponContainer}>
      <ShimmerPlaceholder
        style={styles.couponImage}
        shimmerColors={['#f0f0f0', '#e0e0e0', '#f0f0f0']}
        autoRun={true}
      />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Back Button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        {/* Vendor Header - Show even during loading for better UX */}
        {vendorInfo && (
          <>
            <View style={styles.brandSection}>
              <View style={styles.logoContainer}>
                <Image
                  source={{ uri: vendorInfo.vendorLogo }}
                  style={styles.brandLogo}
                  resizeMode="contain"
                  defaultSource={require('../assets/profile1.png')}
                />
              </View>
              <Text style={styles.brandName}>{vendorInfo.vendorName}</Text>
              <Text style={styles.couponCount}>
                {vendorCouponsLoading
                  ? 'Loading offers...'
                  : `${vendorCoupons.length} Active Offer${vendorCoupons.length !== 1 ? 's' : ''}`}
              </Text>
            </View>

            <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
              <Text style={styles.subscribeButtonText}>Subscribe for Updates</Text>
              <MaterialCommunityIcons name="bell-outline" size={20} color="#fff" style={styles.bellIcon} />
            </TouchableOpacity>
          </>
        )}

        {/* Shimmer Loading State */}
        {vendorCouponsLoading && (
          <View style={styles.listContainer}>
            {[1, 2, 3, 4].map((item) => (
              <View key={`shimmer-${item}`} style={{ marginBottom: 20 }}>
                {renderShimmerCoupon()}
              </View>
            ))}
          </View>
        )}

        {/* Actual Coupons List */}
        {!vendorCouponsLoading && vendorCoupons.length > 0 && (
          <FlatList
            data={vendorCoupons}
            renderItem={renderCouponImageCard}
            keyExtractor={(item) => item.couponId.toString()}
            contentContainerStyle={[
              styles.listContainer,
              { paddingBottom: insets.bottom + 100 },
            ]}
            showsVerticalScrollIndicator={false}
            snapToInterval={width - 32 + 16}
            decelerationRate="fast"
            pagingEnabled={vendorCoupons.length === 1 ? false : true}
          />
        )}

        {/* Empty State */}
        {!vendorCouponsLoading && vendorCoupons.length === 0 && !vendorCouponsError && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No offers available at the moment</Text>
            <Text style={styles.emptySubText}>Check back later!</Text>
          </View>
        )}

        {/* Error State */}
        {vendorCouponsError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{vendorCouponsError}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => userId && vendorId && dispatch(fetchVendorCoupons({ userId, vendorId }))}
            >
              <Text style={styles.retryText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { paddingHorizontal: 16, paddingVertical: 10 },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  brandSection: { alignItems: 'center', paddingVertical: 20 },
  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#fff',
    padding: 5,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    elevation: 5,
  },
  brandLogo: { width: 80, height: 80, borderRadius: 40 },
  brandName: { fontSize: 24, fontWeight: 'bold', color: '#000' },
  couponCount: { fontSize: 15, color: '#666', marginTop: 4 },
  subscribeButton: {
    backgroundColor: '#E53935',
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    elevation: 5,
  },
  subscribeButtonText: { fontSize: 17, fontWeight: 'bold', color: '#fff' },
  bellIcon: { marginLeft: 10 },

  // Coupon Card
  couponContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  couponImage: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
  usedCouponContainer: {
    opacity: 0.6,
  },
  usedCouponImage: {
    opacity: 0.5,
  },
  usedOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#E53935',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 10,
  },
  usedText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },

  // States
  listContainer: { paddingTop: 10 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  emptyText: { fontSize: 18, color: '#888', textAlign: 'center' },
  emptySubText: { fontSize: 14, color: '#aaa', marginTop: 8 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { color: 'red', fontSize: 16, textAlign: 'center', marginBottom: 16 },
  retryButton: { padding: 12, backgroundColor: '#003366', borderRadius: 8 },
  retryText: { color: '#fff', fontWeight: '600' },
});

export default CouponsListScreen;