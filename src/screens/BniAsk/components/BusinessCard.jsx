import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../theme';

const BusinessCard = ({ business }) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.name}>{business.name}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{business.category}</Text>
        </View>
      </View>

      <View style={styles.locationRow}>
        <Feather name="map-pin" size={12} color={COLORS.textGray} />
        <Text style={styles.location}>{business.location}</Text>
      </View>

      <Text style={styles.description}>{business.description}</Text>

      <View style={styles.footerRow}>
        <Text style={styles.addedBy}>Added by <Text style={styles.addedByName}>{business.addedBy}</Text></Text>
        <View style={styles.phoneRow}>
          <Feather name="phone" size={12} color={COLORS.primary} />
          <Text style={styles.phone}>{business.phone}</Text>
        </View>
      </View>
    </View>
  );
};

export default BusinessCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  name: { fontFamily: FONTS.bold, fontSize: 15, color: COLORS.textDark, flex: 1, marginRight: 8 },
  categoryBadge: {
    backgroundColor: COLORS.warningBg,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  categoryText: { fontFamily: FONTS.semibold, fontSize: 9, color: COLORS.primary },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  location: { fontFamily: FONTS.regular, fontSize: 11, color: COLORS.textGray, marginLeft: 4 },
  description: { fontFamily: FONTS.regular, fontSize: 12, color: COLORS.textGray, marginTop: 8, lineHeight: 17 },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  addedBy: { fontFamily: FONTS.regular, fontSize: 11, color: COLORS.textLight },
  addedByName: { fontFamily: FONTS.semibold, color: COLORS.textGray },
  phoneRow: { flexDirection: 'row', alignItems: 'center' },
  phone: { fontFamily: FONTS.semibold, fontSize: 11, color: COLORS.primary, marginLeft: 4 },
});
