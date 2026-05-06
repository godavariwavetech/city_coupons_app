import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,Alert
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import CustomModal from "../components/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { requestLoginOtp, resetOtpState } from "../redux/reducers/auth";

const LoginScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [phone, setPhone] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const { loading, isNewUser, otpRequestSuccess, message } = useSelector(
    (state) => state.Auth
  );

  useEffect(() => {
    dispatch(resetOtpState());
  }, [dispatch]);

  useEffect(() => {
    if (otpRequestSuccess) {
      if (isNewUser) {
        Alert.alert(
          "Welcome!",
          message || "Please register to continue.",
          [
            {
              text: "Register",
              onPress: () => navigation.navigate("RegisterManuallyScreen"),
            },
          ],
          { cancelable: false }
        );
      } else {
        navigation.replace("OtpVerificationScreen", { mobile: phone });
      }
    }
  }, [otpRequestSuccess, isNewUser, message, navigation, phone]);

  const validatePhone = (phoneNumber) => {
    const digitsOnly = phoneNumber.replace(/\D/g, "");
    if (digitsOnly.length !== 10) {
      return "Please enter a valid 10-digit phone number.";
    }
    return null;
  };

  const handleLogin = async () => {
    const error = validatePhone(phone);
    if (error) {
      setErrorMessage(error);
      setModalVisible(true);
      return;
    }

    dispatch(requestLoginOtp(phone));
  };

  const handleModalClose = () => setModalVisible(false);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.innerContainer}
      >
        <Text style={styles.welcomeText}>Welcome to</Text>

        <Image
          source={require("../assets/icon2.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.inputContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            placeholderTextColor="#888"
            keyboardType="number-pad"
            value={phone}
            onChangeText={setPhone}
            maxLength={10}
          />
        </View>

        <TouchableOpacity
          style={[styles.loginButton, loading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginText}>Login</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <CustomModal
        visible={modalVisible}
        onClose={handleModalClose}
        title="Validation Error"
        content={errorMessage}
        onConfirm={handleModalClose}
        confirmText="OK"
        showCancelButton={false}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: responsiveFontSize(2.3),
    fontFamily: "SF-Pro-Display-Semibold",
    color: "#7a7a7a",
    marginBottom: responsiveHeight(2),
  },
  logo: {
    width: responsiveWidth(70),
    height: responsiveHeight(15),
    alignSelf: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E9F0FF",
    width: responsiveWidth(80),
    borderRadius: 30,
    paddingHorizontal: responsiveWidth(4),
    height: responsiveHeight(6.5),
    borderWidth: 1,
    borderColor: "#C9D4FF",
    marginBottom: responsiveHeight(3),
  },
  countryCode: {
    fontSize: responsiveFontSize(2),
    fontFamily: "SF-Pro-Display-Medium",
    color: "#555",
    marginRight: responsiveWidth(2),
  },
  input: {
    flex: 1,
    fontSize: responsiveFontSize(2),
    color: "#000",
    fontFamily: "SF-Pro-Display-Medium",
  },
  loginButton: {
    backgroundColor: "#001D4A",
    width: responsiveWidth(40),
    height: responsiveHeight(6),
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: responsiveHeight(3),
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginText: {
    color: "#fff",
    fontSize: responsiveFontSize(2),
    fontFamily: "SF-Pro-Display-Bold",
  },
});




// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   ScrollView,
//   TouchableOpacity,
//   StatusBar,
//   Dimensions,
//   SafeAreaView,
//   Image,
//   FlatList,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

// // Setup Shimmer
// const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

// const { width } = Dimensions.get('window');

// // --- Mock Data ---

// const SERVICES = [
//   { id: 1, name: 'Engineer', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3048/3048122.png' } },
//   { id: 2, name: 'Plumber', image: null },
//   { id: 3, name: 'Painter', image: null },
//   { id: 4, name: 'Carpenter', image: null },
// ];

// const MATERIALS = [
//   { id: 1, name: 'Cement' },
//   { id: 2, name: 'Sand' },
//   { id: 3, name: 'Red Bricks' },
//   { id: 4, name: 'Aggregate' },
// ];

// const BANNERS = [
//   { id: 1, image: require("../assets/banner.png")  }, // Replace with your banner images
//   { id: 2, image:  require("../assets/banner.png") },
//   { id: 3, image:  require("../assets/banner.png") },
// ];

// const ENGINEERS_DATA = [
//   {
//     id: 1,
//     name: 'Prime Builders',
//     rating: 4.8,
//     reviews: 127,
//     location: 'Rajamundry, VL puram',
//     experience: '10+ years experience',
//     image: { uri: 'https://img.freepik.com/free-photo/medium-shot-people-working-together_23-2149302194.jpg' },
//   },
//   {
//     id: 2,
//     name: 'Civil Tech',
//     rating: 4.5,
//     reviews: 89,
//     location: 'Kakinada, Main Rd',
//     experience: '8+ years experience',
//     image: { uri: 'https://img.freepik.com/free-photo/architect-working-blueprints_23-2147710986.jpg' },
//   },
// ];

// const PLUMBERS_DATA = [
//   {
//     id: 1,
//     name: 'Royal Pipe Services',
//     rating: 4.8,
//     reviews: 127,
//     location: 'Rajamundry, VL puram',
//     experience: '10+ years experience',
//     image: { uri: 'https://img.freepik.com/free-photo/plumber-repairing-sink_23-2149344838.jpg' },
//   },
//   {
//     id: 2,
//     name: 'Quick Fix Plumbing',
//     rating: 4.8,
//     reviews: 127,
//     location: 'Rajamundry, VL puram',
//     experience: '10+ years experience',
//     image: { uri: 'https://img.freepik.com/free-photo/medium-shot-people-working-together_23-2149302194.jpg' }, // Reusing image for demo
//   },
// ];

// const Home = () => {
//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#097462" />

//       {/* --- Header Section --- */}
//       <LinearGradient
//         colors={['#097462', '#045749', '#003D33']}
//         style={styles.headerContainer}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 0, y: 1 }}
//       >
//         <SafeAreaView>
//           <View style={styles.headerContent}>
//             <View style={styles.topBar}>
//               <View style={styles.userInfoContainer}>
//                 <View style={styles.avatarPlaceholder}>
//                   <Icon name="person" size={24} color="#003D33" />
//                 </View>
//                 <View style={styles.userTextContainer}>
//                   <Text style={styles.userName}>Rajesh</Text>
//                   <View style={styles.locationRow}>
//                     <Text style={styles.userLocation}>Rajamundry</Text>
//                     <Icon name="keyboard-arrow-down" size={20} color="#fff" />
//                   </View>
//                 </View>
//               </View>
//               <View style={styles.headerIcons}>
//                 <TouchableOpacity style={styles.iconButton}>
//                   <Ionicons name="person-outline" size={20} color="#fff" />
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.iconButton}>
//                   <Ionicons name="notifications-outline" size={20} color="#fff" />
//                 </TouchableOpacity>
//               </View>
//             </View>
//             <View style={styles.searchContainer}>
//               <Icon name="search" size={24} color="#666" style={styles.searchIcon} />
//               <TextInput
//                 placeholder="Find experts instantly..."
//                 placeholderTextColor="#999"
//                 style={styles.searchInput}
//               />
//             </View>
//           </View>
//         </SafeAreaView>
//       </LinearGradient>

//       {/* --- Body Content --- */}
//       <View style={styles.bodyContainer}>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContent}
//         >
//           {/* Services Section */}
//           <SectionHeader title="Services" />
//           <View style={styles.gridContainer}>
//             {SERVICES.map((item) => (
//               <CategoryItem key={item.id} name={item.name} imageSource={item.image} />
//             ))}
//           </View>

//           {/* Materials Section */}
//           <View style={styles.spacer} />
//           <SectionHeader title="Materials" />
//           <View style={styles.gridContainer}>
//             {MATERIALS.map((item) => (
//               <CategoryItem key={item.id} name={item.name} imageSource={null} />
//             ))}
//           </View>

//           {/* --- NEW: Engineer Section (Horizontal Scroll) --- */}
//           <View style={styles.sectionSpacer} />
//           <HorizontalSection 
//             title="Engineer" 
//             data={ENGINEERS_DATA} 
//           />

//           {/* --- NEW: Auto-scrolling Banner --- */}
//           <View style={styles.bannerSpacer} />
//           <BannerCarousel data={BANNERS} />

//           {/* --- NEW: Plumber Section (Horizontal Scroll) --- */}
//           <View style={styles.sectionSpacer} />
//           <HorizontalSection 
//             title="Plumber" 
//             data={PLUMBERS_DATA} 
//           />

//           {/* Bottom Padding */}
//           <View style={{ height: 40 }} />
//         </ScrollView>
//       </View>
//     </View>
//   );
// };

// // =================================================
// // REUSABLE COMPONENTS
// // =================================================

// // 1. Horizontal Section Component (Common for Engineer/Plumber)
// const HorizontalSection = ({ title, data }) => (
//   <View>
//     <SectionHeader title={title} />
//     <FlatList
//       data={data}
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       keyExtractor={(item) => item.id.toString()}
//       contentContainerStyle={{ paddingVertical: 10 }} // Padding for shadow
//       renderItem={({ item }) => <ProviderCard item={item} />}
//     />
//   </View>
// );

// // 2. Provider Card (The card design for providers)
// const ProviderCard = ({ item }) => {
//   const [isLoaded, setIsLoaded] = useState(false);
  
//   return (
//     <View style={styles.providerCard}>
//       {/* Image Section */}
//       <View style={styles.providerImageContainer}>
//         <Image
//           source={item.image}
//           style={styles.providerImage}
//           onLoadEnd={() => setIsLoaded(true)}
//         />
//          {/* Shimmer overlay until loaded */}
//          {!isLoaded && (
//             <ShimmerPlaceholder
//               style={StyleSheet.absoluteFillObject}
//               shimmerColors={['#E0F2F1', '#B2DFDB', '#E0F2F1']}
//             />
//          )}
//       </View>

//       {/* Content Section */}
//       <View style={styles.providerContent}>
//         <Text style={styles.providerName}>{item.name}</Text>
        
//         {/* Rating Row */}
//         <View style={styles.row}>
//           <Icon name="star" size={16} color="#FFB300" />
//           <Text style={styles.ratingText}>{item.rating} <Text style={styles.reviewText}>({item.reviews})</Text></Text>
//         </View>

//         {/* Location Row */}
//         <View style={styles.row}>
//           <Icon name="location-on" size={16} color="#757575" />
//           <Text style={styles.locationText}>{item.location}</Text>
//         </View>

//         {/* Experience */}
//         <Text style={styles.experienceText}>{item.experience}</Text>
//       </View>
//     </View>
//   );
// };

// // 3. Auto-Scrolling Banner Carousel
// const BannerCarousel = ({ data }) => {
//   const flatListRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     let timer;
//     if (data.length > 0) {
//        timer = setInterval(() => {
//         let nextIndex = currentIndex + 1;
//         if (nextIndex >= data.length) {
//           nextIndex = 0;
//         }
//         flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
//         setCurrentIndex(nextIndex);
//       }, 3000); // Scroll every 3 seconds
//     }
//     return () => clearInterval(timer);
//   }, [currentIndex, data.length]);

//   const onScroll = (event) => {
//      // Optional: specific logic on manual scroll to sync index
//      // keeping simple for now
//   };

//   return (
//     <View style={styles.carouselContainer}>
//       <FlatList
//         ref={flatListRef}
//         data={data}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.bannerWrapper}>
//             <Image source={item.image} style={styles.bannerImage} resizeMode="cover" />
//           </View>
//         )}
//         onMomentumScrollEnd={(event) => {
//             const index = Math.floor(event.nativeEvent.contentOffset.x / (width - 40));
//             setCurrentIndex(index);
//         }}
//       />
//       {/* Dots Indicator */}
//       <View style={styles.dotsContainer}>
//         {data.map((_, index) => (
//           <View
//             key={index}
//             style={[
//               styles.dot,
//               currentIndex === index ? styles.activeDot : styles.inactiveDot,
//             ]}
//           />
//         ))}
//       </View>
//     </View>
//   );
// };

// const SectionHeader = ({ title }) => (
//   <View style={styles.sectionHeader}>
//     <Text style={styles.sectionTitle}>{title}</Text>
//     <TouchableOpacity style={styles.viewAllBtn}>
//       <Text style={styles.viewAllText}>View All</Text>
//       <Icon name="arrow-forward" size={16} color="#097462" />
//     </TouchableOpacity>
//   </View>
// );

// // Reuse the Category/Service Card logic from before
// const CategoryItem = ({ name, imageSource }) => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   return (
//     <View style={styles.catWrapper}>
//       <View style={styles.catContainer}>
//         {imageSource && (
//           <Image
//             source={imageSource}
//             style={styles.realImage}
//             resizeMode="contain"
//             onLoadEnd={() => setIsLoaded(true)}
//           />
//         )}
//         {(!imageSource || !isLoaded) && (
//           <ShimmerPlaceholder
//             style={styles.absoluteShimmer}
//             shimmerColors={['#E0F2F1', '#B2DFDB', '#E0F2F1']}
//             visible={false}
//           />
//         )}
//       </View>
//       <Text style={styles.catText}>{name}</Text>
//     </View>
//   );
// };

