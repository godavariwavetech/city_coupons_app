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
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Vibration,
  Alert,
  AppState,
  Linking,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch,useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
// CameraX (Android) / AVFoundation (iOS) based scanner. Replaces react-native-camera,
// whose deprecated Camera1 preview stayed black on many devices (Oppo F27, Moto G, Poco M4).
import { Camera, CameraType } from 'react-native-camera-kit';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ConfettiCannon from 'react-native-confetti-cannon';
import { recordCouponUsage } from '../redux/reducers/auth';

const CAMERA_PERMISSION = Platform.select({
  ios: PERMISSIONS.IOS.CAMERA,
  android: PERMISSIONS.ANDROID.CAMERA,
});

const QRScannerScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { coupon } = route.params || {};
  const [showSuccess, setShowSuccess] = useState(false);
  // 'checking' | 'granted' | 'denied' | 'blocked'
  const [permission, setPermission] = useState('checking');
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const processing = useRef(false); // blocks repeat onReadCode callbacks while a scan is being handled
const { userId } = useSelector((state) => state.Auth);

  const resolvePermission = useCallback(async (ask) => {
    try {
      let status = await check(CAMERA_PERMISSION);
      if (ask && (status === RESULTS.DENIED)) {
        status = await request(CAMERA_PERMISSION);
      }
      if (status === RESULTS.GRANTED || status === RESULTS.LIMITED) {
        setPermission('granted');
      } else if (status === RESULTS.BLOCKED || status === RESULTS.UNAVAILABLE) {
        setPermission('blocked');
      } else {
        setPermission('denied');
      }
    } catch (err) {
      console.error('Camera permission error:', err);
      setPermission('denied');
    }
  }, []);

  useEffect(() => {
    resolvePermission(true);
  }, [resolvePermission]);

  // Re-check when the user comes back from the app's system settings
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') resolvePermission(false);
    });
    return () => sub.remove();
  }, [resolvePermission]);

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

    if (!coupon?.vendorId) {
      console.log('❌ No coupon.vendorId found');
      return false;
    }

    const isMatch = String(scannedId) === String(coupon.vendorId);
    console.log(`✅ Comparing QR:"${scannedId}" vs VendorID:"${coupon.vendorId}" = ${isMatch}`);

    return isMatch;
  };

