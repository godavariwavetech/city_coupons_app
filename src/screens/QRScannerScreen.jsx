// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   SafeAreaView,Modal
// } from 'react-native';

// const QRScannerScreen = ({ navigation }) => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
//       <View style={styles.content}>
//         {/* Logo */}
//         <Image
//           source={require('../assets/icon2.png')} // Add your logo image
//           style={styles.logo}
//           resizeMode="contain"
//         />

//         {/* Scan Text */}
//         <Text style={styles.scanText}>Scan the Registration QR</Text>

//         {/* QR Code Container */}
//         <View style={styles.qrContainer}>
//           <Image
//             source={require('../assets/qr-code.png')} // Add your QR code image
//             style={styles.qrImage}
//             resizeMode="contain"
//           />
//         </View>

//         {/* Enter Manually Button */}
//         <TouchableOpacity
//           style={styles.manualButton}
//           onPress={() => navigation.navigate('RegisterManuallyScreen')}
//         >
//           <Text style={styles.manualButtonText}>Enter Manually</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   content: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   logo: {
//     width: 220,
//     height: 150,
//     marginBottom: 40,
//   },
//   scanText: {
//     fontSize: 16,
//     color: '#333333',
//     marginBottom: 20,
//     fontWeight: '400',
//   },
//   qrContainer: {
//     width: 200,
//     height: 200,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 15,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//     marginBottom: 40,
//   },
//   qrImage: {
//     width: '100%',
//     height: '100%',
//   },
//   manualButton: {
//     paddingVertical: 5,
//   },
//   manualButtonText: {
//     fontSize: 15,
//     color: '#333333',
//     textDecorationLine: 'underline',
//     fontWeight: '400',
//   },
// });

// export default QRScannerScreen;
// QRScannerScreen.js
// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Linking,
//   Alert,
// } from 'react-native';
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-camera';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const QRScannerScreen = ({ route, navigation }) => {
//   const { coupon } = route.params || {};

//   const onSuccess = (e) => {
//     const scannedData = e.data.trim();

//     // Optional: Validate that the scanned QR matches your expected format
//     if (scannedData.includes(coupon.id || 'your-coupon-id')) {
//       Alert.alert(
//         'Success!',
//         'Coupon redeemed successfully!',
//         [{ text: 'OK', onPress: () => navigation.goBack() }]
//       );
//     } else {
//       Alert.alert('Invalid QR Code', 'This QR code is not valid for this offer.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <QRCodeScanner
//         onRead={onSuccess}
//         flashMode={RNCamera.Constants.FlashMode.auto}
//         reactivate={true}
//         reactivateTimeout={3000}
//         showMarker={true}
//         markerStyle={styles.marker}
//         topContent={
//           <View style={styles.topContent}>
//             <Text style={styles.title}>Scan QR Code at Cafe</Text>
//             <Text style={styles.subtitle}>
//               Present this screen to {coupon?.vendorName || 'the vendor'}
//             </Text>
//           </View>
//         }
//         bottomContent={
//           <TouchableOpacity
//             style={styles.cancelButton}
//             onPress={() => navigation.goBack()}
//           >
//             <MaterialIcons name="close" size={28} color="#fff" />
//             <Text style={styles.cancelText}>Cancel</Text>
//           </TouchableOpacity>
//         }
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000' },
//   topContent: { padding: 20, alignItems: 'center' },
//   title: { fontSize: 20, color: '#fff', fontWeight: 'bold', marginBottom: 8 },
//   subtitle: { fontSize: 15, color: '#ddd', textAlign: 'center' },
//   marker: { borderColor: '#0F172A', borderWidth: 3 },
//   cancelButton: {
//     flexDirection: 'row',
//     backgroundColor: 'rgba(255,0,0,0.7)',
//     paddingHorizontal: 30,
//     paddingVertical: 14,
//     borderRadius: 30,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   cancelText: { color: '#fff', fontSize: 18, marginLeft: 8, fontWeight: '600' },
// });

// export default QRScannerScreen;
// above i have coupon id condition 
// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Vibration,
// } from 'react-native';
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-camera';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const QRScannerScreen1 = ({ route, navigation }) => {
//   const { coupon } = route.params || {};

//   const onSuccess = (e) => {
//     Vibration.vibrate(200);

