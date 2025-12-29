// // Profile.js
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   TextInput,
//   StatusBar,
//   Dimensions,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { launchImageLibrary } from "react-native-image-picker";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserProfile } from "../redux/reducers/auth"; // Update this path correctly!

// const { width } = Dimensions.get("window");
// const PRIMARY_COLOR = "rgba(0, 33, 97, 1)";

// function Profile({ navigation }) {
//   const insets = useSafeAreaInsets();
//   const dispatch = useDispatch();

//   // Get userId and profile from Redux (recommended way)
//   const { userId, profile, loading: reduxLoading } = useSelector((state) => state.Auth);

//   // Local state for form + image
//   const [imageUri, setImageUri] = useState(null);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [dob, setDob] = useState("");
//   const [gender, setGender] = useState("");
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [pincode, setPincode] = useState("");

//   const defaultImage = require("../assets/profile1.png");

//   // Fill form when profile loads from Redux
//   useEffect(() => {
//     if (profile) {
//       setName(profile.name || "");
//       setEmail(profile.email || "");
//       setPhone(profile.mobile || "");
//       setDob(profile.dob ? profile.dob.split("T")[0] : "");
//       setGender(profile.gender || "");
//       setAddress(profile.address || "");
//       setCity(profile.city || "");
//       setState(profile.state || "");
//       setPincode(profile.pincode || "");

//       if (profile.profile && profile.profile !== "") {
//         setImageUri(profile.profile);
//       }
//     }
//   }, [profile]);

//   // Trigger API call when screen opens (if not already loaded)
//   useEffect(() => {
//     if (userId && !profile) {
//       dispatch(fetchUserProfile(userId));
//     }
//   }, [dispatch, userId, profile]);

//   const pickImage = () => {
//     launchImageLibrary(
//       {
//         mediaType: "photo",
//         quality: 0.8,
//         maxWidth: 800,
//         maxHeight: 800,
//       },
//       (response) => {
//         if (response.didCancel) return;
//         if (response.errorCode) {
//           Alert.alert("Error", response.errorMessage || "Image picker error");
//           return;
//         }
//         if (response.assets?.[0]?.uri) {
//           setImageUri(response.assets[0].uri);
//         }
//       }
//     );
//   };

//   // Show loading if Redux is fetching
//   if (reduxLoading || (userId && !profile)) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={PRIMARY_COLOR} />
//         <Text style={styles.loadingText}>Loading profile...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>
//       <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation?.goBack?.()}>
//           <Ionicons name="chevron-back" size={26} color={PRIMARY_COLOR} />
//         </TouchableOpacity>
//         <Text style={[styles.headerText, { color: PRIMARY_COLOR }]}>My Profile</Text>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>

//         {/* Profile Picture */}
//         <View style={styles.avatarWrap}>
//           <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
//             <Image
//               source={imageUri ? { uri: imageUri } : defaultImage}
//               style={styles.avatar}
//               resizeMode="cover"
//             />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.editBtn} onPress={pickImage}>
//             <MaterialCommunityIcons name="pencil-outline" size={20} color={PRIMARY_COLOR} />
//           </TouchableOpacity>
//         </View>

//         {/* Name */}
//         <Text style={styles.label}>Name</Text>
//         <View style={styles.inputCard}>
//           <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Enter name" />
//         </View>

//         {/* Email */}
//         <Text style={styles.label}>Email ID</Text>
//         <View style={styles.inputCard}>
//           <TextInput
//             value={email}
//             onChangeText={setEmail}
//             style={styles.input}
//             keyboardType="email-address"
//             autoCapitalize="none"
//             placeholder="Enter email"
//           />
//         </View>

//         {/* Phone */}
//         <Text style={styles.label}>Mobile Number</Text>
//         <View style={styles.inputCard}>
//           <TextInput value={phone} style={styles.input} editable={false} />
//         </View>

//         {/* DOB */}
//         <Text style={styles.label}>Date of Birth</Text>
//         <View style={styles.inputCard}>
//           <TextInput value={dob} onChangeText={setDob} style={styles.input} placeholder="YYYY-MM-DD" />
//         </View>

