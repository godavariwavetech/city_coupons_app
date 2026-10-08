// import React, { useEffect } from 'react';
// import { View, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
// import { useSelector } from 'react-redux';
// import BniLogo from './components/BniLogo';
// import { COLORS } from './theme';

// const BniSplashScreen = ({ navigation }) => {
//   const { approvalStatus, userId, vendorId } = useSelector((state) => state.Auth);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (userId) {
//         navigation.replace('MainApp');
//       } else if (vendorId && approvalStatus === 0) {
//         navigation.replace('BniRegistrationUnderReviewScreen');
//       } else if (vendorId) {
//         navigation.replace('BniMainTabs');
//       } else {
//         navigation.replace('BniLoginScreen');
//       }
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, [navigation, approvalStatus, userId, vendorId]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
//       <View style={styles.center}>
//         <BniLogo size="large" />
//       </View>
//       <View style={styles.bottomBar} />
//     </SafeAreaView>
//   );
// };

// export default BniSplashScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.white },
//   center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
//   bottomBar: {
//     alignSelf: 'center',
//     width: 120,
//     height: 4,
//     borderRadius: 2,
//     backgroundColor: COLORS.textDark,
//     marginBottom: 10,
//   },
// });
import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import BniLogo from './components/BniLogo';
import { COLORS } from './theme';

const BniSplashScreen = ({ navigation }) => {
  const { approvalStatus, userId, vendorId } = useSelector((state) => state.Auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userId) {
        navigation.replace('MainApp');
      } else if (vendorId && approvalStatus === 0) {
        navigation.replace('BniRegistrationUnderReviewScreen');
      } else if (vendorId) {
        navigation.replace('BniMainTabs');
      } else {
        navigation.replace('BniLoginScreen');
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation, approvalStatus, userId, vendorId]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <View style={styles.center}>
        <BniLogo size="large" />
      </View>
      <View style={styles.bottomBar} />
    </SafeAreaView>
  );
};

export default BniSplashScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bottomBar: {
    alignSelf: 'center',
    width: 120,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.textDark,
    marginBottom: 10,
  },
});