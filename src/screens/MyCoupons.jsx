// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   TextInput,
//   Image,
//   TouchableOpacity,
//   FlatList,
//   StatusBar,
//   Platform,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useNavigation } from "@react-navigation/native";
// import LinearGradient from "react-native-linear-gradient";
// import {
//   responsiveHeight,
//   responsiveWidth,
//   responsiveFontSize,
// } from "react-native-responsive-dimensions";
// import Ionicons from "react-native-vector-icons/Ionicons";
// const HomeScreen = () => {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();
//   // Restaurant images (r1, r2, r3, r4)
//   const restaurantImages = [
//     require("../assets/r1.png"),
//     require("../assets/r2.png"),
//     require("../assets/r3.png"),
//     require("../assets/r1.png"),
//   ];

//   // Fashion images (f1, f2, f3, f4)
//   const fashionImages = [
//     require("../assets/f1.png"),
//     require("../assets/f2.png"),
//     require("../assets/f3.png"),
//     require("../assets/f4.png"),
//   ];

//   // Beauty images (b1, b2, b3)
//   const beautyImages = [
//     require("../assets/b1.png"),
//     require("../assets/b2.png"),
//     require("../assets/b3.png"),
//   ];

//   const restaurantData = [
//     { id: "1", name: "BrewBuzz", offer: "30%off", imageIndex: 0 },
//     { id: "2", name: "BeanNest", offer: "30%off", imageIndex: 1 },
//     { id: "3", name: "Cafe Nova", offer: "30%off", imageIndex: 2 },
//     { id: "4", name: "FoodHub", offer: "30%off", imageIndex: 3 },
//     // { id: "5", name: "ChillZone", offer: "30%off", imageIndex: 0 },
//   ];

//   const fashionData = [
//     { id: "1", name: "TrendyWear", offer: "30%off", imageIndex: 0 },
//     { id: "2", name: "UrbanFit", offer: "30%off", imageIndex: 1 },
//     { id: "3", name: "StyleBox", offer: "30%off", imageIndex: 2 },
//     { id: "4", name: "FabCorner", offer: "30%off", imageIndex: 3 },
//     // { id: "5", name: "ModeLane", offer: "30%off", imageIndex: 0 },
//   ];

//   const beautyData = [
//     { id: "1", name: "Glow Studio", offer: "30%off", imageIndex: 0 },
//     { id: "2", name: "Beauty Hub", offer: "30%off", imageIndex: 1 },
//     { id: "3", name: "Spa Oasis", offer: "30%off", imageIndex: 2 },
//     { id: "4", name: "Radiance", offer: "30%off", imageIndex: 0 },
//     // { id: "5", name: "Pure Bliss", offer: "30%off", imageIndex: 1 },
//   ];

//   const renderCategoryItem = ({ item }, imageArray) => (
//     <View style={styles.card}>
//       <Image
//         source={imageArray[item.imageIndex]}
//         style={styles.cardImage}
//         resizeMode="cover"
//       />
//       <Text style={styles.cardTitle}>{item.name}</Text>
//       <View style={styles.offerBadge}>
//         <Text style={styles.offerText}>{item.offer}</Text>
//       </View>
//     </View>
//   );

//   const renderCategoryBlock = (title, data, bannerImage, imageArray) => (
//     <View style={styles.categorySection}>
//       <View style={styles.bannerContainer}>
//         <Image
//           source={bannerImage}
//           style={styles.categoryBanner}
//           resizeMode="cover"
//         />
//         {/* Left-to-right black gradient overlay */}
//         <LinearGradient
//           colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0)"]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 0 }}
//           style={styles.gradientOverlay}
//         />
//         <View style={styles.overlayHeader}>
//           <Text style={styles.categoryTitle}>{title}</Text>
//           <TouchableOpacity
//             onPress={() => navigation.navigate("RestaurantsListScreen")}
//           >
//             <Ionicons name="chevron-forward" size={20} color="#fff" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Card container overlapping banner */}
//       <View style={styles.cardsWrapper}>
//         <FlatList
//           horizontal
//           data={data}
//           renderItem={(item) => renderCategoryItem(item, imageArray)}
//           keyExtractor={(item) => item.id}
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.flatListContainer}
//         />
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView
//       style={[
//         styles.container,
//         { paddingTop: insets.top },
//       ]}
//     >
//       <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
//       {/* Header */}
//       <View style={styles.headerContainer}>
//         <View>
//           <Text style={styles.cityText}>Rajahmundry</Text>
//           <Text style={styles.addressText}>dr no 72-32-7, narayana ...</Text>
//         </View>
//         <TouchableOpacity>
//           <Image
//             source={require("../assets/profile1.png")}
//             style={styles.profileImage}
//           />
//         </TouchableOpacity>
//       </View>
//       {/* Search */}
//       <View style={styles.searchContainer}>
//         <Ionicons name="search-outline" size={20} color="#000" />
//         <TextInput
//           placeholder="Search"
//           placeholderTextColor="#000"
//           style={styles.searchInput}
//         />
//       </View>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           paddingBottom: (Platform.OS === 'ios' ? 85 : 65) + insets.bottom + 20,
//         }}
//       >
//         <Text style={styles.sectionTitle}>Categories</Text>
//         {renderCategoryBlock(
//           "Restaurants & Cafes",
//           restaurantData,
//           require("../assets/cafe_cover.png"),
//           restaurantImages
//         )}
//         {renderCategoryBlock(
//           "Fashion & Clothing",
//           fashionData,
//           require("../assets/cafe_cover.png"),
//           fashionImages
//         )}
//         {renderCategoryBlock(
//           "Beauty & Wellness",
//           beautyData,
//           require("../assets/cafe_cover.png"),
//           beautyImages
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };
// export default HomeScreen;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   headerContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: responsiveWidth(4),
//     marginTop: responsiveHeight(1),
//   },
//   cityText: {
//     fontSize: responsiveFontSize(2.2),
//     fontWeight: "700",
//   },
//   addressText: {
//     fontSize: responsiveFontSize(1.6),
//     color: "#555",
//   },
//   profileImage: {
//     width: responsiveWidth(10),
//     height: responsiveWidth(10),
//     borderRadius: responsiveWidth(5),
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f1f1f1",
//     borderRadius: 25,
//     marginHorizontal: responsiveWidth(2),
//     marginTop: responsiveHeight(2),
//     paddingHorizontal: responsiveWidth(3),
//     height: responsiveHeight(6),
//     borderWidth: 0.5,
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: responsiveWidth(2),
//     fontSize: responsiveFontSize(1.8),
//     color: "#000",
//   },
//   sectionTitle: {
//     fontSize: responsiveFontSize(2.2),
//     fontWeight: "700",
//     marginHorizontal: responsiveWidth(4),
//     marginTop: responsiveHeight(3),
//     marginBottom: responsiveHeight(1),
//   },

