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
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import BniBottomTabs from './components/BniBottomTabs';
import { COLORS, FONTS } from './theme';
import {
  fetchBniCategories,
  fetchBniIndustries,
  addBniIndustry,
  fetchBniCities,
  addBniCity,
} from '../../redux/reducers/auth';

const getId = (item) => item?.id ?? item?._id ?? item?.categoryId ?? item?.cityId ?? item?.industryId;
const getName = (item) => item?.name ?? item?.categoryName ?? item?.cityName ?? item?.industryName ?? item?.title ?? '';

const BniAddBusinessScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    bniCategories, bniCategoriesLoading,
    bniIndustries, bniIndustriesLoading, bniIndustryAdding,
    bniCities, bniCitiesLoading, bniCityAdding,
  } = useSelector((state) => state.Auth);

  const [subTab, setSubTab] = useState('Given');
  const [fullName, setFullName] = useState('Harsha Kumar');
  const [designation, setDesignation] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');

  const [category, setCategory] = useState(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const [industry, setIndustry] = useState(null);
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [isOtherIndustry, setIsOtherIndustry] = useState(false);
  const [customIndustryName, setCustomIndustryName] = useState('');

  const [city, setCity] = useState(null);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [isOtherCity, setIsOtherCity] = useState(false);
  const [customCityName, setCustomCityName] = useState('');

  useEffect(() => {
    dispatch(fetchBniCategories());
    dispatch(fetchBniIndustries());
    dispatch(fetchBniCities());
  }, [dispatch]);

  const handleTabPress = (key) => {
    navigation.navigate('BniMainTabs', { screen: key });
  };

  const handleAddIndustry = () => {
    if (!customIndustryName.trim()) return;
    dispatch(addBniIndustry(customIndustryName.trim()))
      .unwrap()
      .then((res) => {
        setIndustry(res?.data || { name: customIndustryName.trim() });
        setIsOtherIndustry(false);
        setCustomIndustryName('');
      })
      .catch((err) => Alert.alert('Error', err || 'Failed to add industry'));
  };

  const handleAddCity = () => {
    if (!customCityName.trim()) return;
    dispatch(addBniCity(customCityName.trim()))
      .unwrap()
      .then((res) => {
        setCity(res?.data || { name: customCityName.trim() });
        setIsOtherCity(false);
        setCustomCityName('');
      })
      .catch((err) => Alert.alert('Error', err || 'Failed to add city'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={22} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Business</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.subTabRow}>
        <TouchableOpacity
          style={[styles.subTabButton, subTab === 'Ask' && styles.subTabButtonActive]}
          onPress={() => setSubTab('Ask')}
        >
          <Text style={[styles.subTabText, subTab === 'Ask' && styles.subTabTextActive]}>Ask</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.subTabButton, subTab === 'Given' && styles.subTabButtonActive]}
          onPress={() => setSubTab('Given')}
        >
          <Text style={[styles.subTabText, subTab === 'Given' && styles.subTabTextActive]}>Given</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter Full Name"
            placeholderTextColor={COLORS.textLight}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Designation</Text>
          <TextInput
            style={styles.input}
            value={designation}
            onChangeText={setDesignation}
            placeholder="Enter Designation"
            placeholderTextColor={COLORS.textLight}
          />
        </View>

        {/* Category */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <TouchableOpacity
            style={styles.dropdownInput}
            onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
            disabled={bniCategoriesLoading}
          >
            <Text style={[styles.dropdownText, !category && styles.placeholder]}>
              {bniCategoriesLoading ? 'Loading...' : getName(category) || 'Select Category'}
            </Text>
            {bniCategoriesLoading ? (
              <ActivityIndicator size="small" color={COLORS.textGray} />
            ) : (
              <Feather name="chevron-down" size={18} color={COLORS.textGray} />
            )}
          </TouchableOpacity>
          {showCategoryDropdown && (
            <View style={styles.dropdownMenu}>
              {bniCategories.map((c) => (
                <TouchableOpacity
                  key={getId(c)}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setCategory(c);
                    setShowCategoryDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{getName(c)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Industry */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Industry</Text>
          {isOtherIndustry ? (
            <View style={styles.codeRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={customIndustryName}
                onChangeText={setCustomIndustryName}
                placeholder="Enter Industry Name"
                placeholderTextColor={COLORS.textLight}
                autoFocus
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddIndustry}
                disabled={bniIndustryAdding}
              >
                {bniIndustryAdding ? (
                  <ActivityIndicator size="small" color={COLORS.white} />
                ) : (
                  <Text style={styles.addButtonText}>Add</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelIconButton}
                onPress={() => {
                  setIsOtherIndustry(false);
                  setCustomIndustryName('');
                }}
              >
                <Feather name="x" size={18} color={COLORS.textGray} />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <TouchableOpacity
                style={styles.dropdownInput}
                onPress={() => setShowIndustryDropdown(!showIndustryDropdown)}
                disabled={bniIndustriesLoading}
              >
                <Text style={[styles.dropdownText, !industry && styles.placeholder]}>
                  {bniIndustriesLoading ? 'Loading...' : getName(industry) || 'Select Industry'}
                </Text>
                {bniIndustriesLoading ? (
                  <ActivityIndicator size="small" color={COLORS.textGray} />
                ) : (
                  <Feather name="chevron-down" size={18} color={COLORS.textGray} />
                )}
              </TouchableOpacity>
              {showIndustryDropdown && (
                <View style={styles.dropdownMenu}>
                  {bniIndustries.map((i) => (
                    <TouchableOpacity
                      key={getId(i)}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setIndustry(i);
                        setShowIndustryDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{getName(i)}</Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    style={[styles.dropdownItem, { borderBottomWidth: 0 }]}
                    onPress={() => {
                      setShowIndustryDropdown(false);
                      setIsOtherIndustry(true);
                    }}
                  >
                    <Text style={[styles.dropdownItemText, { color: COLORS.primary }]}>
                      Others (Add New)
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Company Address</Text>
          <TextInput
            style={styles.input}
            value={companyAddress}
            onChangeText={setCompanyAddress}
            placeholder="Enter Company Address"
            placeholderTextColor={COLORS.textLight}
          />
        </View>

        {/* City */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>City</Text>
          {isOtherCity ? (
            <View style={styles.codeRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={customCityName}
                onChangeText={setCustomCityName}
                placeholder="Enter City Name"
                placeholderTextColor={COLORS.textLight}
                autoFocus
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddCity}
                disabled={bniCityAdding}
              >
                {bniCityAdding ? (
                  <ActivityIndicator size="small" color={COLORS.white} />
                ) : (
                  <Text style={styles.addButtonText}>Add</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelIconButton}
                onPress={() => {
                  setIsOtherCity(false);
                  setCustomCityName('');
                }}
              >
                <Feather name="x" size={18} color={COLORS.textGray} />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <TouchableOpacity
                style={styles.dropdownInput}
                onPress={() => setShowCityDropdown(!showCityDropdown)}
                disabled={bniCitiesLoading}
              >
                <Text style={[styles.dropdownText, !city && styles.placeholder]}>
                  {bniCitiesLoading ? 'Loading...' : getName(city) || 'Select City'}
                </Text>
                {bniCitiesLoading ? (
                  <ActivityIndicator size="small" color={COLORS.textGray} />
                ) : (
                  <Feather name="chevron-down" size={18} color={COLORS.textGray} />
                )}
              </TouchableOpacity>
              {showCityDropdown && (
                <View style={styles.dropdownMenu}>
                  {bniCities.map((c) => (
                    <TouchableOpacity
                      key={getId(c)}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setCity(c);
                        setShowCityDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{getName(c)}</Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    style={[styles.dropdownItem, { borderBottomWidth: 0 }]}
                    onPress={() => {
                      setShowCityDropdown(false);
                      setIsOtherCity(true);
                    }}
                  >
                    <Text style={[styles.dropdownItemText, { color: COLORS.primary }]}>
                      Others (Add New)
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => navigation.navigate('BniMainTabs', { screen: 'BniConnections' })}
        >
          <Text style={styles.submitText}>Add Business</Text>
        </TouchableOpacity>
      </ScrollView>

      <BniBottomTabs active="BniConnections" onPress={handleTabPress} />
    </SafeAreaView>
  );
};

export default BniAddBusinessScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: { fontFamily: FONTS.bold, fontSize: 17, color: COLORS.textDark },
  subTabRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: COLORS.inputBg,
    borderRadius: 10,
    padding: 4,
    marginTop: 16,
    marginBottom: 10,
  },
  subTabButton: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  subTabButtonActive: { backgroundColor: COLORS.primary },
  subTabText: { fontFamily: FONTS.semibold, fontSize: 13, color: COLORS.textGray },
  subTabTextActive: { color: COLORS.white },
  formContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 40 },
  inputGroup: { marginBottom: 16 },
  label: { fontFamily: FONTS.semibold, fontSize: 13, color: COLORS.textDark, marginBottom: 8 },
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
  dropdownText: { fontFamily: FONTS.medium, fontSize: 14, color: COLORS.textDark },
  placeholder: { color: COLORS.textLight },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    marginTop: 4,
    maxHeight: 220,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dropdownItemText: { fontFamily: FONTS.medium, fontSize: 14, color: COLORS.textDark },
  codeRow: { flexDirection: 'row', alignItems: 'center' },
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginLeft: 8,
  },
  addButtonText: { fontFamily: FONTS.semibold, fontSize: 12, color: COLORS.white },
  cancelIconButton: {
    marginLeft: 8,
    padding: 6,
  },
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