const onSuccess = async (rawData) => {
  if (processing.current) return;
  processing.current = true;

  console.log('🔍 DEBUG - Raw QR data:', rawData);
  console.log('🔍 DEBUG - Coupon vendorId:', coupon?.vendorId);

  const isValid = validateScannedId(rawData);

  if (!isValid) {
    Vibration.vibrate(150);
    // Resume scanning shortly after the alert closes (same pause the old scanner's reactivateTimeout gave)
    const resume = () => setTimeout(() => { processing.current = false; }, 1500);
  Alert.alert(
  'Invalid QR Code',
  'The scanned QR code does not match this offer.\n\nPlease scan the correct QR code displayed at the store for this coupon.',
  [
    {
      text: 'OK',
      style: 'cancel',
      onPress: resume,
    },
  ],
  { onDismiss: resume }
);
    return;
  }

  // Valid QR → Show success animation
  Vibration.vibrate(200);
  setShowSuccess(true);
  startAnimation();

  // Send usage to backend while the success animation plays (in parallel, not one after the other)
  const usageRequest = (async () => {
    if (!userId) {
      console.warn('No userId - skipping coupon usage recording');
      return;
    }
    try {
      console.log('[Flow] Sending coupon usage', {
        userId,
        couponId: coupon.couponId,
        couponType: coupon.couponType,
        rewardPoints: coupon.rewardPoints,
      });
      const result = await dispatch(
        recordCouponUsage({
          userId: userId,
          couponId: coupon.couponId,
          couponType: coupon.couponType,
          rewardPoints: coupon.rewardPoints,
        })
      ).unwrap();
      console.log('Coupon usage recorded:', result);
    } catch (err) {
      console.error('Failed to record coupon usage:', err);
      // Don't block navigation on API failure
      Alert.alert('Notice', 'Coupon applied locally!\n' + err);
    }
  })();

  // Navigate once the animation has had ~2s AND the request has finished (regardless of API success)
  await Promise.all([usageRequest, new Promise((resolve) => setTimeout(resolve, 2000))]);
  setShowSuccess(false);
  scaleAnim.setValue(0);
  processing.current = false;

  navigation.navigate('TabNavigator', {
    screen: 'MyCouponHistory',
    params: {
      coupon: {
        ...coupon,
        scannedAt: new Date().toISOString(),
        usageRecorded: !!userId,
      },
    },
  });
};

  const renderPermissionView = () => {
    if (permission === 'checking') {
      return (
        <View style={styles.permissionContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      );
    }
    const blocked = permission === 'blocked';
    return (
      <View style={styles.permissionContainer}>
        <MaterialIcons name="photo-camera" size={64} color="#4CAF50" />
        <Text style={styles.permissionTitle}>Camera access needed</Text>
        <Text style={styles.permissionText}>
          {blocked
            ? 'Camera permission is turned off. Enable it in Settings to scan the store QR code.'
            : 'Allow camera access to scan the store QR code for this coupon.'}
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={() => (blocked ? Linking.openSettings() : resolvePermission(true))}
        >
          <Text style={styles.permissionButtonText}>
            {blocked ? 'Open Settings' : 'Allow Camera'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {permission !== 'granted' ? (
        renderPermissionView()
      ) : (
        // Only mount the camera while this screen is focused, so it is released
        // when navigating away and re-opened cleanly on return.
        isFocused && !showSuccess && (
          <View style={StyleSheet.absoluteFill}>
            <Camera
              style={StyleSheet.absoluteFill}
              cameraType={CameraType.Back}
              scanBarcode={true}
              allowedBarcodeTypes={['qr']}
              onReadCode={(event) => onSuccess(event?.nativeEvent?.codeStringValue)}
              // The native frame only reports codes that sit entirely inside a
              // 300x150 box (sized for 1D barcodes), so square QR codes were
              // never delivered on Android. Scan the whole preview instead and
              // draw the guide marker below in JS.
              showFrame={false}
              scanThrottleDelay={1000}
            />
            <View style={styles.markerContainer} pointerEvents="none">
              <View style={styles.marker} />
            </View>
            <View style={styles.topContent} pointerEvents="none">
              <Text style={styles.title}>Scan QR Code</Text>
              <Text style={styles.subtitle}>Align code within frame</Text>
              {coupon?.vendorName && (
                <Text style={styles.vendorText}>For: {coupon.vendorName}</Text>
              )}
            </View>
            <View style={styles.bottomWrapper}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => navigation.goBack()}
              >
                <MaterialIcons name="close" size={28} color="#fff" />
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      )}

      {/* Rendered as a sibling overlay so the back control stays visible and
          tappable whatever state the camera view is in. */}
      <SafeAreaView style={styles.overlayHeader} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.overlayBackButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.overlayTitle}>Scan the QR</Text>
      </SafeAreaView>

      <Modal visible={showSuccess} transparent>
        <View style={styles.modalOverlay}>
          <ConfettiCannon count={60} origin={{ x: -10, y: 0 }} fadeOut />

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
  overlayHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  overlayBackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  topContent: {
    position: 'absolute',
    top: 100,
    left: 24,
    right: 24,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  title: { fontSize: 22, color: '#4CAF50', fontWeight: 'bold', marginBottom: 6 },
  subtitle: { fontSize: 16, color: '#fff', textAlign: 'center' },
  vendorText: { fontSize: 15, color: '#fff', marginTop: 12, fontWeight: '600' },
  bottomWrapper: {
    position: 'absolute',
    bottom: 48,
    left: 0,
    right: 0,
    alignItems: 'center',
    padding: 20,
  },
  cancelButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,0,0,0.8)',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  cancelText: { color: '#fff', fontSize: 18, marginLeft: 10, fontWeight: '600' },
  markerContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    width: 250,
    height: 250,
    borderColor: '#4CAF50',
    borderWidth: 4,
    borderRadius: 16,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  permissionTitle: { fontSize: 20, color: '#fff', fontWeight: 'bold', marginTop: 16 },
  permissionText: {
    fontSize: 15,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },
  permissionButton: {
    marginTop: 24,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
  },
  permissionButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
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

