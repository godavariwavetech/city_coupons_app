import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const OtpVerificationScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const inputRefs = useRef([]);

  const handleOtpChange = (value, index) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 4) {
      setModalMessage("Please enter a valid 4-digit code");
      setModalVisible(true);
      return;
    }
     navigation.replace("QRScannerScreen");
    // Add OTP verification logic here
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Logo */}
      <Image
        source={require("../assets/icon2.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>Enter verification code</Text>

      {/* Subtext */}
      <Text style={styles.subtitle}>
        A code has been sent to <Text style={styles.phone}>+91 4545454710</Text>
      </Text>

      {/* OTP Inputs */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
          />
        ))}
      </View>

      {/* Resend */}
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Don’t receive a code? </Text>
        <TouchableOpacity>
          <Text style={styles.resendLink}>Resend</Text>
        </TouchableOpacity>
      </View>

      {/* Validation Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Verify Button */}
      <TouchableOpacity style={styles.verifyButton} onPress={handleSubmit}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: responsiveWidth(50),
    height: responsiveHeight(15),
    // marginBottom: responsiveHeight(5),
  },
  title: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: "600",
    color: "#000",
    marginBottom: responsiveHeight(1),
  },
  subtitle: {
    fontSize: responsiveFontSize(1.8),
    color: "#555",
    marginBottom: responsiveHeight(4),
  },
  phone: {
    fontWeight: "600",
    color: "#000",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: responsiveWidth(60),
    marginBottom: responsiveHeight(3),
  },
  otpInput: {
    width: responsiveWidth(12),
    height: responsiveHeight(6.5),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    textAlign: "center",
    fontSize: responsiveFontSize(2.3),
    color: "#000",
  },
  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  resendText: {
    fontSize: responsiveFontSize(1.8),
    color: "#000",
  },
  resendLink: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: "600",
    color: "#001D4A",
  },
  verifyButton: {
    backgroundColor: "#001D4A",
    marginTop: responsiveHeight(5),
    width: responsiveWidth(50),
    height: responsiveHeight(6),
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  verifyText: {
    color: "#fff",
    fontSize: responsiveFontSize(2),
    fontWeight: "600",
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalBox: {
    width: responsiveWidth(70),
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: responsiveHeight(3),
    paddingHorizontal: responsiveWidth(5),
    alignItems: "center",
  },
  modalMessage: {
    fontSize: responsiveFontSize(2),
    color: "#000",
    marginBottom: responsiveHeight(2),
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#001D4A",
    borderRadius: 25,
    paddingVertical: responsiveHeight(1.2),
    paddingHorizontal: responsiveWidth(10),
  },
  modalButtonText: {
    color: "#fff",
    fontSize: responsiveFontSize(1.9),
    fontWeight: "600",
  },
});