//         {/* Gender */}
//         <Text style={styles.label}>Gender</Text>
//         <View style={styles.inputCard}>
//           <TextInput value={gender} onChangeText={setGender} style={styles.input} placeholder="Male/Female/Other" />
//         </View>

//         {/* Address */}
//         <Text style={styles.label}>Address</Text>
//         <View style={styles.inputCard}>
//           <TextInput value={address} onChangeText={setAddress} style={styles.input} />
//         </View>

//         {/* City */}
//         <Text style={styles.label}>City</Text>
//         <View style={styles.inputCard}>
//           <TextInput value={city} onChangeText={setCity} style={styles.input} />
//         </View>

//         {/* State */}
//         <Text style={styles.label}>State</Text>
//         <View style={styles.inputCard}>
//           <TextInput value={state} onChangeText={setState} style={styles.input} />
//         </View>

//         {/* Pincode */}
//         <Text style={styles.label}>Pincode</Text>
//         <View style={styles.inputCard}>
//           <TextInput
//             value={pincode}
//             onChangeText={setPincode}
//             style={styles.input}
//             keyboardType="numeric"
//             maxLength={6}
//           />
//         </View>

//         {/* Save Button */}
//         <TouchableOpacity
//           style={[styles.saveBtn, { backgroundColor: PRIMARY_COLOR }]}
//           onPress={() => Alert.alert("Saved", "Profile updated successfully!")}
//         >
//           <Text style={styles.saveText}>Save Changes</Text>
//         </TouchableOpacity>

//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   loadingText: {
//     marginTop: 12,
//     fontSize: 16,
//     color: "#555",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     backgroundColor: "#fff",
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: "700",
//     marginLeft: 12,
//   },
//   avatarWrap: {
//     alignItems: "center",
//     marginVertical: 30,
//     position: "relative",
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     borderWidth: 3,
//     borderColor: "#f0ece8",
//     backgroundColor: "#f0f0f0",
//   },
//   editBtn: {
//     position: "absolute",
//     right: width / 2 - 60,
//     bottom: 6,
//     backgroundColor: "#fff",
//     padding: 8,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     elevation: 6,
//     shadowColor: "#000",
//     shadowOpacity: 0.15,
//   },
 
  
//   label: {
//     marginLeft: 25,
//     marginTop: 18,
//     marginBottom: 6,
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#555",
//   },
//   inputCard: {
//     marginHorizontal: 20,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     borderWidth: 1.5,
//     borderColor: "#f0ece8",
//     paddingHorizontal: 16,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     elevation: 3,
//   },
//   input: {
//     fontSize: 16,
//     color: "#222",
//     paddingVertical: 14,
//   },
//   saveBtn: {
//     marginTop: 40,
//     marginHorizontal: 20,
//     paddingVertical: 16,
//     borderRadius: 14,
//     alignItems: "center",
//   },
//   saveText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
//   },
// });

// export default Profile;
// Profile.js
// Profile.js
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   TextInput,
//   StatusBar,
//   Dimensions,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { launchImageLibrary } from "react-native-image-picker";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserProfile, updateUserProfile } from "../redux/reducers/auth";

// const { width } = Dimensions.get("window");
// const PRIMARY_COLOR = "rgba(0, 33, 97, 1)";

// function Profile({ navigation }) {
//   const insets = useSafeAreaInsets();
//   const dispatch = useDispatch();

//   const { userId, profile, loading } = useSelector((state) => state.Auth);

//   const [imageUri, setImageUri] = useState(null);
//   const [imageBase64, setImageBase64] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [dob, setDob] = useState("");
//   const [gender, setGender] = useState("");
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [pincode, setPincode] = useState("");

//   const defaultImage = require("../assets/profile1.png");

//   useEffect(() => {
//     if (profile) {
//       setName(profile.name || "");
//       setEmail(profile.email || "");
//       setPhone(profile.mobile || "");
//       setDob(profile.dob ? profile.dob.split("T")[0] : "");
//       setGender(profile.gender || "");
//       setAddress(profile.address || "");
//       setCity(profile.city || "");
//       setState(profile.state || "");
//       setPincode(profile.pincode || "");

