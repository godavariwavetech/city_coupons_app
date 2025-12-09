
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   SafeAreaView,
//   Image,
//   ScrollView,
//   FlatList,
//   Platform,
//   ActivityIndicator,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useIsFocused } from '@react-navigation/native';
// import Feather from 'react-native-vector-icons/Feather';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import QRScannerModal from '../screens/QRScannerModal';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllCoupons, fetchTrendingCoupons } from '../redux/reducers/auth';
// import { CouponGridSkeleton ,TrendingSkeleton } from '../components/SkeletonLoader';
// const Home = ({ navigation, route }) => {
//   const insets = useSafeAreaInsets();
//   const isFocused = useIsFocused();
//   const dispatch = useDispatch();

//   const [scanModalVisible, setScanModalVisible] = useState(false);
//   const [favorites, setFavorites] = useState({});

//   const {
//     trendingCoupons,
//     trendingLoading,
//     coupons,
//     couponsLoading,
//     couponsError,
//   } = useSelector((state) => state.Auth);

//   // Fetch both trending & all coupons when screen opens
//   useEffect(() => {
//     if (isFocused) {
//       dispatch(fetchTrendingCoupons());
//       dispatch(fetchAllCoupons());
//     }
//   }, [isFocused, dispatch]);

//   useEffect(() => {
//     if (route.params?.openScanner) {
//       setScanModalVisible(true);
//       navigation.setParams({ openScanner: false });
//     }
//   }, [route.params?.openScanner]);

//   const toggleFavorite = (id) => {
//     setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   const handleCardPress = (coupon) => {
//     navigation.navigate('CoffeeOfferScreen', { coupon });
//   };

//   // Trending Coupon Card (for "OFFERS PICKED FOR YOU")
//   const renderTrendingCard = ({ item }) => {
//     const isFav = favorites[item.couponId];

//     return (
//       <TouchableOpacity style={styles.offerCard} onPress={() => handleCardPress(item)}>
//         <View style={styles.imageContainer}>
//           <Image
//             source={{ uri: item.imageUrl }}
//             style={styles.offerImage}
//             resizeMode="cover"
//             defaultSource={require('../assets/profile1.png')}
//           />
//           <Image
//             source={{ uri: item.vendorLogo }}
//             style={styles.logoOverlay}
//             resizeMode="cover"
//             defaultSource={require('../assets/profile1.png')}
//           />
//           {/* Trending Badge */}
//           {/* <View style={styles.trendingBadge}>
//             <Text style={styles.trendingText}>Trending</Text>
//           </View> */}
//         </View>

//         <View style={styles.offerContent}>
//           <View style={styles.offerHeader}>
//             <Text style={styles.offerTitle} numberOfLines={1}>
//               {item.vendorName}
//             </Text>
//             <TouchableOpacity onPress={() => toggleFavorite(item.couponId)}>
//               <Feather
//                 name="heart"
//                 size={18}
//                 color={isFav ? '#E91E63' : '#666666'}
//               />
//             </TouchableOpacity>
//           </View>
//           <Text style={styles.offerSubtitle} numberOfLines={2}>
//             {item.title}
//           </Text>
//           <Text style={styles.offerPrice}>Code: {item.couponCode}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   // Regular Coupon Card (for Coupon Store)
//   const renderCouponCard = (coupon) => {
//     const isFav = favorites[coupon.couponId];

