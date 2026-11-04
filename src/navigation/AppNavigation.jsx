// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { View, Image, Pressable, StyleSheet, Platform, Text } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import Feather from "react-native-vector-icons/Feather";

// import SplashScreen from "../screens/SplashScreen";
// import MyCoupons from "../screens/MyCoupons";
// import LoginScreen from "../screens/LoginScreen";
// import OtpVerificationScreen from "../screens/OtpVerificationScreen";
// import UserRegistrationScreen from "../screens/UserRegistrationScreen";
// import RestaurantsListScreen from "../screens/RestaurantsListScreen";
// import CoffeeOfferScreen from "../screens/CoffeeOfferScreen";
// import CouponsListScreen from "../screens/CouponsListScreen";
// import MyCouponHistory from "../screens/MyCouponHistory";
// import RegisterManuallyScreen from "../screens/RegisterManuallyScreen";
// import Rewards from "../screens/Rewards";
// import Home from "../screens/Home";
// import RedeemCouponsScreen from "../screens/RedeemCouponsScreen";
// import QRScannerScreen from "../screens/QRScannerScreen";
// import Profile from "../screens/Profile";

// import BniSplashScreen from "../screens/BniAsk/BniSplashScreen";
// import BniLoginScreen from "../screens/BniAsk/BniLoginScreen";
// import BniOtpVerificationScreen from "../screens/BniAsk/BniOtpVerificationScreen";
// import BniRoleSelectionScreen from "../screens/BniAsk/BniRoleSelectionScreen";
// import BniVendorRegistrationScreen from "../screens/BniAsk/BniVendorRegistrationScreen";
// import BniRegistrationUnderReviewScreen from "../screens/BniAsk/BniRegistrationUnderReviewScreen";
// import BniProfileScreen from "../screens/BniAsk/BniProfileScreen";
// import { COLORS as BNI_COLORS } from "../screens/BniAsk/theme";
// import BniCouponDetailScreen from "../screens/BniAsk/BniCouponDetailScreen";
// import BniAddNewCouponScreen from "../screens/BniAsk/BniAddNewCouponScreen";
// import BniConnectionsScreen from "../screens/BniAsk/BniConnectionsScreen";
// import BniAddBusinessScreen from "../screens/BniAsk/BniAddBusinessScreen";

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();
// const BniTab = createBottomTabNavigator();

// // Dummy component for Scan tab
// const ScanPlaceholder = () => null;

// // Bottom Tab Navigator Component
// const TabNavigator = () => {
//   const insets = useSafeAreaInsets();

//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarPressColor: "transparent",
//         tabBarPressOpacity: 1,
//         tabBarButton: (props) => {
//           // Custom center button for Scanner
//           if (route.name === "Scan") {
//             return (
//               <Pressable
//                 {...props}
//                 android_ripple={null}
//                 style={({ pressed }) => [
//                   props.style,
//                   styles.centerTabButton,
//                   { opacity: pressed ? 0.8 : 1 },
//                 ]}
//               >
//                 <View style={styles.centerCircleOuter}>
//                   <View style={styles.centerCircle}>
//                     <Image
//                       source={require('../assets/scanner.png')}
//                       style={styles.scannerIcon}
//                     />
//                   </View>
//                 </View>
//               </Pressable>
//             );
//           }

//           return (
//             <Pressable
//               {...props}
//               android_ripple={null}
//               style={({ pressed }) => [
//                 props.style,
//                 { opacity: pressed ? 1 : 1 },
//               ]}
//             />
//           );
//         },
//         tabBarIcon: ({ color, focused }) => {
//           if (route.name === "Home") {
//             return (
//               <View style={styles.tabIconContainer}>
//                 {focused && <View style={styles.activeTabLine} />}
//                 <Image
//                   source={
//                     focused
//                       ? require('../assets/homefill.png')
//                       : require('../assets/homeoutline.png')
//                   }
//                   style={styles.tabIcon}
//                 />
//               </View>
//             );
//           }