//       if (profile.profile && profile.profile !== "") {
//         setImageUri(profile.profile);
//         setImageBase64("");
//       }
//     }
//   }, [profile]);

//   useEffect(() => {
//     if (userId && !profile) {
//       dispatch(fetchUserProfile(userId));
//     }
//   }, [dispatch, userId, profile]);

//   const pickImage = () => {
//     launchImageLibrary(
//       {
//         mediaType: "photo",
//         includeBase64: true,
//         maxWidth: 800,
//         maxHeight: 800,
//         quality: 0.8,
//       },
//       (response) => {
//         if (response.didCancel) return;
//         if (response.errorCode) {
//           Alert.alert("Error", response.errorMessage || "Image picker failed");
//           return;
//         }

//         if (response.assets && response.assets[0]) {
//           const asset = response.assets[0];
//           const uri = asset.uri;
//           const base64 = asset.base64
//             ? `data:${asset.type || "image/jpeg"};base64,${asset.base64}`
//             : "";

//           setImageUri(uri);
//           setImageBase64(base64);
//         }
//       }
//     );
//   };

//   const handleSave = async () => {
//     if (!userId) {
//       Alert.alert("Error", "User not logged in");
//       return;
//     }

//     const payload = {
//       name,
//       mobile: phone,
//       email,
//       gender,
//       dob: dob || null,
//       address,
//       city,
//       state,
//       pincode,
//       ...(imageBase64 ? { image: imageBase64 } : {}),
//     };

//     dispatch(updateUserProfile({ userId, profileData: payload }))
//       .unwrap()
//       .then((res) => {
//         Alert.alert("Success", res.message || "Profile updated successfully!");
//         dispatch(fetchUserProfile(userId));
//       })
//       .catch((err) => {
//         Alert.alert("Failed", err || "Could not update profile");
//       });
//   };

//   if (loading || (userId && !profile)) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={PRIMARY_COLOR} />
//         <Text style={styles.loadingText}>Loading profile...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>
//       <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation?.goBack?.()}>
//           <Ionicons name="chevron-back" size={26} color={PRIMARY_COLOR} />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>My Profile</Text>
//       </View>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 50 }}
//       >
//         {/* Profile Picture */}
//         <View style={styles.avatarWrap}>
//           <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
//             <Image
//               source={imageUri ? { uri: imageUri } : defaultImage}
//               style={styles.avatar}
//               resizeMode="cover"
//             />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.editBtn} onPress={pickImage}>
//             <MaterialCommunityIcons name="pencil-outline" size={20} color={PRIMARY_COLOR} />
//           </TouchableOpacity>
//         </View>

//         {/* Input Fields */}
//         <Text style={styles.label}>Name</Text>
//         <View style={styles.inputCard}>
//           <TextInput
//             value={name}
//             onChangeText={setName}
//             style={styles.input}
//             placeholder="Enter your name"
//             placeholderTextColor="#999"
//           />
//         </View>

//         <Text style={styles.label}>Email ID</Text>
//         <View style={styles.inputCard}>
//           <TextInput
//             value={email}
//             onChangeText={setEmail}
//             style={styles.input}
//             keyboardType="email-address"
//             placeholder="Enter email"
//             placeholderTextColor="#999"
//           />
//         </View>

//         <Text style={styles.label}>Mobile Number</Text>
//         <View style={styles.inputCard}>
//           <TextInput value={phone} style={styles.input} editable={false} />
//         </View>

//         <Text style={styles.label}>Date of Birth</Text>
//         <View style={styles.inputCard}>
//           <TextInput
//             value={dob}
//             onChangeText={setDob}
//             style={styles.input}
//             placeholder="YYYY-MM-DD"
//             placeholderTextColor="#999"
//           />
//         </View>

//         <Text style={styles.label}>Gender</Text>
//         <View style={styles.inputCard}>
//           <TextInput
//             value={gender}
//             onChangeText={setGender}
//             style={styles.input}
//             placeholder="e.g., Male / Female / Other"
//             placeholderTextColor="#999"
//           />
//         </View>

