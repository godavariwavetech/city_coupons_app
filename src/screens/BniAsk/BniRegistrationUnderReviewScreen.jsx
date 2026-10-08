import React from 'react';
import { View, Text, Image, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from './theme';

const BniRegistrationUnderReviewScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.content}>
        <Image
          source={require('../../assets/waitingforapproval.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>Your Registration{'\n'}is Under Review</Text>
        <Text style={styles.subtitle}>
          Thank you for registering as a vendor.{'\n'}
          Your account is currently being reviewed{'\n'}
          by our admin team.
        </Text>

        <View style={styles.noticeBox}>
          <Feather name="alert-circle" size={16} color={COLORS.primary} />
          <Text style={styles.noticeText}>
            Please wait for approval before accessing your account.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('BniLoginScreen')}
        >
          <Text style={styles.backText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BniRegistrationUnderReviewScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 },
  image: {
    width: 220,
    height: 220,
    // marginBottom: 16,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textGray,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.warningBg,
    borderRadius: 10,
    padding: 14,
    marginBottom: 30,
  },
  noticeText: {
    flex: 1,
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.primaryDark,
    marginLeft: 8,
  },
  backButton: {
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  backText: { color: COLORS.white, fontFamily: FONTS.bold, fontSize: 14 },
});