//           if (route.name === "MyCoupons") {
//             return (
//               <View style={styles.tabIconContainer}>
//                 {focused && <View style={styles.activeTabLine} />}
//                 <Image
//                   source={
//                     focused
//                       ? require('../assets/couponfill.png')
//                       : require('../assets/couponoutline.png')
//                   }
//                   style={styles.tabIcon}
//                 />
//               </View>
//             );
//           }

//           if (route.name === "Scan") {
//             return null;
//           }

//           if (route.name === "History") {
//             return (
//               <View style={styles.tabIconContainer}>
//                 {focused && <View style={styles.activeTabLine} />}
//                 <Image
//                   source={
//                     focused
//                       ? require('../assets/historyfill.png')
//                       : require('../assets/historyoutline.png')
//                   }
//                   style={styles.tabIcon}
//                 />
//               </View>
//             );
//           }

//           if (route.name === "Rewards") {
//             return (
//               <View style={styles.tabIconContainer}>
//                 {focused && <View style={styles.activeTabLine} />}
//                 <Image
//                   source={
//                     focused
//                       ? require('../assets/rewardfill.png')
//                       : require('../assets/rewardoutline.png')
//                   }
//                   style={styles.tabIcon}
//                 />
//               </View>
//             );
//           }

//           return null;
//         },
//         tabBarActiveTintColor: "#002161",
//         tabBarInactiveTintColor: "#6D6D6D",
//         tabBarStyle: {
//           height: (Platform.OS === 'ios' ? 85 : 65) + insets.bottom,
//           paddingBottom: Platform.OS === 'ios' ? insets.bottom : 8,
//           paddingTop: 8,
//           backgroundColor: '#fff',
//           borderTopWidth: 1,
//           borderTopColor: '#f0e8e8',
//           borderTopLeftRadius: 20,
//           borderTopRightRadius: 20,
//           elevation: 8,
//           shadowColor: '#000',
//           shadowOffset: { width: 0, height: -2 },
//           shadowOpacity: 0.05,
//           shadowRadius: 8,
//           position: 'absolute',
//         },
//         tabBarLabelStyle: {
//           fontSize: 11,
//           fontWeight: "500",
//           marginTop: 4,
//         },
//         headerShown: false,
//       })}
//     >
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           tabBarLabel: "Home",
//         }}
//       />
//       <Tab.Screen
//         name="MyCoupons"
//         component={MyCoupons}
//         options={{
//           tabBarLabel: "My Coupons",
//         }}
//       />
//       {/* <Tab.Screen
//         name="Scan"
//         component={ScanPlaceholder}
//         options={{
//           tabBarLabel: () => null,
//         }}
//         listeners={({ navigation }) => ({
//           tabPress: (e) => {
//             e.preventDefault();
//             navigation.navigate('Home', { openScanner: true });
//           },
//         })}
//       /> */}
//       <Tab.Screen
//         name="History"
//         component={MyCouponHistory}
//         options={{
//           tabBarLabel: "History",
//         }}
//       />
//       <Tab.Screen
//         name="Rewards"
//         component={Rewards}
//         options={{
//           tabBarLabel: "Rewards",
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// // BNI ASK Bottom Tab Navigator
// const BNI_TABS = [
//   { key: "BniConnections", label: "My Connections", icon: "users" },
//   { key: "Profile", label: "Profile", icon: "user" },
// ];

// const BniTabNavigator = () => {
//   const insets = useSafeAreaInsets();

