import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { listVendorCoupons, deleteVendorCoupon } from '../../redux/reducers/auth';

const COLORS = {
  primary: '#002161', // brand navy
  white: '#FFFFFF',
  textDark: '#1A1A1A',
  textGray: '#666666',
  border: '#EAEAEA',
  successBg: '#00B341',
};

const DEFAULT_IMAGE = require('../../assets/homebanner.png'); // used when a coupon has no image

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const BniMyCouponsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { vendorId, vendorCouponsList, vendorCouponsListLoading, vendorCouponActionLoading } =
    useSelector((state) => state.Auth);

  useFocusEffect(
    useCallback(() => {
      if (vendorId) {
        dispatch(listVendorCoupons(vendorId));
      }
    }, [dispatch, vendorId])
  );

  const handleDelete = (coupon) => {
    const couponId = coupon.id ?? coupon.couponId;
    Alert.alert('Delete Coupon', 'Are you sure you want to delete this coupon?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          dispatch(deleteVendorCoupon({ vendorId, couponId }))
            .unwrap()
            .catch((err) => Alert.alert('Error', err || 'Failed to delete coupon'));
        },
      },
    ]);
  };

  const renderCouponCard = ({ item }) => (
    <View style={styles.couponCard}>
      {/* Left Image */}
      <Image
        source={item.imageUrl || item.image ? { uri: item.imageUrl || item.image } : DEFAULT_IMAGE}
        style={styles.couponImage}
      />

      {/* Center Details */}
      <View style={styles.couponDetails}>
        <View style={styles.couponTitleRow}>
          <Feather name="tag" size={14} color={COLORS.primary} style={{ marginRight: 6 }} />
          <Text style={styles.couponCode} numberOfLines={1}>{item.couponCode}</Text>
        </View>

        <View style={styles.discountBadge}>
          <Text style={styles.discountText} numberOfLines={1}>{item.title}</Text>
        </View>

        <Text style={styles.expiryText}>Expires on {formatDate(item.validTo)}</Text>
      </View>

      {/* Right Actions */}
      <View style={styles.actionsCol}>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => handleDelete(item)}
          activeOpacity={0.8}
        >
          <Feather name="trash-2" size={16} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewMoreBtn}
          onPress={() => navigation?.navigate('BniCouponDetailScreen', { coupon: item })}
          activeOpacity={0.8}
        >
          <Text style={styles.viewMoreText}>View{'\n'}More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerTitle}>My Coupons</Text>
      </View>

      {vendorCouponsListLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={vendorCouponsList}
          keyExtractor={(item, index) => String(item.id ?? item.couponId ?? index)}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={renderCouponCard}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyText}>No coupons yet. Tap + to add one.</Text>
            </View>
          }
        />
      )}

      {vendorCouponActionLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation?.navigate('BniAddNewCouponScreen')}
        activeOpacity={0.9}
      >
        <Feather name="plus" size={32} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

export default BniMyCouponsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyText: {
    color: COLORS.textGray,
    fontSize: 14,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textDark
  },

  // List
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    flexGrow: 1,
  },

  // Coupon Card
  couponCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    marginBottom: 16,
    height: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  couponImage: {
    width: 110,
    height: '100%',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  couponDetails: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  couponTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  couponCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textDark,
    flexShrink: 1,
  },
  discountBadge: {
    backgroundColor: COLORS.successBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 6,
    maxWidth: '100%',
  },
  discountText: {
    fontSize: 10,
    color: COLORS.white,
    fontWeight: '600',
  },
  expiryText: {
    fontSize: 11,
    color: COLORS.textGray,
  },
  actionsCol: {
    width: 50,
  },
  deleteBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  viewMoreBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 12,
  },
  viewMoreText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 14,
  },

  // FAB
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
});
