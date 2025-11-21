import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  ScrollView,
  Platform,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker';
import { launchImageLibrary } from 'react-native-image-picker'; // Removed launchCamera import since camera is not used
import CustomModal from '../components/CustomModal';

const RegisterManuallyScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  // Form state
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');

  // Error states
  const [errors, setErrors] = useState({});

  // Image state
  const [profileImage, setProfileImage] = useState(require('../assets/profile1.png'));

  // Dropdown states
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');

  const showErrorModal = (title, content) => {
    setIsSuccess(false);
    setModalTitle(title);
    setModalContent(content);
    setModalVisible(true);
  };

  const showSuccessModal = (title, content) => {
    setIsSuccess(true);
    setModalTitle(title);
    setModalContent(content);
    setModalVisible(true);
  };

  // Validation functions
  const validateFullName = (name) => {
    if (!name.trim()) return 'Full Name is required';
    if (name.trim().length < 2) return 'Full Name must be at least 2 characters';
    return null;
  };

  const validateMobileNumber = (num) => {
    if (!num.trim()) return 'Mobile Number is required';
    const clean = num.replace(/\D/g, '');
    if (clean.length !== 10) return 'Mobile Number must be exactly 10 digits';
    return null;
  };

  const validateEmail = (email) => {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return null;
  };

  const validateGender = (g) => {
    if (!g) return 'Gender is required';
    return null;
  };

  const validateDateOfBirth = (dob) => {
    if (!dob) return 'Date of Birth is required';
    return null;
  };

  const validateAddress = (addr) => {
    if (!addr.trim()) return 'Address is required';
    if (addr.trim().length < 5) return 'Address must be at least 5 characters';
    return null;
  };

  const validateCity = (c) => {
    if (!c.trim()) return 'City is required';
    if (c.trim().length < 2) return 'City must be at least 2 characters';
    return null;
  };

  const validatePincode = (p) => {
    if (!p.trim()) return 'Pincode is required';
    if (p.length !== 6 || !/^\d{6}$/.test(p)) return 'Pincode must be exactly 6 digits';
    return null;
  };

  const validateState = (s) => {
    if (!s.trim()) return 'State is required';
    if (s.trim().length < 2) return 'State must be at least 2 characters';
    return null;
  };

  // Handle gallery selection (simplified to match the first code: no explicit storage permission request)
  const handleGallery = () => {
    try {
      const options = {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
        quality: 1,
        includeBase64: true, // Added to match the first code's options
      };
      
      launchImageLibrary(options, (response) => { // Switched to callback style to exactly match the first code
        if (response.didCancel) {
          console.log('User cancelled gallery');
        } else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Failed to select image');
        } else if (response.assets && response.assets.length > 0) {
          const imageUri = response.assets[0].uri;
          setProfileImage({ uri: imageUri });
        }
      });
    } catch (err) {
      console.error('Gallery Error:', err);
      Alert.alert('Error', 'An error occurred while accessing the gallery');
    }
  };

  // Format date to DD/MM/YYYY
  const formatDate = (date) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {
      fullName: validateFullName(fullName),
      mobileNumber: validateMobileNumber(mobileNumber),
      email: validateEmail(email),
      gender: validateGender(gender),
      dateOfBirth: validateDateOfBirth(dateOfBirth),
      address: validateAddress(address),
      city: validateCity(city),
      pincode: validatePincode(pincode),
      state: validateState(state),
    };
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error !== null);
    if (hasErrors) {
      showErrorModal('Validation Error', 'Please correct the errors below to proceed');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted successfully');
      const formData = {
        fullName,
        mobileNumber,
        email,
        gender,
        dateOfBirth: formatDate(dateOfBirth),
        address,
        city,
        pincode,
        state,
      };
      console.log(formData);
      // Show success modal
      showSuccessModal('Registration Successful', 'Your account has been created successfully!');
    }
  };

  const handleModalConfirm = () => {
    setModalVisible(false);
    if (isSuccess) {
      navigation.navigate('MainApp');
    }
  };

  // Helper to handle onChange and clear error
  const handleChange = (setter, field, value) => {
    setter(value);
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  // Helper to handle onBlur and validate
  const handleBlur = (validator, field, value) => {
    const error = validator(value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          // Removed paddingBottom: insets.bottom to avoid overlap with bottom tab navigator
          // Bottom safe area is handled by the tab bar itself in React Navigation
        },
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          // Apply bottom padding to content container to ensure button doesn't go under tab bar
          // Use a fixed value or dynamic if tabBarHeight is available via navigation
          { paddingBottom: Math.max(insets.bottom, 10) }, // 100 approximates tab bar height + safe area; adjust as needed
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled" // Added to improve keyboard handling on scroll
      >
        {/* Logo */}
        <Image
          source={require('../assets/icon2.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Profile Picture */}
        <View style={styles.profileContainer}>
          <View style={styles.profileImageWrapper}>
            <TouchableOpacity 
            onPress={handleGallery} > <Image
              source={profileImage}
              style={styles.profileImage}
            /></TouchableOpacity>
           
            <TouchableOpacity 
              style={styles.cameraIcon}
              onPress={handleGallery} // Changed to directly open gallery
            >
              <Feather name="camera" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Title */}
        <Text style={styles.formTitle}>User Registration</Text>

        {/* Full Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={(text) => handleChange(setFullName, 'fullName', text)}
            onBlur={() => handleBlur(validateFullName, 'fullName', fullName)}
            placeholder="Harsha Kumar"
            placeholderTextColor="#999999"
          />
          {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
        </View>

        {/* Mobile Number */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            value={mobileNumber}
            onChangeText={(text) => handleChange(setMobileNumber, 'mobileNumber', text)}
            onBlur={() => handleBlur(validateMobileNumber, 'mobileNumber', mobileNumber)}
            placeholder="+91 98765 43210"
            placeholderTextColor="#999999"
            keyboardType="phone-pad"
          />
          {errors.mobileNumber && <Text style={styles.errorText}>{errors.mobileNumber}</Text>}
        </View>

        {/* Email Address */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => handleChange(setEmail, 'email', text)}
            onBlur={() => handleBlur(validateEmail, 'email', email)}
            placeholder="harsha.kumar@gmail.com"
            placeholderTextColor="#999999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        {/* Gender and Date of Birth Row */}
        <View style={styles.row}>
          {/* Gender */}
          <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Gender</Text>
            <TouchableOpacity
              style={styles.dropdownInput}
              onPress={() => setShowGenderDropdown(!showGenderDropdown)}
            >
              <Text
                style={[
                  styles.dropdownText,
                  !gender && { color: '#999999' },
                ]}
              >
                {gender || 'Male'}
              </Text>
              <Feather name="chevron-down" size={20} color="#666666" />
            </TouchableOpacity>
            {showGenderDropdown && (
              <View style={styles.dropdownMenu}>
                {['Male', 'Female', 'Other'].map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setGender(item);
                      setErrors((prev) => ({ ...prev, gender: null }));
                      setShowGenderDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
          </View>

          {/* Date of Birth */}
          <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity
              style={styles.dateInputContainer}
              onPress={() => setShowDatePicker(true)}
            >
              <Text
                style={[
                  styles.dateText,
                  !dateOfBirth && { color: '#999999' },
                ]}
              >
                {dateOfBirth ? formatDate(dateOfBirth) : '12/08/1998'}
              </Text>
              <Feather
                name="calendar"
                size={20}
                color="#666666"
                style={styles.calendarIcon}
              />
            </TouchableOpacity>
            {errors.dateOfBirth && <Text style={styles.errorText}>{errors.dateOfBirth}</Text>}
          </View>
        </View>

        {/* Address & Location Section */}
        <Text style={styles.sectionTitle}>Address & Location</Text>

        {/* Address / Street Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Address / Street Name</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={(text) => handleChange(setAddress, 'address', text)}
            onBlur={() => handleBlur(validateAddress, 'address', address)}
            placeholder="45-2-16, Near Pushkar Ghat Road"
            placeholderTextColor="#999999"
          />
          {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
        </View>

        {/* City */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={(text) => handleChange(setCity, 'city', text)}
            onBlur={() => handleBlur(validateCity, 'city', city)}
            placeholder="Rajahmundry"
            placeholderTextColor="#999999"
          />
          {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
        </View>

        {/* Pincode */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Pincode</Text>
          <TextInput
            style={styles.input}
            value={pincode}
            onChangeText={(text) => handleChange(setPincode, 'pincode', text)}
            onBlur={() => handleBlur(validatePincode, 'pincode', pincode)}
            placeholder="533101"
            placeholderTextColor="#999999"
            keyboardType="number-pad"
            maxLength={6}
          />
          {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}
        </View>

        {/* State */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>State</Text>
          <TextInput
            style={styles.input}
            value={state}
            onChangeText={(text) => handleChange(setState, 'state', text)}
            onBlur={() => handleBlur(validateState, 'state', state)}
            placeholder="Andhra Pradesh"
            placeholderTextColor="#999999"
          />
          {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Date Picker Modal */}
      <DatePicker
        modal
        open={showDatePicker}
        date={dateOfBirth || new Date()}
        mode="date"
        maximumDate={new Date()}
        onConfirm={(date) => {
          setShowDatePicker(false);
          setDateOfBirth(date);
          setErrors((prev) => ({ ...prev, dateOfBirth: null }));
        }}
        onCancel={() => {
          setShowDatePicker(false);
        }}
      />

      {/* Validation Error Modal */}
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modalTitle}
        content={modalContent}
        onConfirm={handleModalConfirm}
        confirmText="OK"
        showCancelButton={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  logo: {
    width: 160,
    height: 100,
    alignSelf: 'center',
    // marginTop: 10,
    // marginBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#E0E0E0',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4A90E2',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    color: '#333333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownInput: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    fontSize: 14,
    color: '#000000',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#000000',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  dateText: {
    fontSize: 14,
    color: '#000000',
  },
  calendarIcon: {
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginTop: 8,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: 'rgba(0, 33, 97, 1)',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20, // Added extra margin to push button up from bottom
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 4,
  },
});

export default RegisterManuallyScreen;