//   // Category Section
//   categorySection: {
//     marginBottom: responsiveHeight(5),
//   },
//   bannerContainer: {
//     position: "relative",
//   },
//   categoryBanner: {
//     width: "100%",
//     height: responsiveHeight(10),
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//   },
//   gradientOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//   },
//   overlayHeader: {
//     position: "absolute",
//     top: responsiveHeight(2),
//     left: responsiveWidth(4),
//     right: responsiveWidth(4),
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   categoryTitle: {
//     fontSize: responsiveFontSize(2),
//     color: "#fff",
//     fontWeight: "600",
//   },
//   cardsWrapper: {
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     marginTop: -responsiveHeight(2), // overlap effect
//     paddingTop: responsiveHeight(2),
//   },
//   flatListContainer: {
//     paddingHorizontal: responsiveWidth(5),
//   },
//   card: {
//     width: responsiveWidth(22),
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//   },
//   cardImage: {
//     width: responsiveWidth(18),
//     height: responsiveWidth(16),
//     borderRadius: 15,
//     marginBottom: responsiveHeight(0.5),
//     borderWidth: 0.5,
//     borderColor: "#000",
//   },
//   cardTitle: {
//     fontSize: responsiveFontSize(1.5),
//     fontWeight: "600",
//     color: "#000",
//   },
//   offerBadge: {
//     backgroundColor: "#f1f1f1",
//     borderRadius: 6,
//     paddingHorizontal: responsiveWidth(2),
//     marginTop: responsiveHeight(0.3),
//   },
//   offerText: {
//     fontSize: responsiveFontSize(1.4),
//     fontWeight: "600",
//   },
// });
// MyCoupons.js – FINAL VERSION WITH YOUR EXACT ORIGINAL STYLES
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesWithVendors, fetchUserProfile } from "../redux/reducers/auth";
import CategorySkeleton from '../components/CategorySkeleton';
import BniLogo from './BniAsk/components/BniLogo';
const MyCoupons = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { categories, categoriesLoading, categoriesError, profile, userId } = useSelector(
    (state) => state.Auth
  );

  useEffect(() => {
    dispatch(fetchCategoriesWithVendors());
  }, [dispatch]);

  // Make sure the header avatar is available even if Home hasn't loaded the profile yet
  useEffect(() => {
    if (userId && !profile) {
      dispatch(fetchUserProfile(userId));
    }
  }, [dispatch, userId, profile]);

  // Horizontal Store Card
  const renderStoreCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("CouponsListScreen", { vendorId: item.vendorId })
      }
    >
      <Image
        source={{ uri: item.logo }}
        style={styles.cardImage}
        resizeMode="cover"
        defaultSource={require("../assets/profile1.png")}
      />
      <Text style={styles.cardTitle} numberOfLines={1}>
        {item.shopName}
      </Text>
    </TouchableOpacity>
  );

  // Category Block with Banner + Horizontal Scroll
  const renderCategoryBlock = (category) => (
    <View style={styles.categorySection} key={category.categoryId}>
      {/* Make the ENTIRE banner clickable */}
<TouchableOpacity
  activeOpacity={0.85}
  onPress={() =>
    navigation.navigate("RestaurantsListScreen", {
      categoryName: category.categoryName,
      stores: category.stores,
    })
  }
>
  <View style={styles.bannerContainer}>
    <Image
      source={{ uri: category.categoryImage }}
      style={styles.categoryBanner}
      resizeMode="cover"
    />
    <LinearGradient
      colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientOverlay}
    />
    <View style={styles.overlayHeader}>
      <Text style={styles.categoryTitle}>{category.categoryName}</Text>
      <Ionicons name="chevron-forward" size={20} color="#fff" />
    </View>
  </View>