//         <Text style={styles.label}>Address</Text>
//         <View style={styles.inputCard}>
//           <TextInput
//             value={address}
//             onChangeText={setAddress}
//             style={styles.input}
//             placeholder="Enter address"
//             placeholderTextColor="#999"
//           />
//         </View>

//         <Text style={styles.label}>City</Text>
//         <View style={styles.inputCard}>
//           <TextInput
//             value={city}
//             onChangeText={setCity}
//             style={styles.input}
//             placeholder="Enter city"
//             placeholderTextColor="#999"
//           />
//         </View>

//         <Text style={styles.label}>State</Text>
//         <View style={styles.inputCard}>
//           <TextInput
//             value={state}
//             onChangeText={setState}
//             style={styles.input}
//             placeholder="Enter state"
//             placeholderTextColor="#999"
//           />
//         </View>

//         <Text style={styles.label}>Pincode</Text>
//         <View style={styles.inputCard}>
//           <TextInput
//             value={pincode}
//             onChangeText={setPincode}
//             style={styles.input}
//             keyboardType="numeric"
//             maxLength={6}
//             placeholder="Enter pincode"
//             placeholderTextColor="#999"
//           />
//         </View>

//         {/* SAVE BUTTON */}
//         <TouchableOpacity
//           style={[styles.saveBtn, { backgroundColor: PRIMARY_COLOR }]}
//           onPress={handleSave}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.saveText}>Save Changes</Text>
//           )}
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// }
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  StatusBar,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile, logout } from "../redux/reducers/auth"; // Add logout action
import AsyncStorage from "@react-native-async-storage/async-storage"; // For clearing local storage

const { width } = Dimensions.get("window");
const PRIMARY_COLOR = "rgba(0, 33, 97, 1)";

