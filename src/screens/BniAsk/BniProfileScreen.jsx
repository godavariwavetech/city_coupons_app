// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   SafeAreaView,
//   ScrollView,
//   TextInput,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useFocusEffect } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Feather from 'react-native-vector-icons/Feather';
// import { COLORS, FONTS } from './theme';
// import { fetchVendorProfile, updateVendorProfile, logout, fetchBniCategories } from '../../redux/reducers/auth';
// import VendorTermsModal from './components/VendorTermsModal';

// const getCategoryId = (cat) => cat?.id ?? cat?.categoryId ?? cat?._id;
// const getCategoryName = (cat) => cat?.name ?? cat?.categoryName ?? cat?.title ?? '';

// const MENU_ITEMS = [
//   // { key: 'business', label: 'Business Details', icon: 'briefcase' },
//   // { key: 'coupons', label: 'My Coupons', icon: 'gift', screen: 'MyCoupons' },
//   // { key: 'connections', label: 'BNI Connections', icon: 'users', screen: 'BniConnections' },
//   // { key: 'terms', label: 'Terms & Conditions', icon: 'file-text' },
//   // { key: 'help', label: 'Help & Support', icon: 'help-circle' },
// ];

// const BniProfileScreen = ({ navigation }) => {
//   const insets = useSafeAreaInsets();
//   const dispatch = useDispatch();
//   const { vendorId, vendorProfile, loading, bniCategories, bniCategoriesLoading } = useSelector(
//     (state) => state.Auth
//   );

//   const [editing, setEditing] = useState(false);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [address, setAddress] = useState('');
//   const [category, setCategory] = useState(null);
//   const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showTermsModal, setShowTermsModal] = useState(false);

//   useFocusEffect(
//     React.useCallback(() => {
//       if (vendorId) {
//         dispatch(fetchVendorProfile(vendorId));
//       }
//       if (bniCategories.length === 0) {
//         dispatch(fetchBniCategories());
//       }
//     }, [dispatch, vendorId])
//   );

//   useEffect(() => {
//     if (vendorProfile) {
//       setName(vendorProfile.name || '');
//       setEmail(vendorProfile.email || '');
//       setAddress(vendorProfile.address || '');
//       // setPassword(vendorProfile.password || ''); // commented out for now
//     }
//   }, [vendorProfile]);

//   useEffect(() => {
//     if (vendorProfile && bniCategories.length > 0) {
//       const matched = bniCategories.find(
//         (c) => String(getCategoryId(c)) === String(vendorProfile.categoryId)
//       );
//       setCategory(matched || null);
//     }
//   }, [vendorProfile, bniCategories]);

//   const handleSave = () => {
//     if (!vendorId) return;

//     const payload = {
//       name: name.trim(),
//       email: email.trim().toLowerCase(),
//       address: address.trim(),
//       categoryId: getCategoryId(category),
//     };

//     // if (password.trim()) {
//     //   payload.password = password.trim();
//     // } // commented out for now

//     dispatch(updateVendorProfile({ vendorId, profileData: payload }))
//       .unwrap()
//       .then((res) => {
//         Alert.alert('Success', res.message || 'Profile updated successfully!');
//         setEditing(false);
//         // setPassword('');
//         dispatch(fetchVendorProfile(vendorId));
//       })
//       .catch((err) => {
//         Alert.alert('Failed', err || 'Could not update profile');
//       });
//   };

//   const handleLogout = () => {
//     Alert.alert('Logout', 'Are you sure you want to log out?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Logout',
//         style: 'destructive',
//         onPress: async () => {
//           try {
//             await AsyncStorage.clear();
//             dispatch(logout());
//             navigation.reset({ index: 0, routes: [{ name: 'BniLoginScreen' }] });
//           } catch (error) {
//             Alert.alert('Error', 'Failed to log out. Please try again.');
//           }
//         },
//       },
//     ]);
//   };

//   if (loading && !vendorProfile) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={COLORS.primary} />
//         <Text style={styles.loadingText}>Loading profile...</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

//       <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
//         <Text style={styles.headerTitle}>Profile</Text>
//         <TouchableOpacity onPress={() => setEditing((e) => !e)}>
//           <Feather name={editing ? 'x' : 'edit-2'} size={20} color={COLORS.primary} />
//         </TouchableOpacity>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
//         <View style={styles.profileCard}>
//           <View style={styles.avatar}>
//             <Feather name="user" size={32} color={COLORS.primary} />
//           </View>
//           <Text style={styles.name}>{vendorProfile?.name || 'Vendor'}</Text>
//           <Text style={styles.subText}>
//             {vendorProfile?.contact ? `${vendorProfile.contact} • ` : ''}Vendor
//           </Text>
//         </View>

