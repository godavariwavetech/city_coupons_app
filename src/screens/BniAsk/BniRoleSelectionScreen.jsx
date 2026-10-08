import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import BniLogo from './components/BniLogo';
import { COLORS, FONTS } from './theme';

const BniRoleSelectionScreen = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState('user');

  const handleContinue = () => {
    if (selectedRole === 'vendor') {
      navigation.navigate('BniVendorRegistrationScreen');
    } else {
      navigation.navigate('BniMainTabs');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.header}>
        <BniLogo size="small" />
      </View>

      <Text style={styles.title}>Vendor Registration</Text>

      <View style={styles.cardsRow}>
        <TouchableOpacity
          style={[styles.card, selectedRole === 'user' && styles.cardActive]}
          onPress={() => setSelectedRole('user')}
        >
          <Feather
            name="user"
            size={26}
            color={selectedRole === 'user' ? COLORS.primary : COLORS.textGray}
          />
          <Text style={[styles.cardTitle, selectedRole === 'user' && styles.cardTitleActive]}>
            User/ Customer
          </Text>
          <Text style={styles.cardSubtitle}>Find & redeem offers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, selectedRole === 'vendor' && styles.cardActive]}
          onPress={() => setSelectedRole('vendor')}
        >
          <Feather
            name="briefcase"
            size={26}
            color={selectedRole === 'vendor' ? COLORS.primary : COLORS.textGray}
          />
          <Text style={[styles.cardTitle, selectedRole === 'vendor' && styles.cardTitleActive]}>
            Business/ Vendor
          </Text>
          <Text style={styles.cardSubtitle}>Manage coupons & offers</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BniRoleSelectionScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 20 },
  header: { alignItems: 'center', paddingTop: 20, paddingBottom: 20 },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 24,
  },
  cardsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 24,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  cardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.warningBg,
  },
  cardTitle: {
    fontFamily: FONTS.semibold,
    fontSize: 14,
    color: COLORS.textDark,
    marginTop: 12,
    textAlign: 'center',
  },
  cardTitleActive: { color: COLORS.primary },
  cardSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    color: COLORS.textGray,
    marginTop: 6,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  continueText: { color: COLORS.white, fontFamily: FONTS.bold, fontSize: 16 },
});