//     Alert.alert(
//       'Success!',
//       `Coupon redeemed!\n\nScanned: ${e.data}`,
//       [{ text: 'OK', onPress: () => navigation.goBack() }]
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <QRCodeScanner
//         onRead={onSuccess}
//         flashMode={RNCamera.Constants.FlashMode.auto}
//         reactivate={true}
//         reactivateTimeout={2000}
//         showMarker={true}
//         markerStyle={styles.marker}
//         cameraStyle={{ height: '100%' }}

//         // WRAP IN VIEW – THIS FIXES THE ERROR
//         topContent={
//           <View style={styles.topContent}>
//             <Text style={styles.title}>Scan Any QR Code</Text>
//             <Text style={styles.subtitle}>Testing Mode – Every QR = Success!</Text>
//             {coupon?.vendorName && (
//               <Text style={styles.vendorText}>For: {coupon.vendorName}</Text>
//             )}
//           </View>
//         }

//         // WRAP IN VIEW – THIS FIXES THE ERROR
//         bottomContent={
//           <View style={styles.bottomWrapper}>
//             <TouchableOpacity
//               style={styles.cancelButton}
//               onPress={() => navigation.goBack()}
//             >
//               <MaterialIcons name="close" size={28} color="#fff" />
//               <Text style={styles.cancelText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         }
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000' },

//   topContent: {
//     padding: 24,
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.75)',
//   },
//   title: {
//     fontSize: 22,
//     color: '#4CAF50',
//     fontWeight: 'bold',
//     marginBottom: 6,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#4CAF50',
//     textAlign: 'center',
//     fontWeight: '600',
//   },
//   vendorText: {
//     fontSize: 15,
//     color: '#fff',
//     marginTop: 12,
//   },

//   bottomWrapper: {
//     alignItems: 'center',
//     padding: 20,
//   },
//   cancelButton: {
//     flexDirection: 'row',
//     backgroundColor: 'rgba(255,0,0,0.8)',
//     paddingHorizontal: 32,
//     paddingVertical: 16,
//     borderRadius: 30,
//     alignItems: 'center',
//   },
//   cancelText: {
//     color: '#fff',
//     fontSize: 18,
//     marginLeft: 10,
//     fontWeight: '600',
//   },

//   marker: {
//     borderColor: '#4CAF50',
//     borderWidth: 4,
//     borderRadius: 16,
//   },
// });

// export default QRScannerScreen1
// above code have coupon id match condition with no modfal 
// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Modal,
//   Animated,
//   Vibration,
// } from 'react-native';

// // THIS LINE WAS CAUSING THE CRASH — DELETE IT COMPLETELY
// // import { RNCamera } from 'react-native-camera';   ← DELETE THIS

// import QRCodeScanner from 'react-native-qrcode-scanner';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import ConfettiCannon from 'react-native-confetti-cannon';

// const QRScannerScreen = ({ route, navigation }) => {
//   const { coupon } = route.params || {};
//   const [showSuccess, setShowSuccess] = useState(false);
//   const scaleAnim = useRef(new Animated.Value(0)).current;
//   const startAnimation = () => {
//     Animated.spring(scaleAnim, {
//       toValue: 1,
//       friction: 5,
//       tension: 100,
//       useNativeDriver: true,
//     }).start();
//   };

//   const onSuccess = (e) => {
//     Vibration.vibrate(200);
//     setShowSuccess(true);
//     startAnimation();

//     setTimeout(() => {
//       setShowSuccess(false);
//       scaleAnim.setValue(0);
//       navigation.goBack();
//     }, 2800);
//   };

//   return (
//     <View style={styles.container}>
//       <QRCodeScanner
//         onRead={onSuccess}
//         flashMode="auto"                    // ← Changed from RNCamera.Constants
//         reactivate={true}
//         reactivateTimeout={2500}
//         showMarker={true}
//         markerStyle={styles.marker}
//         cameraStyle={{ height: '100%' }}
//         topContent={
//           <View style={styles.topContent}>
//             <Text style={styles.title}>Scan QR Code</Text>
//             <Text style={styles.subtitle}>Align code within frame</Text>
//             {coupon?.vendorName && (
//               <Text style={styles.vendorText}>For: {coupon.vendorName}</Text>
//             )}
//           </View>
//         }
//         bottomContent={
//           <View style={styles.bottomWrapper}>
//             <TouchableOpacity
//               style={styles.cancelButton}
//               onPress={() => navigation.goBack()}
//             >
//               <MaterialIcons name="close" size={28} color="#fff" />
//               <Text style={styles.cancelText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         }
//       />

