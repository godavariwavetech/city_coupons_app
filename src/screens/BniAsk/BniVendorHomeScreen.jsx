
import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { fetchVendorDashboard, listVendorCoupons } from '../../redux/reducers/auth';

const COLORS = {
  primary: '#002161', // brand navy
  white: '#FFFFFF',
  textDark: '#1A1A1A',
  textGray: '#666666',
  border: '#EAEAEA',
  successBg: '#E5F7ED',
  successText: '#00B341',
  heroBg: '#E6E9F2', // Light navy background
  cardBg: '#FFFFFF',
};

const FONTS = {
  regular: 'System',
  semibold: 'System',
  bold: 'System',
};

const DEFAULT_COUPON_IMAGE = require('../../assets/homebanner.png'); // used when a coupon has no image

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const BniVendorHomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {
    vendorId,
    vendorDashboard,
    vendorCouponsList,
    vendorCouponsListLoading,
  } = useSelector((state) => state.Auth);

  useFocusEffect(
    useCallback(() => {
      if (vendorId) {
        dispatch(fetchVendorDashboard(vendorId));
        dispatch(listVendorCoupons(vendorId));
      }
    }, [dispatch, vendorId])
  );

  const vendor = vendorDashboard?.vendor;
  const couponsRedeemed = vendorDashboard?.redeemed?.redeemedCoupons ?? 0;
  const discountGiven = vendorDashboard?.discountGiven ?? 0;
  const activeCoupons = vendorDashboard?.total?.totalCoupons ?? vendorDashboard?.stats?.activeCoupons ?? 0;
  const recentCoupons = (vendorCouponsList || []).slice(0, 4);
  const bannerImage = vendor?.shopImage || vendor?.logo;

  const goToBannerCoupon = () => {
    if (recentCoupons.length > 0) {
      navigation?.navigate('BniCouponDetailScreen', { coupon: recentCoupons[0] });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.headerLogo}
          resizeMode="contain"
        />
        {/* <TouchableOpacity style={styles.bellButton}>
          <Feather name="bell" size={22} color={COLORS.textDark} />
        </TouchableOpacity> */}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollArea}>

        {/* Hero Banner */}
        <TouchableOpacity activeOpacity={0.9} onPress={goToBannerCoupon}>
          <Image
            source={bannerImage ? { uri: bannerImage } : require('../../assets/homebanner.png')}
            style={styles.heroBanner}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <View style={styles.contentPadding}>
          {/* Today's Activity */}
          <Text style={styles.sectionTitle}>Today's Activity</Text>
          
          <View style={styles.statsRow}>
            {/* Stat 1 */}
            <View style={styles.statCard}>
              <View style={[styles.statIconWrap, {backgroundColor: '#E5F7ED'}]}>
                <Feather name="tag" size={16} color="#00B341" />
              </View>
              <Text style={[styles.statValue, {color: '#00B341'}]}>{couponsRedeemed}</Text>
              <Text style={styles.statLabel}>Coupons{'\n'}Redeemed</Text>
            </View>
            
            {/* Stat 2 */}
            <View style={styles.statCard}>
              <View style={[styles.statIconWrap, {backgroundColor: '#E6E9F2'}]}>
                <Feather name="percent" size={16} color="#002161" />
              </View>
              <Text style={[styles.statValue, {color: '#002161'}]}>₹{discountGiven}</Text>
              <Text style={styles.statLabel}>Discount{'\n'}Given</Text>
            </View>
            
            {/* Stat 3 */}
            <View style={styles.statCard}>
              <View style={[styles.statIconWrap, {backgroundColor: '#F0E6FA'}]}>
                <Feather name="shopping-bag" size={16} color="#8A2BE2" />
              </View>
              <Text style={[styles.statValue, {color: '#8A2BE2'}]}>{activeCoupons}</Text>
              <Text style={styles.statLabel}>Active{'\n'}Coupons</Text>
            </View>
          </View>

          {/* My Coupons Header */}
          <View style={styles.myCouponsHeader}>
            <Text style={styles.sectionTitle}>My Coupons</Text>
            <TouchableOpacity onPress={() => navigation?.navigate('MyCoupons')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Coupons List */}
          {vendorCouponsListLoading ? (
            <View style={styles.emptyState}>
              <ActivityIndicator size="small" color={COLORS.primary} />
            </View>
          ) : recentCoupons.length === 0 ? (
            <View style={styles.emptyState}>
              <Feather name="tag" size={28} color={COLORS.border} />
              <Text style={styles.emptyText}>No coupons yet</Text>
            </View>
          ) : (
            recentCoupons.map((coupon) => {
              const couponId = coupon.id ?? coupon.couponId;
              return (
                <View key={couponId} style={styles.couponCard}>
                  <Image
                    source={
                      coupon.imageUrl || coupon.image
                        ? { uri: coupon.imageUrl || coupon.image }
                        : DEFAULT_COUPON_IMAGE
                    }
                    style={styles.couponImage}
                  />

                  <View style={styles.couponDetails}>
                    <View style={styles.couponTitleRow}>
                      <Feather name="tag" size={14} color={COLORS.primary} style={{marginRight: 6}}/>
                      <Text style={styles.couponCode} numberOfLines={1}>{coupon.couponCode}</Text>
                    </View>
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText} numberOfLines={1}>{coupon.title}</Text>
                    </View>
                    <Text style={styles.expiryText}>Expires on {formatDate(coupon.validTo)}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.viewMoreBtn}
                    onPress={() => navigation?.navigate('BniCouponDetailScreen', { coupon })}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.viewMoreText}>View{'\n'}More</Text>
                  </TouchableOpacity>
                </View>
              );
            })
          )}

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </View>
  );
};

export default BniVendorHomeScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.white 
  },
  
  // Header
  header: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerLogo: {
    width: 80,
    height: 34,
  },
  bellButton: {
    padding: 4,
  },

  scrollArea: {
    flex: 1,
  },

  // Hero Banner
  heroBanner: {
    width: '100%',
    // aspectRatio: 786 / 180,
    height:150
  },

  contentPadding: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  // Today's Activity
  sectionTitle: { 
    fontFamily: FONTS.bold, 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: COLORS.textDark 
  },
  statsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginTop: 16, 
    marginBottom: 28 
  },
  statCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 6,
    marginHorizontal: 6,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: { 
    fontFamily: FONTS.bold, 
    fontSize: 18, 
    fontWeight: 'bold',
  },
  statLabel: { 
    fontFamily: FONTS.regular, 
    fontSize: 11, 
    color: COLORS.textGray, 
    marginTop: 4, 
    textAlign: 'center',
    lineHeight: 14,
  },

  // My Coupons
  myCouponsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAll: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary
  },

  // Empty state
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    marginTop: 8,
    fontSize: 13,
    color: COLORS.textGray,
  },

  // Coupon Card
  couponCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    marginBottom: 12,
    height: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  couponImage: {
    width: 100,
    height: '100%',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  couponDetails: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  couponTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  couponCode: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  discountBadge: {
    backgroundColor: '#00B341',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  discountText: {
    fontSize: 10,
    color: COLORS.white,
    fontWeight: '600',
  },
  expiryText: {
    fontSize: 11,
    color: COLORS.textGray,
    marginTop: 8,
  },
  viewMoreBtn: {
    backgroundColor: COLORS.primary,
    width: 50,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewMoreText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
});