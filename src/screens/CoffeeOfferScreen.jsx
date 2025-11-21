import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const CoffeeOfferScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const handleCopy = () => {
    // Copy coupon code to clipboard
    console.log('Code copied');
  };

  const handleRedeemNow = () => {
    // Handle redeem action
    console.log('Redeem Now pressed');
  };

  const handleOfferDetails = () => {
    // Navigate to offer details
    console.log('Offer Details pressed');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      
      <ScrollView 
        style={[styles.container, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section with Coffee Image */}
        <ImageBackground
          source={require('../assets/cafe_cover.png')}
          style={styles.headerBackground}
          resizeMode="cover"
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <View style={styles.backButtonCircle}>
              <MaterialIcons name="arrow-back" size={24} color="#000" />
            </View>
          </TouchableOpacity>

          {/* Special Coffee Text */}
          <View style={styles.headerTextContainer}>
           
            
            {/* Only Badge */}
            

            {/* Decorative Elements */}
            {/* <View style={styles.decorativeDots}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View> */}
          </View>

          {/* Cafe Info Overlay - Bottom Left of Image */}
          <View style={styles.cafeInfoOverlay}>
            <Image
              source={require('../assets/cafelogo.png')}
              style={styles.cafeLogoOverlay}
              resizeMode="contain"
            />
            <View style={styles.cafeTextOverlay}>
              <Text style={styles.cafeNameOverlay}>CAFE COFFY DAY</Text>
              <Text style={styles.cafeAddressOverlay}>
                Grnd Flr, G-1 & 2, 79/1/6, Jawaharlal Nehru Rd,{'\n'}
                Rajahmundravaram, Andhra Pradesh 533103
              </Text>
            </View>
          </View>
        </ImageBackground>

        {/* White Content Section */}
        <View style={[styles.contentSection, { paddingBottom: insets.bottom + 20 }]}>
          {/* Offer Title */}
          <Text style={styles.offerTitle}>Get Upto 35% Off*</Text>
          
          {/* Offer Description */}
          <Text style={styles.offerDescription}>
            for purchases across all beverages and snacks at Café Coffee Day outlets
          </Text>

          {/* Coupon Code Container */}
          <View style={styles.couponContainer}>
            <View style={styles.couponCodeSection}>
              <Text style={styles.codeLabel}>Code: </Text>
              <Text style={styles.codeValue}>Café Coffee Day 35</Text>
            </View>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={handleCopy}
            >
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
          </View>

          {/* Redeem Button */}
          <TouchableOpacity
            style={styles.redeemButton}
            onPress={handleRedeemNow}
          >
            <Text style={styles.redeemButtonText}>Redeem Now</Text>
          </TouchableOpacity>

          {/* Expiry Info */}
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="calendar-blank" size={20} color="#666" />
            <Text style={styles.infoText}>Expires on: 15th Nov 2025, 11:59 PM</Text>
          </View>

          {/* Offer Details */}
          <TouchableOpacity
            style={styles.infoRow}
            onPress={handleOfferDetails}
          >
            <MaterialCommunityIcons name="information-outline" size={20} color="#666" />
            <Text style={styles.infoText}>Offer Details</Text>
            <MaterialIcons name="chevron-right" size={24} color="#666" style={styles.chevron} />
          </TouchableOpacity>

          {/* Second Expiry Info */}
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="tag-outline" size={20} color="#666" />
            <Text style={styles.infoText}>Expires on: 15th Nov 2025, 11:59 PM</Text>
            <MaterialIcons name="chevron-right" size={24} color="#666" style={styles.chevron} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBackground: {
    width: '100%',
    height: height * 0.35,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 10,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  headerTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  specialText: {
    fontSize: width * 0.09,
    fontFamily: 'Pacifico-Regular',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  coffeeText: {
    fontSize: width * 0.14,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginTop: -10,
  },
  onlyBadge: {
    position: 'absolute',
    right: width * 0.08,
    top: '50%',
    backgroundColor: '#FF9500',
    borderRadius: 50,
    width: width * 0.2,
    height: width * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  onlyText: {
    fontSize: width * 0.03,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  priceText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 2,
  },
  decorativeDots: {
    position: 'absolute',
    left: width * 0.08,
    bottom: height * 0.05,
    flexDirection: 'column',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  // Cafe Info Overlay on Image
  cafeInfoOverlay: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    flexDirection: 'row',
    // backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    maxWidth: width * 0.85,
  },
  cafeLogoOverlay: {
    width: 50,
    height: 50,
    borderRadius: 8,
    // backgroundColor: '#fff',
  },
  cafeTextOverlay: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  cafeNameOverlay: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  cafeAddressOverlay: {
    fontSize: 10,
    color: '#fff',
    lineHeight: 14,
  },
  contentSection: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  offerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  offerDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  couponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  couponCodeSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeLabel: {
    fontSize: 14,
    color: '#666',
  },
  codeValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  copyButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  copyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  redeemButton: {
    backgroundColor: '#001F54',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  redeemButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
    flex: 1,
  },
  chevron: {
    marginLeft: 'auto',
  },
});

export default CoffeeOfferScreen;