//   return (
//     <BniTab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarActiveTintColor: BNI_COLORS.primary,
//         tabBarInactiveTintColor: BNI_COLORS.textLight,
//         tabBarLabelStyle: { fontSize: 11, fontWeight: "500", marginTop: 2 },
//         tabBarLabel: ({ color }) => {
//           const tab = BNI_TABS.find((t) => t.key === route.name);
//           const isConnections = route.name === "BniConnections";
//           return (
//             <Text
//               style={{
//                 color,
//                 fontSize: isConnections ? 9 : 11,
//                 fontWeight: "500",
//                 marginTop: 2,
//               }}
//               numberOfLines={1}
//               adjustsFontSizeToFit={isConnections}
//               minimumFontScale={0.7}
//             >
//               {tab?.label}
//             </Text>
//           );
//         },
//         tabBarStyle: {
//           height: (Platform.OS === "ios" ? 80 : 60) + insets.bottom,
//           paddingBottom: insets.bottom || 8,
//           paddingTop: 8,
//           backgroundColor: BNI_COLORS.white,
//           borderTopWidth: 1,
//           borderTopColor: BNI_COLORS.border,
//         },
//         tabBarIcon: ({ color, size, focused }) => {
//           if (route.name === "BniConnections") {
//             return (
//               <Image
//                 source={
//                   focused
//                     ? require("../assets/myconnectionfill.png")
//                     : require("../assets/bniconnectionsout.png")
//                 }
//                 style={{ width: size ?? 20, height: size ?? 20 }}
//                 resizeMode="contain"
//               />
//             );
//           }
//           const tab = BNI_TABS.find((t) => t.key === route.name);
//           return <Feather name={tab?.icon || "circle"} size={size ?? 20} color={color} />;
//         },
//       })}
//     >
//       <BniTab.Screen
//         name="BniConnections"
//         component={BniConnectionsScreen}
//       />
//       <BniTab.Screen
//         name="Profile"
//         component={BniProfileScreen}
//         options={{ tabBarLabel: "Profile" }}
//       />
//     </BniTab.Navigator>
//   );
// };

// // Main App Navigation
// const AppNavigation = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="BniSplashScreen"
//         screenOptions={{ headerShown: false }}
//       >  
      
//         <Stack.Screen name="Splash" component={SplashScreen} />
//         <Stack.Screen name="LoginScreen" component={LoginScreen} />
//         <Stack.Screen name="OtpVerificationScreen" component={OtpVerificationScreen} />
//         <Stack.Screen name="UserRegistrationScreen" component={UserRegistrationScreen} />
//         <Stack.Screen name="RegisterManuallyScreen" component={RegisterManuallyScreen} />

//         {/* Main App with Bottom Tabs */}
//         <Stack.Screen name="MainApp" component={TabNavigator} />

//         {/* Additional Screens outside tabs */}
//         <Stack.Screen name="RestaurantsListScreen" component={RestaurantsListScreen} />
//         <Stack.Screen name="CoffeeOfferScreen" component={CoffeeOfferScreen} />
//         <Stack.Screen name="CouponsListScreen" component={CouponsListScreen} />
//         <Stack.Screen name="QRScannerScreen" component={QRScannerScreen} />
//         <Stack.Screen name="TabNavigator" component={TabNavigator} />
//         <Stack.Screen name="Profile" component={Profile} />
//         <Stack.Screen name="MyCouponHistory" component={MyCouponHistory} />
//         <Stack.Screen name="RedeemCouponsScreen" component={RedeemCouponsScreen} />

//         {/* BNI ASK Vendor App (static UI) */}
//         <Stack.Screen name="BniSplashScreen" component={BniSplashScreen} />
//         <Stack.Screen name="BniLoginScreen" component={BniLoginScreen} />
//         <Stack.Screen name="BniOtpVerificationScreen" component={BniOtpVerificationScreen} />
//         <Stack.Screen name="BniRoleSelectionScreen" component={BniRoleSelectionScreen} />
//         <Stack.Screen name="BniVendorRegistrationScreen" component={BniVendorRegistrationScreen} />
//         <Stack.Screen name="BniRegistrationUnderReviewScreen" component={BniRegistrationUnderReviewScreen} />
//         <Stack.Screen name="BniMainTabs" component={BniTabNavigator} />
//         <Stack.Screen name="BniCouponDetailScreen" component={BniCouponDetailScreen} />
//         <Stack.Screen name="BniAddNewCouponScreen" component={BniAddNewCouponScreen} />
//         <Stack.Screen name="BniAddBusinessScreen" component={BniAddBusinessScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({
//   tabIconContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   activeTabLine: {
//     position: 'absolute',
//     top: -15,
//     width: 30,
//     height: 3,
//     backgroundColor: '#002161',
//     borderRadius: 2,
//   },
//   tabIcon: {
//     width: 22,
//     height: 22,
//   },
//   centerTabButton: {
//     top: -15,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   centerCircleOuter: {
//     width: 74,
//     height: 74,
//     borderRadius: 37,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.12,
//     shadowRadius: 10,
//     elevation: 8,
//   },
//   centerCircle: {
//     width: 50,
//     height: 50,
//     borderRadius: 31,
//     backgroundColor: '#002161',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   scannerIcon: {
//     width: 25,
//     height: 25,
//     tintColor: '#fff',
//   },
// });