//       {/* SUCCESS MODAL WITH CONFETTI */}
//       <Modal visible={showSuccess} transparent>
//         <View style={styles.modalOverlay}>
//           <ConfettiCannon count={120} origin={{ x: -10, y: 0 }} fadeOut={true} />

//           <Animated.View
//             style={[
//               styles.successCard,
//               { transform: [{ scale: scaleAnim }] },
//             ]}
//           >
//             <MaterialIcons name="verified" size={80} color="#4CAF50" />
//             <Text style={styles.successTitle}>Coupon Applied!</Text>
//             <Text style={styles.amountText}>
//               {coupon?.discountValue || coupon?.title || '₹200 OFF'}
//             </Text>
//             <Text style={styles.savedText}>
//               Saved on {coupon?.vendorName || 'your purchase'}!
//             </Text>
//           </Animated.View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000' },
//   topContent: {
//     padding: 24,
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.75)',
//   },
//   title: { fontSize: 22, color: '#4CAF50', fontWeight: 'bold', marginBottom: 6 },
//   subtitle: { fontSize: 16, color: '#fff', textAlign: 'center' },
//   vendorText: { fontSize: 15, color: '#fff', marginTop: 12, fontWeight: '600' },
//   bottomWrapper: { alignItems: 'center', padding: 20 },
//   cancelButton: {
//     flexDirection: 'row',
//     backgroundColor: 'rgba(255,0,0,0.8)',
//     paddingHorizontal: 32,
//     paddingVertical: 16,
//     borderRadius: 30,
//     alignItems: 'center',
//   },
//   cancelText: { color: '#fff', fontSize: 18, marginLeft: 10, fontWeight: '600' },
//   marker: { borderColor: '#4CAF50', borderWidth: 4, borderRadius: 16 },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.9)',
//   },
//   successCard: {
//     width: 310,
//     padding: 32,
//     backgroundColor: '#fff',
//     borderRadius: 28,
//     alignItems: 'center',
//     elevation: 20,
//   },
//   successTitle: { fontSize: 26, fontWeight: 'bold', color: '#333', marginTop: 16 },
//   amountText: { fontSize: 44, fontWeight: 'bold', color: '#4CAF50', marginVertical: 12 },
//   savedText: { fontSize: 18, color: '#555', textAlign: 'center' },
// });

// export default QRScannerScreen;
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Vibration,
  Alert,
} from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ConfettiCannon from 'react-native-confetti-cannon';
import { recordCouponUsage } from '../redux/reducers/auth';
const QRScannerScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { coupon } = route.params || {};
  const [showSuccess, setShowSuccess] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
const { userId } = useSelector((state) => state.Auth);
  const startAnimation = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const validateScannedId = (rawData) => {
    let scannedId = rawData?.trim();

    if (!coupon?.couponId) {
      console.log('❌ No coupon.couponId found');
      return false;
    }

    const isMatch = String(scannedId) === String(coupon.couponId);
    console.log(`✅ Comparing QR:"${scannedId}" vs CouponID:"${coupon.couponId}" = ${isMatch}`);
    
    return isMatch;
  };

  // const onSuccess = (e) => {
  //   console.log('🔍 DEBUG - Raw QR data:', e?.data);
  //   console.log('🔍 DEBUG - Coupon object:', coupon);
  //   console.log('🔍 DEBUG - Coupon couponId:', coupon?.couponId);

  //   const rawData = e?.data;
  //   const isValid = validateScannedId(rawData);

  //   if (!isValid) {
  //     Vibration.vibrate(150);
  //     Alert.alert(
  //       'Invalid QR', 
  //       `QR: "${rawData}"\nExpected: "${coupon?.couponId}"`,
  //       [{ text: 'OK' }]
  //     );
  //     return;
  //   }

  //   // Valid coupon - show success
  //   Vibration.vibrate(200);
  //   setShowSuccess(true);
  //   startAnimation();

  //   setTimeout(() => {
  //     setShowSuccess(false);
  //     scaleAnim.setValue(0);
      
  //     // ✅ CHANGED: Navigate to MyCouponHistory instead of goBack()
  //     navigation.reset({
  //       index: 0,
  //       routes: [{ name: 'MyCouponHistory', params: { coupon } }]
  //     });
  //   }, 2800);
  // };
