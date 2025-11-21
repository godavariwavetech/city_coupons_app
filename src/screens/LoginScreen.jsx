import React, { useState } from "react";
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
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import CustomModal from "../components/CustomModal"; // Adjust path as needed

const LoginScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [phone, setPhone] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validatePhone = (phoneNumber) => {
    // Remove any non-digit characters and check for exactly 10 digits
    const digitsOnly = phoneNumber.replace(/\D/g, "");
    if (digitsOnly.length !== 10) {
      return "Please enter a valid 10-digit phone number.";
    }
    // Additional checks can be added, e.g., starts with certain digits, but keeping it simple
    return null; // No error
  };

  const handleLogin = () => {
    const error = validatePhone(phone);
    if (error) {
      setErrorMessage(error);
      setModalVisible(true);
      return;
    }
    // Proceed with login logic (e.g., API call)
    Alert.alert("Success", "Phone validated! Proceeding with login...");
    navigation.navigate("OtpVerificationScreen")
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleModalConfirm = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.innerContainer}
      >
        {/* Welcome Text */}
        <Text style={styles.welcomeText}>Welcome to</Text>

        {/* App Logo */}
        <Image
          source={require("../assets/icon2.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Phone Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            placeholderTextColor="#888"
            keyboardType="number-pad"
            value={phone}
            onChangeText={setPhone}
            maxLength={10} // Limit to 10 digits
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        {/* New User Text */}
        {/* <TouchableOpacity>
          <Text style={styles.newUserText}>New User?</Text>
        </TouchableOpacity> */}
      </KeyboardAvoidingView>

      {/* Validation Error Modal */}
      <CustomModal
        visible={modalVisible}
        onClose={handleModalClose}
        title="Validation Error"
        content={errorMessage}
        onConfirm={handleModalConfirm}
        confirmText="OK"
        showCancelButton={false} // No cancel button for error modal
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
    fontWeight: "600",
    color: "#7a7a7a",
    marginBottom: responsiveHeight(2),
  },
  logo: {
  width: responsiveWidth(70),
  height: responsiveHeight(15),
//   marginBottom: responsiveHeight(8),
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
    color: "#555",
    marginRight: responsiveWidth(2),
  },
  input: {
    flex: 1,
    fontSize: responsiveFontSize(2),
    color: "#000",
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
  loginText: {
    color: "#fff",
    fontSize: responsiveFontSize(2),
    fontWeight: "600",
  },
  newUserText: {
    fontSize: responsiveFontSize(1.8),
    color: "#000",
    textDecorationLine: "underline",
  },
});