// export default AppNavigation;
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image, Pressable, StyleSheet, Platform, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";

import SplashScreen from "../screens/SplashScreen";
import MyCoupons from "../screens/MyCoupons";
import LoginScreen from "../screens/LoginScreen";
import OtpVerificationScreen from "../screens/OtpVerificationScreen";
import UserRegistrationScreen from "../screens/UserRegistrationScreen";
import RestaurantsListScreen from "../screens/RestaurantsListScreen";
import CoffeeOfferScreen from "../screens/CoffeeOfferScreen";
import CouponsListScreen from "../screens/CouponsListScreen";
import MyCouponHistory from "../screens/MyCouponHistory";
import RegisterManuallyScreen from "../screens/RegisterManuallyScreen";
import Rewards from "../screens/Rewards";
import Home from "../screens/Home";
import RedeemCouponsScreen from "../screens/RedeemCouponsScreen";
import QRScannerScreen from "../screens/QRScannerScreen";
import Profile from "../screens/Profile";

// BNI ASK vendor flow disabled - user flow only
// import BniSplashScreen from "../screens/BniAsk/BniSplashScreen";
// import BniLoginScreen from "../screens/BniAsk/BniLoginScreen";
// import BniOtpVerificationScreen from "../screens/BniAsk/BniOtpVerificationScreen";
// import BniRoleSelectionScreen from "../screens/BniAsk/BniRoleSelectionScreen";
// import BniVendorRegistrationScreen from "../screens/BniAsk/BniVendorRegistrationScreen";
// import BniRegistrationUnderReviewScreen from "../screens/BniAsk/BniRegistrationUnderReviewScreen";
// import BniVendorHomeScreen from "../screens/BniAsk/BniVendorHomeScreen";
// import BniMyCouponsScreen from "../screens/BniAsk/BniMyCouponsScreen";
// import BniProfileScreen from "../screens/BniAsk/BniProfileScreen";
// import { COLORS as BNI_COLORS } from "../screens/BniAsk/theme";
// import BniCouponDetailScreen from "../screens/BniAsk/BniCouponDetailScreen";
// import BniAddNewCouponScreen from "../screens/BniAsk/BniAddNewCouponScreen";
// import BniConnectionsScreen from "../screens/BniAsk/BniConnectionsScreen";
// import BniAddBusinessScreen from "../screens/BniAsk/BniAddBusinessScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// const BniTab = createBottomTabNavigator();

// Dummy component for Scan tab
const ScanPlaceholder = () => null;

