import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from './theme';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const DISCOUNT_TYPE_LABELS = {
  percentage: 'Percentage Off',
  flat: 'Flat Off',
};

const BniCouponDetailScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const coupon = route?.params?.coupon || {};

  const couponCode = coupon.couponCode || coupon.code || '';
  const discountValue = coupon.discountValue || '';
  const discountSuffix = coupon.discountType === 'flat' ? ' Off*' : '% Off*';
  const couponTypeLabel = DISCOUNT_TYPE_LABELS[coupon.discountType] || 'Percentage Off';

  const terms = (coupon.terms || '')
    .split(/[.\n]+/)
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <ImageBackground
        source={
          coupon.imageUrl || coupon.image
            ? { uri: coupon.imageUrl || coupon.image }
            : require('../../assets/homebanner.png')
        }
        style={[styles.banner, { paddingTop: insets.top + 16 }]}
        imageStyle={styles.bannerImage}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={22} color={COLORS.white} />
        </TouchableOpacity>
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* <Text style={styles.discountHeading}>
          Get Upto{'\n'}{discountValue}{discountSuffix}
        </Text> */}

        <View style={styles.discountBadge}>
          <Text style={styles.discountBadgeText}>{coupon.title}</Text>
        </View>

        {!!coupon.description && <Text style={styles.descriptionText}>{coupon.description}</Text>}

        <View style={styles.codeRow}>
          <Text style={styles.code}>Code: {couponCode}</Text>
          {/* <TouchableOpacity style={styles.copyButton}>
            <Feather name="copy" size={14} color={COLORS.primary} />
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.infoRow}>
          <Feather name="tag" size={14} color={COLORS.textGray} style={styles.infoIcon} />
          <Text style={styles.infoLine}>Coupon Type : {couponTypeLabel}</Text>
        </View>
        <View style={styles.infoRow}>
          <Feather name="clock" size={14} color={COLORS.textGray} style={styles.infoIcon} />
          <Text style={styles.infoLine}>Expires on: {formatDate(coupon.validTo)}</Text>
        </View>

        <View style={styles.sectionTitleRow}>
          <Feather name="file-text" size={16} color={COLORS.textDark} style={styles.infoIcon} />
          <Text style={styles.sectionTitle}>Terms & Conditions</Text>
        </View>
        {(terms.length > 0
          ? terms
          : ['Valid only for first purchase.', 'Offer valid till the expiry date.']
        ).map((term, i) => (
          <View key={i} style={styles.termRow}>
            <View style={styles.bullet} />
            <Text style={styles.termText}>{term}</Text>
          </View>
        ))}

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Start Date</Text>
            <Text style={styles.statValue}>{formatDate(coupon.validFrom)}</Text>
          </View>
          {/* <View style={styles.statBox}>
            <Text style={styles.statLabel}>Usage Limit</Text>
            <Text style={styles.statValue}>{coupon.usageLimit || '—'}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Min. Purchase</Text>
            <Text style={styles.statValue}>{coupon.minPurchase ? `₹${coupon.minPurchase}` : '—'}</Text>
          </View> */}
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('BniAddNewCouponScreen', { coupon, isEdit: true })}
        >
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BniCouponDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  banner: {
    height: 200,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  bannerImage: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { padding: 20, paddingBottom: 60 },
  discountHeading: {
    fontFamily: FONTS.bold,
    fontSize: 26,
    color: COLORS.textDark,
    lineHeight: 30,
    marginBottom: 12,
  },
  discountBadge: {
    backgroundColor: '#00B341',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  discountBadgeText: { fontFamily: FONTS.semibold, fontSize: 12, color: COLORS.white },
  descriptionText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textGray,
    marginBottom: 16,
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 16,
  },
  code: { fontFamily: FONTS.bold, fontSize: 14, color: COLORS.textDark },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  copyText: { fontFamily: FONTS.semibold, fontSize: 12, color: COLORS.primary, marginLeft: 4 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  infoIcon: { marginRight: 8 },
  infoLine: { fontFamily: FONTS.medium, fontSize: 13, color: COLORS.textDark },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', marginTop: 16, marginBottom: 10 },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.textDark,
  },
  termRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginTop: 6,
    marginRight: 8,
  },
  termText: { flex: 1, fontFamily: FONTS.regular, fontSize: 12, color: COLORS.textGray, lineHeight: 18 },
  statsRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 10,
    marginRight: 8,
    alignItems: 'center',
  },
  statLabel: { fontFamily: FONTS.regular, fontSize: 10, color: COLORS.textGray },
  statValue: { fontFamily: FONTS.semibold, fontSize: 12, color: COLORS.textDark, marginTop: 4, textAlign: 'center' },
  editButton: {
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editText: { color: COLORS.white, fontFamily: FONTS.bold, fontSize: 15 },
});