//     return (
//       <TouchableOpacity
//         key={coupon.couponId}
//         style={styles.couponCard}
//         onPress={() => handleCardPress(coupon)}
//       >
//         <View style={styles.imageContainer}>
//           <Image
//             source={{ uri: coupon.imageUrl }}
//             style={styles.couponImage}
//             resizeMode="cover"
//             defaultSource={require('../assets/profile1.png')}
//           />
//           <Image
//             source={{ uri: coupon.vendorLogo }}
//             style={styles.logoOverlay}
//             resizeMode="cover"
//           />
//         </View>
//         <View style={styles.couponContent}>
//           <View style={styles.couponHeader}>
//             <Text style={styles.couponTitle} numberOfLines={1}>
//               {coupon.vendorName}
//             </Text>
//             <TouchableOpacity onPress={() => toggleFavorite(coupon.couponId)}>
//               <Feather name="heart" size={18} color={isFav ? '#E91E63' : '#666666'} />
//             </TouchableOpacity>
//           </View>
//           <Text style={styles.couponSubtitle} numberOfLines={2}>
//             {coupon.title}
//           </Text>
//           <Text style={styles.couponCodeText}>Code: {coupon.couponCode}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
//       <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

//       <ScrollView
//         contentContainerStyle={{
//           paddingBottom: (Platform.OS === 'ios' ? 85 : 65) + insets.bottom + 80,
//         }}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity >
//             <Image source={require('../assets/icon.png')} style={styles.profileImage1} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
//             <Image source={require('../assets/profile1.png')} style={styles.profileImage} />
//           </TouchableOpacity>
//         </View>

//         {/* Search */}
//         <View style={styles.searchContainer}>
//           <Feather name="search" size={20} color="#FFFFFF" />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search shops, offers, coupons..."
//             placeholderTextColor="#FFFFFF"
//           />
//         </View>

//         {/* OFFERS PICKED FOR YOU - Now shows TRENDING COUPONS */}
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>OFFERS PICKED FOR YOU</Text>
//           {trendingCoupons.length > 0 && (
//             <View style={styles.newBadge}>
//               <Text style={styles.newBadgeText}>Trending</Text>
//             </View>
//           )}
//         </View>

//         {/* {trendingLoading ? (
//           <ActivityIndicator size="small" color="#003366" style={{ marginLeft: 20 }} />
//         ) : trendingCoupons.length > 0 ? (
//           <FlatList
//             data={trendingCoupons}
//             renderItem={renderTrendingCard}
//             keyExtractor={(item) => item.couponId.toString()}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.offersList}
//           />
//         ) : (
//           <Text style={{ paddingHorizontal: 20, color: '#666', marginBottom: 20 }}>
//             No trending offers right now
//           </Text>
//         )} */}
// {trendingLoading ? (
//   <TrendingSkeleton />
// ) : trendingCoupons.length > 0 ? (
//   <FlatList
//     data={trendingCoupons}
//     renderItem={renderTrendingCard}
//      keyExtractor={(item) => item.couponId.toString()}
//     horizontal
//     showsHorizontalScrollIndicator={false}
//     contentContainerStyle={styles.offersList}
    
//   />
// ) : (
//   <Text style={{ paddingHorizontal: 20, color: '#666', marginBottom: 20 }}>
//     No trending offers right now
//   </Text>
// )}
//         {/* Coupon Store - All Coupons */}
//         <View style={[styles.sectionHeader, { marginTop: 24 }]}>
//           <View>
//             <Text style={styles.sectionTitle}>COUPONS STORE</Text>
//             {/* <Text style={styles.sectionSubtitle}>
//               {coupons.length > 0 ? `Discover ${coupons.length}+ Live Offers` : 'Loading...'}
//             </Text> */}
//           </View>
//           <TouchableOpacity>
//             <MaterialCommunityIcons name="filter-variant" size={22} color="#000" />
//           </TouchableOpacity>
//         </View>

//         {/* {couponsLoading && (
//           <ActivityIndicator size="large" color="#003366" style={{ marginVertical: 40 }} />
//         )} */}
// {couponsLoading ? (
//   <CouponGridSkeleton />
// ) : couponsError ? (
//   <Text style={{ textAlign: 'center', color: 'red', padding: 20 }}>{couponsError}</Text>
// ) : coupons.length > 0 ? (
//   <View style={styles.couponGrid}>
//     {coupons.map(renderCouponCard)}
//   </View>
// ) : (
//   <Text style={{ textAlign: 'center', color: '#666', padding: 40 }}>
//     No coupons available
//   </Text>
// )}
//         {couponsError && (
//           <Text style={{ textAlign: 'center', color: 'red', padding: 20 }}>
//             {couponsError}
//           </Text>
//         )}

