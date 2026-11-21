// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   ScrollView,
//   Platform,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import BniLogo from './components/BniLogo';
// import { COLORS, FONTS } from './theme';
// import { requestVendorLoginOtp } from '../../redux/reducers/auth';

// const role = 'vendor';

// const BniLoginScreen = ({ navigation }) => {
//   const [phone, setPhone] = useState('');
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.Auth);

//   const handleLogin = async () => {
//     if (!phone || phone.replace(/\D/g, '').length !== 10) {
//       Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
//       return;
//     }

//     const resultAction = await dispatch(requestVendorLoginOtp(phone));

//     if (requestVendorLoginOtp.fulfilled.match(resultAction)) {
//       if (resultAction.payload?.approvalStatus === 0) {
//         navigation.navigate('BniRegistrationUnderReviewScreen');
//         return;
//       }
//       navigation.navigate('BniOtpVerificationScreen', { role, mobile: phone });
//     } else {
//       const errorMsg = resultAction.payload || 'Failed to send OTP';
//       const isNotRegistered = /not\s*regist/i.test(errorMsg);
//       const isPendingApproval = /pending|not\s*approv|under\s*review/i.test(errorMsg);

//       if (isNotRegistered) {
//         Alert.alert('Vendor Not Registered', errorMsg, [
//           { text: 'Cancel', style: 'cancel' },
//           {
//             text: 'Register',
//             onPress: () => navigation.navigate('BniVendorRegistrationScreen', { role, mobile: phone }),
//           },
//         ]);
//       } else if (isPendingApproval) {
//         navigation.navigate('BniRegistrationUnderReviewScreen');
//       } else {
//         Alert.alert('Error', errorMsg);
//       }
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
//       <KeyboardAvoidingView
//         style={styles.flex}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
//       >
//         <ScrollView
//           contentContainerStyle={styles.inner}
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator={false}
//         >
//           <Text style={styles.welcome}>Welcome to</Text>
//           <BniLogo size="large" />

//           <View style={styles.inputContainer}>
//             <Text style={styles.countryCode}>+91</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Phone number"
//               placeholderTextColor={COLORS.textLight}
//               keyboardType="number-pad"
//               maxLength={10}
//               value={phone}
//               onChangeText={setPhone}
//             />
//           </View>

//           <TouchableOpacity
//             style={[styles.loginButton, loading && { opacity: 0.7 }]}
//             onPress={handleLogin}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator color={COLORS.white} />
//             ) : (
//               <Text style={styles.loginText}>Login</Text>
//             )}
//           </TouchableOpacity>

//           {/* <TouchableOpacity
//             onPress={() => navigation.navigate('BniVendorRegistrationScreen', { role, mobile: phone })}
//           >
//             <Text style={styles.newUser}>New User?</Text>
//           </TouchableOpacity> */}
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default BniLoginScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.white },
//   flex: { flex: 1 },
//   inner: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
//   welcome: {
//     fontFamily: FONTS.medium,
//     fontSize: 16,
//     color: COLORS.textGray,
//     // marginBottom: 8,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: COLORS.inputBg,
//     width: '100%',
//     borderRadius: 30,
//     paddingHorizontal: 20,
//     height: 52,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     // marginTop: 40,
//     marginBottom: 20,
//   },
//   countryCode: {
//     fontFamily: FONTS.medium,
//     fontSize: 16,
//     color: COLORS.textDark,
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     fontFamily: FONTS.medium,
//     fontSize: 16,
//     color: COLORS.textDark,
//   },
//   loginButton: {
//     backgroundColor: COLORS.primary,
//     width: '100%',
//     height: 50,
//     borderRadius: 25,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 16,
//   },
//   loginText: {
//     color: COLORS.white,
//     fontFamily: FONTS.bold,
//     fontSize: 16,
//   },
//   newUser: {
//     fontFamily: FONTS.semibold,
//     fontSize: 14,
//     color: COLORS.primary,
//   },
// });
import React, { useState } from 'react';
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
import Feather from 'react-native-vector-icons/Feather';
import BniLogo from './components/BniLogo';
import { COLORS, FONTS } from './theme';
import { requestLoginOtp, requestVendorLoginOtp } from '../../redux/reducers/auth';

const BniLoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('user');
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.Auth);

  const handleLogin = async () => {
    if (!phone || phone.replace(/\D/g, '').length !== 10) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
      return;
    }

    const action = role === 'vendor' ? requestVendorLoginOtp(phone) : requestLoginOtp(phone);
    const resultAction = await dispatch(action);

    const isFulfilled =
      role === 'vendor'
        ? requestVendorLoginOtp.fulfilled.match(resultAction)
        : requestLoginOtp.fulfilled.match(resultAction);

    if (isFulfilled) {
      if (role === 'vendor' && resultAction.payload?.approvalStatus === 0) {
        navigation.navigate('BniRegistrationUnderReviewScreen');
        return;
      }
      if (role === 'user' && Number(resultAction.payload?.user_ind) === 0) {
        Alert.alert(
          'Not Registered',
          resultAction.payload?.message || 'You have not registered yet.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Register',
              onPress: () => navigation.navigate('BniVendorRegistrationScreen', { role, mobile: phone }),
            },
          ]
        );
        return;
      }
      navigation.navigate('BniOtpVerificationScreen', { role, mobile: phone });
    } else {
      const errorMsg = resultAction.payload || 'Failed to send OTP';
      const isNotRegistered = /not\s*regist/i.test(errorMsg);
      const isPendingApproval = /pending|not\s*approv|under\s*review/i.test(errorMsg);

      if (role === 'vendor' && isNotRegistered) {
        Alert.alert('Vendor Not Registered', errorMsg, [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Register',
            onPress: () => navigation.navigate('BniVendorRegistrationScreen', { role, mobile: phone }),
          },
        ]);
      } else if (role === 'vendor' && isPendingApproval) {
        navigation.navigate('BniRegistrationUnderReviewScreen');
      } else {
        Alert.alert('Error', errorMsg);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.inner}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.welcome}>Welcome to</Text>
          <BniLogo size="large" />

          <View style={styles.roleRow}>
            <TouchableOpacity
              style={[styles.roleCard, role === 'user' && styles.roleCardActive]}
              onPress={() => setRole('user')}
              activeOpacity={0.8}
            >
              <View style={[styles.roleIconBox, role === 'user' && styles.roleIconBoxActive]}>
                <Feather
                  name="user"
                  size={16}
                  color={role === 'user' ? COLORS.white : COLORS.textGray}
                />
              </View>
              <Text style={[styles.roleTitle, role === 'user' && styles.roleTitleActive]}>
                User
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.roleCard, role === 'vendor' && styles.roleCardActive]}
              onPress={() => setRole('vendor')}
              activeOpacity={0.8}
            >
              <View style={[styles.roleIconBox, role === 'vendor' && styles.roleIconBoxActive]}>
                <Feather
                  name="briefcase"
                  size={16}
                  color={role === 'vendor' ? COLORS.white : COLORS.textGray}
                />
              </View>
              <Text style={[styles.roleTitle, role === 'vendor' && styles.roleTitleActive]}>
                Vendor
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone number"
              placeholderTextColor={COLORS.textLight}
              keyboardType="number-pad"
              maxLength={10}
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <TouchableOpacity
            style={[styles.loginButton, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.loginText}>Login</Text>
            )}
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => navigation.navigate('BniVendorRegistrationScreen', { role, mobile: phone })}
          >
            <Text style={styles.newUser}>New User?</Text>
          </TouchableOpacity> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BniLoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  flex: { flex: 1 },
  inner: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  welcome: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: COLORS.textGray,
    // marginBottom: 8,
  },
  roleRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 24,
    marginBottom: 20,
  },
  roleCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 12,
    marginHorizontal: 6,
    backgroundColor: COLORS.inputBg,
  },
  roleCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.warningBg,
  },
  roleIconBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  roleIconBoxActive: { backgroundColor: COLORS.primary },
  roleTitle: {
    fontFamily: FONTS.semibold,
    fontSize: 14,
    color: COLORS.textDark,
  },
  roleTitleActive: { color: COLORS.primary },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    width: '100%',
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.border,
    // marginTop: 40,
    marginBottom: 20,
  },
  countryCode: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: COLORS.textDark,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: COLORS.textDark,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    width: '100%',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  loginText: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 16,
  },
  newUser: {
    fontFamily: FONTS.semibold,
    fontSize: 14,
    color: COLORS.primary,
  },
});