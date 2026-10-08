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
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-native-date-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from './theme';
import { createVendorCoupon, updateVendorCoupon, fetchBniCategories } from '../../redux/reducers/auth';

const getCategoryId = (cat) => cat?.id ?? cat?.categoryId ?? cat?._id;
const getCategoryName = (cat) => cat?.name ?? cat?.categoryName ?? cat?.title ?? '';
const COUPON_TYPES = [
  { key: 'upload', label: 'Upload Image' },
  { key: 'theme', label: 'Select Theme' },
];
const THEME_IMAGES = [
  { id: 1, source: require('../../assets/coupon_themes/theme1.jpeg') },
  { id: 2, source: require('../../assets/coupon_themes/theme2.jpeg') },
  { id: 3, source: require('../../assets/coupon_themes/theme3.jpeg') },
  { id: 4, source: require('../../assets/coupon_themes/theme4.jpeg') },
];
const DISCOUNT_TYPES = [
  { key: 'percentage', label: 'Percentage Off' },
  { key: 'flat', label: 'Flat Off' },
];

const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toISOString().split('T')[0];
};

const BniAddNewCouponScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { vendorId, vendorCouponActionLoading, bniCategories, bniCategoriesLoading } = useSelector(
    (state) => state.Auth
  );

  const isEdit = !!route?.params?.isEdit;
  const coupon = route?.params?.coupon || {};
  const couponId = coupon.id ?? coupon.couponId;

  const [category, setCategory] = useState(null); // selected category object

  useEffect(() => {
    if (!bniCategories || bniCategories.length === 0) {
      dispatch(fetchBniCategories());
    }
  }, [dispatch]);

  // Preselect the coupon's category (edit mode) once the list is loaded
  useEffect(() => {
    if (category || !bniCategories || bniCategories.length === 0) return;
    const matched = coupon.categoryId
      ? bniCategories.find((c) => String(getCategoryId(c)) === String(coupon.categoryId))
      : null;
    setCategory(matched || null);
  }, [bniCategories]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [couponName, setCouponName] = useState(coupon.couponName || '');
  const [title, setTitle] = useState(coupon.title || '');
  const [couponType, setCouponType] = useState(
    COUPON_TYPES.some((t) => t.key === coupon.imageType)
      ? coupon.imageType
      : coupon.imageUrl || coupon.image
        ? 'upload'
        : 'theme'
  );
  const [showCouponTypeDropdown, setShowCouponTypeDropdown] = useState(false);
  const [themeId, setThemeId] = useState(Number(coupon.theme ?? coupon.themeId) || null);
  const [imageName, setImageName] = useState('');
  const [imageUri, setImageUri] = useState(coupon.imageUrl || coupon.image || null);
  const [imageBase64, setImageBase64] = useState('');
  const [description, setDescription] = useState(coupon.description || '');
  const [discountType, setDiscountType] = useState(coupon.discountType || 'percentage');
  const [showDiscountTypeDropdown, setShowDiscountTypeDropdown] = useState(false);
  const [discountValue, setDiscountValue] = useState(coupon.discountValue || '');
  const [couponCode, setCouponCode] = useState(coupon.couponCode || '');
  const [startDate, setStartDate] = useState(coupon.validFrom ? new Date(coupon.validFrom) : null);
  const [expiryDate, setExpiryDate] = useState(coupon.validTo ? new Date(coupon.validTo) : null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showExpiryPicker, setShowExpiryPicker] = useState(false);
  const [terms, setTerms] = useState(coupon.terms || '');

  const handlePickImage = () => {
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
          setImageUri(asset.uri);
          setImageName(asset.fileName || 'coupon_image.jpg');
          setImageBase64(asset.base64 ? `data:${asset.type || 'image/jpeg'};base64,${asset.base64}` : '');
        }
      }
    );
  };

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 16; i++) code += chars[Math.floor(Math.random() * chars.length)];
    setCouponCode(code);
  };

  const validate = () => {
    if (!category) return 'Please select a category';
    if (!couponName.trim()) return 'Coupon Name is required';
    if (!title.trim()) return 'Coupon Title is required';
    if (!couponCode.trim()) return 'Coupon Code is required';
    // if (!discountValue.trim()) return 'Discount Value is required';
    if (!startDate) return 'Start Date is required';
    if (!expiryDate) return 'Expiry Date is required';
    if (couponType === 'theme' && !themeId) return 'Please select a theme image';
    return null;
  };

  const handleSubmit = () => {
    const error = validate();
    if (error) {
      Alert.alert('Validation Error', error);
      return;
    }

    const payload = {
      categoryId: getCategoryId(category),
      vendorId,
      couponName: couponName.trim(),
      title: title.trim(),
      couponCode: couponCode.trim(),
      discountType: '', // Offer Type / Discount Value are hidden for now
      discountValue: '',
      validFrom: formatDate(startDate),
      validTo: formatDate(expiryDate),
      description: description.trim(),
      terms: terms.trim(),
      imageType: couponType, // 'upload' | 'theme'
      couponType: '0',
      rewardPoints: 0,
      image: couponType === 'upload' ? imageBase64 : '',
      theme: couponType === 'theme' ? String(themeId) : '',
    };

    // Log what we send (image base64 truncated so the console stays readable)
    console.log(`${isEdit ? 'Update' : 'Add'} coupon payload →`, {
      couponId,
      ...payload,
      image: payload.image ? `${payload.image.slice(0, 40)}... (${payload.image.length} chars)` : undefined,
    });

    const action = isEdit
      ? updateVendorCoupon({ vendorId, couponId, couponData: payload })
      : createVendorCoupon({ vendorId, couponData: payload });

    dispatch(action)
      .unwrap()
      .then((res) => {
        Alert.alert('Success', res.message || (isEdit ? 'Coupon updated' : 'Coupon created'), [
          { text: 'OK', onPress: () => navigation.navigate('BniMainTabs', { screen: 'MyCoupons' }) },
        ]);
      })
      .catch((err) => {
        Alert.alert('Error', err || 'Something went wrong');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={22} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isEdit ? 'Edit Coupon' : 'Add New Coupon'}</Text>
        <View style={{ width: 22 }} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
      <ScrollView
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionTitle}>Coupon Details</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <TouchableOpacity
            style={styles.dropdownInput}
            onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
            disabled={bniCategoriesLoading}
          >
            <Text style={styles.dropdownText}>
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
                {(bniCategories || []).map((c) => (
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
          <Text style={styles.label}>Coupon Name</Text>
          <TextInput
            style={styles.input}
            value={couponName}
            onChangeText={setCouponName}
            placeholder="FIRST50"
            placeholderTextColor={COLORS.textLight}
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Coupon Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="50% OFF on First Purchase"
            placeholderTextColor={COLORS.textLight}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Coupon Image Type</Text>
          <TouchableOpacity
            style={styles.dropdownInput}
            onPress={() => setShowCouponTypeDropdown(!showCouponTypeDropdown)}
          >
            <Text style={styles.dropdownText}>
              {COUPON_TYPES.find((t) => t.key === couponType)?.label}
            </Text>
            <Feather name="chevron-down" size={18} color={COLORS.textGray} />
          </TouchableOpacity>
          {showCouponTypeDropdown && (
            <View style={styles.dropdownMenu}>
              {COUPON_TYPES.map((t) => (
                <TouchableOpacity
                  key={t.key}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setCouponType(t.key);
                    setShowCouponTypeDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{t.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {couponType === 'theme' && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Select Theme</Text>
            <View style={styles.themeGrid}>
              {THEME_IMAGES.map((t) => (
                <TouchableOpacity
                  key={t.id}
                  activeOpacity={0.8}
                  style={[styles.themeItem, themeId === t.id && styles.themeItemSelected]}
                  onPress={() => setThemeId(t.id)}
                >
                  <Image source={t.source} style={styles.themeImage} resizeMode="cover" />
                  {themeId === t.id && (
                    <View style={styles.themeCheck}>
                      <Feather name="check" size={14} color={COLORS.white} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {couponType === 'upload' && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Coupon Image</Text>
            <TouchableOpacity style={styles.fileInput} onPress={handlePickImage}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.filePreviewImage} />
              ) : (
                <Feather name="upload" size={18} color={COLORS.textGray} />
              )}
              <Text style={styles.fileText}>{imageName || 'Choose File'}</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Coupon Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Get 50% discount on your first purchase with us"
            placeholderTextColor={COLORS.textLight}
            multiline
          />
        </View>

        {/* Offer Type and Discount Value disabled for now
        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Offer Type</Text>
            <TouchableOpacity
              style={styles.dropdownInput}
              onPress={() => setShowDiscountTypeDropdown(!showDiscountTypeDropdown)}
            >
              <Text style={styles.dropdownText}>
                {DISCOUNT_TYPES.find((d) => d.key === discountType)?.label}
              </Text>
              <Feather name="chevron-down" size={18} color={COLORS.textGray} />
            </TouchableOpacity>
            {showDiscountTypeDropdown && (
              <View style={styles.dropdownMenu}>
                {DISCOUNT_TYPES.map((d) => (
                  <TouchableOpacity
                    key={d.key}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setDiscountType(d.key);
                      setShowDiscountTypeDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{d.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Discount Value</Text>
            <TextInput
              style={styles.input}
              value={discountValue}
              onChangeText={setDiscountValue}
              keyboardType="number-pad"
              placeholder={discountType === 'percentage' ? '50%' : '₹100'}
              placeholderTextColor={COLORS.textLight}
            />
          </View>
        </View>
        */}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Coupon Code</Text>
          <View style={styles.codeRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={couponCode}
              onChangeText={setCouponCode}
              placeholder="YUSREHNDHJSYUJAH"
              placeholderTextColor={COLORS.textLight}
              autoCapitalize="characters"
            />
            <TouchableOpacity style={styles.generateButton} onPress={generateCode}>
              <Text style={styles.generateText}>Generate</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Validity</Text>
        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Start Date</Text>
            <TouchableOpacity style={styles.dateInput} onPress={() => setShowStartPicker(true)}>
              <Text style={[styles.dropdownText, !startDate && styles.placeholder]}>
                {startDate ? formatDate(startDate) : 'Start Date'}
              </Text>
              <Feather name="calendar" size={16} color={COLORS.textGray} />
            </TouchableOpacity>
          </View>
          <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Expiry Date</Text>
            <TouchableOpacity style={styles.dateInput} onPress={() => setShowExpiryPicker(true)}>
              <Text style={[styles.dropdownText, !expiryDate && styles.placeholder]}>
                {expiryDate ? formatDate(expiryDate) : 'Expiry Date'}
              </Text>
              <Feather name="calendar" size={16} color={COLORS.textGray} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Terms & Conditions</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={terms}
            onChangeText={setTerms}
            placeholder="Valid only for first purchase."
            placeholderTextColor={COLORS.textLight}
            multiline
          />
        </View>

        <TouchableOpacity
          style={[styles.submitButton, vendorCouponActionLoading && { opacity: 0.7 }]}
          onPress={handleSubmit}
          disabled={vendorCouponActionLoading}
        >
          {vendorCouponActionLoading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.submitText}>{isEdit ? 'Save Changes' : 'Add Coupon'}</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
      </KeyboardAvoidingView>

      <DatePicker
        modal
        open={showStartPicker}
        date={startDate || new Date()}
        mode="date"
        onConfirm={(date) => {
          setShowStartPicker(false);
          setStartDate(date);
        }}
        onCancel={() => setShowStartPicker(false)}
      />

      <DatePicker
        modal
        open={showExpiryPicker}
        date={expiryDate || new Date()}
        mode="date"
        minimumDate={startDate || undefined}
        onConfirm={(date) => {
          setShowExpiryPicker(false);
          setExpiryDate(date);
        }}
        onCancel={() => setShowExpiryPicker(false)}
      />
    </SafeAreaView>
  );
};

export default BniAddNewCouponScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: { fontFamily: FONTS.bold, fontSize: 16, color: COLORS.textDark },
  formContent: { padding: 20, paddingBottom: 60 },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.textDark,
    marginBottom: 14,
    marginTop: 6,
  },
  row: { flexDirection: 'row' },
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
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.textDark,
    backgroundColor: COLORS.inputBg,
  },
  textArea: { height: 80, textAlignVertical: 'top' },
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
  dateInput: {
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
  dropdownText: { fontFamily: FONTS.medium, fontSize: 13, color: COLORS.textDark },
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
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.inputBg,
  },
  fileText: { fontFamily: FONTS.medium, fontSize: 13, color: COLORS.textGray, marginTop: 6 },
  filePreviewImage: { width: 60, height: 60, borderRadius: 8 },
  themeGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  themeItem: {
    width: '48%',
    aspectRatio: 1.84,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    overflow: 'hidden',
    marginBottom: 12,
  },
  themeItemSelected: { borderColor: COLORS.primary },
  themeImage: { width: '100%', height: '100%' },
  themeCheck: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 4,
  },
  codeRow: { flexDirection: 'row', alignItems: 'center' },
  generateButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginLeft: 8,
  },
  generateText: { fontFamily: FONTS.semibold, fontSize: 12, color: COLORS.white },
  submitButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  submitText: { color: COLORS.white, fontFamily: FONTS.bold, fontSize: 15 },
});