// // =================================================
// // STYLES
// // =================================================

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   headerContainer: {
//     paddingBottom: 30,
//   },
//   headerContent: {
//     paddingHorizontal: 20,
//     paddingTop: 10,
//   },
//   topBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   userInfoContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   avatarPlaceholder: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   userTextContainer: {
//     justifyContent: 'center',
//   },
//   userName: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   locationRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   userLocation: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   headerIcons: {
//     flexDirection: 'row',
//     gap: 10,
//   },
//   iconButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 8,
//   },
//   searchContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//     height: 50,
//   },
//   searchIcon: {
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 15,
//     color: '#333',
//   },
//   bodyContainer: {
//     flex: 1,
//     backgroundColor: '#EBF7F5', // Slightly tinted background for the body as seen in 2nd image
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     marginTop: -20,
//     paddingTop: 25,
//     overflow: 'hidden', // Ensures content stays within rounded corners
//   },
//   scrollContent: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   viewAllBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   viewAllText: {
//     color: '#097462',
//     fontSize: 14,
//     fontWeight: '600',
//     marginRight: 4,
//   },
//   spacer: { height: 25 },
//   sectionSpacer: { height: 30 },
//   bannerSpacer: { height: 25 },

//   // Grid/Category Styles
//   gridContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   catWrapper: {
//     width: '23%', 
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   catContainer: {
//     width: '100%',
//     aspectRatio: 1, 
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 8,
//     borderWidth: 1,
//     borderColor: '#097462', // Tinted border
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   realImage: { width: '80%', height: '80%' },
//   absoluteShimmer: {
//     position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', zIndex: 1,
//   },
//   catText: {
//     fontSize: 12, fontWeight: '600', color: '#333', textAlign: 'center',
//   },

//   // --- NEW: Provider Card Styles ---
//   providerCard: {
//     width: width * 0.47, // Card width approx 65% of screen
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     marginRight: 15,
//     paddingBottom: 12,
//     // Android Shadow
//     elevation: 3,
//     // iOS Shadow
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     overflow: 'hidden', // needed for border radius with image
//   },
//   providerImageContainer: {
//     width: '100%',
//     height: 120,
//     backgroundColor: '#f0f0f0',
//   },
//   providerImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   providerContent: {
//     padding: 10,
//   },
//   providerName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 4,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   ratingText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
//     marginLeft: 4,
//   },
//   reviewText: {
//     fontWeight: 'normal',
//     color: '#757575',
//   },
//   locationText: {
//     fontSize: 12,
//     color: '#757575',
//     marginLeft: 4,
//   },
//   experienceText: {
//     fontSize: 12,
//     color: '#333',
//     fontWeight: '500',
//     marginTop: 4,
//   },

//   // --- NEW: Banner Styles ---
//   carouselContainer: {
//     alignItems: 'center',
//   },
//   bannerWrapper: {
//     width: width - 40, // Screen width minus padding
//     height: 150,
//     borderRadius: 12,
//     overflow: 'hidden',
//     marginRight: 0, // No margin right because paging calculates based on view width
//   },
//   bannerImage: {
//     width: '100%',
//     height: '100%',
//   },
//   dotsContainer: {
//     flexDirection: 'row',
//     marginTop: 10,
//     justifyContent: 'center',
//   },
//   dot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     marginHorizontal: 3,
//   },
//   activeDot: {
//     backgroundColor: '#097462',
//     width: 20, // Elongated active dot
//   },
//   inactiveDot: {
//     backgroundColor: '#ccc',
//   },
// });

// export default Home;

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   Platform,
//   Linking, // Import Linking
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import LinearGradient from 'react-native-linear-gradient';
// import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

// const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

// // --- Constants ---
// const COLORS = {
//   bg: '#F8F9FA',
//   darkGreen: '#0A5C4F',
//   brightGreen: '#00C853',
//   textDark: '#1A1A1A',
//   textGray: '#757575',
//   starYellow: '#FFB300',
//   cardBg: '#FFFFFF',
//   borderColor: '#E0E0E0',
// };

// // --- Mock Data ---
// const ENGINEERS_DATA = [
//   {
//     id: '1',
//     name: 'Sri Sai Civil Engineers',
//     rating: 4.8,
//     reviews: 127,
//     experience: '8+ years experience',
//     location: 'Kakinada, Sarpavaram',
//     image: 'https://img.freepik.com/free-photo/medium-shot-people-working-together_23-2149302194.jpg',
//     phone: '9876543210', // Use real numbers for testing
//   },
//   {
//     id: '2',
//     name: 'Prime Builders',
//     rating: 4.8,
//     reviews: 127,
//     experience: '10+ years experience',
//     location: 'Rajamundry, VL puram',
//     image: 'https://img.freepik.com/free-photo/architect-working-blueprints_23-2147710986.jpg',
//     phone: '9876543210',
//   },
// ];

// const ListViewOfEngineers = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   // --- ACTION HANDLERS ---

//  const handleCall = (phoneNumber) => {
//     // Clean string: remove everything except numbers and +
//     let phone = phoneNumber.replace(/[^\d+]/g, '');
    
//     // For your specific number 8019690743
//     if (!phone) {
//        Alert.alert("Error", "Invalid Phone Number");
//        return;
//     }

//     let url = '';
//     if (Platform.OS === 'android') {
//       url = `tel:${phone}`;
//     } else {
//       url = `telprompt:${phone}`;
//     }

//     // DIRECTLY OPEN URL (Skipping canOpenURL for dialer is safer)
//     Linking.openURL(url).catch((err) => {
//       console.error('Error opening dialer:', err);
//       Alert.alert('Error', 'Could not open the dialpad.');
//     });
//   };

//   // const handleWhatsApp = (phoneNumber) => {
//   //   let cleanNumber = 8019690743;
//   //   // let cleanNumber = phoneNumber.replace(/[^\d]/g, '');
    
//   //   // Ensure country code (default to 91 for India if missing)
//   //   if (cleanNumber.length === 10) {
//   //       cleanNumber = '91' + cleanNumber;
//   //   }

//   //   // The URL structure
//   //   let url = `whatsapp://send?phone=${cleanNumber}&text=Hello`;

//   //   // For WhatsApp, we DO check if it's installed
//   //   Linking.canOpenURL(url)
//   //     .then((supported) => {
//   //       if (supported) {
//   //         return Linking.openURL(url);
//   //       } else {
//   //         Alert.alert(
//   //           'WhatsApp not found', 
//   //           'Please install WhatsApp to use this feature.'
//   //         );
//   //       }
//   //     })
//   //     .catch((err) => console.error('An error occurred', err));
//   // };

//   const renderHeader = () => (
//     <View style={styles.headerContainer}>
//       <TouchableOpacity>
//         <Icon name="arrow-left" size={26} color={COLORS.textDark} />
//       </TouchableOpacity>
//       <Text style={styles.headerTitle}>Engineer</Text>
//       <TouchableOpacity>
//         <Icon name="tune-vertical" size={26} color={COLORS.darkGreen} />
//       </TouchableOpacity>
//     </View>
//   );

//   const ProviderCard = ({ item }) => (
//     <View style={styles.cardContainer}>
//       <View style={styles.cardTopRow}>
//         <Image source={{ uri: item.image }} style={styles.providerImage} />
//         <View style={styles.cardInfoContainer}>
//           <Text style={styles.providerName} numberOfLines={2}>{item.name}</Text>
//           <View style={styles.ratingRow}>
//             <Icon name="star" size={16} color={COLORS.starYellow} />
//             <Text style={styles.ratingText}>
//               {item.rating} <Text style={styles.reviewText}>({item.reviews})</Text>
//             </Text>
//           </View>
//           <Text style={styles.detailsText}>{item.experience}</Text>
//           <View style={styles.locationRow}>
//             <Icon name="map-marker-outline" size={16} color={COLORS.textGray} />
//             <Text style={styles.locationText} numberOfLines={1}>{item.location}</Text>
//           </View>
//         </View>
//       </View>

//       <View style={styles.cardBottomRow}>
//         <TouchableOpacity 
//           style={[styles.actionButton, styles.callButton]} 
//           onPress={() => handleCall(item.phone)} // LINKED HERE
//         >
//           <Icon name="phone" size={20} color="#fff" />
//           <Text style={styles.buttonText}>Call</Text>
//         </TouchableOpacity>

//         <TouchableOpacity 
//           style={[styles.actionButton, styles.whatsappButton]} 
//           onPress={() => handleWhatsApp(item.phone)} // LINKED HERE
//         >
//           <FontAwesome name="whatsapp" size={20} color="#fff" />
//           <Text style={styles.buttonText}>WhatsApp</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   const ShimmerCard = () => (
//     <View style={[styles.cardContainer, { height: 180 }]}>
//         <ShimmerPlaceholder style={styles.providerImage} />
//         <View style={{marginTop: 10}}>
//             <ShimmerPlaceholder style={{ width: '100%', height: 20, marginBottom: 10 }} />
//             <ShimmerPlaceholder style={{ width: '60%', height: 20 }} />
//         </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
//       <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
//       {renderHeader()}
//       <View style={styles.container}>
//         {loading ? (
//           <View style={{ padding: 16 }}>
//             <ShimmerCard /><ShimmerCard />
//           </View>
//         ) : (
//           <FlatList
//             data={ENGINEERS_DATA}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => <ProviderCard item={item} />}
//             contentContainerStyle={styles.listContent}
//           />
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   listContent: { padding: 16 },
//   headerContainer: {
//     flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
//     paddingHorizontal: 16, paddingVertical: 12, backgroundColor: COLORS.bg,
//   },
//   headerTitle: { fontSize: 20, fontWeight: '700', color: COLORS.textDark, marginLeft: -30 },
//   cardContainer: {
//     backgroundColor: COLORS.cardBg, borderRadius: 12, padding: 12, marginBottom: 16,
//     borderWidth: 1, borderColor: COLORS.borderColor, elevation: 2,
//   },
//   cardTopRow: { flexDirection: 'row', marginBottom: 16 },
//   providerImage: { width: 80, height: 80, borderRadius: 8, backgroundColor: '#E0E0E0' },
//   cardInfoContainer: { flex: 1, marginLeft: 12, justifyContent: 'space-between' },
//   providerName: { fontSize: 16, fontWeight: '700', color: COLORS.textDark },
//   ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
//   ratingText: { fontSize: 14, fontWeight: '600', color: COLORS.textDark, marginLeft: 4 },
//   reviewText: { color: COLORS.textGray, fontWeight: '400' },
//   detailsText: { fontSize: 13, fontWeight: '500', color: COLORS.textDark, marginTop: 4 },
//   locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
//   locationText: { fontSize: 13, color: COLORS.textGray, marginLeft: 4, flex: 1 },
//   cardBottomRow: { flexDirection: 'row', justifyContent: 'space-between' },
//   actionButton: {
//     flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
//     paddingVertical: 10, borderRadius: 8, flex: 0.48,
//   },
//   callButton: { backgroundColor: COLORS.darkGreen },
//   whatsappButton: { backgroundColor: COLORS.brightGreen },
//   buttonText: { color: '#fff', fontSize: 16, fontWeight: '600', marginLeft: 8 },
// });

// export default ListViewOfEngineers;

// import React, { useState, useRef } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   Linking,
//   Platform,
//   StatusBar,
//   SafeAreaView,
//   Dimensions
// } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import LinearGradient from 'react-native-linear-gradient';

// // --- Constants ---
// const COLORS = {
//   // Gradient colors are handled inline, but keeping these for reference
//   gradientStart: '#003D33',
//   gradientMid: '#045749',
//   gradientEnd: '#097462',
  
//   secondary: '#e0f2f1', // Light Green
//   textDark: '#1a1a1a',
//   textGray: '#757575',
//   textLight: '#ffffff',
//   starYellow: '#ffc107',
//   divider: '#eeeeee',
//   background: '#ffffff',
//   bgGray: '#f5f5f5',
// };

// const FONTS = {
//   regular: 'SF-Pro-Display-Regular',
//   medium: 'SF-Pro-Display-Medium',
//   semibold: 'SF-Pro-Display-Semibold',
//   bold: 'SF-Pro-Display-Bold',
// };

// // --- Mock Data ---
// const companyData = {
//   name: 'Mahesh Structural Engineers',
//   experience: '10+ years experience',
//   location: 'Amalapuram, RTC Complex',
//   rating: 4.8,
//   reviewCount: 127,
//   phoneNumber: '9487492741',
//   whatsappNumber: '9487492741',
//   website: 'https://example.com',
//   profileImage: 'https://via.placeholder.com/150',
// };

// const overviewData = {
//   aboutUs:
//     'Ramesh Professional Painters is a trusted painting service with over 10+ years of experience in residential and commercial painting. Quality finish, clean work, and on-time delivery are our strengths.',
//   address: '4/178 VL puram Rajamundry, East godavari, Andhrapradesh, India',
//   timings: 'Mon - Sat: 9:00 AM - 7:00 PM',
//   yearOfStarting: '2015',
//   contactPerson: 'Ramesh',
//   contact: '91+ 9487492741',
//   services: [
//     'Interior Wall Painting',
//     'Exterior Painting',
//     'Texture & Stencil Work',
//     'Wood Polishing',
//     'Waterproofing',
//   ],
// };

// const reviewsData = {
//   averageRating: 4.0,
//   totalReviews: 52,
//   reviews: [
//     {
//       id: 1,
//       name: 'Narayana',
//       rating: 4,
//       time: '2 mins ago',
//       comment: 'Fast work and decent finish',
//     },
//     {
//       id: 2,
//       name: 'Nareesh',
//       rating: 4,
//       time: '2 mins ago',
//       comment: 'Very helpful and explained color options clearly',
//     },
//     {
//       id: 3,
//       name: 'Sathish',
//       rating: 5,
//       time: '2 mins ago',
//       comment: '',
//     },
//     {
//         id: 4,
//         name: 'Kumar',
//         rating: 5,
//         time: '1 day ago',
//         comment: 'Excellent service!',
//       },
//   ],
// };

// // --- Components ---

// const Header = () => {
//   const openDialer = () => {
//     Linking.openURL(`tel:${companyData.phoneNumber}`);
//   };

//   const openWhatsApp = () => {
//     let url = `whatsapp://send?phone=91${companyData.whatsappNumber}`;
//     Linking.openURL(url).catch(() => {
//       alert('Make sure WhatsApp is installed on your device');
//     });
//   };

//   const openWebsite = () => {
//     Linking.openURL(companyData.website);
//   };

//   return (
//     // Updated with Linear Gradient
//     <LinearGradient
//         colors={['rgba(9, 116, 98, 1)', 'rgba(4, 87, 73, 1)', 'rgba(0, 61, 51, 1)3']}
//         // colors={['#003D33', '#045749', '#097462']}
//         start={{x: 0, y: 0}}
//         end={{x: 0, y: 1.5}}
//         style={styles.headerContainer}
//     >
//       <SafeAreaView>
//         <View style={styles.headerTopBar}>
//           <TouchableOpacity>
//             <Feather name="arrow-left" size={24} color={COLORS.textLight} />
//           </TouchableOpacity>
//           <View style={styles.headerActions}>
//             <TouchableOpacity style={styles.headerActionButton}>
//               <Feather name="bookmark" size={20} color={COLORS.textLight} />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.headerActionButton}>
//               <Feather name="share-2" size={20} color={COLORS.textLight} />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <View style={styles.headerContent}>
//           <Image
//             source={{ uri: companyData.profileImage }}
//             style={styles.profileImage}
//           />
//           <View style={styles.companyInfo}>
//             <Text style={styles.companyName}>{companyData.name}</Text>
//             <Text style={styles.companyDetail}>{companyData.experience}</Text>
//             <View style={styles.locationContainer}>
//               <Feather name="map-pin" size={14} color={COLORS.textLight} />
//               <Text style={styles.companyDetail}> {companyData.location}</Text>
//             </View>
//             <View style={styles.ratingContainer}>
//               <FontAwesome name="star" size={14} color={COLORS.starYellow} />
//               <Text style={styles.ratingText}>
//                 {companyData.rating} ({companyData.reviewCount})
//               </Text>
//             </View>
//           </View>
//         </View>
//         <View style={styles.contactActions}>
//           <TouchableOpacity style={styles.contactButton} onPress={openDialer}>
//             <Feather name="phone" size={20} color={COLORS.textLight} />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.contactButton, styles.whatsappButton]}
//             onPress={openWhatsApp}
//           >
//             <FontAwesome name="whatsapp" size={20} color={COLORS.textLight} />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.contactButton} onPress={openWebsite}>
//             <Feather name="globe" size={20} color={COLORS.textLight} />
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     </LinearGradient>
//   );
// };

// const Tabs = ({ activeTab, onTabPress }) => {
//   const tabs = ['Overview', 'Business Details', 'Reviews'];
//   return (
//     <View style={styles.tabsContainer}>
//       {tabs.map((tab) => (
//         <TouchableOpacity
//           key={tab}
//           style={[styles.tab, activeTab === tab && styles.activeTab]}
//           onPress={() => onTabPress(tab)}
//         >
//           <Text
//             style={[styles.tabText, activeTab === tab && styles.activeTabText]}
//           >
//             {tab}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// const InfoRow = ({ label, value }) => (
//   <View style={styles.infoRow}>
//     <Text style={styles.infoLabel}>{label}</Text>
//     <Text style={styles.infoValue}>{value}</Text>
//   </View>
// );

// // --- Main Screen ---
// const BusinessProfileScreen = () => {
//   const [activeTab, setActiveTab] = useState('Overview');
//   const scrollViewRef = useRef(null);
  
//   // State to store Y positions of sections
//   const [sectionPositions, setSectionPositions] = useState({
//     Overview: 0,
//     'Business Details': 0,
//     Reviews: 0,
//   });

//   // Handler to capture Y position of each section
//   const handleLayout = (sectionName, event) => {
//     const layout = event.nativeEvent.layout;
//     setSectionPositions((prev) => ({
//       ...prev,
//       [sectionName]: layout.y,
//     }));
//   };

//   // Function to scroll to section
//   const handleTabPress = (tab) => {
//     setActiveTab(tab);
//     const yPos = sectionPositions[tab];
//     if (scrollViewRef.current && yPos !== undefined) {
//       scrollViewRef.current.scrollTo({
//         y: yPos,
//         animated: true,
//       });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#003D33" barStyle="light-content" />
//       <Header />
//       <Tabs activeTab={activeTab} onTabPress={handleTabPress} />
      
//       <ScrollView 
//         ref={scrollViewRef}
//         style={styles.scrollContainer}
//         contentContainerStyle={{ paddingBottom: 40 }}
//         showsVerticalScrollIndicator={false}
//         // Update active tab while scrolling manually (Optional, simplified for now)
//       >
        
//         {/* --- SECTION 1: OVERVIEW (About Us) --- */}
//         <View 
//             onLayout={(e) => handleLayout('Overview', e)}
//             style={styles.sectionContainer}
//         >
//             <View style={styles.sectionHeaderContainer}>
//                 <View style={styles.sectionHeader}>
//                     <Text style={styles.sectionTitle}>Radiant Walls</Text>
//                     <View style={styles.locationContainer}>
//                         <Feather name="map-pin" size={14} color={COLORS.textGray} />
//                         <Text style={styles.sectionLocation}> Rajamundry</Text>
//                     </View>
//                 </View>
//                 <Text style={styles.sectionSubtitle}>10+ Years Experience</Text>
//             </View>

//             <View style={styles.card}>
//                 <Text style={styles.cardTitle}>About US</Text>
//                 <Text style={styles.cardContent}>{overviewData.aboutUs}</Text>
//             </View>
            
//             {/* Services also sit nicely in Overview typically */}
//             <View style={styles.card}>
//                 <Text style={styles.cardTitle}>Services Offered</Text>
//                 {overviewData.services.map((service, index) => (
//                 <View key={index} style={styles.serviceItem}>
//                     <Text style={styles.serviceText}>{service}</Text>
//                 </View>
//                 ))}
//             </View>
//         </View>

//         {/* --- SECTION 2: BUSINESS DETAILS (Address & Info) --- */}
//         <View 
//             onLayout={(e) => handleLayout('Business Details', e)}
//             style={styles.sectionContainer}
//         >
//             <View style={styles.card}>
//                 <Text style={styles.cardTitle}>Business Details</Text>
//                 <InfoRow label="Address" value={overviewData.address} />
//                 <InfoRow label="Timings" value={overviewData.timings} />
//                 <InfoRow label="Year of Starting" value={overviewData.yearOfStarting} />
//                 <InfoRow label="Contact Person Name" value={overviewData.contactPerson} />
//                 <InfoRow label="Contact" value={overviewData.contact} />
//             </View>
//         </View>

//         {/* --- SECTION 3: REVIEWS --- */}
//         <View 
//             onLayout={(e) => handleLayout('Reviews', e)}
//             style={styles.sectionContainer}
//         >
//              <View style={styles.reviewSummaryCard}>
//                 <View style={styles.reviewSummaryHeader}>
//                     <Text style={styles.averageRating}>
//                         {reviewsData.averageRating.toFixed(1)}
//                     </Text>
//                     <Text style={styles.totalReviews}>
//                         {reviewsData.totalReviews} Reviews
//                     </Text>
//                 </View>
//                 <View style={styles.starsContainer}>
//                     {[...Array(5)].map((_, i) => (
//                     <FontAwesome
//                         key={i}
//                         name={
//                         i < Math.floor(reviewsData.averageRating)
//                             ? 'star'
//                             : i < reviewsData.averageRating
//                             ? 'star-half-empty'
//                             : 'star-o'
//                         }
//                         size={20}
//                         color={COLORS.starYellow}
//                         style={styles.starIcon}
//                     />
//                     ))}
//                 </View>
//                 <TouchableOpacity style={styles.addReviewButton}>
//                     <Text style={styles.addReviewButtonText}>Add Review & Rating</Text>
//                 </TouchableOpacity>
//             </View>

//             <View style={styles.reviewsList}>
//                 {reviewsData.reviews.map((review) => (
//                 <View key={review.id} style={styles.reviewItem}>
//                     <View style={styles.reviewerHeader}>
//                     <View style={styles.reviewerAvatar}>
//                         <MaterialIcons name="person" size={24} color={COLORS.textGray} />
//                     </View>
//                     <View>
//                         <Text style={styles.reviewerName}>{review.name}</Text>
//                         <View style={styles.reviewRatingContainer}>
//                         {[...Array(5)].map((_, i) => (
//                             <FontAwesome
//                             key={i}
//                             name={i < review.rating ? 'star' : 'star-o'}
//                             size={14}
//                             color={COLORS.starYellow}
//                             style={styles.smallStarIcon}
//                             />
//                         ))}
//                         <Text style={styles.reviewTime}>{review.time}</Text>
//                         </View>
//                     </View>
//                     </View>
//                     {review.comment ? (
//                     <Text style={styles.reviewComment}>{review.comment}</Text>
//                     ) : null}
//                 </View>
//                 ))}
//             </View>
//         </View>

//       </ScrollView>
//     </View>
//   );
// };

// // --- Styles ---
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.bgGray,
//   },
//   headerContainer: {
//     paddingHorizontal: 16,
//     paddingBottom: 20,
//     // Background color is now handled by LinearGradient props
//   },
//   headerTopBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: Platform.OS === 'android' ? 16 : 0,
//   },
//   headerActions: {
//     flexDirection: 'row',
//   },
//   headerActionButton: {
//     marginLeft: 16,
//     padding: 8,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//   },
//   headerContent: {
//     flexDirection: 'row',
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   profileImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     borderWidth: 2,
//     borderColor: COLORS.textLight,
//   },
//   companyInfo: {
//     marginLeft: 16,
//     flex: 1,
//   },
//   companyName: {
//     fontFamily: FONTS.bold,
//     fontSize: 18,
//     color: COLORS.textLight,
//   },
//   companyDetail: {
//     fontFamily: FONTS.regular,
//     fontSize: 14,
//     color: COLORS.textLight,
//     marginTop: 4,
//   },
//   locationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 4,
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   ratingText: {
//     fontFamily: FONTS.medium,
//     fontSize: 14,
//     color: COLORS.textLight,
//     marginLeft: 4,
//   },
//   contactActions: {
//     flexDirection: 'row',
//     marginTop: 20,
//     justifyContent: 'flex-start',
//   },
//   contactButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 16,
//   },
//   whatsappButton: {
//     backgroundColor: '#25D366', // WhatsApp color
//   },
//   tabsContainer: {
//     flexDirection: 'row',
//     backgroundColor: COLORS.background,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.divider,
//     elevation: 2, // Shadow for android
//     shadowColor: '#000', // Shadow for iOS
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     zIndex: 1,
//   },
//   tab: {
//     flex: 1,
//     paddingVertical: 16,
//     alignItems: 'center',
//   },
//   activeTab: {
//     borderBottomWidth: 2,
//     borderBottomColor: '#097462', // Using one of the gradient colors for active tab
//   },
//   tabText: {
//     fontFamily: FONTS.medium,
//     fontSize: 14,
//     color: COLORS.textGray,
//   },
//   activeTabText: {
//     color: '#097462',
//     fontFamily: FONTS.semibold,
//   },
//   scrollContainer: {
//     flex: 1,
//     backgroundColor: COLORS.bgGray,
//   },
//   sectionContainer: {
//       marginBottom: 10,
//   },
//   sectionHeaderContainer: {
//     backgroundColor: COLORS.background,
//     padding: 16,
//     marginBottom: 10,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   sectionTitle: {
//     fontFamily: FONTS.bold,
//     fontSize: 18,
//     color: COLORS.textDark,
//   },
//   sectionLocation: {
//     fontFamily: FONTS.regular,
//     fontSize: 14,
//     color: COLORS.textGray,
//   },
//   sectionSubtitle: {
//     fontFamily: FONTS.medium,
//     fontSize: 14,
//     color: '#097462',
//     marginTop: 4,
//   },
//   card: {
//     backgroundColor: COLORS.background,
//     padding: 16,
//     marginBottom: 10,
//   },
//   cardTitle: {
//     fontFamily: FONTS.semibold,
//     fontSize: 16,
//     color: COLORS.textDark,
//     marginBottom: 12,
//   },
//   cardContent: {
//     fontFamily: FONTS.regular,
//     fontSize: 14,
//     color: COLORS.textGray,
//     lineHeight: 20,
//   },
//   infoRow: {
//     marginBottom: 12,
//   },
//   infoLabel: {
//     fontFamily: FONTS.medium,
//     fontSize: 14,
//     color: COLORS.textDark,
//     marginBottom: 4,
//   },
//   infoValue: {
//     fontFamily: FONTS.regular,
//     fontSize: 14,
//     color: COLORS.textGray,
//   },
//   serviceItem: {
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.divider,
//   },
//   serviceText: {
//     fontFamily: FONTS.regular,
//     fontSize: 14,
//     color: COLORS.textDark,
//   },
//   reviewSummaryCard: {
//     backgroundColor: COLORS.secondary,
//     padding: 16,
//     margin: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   reviewSummaryHeader: {
//     flexDirection: 'row',
//     alignItems: 'baseline',
//   },
//   averageRating: {
//     fontFamily: FONTS.bold,
//     fontSize: 32,
//     color: COLORS.textDark,
//   },
//   totalReviews: {
//     fontFamily: FONTS.medium,
//     fontSize: 14,
//     color: COLORS.textGray,
//     marginLeft: 8,
//   },
//   starsContainer: {
//     flexDirection: 'row',
//     marginTop: 8,
//     marginBottom: 16,
//   },
//   starIcon: {
//     marginHorizontal: 2,
//   },
//   addReviewButton: {
//     backgroundColor: '#097462', // Using gradient color
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 4,
//     width: '100%',
//     alignItems: 'center',
//   },
//   addReviewButtonText: {
//     fontFamily: FONTS.semibold,
//     fontSize: 14,
//     color: COLORS.textLight,
//   },
//   reviewsList: {
//     backgroundColor: COLORS.background,
//     padding: 16,
//   },
//   reviewItem: {
//     marginBottom: 20,
//   },
//   reviewerHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   reviewerAvatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#e0e0e0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   reviewerName: {
//     fontFamily: FONTS.medium,
//     fontSize: 14,
//     color: COLORS.textDark,
//   },
//   reviewRatingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 2,
//   },
//   smallStarIcon: {
//     marginRight: 2,
//   },
//   reviewTime: {
//     fontFamily: FONTS.regular,
//     fontSize: 12,
//     color: COLORS.textGray,
//     marginLeft: 8,
//   },
//   reviewComment: {
//     fontFamily: FONTS.regular,
//     fontSize: 14,
//     color: COLORS.textGray,
//     lineHeight: 20,
//   },
// });

// export default BusinessProfileScreen;
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   SafeAreaView,
//   StatusBar,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';

// // Define fonts (ensure these are linked in your project)
// const FONTS = {
//   regular: 'SF-Pro-Display-Regular',
//   medium: 'SF-Pro-Display-Medium',
//   semibold: 'SF-Pro-Display-Semibold',
//   bold: 'SF-Pro-Display-Bold',
// };

// // Define colors from the design
// const COLORS = {
//   primary: '#097462', // Green used for button and stars
//   textDark: '#1A1A1A',
//   textLight: '#757575',
//   borderColor: '#E0E0E0',
//   background: '#FFFFFF',
// };

// const AddReviewScreen = () => {
//   const [rating, setRating] = useState(0);
//   const [reviewText, setReviewText] = useState('');

//   // Function to handle star rating selection
//   const handleRating = (selectedRating) => {
//     // If the selected star is already the current rating, deselect it
//     if (rating === selectedRating) {
//       setRating(selectedRating - 1);
//     } else {
//       setRating(selectedRating);
//     }
//   };

//   const handleSubmit = () => {
//     console.log('Rating:', rating);
//     console.log('Review:', reviewText);
//     // Add logic to submit the review to your backend
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.container}
//       >
//         <ScrollView contentContainerStyle={styles.scrollContent}>
//           {/* Header */}
//           <View style={styles.header}>
//             <TouchableOpacity style={styles.backButton}>
//               <Icon name="arrow-left" size={24} color={COLORS.textDark} />
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>Add Review & Rating</Text>
//           </View>

//           {/* Tap to Rate Section */}
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Tap to Rate</Text>
//             <View style={styles.ratingContainer}>
//               {[1, 2, 3, 4, 5].map((starValue) => (
//                 <TouchableOpacity
//                   key={starValue}
//                   onPress={() => handleRating(starValue)}
//                   style={styles.starButton}
//                 >
//                   <Icon
//                     name="star"
//                     size={40}
//                     // Use a filled star for rated, and an outline for unrated.
//                     // Adjusting the icon name based on the library you are using.
//                     // For Feather, 'star' is outline. We need a filled star icon from another set
//                     // or use a library like react-native-vector-icons/FontAwesome
//                     color={starValue <= rating ? COLORS.primary : COLORS.borderColor}
//                     // You might need to change the icon name to something like 'star-fill'
//                     // if your icon set supports it for a filled look.
//                     // For this example, I'm using color to show selection.
//                     // If you need a filled star, consider using FontAwesome or MaterialIcons.
//                   />
//                   {/* Overlapping Filled Star for demonstration (if your icon set requires it) */}
//                   {starValue <= rating && (
//                      <View style={{position: 'absolute'}}>
//                         <Icon name="star" size={40} color={COLORS.primary} style={{ opacity: 0.2 }} />
//                      </View>
//                   )}
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>

//           {/* Tell Us More Section */}
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Tell Us More ( optional)</Text>
//             <TextInput
//               style={styles.textInput}
//               multiline
//               placeholder="Why this rating?"
//               placeholderTextColor={COLORS.textLight}
//               value={reviewText}
//               onChangeText={setReviewText}
//               textAlignVertical="top"
//             />
//           </View>
//         </ScrollView>

//         {/* Submit Button */}
//         <View style={styles.footer}>
//           <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//             <Text style={styles.submitButtonText}>Submit</Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   container: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 16,
//   },
//   backButton: {
//     marginRight: 16,
//   },
//   headerTitle: {
//     fontFamily: FONTS.bold,
//     fontSize: 20,
//     color: COLORS.textDark,
//     flex: 1, // To ensure the title is centered if there's an action on the right
//   },
//   section: {
//     marginTop: 24,
//   },
//   sectionTitle: {
//     fontFamily: FONTS.semibold,
//     fontSize: 16,
//     color: COLORS.textDark,
//     marginBottom: 12,
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     paddingVertical: 24,
//     backgroundColor: '#F9F9F9', // Light background for the rating box
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: COLORS.borderColor,
//   },
//   starButton: {
//     marginHorizontal: 8,
//   },
//   textInput: {
//     height: 150,
//     borderWidth: 1,
//     borderColor: COLORS.borderColor,
//     borderRadius: 12,
//     padding: 16,
//     fontFamily: FONTS.regular,
//     fontSize: 16,
//     color: COLORS.textDark,
//     backgroundColor: '#F9F9F9',
//   },
//   footer: {
//     padding: 20,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.borderColor,
//   },
//   submitButton: {
//     backgroundColor: COLORS.primary,
//     borderRadius: 8,
//     paddingVertical: 16,
//     alignItems: 'center',
//   },
//   submitButtonText: {
//     fontFamily: FONTS.semibold,
//     fontSize: 16,
//     color: COLORS.background,
//   },
// });

// export default AddReviewScreen;
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   FlatList,
//   Image,
//   Dimensions,
//   SafeAreaView,
//   StatusBar,
//   Platform,
// } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';

// const { width } = Dimensions.get('window');
// const cardWidth = (width - 32 - 16) / 2; 

// const FONTS = {
//   regular: 'SF-Pro-Display-Regular',
//   medium: 'SF-Pro-Display-Medium',
//   semibold: 'SF-Pro-Display-Semibold',
//   bold: 'SF-Pro-Display-Bold',
// };

// const COLORS = {
//   primary: '#097462',
//   textDark: '#1A1A1A',
//   textGray: '#757575',
//   background: '#FFFFFF',
//   cardBorder: '#E0E0E0',
//   chipBg: '#FFFFFF',
// };

// const filterChips = ['All', 'Engineer', 'Painting'];

// // 1. UPDATE: Using require for local images
// // Ensure these files exist in your 'assets' folder
// const ideasData = [
//   {
//     id: '1',
//     title: 'Structural Engineer',
//     image: require('../assets/idea.png'), 
//   },
//   {
//     id: '2',
//     title: 'Elite Civil & Design...',
//     image: require('../assets/idea1.png'),
//   },
//   {
//     id: '3',
//     title: 'Mahesh Structural...',
//     image: require('../assets/idea2.png'),
//   },
//   {
//     id: '4',
//     title: 'Structural Engineer',
//     image: require('../assets/idea1.png'),
//   },
// ];

// const IdeasScreen = () => {
//   const [selectedFilter, setSelectedFilter] = useState('All');

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       {/* 2. UPDATE: Pass item.image directly to source for local assets */}
//       <Image 
//         source={item.image} 
//         style={styles.cardImage} 
//         resizeMode="cover" 
//       />
//       <View style={styles.cardTextContainer}>
//         <Text style={styles.cardTitle} numberOfLines={1}>
//           {item.title}
//         </Text>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
//       <View style={styles.container}>
//         {/* Header Section */}
//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>Ideas</Text>
//           <TouchableOpacity style={styles.addButton}>
//             <Feather name="plus" size={20} color={COLORS.background} style={styles.plusIcon} />
//             <Text style={styles.addButtonText}>Add Idea</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Filter Chips Section */}
//         <View style={styles.chipsContainer}>
//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             {filterChips.map((chip) => (
//               <TouchableOpacity
//                 key={chip}
//                 style={[
//                   styles.chip,
//                   selectedFilter === chip && styles.selectedChip,
//                 ]}
//                 onPress={() => setSelectedFilter(chip)}
//               >
//                 <Text
//                   style={[
//                     styles.chipText,
//                     selectedFilter === chip && styles.selectedChipText,
//                   ]}
//                 >
//                   {chip}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>

//         {/* Ideas Grid Section */}
//         <FlatList
//           data={ideasData}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id}
//           numColumns={2}
//           columnWrapperStyle={styles.columnWrapper}
//           contentContainerStyle={styles.gridContent}
//           showsVerticalScrollIndicator={false}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     padding: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//     marginTop: Platform.OS === 'android' ? 10 : 0,
//   },
//   headerTitle: {
//     fontFamily: FONTS.bold,
//     fontSize: 24,
//     color: COLORS.textDark,
//   },
//   addButton: {
//     flexDirection: 'row',
//     backgroundColor: COLORS.primary,
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   plusIcon: {
//     marginRight: 8,
//   },
//   addButtonText: {
//     fontFamily: FONTS.semibold,
//     fontSize: 16,
//     color: COLORS.background,
//   },
//   chipsContainer: {
//     marginBottom: 20,
//   },
//   chip: {
//     paddingVertical: 8,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: COLORS.cardBorder,
//     backgroundColor: COLORS.chipBg,
//     marginRight: 10,
//   },
//   selectedChip: {
//     backgroundColor: COLORS.primary,
//     borderColor: COLORS.primary,
//   },
//   chipText: {
//     fontFamily: FONTS.medium,
//     fontSize: 14,
//     color: COLORS.textDark,
//   },
//   selectedChipText: {
//     color: COLORS.background,
//   },
//   gridContent: {
//     paddingBottom: 16,
//   },
//   columnWrapper: {
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   card: {
//     width: cardWidth,
//     backgroundColor: COLORS.background,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: COLORS.cardBorder,
//     overflow: 'hidden',
//   },
//   cardImage: {
//     width: '100%',
//     height: 160,
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//   },
//   cardTextContainer: {
//     padding: 12,
//     alignItems: 'center',
//     borderBottomLeftRadius: 12,
//     borderBottomRightRadius: 12,
//   },
//   cardTitle: {
//     fontFamily: FONTS.semibold,
//     fontSize: 14,
//     color: COLORS.textDark,
//     textAlign: 'center',
//   },
// });

// export default IdeasScreen;
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
//   StatusBar,
//   Platform,
//   Alert,
//   Image,
//   KeyboardAvoidingView,
// } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import { Dropdown } from 'react-native-element-dropdown';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// // --- Constants ---
// const COLORS = {
//   primary: 'rgba(4, 87, 73, 1)', // Green color for button and back arrow
//   textDark: '#1A1A1A', // Dark text color for labels and titles
//   textGray: '#757575', // Gray text color for placeholders
//   background: '#FFFFFF', // White background
//   borderColor: '#E0E0E0', // Light gray border for inputs
//   inputBg: '#FFFFFF', // White background for inputs
// };

// // Ensure these fonts are linked in your project
// const FONTS = {
//   regular: 'SF-Pro-Display-Regular',
//   medium: 'SF-Pro-Display-Medium',
//   semibold: 'SF-Pro-Display-Semibold',
//   bold: 'SF-Pro-Display-Bold',
// };

// // Mock data for the dropdown categories
// const categories_data = [
//   { label: 'Engineer', value: 'engineer' },
//   { label: 'Painting', value: 'painting' },
//   { label: 'Plumbing', value: 'plumbing' },
//   { label: 'Electrical', value: 'electrical' },
//   { label: 'Carpentry', value: 'carpentry' },
// ];

// const AddIdeaScreen = () => {
//   // --- State for form fields ---
//   const [name, setName] = useState('');
//   const [estimationCost, setEstimationCost] = useState('');
//   const [category, setCategory] = useState(null);
//   const [height, setHeight] = useState('');
//   const [width, setWidth] = useState('');
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [isFocus, setIsFocus] = useState(false);

//   // --- Handlers ---

//   // Handle file upload (Camera or Gallery)
//   const handleUpload = () => {
//     Alert.alert(
//       'Upload Media',
//       'Choose an option',
//       [
//         {
//           text: 'Camera',
//           onPress: () => launchCamera({ mediaType: 'mixed' }, handleImageResponse),
//         },
//         {
//           text: 'Gallery',
//           onPress: () => launchImageLibrary({ mediaType: 'mixed' }, handleImageResponse),
//         },
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//       ],
//       { cancelable: true }
//     );
//   };

//   // Process image picker response
//   const handleImageResponse = (response) => {
//     if (response.didCancel) {
//       console.log('User cancelled image picker');
//     } else if (response.error) {
//       console.log('ImagePicker Error: ', response.error);
//     } else if (response.assets && response.assets.length > 0) {
//       // Get the first selected asset
//       const asset = response.assets[0];
//       setUploadedFile(asset);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = () => {
//     const formData = {
//       name,
//       estimationCost,
//       category,
//       size: { height, width },
//       uploadedFile,
//     };
//     console.log('Form Data Submitted:', formData);
//     // Add your submission logic here (e.g., API call)
//     Alert.alert('Success', 'Idea added successfully!');
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.container}
//       >
//         <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
//           {/* --- Header --- */}
//           <View style={styles.header}>
//             <TouchableOpacity style={styles.backButton}>
//               <Feather name="arrow-left" size={24} color={COLORS.textDark} />
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>Add Idea</Text>
//           </View>

//           {/* --- Form Fields --- */}
//           <View style={styles.formContainer}>
            
//             {/* Name Input */}
//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Name</Text>
//               <TextInput
//                 style={styles.input}
//                 value={name}
//                 onChangeText={setName}
//                 placeholderTextColor={COLORS.textGray}
//               />
//             </View>

//             {/* Estimation Cost Input */}
//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Estimation Cost</Text>
//               <TextInput
//                 style={styles.input}
//                 value={estimationCost}
//                 onChangeText={setEstimationCost}
//                 keyboardType="numeric"
//                 placeholderTextColor={COLORS.textGray}
//               />
//             </View>

//             {/* Category Dropdown */}
//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Category</Text>
//               <Dropdown
//                 style={[styles.dropdown, isFocus && { borderColor: COLORS.primary }]}
//                 placeholderStyle={styles.placeholderStyle}
//                 selectedTextStyle={styles.selectedTextStyle}
//                 inputSearchStyle={styles.inputSearchStyle}
//                 iconStyle={styles.iconStyle}
//                 data={categories_data}
//                 search
//                 maxHeight={300}
//                 labelField="label"
//                 valueField="value"
//                 placeholder={!isFocus ? 'Select Category' : '...'}
//                 searchPlaceholder="Search..."
//                 value={category}
//                 onFocus={() => setIsFocus(true)}
//                 onBlur={() => setIsFocus(false)}
//                 onChange={item => {
//                   setCategory(item.value);
//                   setIsFocus(false);
//                 }}
//                 renderRightIcon={() => (
//                   <Feather name="chevron-down" size={20} color={COLORS.textGray} />
//                 )}
//               />
//             </View>

//             {/* Size Inputs (Height & Width) */}
//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Size</Text>
//               <View style={styles.sizeContainer}>
//                 <View style={styles.sizeInputWrapper}>
//                   <Text style={styles.subLabel}>Height</Text>
//                   <TextInput
//                     style={styles.input}
//                     value={height}
//                     onChangeText={setHeight}
//                     keyboardType="numeric"
//                     placeholderTextColor={COLORS.textGray}
//                   />
//                 </View>
//                 <View style={styles.sizeSpacer} />
//                 <View style={styles.sizeInputWrapper}>
//                   <Text style={styles.subLabel}>Width</Text>
//                   <TextInput
//                     style={styles.input}
//                     value={width}
//                     onChangeText={setWidth}
//                     keyboardType="numeric"
//                     placeholderTextColor={COLORS.textGray}
//                   />
//                 </View>
//               </View>
//             </View>

//             {/* Upload File Section */}
//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Upload File</Text>
//               <TouchableOpacity style={styles.uploadContainer} onPress={handleUpload}>
//                 {uploadedFile ? (
//                   <View style={styles.uploadedFilePreview}>
//                     {uploadedFile.type?.startsWith('image') ? (
//                       <Image source={{ uri: uploadedFile.uri }} style={styles.previewImage} resizeMode="cover" />
//                     ) : (
//                       <View style={styles.videoPlaceholder}>
//                         <Feather name="video" size={40} color={COLORS.primary} />
//                         <Text style={styles.uploadText} numberOfLines={1}>
//                           {uploadedFile.fileName || 'Video selected'}
//                         </Text>
//                       </View>
//                     )}
//                   </View>
//                 ) : (
//                   <>
//                     <Feather name="upload" size={32} color={COLORS.textGray} style={styles.uploadIcon} />
//                     <Text style={styles.uploadText}>upload Images or Video</Text>
//                   </>
//                 )}
//               </TouchableOpacity>
//             </View>

//           </View>
//         </ScrollView>

//         {/* --- Submit Button --- */}
//         <View style={styles.footer}>
//           <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//             <Text style={styles.submitButtonText}>Add Idea</Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   container: {
//     flex: 1,
//   },
//   scrollContent: {
//     padding: 20,
//     paddingBottom: 100, // Add padding for the footer button
//   },
//   // Header Styles
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 24,
//     marginTop: Platform.OS === 'android' ? 10 : 0,
//   },
//   backButton: {
//     marginRight: 16,
//   },
//   headerTitle: {
//     fontFamily: FONTS.bold,
//     fontSize: 20,
//     color: COLORS.textDark,
//   },
//   // Form Styles
//   formContainer: {
//     flex: 1,
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   label: {
//     fontFamily: FONTS.medium,
//     fontSize: 14,
//     color: COLORS.textDark,
//     marginBottom: 8,
//   },
//   subLabel: {
//     fontFamily: FONTS.regular,
//     fontSize: 14,
//     color: COLORS.textDark,
//     marginBottom: 8,
//   },
//   input: {
//     backgroundColor: COLORS.inputBg,
//     borderWidth: 1,
//     borderColor: COLORS.borderColor,
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     fontFamily: FONTS.regular,
//     fontSize: 14,
//     color: COLORS.textDark,
//   },
//   // Dropdown Styles
//  dropdown: {
//     height: 50,
//     borderColor: COLORS.borderColor,
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     backgroundColor: COLORS.inputBg,
//     // Removed invalid 'color' property from View style
//   },
//   placeholderStyle: {
//     fontFamily: FONTS.regular,
//     fontSize: 14,
//     color: COLORS.textGray,
//   },
//   selectedTextStyle: {
//     fontFamily: FONTS.regular,
//     fontSize: 14,
//     color: COLORS.textDark,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 14,
//     fontFamily: FONTS.regular,
//     color:"#000"
//   },
//   // Size Input Styles
//   sizeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   sizeInputWrapper: {
//     flex: 1,
//   },
//   sizeSpacer: {
//     width: 16,
//   },
//   // Upload Styles
//   uploadContainer: {
//     height: 150,
//     backgroundColor: COLORS.inputBg,
//     borderWidth: 1,
//     borderColor: COLORS.borderColor,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     // Optional: Dashed border for a more 'upload-like' feel, though image shows solid
//     // borderStyle: 'dashed', 
//   },
//   uploadIcon: {
//     marginBottom: 12,
//   },
//   uploadText: {
//     fontFamily: FONTS.regular,
//     fontSize: 14,
//     color: COLORS.textGray,
//   },
//   uploadedFilePreview: {
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   previewImage: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 8,
//   },
//   videoPlaceholder: {
//     alignItems: 'center',
//   },
//   // Footer / Button Styles
//   footer: {
//     padding: 20,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.borderColor,
//     backgroundColor: COLORS.background,
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   submitButton: {
//     backgroundColor: COLORS.primary,
//     borderRadius: 8,
//     paddingVertical: 16,
//     alignItems: 'center',
//   },
//   submitButtonText: {
//     fontFamily: FONTS.semibold,
//     fontSize: 16,
//     color: '#FFFFFF',
//   },
// });

// export default AddIdeaScreen;


// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   Platform,
//   Linking,
//   Alert,
// } from 'react-native';
// // Ensure you have these vector icon libraries installed
// import Feather from 'react-native-vector-icons/Feather';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import LinearGradient from 'react-native-linear-gradient';
// import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

// const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

// // --- Constants & Theme Colors ---
// const COLORS = {
//   bg: '#F8F9FA',
//   darkGreen: '#004D40', // Darker green for Call button
//   brightGreen: '#00C853', // Bright green for WhatsApp
//   textDark: '#1A1A1A',
//   textGray: '#757575',
//   starYellow: '#FFB300',
//   cardBg: '#FFFFFF',
//   borderColor: '#E0E0E0',
// };

// // Font Family Mapping
// const FONTS = {
//   regular: 'SF-Pro-Display-Regular',
//   medium: 'SF-Pro-Display-Medium',
//   semibold: 'SF-Pro-Display-Semibold',
//   bold: 'SF-Pro-Display-Bold',
// };

// // --- Mock Data ---
// const ENGINEERS_DATA = [
//   {
//     id: '1',
//     name: 'Ramesh Home Painters',
//     rating: 4.8,
//     reviews: 127,
//     experience: '10+ years experience',
//     location: 'Rajamundry, VL puram',
//     distance: '10 km Away', // NEW FIELD
//     image: 'https://img.freepik.com/free-photo/painter-painting-wall-with-roller_23-2148002285.jpg', // Replace with real image
//     phone: '9876543210',
//   },
//   {
//     id: '2',
//     name: 'Prime Builders & Engineers',
//     rating: 4.8,
//     reviews: 127,
//     experience: '10+ years experience',
//     location: 'Amalapuram, RTC Complex',
//     distance: '10 km Away', // NEW FIELD
//     image: 'https://img.freepik.com/free-photo/architect-working-blueprints_23-2147710986.jpg',
//     phone: '9876543210',
//   },
//   {
//     id: '3',
//     name: 'Ravi Electrical Services',
//     rating: 4.8,
//     reviews: 127,
//     experience: '10+ years experience',
//     location: 'Rajahmundry, Danavaipeta',
//     distance: '10 km Away', // NEW FIELD
//     image: 'https://img.freepik.com/free-photo/electrician-working-switchboard_23-2149344838.jpg',
//     phone: '9876543210',
//   },
//   {
//     id: '4',
//     name: 'Sri Sai Plumbing Works',
//     rating: 4.8,
//     reviews: 127,
//     experience: '8+ years experience',
//     location: 'Kakinada, Sarpavaram',
//     distance: '10 km Away', // NEW FIELD
//     image: 'https://img.freepik.com/free-photo/plumber-repairing-sink_23-2149344838.jpg',
//     phone: '9876543210',
//   },
//   {
//     id: '5',
//     name: 'Classic Wood Carpentry',
//     rating: 4.8,
//     reviews: 127,
//     experience: '6+ years experience',
//     location: 'Kakinada, Bhanugudi',
//     distance: '10 km Away', // NEW FIELD
//     image: 'https://img.freepik.com/free-photo/carpenter-working-wood_23-2148002144.jpg',
//     phone: '9876543210',
//   },
// ];

// const NearByScreen = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   // --- ACTION HANDLERS ---
//   const handleCall = (phoneNumber) => {
//     let phone = phoneNumber.replace(/[^\d+]/g, '');
//     if (!phone) {
//        Alert.alert("Error", "Invalid Phone Number");
//        return;
//     }
//     let url = Platform.OS === 'android' ? `tel:${phone}` : `telprompt:${phone}`;
//     Linking.openURL(url).catch((err) => {
//       console.error('Error opening dialer:', err);
//       Alert.alert('Error', 'Could not open the dialpad.');
//     });
//   };

//   const handleWhatsApp = (phoneNumber) => {
//     let cleanNumber = phoneNumber.replace(/[^\d]/g, '');
//     if (cleanNumber.length === 10) {
//         cleanNumber = '91' + cleanNumber;
//     }
//     let url = `whatsapp://send?phone=${cleanNumber}&text=Hello`;
//     Linking.openURL(url)
//       .catch((err) => {
//         console.error('WhatsApp Error:', err);
//         Alert.alert('WhatsApp not found', 'Could not open WhatsApp.');
//       });
//   };

//   const renderHeader = () => (
//     <View style={styles.headerContainer}>
//       {/* Implied Back Button based on "Near By" usually being a sub-screen */}
//       {/* If this is a main tab, you can remove the back button */}
//       <Text style={styles.headerTitle}>Near By</Text>
//       <TouchableOpacity style={styles.filterButton}>
//         <Feather name="sliders" size={22} color={COLORS.darkGreen} />
//       </TouchableOpacity>
//     </View>
//   );

//   const ProviderCard = ({ item }) => (
//     <View style={styles.cardContainer}>
//       <View style={styles.cardTopRow}>
//         {/* Left: Image */}
//         <Image source={{ uri: item.image }} style={styles.providerImage} />
        
//         {/* Middle: Info */}
//         <View style={styles.cardInfoContainer}>
//             <View style={styles.nameAndIconsRow}>
//                 <Text style={styles.providerName} numberOfLines={2}>{item.name}</Text>
                 
//                  {/* NEW: Bookmark and Share Icons */}
//                 <View style={styles.topIconsContainer}>
//                     <TouchableOpacity style={styles.iconTouch}>
//                          <Feather name="bookmark" size={18} color="#C0C0C0" />
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.iconTouch}>
//                         <Feather name="share-2" size={18} color="#C0C0C0" />
//                     </TouchableOpacity>
//                 </View>
//             </View>

//           <View style={styles.ratingRow}>
//             <FontAwesome name="star" size={14} color={COLORS.starYellow} />
//             <Text style={styles.ratingText}>
//               {item.rating} <Text style={styles.reviewText}>({item.reviews})</Text>
//             </Text>
//           </View>
          
//           <Text style={styles.detailsText}>{item.experience}</Text>
          
//           <View style={styles.metaRow}>
//             <Feather name="map-pin" size={14} color={COLORS.textGray} />
//             <Text style={styles.metaText} numberOfLines={1}>{item.location}</Text>
//           </View>

//           {/* NEW: Distance Row */}
//           <View style={styles.metaRow}>
//             <Feather name="clock" size={14} color={COLORS.textGray} />
//             <Text style={styles.metaText}>{item.distance}</Text>
//           </View>

//         </View>
//       </View>

//       <View style={styles.cardBottomRow}>
//         <TouchableOpacity 
//           style={[styles.actionButton, styles.callButton]} 
//           onPress={() => handleCall(item.phone)}
//         >
//           <MaterialCommunityIcons name="phone" size={20} color="#fff" />
//           <Text style={styles.buttonText}>Call</Text>
//         </TouchableOpacity>

//         <TouchableOpacity 
//           style={[styles.actionButton, styles.whatsappButton]} 
//           onPress={() => handleWhatsApp(item.phone)}
//         >
//           <FontAwesome name="whatsapp" size={20} color="#fff" />
//           <Text style={styles.buttonText}>WhatsApp</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   // Shimmer placeholder for loading state
//   const ShimmerCard = () => (
//     <View style={[styles.cardContainer, { height: 190 }]}>
//         <View style={{flexDirection:'row', marginBottom: 15}}>
//              <ShimmerPlaceholder style={{width: 90, height: 90, borderRadius: 8}} />
//              <View style={{marginLeft: 12, flex: 1}}>
//                  <ShimmerPlaceholder style={{width: '90%', height: 20, marginBottom: 8}} />
//                  <ShimmerPlaceholder style={{width: '40%', height: 15, marginBottom: 8}} />
//                  <ShimmerPlaceholder style={{width: '60%', height: 15, marginBottom: 8}} />
//                  <ShimmerPlaceholder style={{width: '50%', height: 15}} />
//              </View>
//         </View>
//         <View style={{flexDirection:'row', justifyContent:'space-between'}}>
//              <ShimmerPlaceholder style={{width: '48%', height: 40, borderRadius: 8}} />
//              <ShimmerPlaceholder style={{width: '48%', height: 40, borderRadius: 8}} />
//         </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
//       <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
//       {renderHeader()}
//       <View style={styles.container}>
//         {loading ? (
//           <View style={{ padding: 16 }}>
//             <ShimmerCard /><ShimmerCard /><ShimmerCard />
//           </View>
//         ) : (
//           <FlatList
//             data={ENGINEERS_DATA}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => <ProviderCard item={item} />}
//             contentContainerStyle={styles.listContent}
//             showsVerticalScrollIndicator={false}
//           />
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   listContent: { padding: 16 },
  
//   // Header Styles
//   headerContainer: {
//     flexDirection: 'row', 
//     alignItems: 'center', 
//     justifyContent: 'space-between',
//     paddingHorizontal: 16, 
//     paddingVertical: 16, 
//     backgroundColor: COLORS.bg,
//   },
//   headerTitle: { 
//     fontSize: 22, 
//     fontFamily: FONTS.bold, 
//     color: COLORS.textDark,
//   },
//   filterButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: COLORS.darkGreen,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   // Card Styles
//   cardContainer: {
//     backgroundColor: COLORS.cardBg, 
//     borderRadius: 16, 
//     padding: 12, 
//     marginBottom: 16,
//     borderWidth: 1, 
//     borderColor: COLORS.borderColor, 
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//   },
//   cardTopRow: { 
//     flexDirection: 'row', 
//     marginBottom: 16,
//   },
//   providerImage: { 
//     width: 90, 
//     height: 90, 
//     borderRadius: 12, 
//     backgroundColor: '#E0E0E0',
//     marginTop: 4,
//   },
//   cardInfoContainer: { 
//     flex: 1, 
//     marginLeft: 12, 
//     justifyContent: 'flex-start' 
//   },
//   nameAndIconsRow: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'flex-start',
//       marginBottom: 4,
//   },
//   providerName: { 
//       fontSize: 16, 
//       fontFamily: FONTS.bold, 
//       color: COLORS.textDark, 
//       flex: 1, // Allow text to take space but wrap
//       marginRight: 4,
//   },
//   topIconsContainer: {
//       flexDirection: 'row',
//   },
//   iconTouch: {
//       marginLeft: 8,
//       padding: 2,
//   },
//   ratingRow: { 
//       flexDirection: 'row', 
//       alignItems: 'center', 
//       marginBottom: 4 
//   },
//   ratingText: { 
//       fontSize: 13, 
//       fontFamily: FONTS.semibold, 
//       color: COLORS.textDark, 
//       marginLeft: 4 
//   },
//   reviewText: { 
//       color: COLORS.textGray, 
//       fontFamily: FONTS.regular 
//   },
//   detailsText: { 
//       fontSize: 13, 
//       fontFamily: FONTS.medium, 
//       color: COLORS.textDark, 
//       marginBottom: 6,
//   },
//   metaRow: { 
//       flexDirection: 'row', 
//       alignItems: 'center', 
//       marginTop: 2 
//   },
//   metaText: { 
//       fontSize: 12, 
//       fontFamily: FONTS.regular,
//       color: COLORS.textGray, 
//       marginLeft: 6, 
//       flex: 1, 
//   },
  
//   // Bottom Buttons
//   cardBottomRow: { flexDirection: 'row', justifyContent: 'space-between' },
//   actionButton: {
//     flexDirection: 'row', 
//     alignItems: 'center', 
//     justifyContent: 'center',
//     paddingVertical: 10, 
//     borderRadius: 8, 
//     flex: 0.48,
//   },
//   callButton: { backgroundColor: COLORS.darkGreen },
//   whatsappButton: { backgroundColor: COLORS.brightGreen },
//   buttonText: { 
//       color: '#fff', 
//       fontSize: 15, 
//       fontFamily: FONTS.semibold, 
//       marginLeft: 8 
//   },
// });

// export default NearByScreen;
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
//   StatusBar,
//   Platform,
//   Image,
//   Alert,
// } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import LinearGradient from 'react-native-linear-gradient';
// import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

// const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

// // --- Constants ---
// const COLORS = {
//   primaryGreen: '#004D40', // Dark Green background
//   buttonGreen: '#004D40',  // Edit button color
//   bg: '#F8F9FA',
//   white: '#FFFFFF',
//   textDark: '#1A1A1A',
//   borderColor: '#E0E0E0',
//   iconGray: '#757575',
//   logoutRed: '#E53935',
// };

// const FONTS = {
//   regular: 'SF-Pro-Display-Regular',
//   medium: 'SF-Pro-Display-Medium',
//   bold: 'SF-Pro-Display-Bold',
// };

// const userData = {
//   name: 'Rajesh',
//   image: null, 
// };

// const ProfileScreen = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleOptionPress = (option) => {
//     if (option === 'Logout') {
//         Alert.alert("Logout", "Are you sure you want to logout?", [
//             { text: "Cancel", style: "cancel" },
//             { text: "Logout", style: "destructive", onPress: () => console.log("Logged out") }
//         ]);
//     }
//   };

//   const ProfileOption = ({ icon, title, onPress, isLogout = false }) => (
//     <TouchableOpacity 
//       style={[styles.optionButton, isLogout && styles.logoutButton]} 
//       onPress={onPress}
//       activeOpacity={0.7}
//     >
//       <View style={styles.optionLeft}>
//         <View style={styles.iconContainer}>
//             {icon}
//         </View>
//         <Text style={[styles.optionTitle, isLogout && styles.logoutText]}>{title}</Text>
//       </View>
//       {!isLogout && (
//         <Feather name="chevron-right" size={20} color={COLORS.iconGray} />
//       )}
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryGreen} />
      
//       {/* 1. Header Background (Fixed at top) */}
//       <View style={styles.headerBackground}>
//         <SafeAreaView>
//           <View style={styles.headerContent}>
//             <Text style={styles.headerTitle}>Profile</Text>
//           </View>
//         </SafeAreaView>
//       </View>

//       {/* 2. Scrollable Content */}
//       <ScrollView 
//         style={styles.scrollView}
//         contentContainerStyle={styles.scrollContainer}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Spacer to push white card down */}
//         <View style={styles.spacer} />

//         {/* 3. White Card */}
//         <View style={styles.whiteCard}>
          
//           {/* 4. Profile Section using Negative Margin 
//              This pulls the image UP by half its height (-60px)
//              so it sits exactly on the border line.
//           */}
//           <View style={styles.profileSection}>
//             <View style={styles.imageContainer}>
//                <View style={styles.imageBorder}>
//                 {loading ? (
//                    <ShimmerPlaceholder style={styles.profileImage} />
//                 ) : userData.image ? (
//                   <Image source={{ uri: userData.image }} style={styles.profileImage} />
//                 ) : (
//                   <View style={styles.placeholderImage}>
//                     <MaterialCommunityIcons name="account" size={64} color="#BDBDBD" />
//                   </View>
//                 )}
//               </View>
//             </View>
            
//             {/* Edit Button flows naturally below image */}
//             <TouchableOpacity style={styles.editButton} onPress={() => handleOptionPress('Edit Profile')}>
//               <Text style={styles.editButtonText}>Edit</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Options List */}
//           <View style={styles.optionsList}>
//             <ProfileOption 
//               icon={<Feather name="user" size={20} color={COLORS.primaryGreen} />}
//               title="Personal Details"
//               onPress={() => handleOptionPress('Personal Details')}
//             />
//             <ProfileOption 
//               icon={<Feather name="bookmark" size={20} color={COLORS.primaryGreen} />}
//               title="Book Marks"
//               onPress={() => handleOptionPress('Book Marks')}
//             />
//             <ProfileOption 
//               icon={<MaterialCommunityIcons name="translate" size={20} color={COLORS.primaryGreen} />}
//               title="Language"
//               onPress={() => handleOptionPress('Language')}
//             />
//             <ProfileOption 
//               icon={<Feather name="info" size={20} color={COLORS.primaryGreen} />}
//               title="About Us"
//               onPress={() => handleOptionPress('About Us')}
//             />
//             <ProfileOption 
//               icon={<Feather name="thumbs-up" size={20} color={COLORS.primaryGreen} />}
//               title="Rate Us"
//               onPress={() => handleOptionPress('Rate Us')}
//             />
//             <ProfileOption 
//               icon={<Feather name="message-square" size={20} color={COLORS.primaryGreen} />}
//               title="Feedback"
//               onPress={() => handleOptionPress('Feedback')}
//             />
//             <ProfileOption 
//               icon={<Feather name="headphones" size={20} color={COLORS.primaryGreen} />}
//               title="Help & Support"
//               onPress={() => handleOptionPress('Help & Support')}
//             />
//             <ProfileOption 
//               icon={<Feather name="log-out" size={20} color={COLORS.logoutRed} />}
//               title="Logout"
//               onPress={() => handleOptionPress('Logout')}
//               isLogout={true}
//             />
//           </View>
          
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.primaryGreen,
//   },
//   // --- Header ---
//   headerBackground: {
//     position: 'absolute',
//     top: 0,
//     width: '100%',
//     height: 250, // Covers enough space behind the scroll
//     backgroundColor: COLORS.primaryGreen,
//   },
//   headerContent: {
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontFamily: FONTS.bold,
//     color: COLORS.white,
//   },

//   // --- Scroll Layout ---
//   scrollView: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//   },
//   spacer: {
//     height: 140, // Height of visible green area before white card
//   },

//   // --- White Card ---
//   whiteCard: {
//     flex: 1,
//     backgroundColor: COLORS.bg,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 16,
//     paddingBottom: 30,
//   },

//   // --- Profile Section (Negative Margin Logic) ---
//   profileSection: {
//     alignItems: 'center',
//     marginTop: -60, // Pulls the section up by 60px
//     marginBottom: 20,
//   },
//   imageContainer: {
//     // elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     borderRadius: 60,
//     backgroundColor: 'transparent', // Important for shadow
//   },
//   imageBorder: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: '#E0E0E0',
//     borderWidth: 4,
//     borderColor: COLORS.white,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   profileImage: {
//     width: 112,
//     height: 112,
//     borderRadius: 56,
//   },
//   placeholderImage: {
//     width: 112,
//     height: 112,
//     borderRadius: 56,
//     backgroundColor: '#CFD8DC',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   editButton: {
//     marginTop: 12, // Space between image and button
//     backgroundColor: COLORS.buttonGreen,
//     paddingVertical: 8,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//   },
//   editButtonText: {
//     fontSize: 14,
//     fontFamily: FONTS.bold,
//     color: COLORS.white,
//   },

//   // --- Options ---
//   optionsList: {
//     marginTop: 10,
//   },
//   optionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: COLORS.white,
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: COLORS.borderColor,
//   },
//   optionLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   iconContainer: {
//     width: 24,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 12,
//   },
//   optionTitle: {
//     fontSize: 16,
//     fontFamily: FONTS.medium,
//     color: COLORS.textDark,
//   },
//   logoutButton: {
//     borderColor: COLORS.logoutRed,
//     marginTop: 10,
//   },
//   logoutText: {
//     color: COLORS.logoutRed,
//     fontFamily: FONTS.medium,
//   },
// });

// export default ProfileScreen;
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
//   StatusBar,
//   Platform,
//   Image,
//   TextInput,
//   Alert,
// } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { launchImageLibrary } from 'react-native-image-picker';

// // --- Constants ---
// const COLORS = {
//   primaryGreen: '#004D40', // Dark Green
//   white: '#FFFFFF',
//   textDark: '#1A1A1A',
//   textGray: '#757575',
//   borderColor: '#E0E0E0',
//   inputBg: '#FFFFFF',
//   placeholder: '#BDBDBD',
// };

// const FONTS = {
//   regular: 'SF-Pro-Display-Regular',
//   medium: 'SF-Pro-Display-Medium',
//   bold: 'SF-Pro-Display-Bold',
// };

// const EditProfileScreen = ({ navigation }) => {
//   // Form State
//   const [profileImage, setProfileImage] = useState(null);
//   const [name, setName] = useState('Harsha');
//   const [email, setEmail] = useState('Harsha');
//   const [mobile, setMobile] = useState('7893849532');
//   const [whatsapp, setWhatsapp] = useState('7893849532');
//   const [address, setAddress] = useState('7893849532');
//   const [stateField, setStateField] = useState('7893849532');

//   const handleBackPress = () => {
//     // navigation.goBack(); 
//     console.log('Back pressed');
//   };

//   const handleImagePicker = () => {
//     const options = {
//       mediaType: 'photo',
//       includeBase64: false,
//     };

//     launchImageLibrary(options, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('Image picker error: ', response.error);
//       } else {
//         let imageUri = response.uri || response.assets?.[0]?.uri;
//         setProfileImage(imageUri);
//       }
//     });
//   };

//   const handleSubmit = () => {
//     const formData = { profileImage, name, email, mobile, whatsapp, address, stateField };
//     console.log('Submitting:', formData);
//     Alert.alert('Success', 'Profile Updated Successfully!');
//   };

//   // Reusable Input Component
//   const LabeledInput = ({ label, value, onChangeText, keyboardType = 'default' }) => (
//     <View style={styles.inputContainer}>
//       <Text style={styles.inputLabel}>{label}</Text>
//       <TextInput
//         style={styles.textInput}
//         value={value}
//         onChangeText={onChangeText}
//         keyboardType={keyboardType}
//         placeholderTextColor={COLORS.textGray}
//       />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryGreen} />

//       {/* --- Fixed Header Background --- */}
//       <View style={styles.headerBackground}>
//         <SafeAreaView>
//           <View style={styles.headerContent}>
//             <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
//               <Feather name="arrow-left" size={24} color={COLORS.white} />
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>Edit Profile</Text>
//             <View style={styles.headerRightPlaceholder} /> 
//           </View>
//         </SafeAreaView>
//       </View>

//       {/* --- Scrollable Content --- */}
//       <ScrollView 
//         style={styles.scrollView}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Spacer to push content down (Visible Green Area) */}
//         <View style={styles.headerSpacer} />

//         {/* --- White Card Container --- */}
//         <View style={styles.whiteCard}>
          
//           {/* --- Profile Image (Overlapping via Negative Margin) --- */}
//           <View style={styles.profileImageContainer}>
//             <TouchableOpacity onPress={handleImagePicker} activeOpacity={0.8}>
//                 <View style={styles.imageWrapper}>
//                     {profileImage ? (
//                     <Image source={{ uri: profileImage }} style={styles.profileImage} />
//                     ) : (
//                     <View style={styles.placeholderImage}>
//                         <MaterialCommunityIcons name="account" size={64} color={COLORS.placeholder} />
//                     </View>
//                     )}
//                 </View>
//             </TouchableOpacity>
//           </View>

//           {/* --- Form Fields --- */}
//           <View style={styles.formSection}>
//             <LabeledInput label="Name" value={name} onChangeText={setName} />
//             <LabeledInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
//             <LabeledInput label="Mobile Number" value={mobile} onChangeText={setMobile} keyboardType="phone-pad" />
//             <LabeledInput label="Whatsapp Number" value={whatsapp} onChangeText={setWhatsapp} keyboardType="phone-pad" />
//             <LabeledInput label="Address" value={address} onChangeText={setAddress} />
//             <LabeledInput label="State" value={stateField} onChangeText={setStateField} />

//             {/* --- Submit Button --- */}
//             <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.8}>
//                 <Text style={styles.submitButtonText}>Edit</Text>
//             </TouchableOpacity>
//           </View>
          
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.primaryGreen,
//   },
//   // --- Header ---
//   headerBackground: {
//     position: 'absolute',
//     top: 0,
//     width: '100%',
//     height: 200, // Sufficient height for background
//     backgroundColor: COLORS.primaryGreen,
//   },
//   headerContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   backButton: {
//     padding: 4,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontFamily: FONTS.bold,
//     color: COLORS.white,
//     textAlign: 'center',
//   },
//   headerRightPlaceholder: {
//     width: 32, 
//   },

//   // --- ScrollView ---
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     flexGrow: 1,
//   },
//   headerSpacer: {
//       height: 100, // Distance before white card starts
//   },

//   // --- White Card ---
//   whiteCard: {
//       flex: 1,
//       backgroundColor: COLORS.white,
//       borderTopLeftRadius: 0, // Image shows straight edge for white card? Or subtle curve?
//       // If image shows pure white background starting abruptly, use 0. 
//       // Based on previous profile screen, let's keep it clean white full screen potentially?
//       // Actually looking at image_4e2eca.png, it looks like a standard white page with green header.
//       // BUT to achieve the overlap "half-in half-out", we need the white part to start mid-screen.
//       // Let's assume a standard white container.
//       backgroundColor: COLORS.white,
//       paddingBottom: 40,
//   },

//   // --- Profile Image Logic ---
//   profileImageContainer: {
//     alignItems: 'center',
//     marginTop: -60, // Pulls the image UP 60px to overlap the green header
//     marginBottom: 20,
//   },
//   imageWrapper: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     borderWidth: 4,
//     borderColor: COLORS.white,
//     backgroundColor: COLORS.white,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // Shadows
//     elevation: 4,
//     shadowColor: '#000', 
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   profileImage: {
//     width: 112,
//     height: 112,
//     borderRadius: 56,
//   },
//   placeholderImage: {
//     width: 112,
//     height: 112,
//     borderRadius: 56,
//     backgroundColor: '#C5CAE9', // Light purple/gray tone matching image
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   // --- Form Section ---
//   formSection: {
//     paddingHorizontal: 20,
//     marginTop: 10,
//   },
//   inputContainer: {
//     marginBottom: 16,
//   },
//   inputLabel: {
//     fontSize: 14,
//     fontFamily: FONTS.medium,
//     color: COLORS.textDark,
//     marginBottom: 8,
//   },
//   textInput: {
//     backgroundColor: COLORS.white,
//     borderWidth: 1,
//     borderColor: COLORS.borderColor,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 12,
//     fontSize: 16,
//     fontFamily: FONTS.bold, // Text looks bold/dark in image
//     color: COLORS.textDark,
//   },

//   // --- Submit Button ---
//   submitButton: {
//     backgroundColor: COLORS.primaryGreen,
//     borderRadius: 8,
//     paddingVertical: 14,
//     alignItems: 'center',
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   submitButtonText: {
//     fontSize: 16,
//     fontFamily: FONTS.bold,
//     color: COLORS.white,
//   },
// });

// export default EditProfileScreen;
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
//   TextInput,
//   Dimensions,
//   StatusBar,
//   Platform,
// } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// // --- Constants ---
// const COLORS = {
//   primaryGreen: '#004D40', // Selected background
//   bgLight: '#F5F5F5',      // Sidebar background
//   white: '#FFFFFF',
//   textDark: '#1A1A1A',
//   textGray: '#757575',
//   borderColor: '#E0E0E0',
//   red: '#FF3B30',          // Clear All / Close
// };

// const FONTS = {
//   regular: 'SF-Pro-Display-Regular',
//   medium: 'SF-Pro-Display-Medium',
//   bold: 'SF-Pro-Display-Bold',
// };

// // --- Mock Data ---
// const CATEGORIES = [
//   { id: 'experience', label: 'Experience' },
//   { id: 'nearby', label: 'Nearby' },
//   { id: 'price', label: 'Price Range' },
//   { id: 'project', label: 'Project Count' },
//   { id: 'rating', label: 'Rating' },
// ];

// const EXPERIENCE_OPTIONS = [
//   { id: 1, label: '0-5 yrs', checked: false },
//   { id: 2, label: '6-10 yrs', checked: false },
//   { id: 3, label: '11-15 yrs', checked: true }, // Pre-selected for demo
//   { id: 4, label: '16-20 yrs', checked: false },
// ];

// const PROJECT_COUNT_OPTIONS = [
//   { id: 1, label: '0-10', checked: false },
//   { id: 2, label: '11-20', checked: false },
//   { id: 3, label: '21-30', checked: true },
//   { id: 4, label: '31-40', checked: false },
//   { id: 5, label: '40+', checked: false },
// ];

// const RATING_OPTIONS = [
//   { id: 1, label: '1', checked: false },
//   { id: 2, label: '2', checked: false },
//   { id: 3, label: '3', checked: true },
//   { id: 4, label: '4', checked: false },
//   { id: 5, label: '5', checked: false },
// ];

// const FilterScreen = () => {
//   const [selectedCategory, setSelectedCategory] = useState('experience');
  
//   // State for visual toggling (Demo purposes)
//   const [expState, setExpState] = useState(EXPERIENCE_OPTIONS);
//   const [projState, setProjState] = useState(PROJECT_COUNT_OPTIONS);
//   const [rateState, setRateState] = useState(RATING_OPTIONS);

//   // Toggle Checkbox Logic
//   const toggleCheckbox = (id, state, setState) => {
//     const updated = state.map(item => 
//       item.id === id ? { ...item, checked: !item.checked } : item
//     );
//     setState(updated);
//   };

//   // --- Render Components for Right Side ---

//   // 1. Checkbox List Component (Experience, Projects, Rating)
//   const CheckboxList = ({ data, setData, isRating = false }) => (
//     <View style={styles.contentContainer}>
//       <Text style={styles.contentTitle}>{
//         isRating ? 'Rating' : 
//         selectedCategory === 'project' ? 'Project Count' : 'Experience'
//       }</Text>
      
//       {data.map((item) => (
//         <TouchableOpacity 
//           key={item.id} 
//           style={styles.checkboxRow}
//           onPress={() => toggleCheckbox(item.id, data, setData)}
//           activeOpacity={0.7}
//         >
//           <View style={[styles.checkbox, item.checked && styles.checkboxChecked]}>
//             {item.checked && <Feather name="check" size={14} color={COLORS.white} />}
//           </View>
          
//           <Text style={styles.checkboxLabel}>{item.label}</Text>
          
//           {isRating && (
//              <MaterialIcons name="star" size={16} color="#FFC107" style={{ marginLeft: 4 }} />
//           )}
//         </TouchableOpacity>
//       ))}
//     </View>
//   );

//   // 2. Range Component (Nearby, Price Range)
//   const RangeView = ({ isPrice = false }) => (
//     <View style={styles.contentContainer}>
//       <Text style={styles.contentTitle}>{isPrice ? 'Project Range' : 'Nearby'}</Text>
      
//       {/* Inputs Row */}
//       <View style={styles.rangeInputsRow}>
//         <View style={styles.rangeInputWrapper}>
//           <TextInput 
//             style={styles.rangeInput} 
//             value={isPrice ? '₹30' : '1km'} 
//             editable={false} // Static for demo
//           />
//         </View>
//         <View style={styles.rangeInputWrapper}>
//           <TextInput 
//             style={styles.rangeInput} 
//             value={isPrice ? '₹40,00,00' : '70km'} 
//             editable={false} 
//           />
//         </View>
//       </View>

//       {/* Visual Slider Mockup */}
//       <View style={styles.sliderContainer}>
//         <View style={styles.sliderTrack} />
//         <View style={[styles.sliderTrackFilled, { width: '80%', left: '0%' }]} />
//         <View style={[styles.sliderThumb, { left: '0%' }]} />
//         <View style={[styles.sliderThumb, { left: '80%' }]} />
//       </View>

//       {/* Labels below slider */}
//       <View style={styles.rangeLabelsRow}>
//         <Text style={styles.rangeLabelSmall}>{isPrice ? '₹30' : '1km'}</Text>
//         <Text style={styles.rangeLabelSmall}>{isPrice ? '₹40,00,00' : '70km'}</Text>
//       </View>
//     </View>
//   );

//   // --- Main Render Content Switcher ---
//   const renderRightContent = () => {
//     switch (selectedCategory) {
//       case 'experience':
//         return <CheckboxList data={expState} setData={setExpState} />;
//       case 'nearby':
//         return <RangeView isPrice={false} />;
//       case 'price':
//         return <RangeView isPrice={true} />;
//       case 'project':
//         return <CheckboxList data={projState} setData={setProjState} />;
//       case 'rating':
//         return <CheckboxList data={rateState} setData={setRateState} isRating={true} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
//       {/* --- Header --- */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Filters</Text>
//         <TouchableOpacity style={styles.clearBtn}>
//           <Text style={styles.clearBtnText}>CLEAR ALL</Text>
//         </TouchableOpacity>
//       </View>

//       {/* --- Body (Split Layout) --- */}
//       <View style={styles.body}>
        
//         {/* Left Sidebar */}
//         <View style={styles.sidebar}>
//           <ScrollView showsVerticalScrollIndicator={false}>
//             {CATEGORIES.map((cat) => {
//               const isSelected = selectedCategory === cat.id;
//               return (
//                 <TouchableOpacity
//                   key={cat.id}
//                   style={[
//                     styles.sidebarItem,
//                     isSelected && styles.sidebarItemSelected
//                   ]}
//                   onPress={() => setSelectedCategory(cat.id)}
//                 >
//                   <Text style={[
//                     styles.sidebarLabel,
//                     isSelected && styles.sidebarLabelSelected
//                   ]}>
//                     {cat.label}
//                   </Text>
//                   {/* Small indicator line on left for selected item (optional but looks nice) */}
//                   {isSelected && <View style={styles.activeIndicator} />}
//                 </TouchableOpacity>
//               );
//             })}
//           </ScrollView>
//         </View>

//         {/* Right Content Area */}
//         <View style={styles.mainContent}>
//           <ScrollView showsVerticalScrollIndicator={false}>
//             {renderRightContent()}
//           </ScrollView>
//         </View>
//       </View>

//       {/* --- Footer Buttons --- */}
//       <View style={styles.footer}>
//         <TouchableOpacity style={styles.footerBtnClose}>
//           <Text style={styles.footerBtnTextClose}>CLOSE</Text>
//         </TouchableOpacity>
//         <View style={styles.verticalDivider} />
//         <TouchableOpacity style={styles.footerBtnApply}>
//           <Text style={styles.footerBtnTextApply}>APPLY</Text>
//         </TouchableOpacity>
//       </View>

//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//   },
  
//   // Header
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.borderColor,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontFamily: FONTS.bold,
//     color: COLORS.textDark,
//   },
//   clearBtn: {
//     backgroundColor: '#FFEBEE', // Light red bg
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 4,
//   },
//   clearBtnText: {
//     fontSize: 10,
//     fontFamily: FONTS.bold,
//     color: COLORS.red,
//   },

//   // Body Split
//   body: {
//     flex: 1,
//     flexDirection: 'row',
//   },
  
//   // Left Sidebar
//   sidebar: {
//     width: '35%',
//     backgroundColor: COLORS.bgLight,
//     borderRightWidth: 1,
//     borderRightColor: COLORS.borderColor,
//   },
//   sidebarItem: {
//     paddingVertical: 20,
//     paddingHorizontal: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EBEBEB',
//     position: 'relative',
//   },
//   sidebarItemSelected: {
//     backgroundColor: COLORS.primaryGreen,
//   },
//   sidebarLabel: {
//     fontSize: 13,
//     fontFamily: FONTS.medium,
//     color: COLORS.textGray,
//   },
//   sidebarLabelSelected: {
//     color: COLORS.white,
//     fontFamily: FONTS.bold,
//   },
//   activeIndicator: {
//     position: 'absolute',
//     left: 0,
//     top: 0,
//     bottom: 0,
//     width: 4,
//     backgroundColor: COLORS.white, // Or a highlight color
//   },

//   // Right Content
//   mainContent: {
//     width: '65%',
//     backgroundColor: COLORS.white,
//   },
//   contentContainer: {
//     padding: 20,
//   },
//   contentTitle: {
//     fontSize: 14,
//     fontFamily: FONTS.bold,
//     color: COLORS.textDark,
//     marginBottom: 20,
//   },

//   // Checkbox Rows
//   checkboxRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderWidth: 1.5,
//     borderColor: COLORS.primaryGreen,
//     borderRadius: 3,
//     marginRight: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: COLORS.white,
//   },
//   checkboxChecked: {
//     backgroundColor: COLORS.primaryGreen,
//   },
//   checkboxLabel: {
//     fontSize: 14,
//     fontFamily: FONTS.medium,
//     color: COLORS.textDark,
//   },

//   // Range Slider Styles
//   rangeInputsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   rangeInputWrapper: {
//     width: '45%',
//     height: 40,
//     borderWidth: 1,
//     borderColor: COLORS.textDark,
//     borderRadius: 6,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   rangeInput: {
//     fontSize: 14,
//     fontFamily: FONTS.medium,
//     color: COLORS.textDark,
//     padding: 0,
//   },
//   sliderContainer: {
//     height: 30,
//     justifyContent: 'center',
//     marginBottom: 10,
//   },
//   sliderTrack: {
//     height: 2,
//     backgroundColor: '#E0E0E0',
//     width: '100%',
//     position: 'absolute',
//   },
//   sliderTrackFilled: {
//     height: 2,
//     backgroundColor: COLORS.textDark, // Black line as in image
//     position: 'absolute',
//   },
//   sliderThumb: {
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: COLORS.textDark,
//     backgroundColor: COLORS.white,
//     position: 'absolute',
//     top: 7, // (30 - 16) / 2
//   },
//   rangeLabelsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   rangeLabelSmall: {
//     fontSize: 12,
//     fontFamily: FONTS.regular,
//     color: COLORS.textDark,
//   },

//   // Footer
//   footer: {
//     flexDirection: 'row',
//     borderTopWidth: 1,
//     borderTopColor: COLORS.borderColor,
//     height: 50,
//   },
//   footerBtnClose: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   footerBtnApply: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   footerBtnTextClose: {
//     fontFamily: FONTS.bold,
//     fontSize: 12,
//     color: COLORS.textGray,
//   },
//   footerBtnTextApply: {
//     fontFamily: FONTS.bold,
//     fontSize: 12,
//     color: COLORS.primaryGreen,
//   },
//   verticalDivider: {
//     width: 1,
//     backgroundColor: COLORS.borderColor,
//     marginVertical: 10,
//   },
// });

// export default FilterScreen;

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
//   StatusBar,
//   Platform,
//   Alert,
//   Image,
// } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import { Dropdown } from 'react-native-element-dropdown';
// import { launchImageLibrary } from 'react-native-image-picker';

// // --- Constants ---
// const COLORS = {
//   primaryGreen: '#004D40', // Deep green header
//   white: '#FFFFFF',
//   textDark: '#1A1A1A',
//   labelDark: '#1A1A1A', // Darker label color
//   placeholderGray: '#9E9E9E',
//   borderColor: '#E0E0E0',
//   inputBg: '#FFFFFF',
// };

// // --- Font Family Setup ---
// const FONTS = {
//   regular: 'SF-Pro-Display-Regular',
//   medium: 'SF-Pro-Display-Medium',
//   semibold: 'SF-Pro-Display-Semibold',
//   bold: 'SF-Pro-Display-Bold',
// };

// // Mock data for dropdown
// const categories_data = [
//   { label: 'General Query', value: 'general' },
//   { label: 'Technical Support', value: 'technical' },
//   { label: 'Feedback', value: 'feedback' },
//   { label: 'Other', value: 'other' },
// ];

// const AskQuestionsScreen = ({ navigation }) => {
//   // --- Form State ---
//   const [category, setCategory] = useState(null);
//   const [questionTitle, setQuestionTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isFocus, setIsFocus] = useState(false);

//   // --- Handlers ---

//   const handleBackPress = () => {
//     // navigation.goBack();
//     console.log('Back button pressed');
//   };

//   const handleImagePick = () => {
//     const options = {
//       mediaType: 'photo',
//       includeBase64: false,
//       selectionLimit: 1,
//     };

//     launchImageLibrary(options, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         Alert.alert('Error', 'Failed to pick image');
//       } else if (response.assets && response.assets.length > 0) {
//         setSelectedImage(response.assets[0]);
//       }
//     });
//   };

//   const handleSubmit = () => {
//     // Basic Validation
//     if (!category || !questionTitle || !description) {
//       Alert.alert('Missing Fields', 'Please fill in Category, Title and Description.');
//       return;
//     }
    
//     const formData = {
//       category,
//       questionTitle,
//       description,
//       image: selectedImage,
//     };

//     console.log('Submitting:', formData);
//     Alert.alert('Success', 'Question Submitted Successfully');
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryGreen} />
      
//       {/* --- Header --- */}
//       <SafeAreaView style={styles.headerSafeArea}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
//             <Feather name="arrow-left" size={24} color={COLORS.white} />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Ask Questions</Text>
//           <View style={styles.headerRightPlaceholder} /> 
//         </View>
//       </SafeAreaView>

//       {/* --- Form Content --- */}
//       <ScrollView 
//         style={styles.scrollView}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Category Dropdown */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Category</Text>
//           <Dropdown
//             style={[styles.dropdown, isFocus && { borderColor: COLORS.primaryGreen }]}
//             placeholderStyle={styles.placeholderStyle}
//             selectedTextStyle={styles.selectedTextStyle}
//             inputSearchStyle={styles.inputSearchStyle}
//             iconStyle={styles.iconStyle}
//             data={categories_data}
//             maxHeight={300}
//             labelField="label"
//             valueField="value"
//             placeholder={!isFocus ? 'Select Category' : '...'}
//             value={category}
//             onFocus={() => setIsFocus(true)}
//             onBlur={() => setIsFocus(false)}
//             onChange={item => {
//               setCategory(item.value);
//               setIsFocus(false);
//             }}
//             renderRightIcon={() => (
//               <Feather name="chevron-down" size={20} color={COLORS.textDark} />
//             )}
//             itemTextStyle={styles.itemTextStyle}
//           />
//         </View>

//         {/* Question Title Input */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Question Title</Text>
//           <TextInput
//             style={styles.input}
//             value={questionTitle}
//             onChangeText={setQuestionTitle}
//             placeholder="Enter Question Title"
//             placeholderTextColor={COLORS.placeholderGray}
//           />
//         </View>

//         {/* Description Input */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Description</Text>
//           <TextInput
//             style={[styles.input, styles.textArea]}
//             value={description}
//             onChangeText={setDescription}
//             placeholder="Write a description"
//             placeholderTextColor={COLORS.placeholderGray}
//             multiline={true}
//             numberOfLines={6}
//             textAlignVertical="top"
//           />
//         </View>

//         {/* Upload Image Section */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Upload Image</Text>
//           <TouchableOpacity style={styles.uploadContainer} onPress={handleImagePick} activeOpacity={0.8}>
//             {selectedImage ? (
//               <View style={styles.previewContainer}>
//                  <Image source={{ uri: selectedImage.uri }} style={styles.previewImage} resizeMode="cover" />
//                  <Text style={styles.fileNameText} numberOfLines={1}>{selectedImage.fileName || 'Image Selected'}</Text>
//                  <Feather name="check-circle" size={20} color={COLORS.primaryGreen} />
//               </View>
//             ) : (
//               <View style={styles.uploadPlaceholder}>
//                 <Feather name="upload" size={28} color={COLORS.placeholderGray} style={styles.uploadIcon} />
//                 <Text style={styles.uploadText}>upload Images</Text>
//               </View>
//             )}
//           </TouchableOpacity>
//         </View>

//         {/* Submit Button */}
//         <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.9}>
//           <Text style={styles.submitButtonText}>Submit</Text>
//         </TouchableOpacity>

//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//   },
//   // --- Header Styles ---
//   headerSafeArea: {
//     backgroundColor: COLORS.primaryGreen,
//   },
//   header: {
//     height: 56,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     backgroundColor: COLORS.primaryGreen,
//   },
//   backButton: {
//     padding: 8,
//     marginLeft: -8,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontFamily: FONTS.bold, // Bold Font for Header
//     color: COLORS.white,
//   },
//   headerRightPlaceholder: {
//     width: 40,
//   },

//   // --- ScrollView & Form Styles ---
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 14,
//     fontFamily: FONTS.medium, // Medium Font for Labels
//     color: COLORS.labelDark,
//     marginBottom: 8,
//   },
//   input: {
//     backgroundColor: COLORS.inputBg,
//     borderWidth: 1,
//     borderColor: COLORS.borderColor,
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     fontSize: 14,
//     fontFamily: FONTS.regular, // Regular Font for Input text
//     color: COLORS.textDark,
//   },
//   textArea: {
//     minHeight: 120,
//     textAlignVertical: 'top',
//   },

//   // --- Dropdown Styles ---
//   dropdown: {
//     height: 50,
//     borderColor: COLORS.borderColor,
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     backgroundColor: COLORS.inputBg,
//   },
//   placeholderStyle: {
//     fontSize: 14,
//     fontFamily: FONTS.regular,
//     color: COLORS.placeholderGray,
//   },
//   selectedTextStyle: {
//     fontSize: 14,
//     fontFamily: FONTS.regular,
//     color: COLORS.textDark,
//   },
//   itemTextStyle: {
//     fontSize: 14,
//     fontFamily: FONTS.regular,
//     color: COLORS.textDark,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 14,
//     fontFamily: FONTS.regular,
//   },

//   // --- Upload Image Styles ---
//   uploadContainer: {
//     height: 120,
//     backgroundColor: COLORS.inputBg,
//     borderWidth: 1,
//     borderColor: COLORS.borderColor,
//     // borderStyle: 'dashed', // React Native supports dashed border style
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   uploadPlaceholder: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   uploadIcon: {
//     marginBottom: 8,
//   },
//   uploadText: {
//     fontSize: 14,
//     fontFamily: FONTS.regular,
//     color: COLORS.placeholderGray,
//   },
//   previewContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     paddingHorizontal: 10,
//   },
//   previewImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 8,
//     marginRight: 16,
//   },
//   fileNameText: {
//       fontSize: 14,
//       fontFamily: FONTS.medium,
//       color: COLORS.textDark,
//       flex: 1,
//   },

//   // --- Submit Button Styles ---
//   submitButton: {
//     backgroundColor: COLORS.primaryGreen,
//     borderRadius: 8,
//     paddingVertical: 15,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   submitButtonText: {
//     fontSize: 16,
//     fontFamily: FONTS.bold, // Bold Font for Button
//     color: COLORS.white,
//   },
// });

// export default AskQuestionsScreen;
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
//   StatusBar,
//   Platform,
//   Alert,
// } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';

// // --- Constants & Theme ---
// const COLORS = {
//   primaryGreen: '#004D40', // Deep green for selected state and buttons
//   white: '#FFFFFF',
//   textDark: '#1A1A1A',
//   labelGray: '#757575',
//   placeholderGray: '#BDBDBD',
//   borderColor: '#E0E0E0',
//   chipBgUnselected: '#F5F5F5',
//   bg: '#FFFFFF',
// };

// // --- Font Family Configuration ---
// const FONTS = {
//   regular: 'SF-Pro-Display-Regular',
//   medium: 'SF-Pro-Display-Medium',
//   bold: 'SF-Pro-Display-Bold',
// };

// // --- Mock Data for Available Categories ---
// const INITIAL_AVAILABLE_CATEGORIES = [
//   { id: 1, name: 'Engineer' },
//   { id: 2, name: 'Painting' },
//   { id: 3, name: 'Plumbing' },
//   { id: 4, name: 'Electrical' },
//   { id: 5, name: 'Carpentry' },
//   { id: 6, name: 'Interior Design' },
//   { id: 7, name: 'Masonry' },
// ];

// const AddCategoryScreen = ({ navigation }) => {
//   // --- State ---
//   const [newCategoryName, setNewCategoryName] = useState('');
//   // Store only the IDs of selected categories
//   const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

//   // --- Handlers ---
//   const handleBackPress = () => {
//     console.log('Back button pressed');
//     // navigation.goBack(); 
//   };

//   // Toggle selection state of a category chip
//   const handleToggleCategory = (id) => {
//     if (selectedCategoryIds.includes(id)) {
//       // If already selected, remove it (deselect)
//       setSelectedCategoryIds(selectedCategoryIds.filter((categoryId) => categoryId !== id));
//     } else {
//       // If not selected, add it
//       setSelectedCategoryIds([...selectedCategoryIds, id]);
//     }
//   };

//   const handleSubmit = () => {
//     // Combine new name input with selected existing categories
//     const selectedNames = INITIAL_AVAILABLE_CATEGORIES
//       .filter(cat => selectedCategoryIds.includes(cat.id))
//       .map(cat => cat.name);
      
//     console.log('Submitting:', {
//       newCategoryInput: newCategoryName,
//       selectedCategories: selectedNames
//     });
    
//     Alert.alert('Success', 'Categories updated successfully!');
//     // Reset form
//     setNewCategoryName('');
//     setSelectedCategoryIds([]);
//   };

//   // --- Render Chip Item ---
//   const renderCategoryChip = (item) => {
//     const isSelected = selectedCategoryIds.includes(item.id);

//     return (
//       <TouchableOpacity
//         key={item.id}
//         style={[
//           styles.chipContainer,
//           isSelected ? styles.chipSelected : styles.chipUnselected
//         ]}
//         onPress={() => handleToggleCategory(item.id)}
//         activeOpacity={0.7}
//       >
//         <Text style={[
//           styles.chipText,
//           isSelected ? styles.chipTextSelected : styles.chipTextUnselected
//         ]}>
//           {item.name}
//         </Text>
        
//         {/* Show 'X' icon only if selected */}
//         {isSelected && (
//           <Feather name="x" size={18} color={COLORS.white} style={styles.chipIcon} />
//         )}
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

//       {/* --- Header --- */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
//           <Feather name="arrow-left" size={24} color={COLORS.textDark} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Add Category</Text>
//         <View style={styles.headerRightPlaceholder} />
//       </View>

//       {/* --- Main Content --- */}
//       <ScrollView 
//         style={styles.scrollView}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* 1. Input for New Category */}
//         <View style={styles.sectionContainer}>
//           <Text style={styles.label}>Category Name</Text>
//           <TextInput
//             style={styles.input}
//             value={newCategoryName}
//             onChangeText={setNewCategoryName}
//             placeholder="Enter category name"
//             placeholderTextColor={COLORS.placeholderGray}
//           />
//         </View>

//         {/* 2. Available Categories Selection Area */}
//         <View style={styles.sectionContainer}>
//           <Text style={styles.label}>Available Categories</Text>
          
//           <View style={styles.chipsWrapper}>
//             {INITIAL_AVAILABLE_CATEGORIES.map(renderCategoryChip)}
//           </View>
//         </View>

//       </ScrollView>

//       {/* --- Bottom Button --- */}
//       <View style={styles.footer}>
//         <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.9}>
//           <Text style={styles.submitButtonText}>Add Category</Text>
//         </TouchableOpacity>
//       </View>

//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.bg,
//   },
//   // --- Header Styles ---
//   header: {
//     height: 56,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     backgroundColor: COLORS.white,
//   },
//   backButton: {
//     padding: 8,
//     marginLeft: -8,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontFamily: FONTS.bold, // Bold Header
//     color: COLORS.textDark,
//   },
//   headerRightPlaceholder: {
//     width: 40,
//   },

//   // --- ScrollView & Content Styles ---
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     padding: 20,
//   },
//   sectionContainer: {
//     marginBottom: 24,
//   },
//   label: {
//     fontSize: 16,
//     fontFamily: FONTS.medium, // Medium Labels
//     color: COLORS.textDark,
//     marginBottom: 12,
//   },
//   input: {
//     backgroundColor: COLORS.white,
//     borderWidth: 1,
//     borderColor: COLORS.borderColor,
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     fontSize: 16,
//     fontFamily: FONTS.regular, // Regular Input Text
//     color: COLORS.textDark,
//   },

//   // --- Chips Styles ---
//   chipsWrapper: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginHorizontal: -4,
//   },
//   chipContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//     margin: 4,
//     borderWidth: 1,
//   },
//   // Styles for Unselected State
//   chipUnselected: {
//     backgroundColor: COLORS.white,
//     borderColor: COLORS.borderColor,
//   },
//   chipTextUnselected: {
//     color: COLORS.labelGray,
//     fontFamily: FONTS.medium, // Medium Chip Text
//     fontSize: 14,
//   },
//   // Styles for Selected State
//   chipSelected: {
//     backgroundColor: COLORS.primaryGreen,
//     borderColor: COLORS.primaryGreen,
//   },
//   chipTextSelected: {
//     color: COLORS.white,
//     fontFamily: FONTS.medium, // Medium Chip Text
//     fontSize: 14,
//     marginRight: 4,
//   },
//   chipIcon: {
//     marginLeft: 4,
//   },

//   // --- Footer & Button Styles ---
//   footer: {
//     padding: 20,
//     backgroundColor: COLORS.white,
//   },
//   submitButton: {
//     backgroundColor: COLORS.primaryGreen,
//     borderRadius: 8,
//     paddingVertical: 16,
//     alignItems: 'center',
//   },
//   submitButtonText: {
//     fontSize: 18,
//     fontFamily: FONTS.bold, // Bold Button Text
//     color: COLORS.white,
//   },
// });

// export default AddCategoryScreen;
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
//   StatusBar,
//   Platform,
//   Alert,
// } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';

// // --- Constants & Theme ---
// const COLORS = {
//   primaryGreen: '#004D40', // Deep green for selected state and buttons
//   white: '#FFFFFF',
//   textDark: '#1A1A1A',
//   labelGray: '#757575',
//   placeholderGray: '#BDBDBD',
//   borderColor: '#E0E0E0',
//   bg: '#FFFFFF',
//   radioUnselected: '#BDBDBD', // Color for unselected radio circle
// };

// // --- Font Family Configuration ---
// const FONTS = {
//   regular: 'SF-Pro-Display-Regular',
//   medium: 'SF-Pro-Display-Medium',
//   bold: 'SF-Pro-Display-Bold',
// };

// // --- Mock Data for Radio Options ---
// const RADIO_OPTIONS = [
//   { id: 'general', label: 'General Query' },
//   { id: 'technical', label: 'Technical Support' },
//   { id: 'feedback', label: 'Feedback' },
//   { id: 'other', label: 'Other' },
// ];

// const CreateQueryScreen = ({ navigation }) => {
//   // --- State ---
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');

//   // --- Handlers ---
//   const handleBackPress = () => {
//     console.log('Back button pressed');
//     // navigation.goBack(); 
//   };

//   const handleSubmit = () => {
//     if (!selectedCategory) {
//       Alert.alert('Validation', 'Please select a category.');
//       return;
//     }
//     if (!title.trim()) {
//       Alert.alert('Validation', 'Please enter a query title.');
//       return;
//     }

//     const formData = {
//       category: selectedCategory,
//       title: title,
//       description: description,
//     };

//     console.log('Submitting Query:', formData);
//     Alert.alert('Success', 'Query created successfully!');
//     // Reset form
//     setSelectedCategory(null);
//     setTitle('');
//     setDescription('');
//   };

//   // --- Custom Radio Option Component ---
//   const RadioOptionRow = ({ item, selected, onSelect }) => {
//     return (
//       <TouchableOpacity
//         style={styles.radioRow}
//         onPress={() => onSelect(item.id)}
//         activeOpacity={0.7}
//       >
//         {/* The Radio Circle Visual */}
//         <View
//           style={[
//             styles.radioOuterCircle,
//             selected && styles.radioOuterCircleSelected,
//           ]}
//         >
//           {selected && <View style={styles.radioInnerCircle} />}
//         </View>
        
//         {/* The Label */}
//         <Text style={styles.radioText}>{item.label}</Text>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

//       {/* --- Header --- */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
//           <Feather name="arrow-left" size={24} color={COLORS.textDark} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Create Query</Text>
//         <View style={styles.headerRightPlaceholder} />
//       </View>

//       {/* --- Main Content --- */}
//       <ScrollView 
//         style={styles.scrollView}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
        
//         {/* 1. Category Radio Group */}
//         <View style={styles.sectionContainer}>
//           <Text style={styles.label}>Category</Text>
//           <View style={styles.radioGroupContainer}>
//             {RADIO_OPTIONS.map((option) => (
//               <RadioOptionRow
//                 key={option.id}
//                 item={option}
//                 selected={selectedCategory === option.id}
//                 onSelect={setSelectedCategory}
//               />
//             ))}
//           </View>
//         </View>

//         {/* 2. Query Title Input */}
//         <View style={styles.sectionContainer}>
//           <Text style={styles.label}>Query Title</Text>
//           <TextInput
//             style={styles.input}
//             value={title}
//             onChangeText={setTitle}
//             placeholder="Enter query title"
//             placeholderTextColor={COLORS.placeholderGray}
//           />
//         </View>

//         {/* 3. Description Input (Multiline) */}
//         <View style={styles.sectionContainer}>
//           <Text style={styles.label}>Description</Text>
//           <TextInput
//             style={[styles.input, styles.textArea]}
//             value={description}
//             onChangeText={setDescription}
//             placeholder="Detail your query here..."
//             placeholderTextColor={COLORS.placeholderGray}
//             multiline={true}
//             numberOfLines={5}
//             textAlignVertical="top" // Ensures text starts at top on Android
//           />
//         </View>

//       </ScrollView>

//       {/* --- Bottom Button --- */}
//       <View style={styles.footer}>
//         <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.9}>
//           <Text style={styles.submitButtonText}>Submit Query</Text>
//         </TouchableOpacity>
//       </View>

//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.bg,
//   },
//   // --- Header Styles ---
//   header: {
//     height: 56,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     backgroundColor: COLORS.white,
//   },
//   backButton: {
//     padding: 8,
//     marginLeft: -8,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontFamily: FONTS.bold,
//     color: COLORS.textDark,
//   },
//   headerRightPlaceholder: {
//     width: 40,
//   },

//   // --- ScrollView & Content Styles ---
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     padding: 20,
//   },
//   sectionContainer: {
//     marginBottom: 24,
//   },
//   label: {
//     fontSize: 16,
//     fontFamily: FONTS.medium,
//     color: COLORS.textDark,
//     marginBottom: 12,
//   },
//   input: {
//     backgroundColor: COLORS.white,
//     borderWidth: 1,
//     borderColor: COLORS.borderColor,
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     fontSize: 16,
//     fontFamily: FONTS.regular,
//     color: COLORS.textDark,
//   },
//   textArea: {
//     minHeight: 120,
//   },

//   // --- Radio Button Styles ---
//   radioGroupContainer: {
//     marginTop: 4,
//   },
//   radioRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   radioOuterCircle: {
//     height: 20,
//     width: 20,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: COLORS.radioUnselected,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 12,
//   },
//   radioOuterCircleSelected: {
//     borderColor: COLORS.primaryGreen,
//   },
//   radioInnerCircle: {
//     height: 10,
//     width: 10,
//     borderRadius: 5,
//     backgroundColor: COLORS.primaryGreen,
//   },
//   radioText: {
//     fontSize: 16,
//     fontFamily: FONTS.regular,
//     color: COLORS.textDark,
//   },

//   // --- Footer & Button Styles ---
//   footer: {
//     padding: 20,
//     backgroundColor: COLORS.white,
//   },
//   submitButton: {
//     backgroundColor: COLORS.primaryGreen,
//     borderRadius: 8,
//     paddingVertical: 16,
//     alignItems: 'center',
//   },
//   submitButtonText: {
//     fontSize: 18,
//     fontFamily: FONTS.bold,
//     color: COLORS.white,
//   },
// });

// export default CreateQueryScreen;