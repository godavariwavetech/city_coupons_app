// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   FlatList,
//   Image,
//   StatusBar,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import {
//   responsiveHeight,
//   responsiveWidth,
//   responsiveFontSize,
// } from "react-native-responsive-dimensions";
// import Toast from 'react-native-toast-message';

// const RestaurantsListScreen = ({ navigation }) => {
//   const insets = useSafeAreaInsets();
//   const [favorited, setFavorited] = useState(new Set());

//   const restaurantData = [
//     { id: "1", name: "BrewBuzz" },
//     { id: "2", name: "BeanNest" },
//     { id: "3", name: "Cafe Nova" },
//     { id: "4", name: "RoastUp" },
//     { id: "5", name: "FoodHub" },
//     { id: "6", name: "GrillStop" },
//     { id: "7", name: "SipStation" },
//     { id: "8", name: "DailyBrew" },
//   ];

//   const imageMap = {
//     "1": require("../assets/cafebg1.png"),
//     "2": require("../assets/cafebg2.png"),
//     "3": require("../assets/cafebg3.png"),
//     "4": require("../assets/f1.png"),
//     "5": require("../assets/f2.png"),
//     "6": require("../assets/f3.png"),
//     "7": require("../assets/cafebg1.png"),
//     "8": require("../assets/cafebg2.png"),
//   };

//   const toggleFavorite = (id) => {
//     setFavorited((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(id)) {
//         newSet.delete(id);
//         Toast.show({
//           type: 'info',
//           position: 'top',
//           text1: 'Removed from wish list successfully'
//         });
//       } else {
//         newSet.add(id);
//         Toast.show({
//           type: 'success',
//           position: 'top',
//           text1: 'Added to wish list successfully'
//         });
//       }
//       return newSet;
//     });
//   };

//   const renderItem = ({ item }) => {
//     const isFavorited = favorited.has(item.id);

//     return (
//       <View style={styles.listItem}>
//         <TouchableOpacity 
//           style={styles.itemLeft}
//           onPress={() => navigation.navigate('CoffeeOfferScreen')}
//         >
//           <Image
//             source={imageMap[item.id]}
//             style={styles.logo}
//             resizeMode="cover"
//           />
//           <View style={styles.textContainer}>
//             <Text style={styles.restaurantName}>{item.name}</Text>
//             <Text style={styles.subText}>6 Coupons | 3 Cashback</Text>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.heartButton} onPress={() => toggleFavorite(item.id)}>
//           <Ionicons 
//             name={isFavorited ? "heart" : "heart-outline"} 
//             size={22} 
//             color={isFavorited ? "#FF0000" : "#000"} 
//           />
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView
//       style={[
//         styles.container,
//         { paddingTop: insets.top, paddingBottom: insets.bottom },
//       ]}
//     >
//       <StatusBar barStyle={"dark-content"} backgroundColor={"#fff"}/>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation?.goBack()}>
//           <Ionicons name="arrow-back" size={22} color="#000" />
//         </TouchableOpacity>

//         <View style={styles.headerTitleContainer}>
//           <Text style={styles.headerTitle}>Restaurants & Cafes</Text>
//           <Ionicons
//             name="chevron-down"
//             size={18}
//             color="#000"
//             style={{ marginLeft: 5 }}
//           />
//         </View>

//         <View style={{ width: 22 }} /> {/* Placeholder for symmetry */}
//       </View>

//       {/* List */}
//       <FlatList
//         data={restaurantData}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           paddingBottom: responsiveHeight(2),
//         }}
//       />

//       <Toast />
//     </SafeAreaView>
//   );
// };

