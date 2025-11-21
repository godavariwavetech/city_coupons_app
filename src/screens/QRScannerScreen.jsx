import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,Modal
} from 'react-native';

const QRScannerScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.content}>
        {/* Logo */}
        <Image
          source={require('../assets/icon2.png')} // Add your logo image
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Scan Text */}
        <Text style={styles.scanText}>Scan the Registration QR</Text>

        {/* QR Code Container */}
        <View style={styles.qrContainer}>
          <Image
            source={require('../assets/qr-code.png')} // Add your QR code image
            style={styles.qrImage}
            resizeMode="contain"
          />
        </View>

        {/* Enter Manually Button */}
        <TouchableOpacity
          style={styles.manualButton}
          onPress={() => navigation.navigate('RegisterManuallyScreen')}
        >
          <Text style={styles.manualButtonText}>Enter Manually</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 220,
    height: 150,
    marginBottom: 40,
  },
  scanText: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 20,
    fontWeight: '400',
  },
  qrContainer: {
    width: 200,
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 40,
  },
  qrImage: {
    width: '100%',
    height: '100%',
  },
  manualButton: {
    paddingVertical: 5,
  },
  manualButtonText: {
    fontSize: 15,
    color: '#333333',
    textDecorationLine: 'underline',
    fontWeight: '400',
  },
});

export default QRScannerScreen;