//         {!couponsLoading && coupons.length > 0 && (
//           <View style={styles.couponGrid}>
//             {coupons.map(renderCouponCard)}
//           </View>
//         )}
//       </ScrollView>

//       <QRScannerModal
//         visible={scanModalVisible}
//         onClose={() => setScanModalVisible(false)}
//         navigation={navigation}
//       />
//     </SafeAreaView>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {},
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//   },
//   locationContainer: {
//     flex: 1,
//   },
//   locationTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#000000',
//     marginBottom: 4,
//   },
//   locationRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   locationAddress: {
//     fontSize: 13,
//     color: '#666666',
//     marginRight: 4,
//   },
//   profileImage1: {
//     width: 80,
//     height: 50,
//     borderRadius: 20,
//   },
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#003366',
//     borderRadius: 25,
//     paddingHorizontal: 20,
//     // paddingVertical: 6,
//     marginHorizontal: 20,
//     marginTop: 8,
//     marginBottom: 20,
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 12,
//     fontSize: 15,
//     color: '#FFFFFF',
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#000000',
//     letterSpacing: 0.5,
//   },
//   sectionSubtitle: {
//     fontSize: 12,
//     color: '#666666',
//     marginTop: 2,
//   },
//   newBadge: {
//     backgroundColor: '#6C3FE8',
//     borderRadius: 12,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//   },
//   newBadgeText: {
//     fontSize: 11,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   offersList: {
//     paddingLeft: 20,
//     paddingRight: 20,
//   },
//   offerCard: {
//     width: 140,
//     marginRight: 16,
//     borderRadius: 12,
//     backgroundColor: '#FFFFFF',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     overflow: 'hidden',
//     borderWidth: 0.5,
//     borderColor: '#d2d2d2',
//   },
//   imageContainer: {
//     position: 'relative',
//   },
//   offerImage: {
//     width: '100%',
//     height: 100,
//     backgroundColor: '#F5F5F5',
//   },
//   logoOverlay: {
//     position: 'absolute',
//     top: 8,
//     left: 8,
//     width: 40,
//     height: 40,
//     borderRadius: 6,
//     borderWidth: 2,
//     borderColor: '#FFFFFF',
//   },
//   offerContent: {
//     padding: 12,
//   },
//   offerHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   offerTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#000000',
//   },
//   offerSubtitle: {
//     fontSize: 12,
//     color: '#666666',
//     marginBottom: 4,
//   },
//   offerPrice: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#000000',
//   },
//   couponGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     paddingHorizontal: 12,
//     justifyContent: 'space-between',
//   },
//   couponCard: {
//     width: '48%',
//     marginBottom: 16,
//     borderRadius: 12,
//     backgroundColor: '#FFFFFF',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     overflow: 'hidden',
//   },
//   couponImage: {
//     width: '100%',
//     height: 120,
//     backgroundColor: '#F5F5F5',
//   },
//   couponContent: {
//     padding: 12,
//   },
//   couponHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   couponTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#000000',
//     flex: 1,
//   },
//   couponSubtitle: {
//     fontSize: 12,
//     color: '#666666',
//     marginBottom: 4,
//   },
//   couponPrice: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#000000',
//   },
// });

// export default Home;
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
  Platform,
  ActivityIndicator,
  RefreshControl, // ← Added
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import QRScannerModal from '../screens/QRScannerModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCoupons, fetchTrendingCoupons } from '../redux/reducers/auth';
import { CouponGridSkeleton, TrendingSkeleton } from '../components/SkeletonLoader';