</TouchableOpacity>

      <View style={styles.cardsWrapper}>
        <FlatList
          horizontal
          data={category.stores}
          renderItem={renderStoreCard}
          keyExtractor={(item) => item.vendorId.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </View>
  );

  return (
    <View style={[styles.container, {  }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={[styles.headerContainer,{paddingTop: insets.top+10}]}>
        <View> 
          {/* <Text style={styles.cityText}>Rajahmundry</Text>
          <Text style={styles.addressText}>dr no 72-32-7, narayana ...</Text> */}
           <BniLogo style={styles.profileImage1} />
        </View>
        <TouchableOpacity  onPress={()=>{navigation.navigate("Profile")}} >
          <Image
            source={profile?.profile ? { uri: profile.profile } : require("../assets/profile1.png")}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#FFF" />
        <TextInput
          placeholder="Search shops, food, fashion..."
          placeholderTextColor="#FFF"
          style={styles.searchInput}
        />
      </View>

      {/* Main Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: (Platform.OS === "ios" ? 85 : 65) + insets.bottom + 20,
        }}
      >
        <Text style={styles.sectionTitle}>Categeories</Text>

        {/* {categoriesLoading ? (
          <ActivityIndicator size="large" color="#000" style={{ marginTop: 50 }} />
        ) : categoriesError ? (
          <Text style={{ textAlign: "center", color: "red", marginTop: 20 }}>
            {categoriesError}
          </Text>
        ) : categories.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20, color: "#666" }}>
            No categories found
          </Text>
        ) : (
          categories.map(renderCategoryBlock)
        )} */}
        {categoriesLoading ? (
  <CategorySkeleton />
) : categoriesError ? (
  <Text style={{ textAlign: "center", color: "red", marginTop: 20 }}>
    {categoriesError}
  </Text>
) : categories.length === 0 ? (
  <Text style={{ textAlign: "center", marginTop: 20, color: "#666" }}>
    No categories found
  </Text>
) : (
  categories.map(renderCategoryBlock)
)}
      </ScrollView>
    </View>
  );
};

export default MyCoupons;

// YOUR 100% ORIGINAL STYLES — EXACTLY AS YOU WANTED
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(4),
    marginTop: responsiveHeight(1),
  },
  cityText: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: "700",
  },
  addressText: {
    fontSize: responsiveFontSize(1.6),
    color: "#555",
  },
  profileImage: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
  },
  searchContainer: {
   flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#002161',
    borderRadius: 25,
    paddingHorizontal: 20,
    // paddingVertical: 6,
    // iOS TextInputs have no intrinsic vertical padding, so give the bar a fixed height.
    height: 48,
    marginHorizontal: 15,
    marginTop: 8,
    // marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    paddingVertical: 0,
    marginLeft: responsiveWidth(2),
    fontSize: responsiveFontSize(1.8),
    color: "#000",
         fontFamily:"SF-Pro-Display-Regular"
  },
  sectionTitle: {
    fontSize: responsiveFontSize(2.2),
    // fontWeight: "700",
    marginHorizontal: responsiveWidth(4),
    marginTop: responsiveHeight(3),
    marginBottom: responsiveHeight(1),
    color:"#000",
         fontFamily:"SF-Pro-Display-Medium"
  },

  // Category Section
  categorySection: {
    marginBottom: responsiveHeight(5),
  },
  bannerContainer: {
    position: "relative",
  },
  categoryBanner: {
    width: "100%",
    height: responsiveHeight(10),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  overlayHeader: {
    position: "absolute",
    top: responsiveHeight(2),
    left: responsiveWidth(4),
    right: responsiveWidth(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryTitle: {
    fontSize: responsiveFontSize(2),
    color: "#fff",
    fontWeight: "600",
         fontFamily:"SF-Pro-Display-Bold"
  },
  cardsWrapper: {
    backgroundColor: "#fff",
    // borderTopLeftRadius: 16,
    // borderTopRightRadius: 16,
    marginTop: -responsiveHeight(2), // overlap effect
    paddingTop: responsiveHeight(2),
    borderWidth:0.5,
    borderColor:"#000",
    borderBottomLeftRadius:25,
    borderBottomRightRadius:25
  },
  flatListContainer: {
    paddingHorizontal: responsiveWidth(5),
  },
  card: {
    width: responsiveWidth(22),
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardImage: {
    width: responsiveWidth(18),
    height: responsiveWidth(16),
    borderRadius: 15,
    marginBottom: responsiveHeight(0.5),
    borderWidth: 0.5,
    borderColor: "#000",
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: "400",
    color: "#000",
    marginBottom:"5%",
         fontFamily:"SF-Pro-Display-Regular"
  },
  profileImage1: {
    width: 150,
    height: 80,
    borderRadius: 20,
  },
});