// export default RestaurantsListScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: responsiveWidth(4),
//     paddingVertical: responsiveHeight(1.8),
//     backgroundColor: "#fff",
//   },
//   headerTitleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   headerTitle: {
//     fontSize: responsiveFontSize(2.1),
//     fontWeight: "700",
//     color: "#000",
//   },
//   listItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: responsiveWidth(4),
//     paddingVertical: responsiveHeight(1.6),
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   itemLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   logo: {
//     width: responsiveWidth(20),
//     height: responsiveWidth(20),
//     borderRadius: 8,
//     marginRight: responsiveWidth(3),
//   },
//   textContainer: {
//     justifyContent: "center",
//     flex: 1,
//   },
//   restaurantName: {
//     fontSize: responsiveFontSize(1.9),
//     fontWeight: "600",
//     color: "#000",
//   },
//   subText: {
//     fontSize: responsiveFontSize(1.6),
//     color: "#666",
//     marginTop: responsiveHeight(0.3),
//   },
//   heartButton: {
//     padding: responsiveWidth(1),
//   },
// });
// CouponsListScreen.js → Now uses your beautiful RestaurantsListScreen UI
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Toast from 'react-native-toast-message';

const RestaurantsListScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();

  const { categoryName = "Category", stores = [] } = route.params || {};

  const [favorited, setFavorited] = useState(new Set());

  useEffect(() => {
    console.log("RestaurantsListScreen Received:");
    console.log("Category:", categoryName);
    console.log("Stores Count:", stores.length);
  }, [categoryName, stores]);

  const toggleFavorite = (vendorId) => {
    setFavorited((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(vendorId)) {
        newSet.delete(vendorId);
        Toast.show({
          type: 'info',
          text1: 'Removed from wishlist',
          position: 'top',
        });
      } else {
        newSet.add(vendorId);
        Toast.show({
          type: 'success',
          text1: 'Added to wishlist!',
          position: 'top',
        });
      }
      return newSet;
    });
  };

  const renderItem = ({ item }) => {
    const isFavorited = favorited.has(item.vendorId);

    return (
      <View style={styles.listItem}>
        <TouchableOpacity
          style={styles.itemLeft}
          onPress={() => {
            navigation.navigate("CouponsListScreen", {
              vendorId: item.vendorId,
            });
          }}
        >
          <Image
            source={{ uri: item.logo }}
            style={styles.logo}
            resizeMode="cover"
            defaultSource={require("../assets/profile1.png")}
          />
          <View style={styles.textContainer}>
            <Text style={styles.restaurantName}>{item.shopName}</Text>
            <Text style={styles.subText}>View Coupons & Offers</Text>
          </View>
        </TouchableOpacity>

        {/* Uncomment if you want to re-enable favorite button */}
        {/* <TouchableOpacity
          style={styles.heartButton}
          onPress={() => toggleFavorite(item.vendorId)}
        >
          <Ionicons
            name={isFavorited ? "heart" : "heart-outline"}
            size={26}
            color={isFavorited ? "#FF0000" : "#888"}
          />
        </TouchableOpacity> */}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {categoryName}
          </Text>
          {/* <Ionicons name="chevron-down" size={18} color="#000" style={{ marginLeft: 6 }} /> */}
        </View>

        <View style={{ width: 26 }} />
      </View>

      {/* Stores List */}
      <FlatList
        data={stores}
        renderItem={renderItem}
        keyExtractor={(item) => item.vendorId.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: responsiveHeight(6),
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No stores found in this category
            </Text>
          </View>
        }
      />

      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginLeft: -40,
  },
  headerTitle: {
    fontSize: responsiveFontSize(2.4),
    fontFamily: "SF-Pro-Display-Bold",
    color: "#000",
    maxWidth: responsiveWidth(65),
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2.2),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  logo: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    borderRadius: 14,
    marginRight: responsiveWidth(4),
    backgroundColor: "#f5f5f5",
  },
  textContainer: {
    flex: 1,
  },
  restaurantName: {
    fontSize: responsiveFontSize(2.1),
    fontFamily: "SF-Pro-Display-Semibold",
    color: "#000",
    marginBottom: 4,
  },
  subText: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: "SF-Pro-Display-Medium",
    color: "#16A34A",
  },
  heartButton: {
    padding: responsiveWidth(3),
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: responsiveFontSize(2),
    fontFamily: "SF-Pro-Display-Medium",
    color: "#999",
  },
});

export default RestaurantsListScreen;