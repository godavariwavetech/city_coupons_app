
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
import { fetchUserProfile, updateUserProfile, deleteUserAccount, logout, fetchBniCities } from "../redux/reducers/auth"; // Add logout action
import CityPickerModal from "../components/CityPickerModal";
import AsyncStorage from "@react-native-async-storage/async-storage"; // For clearing local storage
import DeleteAccountModal from "../components/DeleteAccountModal";
import { unregisterFcmToken } from "../hooks/useFcmTokenSync";

const { width } = Dimensions.get("window");
const PRIMARY_COLOR = "rgba(0, 33, 97, 1)";

function Profile({ navigation }) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const { userId, profile, loading, bniCities = [], bniCitiesLoading, loginCityId } = useSelector(
    (state) => state.Auth
  );

  const [imageUri, setImageUri] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState(null); // { id, name } from bni/cities
  const [cityPickerVisible, setCityPickerVisible] = useState(false);
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);

  const defaultImage = require("../assets/profile1.png");

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setEmail(profile.email || "");
      setPhone(profile.mobile || "");
      setDob(profile.dob ? profile.dob.split("T")[0] : "");
      setGender(profile.gender || "");
      setAddress(profile.address || "");
      // City from the profile, else the one returned at login, else the plain city name
      const cityId = profile.cityId ?? loginCityId;
      setCity(
        bniCities.find((c) => String(c.id) === String(cityId)) ||
          (profile.city ? { id: cityId ?? null, name: profile.city } : null)
      );
      setState(profile.state || "");
      setPincode(profile.pincode || "");

      if (profile.profile && profile.profile !== "") {
        setImageUri(profile.profile);
        setImageBase64("");
      }
    }
  }, [profile, bniCities, loginCityId]);

  useEffect(() => {
    dispatch(fetchBniCities());
  }, [dispatch]);

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
            // 0. Stop push notifications for this account on this device
            await unregisterFcmToken(dispatch);

            // 1. Clear Local Storage
            await AsyncStorage.clear();

            // 2. Clear Redux State
            dispatch(logout());

            // 3. Reset Navigation Stack
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

  const handleDeleteAccount = async () => {
    setDeletingAccount(true);
    try {
      await dispatch(deleteUserAccount(userId)).unwrap();
      setShowDeleteModal(false);
      await AsyncStorage.clear();
      dispatch(logout());
      navigation.reset({ index: 0, routes: [{ name: "LoginScreen" }] });
    } catch (error) {
      Alert.alert("Error", typeof error === "string" ? error : "Failed to delete account. Please try again.");
    } finally {
      setDeletingAccount(false);
    }
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
      city: city?.name || "",
      cityId: city?.id ?? null,
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

  // const handleLogout = () => {
  //   Alert.alert(
  //     "Logout",
  //     "Are you sure you want to log out?",
  //     [
  //       { text: "Cancel", style: "cancel" },
  //       {
  //         text: "Logout",
  //         style: "destructive",
  //         onPress: async () => {
  //           try {
  //             // Clear AsyncStorage (or any local storage)
  //             await AsyncStorage.clear();

  //             // Dispatch logout action to clear Redux state
  //             dispatch(logout());

  //             // Navigate to LoginScreen and reset stack
  //             navigation.reset({
  //               index: 0,
  //               routes: [{ name: "LoginScreen" }],
  //             });
  //           } catch (error) {
  //             console.error("Logout error:", error);
  //             Alert.alert("Error", "Failed to log out. Please try again.");
  //           }
  //         },
  //       },
  //     ]
  //   );
  // };

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
{profile?.BNIMember === 1 && (
  <View style={styles.bniTagContainer}>
    <MaterialCommunityIcons name="shield-check" size={16} color="#fff" />
    <Text style={styles.bniTagText}>BNI Member</Text>
  </View>
)}
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
        <TouchableOpacity
          style={[styles.inputCard, styles.selectCard]}
          activeOpacity={0.7}
          onPress={() => setCityPickerVisible(true)}
        >
          <Text style={[styles.input, styles.selectText, !city && styles.selectPlaceholder]} numberOfLines={1}>
            {city?.name || "Select city"}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#999" />
        </TouchableOpacity>

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
<TouchableOpacity
  style={styles.logoutBtn}
  onPress={handleLogout}
>
  <MaterialCommunityIcons name="logout" size={24} color="#d32f2f" />
  <Text style={styles.logoutText}>Logout</Text>
</TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteAccountBtn}
          onPress={() => setShowDeleteModal(true)}
        >
          <MaterialCommunityIcons name="delete-outline" size={22} color="#d32f2f" />
          <Text style={styles.deleteAccountText}>Delete Account</Text>
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

      <DeleteAccountModal
        visible={showDeleteModal}
        loading={deletingAccount}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
      />

      <CityPickerModal
        visible={cityPickerVisible}
        cities={bniCities}
        loading={bniCitiesLoading}
        selectedCity={city}
        onSelect={(c) => {
          setCity(c);
          setCityPickerVisible(false);
        }}
        onClose={() => setCityPickerVisible(false)}
      />
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
  selectCard: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectText: {
    flex: 1,
  },
  selectPlaceholder: {
    color: "#999",
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
  deleteAccountBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    marginHorizontal: 20,
    paddingVertical: 14,
  },
  deleteAccountText: {
    color: "#d32f2f",
    fontSize: 16,
    fontFamily: "SF-Pro-Display-Medium",
    marginLeft: 8,
  },


  saveBtn: {
  marginTop: 40,
  marginHorizontal: 20,
  paddingVertical: 16,
  borderRadius: 14,
  alignItems: "center",
  marginBottom: 10, // Added small margin for breathing room
},
logoutBtn: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 10, // Reduced from 30 to stay closer to the Save button
  marginHorizontal: 20,
  paddingVertical: 16,
  borderRadius: 14,
  backgroundColor: "#ffebee",
  borderWidth: 1,
  borderColor: "#ffcdd2",
},


bniTagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#002161', // Brand navy
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: -20, // Pull it up slightly to overlap/sit closer to the avatar
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  bniTagText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'SF-Pro-Display-Bold',
    marginLeft: 4,
  },
});

export default Profile;