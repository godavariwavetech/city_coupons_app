import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import BniLogo from './components/BniLogo';
import { COLORS, FONTS } from './theme';
import CustomModal from '../../components/CustomModal';
import VendorTermsModal from './components/VendorTermsModal';
import {
  registerUser,
  registerVendor,
  fetchBniCategories,
  fetchBniCities,
} from '../../redux/reducers/auth';
import LocationSelect from './components/LocationSelect';

const BniVendorRegistrationScreen = ({ navigation, route }) => {
  const [category, setCategory] = useState(null); // selected category object
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [shopName, setShopName] = useState('');
  const [mobile, setMobile] = useState(route?.params?.mobile || '');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [shopImageName, setShopImageName] = useState('');
  const [shopImageUri, setShopImageUri] = useState(null);
  const [shopImageBase64, setShopImageBase64] = useState('');
  const [logoName, setLogoName] = useState('');
  const [logoUri, setLogoUri] = useState(null);
  const [logoBase64, setLogoBase64] = useState('');
  const [vendorProfileUri, setVendorProfileUri] = useState(null);
  const [vendorProfileBase64, setVendorProfileBase64] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // iOS app is for users only, so always register as a user there
  const [role, setRole] = useState(
    Platform.OS === 'ios' ? 'user' : route?.params?.role || 'user'
  );

  const dispatch = useDispatch();
  const {
    loading,
    message,
    bniCategories,
    bniCategoriesLoading,
    bniCities,
    bniCitiesLoading,
  } = useSelector((state) => state.Auth);

  useEffect(() => {
    dispatch(fetchBniCategories());
    dispatch(fetchBniCities());
  }, [dispatch]);

  const [selectedCity, setSelectedCity] = useState(null);

  const getCategoryId = (cat) => cat?.id ?? cat?.categoryId ?? cat?._id;
  const getCategoryName = (cat) => cat?.name ?? cat?.categoryName ?? cat?.title ?? '';

  // ── Customer/User registration form state ──
  const [fullName, setFullName] = useState('');
  const [customerMobile, setCustomerMobile] = useState(route?.params?.mobile || '');
  const [customerEmail, setCustomerEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [customerAddress, setCustomerAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [profileImageUri, setProfileImageUri] = useState(null);
  const [bniMember, setBniMember] = useState(0);
  const [referredBy, setReferredBy] = useState('');

  const [errors, setErrors] = useState({});
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxWidth: 800,
        maxHeight: 800,
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Failed to pick image');
          return;
        }
        if (response.assets && response.assets[0]) {
          const asset = response.assets[0];
          setProfileImageUri({ uri: asset.uri });
          setImageBase64(asset.base64 ? `data:${asset.type};base64,${asset.base64}` : '');
        }
      }
    );
  };

  const pickImageForField = (onPicked) => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxWidth: 800,
        maxHeight: 800,
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Failed to pick image');
          return;
        }
        if (response.assets && response.assets[0]) {
          const asset = response.assets[0];
          onPicked(asset);
        }
      }
    );
  };

  const handlePickShopImage = () => {
    pickImageForField((asset) => {
      setShopImageUri(asset.uri);
      setShopImageName(asset.fileName || 'shop_image.jpg');
      setShopImageBase64(asset.base64 ? `data:${asset.type || 'image/jpeg'};base64,${asset.base64}` : '');
    });
  };

  const handlePickVendorProfile = () => {
    pickImageForField((asset) => {
      setVendorProfileUri(asset.uri);
      setVendorProfileBase64(
        asset.base64 ? `data:${asset.type || 'image/jpeg'};base64,${asset.base64}` : ''
      );
    });
  };

  const handlePickLogo = () => {
    pickImageForField((asset) => {
      setLogoUri(asset.uri);
      setLogoName(asset.fileName || 'logo.png');
      setLogoBase64(asset.base64 ? `data:${asset.type || 'image/jpeg'};base64,${asset.base64}` : '');
    });
  };

  const formatDOB = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  const validateForm = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!customerMobile.match(/^\d{10}$/)) newErrors.customerMobile = 'Enter valid 10-digit mobile';
    if (!customerEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.customerEmail = 'Enter valid email';
    if (!gender) newErrors.gender = 'Select gender';
    if (!dateOfBirth) newErrors.dateOfBirth = 'Select date of birth';
    if (!customerAddress.trim()) newErrors.customerAddress = 'Address is required';
    if (!selectedCity) newErrors.city = 'City is required';
    if (!pincode.match(/^\d{6}$/)) newErrors.pincode = 'Enter valid 6-digit pincode';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      setModalTitle('Validation Error');
      setModalContent('Please fill all fields correctly');
      setIsSuccess(false);
      setModalVisible(true);
      return;
    }

    const payload = {
      name: fullName.trim(),
      mobile: customerMobile,
      email: customerEmail.trim().toLowerCase(),
      gender,
      dob: formatDOB(dateOfBirth),
      address: customerAddress.trim(),
      city: selectedCity?.name ?? selectedCity?.cityName ?? '',
      cityId: selectedCity?.id ?? selectedCity?.cityId ?? selectedCity?._id ?? '',
      district: '',
      districtId: '',
      pincode,
      state: 'Andhra Pradesh',
      stateId: 0,
      image: imageBase64 || '',
      referredBy: referredBy.trim(),
      BNIMember: bniMember,
    };

    dispatch(registerUser(payload)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setModalTitle('Success');
        setModalContent('User Registered Successfully!');
        setIsSuccess(true);
        setModalVisible(true);
      } else {
        setModalTitle('Registration Failed');
        setModalContent(res.payload || message || 'Registration Failed');
        setIsSuccess(false);
        setModalVisible(true);
      }
    });
  };

  const handleModalConfirm = () => {
    setModalVisible(false);
    if (isSuccess) {
      navigation.replace(role === 'vendor' ? 'BniRegistrationUnderReviewScreen' : 'BniLoginScreen');
    }
  };

  const validateVendorForm = () => {
    if (!category) return 'Please select a category';
    if (!shopName.trim()) return 'Shop Name is required';
    if (!mobile.match(/^\d{10}$/)) return 'Enter a valid 10-digit mobile number';
    if (!password.trim()) return 'Password is required';
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return 'Enter a valid email';
    if (!address.trim()) return 'Address is required';
    // Vendor location (state/district/city) disabled for now
    // if (!selectedState) return 'Please select a state';
    // if (!selectedDistrict) return 'Please select a district';
    // if (!selectedCity) return 'Please select a city';
    if (!agreedToTerms) return 'Please agree to the Terms and Conditions';
    return null;
  };

  const handleVendorSubmit = () => {
    const error = validateVendorForm();
    if (error) {
      setModalTitle('Validation Error');
      setModalContent(error);
      setIsSuccess(false);
      setModalVisible(true);
      return;
    }

    const payload = {
      name: shopName.trim(),
      contact: mobile,
      email: email.trim().toLowerCase(),
      address: address.trim(),
      categoryId: getCategoryId(category),
      // stateId: selectedState?.id,
      // districtId: selectedDistrict?.id,
      // cityId: selectedCity?.id,
      password,
      logo: logoBase64 || '',
      shopImage: shopImageBase64 || '',
      profile: vendorProfileBase64 || '',
    };

    dispatch(registerVendor(payload)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setModalTitle('Success');
        setModalContent(res.payload?.message || 'Registration submitted for admin approval');
        setIsSuccess(true);
        setModalVisible(true);
      } else {
        setModalTitle('Registration Failed');
        setModalContent(res.payload || message || 'Registration Failed');
        setIsSuccess(false);
        setModalVisible(true);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.header}>
        <BniLogo size="small" />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.formContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.roleRow}>
            <TouchableOpacity
              style={[styles.roleCard, role === 'user' && styles.roleCardActive]}
              onPress={() => setRole('user')}
            >
              <View style={[styles.roleIconBox, role === 'user' && styles.roleIconBoxActive]}>
                <Feather
                  name="user"
                  size={16}
                  color={role === 'user' ? COLORS.white : COLORS.textGray}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.roleTitle, role === 'user' && styles.roleTitleActive]}>
                  User/ Customer
                </Text>
                <Text style={styles.roleSubtitle}>Find & redeem offers</Text>
              </View>
            </TouchableOpacity>

            {/* iOS app is for users only - Vendor option hidden on iOS */}
            {Platform.OS !== 'ios' && (
              <TouchableOpacity
                style={[styles.roleCard, role === 'vendor' && styles.roleCardActive]}
                onPress={() => setRole('vendor')}
              >
                <View style={[styles.roleIconBox, role === 'vendor' && styles.roleIconBoxActive]}>
                  <Feather
                    name="grid"
                    size={16}
                    color={role === 'vendor' ? COLORS.white : COLORS.textGray}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.roleTitle, role === 'vendor' && styles.roleTitleActive]}>
                    Business/ Vendor
                  </Text>
                  <Text style={styles.roleSubtitle}>Manage coupons & offers</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {role === 'user' ? (
            <>
              <Text style={styles.title}>User Registration</Text>

              <View style={styles.profileContainer}>
                <TouchableOpacity onPress={handleGallery}>
                  <Image
                    source={profileImageUri || require('../../assets/profile1.png')}
                    style={styles.profileImage}
                  />
                  <View style={styles.cameraIcon}>
                    <Feather name="camera" size={18} color={COLORS.white} />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Enter Full Name"
                  placeholderTextColor={COLORS.textLight}
                />
                {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Mobile Number</Text>
                <TextInput
                  style={styles.input}
                  value={customerMobile}
                  onChangeText={setCustomerMobile}
                  keyboardType="number-pad"
                  maxLength={10}
                  placeholder="Enter Mobile Number"
                  placeholderTextColor={COLORS.textLight}
                  autoComplete="off"
                  importantForAutofill="no"
                  textContentType="none"
                />
                {errors.customerMobile && <Text style={styles.errorText}>{errors.customerMobile}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  value={customerEmail}
                  onChangeText={setCustomerEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="Enter Email"
                  placeholderTextColor={COLORS.textLight}
                  autoComplete="off"
                  importantForAutofill="no"
                  textContentType="none"
                />
                {errors.customerEmail && <Text style={styles.errorText}>{errors.customerEmail}</Text>}
              </View>

              <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={styles.label}>Gender</Text>
                  <TouchableOpacity
                    style={styles.dropdownInput}
                    onPress={() => setShowGenderDropdown(!showGenderDropdown)}
                  >
                    <Text style={[styles.dropdownText, !gender && styles.placeholder]}>
                      {gender || 'Select'}
                    </Text>
                    <Feather name="chevron-down" size={18} color={COLORS.textGray} />
                  </TouchableOpacity>
                  {showGenderDropdown && (
                    <View style={styles.dropdownMenu}>
                      {['Male', 'Female', 'Other'].map((g) => (
                        <TouchableOpacity
                          key={g}
                          style={styles.dropdownItem}
                          onPress={() => {
                            setGender(g);
                            setShowGenderDropdown(false);
                            setErrors({ ...errors, gender: null });
                          }}
                        >
                          <Text style={styles.dropdownItemText}>{g}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                  {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
                </View>

                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={styles.label}>Date of Birth</Text>
                  <TouchableOpacity
                    style={styles.dropdownInput}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text style={[styles.dropdownText, !dateOfBirth && styles.placeholder]}>
                      {dateOfBirth ? formatDOB(dateOfBirth) : 'YYYY-MM-DD'}
                    </Text>
                    <Feather name="calendar" size={18} color={COLORS.textGray} />
                  </TouchableOpacity>
                  {errors.dateOfBirth && <Text style={styles.errorText}>{errors.dateOfBirth}</Text>}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Referred By (Optional)</Text>
                <TextInput
                  style={styles.input}
                  value={referredBy}
                  onChangeText={setReferredBy}
                  placeholder="Enter referrer name"
                  placeholderTextColor={COLORS.textLight}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>BNI Member</Text>
                <View style={styles.optionRow}>
                  <TouchableOpacity
                    style={[styles.optionButton, bniMember === 1 && styles.optionButtonSelected]}
                    onPress={() => setBniMember(1)}
                  >
                    <Text style={bniMember === 1 ? styles.optionTextSelected : styles.optionText}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.optionButton, bniMember === 0 && styles.optionButtonSelected, { marginRight: 0 }]}
                    onPress={() => setBniMember(0)}
                  >
                    <Text style={bniMember === 0 ? styles.optionTextSelected : styles.optionText}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Address / Street Name</Text>
                <TextInput
                  style={styles.input}
                  value={customerAddress}
                  onChangeText={setCustomerAddress}
                  placeholder="Enter Address"
                  placeholderTextColor={COLORS.textLight}
                />
                {errors.customerAddress && <Text style={styles.errorText}>{errors.customerAddress}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>State</Text>
                <TextInput style={styles.input} value="Andhra Pradesh" editable={false} />
              </View>

              <LocationSelect
                label="City"
                placeholder="Select City"
                items={bniCities.map((city) => ({
                  ...city,
                  id: city?.id ?? city?.cityId ?? city?._id,
                  name: city?.name ?? city?.cityName ?? city?.title ?? '',
                }))}
                value={selectedCity}
                loading={bniCitiesLoading}
                onSelect={(it) => {
                  setSelectedCity(it);
                  setErrors({ ...errors, city: null });
                }}
                error={errors.city}
              />

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Pincode</Text>
                <TextInput
                  style={styles.input}
                  value={pincode}
                  onChangeText={setPincode}
                  keyboardType="number-pad"
                  maxLength={6}
                  placeholder="Pincode"
                  placeholderTextColor={COLORS.textLight}
                />
                {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}
              </View>

              <TouchableOpacity
                style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={COLORS.white} size="small" />
                ) : (
                  <Text style={styles.submitText}>SUBMIT</Text>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.title}>Vendor Registration</Text>

              <View style={styles.profileContainer}>
                <TouchableOpacity onPress={handlePickVendorProfile}>
                  <Image
                    source={
                      vendorProfileUri ? { uri: vendorProfileUri } : require('../../assets/profile1.png')
                    }
                    style={styles.profileImage}
                  />
                  <View style={styles.cameraIcon}>
                    <Feather name="camera" size={18} color={COLORS.white} />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Category</Text>
                <TouchableOpacity
                  style={styles.dropdownInput}
                  onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  disabled={bniCategoriesLoading}
                >
                  <Text style={[styles.dropdownText, !category && styles.placeholder]}>
                    {bniCategoriesLoading
                      ? 'Loading categories...'
                      : getCategoryName(category) || 'Select Category'}
                  </Text>
                  {bniCategoriesLoading ? (
                    <ActivityIndicator size="small" color={COLORS.textGray} />
                  ) : (
                    <Feather name="chevron-down" size={18} color={COLORS.textGray} />
                  )}
                </TouchableOpacity>
                {showCategoryDropdown && (
                  <View style={[styles.dropdownMenu, { maxHeight: 138 }]}>
                    <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="handled">
                      {bniCategories.map((c) => (
                        <TouchableOpacity
                          key={getCategoryId(c)}
                          style={styles.dropdownItem}
                          onPress={() => {
                            setCategory(c);
                            setShowCategoryDropdown(false);
                          }}
                        >
                          <Text style={styles.dropdownItemText}>{getCategoryName(c)}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Shop Name</Text>
                <TextInput
                  style={styles.input}
                  value={shopName}
                  onChangeText={setShopName}
                  placeholder="Enter Shop Name"
                  placeholderTextColor={COLORS.textLight}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Mobile Number</Text>
                <TextInput
                  style={styles.input}
                  value={mobile}
                  onChangeText={setMobile}
                  keyboardType="number-pad"
                  maxLength={10}
                  placeholder="Enter Contact Number"
                  placeholderTextColor={COLORS.textLight}
                  autoComplete="off"
                  importantForAutofill="no"
                  textContentType="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordRow}>
                  <TextInput
                    style={[styles.input, styles.passwordInput]}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    placeholder="Enter Password"
                    placeholderTextColor={COLORS.textLight}
                  />
                  <TouchableOpacity
                    style={styles.eyeIconButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Feather
                      name={showPassword ? 'eye-off' : 'eye'}
                      size={18}
                      color={COLORS.textGray}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="Enter Email"
                  placeholderTextColor={COLORS.textLight}
                  autoComplete="off"
                  importantForAutofill="no"
                  textContentType="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                  style={styles.input}
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Enter Address"
                  placeholderTextColor={COLORS.textLight}
                />
              </View>

              {/* Vendor location (state/district/city) disabled for now
              <LocationSelect
                label="State"
                placeholder="Select State"
                items={bniStates}
                value={selectedState}
                loading={bniStatesLoading}
                onSelect={setSelectedState}
              />

              <LocationSelect
                label="District"
                placeholder={selectedState ? 'Select District' : 'Select state first'}
                items={bniDistricts}
                value={selectedDistrict}
                loading={bniDistrictsLoading}
                disabled={!selectedState}
                onSelect={setSelectedDistrict}
              />

              <LocationSelect
                label="City"
                placeholder="Select City"
                items={bniCities}
                value={selectedCity}
                loading={bniCitiesLoading}
                onSelect={setSelectedCity}
              />
              */}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Shop Image</Text>
                <TouchableOpacity style={styles.fileInput} onPress={handlePickShopImage}>
                  {shopImageUri ? (
                    <Image source={{ uri: shopImageUri }} style={styles.filePreviewImage} />
                  ) : (
                    <Feather name="upload" size={18} color={COLORS.textGray} />
                  )}
                  <Text style={styles.fileText}>{shopImageName || 'Choose File'}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Logo</Text>
                <TouchableOpacity style={styles.fileInput} onPress={handlePickLogo}>
                  {logoUri ? (
                    <Image source={{ uri: logoUri }} style={styles.filePreviewImage} />
                  ) : (
                    <Feather name="upload" size={18} color={COLORS.textGray} />
                  )}
                  <Text style={styles.fileText}>{logoName || 'Choose File'}</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => setAgreedToTerms(!agreedToTerms)}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
                  {agreedToTerms && <Feather name="check" size={14} color={COLORS.white} />}
                </View>
                <Text style={styles.checkboxLabel}>
                  Are you agreeing to the{' '}
                  <Text style={styles.termsLink} onPress={() => setShowTermsModal(true)}>
                    Terms and Conditions
                  </Text>
                  ?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  (loading || !agreedToTerms) && styles.submitButtonDisabled,
                ]}
                onPress={handleVendorSubmit}
                disabled={loading || !agreedToTerms}
              >
                {loading ? (
                  <ActivityIndicator color={COLORS.white} size="small" />
                ) : (
                  <Text style={styles.submitText}>SUBMIT</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <DatePicker
        modal
        open={showDatePicker}
        date={dateOfBirth || new Date()}
        mode="date"
        maximumDate={new Date()}
        onConfirm={(date) => {
          setShowDatePicker(false);
          setDateOfBirth(date);
          setErrors({ ...errors, dateOfBirth: null });
        }}
        onCancel={() => setShowDatePicker(false)}
      />

      <CustomModal
        visible={modalVisible}
        title={modalTitle}
        content={modalContent}
        onConfirm={handleModalConfirm}
        confirmText="OK"
        showCancelButton={false}
      />

      <VendorTermsModal visible={showTermsModal} onClose={() => setShowTermsModal(false)} />
    </SafeAreaView>
  );
};

export default BniVendorRegistrationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  flex: { flex: 1 },
  header: { alignItems: 'center', paddingTop: 16, paddingBottom: 8 },
  formContent: { paddingHorizontal: 20, paddingBottom: 40 },
  roleRow: { flexDirection: 'row', marginBottom: 20 },
  roleCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 10,
    marginRight: 8,
  },
  roleCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.warningBg,
  },
  roleIconBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  roleIconBoxActive: { backgroundColor: COLORS.primary },
  roleTitle: {
    fontFamily: FONTS.semibold,
    fontSize: 11,
    color: COLORS.textDark,
  },
  roleTitleActive: { color: COLORS.primary },
  roleSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 9,
    color: COLORS.textGray,
    marginTop: 2,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: 16,
  },
  profileContainer: { alignItems: 'center', marginBottom: 16 },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: COLORS.border,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    padding: 7,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  inputGroup: { marginBottom: 16 },
  label: {
    fontFamily: FONTS.semibold,
    fontSize: 13,
    color: COLORS.textDark,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: FONTS.medium,
    color: COLORS.textDark,
    backgroundColor: COLORS.inputBg,
  },
  row: { flexDirection: 'row', marginBottom: 0 },
  dropdownInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
  },
  dropdownText: { fontFamily: FONTS.medium, fontSize: 15, color: COLORS.textDark },
  placeholder: { color: COLORS.textLight },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    marginTop: 4,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dropdownItemText: { fontFamily: FONTS.medium, fontSize: 14, color: COLORS.textDark },
  fileInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    borderStyle: 'dashed',
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.inputBg,
  },
  fileText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.textGray,
    marginTop: 6,
  },
  filePreviewImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  eyeIconButton: {
    position: 'absolute',
    right: 14,
    padding: 4,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 4,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkboxLabel: {
    flex: 1,
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.textDark,
  },
  termsLink: {
    color: COLORS.primary,
    fontFamily: FONTS.semibold,
    textDecorationLine: 'underline',
  },
  errorText: {
    fontFamily: FONTS.regular,
    color: '#D32F2F',
    fontSize: 12,
    marginTop: 4,
  },
  optionRow: { flexDirection: 'row', justifyContent: 'space-between' },
  optionButton: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: COLORS.inputBg,
  },
  optionButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionText: { color: COLORS.textDark, fontFamily: FONTS.medium, fontSize: 15 },
  optionTextSelected: { color: COLORS.white, fontFamily: FONTS.bold, fontSize: 15 },
  submitButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  submitButtonDisabled: { opacity: 0.7 },
  submitText: { color: COLORS.white, fontFamily: FONTS.bold, fontSize: 15, letterSpacing: 1 },
});
