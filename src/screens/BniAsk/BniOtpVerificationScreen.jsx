import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BniLogo from './components/BniLogo';
import { COLORS, FONTS } from './theme';
import {
  requestLoginOtp,
  requestVendorLoginOtp,
  verifyLoginOtp,
  verifyVendorLoginOtp,
} from '../../redux/reducers/auth';

// react-native-otp-verify (SMS Retriever) is Android-only. It has no iOS native
// module, and importing it on iOS throws while building its NativeEventEmitter,
// so only load it on Android and use no-op stand-ins on iOS.
const { useOtpVerify, getHash } =
  Platform.OS === 'android'
    ? require('react-native-otp-verify')
    : { useOtpVerify: () => ({ otp: null }), getHash: () => Promise.resolve([]) };

const BniOtpVerificationScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const role = route?.params?.role || 'user';
  const mobile = route?.params?.mobile || '';
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.Auth);

  const otpValue = otp.join('');
  const submittedOtp = useRef('');

  // Listen for the incoming SMS via the Android SMS Retriever API and
  // auto-fill the OTP boxes as soon as it arrives (Platform.OS === 'android' only;
  // the hook no-ops on iOS).
  const { otp: smsOtp } = useOtpVerify({ numberOfDigits: 4 });

  useEffect(() => {
    if (smsOtp) {
      setOtp(smsOtp.split('').slice(0, 4));
    }
  }, [smsOtp]);

  // Log the app signature hash the backend must append to the OTP SMS text
  // for the SMS Retriever API to detect it (see console for the value).
  useEffect(() => {
    getHash()
      .then((hash) => console.log('[SMS Retriever] app hash:', hash))
      .catch((err) => console.log('[SMS Retriever] getHash error:', err));
  }, []);

  // Auto-submit once the OTP is filled (typed, pasted, or autofilled from SMS)
  useEffect(() => {
    if (otpValue.length === 4 && !loading && submittedOtp.current !== otpValue) {
      submittedOtp.current = otpValue;
      handleVerify();
    }
    if (otpValue.length < 4) submittedOtp.current = '';
  }, [otpValue]);

  const handleChange = (text, index) => {
    const digits = text.replace(/\D/g, '');

    if (digits.length > 1) {
      // Handles a full code being pasted or autofilled into a single box
      const newOtp = ['', '', '', ''];
      digits.slice(0, 4).split('').forEach((d, i) => {
        newOtp[i] = d;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(digits.length, 3);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = digits;
    setOtp(newOtp);

    if (digits && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    if (otpValue.length !== 4) {
      Alert.alert('Invalid OTP', 'Please enter the 4-digit code.');
      return;
    }

    const action =
      role === 'vendor'
        ? verifyVendorLoginOtp({ mobile, otp: otpValue })
        : verifyLoginOtp({ mobile, otp: otpValue });
    const resultAction = await dispatch(action);

    const isFulfilled =
      role === 'vendor'
        ? verifyVendorLoginOtp.fulfilled.match(resultAction)
        : verifyLoginOtp.fulfilled.match(resultAction);

    if (isFulfilled) {
      navigation.reset({
        index: 0,
        routes: [{ name: role === 'vendor' ? 'BniMainTabs' : 'MainApp' }],
      });
    } else {
      Alert.alert('Error', resultAction.payload || 'Invalid or expired OTP');
    }
  };

  const handleResend = async () => {
    const action = role === 'vendor' ? requestVendorLoginOtp(mobile) : requestLoginOtp(mobile);
    const resultAction = await dispatch(action);

    const isFulfilled =
      role === 'vendor'
        ? requestVendorLoginOtp.fulfilled.match(resultAction)
        : requestLoginOtp.fulfilled.match(resultAction);

    if (isFulfilled) {
      Alert.alert('OTP Sent', 'A new code has been sent.');
    } else {
      Alert.alert('Error', resultAction.payload || 'Failed to resend OTP');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <BniLogo size="small" />

          <Text style={styles.title}>Enter verification code</Text>
          <Text style={styles.subtitle}>
            A code has been sent to <Text style={styles.phone}>+91 {mobile}</Text>
          </Text>

          <View style={styles.otpRow}>
            {[0, 1, 2, 3].map((i) => (
              <TextInput
                key={i}
                ref={(ref) => (inputRefs.current[i] = ref)}
                style={[styles.otpBox, otp[i] && styles.otpBoxActive]}
                value={otp[i]}
                onChangeText={(text) => handleChange(text, i)}
                onKeyPress={(e) => handleKeyPress(e, i)}
                keyboardType="number-pad"
                maxLength={i === 0 ? 4 : 1}
                textContentType="oneTimeCode"
                autoComplete="sms-otp"
                importantForAutofill="yes"
                autoFocus={i === 0}
              />
            ))}
          </View>

          <View style={styles.resendRow}>
            <Text style={styles.resendText}>Don't receive a code? </Text>
            <TouchableOpacity onPress={handleResend} disabled={loading}>
              <Text style={styles.resendLink}>Resend</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.verifyButton, loading && { opacity: 0.7 }]}
            onPress={handleVerify}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.verifyText}>Verify</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BniOtpVerificationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  flex: { flex: 1 },
  content: { flexGrow: 1, paddingHorizontal: 24, alignItems: 'center', justifyContent: 'center' },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.textDark,
    marginTop: 10,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textGray,
    marginTop: 8,
    textAlign: 'center',
  },
  phone: { fontFamily: FONTS.semibold, color: COLORS.textDark },
  otpRow: {
    flexDirection: 'row',
    marginTop: 24,
    marginBottom: 16,
  },
  otpBox: {
    width: 50,
    height: 56,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.inputBg,
    textAlign: 'center',
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.textDark,
    marginHorizontal: 6,
  },
  otpBoxActive: { borderColor: COLORS.primary },
  resendRow: { flexDirection: 'row', marginBottom: 20 },
  resendText: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.textGray },
  resendLink: { fontFamily: FONTS.semibold, fontSize: 13, color: COLORS.primary },
  verifyButton: {
    backgroundColor: COLORS.primary,
    width: '100%',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyText: { color: COLORS.white, fontFamily: FONTS.bold, fontSize: 16 },
});