//         {editing ? (
//           <View style={styles.formSection}>
//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Shop Name</Text>
//               <TextInput
//                 style={styles.input}
//                 value={name}
//                 onChangeText={setName}
//                 placeholder="Enter Shop Name"
//                 placeholderTextColor={COLORS.textLight}
//               />
//             </View>

//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Email</Text>
//               <TextInput
//                 style={styles.input}
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 placeholder="Enter Email"
//                 placeholderTextColor={COLORS.textLight}
//               />
//             </View>

//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Address</Text>
//               <TextInput
//                 style={styles.input}
//                 value={address}
//                 onChangeText={setAddress}
//                 placeholder="Enter Address"
//                 placeholderTextColor={COLORS.textLight}
//               />
//             </View>

//             {/* <View style={styles.inputGroup}>
//               <Text style={styles.label}>Password</Text>
//               <View style={styles.passwordRow}>
//                 <TextInput
//                   style={[styles.input, styles.passwordInput]}
//                   value={password}
//                   onChangeText={setPassword}
//                   secureTextEntry={!showPassword}
//                   placeholder="Enter Password"
//                   placeholderTextColor={COLORS.textLight}
//                   autoCapitalize="none"
//                 />
//                 <TouchableOpacity
//                   style={styles.eyeIconButton}
//                   onPress={() => setShowPassword(!showPassword)}
//                 >
//                   <Feather
//                     name={showPassword ? 'eye-off' : 'eye'}
//                     size={18}
//                     color={COLORS.textGray}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View> */}

//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Category</Text>
//               <TouchableOpacity
//                 style={styles.dropdownInput}
//                 onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
//                 disabled={bniCategoriesLoading}
//               >
//                 <Text style={[styles.dropdownText, !category && styles.placeholder]}>
//                   {bniCategoriesLoading
//                     ? 'Loading categories...'
//                     : getCategoryName(category) || 'Select Category'}
//                 </Text>
//                 {bniCategoriesLoading ? (
//                   <ActivityIndicator size="small" color={COLORS.textGray} />
//                 ) : (
//                   <Feather name="chevron-down" size={18} color={COLORS.textGray} />
//                 )}
//               </TouchableOpacity>
//               {showCategoryDropdown && (
//                 <View style={styles.dropdownMenu}>
//                   {bniCategories.map((c) => (
//                     <TouchableOpacity
//                       key={getCategoryId(c)}
//                       style={styles.dropdownItem}
//                       onPress={() => {
//                         setCategory(c);
//                         setShowCategoryDropdown(false);
//                       }}
//                     >
//                       <Text style={styles.dropdownItemText}>{getCategoryName(c)}</Text>
//                     </TouchableOpacity>
//                   ))}
//                 </View>
//               )}
//             </View>

//             <TouchableOpacity
//               style={[styles.saveButton, loading && { opacity: 0.7 }]}
//               onPress={handleSave}
//               disabled={loading}
//             >
//               {loading ? (
//                 <ActivityIndicator color={COLORS.white} />
//               ) : (
//                 <Text style={styles.saveText}>Save Changes</Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <View style={styles.menuList}>
//             {MENU_ITEMS.map((item) => (
//               <TouchableOpacity
//                 key={item.key}
//                 style={styles.menuItem}
//                 onPress={() => {
//                   if (item.key === 'terms') {
//                     setShowTermsModal(true);
//                   } else if (item.screen) {
//                     navigation.navigate(item.screen);
//                   }
//                 }}
//               >
//                 <View style={styles.menuIconBox}>
//                   <Feather name={item.icon} size={18} color={COLORS.primary} />
//                 </View>
//                 <Text style={styles.menuLabel}>{item.label}</Text>
//                 <Feather name="chevron-right" size={18} color={COLORS.textLight} />
//               </TouchableOpacity>
//             ))}
//           </View>
//         )}

//         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//           <Feather name="log-out" size={18} color={COLORS.primary} />
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       <VendorTermsModal visible={showTermsModal} onClose={() => setShowTermsModal(false)} />
//     </SafeAreaView>
//   );
// };