// Bottom Tab Navigator Component
const TabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarPressColor: "transparent",
        tabBarPressOpacity: 1,
        tabBarButton: (props) => {
          // Custom center button for Scanner
          if (route.name === "Scan") {
            return (
              <Pressable
                {...props}
                android_ripple={null}
                style={({ pressed }) => [
                  props.style,
                  styles.centerTabButton,
                  { opacity: pressed ? 0.8 : 1 },
                ]}
              >
                <View style={styles.centerCircleOuter}>
                  <View style={styles.centerCircle}>
                    <Image
                      source={require('../assets/scanner.png')}
                      style={styles.scannerIcon}
                    />
                  </View>
                </View>
              </Pressable>
            );
          }

          return (
            <Pressable
              {...props}
              android_ripple={null}
              style={({ pressed }) => [
                props.style,
                { opacity: pressed ? 1 : 1 },
              ]}
            />
          );
        },
        tabBarIcon: ({ color, focused }) => {
          if (route.name === "Home") {
            return (
              <View style={styles.tabIconContainer}>
                {focused && <View style={styles.activeTabLine} />}
                <Image
                  source={
                    focused
                      ? require('../assets/homefill.png')
                      : require('../assets/homeoutline.png')
                  }
                  style={styles.tabIcon}
                />
              </View>
            );
          }

          if (route.name === "MyCoupons") {
            return (
              <View style={styles.tabIconContainer}>
                {focused && <View style={styles.activeTabLine} />}
                <Image
                  source={
                    focused
                      ? require('../assets/couponfill.png')
                      : require('../assets/couponoutline.png')
                  }
                  style={styles.tabIcon}
                />
              </View>
            );
          }

          if (route.name === "Scan") {
            return null;
          }

          if (route.name === "History") {
            return (
              <View style={styles.tabIconContainer}>
                {focused && <View style={styles.activeTabLine} />}
                <Image
                  source={
                    focused
                      ? require('../assets/historyfill.png')
                      : require('../assets/historyoutline.png')
                  }
                  style={styles.tabIcon}
                />
              </View>
            );
          }

          if (route.name === "Rewards") {
            return (
              <View style={styles.tabIconContainer}>
                {focused && <View style={styles.activeTabLine} />}
                <Image
                  source={
                    focused
                      ? require('../assets/rewardfill.png')
                      : require('../assets/rewardoutline.png')
                  }
                  style={styles.tabIcon}
                />
              </View>
            );
          }

          return null;
        },
        tabBarActiveTintColor: "#002161",
        tabBarInactiveTintColor: "#6D6D6D",
        tabBarStyle: {
          height: (Platform.OS === 'ios' ? 85 : 65) + insets.bottom,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 8,
          paddingTop: 8,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f0e8e8',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          position: 'absolute',
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
          marginTop: 4,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="MyCoupons"
        component={MyCoupons}
        options={{
          tabBarLabel: "My Coupons",
        }}
      />
      {/* <Tab.Screen
        name="Scan"
        component={ScanPlaceholder}
        options={{
          tabBarLabel: () => null,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('Home', { openScanner: true });
          },
        })}
      /> */}
      <Tab.Screen
        name="History"
        component={MyCouponHistory}
        options={{
          tabBarLabel: "History",
        }}
      />
      <Tab.Screen
        name="Rewards"
        component={Rewards}
        options={{
          tabBarLabel: "Rewards",
        }}
      />
    </Tab.Navigator>
  );
};

