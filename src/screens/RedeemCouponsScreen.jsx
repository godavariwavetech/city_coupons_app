// screens/RedeemCouponsScreen.js
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRedeemableCoupons } from '../redux/reducers/auth'; // adjust path
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const RedeemCouponsScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { pointsEntered } = route.params || {};

  const { coupons, couponsLoading, couponsError } = useSelector((state) => state.Auth);

  useEffect(() => {
    if (pointsEntered) {
      dispatch(fetchRedeemableCoupons(pointsEntered));
    }
  }, [pointsEntered, dispatch]);

  const renderCoupon = ({ item }) => (
    <View style={styles.couponCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.couponImage} />
    
    </View>
  );

  if (couponsLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#1E3A8A" style={{ marginTop: 50 }} />
        <Text style={styles.loadingText}>Loading available coupons...</Text>
      </SafeAreaView>
    );
  }

  if (couponsError) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{couponsError}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container,]}>
      <View style={[styles.header,{paddingTop:insets.top+20}]}>
        <Text style={styles.headerTitle}>Redeem with {pointsEntered} Points</Text>
        <Text style={styles.headerSubtitle}>
          {coupons.length > 0
            ? 'Choose a coupon to redeem'
            : 'No coupons available for this point value'}
        </Text>
      </View>

      {coupons.length === 0 ? (
        <Text style={styles.emptyText}>No redeemable coupons found for {pointsEntered} points.</Text>
      ) : (
        <FlatList
          data={coupons}
          keyExtractor={(item) => item.couponId.toString()}
          renderItem={renderCoupon}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  headerTitle: {
    fontSize: 22,
    // fontWeight: '700',
    color: '#000',
     fontFamily:"SF-Pro-Display-Bold",
    //  paddingTop:5
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
     fontFamily:"SF-Pro-Display-Medium"
  },
  listContent: {
    padding: 16,
  },
  couponCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  couponImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  couponInfo: {
    padding: 16,
  },
  vendorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E3A8A',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 6,
  },
  couponName: {
    fontSize: 16,
    color: '#DC2626',
    marginBottom: 8,
  },
  pointsRow: {
    backgroundColor: '#FEE2E2',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 10,
  },
  pointsText: {
    fontWeight: 'bold',
    color: '#DC2626',
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  validity: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#DC2626',
    paddingHorizontal: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 18,
    color: '#999',
         fontFamily:"SF-Pro-Display-Regular"
  },
});

export default RedeemCouponsScreen;