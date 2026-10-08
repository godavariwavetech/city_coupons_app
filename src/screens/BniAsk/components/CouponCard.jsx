import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../theme';

const CouponCard = ({ coupon, onViewMore }) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Feather name="coffee" size={22} color={COLORS.primary} />
      </View>
      <View style={styles.info}>
        <Text style={styles.code} numberOfLines={1}>{coupon.code}</Text>
        <Text style={styles.title} numberOfLines={1}>{coupon.title}</Text>
        <Text style={styles.expiry}>Expires on {coupon.expiry}</Text>
      </View>
      <TouchableOpacity style={styles.viewMore} onPress={() => onViewMore && onViewMore(coupon)}>
        <Text style={styles.viewMoreText}>View{'\n'}More</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CouponCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: COLORS.white,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: COLORS.warningBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  info: { flex: 1 },
  code: { fontFamily: FONTS.semibold, fontSize: 11, color: COLORS.textGray },
  title: { fontFamily: FONTS.bold, fontSize: 14, color: COLORS.textDark, marginTop: 2 },
  expiry: { fontFamily: FONTS.regular, fontSize: 11, color: COLORS.textLight, marginTop: 4 },
  viewMore: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  viewMoreText: {
    fontFamily: FONTS.semibold,
    fontSize: 10,
    color: COLORS.primary,
    textAlign: 'center',
  },
});
