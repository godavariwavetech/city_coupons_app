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
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import CustomModal from "../components/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { requestLoginOtp, resetOtpState } from "../redux/reducers/auth"; // adjust path

const LoginScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [phone, setPhone] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const { loading, isNewUser, otpRequestSuccess, message } = useSelector(
    (state) => state.Auth
  );

  // Reset state when screen mounts
  useEffect(() => {
    dispatch(resetOtpState());
  }, [dispatch]);

  // Watch for successful OTP request and navigate accordingly
  // useEffect(() => {
  //   if (otpRequestSuccess) {
  //    navigation.navigate("OtpVerificationScreen", { 
  //     mobile: phone  // This is the key fix!
  //   });
  //   } else if (isNewUser) {
  //     Alert.alert("New User", message || "New User - Register First", [
  //       { text: "OK", onPress: () => navigation.navigate("RegisterManuallyScreen") },
  //     ]);
  //   }
  // }, [otpRequestSuccess, isNewUser, navigation, message]);
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
      navigation.navigate("OtpVerificationScreen", { mobile: phone });
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
    console.log("Login button pressed, phone:", phone);
    const error = validatePhone(phone);
    if (error) {
      setErrorMessage(error);
      setModalVisible(true);
      return;
    }

    // Dispatch OTP request
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
  container: { flex: 1, backgroundColor: "#fff", justifyContent: "center" },
  innerContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  welcomeText: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: "600",
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
    color: "#555",
    marginRight: responsiveWidth(2),
  },
  input: { flex: 1, fontSize: responsiveFontSize(2), color: "#000" },
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
    fontWeight: "600",
  },
});