

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
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
import { fetchAllCoupons, fetchTrendingCoupons,fetchBniCoupons } from '../redux/reducers/auth';
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
    userId,
    bniCoupons = [],     // <--- Added
  bniLoading,
  } = useSelector((state) => state.Auth);

 
  const loadData = useCallback(async () => {
    if (!userId) {
      console.warn('No userId, cannot fetch coupons');
      return;
    }

    await Promise.all([
      dispatch(fetchTrendingCoupons(userId)),
      dispatch(fetchAllCoupons(userId)),
      dispatch(fetchBniCoupons(userId)),
    ]);
  }, [dispatch, userId]);

  // Initial load
  useEffect(() => {
    if (isFocused && userId) {
      loadData();
    }
  }, [isFocused, loadData, userId]);

  // Pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);
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

 

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCardPress = (coupon) => {
    navigation.navigate('CoffeeOfferScreen', { coupon });
  };

  
const renderTrendingCard = ({ item }) => {
  const isUsed = item.isUsed === 1;

  return (
    <View style={[styles.bniCard, isUsed && styles.disabledContent]}>
      <TouchableOpacity
        onPress={() => !isUsed && handleCardPress(item)}
        activeOpacity={isUsed ? 1 : 0.7}
        style={styles.bniCardContent}
      >
        {/* LEFT SECTION */}
        <View style={styles.bniLeftSection}>
          <Text style={styles.bniCashbackText}>{item.couponName}</Text>
        </View>

        {/* THE TICKET NOTCHES (Absolute Positioned) */}
        <View style={styles.cutCircleTop} />
        <View style={styles.cutCircleBottom} />

        {/* DASHED DIVIDER */}
        <View style={styles.bniDividerContainer}>
           <View style={styles.bniDivider} />
        </View>

        {/* RIGHT SECTION */}
       <View style={styles.bniRightSection}>
  <Image
    source={{ uri: item.vendorLogo }}
    style={styles.bniVendorLogo}
    resizeMode="cover" // Use cover to fill the 100% width/height
  />
</View>

        {/* USED OVERLAY */}
        {isUsed && (
          <View style={styles.usedOverlay}>
            <Text style={styles.usedText}>USED</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
 
const renderBniCard = ({ item }) => {
  const isUsed = item.isUsed === 1;

  return (
    <View style={[styles.bniCard, isUsed && styles.disabledContent]}>
      <TouchableOpacity
        onPress={() => !isUsed && handleCardPress(item)}
        activeOpacity={isUsed ? 1 : 0.7}
        style={styles.bniCardContent}
      >
        {/* LEFT SECTION */}
        <View style={styles.bniLeftSection}>
          <Text style={styles.bniCashbackText}>{item.couponName}</Text>
        </View>

        {/* THE TICKET NOTCHES (Absolute Positioned) */}
        <View style={styles.cutCircleTop} />
        <View style={styles.cutCircleBottom} />

        {/* DASHED DIVIDER */}
        <View style={styles.bniDividerContainer}>
           <View style={styles.bniDivider} />
        </View>

        {/* RIGHT SECTION */}
       <View style={styles.bniRightSection}>
  <Image
    source={{ uri: item.vendorLogo }}
    style={styles.bniVendorLogo}
    resizeMode="cover" // Use cover to fill the 100% width/height
  />
</View>

        {/* USED OVERLAY */}
        {isUsed && (
          <View style={styles.usedOverlay}>
            <Text style={styles.usedText}>USED</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
const renderCouponCard = (coupon) => {
  const isUsed = coupon.isUsed === 1;

  return (
    <View
      key={coupon.couponId}
      style={[styles.couponCard, isUsed && styles.disabledContent]}
    >
      {isUsed ? (
        <View>
          <View style={styles.imageContainer}>
            <Image source={{ uri: coupon.shopImage }} style={styles.couponImage} resizeMode="cover" />
            <Image source={{ uri: coupon.vendorLogo }} style={styles.logoOverlay} resizeMode="cover" />
            {isUsed && (
              <View style={styles.usedOverlay}>
                <Text style={styles.usedText}>USED</Text>
              </View>
            )}
          </View>
          <View style={styles.couponContent}>
            <View style={styles.couponHeader}>
              <Text style={styles.couponTitle} numberOfLines={1}>
                {coupon.couponName}
              </Text>
            </View>
            <Text style={styles.couponSubtitle} numberOfLines={2}>
              {coupon.title}
            </Text>
            <Text style={styles.couponCodeText}>Code: {coupon.couponCode}</Text>
          </View>
        </View>
      ) : (
        <TouchableOpacity onPress={() => handleCardPress(coupon)}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: coupon.shopImage }} style={styles.couponImage} resizeMode="cover" />
            <Image source={{ uri: coupon.vendorLogo }} style={styles.logoOverlay} resizeMode="cover" />
          </View>
          <View style={styles.couponContent}>
            <View style={styles.couponHeader}>
              <Text style={styles.couponTitle} numberOfLines={1}>
                {coupon.couponName}
              </Text>
            </View>
            <Text style={styles.couponSubtitle} numberOfLines={2}>
              {coupon.title}
            </Text>
            <Text style={styles.couponCodeText}>Code: {coupon.couponCode}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
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
        {/* <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#FFFFFF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search shops, offers, coupons..."
            placeholderTextColor="#FFFFFF"
          />
        </View> */}

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
    contentContainerStyle={styles.bniOffersList}
  />
) : (
  <Text style={{ paddingHorizontal: 20, color: '#666', marginBottom: 20, fontFamily: "SF-Pro-Display-Regular" }}>
    No trending offers right now
  </Text>
)}




{/* <View style={styles.bniSectionContainer}> */}
<View style={[styles.sectionHeader,{ marginTop: 20,justifyContent:"flex-start", gap:5,padding:0,margin:0, marginBottom: 16, paddingHorizontal: 20 }]}>
   <Image 
      source={require('../assets/bnilogoo.png')} 
      style={styles.bniBadgeImage}
      resizeMode="contain"
    />
  <Text style={[styles.sectionTitle, { color: '#000' }]}>EXCLUSIVE FOR BNI MEMBERS</Text>
</View>

{bniLoading && !refreshing ? (
  <TrendingSkeleton /> // Reusing your trending skeleton for horizontal list
) : bniCoupons.length > 0 ? (
  <FlatList
    data={bniCoupons}
    renderItem={renderBniCard} // Using the new BNI card design
    keyExtractor={(item) => `bni-${item.couponId}`}
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.bniOffersList}
  />
) : (
  <Text style={[styles.emptyText, { color: '#FFFFFF' }]}>No BNI exclusive offers available</Text>
)}
{/* </View> */}
        {/* Coupon Store */}
        <View style={[styles.sectionHeader, { marginTop: 24 }]}>
          <View>
            <Text style={styles.sectionTitle}>COUPONS STORE</Text>
          </View>
        
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
    </View>
  );
};

// Styles remain unchanged
const styles = StyleSheet.create({
  // ... your existing styles (unchanged)
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 18 },
  profileImage1: { width: 150, height: 50, borderRadius: 20 },
  profileImage: { width: 40, height: 40, borderRadius: 20 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#003366', borderRadius: 25, paddingHorizontal: 20, marginHorizontal: 20, marginTop: 8, marginBottom: 20 },
  searchInput: { flex: 1, marginLeft: 12, fontSize: 15, color: '#FFFFFF' ,     fontFamily:"SF-Pro-Display-Regular"},
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  sectionTitle: { fontSize: 16,  color: '#000000', letterSpacing: 0.5 ,
     fontFamily:"SF-Pro-Display-Bold"},
  newBadge: { backgroundColor: '#6C3FE8', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  newBadgeText: { fontSize: 11, fontWeight: '600', color: '#FFFFFF' },
  offersList: { paddingLeft: 20, paddingRight: 20 },
  offerCard: { width: 140, marginRight: 8, borderRadius: 12, backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, overflow: 'hidden', borderWidth: 0.5, borderColor: '#d2d2d2' },
  imageContainer: { position: 'relative' },
  offerImage: { width: '100%', height: 100, backgroundColor: '#F5F5F5' },
  logoOverlay: { position: 'absolute', top: 8, left: 8, width: 40, height: 40, borderRadius: 6, borderWidth: 2, borderColor: '#FFFFFF' },
  offerContent: { padding: 12 },
  offerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  offerTitle: { fontSize: 14, fontWeight: '600', color: '#000000',      fontFamily:"SF-Pro-Display-Bold" },
  offerSubtitle: { fontSize: 12, color: '#666666', marginBottom: 4 ,     fontFamily:"SF-Pro-Display-Regular"},
  offerPrice: { fontSize: 13, fontWeight: '600', color: '#000000',     fontFamily:"SF-Pro-Display-Semibold" },
  couponGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, justifyContent: 'space-between' },
  couponCard: { width: '48%', marginBottom: 16, borderRadius: 12, backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, overflow: 'hidden' },
  couponImage: { width: '100%', height: 120, backgroundColor: '#F5F5F5' },
  couponContent: { padding: 12 },
  couponHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  couponTitle: { fontSize: 14, fontWeight: '600', color: '#000000', flex: 1, fontFamily:"SF-Pro-Display-Bold" },
  couponSubtitle: { fontSize: 12, color: '#666666', marginBottom: 4,     fontFamily:"SF-Pro-Display-Regular" },
  couponCodeText: { fontSize: 13, fontWeight: '600', color: '#000000',     fontFamily:"SF-Pro-Display-Semibold" },
  usedOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.6)',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 12,
},
usedText: {
  color: '#e61414ff',
  fontSize: 18,
  fontWeight: 'bold',
  fontFamily: 'SF-Pro-Display-Bold',
},
disabledContent: {
  opacity: 0.6,
},


emptyText: {
  paddingHorizontal: 20,
  color: '#666',
  marginBottom: 20,
  fontFamily: "SF-Pro-Display-Regular",
  fontSize: 13
},

bniBadgeImage: {
    width: 60,   // Adjust width based on your logo's aspect ratio
    height: 30,  // Standard height to align with the section title
    // marginLeft: 10,
  },
  // Ensure your sectionHeader has alignItems: 'center' to keep title and logo level
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // This keeps the text and image vertically aligned
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  // BNI Section Container with Blue Background
  bniSectionContainer: {
    backgroundColor: '#1e3a8a', // Deep blue background
    marginTop: 24,
    marginHorizontal: 0,
    paddingVertical: 20,
    paddingBottom: 30,
  },

  // BNI Card Styles
  bniOffersList: { 
    paddingLeft: 20, 
    paddingRight: 20 
  },
  bniCard: {
    width: 200,
    height: 100,
    marginRight: 12,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bniCardContent: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },
  bniLeftSection: {
    flex: 0.4,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderWidth: 1,
    borderColor: '#d2d2d2',
    borderRightWidth: 0,
    position: 'relative',
  },
  bniDiscountText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'SF-Pro-Display-Bold',
  },
  bniCashbackText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666666',
    fontFamily: 'SF-Pro-Display-Semibold',
    letterSpacing: 0.5,
    transform: [{ rotate: '-90deg' }],
    marginTop: 8,
  },
  bniDivider: {
    width: 2,
    backgroundColor: 'transparent',
    borderLeftWidth: 2,
    borderLeftColor: '#000',
    borderStyle: 'dotted',
    marginVertical: 0,
  },
  bniRightSection: {
    flex: 0.8,
    overflow: 'hidden',
    borderRadius:12,
    borderTopLeftRadius: 10,
     borderBottomLeftRadius: 10,
    borderWidth: 1,
    borderColor: '#d2d2d2',
    borderLeftWidth: 0,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  bniBrandName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'SF-Pro-Display-Bold',
    marginBottom: 4,
  },
  bniOfferText: {
    fontSize: 11,
    color: '#666666',
    fontFamily: 'SF-Pro-Display-Regular',
    lineHeight: 14,
  },
  bniVendorLogo: {
    width: '100%',
    height: '100%',
   borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },


  //

  bniOffersList: {
  paddingLeft: 20,
  paddingRight: 20,
},

bniCard: {
  width: 220,
  height: 110,
  marginRight: 12,
},

bniCardContent: {
  flex: 1,
  flexDirection: 'row',
  position: 'relative',
},

// LEFT SECTION
bniLeftSection: {
  flex: 0.45,
  backgroundColor: '#f5f5f5',
  justifyContent: 'center',
  alignItems: 'center',
  borderTopRightRadius: 16,
  borderBottomRightRadius: 16,
  borderWidth: 1,
  borderColor: '#d2d2d2',
  borderRightWidth: 0,
},

bniCashbackText: {
  fontSize: 12,
  fontWeight: '600',
  color: '#666',
  transform: [{ rotate: '-90deg' }],
  fontFamily: 'SF-Pro-Display-Semibold',
},

// RIGHT SECTION
bniRightSection: {
  flex: 0.75,
  backgroundColor: '#fff',
  borderTopLeftRadius: 16,
  borderBottomLeftRadius: 16,
  borderWidth: 1,
  borderColor: '#d2d2d2',
  borderLeftWidth: 0,
  overflow: 'hidden',
},

bniVendorLogo: {
  width: '100%',
  height: '100%',
  borderTopLeftRadius: 16,
  borderBottomLeftRadius: 16,
},

// DOTTED DIVIDER
bniDivider: {
  width: 1,
  borderLeftWidth: 1,
  borderLeftColor: '#d2d2d2',
  borderStyle: 'dashed',
  marginVertical: 8,
},

// CUT CIRCLES (TICKET EFFECT)
cutCircleTop: {
  position: 'absolute',
  top: -8,
  left: '45%',
  width: 16,
  height: 16,
  borderRadius: 8,
  backgroundColor: '#FFFFFF',
  zIndex: 10,
},

cutCircleBottom: {
  position: 'absolute',
  bottom: -8,
  left: '45%',
  width: 16,
  height: 16,
  borderRadius: 8,
  backgroundColor: '#FFFFFF',
  zIndex: 10,
},

cutCircleLeft: {
  position: 'absolute',
  left: '100%', // aligns with divider
  top: '100%',
  marginTop: -10, // half of height to center perfectly
  width: 20,
  height: 20,
  borderRadius: 10,
  backgroundColor: '#FFFFFF',
  zIndex: 10,
},

cutCircleRight: {
  position: 'absolute',
  left: '100%', // same as divider
  top: '100%',
  marginTop: -10,
  width: 20,
  height: 20,
  borderRadius: 10,
  backgroundColor: '#FFFFFF',
  zIndex: 10,
},

//
bniCard: {
    width: 240,
    height: 110,
    marginRight: 12,
    backgroundColor: 'white', // Ensure background matches the card
    borderRadius: 16,
    // Add shadow to the whole card container
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden', // Clips the used overlay
  },
  bniCardContent: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#d2d2d2',
  },
  bniLeftSection: {
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  bniCashbackText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    transform: [{ rotate: '-90deg' }],
    fontFamily: 'SF-Pro-Display-Bold',
    textAlign: 'center',
    width: 100, // Fixed width helps with rotation centering
  },
  bniRightSection: {
    flex: 0.65,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  bniVendorLogo: {
    width: '80%',
    height: '80%',
  },
  // THE DASHED LINE
  bniDividerContainer: {
    width: 1,
    height: '70%', // Don't go full height to leave room for circles
    alignSelf: 'center',
    justifyContent: 'center',
  },
  bniDivider: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'dotted',
    borderRadius: 1,
    lineHeight:5
  },
  // THE CLIP CUTS
  cutCircleTop: {
    position: 'absolute',
    top: -10, // Half out of the card
    left: '35%',
    marginLeft: -10, // Center it on the 35% line
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF', // Set this to your SCREEN background color
    borderWidth: 1,
    borderColor: '#d2d2d2',
    zIndex: 1,
  },
  cutCircleBottom: {
    position: 'absolute',
    bottom: -10, // Half out of the card
    left: '35%',
    marginLeft: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF', // Set this to your SCREEN background color
    borderWidth: 1,
    borderColor: '#d2d2d2',
    zIndex: 1,
  },


  bniRightSection: {
    flex: 0.65,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden', // Crucial for keeping the image inside the card boundaries
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  bniVendorLogo: {
    width: '100%',
    height: '100%',
  },
  // Ensure the cut circles are placed on top of the image
  cutCircleTop: {
    position: 'absolute',
    top: -10,
    left: '35%',
    marginLeft: -10,
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#FFFFFF', // Must match screen background
    borderWidth: 1,
    borderColor: '#d2d2d2',
    zIndex: 10, // Higher zIndex to sit on top of the logo image
  },
  cutCircleBottom: {
    position: 'absolute',
    bottom: -10,
    left: '35%',
    marginLeft: -10,
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#FFFFFF', // Must match screen background
    borderWidth: 1,
    borderColor: '#d2d2d2',
    zIndex: 10, // Higher zIndex to sit on top of the logo image
  },
  bniDividerContainer: {
    position: 'absolute', // Positioned absolutely so it sits OVER the logo
    left: '35%',
    top: '15%',
    bottom: '15%',
    width: 1,
    zIndex: 5,
    justifyContent: 'center',
  },
  bniDivider: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#FFFFFF', // Changed to white or a light color to be visible over a logo
    borderStyle: 'dashed',
    borderRadius: 1,
  },
//
// THE DASHED LINE CONTAINER
  bniDividerContainer: {
    position: 'absolute',
    left: '35%',
    // Decrease these values to increase the height (closer to 0 is taller)
    top: 5, 
    bottom: 5, 
    width: 1,
    zIndex: 15, // Higher than the logo (10) to ensure visibility
    justifyContent: 'center',
    // Center precisely on the 35% line
    marginLeft: -0.5, 
  },

  bniDivider: {
    flex: 1,
    borderWidth: 1,
    // Set to black for high visibility
    borderColor: '#000000', 
    borderStyle: 'dashed',
    borderRadius: 1,
  },

  // THE CLIP CUTS (Slightly adjusted for your taller divider)
  cutCircleTop: {
    position: 'absolute',
    top: -8, // Adjusted depth
    left: '35%',
    marginLeft: -7.5, // Centers the 15-width circle
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#FFFFFF', 
    borderWidth: 1,
    borderColor: '#d2d2d2',
    zIndex: 20, // Sit on top of everything
  },

  cutCircleBottom: {
    position: 'absolute',
    bottom: -8,
    left: '35%',
    marginLeft: -7.5,
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#d2d2d2',
    zIndex: 20,
  },
  // gemini final
  
});

export default Home; 