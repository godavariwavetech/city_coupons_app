import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import QRScannerModal from '../screens/QRScannerModal';

const Home = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const [scanModalVisible, setScanModalVisible] = useState(false);

  // Listen for scanner trigger from navigation
  useEffect(() => {
    if (route.params?.openScanner) {
      setScanModalVisible(true);
      // Clear the param after opening
      navigation.setParams({ openScanner: false });
    }
  }, [route.params?.openScanner]);

  // Offers data
  const offersData = [
    {
      id: '1',
      image: require('../assets/cafebg1.png'),
      logo: require('../assets/cafefg1.png'),
      title: 'CCD',
      subtitle: 'Buy 4 Coffee @',
      price: '₹799*',
      isFavorite: false,
    },
    {
      id: '2',
      image: require('../assets/cafebg2.png'),
      logo: require('../assets/cafefg2.png'),
      title: 'Spice Villa',
      subtitle: 'Flat 25% Off@',
      price: '₹599*',
      isFavorite: false,
    },
    {
      id: '3',
      image: require('../assets/cafebg3.png'),
      logo: require('../assets/cafebg1.png'),
      title: 'CCD',
      subtitle: '20% Off on...',
      price: '₹799*',
      isFavorite: false,
    },
  ];

  // Coupon store data
  const couponStoreData = [
    {
      id: '1',
      image: require('../assets/cafebg4.png'),
      logo: require('../assets/cafefg1.png'),
      title: 'Trendy Threads',
      subtitle: 'Buy 2 Kurtis, Get 1 Free',
      price: '₹799*',
      isFavorite: false,
    },
    {
      id: '2',
      image: require('../assets/cafebg2.png'),
      logo: require('../assets/cafefg3.png'),
      title: 'Glow & Go Salon',
      subtitle: '30% Off on Hair Spa...',
      price: '₹799*',
      isFavorite: false,
    },
    {
      id: '3',
      image: require('../assets/cafebg3.png'),
      logo: require('../assets/cafefg3.png'),
      title: 'Tech City Hub',
      subtitle: '₹500 Off on Speakers',
      price: '₹799*',
      isFavorite: false,
    },
    {
      id: '4',
      image: require('../assets/cafebg5.png'),
      logo: require('../assets/cafefg2.png'),
      title: 'CityMax Cinemas',
      subtitle: 'Free Popcorn with Ev...',
      price: '₹799*',
      isFavorite: false,
    },
  ];

  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCardPress = (item) => {
    navigation.navigate('CoffeeOfferScreen', { offer: item });
  };

  const renderOfferCard = ({ item }) => (
    <TouchableOpacity style={styles.offerCard} onPress={() => handleCardPress(item)}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.offerImage} resizeMode="cover" />
        <Image source={item.logo} style={styles.logoOverlay} resizeMode="cover" />
      </View>
      <View style={styles.offerContent}>
        <View style={styles.offerHeader}>
          <Text style={styles.offerTitle}>{item.title}</Text>
          <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
            <Feather
              name="heart"
              size={18}
              color={favorites[item.id] ? '#E91E63' : '#666666'}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.offerSubtitle}>{item.subtitle}</Text>
        <Text style={styles.offerPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: (Platform.OS === 'ios' ? 85 : 65) + insets.bottom + 80,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationTitle}>Rajahumdry</Text>
            <View style={styles.locationRow}>
              <Text style={styles.locationAddress}>
                dr no 72-32-7, narayana ...,
              </Text>
              <Feather name="chevron-down" size={16} color="#666666" />
            </View>
          </View>
          <TouchableOpacity>
            <Image
              source={require('../assets/profile1.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#FFFFFF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#FFFFFF"
          />
        </View>

        {/* Offers Picked For You */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>OFFERS PICKED FOR YOU</Text>
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>5 New</Text>
          </View>
        </View>

        <FlatList
          data={offersData}
          renderItem={renderOfferCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.offersList}
        />

        {/* Coupon Store */}
        <View style={[styles.sectionHeader, { marginTop: 24 }]}>
          <View>
            <Text style={styles.sectionTitle}>Coupon Store</Text>
            <Text style={styles.sectionSubtitle}>Discover 100+ Store & Offers</Text>
          </View>
          <TouchableOpacity>
            <MaterialCommunityIcons name="filter-variant" size={22} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Coupon Store Grid */}
        <View style={styles.couponGrid}>
          {couponStoreData.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.couponCard}
              onPress={() => handleCardPress(item)}
            >
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.couponImage} resizeMode="cover" />
                <Image source={item.logo} style={styles.logoOverlay} resizeMode="cover" />
              </View>
              <View style={styles.couponContent}>
                <View style={styles.couponHeader}>
                  <Text style={styles.couponTitle}>{item.title}</Text>
                  <TouchableOpacity onPress={() => toggleFavorite(`coupon-${item.id}`)}>
                    <Feather
                      name="heart"
                      size={18}
                      color={favorites[`coupon-${item.id}`] ? '#E91E63' : '#666666'}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.couponSubtitle}>{item.subtitle}</Text>
                <Text style={styles.couponPrice}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* QR Scanner Modal */}
      <QRScannerModal
        visible={scanModalVisible}
        onClose={() => setScanModalVisible(false)}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  locationContainer: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationAddress: {
    fontSize: 13,
    color: '#666666',
    marginRight: 4,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#003366',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.5,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  newBadge: {
    backgroundColor: '#6C3FE8',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  newBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  offersList: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  offerCard: {
    width: 140,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#d2d2d2',
  },
  imageContainer: {
    position: 'relative',
  },
  offerImage: {
    width: '100%',
    height: 100,
    backgroundColor: '#F5F5F5',
  },
  logoOverlay: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 40,
    height: 40,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  offerContent: {
    padding: 12,
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  offerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  offerSubtitle: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  offerPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
  },
  couponGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  couponCard: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  couponImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#F5F5F5',
  },
  couponContent: {
    padding: 12,
  },
  couponHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  couponTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
  },
  couponSubtitle: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  couponPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
  },
});

export default Home;
