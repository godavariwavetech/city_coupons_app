import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../theme';

const TABS = [
  { key: 'Home', label: 'Home', icon: 'home' },
  { key: 'MyCoupons', label: 'My Coupons', icon: 'gift' },
  { key: 'BniConnections', label: 'BNI Connections', icon: 'users' },
  { key: 'Profile', label: 'Profile', icon: 'user' },
];

const BniBottomTabs = ({ active, onPress }) => {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = active === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => onPress && onPress(tab.key)}
          >
            <Feather
              name={tab.icon}
              size={22}
              color={isActive ? COLORS.primary : COLORS.textLight}
            />
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
            {isActive && <View style={styles.indicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BniBottomTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
    paddingTop: 8,
    paddingBottom: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    fontFamily: FONTS.medium,
    color: COLORS.textLight,
    marginTop: 4,
    textAlign: 'center',
  },
  labelActive: {
    color: COLORS.primary,
    fontFamily: FONTS.semibold,
  },
  indicator: {
    marginTop: 4,
    width: 18,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
  },
});