const Home = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [scanModalVisible, setScanModalVisible] = useState(false);
  const [favorites, setFavorites] = useState({});
  const [refreshing, setRefreshing] = useState(false); // ← For pull-to-refresh

  const {
    trendingCoupons,
    trendingLoading,
    coupons,
    couponsLoading,
    couponsError,
  } = useSelector((state) => state.Auth);

  // Combined refresh function (used for both mount & pull-to-refresh)
  const loadData = useCallback(async () => {
    await Promise.all([
      dispatch(fetchTrendingCoupons()),
      dispatch(fetchAllCoupons()),
    ]);
  }, [dispatch]);

  // Initial load when screen comes into focus
  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [isFocused, loadData]);

  // Handle deep link to open scanner
  useEffect(() => {
    if (route.params?.openScanner) {
      setScanModalVisible(true);
      navigation.setParams({ openScanner: false });
    }
  }, [route.params?.openScanner]);

  // Pull-to-refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadData();
    } finally {
      setRefreshing(false);
    }
  }, [loadData]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCardPress = (coupon) => {
    navigation.navigate('CoffeeOfferScreen', { coupon });
  };

  // Trending Coupon Card
  const renderTrendingCard = ({ item }) => {
    const isFav = favorites[item.couponId];

    return (
      <TouchableOpacity style={styles.offerCard} onPress={() => handleCardPress(item)}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.shopImage }}
            style={styles.offerImage}
            resizeMode="cover"
            // defaultSource={require('../assets/profile1.png')}
          />
          <Image
            source={{ uri: item.vendorLogo }}
            style={styles.logoOverlay}
            resizeMode="cover"
            // defaultSource={require('../assets/profile1.png')}
          />
        </View>

        <View style={styles.offerContent}>
          <View style={styles.offerHeader}>
            <Text style={styles.offerTitle} numberOfLines={1}>
              {item.couponName}
            </Text>
            {/* <TouchableOpacity onPress={() => toggleFavorite(item.couponId)}>
              <Feather
                name="heart"
                size={18}
                color={isFav ? '#E91E63' : '#666666'}
              />
            </TouchableOpacity> */}
          </View>
          <Text style={styles.offerSubtitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.offerPrice}>Code: {item.couponCode}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Regular Coupon Card
  const renderCouponCard = (coupon) => {
    const isFav = favorites[coupon.couponId];

    return (
      <TouchableOpacity
        key={coupon.couponId}
        style={styles.couponCard}
        onPress={() => handleCardPress(coupon)}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: coupon.shopImage }}
            style={styles.couponImage}
            resizeMode="cover"
            // defaultSource={require('../assets/profile1.png')}
          />
          <Image
            source={{ uri: coupon.vendorLogo }}
            style={styles.logoOverlay}
            resizeMode="cover"
          />
        </View>
        <View style={styles.couponContent}>
          <View style={styles.couponHeader}>
            <Text style={styles.couponTitle} numberOfLines={1}>
              {coupon.couponName}
            </Text>
            {/* <TouchableOpacity onPress={() => toggleFavorite(coupon.couponId)}>
              <Feather name="heart" size={18} color={isFav ? '#E91E63' : '#666666'} />
            </TouchableOpacity> */}
          </View>
          <Text style={styles.couponSubtitle} numberOfLines={2}>
            {coupon.title}
          </Text>
          <Text style={styles.couponCodeText}>Code: {coupon.couponCode}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: (Platform.OS === 'ios' ? 85 : 65) + insets.bottom + 80,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={ // ← Pull-to-refresh added here
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#003366']} // Android spinner color
            tintColor="#003366" // iOS spinner color
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Image source={require('../assets/icon.png')} style={styles.profileImage1} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image source={require('../assets/profile1.png')} style={styles.profileImage} />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#FFFFFF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search shops, offers, coupons..."
            placeholderTextColor="#FFFFFF"
          />
        </View>

        {/* OFFERS PICKED FOR YOU */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>OFFERS PICKED FOR YOU</Text>
          {trendingCoupons.length > 0 && (
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>Trending</Text>
            </View>
          )}
        </View>

        {trendingLoading && !refreshing ? (
          <TrendingSkeleton />
        ) : trendingCoupons.length > 0 ? (
          <FlatList
            data={trendingCoupons}
            renderItem={renderTrendingCard}
            keyExtractor={(item) => item.couponId.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.offersList}
          />
        ) : (
          <Text style={{ paddingHorizontal: 20, color: '#666', marginBottom: 20 }}>
            No trending offers right now
          </Text>
        )}

        {/* Coupon Store */}
        <View style={[styles.sectionHeader, { marginTop: 24 }]}>
          <View>
            <Text style={styles.sectionTitle}>COUPONS STORE</Text>
          </View>
          <TouchableOpacity>
            <MaterialCommunityIcons name="filter-variant" size={22} color="#000" />
          </TouchableOpacity>
        </View>

        {couponsLoading && !refreshing ? (
          <CouponGridSkeleton />
        ) : couponsError ? (
          <Text style={{ textAlign: 'center', color: 'red', padding: 20 }}>
            {couponsError}
          </Text>
        ) : coupons.length > 0 ? (
          <View style={styles.couponGrid}>
            {coupons.map(renderCouponCard)}
          </View>
        ) : (
          <Text style={{ textAlign: 'center', color: '#666', padding: 40 }}>
            No coupons available
          </Text>
        )}
      </ScrollView>

      <QRScannerModal
        visible={scanModalVisible}
        onClose={() => setScanModalVisible(false)}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

// Styles remain unchanged
const styles = StyleSheet.create({
  // ... your existing styles (unchanged)
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 },
  profileImage1: { width: 150, height: 50, borderRadius: 20 },
  profileImage: { width: 40, height: 40, borderRadius: 20 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#003366', borderRadius: 25, paddingHorizontal: 20, marginHorizontal: 20, marginTop: 8, marginBottom: 20 },
  searchInput: { flex: 1, marginLeft: 12, fontSize: 15, color: '#FFFFFF' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#000000', letterSpacing: 0.5 },
  newBadge: { backgroundColor: '#6C3FE8', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  newBadgeText: { fontSize: 11, fontWeight: '600', color: '#FFFFFF' },
  offersList: { paddingLeft: 20, paddingRight: 20 },
  offerCard: { width: 140, marginRight: 16, borderRadius: 12, backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, overflow: 'hidden', borderWidth: 0.5, borderColor: '#d2d2d2' },
  imageContainer: { position: 'relative' },
  offerImage: { width: '100%', height: 100, backgroundColor: '#F5F5F5' },
  logoOverlay: { position: 'absolute', top: 8, left: 8, width: 40, height: 40, borderRadius: 6, borderWidth: 2, borderColor: '#FFFFFF' },
  offerContent: { padding: 12 },
  offerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  offerTitle: { fontSize: 14, fontWeight: '600', color: '#000000' },
  offerSubtitle: { fontSize: 12, color: '#666666', marginBottom: 4 },
  offerPrice: { fontSize: 13, fontWeight: '600', color: '#000000' },
  couponGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, justifyContent: 'space-between' },
  couponCard: { width: '48%', marginBottom: 16, borderRadius: 12, backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, overflow: 'hidden' },
  couponImage: { width: '100%', height: 120, backgroundColor: '#F5F5F5' },
  couponContent: { padding: 12 },
  couponHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  couponTitle: { fontSize: 14, fontWeight: '600', color: '#000000', flex: 1 },
  couponSubtitle: { fontSize: 12, color: '#666666', marginBottom: 4 },
  couponCodeText: { fontSize: 13, fontWeight: '600', color: '#000000' },
});

export default Home; 