const onSuccess = async (e) => {
  console.log('🔍 DEBUG - Raw QR data:', e?.data);
  console.log('🔍 DEBUG - Coupon object:', coupon);
  console.log('🔍 DEBUG - Coupon couponId:', coupon?.couponId);

  const rawData = e?.data;
  const isValid = validateScannedId(rawData);

  if (!isValid) {
    Vibration.vibrate(150);
  Alert.alert(
  'Invalid QR Code',
  'The scanned QR code does not match this offer.\n\nPlease scan the correct QR code displayed at the store for this coupon.',
  [
    {
      text: 'OK',
      style: 'cancel',
    },
  ]
);
    return;
  }

  // Valid QR → Show success animation
  Vibration.vibrate(200);
  setShowSuccess(true);
  startAnimation();

  // Send usage to backend
  if (userId) {  // ✅ Check userId exists
    try {
      const result = await dispatch(recordCouponUsage({
        userId: userId,
        couponId: coupon.couponId,
        couponType:coupon.couponType,
        rewardPoints:coupon.rewardPoints
      })).unwrap();

      console.log('✅ Coupon usage recorded:', result);
    } catch (err) {
      console.error('❌ Failed to record coupon usage:', err);
      // Don't block navigation on API failure
      Alert.alert('Notice', `Coupon applied locally!\n${err}`);
    }
  } else {
    console.warn('⚠️ No userId - skipping coupon usage recording');
  }

  // Navigate after animation (regardless of API success)
  setTimeout(() => {
    setShowSuccess(false);
    scaleAnim.setValue(0);
    
    // ✅ FIXED NAVIGATION for TabNavigator
    navigation.navigate('TabNavigator', {  // Replace 'Tabs' with your TabNavigator name
      screen: 'MyCouponHistory',
      params: {
        coupon: {
          ...coupon,
          scannedAt: new Date().toISOString(),
          usageRecorded: !!userId,  // true if userId existed
        },
      }
    });
  }, 2800);
};


  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={onSuccess}
        flashMode="auto"
        reactivate={true}
        reactivateTimeout={2500}
        showMarker={true}
        markerStyle={styles.marker}
        cameraStyle={{ height: '100%' }}
        topContent={
          <View style={styles.topContent}>
            <Text style={styles.title}>Scan QR Code</Text>
            <Text style={styles.subtitle}>Align code within frame</Text>
            {coupon?.vendorName && (
              <Text style={styles.vendorText}>For: {coupon.vendorName}</Text>
            )}
            {/* DEBUG: Show expected ID - Remove in production */}
            <Text style={[styles.vendorText, { fontSize: 12, color: '#ffeb3b' }]}>
              Expected ID: {coupon?.couponId}
            </Text>
          </View>
        }
        bottomContent={
          <View style={styles.bottomWrapper}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons name="close" size={28} color="#fff" />
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        }
      />

      <Modal visible={showSuccess} transparent>
        <View style={styles.modalOverlay}>
          <ConfettiCannon count={120} origin={{ x: -10, y: 0 }} fadeOut />

          <Animated.View
            style={[
              styles.successCard,
              { transform: [{ scale: scaleAnim }] },
            ]}
          >
            <MaterialIcons name="verified" size={80} color="#4CAF50" />
            <Text style={styles.successTitle}>Coupon Applied!</Text>
            <Text style={styles.amountText}>
              {coupon?.discountValue || coupon?.title || '₹200 OFF'}
            </Text>
            <Text style={styles.savedText}>
              Saved on {coupon?.vendorName || 'your purchase'}!
            </Text>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  topContent: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  title: { fontSize: 22, color: '#4CAF50', fontWeight: 'bold', marginBottom: 6 },
  subtitle: { fontSize: 16, color: '#fff', textAlign: 'center' },
  vendorText: { fontSize: 15, color: '#fff', marginTop: 12, fontWeight: '600' },
  bottomWrapper: { alignItems: 'center', padding: 20 },
  cancelButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,0,0,0.8)',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  cancelText: { color: '#fff', fontSize: 18, marginLeft: 10, fontWeight: '600' },
  marker: { borderColor: '#4CAF50', borderWidth: 4, borderRadius: 16 },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  successCard: {
    width: 310,
    padding: 32,
    backgroundColor: '#fff',
    borderRadius: 28,
    alignItems: 'center',
    elevation: 20,
  },
  successTitle: { fontSize: 26, fontWeight: 'bold', color: '#333', marginTop: 16 },
  amountText: { fontSize: 44, fontWeight: 'bold', color: '#4CAF50', marginVertical: 12 },
  savedText: { fontSize: 18, color: '#555', textAlign: 'center' },
});

export default QRScannerScreen;


// above code can scan any qr show modal 

