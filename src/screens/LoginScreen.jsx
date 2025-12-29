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






// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
//   ScrollView,
//   TextInput,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {
//   responsiveWidth as rw,
//   responsiveHeight as rh,
//   responsiveFontSize as rf,
// } from 'react-native-responsive-dimensions';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// const customers = [
//   {
//     name: 'Sai Kirana Store',
//     statusColor: '#2ECC71',
//     amount: '₹2,300',
//   },
//   {
//     name: 'Annapurna General Store',
//     statusColor: '#FBC02D',
//     amount: '₹4,500',
//   },
//   {
//     name: 'Sri Venkateswara Traders',
//     statusColor: '#E53935',
//     amount: '₹1,500',
//   },
//   {
//     name: 'Lakshmi Provisions',
//     statusColor: '#2ECC71',
//     amount: '₹3,200',
//   },
//   {
//     name: 'Krishna Enterprises',
//     statusColor: '#2ECC71',
//     amount: '₹2,800',
//   },
// ];

// const CustomerList = () => {
//   const insets = useSafeAreaInsets();

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />

//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity>
//           <Icon name="arrow-left" size={rf(2.5)} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Customer List</Text>
//         <View style={{ width: 24 }} />
//       </View>

//       <ScrollView contentContainerStyle={styles.content}>

//         {/* SEARCH */}
//         <View style={styles.searchBox}>
//           <Icon name="magnify" size={rf(2.2)} color="#999" />
//           <TextInput
//             placeholder="Search customers..."
//             placeholderTextColor="#000"
//             style={styles.searchInput}
//           />
//         </View>

//         {/* FILTER BADGES */}
//         <View style={styles.filterRow}>
//           <View style={styles.filterBadge}>
//             <View style={[styles.filterDot, { backgroundColor: '#2ECC71' }]} />
//             <Text style={styles.filterText}>36</Text>
//           </View>

//           <View style={styles.filterBadge}>
//             <View style={[styles.filterDot, { backgroundColor: '#FBC02D' }]} />
//             <Text style={styles.filterText}>36</Text>
//           </View>

//           <View style={styles.filterBadge}>
//             <View style={[styles.filterDot, { backgroundColor: '#E53935' }]} />
//             <Text style={styles.filterText}>36</Text>
//           </View>
//         </View>

//         {/* CUSTOMER LIST */}
//         {customers.map((item, index) => (
//           <View key={index} style={styles.customerCard}>

//             {/* TOP ROW */}
//             <View style={styles.topRow}>
//               <View style={styles.leftTop}>
//                 <View
//                   style={[
//                     styles.statusDot,
//                     { backgroundColor: item.statusColor },
//                   ]}
//                 />
//                 <Text style={styles.storeName}>{item.name}</Text>
//               </View>

//               <View style={styles.rightTop}>
//                 <Text style={styles.cityText}>Hyd</Text>
//                 <View style={styles.pendingBadge}>
//                   <Text style={styles.pendingText}>Pending</Text>
//                 </View>
//               </View>
//             </View>

//             {/* PHONE */}
//             <Text style={styles.phoneText}>9663474733</Text>

//             {/* LOCATION */}
//             <View style={styles.locationRow}>
//               <Icon name="map-marker-outline" size={rf(2)} color="#E53935" />
//               <Text style={styles.locationText}>Ameerpet (Route b)</Text>
//             </View>

//             {/* OUTSTANDING */}
//             <Text style={styles.outstandingText}>
//               ₹ Outstanding: {item.amount}
//             </Text>

//             {/* ACTIONS */}
//             <View style={styles.actionRow}>
//               <TouchableOpacity style={styles.visitBtn}>
//                 <Text style={styles.visitText}>Visit</Text>
//               </TouchableOpacity>

//               <TouchableOpacity style={styles.callBtn}>
//                 <Icon name="phone" size={rf(2.3)} color="#2ECC71" />
//               </TouchableOpacity>
//             </View>

//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// export default CustomerList;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F6F6F6',
//   },

//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: rw(4),
//     backgroundColor: '#fff',
//     elevation: 3,
//   },

//   headerTitle: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: rf(2.2),
//     fontWeight: '600',
//     color:"#000"
//   },

//   content: {
//     padding: rw(4),
//   },

//   searchBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     paddingHorizontal: rw(3),
//     height: rh(5.5),
//     elevation: 2,
//   },

//   searchInput: {
//     flex: 1,
//     fontSize: rf(1.6),
//     marginLeft: rw(2),
//   },

//   filterRow: {
//     flexDirection: 'row',
//     marginVertical: rh(2),
//     justifyContent:"center"
//   },

//   filterBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingHorizontal: rw(4),
//     paddingVertical: rh(0.8),
//     borderRadius: 20,
//     marginRight: rw(3),
//     elevation: 2,
//   },

//   filterDot: {
//     width: rw(2),
//     height: rw(2),
//     borderRadius: rw(1),
//     marginRight: rw(2),
//   },

//   filterText: {
//     fontSize: rf(1.6),
//     fontWeight: '600',
//     color:"#000"
//   },

//   customerCard: {
//     backgroundColor: '#fff',
//     borderRadius: 14,
//     padding: rw(4),
//     marginBottom: rh(2),
//     elevation: 3,
//   },

//   topRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },

//   leftTop: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   statusDot: {
//     width: rw(2),
//     height: rw(2),
//     borderRadius: rw(1),
//     marginRight: rw(2),
//   },

//   storeName: {
//     fontSize: rf(1.9),
//     fontWeight: '600',
//     color:"#000"
//   },

//   rightTop: {
//     alignItems: 'flex-end',
//   },

//   cityText: {
//     fontSize: rf(1.6),
//     color: '#666',
//   },

//   pendingBadge: {
//     backgroundColor: '#FFF3E0',
//     paddingHorizontal: rw(3),
//     paddingVertical: rh(0.3),
//     borderRadius: 8,
//     marginTop: rh(0.4),
//   },

//   pendingText: {
//     color: '#FB8C00',
//     fontSize: rf(1.4),
//   },

//   phoneText: {
//     fontSize: rf(1.6),
//     color: '#555',
//     marginTop: rh(0.8),
//   },

//   locationRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: rh(0.6),
//   },

//   locationText: {
//     fontSize: rf(1.6),
//     marginLeft: rw(1),
//     color: '#555',
//   },

//   outstandingText: {
//     marginTop: rh(0.8),
//     fontSize: rf(1.7),
//     fontWeight: '600',
//     color: '#E53935',
//   },

//   actionRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: rh(1.2),
//   },

//   visitBtn: {
//     flex: 1,
//     backgroundColor: '#F44336',
//     height: rh(5),
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: rw(3),
//   },

//   visitText: {
//     color: '#fff',
//     fontSize: rf(1.8),
//     fontWeight: '600',
//   },

//   callBtn: {
//     width: rw(12),
//     height: rw(12),
//     borderRadius: rw(6),
//     backgroundColor: '#E8F5E9',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