// export default BniProfileScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.white },
//   loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   loadingText: { marginTop: 12, fontFamily: FONTS.medium, fontSize: 14, color: COLORS.textGray },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingBottom: 12,
//   },
//   headerTitle: { fontFamily: FONTS.bold, fontSize: 20, color: COLORS.textDark },
//   profileCard: { alignItems: 'center', paddingVertical: 20 },
//   avatar: {
//     width: 72,
//     height: 72,
//     borderRadius: 36,
//     backgroundColor: COLORS.warningBg,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 12,
//   },
//   name: { fontFamily: FONTS.bold, fontSize: 16, color: COLORS.textDark },
//   subText: { fontFamily: FONTS.regular, fontSize: 12, color: COLORS.textGray, marginTop: 2 },
//   menuList: { paddingHorizontal: 20, marginTop: 10 },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.border,
//   },
//   menuIconBox: {
//     width: 34,
//     height: 34,
//     borderRadius: 17,
//     backgroundColor: COLORS.inputBg,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 12,
//   },
//   menuLabel: { flex: 1, fontFamily: FONTS.medium, fontSize: 14, color: COLORS.textDark },
//   formSection: { paddingHorizontal: 20, marginTop: 10 },
//   inputGroup: { marginBottom: 16 },
//   label: {
//     fontFamily: FONTS.semibold,
//     fontSize: 13,
//     color: COLORS.textDark,
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     borderRadius: 8,
//     paddingHorizontal: 14,
//     paddingVertical: 12,
//     fontSize: 14,
//     fontFamily: FONTS.medium,
//     color: COLORS.textDark,
//     backgroundColor: COLORS.inputBg,
//   },
//   dropdownInput: {
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     borderRadius: 8,
//     paddingHorizontal: 14,
//     paddingVertical: 12,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: COLORS.inputBg,
//   },
//   passwordRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   passwordInput: {
//     flex: 1,
//   },
//   eyeIconButton: {
//     position: 'absolute',
//     right: 14,
//     padding: 4,
//   },
//   dropdownText: { fontFamily: FONTS.medium, fontSize: 14, color: COLORS.textDark },
//   placeholder: { color: COLORS.textLight },
//   dropdownMenu: {
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     borderRadius: 8,
//     backgroundColor: COLORS.white,
//     marginTop: 4,
//   },
//   dropdownItem: {
//     paddingVertical: 12,
//     paddingHorizontal: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.border,
//   },
//   dropdownItemText: { fontFamily: FONTS.medium, fontSize: 14, color: COLORS.textDark },
//   saveButton: {
//     backgroundColor: COLORS.primary,
//     height: 50,
//     borderRadius: 25,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 8,
//   },
//   saveText: { color: COLORS.white, fontFamily: FONTS.bold, fontSize: 15 },
//   logoutButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginHorizontal: 20,
//     marginTop: 24,
//     paddingVertical: 14,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//   },
//   logoutText: {
//     fontFamily: FONTS.semibold,
//     fontSize: 14,
//     color: COLORS.primary,
//     marginLeft: 8,
//   },
// });
import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';
import { COLORS, FONTS } from './theme';
import { fetchVendorProfile, updateVendorProfile, deleteVendorAccount, logout, fetchBniCategories } from '../../redux/reducers/auth';
import VendorTermsModal from './components/VendorTermsModal';
import DeleteAccountModal from '../../components/DeleteAccountModal';

const getCategoryId = (cat) => cat?.id ?? cat?.categoryId ?? cat?._id;
const getCategoryName = (cat) => cat?.name ?? cat?.categoryName ?? cat?.title ?? '';

const MENU_ITEMS = [
  // { key: 'business', label: 'Business Details', icon: 'briefcase' },
  { key: 'coupons', label: 'My Coupons', icon: 'gift', screen: 'MyCoupons' },
  // { key: 'connections', label: 'BNI Connections', icon: 'users', screen: 'BniConnections' },
  { key: 'terms', label: 'Terms & Conditions', icon: 'file-text' },
  // { key: 'help', label: 'Help & Support', icon: 'help-circle' },
];

const BniProfileScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { vendorId, vendorProfile, loading, bniCategories, bniCategoriesLoading } = useSelector(
    (state) => state.Auth
  );

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [shopImageUri, setShopImageUri] = useState(null);
  const [shopImageName, setShopImageName] = useState('');
  const [shopImageBase64, setShopImageBase64] = useState('');
  const [profileUri, setProfileUri] = useState(null);
  const [profileBase64, setProfileBase64] = useState('');
  const [logoUri, setLogoUri] = useState(null);
  const [logoName, setLogoName] = useState('');
  const [logoBase64, setLogoBase64] = useState('');

  const pickImage = (onPicked) => {
    launchImageLibrary(
      { mediaType: 'photo', includeBase64: true, maxWidth: 800, maxHeight: 800, quality: 0.8 },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Failed to pick image');
          return;
        }
        const asset = response.assets && response.assets[0];
        if (asset) onPicked(asset);
      }
    );
  };

  const toDataUri = (asset) =>
    asset.base64 ? `data:${asset.type || 'image/jpeg'};base64,${asset.base64}` : '';

  const handlePickShopImage = () =>
    pickImage((asset) => {
      setShopImageUri(asset.uri);
      setShopImageName(asset.fileName || 'shop_image.jpg');
      setShopImageBase64(toDataUri(asset));
    });

  const handlePickProfile = () =>
    pickImage((asset) => {
      setProfileUri(asset.uri);
      setProfileBase64(toDataUri(asset));
    });

  const handlePickLogo = () =>
    pickImage((asset) => {
      setLogoUri(asset.uri);
      setLogoName(asset.fileName || 'logo.png');
      setLogoBase64(toDataUri(asset));
    });

  useFocusEffect(
    React.useCallback(() => {
      if (vendorId) {
        dispatch(fetchVendorProfile(vendorId));
      }
      if (bniCategories.length === 0) {
        dispatch(fetchBniCategories());
      }
    }, [dispatch, vendorId])
  );

  useEffect(() => {
    if (vendorProfile) {
      setName(vendorProfile.name || '');
      setEmail(vendorProfile.email || '');
      setAddress(vendorProfile.address || '');
      setShopImageUri(vendorProfile.shopImage || null);
      setLogoUri(vendorProfile.logo || null);
      setProfileUri(vendorProfile.profile || null);
      setProfileBase64('');
      setShopImageName('');
      setLogoName('');
      setShopImageBase64('');
      setLogoBase64('');
      setPassword(vendorProfile.password || '');
    }
  }, [vendorProfile]);

  useEffect(() => {
    if (vendorProfile && bniCategories.length > 0) {
      const matched = bniCategories.find(
        (c) => String(getCategoryId(c)) === String(vendorProfile.categoryId)
      );
      setCategory(matched || null);
    }
  }, [vendorProfile, bniCategories]);

  const handleSave = () => {
    if (!vendorId) return;

    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      address: address.trim(),
      categoryId: getCategoryId(category),
    };

    // Only send images the vendor actually changed
    if (shopImageBase64) payload.shopImage = shopImageBase64;
    if (logoBase64) payload.logo = logoBase64;
    if (profileBase64) payload.profile = profileBase64;

    if (password.trim()) {
      payload.password = password.trim();
    }

    dispatch(updateVendorProfile({ vendorId, profileData: payload }))
      .unwrap()
      .then((res) => {
        Alert.alert('Success', res.message || 'Profile updated successfully!');
        setEditing(false);
        dispatch(fetchVendorProfile(vendorId));
      })
      .catch((err) => {
        Alert.alert('Failed', err || 'Could not update profile');
      });
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await AsyncStorage.clear();
            dispatch(logout());
            navigation.reset({ index: 0, routes: [{ name: 'BniLoginScreen' }] });
          } catch (error) {
            Alert.alert('Error', 'Failed to log out. Please try again.');
          }
        },
      },
    ]);
  };

  const handleDeleteAccount = async () => {
    setDeletingAccount(true);
    try {
      await dispatch(deleteVendorAccount(vendorId)).unwrap();
      setShowDeleteModal(false);
      await AsyncStorage.clear();
      dispatch(logout());
      navigation.reset({ index: 0, routes: [{ name: 'BniLoginScreen' }] });
    } catch (error) {
      Alert.alert('Error', typeof error === 'string' ? error : 'Failed to delete account. Please try again.');
    } finally {
      setDeletingAccount(false);
    }
  };

  if (loading && !vendorProfile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={() => setEditing((e) => !e)}>
          <Feather name={editing ? 'x' : 'edit-2'} size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.profileCard}>
          <TouchableOpacity
            activeOpacity={editing ? 0.7 : 1}
            onPress={editing ? handlePickProfile : undefined}
          >
            <View style={styles.avatar}>
              {profileUri ? (
                <Image source={{ uri: profileUri }} style={styles.avatarImage} />
              ) : (
                <Feather name="user" size={32} color={COLORS.primary} />
              )}
            </View>
            {editing && (
              <View style={styles.cameraBadge}>
                <Feather name="camera" size={14} color={COLORS.white} />
              </View>
            )}
          </TouchableOpacity>
          <Text style={styles.name}>{vendorProfile?.name || 'Vendor'}</Text>
          <Text style={styles.subText}>
            {vendorProfile?.contact ? `${vendorProfile.contact} • ` : ''}Vendor
          </Text>
        </View>

        {editing ? (
          <View style={styles.formSection}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Shop Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter Shop Name"
                placeholderTextColor={COLORS.textLight}
              />
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
                  autoCapitalize="none"
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
              <Text style={styles.label}>Shop Image</Text>
              <TouchableOpacity style={styles.fileInput} onPress={handlePickShopImage}>
                {shopImageUri ? (
                  <Image source={{ uri: shopImageUri }} style={styles.filePreviewImage} />
                ) : (
                  <Feather name="upload" size={18} color={COLORS.textGray} />
                )}
                <Text style={styles.fileText}>
                  {shopImageName || (shopImageUri ? 'Change Image' : 'Choose File')}
                </Text>
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
                <Text style={styles.fileText}>
                  {logoName || (logoUri ? 'Change Logo' : 'Choose File')}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.saveButton, loading && { opacity: 0.7 }]}
              onPress={handleSave}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text style={styles.saveText}>Save Changes</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.menuList}>
            {MENU_ITEMS.map((item) => (
              <TouchableOpacity
                key={item.key}
                style={styles.menuItem}
                onPress={() => {
                  if (item.key === 'terms') {
                    setShowTermsModal(true);
                  } else if (item.screen) {
                    navigation.navigate(item.screen);
                  }
                }}
              >
                <View style={styles.menuIconBox}>
                  <Feather name={item.icon} size={18} color={COLORS.primary} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Feather name="chevron-right" size={18} color={COLORS.textLight} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Feather name="log-out" size={18} color={COLORS.primary} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteAccountButton} onPress={() => setShowDeleteModal(true)}>
          <Feather name="trash-2" size={18} color="#d32f2f" />
          <Text style={styles.deleteAccountText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>

      <VendorTermsModal visible={showTermsModal} onClose={() => setShowTermsModal(false)} />
      <DeleteAccountModal
        visible={showDeleteModal}
        loading={deletingAccount}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
      />
    </View>
  );
};

export default BniProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, fontFamily: FONTS.medium, fontSize: 14, color: COLORS.textGray },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  headerTitle: { fontFamily: FONTS.bold, fontSize: 20, color: COLORS.textDark },
  profileCard: { alignItems: 'center', paddingVertical: 20 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.warningBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    overflow: 'hidden',
  },
  avatarImage: { width: 72, height: 72 },
  cameraBadge: {
    position: 'absolute',
    bottom: 12,
    right: 0,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 5,
  },
  name: { fontFamily: FONTS.bold, fontSize: 16, color: COLORS.textDark },
  subText: { fontFamily: FONTS.regular, fontSize: 12, color: COLORS.textGray, marginTop: 2 },
  menuList: { paddingHorizontal: 20, marginTop: 10 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuIconBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuLabel: { flex: 1, fontFamily: FONTS.medium, fontSize: 14, color: COLORS.textDark },
  formSection: { paddingHorizontal: 20, marginTop: 10 },
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
  dropdownText: { fontFamily: FONTS.medium, fontSize: 14, color: COLORS.textDark },
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
  fileText: { fontFamily: FONTS.medium, fontSize: 13, color: COLORS.textGray, marginTop: 6 },
  filePreviewImage: { width: 60, height: 60, borderRadius: 8 },
  saveButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  saveText: { color: COLORS.white, fontFamily: FONTS.bold, fontSize: 15 },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  logoutText: {
    fontFamily: FONTS.semibold,
    fontSize: 14,
    color: COLORS.primary,
    marginLeft: 8,
  },
  deleteAccountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 24,
    paddingVertical: 14,
  },
  deleteAccountText: {
    fontFamily: FONTS.semibold,
    fontSize: 14,
    color: '#d32f2f',
    marginLeft: 8,
  },
});