// BNI ASK Bottom Tab Navigator (vendor flow disabled - user flow only)
// const BNI_TABS = [
//   { key: "Home", label: "Home", icon: "home" },
//   { key: "MyCoupons", label: "My Coupons", icon: "gift" },
//   { key: "BniConnections", label: "BNI Connections", icon: "users" },
//   { key: "Profile", label: "Profile", icon: "user" },
// ];
// 
// const BniTabNavigator = () => {
//   const insets = useSafeAreaInsets();
// 
//   return (
//     <BniTab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarActiveTintColor: BNI_COLORS.primary,
//         tabBarInactiveTintColor: BNI_COLORS.textLight,
//         tabBarLabelStyle: { fontSize: 11, fontWeight: "500", marginTop: 2 },
//         tabBarLabel: ({ color }) => {
//           const tab = BNI_TABS.find((t) => t.key === route.name);
//           const isConnections = route.name === "BniConnections";
//           return (
//             <Text
//               style={{
//                 color,
//                 fontSize: isConnections ? 9 : 11,
//                 fontWeight: "500",
//                 marginTop: 2,
//               }}
//               numberOfLines={1}
//               adjustsFontSizeToFit={isConnections}
//               minimumFontScale={0.7}
//             >
//               {tab?.label}
//             </Text>
//           );
//         },
//         tabBarStyle: {
//           height: (Platform.OS === "ios" ? 80 : 60) + insets.bottom,
//           paddingBottom: insets.bottom || 8,
//           paddingTop: 8,
//           backgroundColor: BNI_COLORS.white,
//           borderTopWidth: 1,
//           borderTopColor: BNI_COLORS.border,
//         },
//         tabBarIcon: ({ color, size, focused }) => {
//           if (route.name === "BniConnections") {
//             return (
//               <Image
//                 source={
//                   focused
//                     ? require("../assets/bniconnectionsfill.png")
//                     : require("../assets/bniconnectionsout.png")
//                 }
//                 style={{ width: size ?? 20, height: size ?? 20 }}
//                 resizeMode="contain"
//               />
//             );
//           }
//           const tab = BNI_TABS.find((t) => t.key === route.name);
//           return <Feather name={tab?.icon || "circle"} size={size ?? 20} color={color} />;
//         },
//       })}
//     >
//       <BniTab.Screen
//         name="Home"
//         component={BniVendorHomeScreen}
//       />
//       <BniTab.Screen
//         name="MyCoupons"
//         component={BniMyCouponsScreen}
//       />
// 
//       <BniTab.Screen
//         name="Profile"
//         component={BniProfileScreen}
//         options={{ tabBarLabel: "Profile" }}
//       />
//     </BniTab.Navigator>
//   );
// };

// Main App Navigation
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
      
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="OtpVerificationScreen" component={OtpVerificationScreen} />
        <Stack.Screen name="UserRegistrationScreen" component={UserRegistrationScreen} />
        <Stack.Screen name="RegisterManuallyScreen" component={RegisterManuallyScreen} />

        {/* Main App with Bottom Tabs */}
        <Stack.Screen name="MainApp" component={TabNavigator} />

        {/* Additional Screens outside tabs */}
        <Stack.Screen name="RestaurantsListScreen" component={RestaurantsListScreen} />
        <Stack.Screen name="CoffeeOfferScreen" component={CoffeeOfferScreen} />
        <Stack.Screen name="CouponsListScreen" component={CouponsListScreen} />
        <Stack.Screen name="QRScannerScreen" component={QRScannerScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="MyCouponHistory" component={MyCouponHistory} />
        <Stack.Screen name="RedeemCouponsScreen" component={RedeemCouponsScreen} />

        {/* BNI ASK Vendor App (disabled - user flow only) */}
        {/* <Stack.Screen name="BniSplashScreen" component={BniSplashScreen} />
        <Stack.Screen name="BniLoginScreen" component={BniLoginScreen} />
        <Stack.Screen name="BniOtpVerificationScreen" component={BniOtpVerificationScreen} />
        <Stack.Screen name="BniRoleSelectionScreen" component={BniRoleSelectionScreen} />
        <Stack.Screen name="BniVendorRegistrationScreen" component={BniVendorRegistrationScreen} />
        <Stack.Screen name="BniRegistrationUnderReviewScreen" component={BniRegistrationUnderReviewScreen} />
        <Stack.Screen name="BniMainTabs" component={BniTabNavigator} />
        <Stack.Screen name="BniCouponDetailScreen" component={BniCouponDetailScreen} />
        <Stack.Screen name="BniAddNewCouponScreen" component={BniAddNewCouponScreen} />
        <Stack.Screen name="BniAddBusinessScreen" component={BniAddBusinessScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabLine: {
    position: 'absolute',
    top: -15,
    width: 30,
    height: 3,
    backgroundColor: '#002161',
    borderRadius: 2,
  },
  tabIcon: {
    width: 22,
    height: 22,
  },
  centerTabButton: {
    top: -15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerCircleOuter: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 8,
  },
  centerCircle: {
    width: 50,
    height: 50,
    borderRadius: 31,
    backgroundColor: '#002161',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerIcon: {
    width: 25,
    height: 25,
    tintColor: '#fff',
  },
});

export default AppNavigation;