function Profile({ navigation }) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const { userId, profile, loading } = useSelector((state) => state.Auth);

  const [imageUri, setImageUri] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const defaultImage = require("../assets/profile1.png");

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setEmail(profile.email || "");
      setPhone(profile.mobile || "");
      setDob(profile.dob ? profile.dob.split("T")[0] : "");
      setGender(profile.gender || "");
      setAddress(profile.address || "");
      setCity(profile.city || "");
      setState(profile.state || "");
      setPincode(profile.pincode || "");

      if (profile.profile && profile.profile !== "") {
        setImageUri(profile.profile);
        setImageBase64("");
      }
    }
  }, [profile]);

  useEffect(() => {
    if (userId && !profile) {
      dispatch(fetchUserProfile(userId));
    }
  }, [dispatch, userId, profile]);

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: true,
        maxWidth: 800,
        maxHeight: 800,
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert("Error", response.errorMessage || "Image picker failed");
          return;
        }

        if (response.assets && response.assets[0]) {
          const asset = response.assets[0];
          const uri = asset.uri;
          const base64 = asset.base64
            ? `data:${asset.type || "image/jpeg"};base64,${asset.base64}`
            : "";

          setImageUri(uri);
          setImageBase64(base64);
        }
      }
    );
  };

  const handleSave = async () => {
    if (!userId) {
      Alert.alert("Error", "User not logged in");
      return;
    }

    const payload = {
      name,
      mobile: phone,
      email,
      gender,
      dob: dob || null,
      address,
      city,
      state,
      pincode,
      ...(imageBase64 ? { image: imageBase64 } : {}),
    };

    dispatch(updateUserProfile({ userId, profileData: payload }))
      .unwrap()
      .then((res) => {
        Alert.alert("Success", res.message || "Profile updated successfully!");
        dispatch(fetchUserProfile(userId));
      })
      .catch((err) => {
        Alert.alert("Failed", err || "Could not update profile");
      });
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              // Clear AsyncStorage (or any local storage)
              await AsyncStorage.clear();

              // Dispatch logout action to clear Redux state
              dispatch(logout());

              // Navigate to LoginScreen and reset stack
              navigation.reset({
                index: 0,
                routes: [{ name: "LoginScreen" }],
              });
            } catch (error) {
              console.error("Logout error:", error);
              Alert.alert("Error", "Failed to log out. Please try again.");
            }
          },
        },
      ]
    );
  };

  if (loading || (userId && !profile)) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack?.()}>
          <Ionicons name="chevron-back" size={26} color={PRIMARY_COLOR} />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Profile</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }} // Increased for logout button
      >
        {/* Profile Picture */}
        <View style={styles.avatarWrap}>
          <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
            <Image
              source={imageUri ? { uri: imageUri } : defaultImage}
              style={styles.avatar}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editBtn} onPress={pickImage}>
            <MaterialCommunityIcons name="pencil-outline" size={20} color={PRIMARY_COLOR} />
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <Text style={styles.label}>Name</Text>
        <View style={styles.inputCard}>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#999"
          />
        </View>

        <Text style={styles.label}>Email ID</Text>
        <View style={styles.inputCard}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            placeholder="Enter email"
            placeholderTextColor="#999"
          />
        </View>

        <Text style={styles.label}>Mobile Number</Text>
        <View style={styles.inputCard}>
          <TextInput value={phone} style={styles.input} editable={false} />
        </View>

        <Text style={styles.label}>Date of Birth</Text>
        <View style={styles.inputCard}>
          <TextInput
            value={dob}
            onChangeText={setDob}
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#999"
          />
        </View>

        <Text style={styles.label}>Gender</Text>
        <View style={styles.inputCard}>
          <TextInput
            value={gender}
            onChangeText={setGender}
            style={styles.input}
            placeholder="e.g., Male / Female / Other"
            placeholderTextColor="#999"
          />
        </View>

        <Text style={styles.label}>Address</Text>
        <View style={styles.inputCard}>
          <TextInput
            value={address}
            onChangeText={setAddress}
            style={styles.input}
            placeholder="Enter address"
            placeholderTextColor="#999"
          />
        </View>

        <Text style={styles.label}>City</Text>
        <View style={styles.inputCard}>
          <TextInput
            value={city}
            onChangeText={setCity}
            style={styles.input}
            placeholder="Enter city"
            placeholderTextColor="#999"
          />
        </View>

        <Text style={styles.label}>State</Text>
        <View style={styles.inputCard}>
          <TextInput
            value={state}
            onChangeText={setState}
            style={styles.input}
            placeholder="Enter state"
            placeholderTextColor="#999"
          />
        </View>

        <Text style={styles.label}>Pincode</Text>
        <View style={styles.inputCard}>
          <TextInput
            value={pincode}
            onChangeText={setPincode}
            style={styles.input}
            keyboardType="numeric"
            maxLength={6}
            placeholder="Enter pincode"
            placeholderTextColor="#999"
          />
        </View>

        {/* SAVE BUTTON */}
        <TouchableOpacity
          style={[styles.saveBtn, { backgroundColor: PRIMARY_COLOR }]}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveText}>Save Changes</Text>
          )}
        </TouchableOpacity>

        {/* LOGOUT BUTTON */}
        {/* <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogout}
        >
          <MaterialCommunityIcons name="logout" size={24} color="#d32f2f" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#555",
    fontFamily: "SF-Pro-Display-Medium",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "SF-Pro-Display-Bold",
    color: PRIMARY_COLOR,
    marginLeft: 12,
  },
  avatarWrap: {
    alignItems: "center",
    marginVertical: 30,
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#f0ece8",
  },
  editBtn: {
    position: "absolute",
    right: width / 2 - 60,
    bottom: 6,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 6,
  },
  label: {
    marginLeft: 25,
    marginTop: 18,
    marginBottom: 6,
    fontSize: 14,
    fontFamily: "SF-Pro-Display-Semibold",
    color: "#555",
  },
  inputCard: {
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#f0ece8",
    paddingHorizontal: 16,
  },
  input: {
    fontSize: 16,
    color: "#222",
    paddingVertical: 14,
    fontFamily: "SF-Pro-Display-Medium",
  },
  saveBtn: {
    marginTop: 40,
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "SF-Pro-Display-Bold",
  },
   logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: "#ffebee",
    borderWidth: 1,
    borderColor: "#ffcdd2",
  },
  logoutText: {
    color: "#d32f2f",
    fontSize: 18,
    fontFamily: "SF-Pro-Display-Bold",
    marginLeft: 10,
  },
});

export default Profile;