import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const CouponsListScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  // Sample coupon data - replace with your API data
  const coupons = [
    {
      id: '1',
      code: 'YUSREHNDHJSYUJAH',
      discount: '50% off on first purchase',
      expiryDate: '01-12-2025',
    },
    {
      id: '2',
      code: 'YUSREHNDHJSYUJAH',
      discount: '50% off on first purchase',
      expiryDate: '01-12-2025',
    },
    {
      id: '3',
      code: 'YUSREHNDHJSYUJAH',
      discount: '50% off on first purchase',
      expiryDate: '01-12-2025',
    },
    {
      id: '4',
      code: 'YUSREHNDHJSYUJAH',
      discount: '50% off on first purchase',
      expiryDate: '01-12-2025',
    },
    {
      id: '5',
      code: 'YUSREHNDHJSYUJAH',
      discount: '50% off on first purchase',
      expiryDate: '01-12-2025',
    },
  ];

  const handleShowQR = (coupon) => {
    // Navigate to QR code screen or show modal
    console.log('Show QR for:', coupon.code);
  };

  const handleSubscribe = () => {
    // Handle subscription action
    console.log('Subscribe clicked');
  };

  const renderCouponCard = ({ item }) => (
    <View style={styles.couponCard}>
      {/* Left Section with Icon and Details */}
      <View style={styles.couponLeftSection}>
        <MaterialCommunityIcons name="ticket-percent" size={20} color="#000" />
        <View style={styles.couponDetails}>
          <Text style={styles.couponCode}>{item.code}</Text>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}</Text>
          </View>
          <Text style={styles.expiryText}>Expires on {item.expiryDate}</Text>
        </View>
      </View>

      {/* Right Section with QR Button */}
      <TouchableOpacity
        style={styles.qrButton}
        onPress={() => handleShowQR(item)}
      >
        <MaterialCommunityIcons name="qrcode-scan" size={24} color="#fff" />
        <Text style={styles.qrButtonText}>Show QR</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Brand Section */}
        <View style={styles.brandSection}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/cafelogo.png')}
              style={styles.brandLogo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.brandName}>BrewBuzz</Text>
          <Text style={styles.couponCount}>6 Coupons | 3 Cashback</Text>
        </View>

        {/* Subscribe Button */}
        <TouchableOpacity
          style={styles.subscribeButton}
          onPress={handleSubscribe}
        >
          <Text style={styles.subscribeButtonText}>Subscribe</Text>
          <MaterialCommunityIcons
            name="bell-outline"
            size={20}
            color="#fff"
            style={styles.bellIcon}
          />
        </TouchableOpacity>

        {/* Coupons List */}
        <FlatList
          data={coupons}
          renderItem={renderCouponCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.listContainer,
            { paddingBottom: insets.bottom + 20 },
          ]}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandSection: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  brandLogo: {
    width: 60,
    height: 60,
  },
  brandName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  couponCount: {
    fontSize: 14,
    color: '#666',
  },
  subscribeButton: {
    backgroundColor: '#E53935',
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  subscribeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  bellIcon: {
    marginLeft: 8,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  couponCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  couponLeftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  couponDetails: {
    marginLeft: 12,
    flex: 1,
  },
  couponCode: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  discountBadge: {
    backgroundColor: '#00C853',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  expiryText: {
    fontSize: 12,
    color: '#666',
  },
  qrButton: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  qrButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    marginTop: 4,
  },
});

export default CouponsListScreen;
