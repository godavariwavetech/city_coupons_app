// import React, { useEffect, useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   SafeAreaView,
//   FlatList,
//   ScrollView,
//   Image,
//   ActivityIndicator,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useFocusEffect } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import Feather from 'react-native-vector-icons/Feather';
// import {
//   searchBniConnections,
//   fetchGivenBniConnection,
//   addGivenBniConnection,
//   fetchBniCategories,
//   fetchBniIndustries,
//   addBniIndustry,
//   fetchBniCities,
//   addBniCity,
// } from '../../redux/reducers/auth';

// const getCategoryId = (item) => item?.id ?? item?.categoryId;
// const getCategoryName = (item) => item?.name ?? item?.categoryName ?? '';
// const getIndustryId = (item) => item?.id ?? item?.industryId;
// const getIndustryName = (item) => item?.name ?? item?.industryName ?? '';
// const getCityId = (item) => item?.id ?? item?.cityId;
// const getCityName = (item) => item?.name ?? item?.cityName ?? '';

// const COLORS = {
//   primary: '#0250B7',
//   primaryLight: '#E8F0FC',
//   white: '#FFFFFF',
//   textDark: '#1A1A1A',
//   textGray: '#666666',
//   textLight: '#999999',
//   border: '#EAEAEA',
//   background: '#FFFFFF',
// };

// const BniConnectionsScreen = ({ navigation }) => {
//   const insets = useSafeAreaInsets();
//   const dispatch = useDispatch();
//   const [subTab, setSubTab] = useState('Ask'); // 'Ask' or 'Given'
//   const [search, setSearch] = useState('');
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
//   const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
//   const [isOtherIndustry, setIsOtherIndustry] = useState(false);
//   const [customIndustryName, setCustomIndustryName] = useState('');
//   const [showCityDropdown, setShowCityDropdown] = useState(false);
//   const [isOtherCity, setIsOtherCity] = useState(false);
//   const [customCityName, setCustomCityName] = useState('');
//   const debounceRef = useRef(null);

//   const [fullName, setFullName] = useState('');
//   const [designation, setDesignation] = useState('');
//   const [companyName, setCompanyName] = useState('');
//   const [category, setCategory] = useState(null);
//   const [industry, setIndustry] = useState(null);
//   const [companyAddress, setCompanyAddress] = useState('');
//   const [city, setCity] = useState(null);

//   const {
//     bniConnections,
//     bniConnectionsLoading,
//     vendorId,
//     givenConnections,
//     givenConnectionLoading,
//     addGivenConnectionLoading,
//     bniCategories,
//     bniCategoriesLoading,
//     bniIndustries,
//     bniIndustriesLoading,
//     bniIndustryAdding,
//     bniCities,
//     bniCitiesLoading,
//     bniCityAdding,
//   } = useSelector((state) => state.Auth);

//   useEffect(() => {
//     if (subTab !== 'Ask') return;

//     const query = search.trim();
//     if (!query) return;

//     if (debounceRef.current) clearTimeout(debounceRef.current);
//     debounceRef.current = setTimeout(() => {
//       dispatch(searchBniConnections(query));
//     }, 400);

//     return () => clearTimeout(debounceRef.current);
//   }, [dispatch, subTab, search]);

//   useEffect(() => {
//     if (subTab === 'Given' && vendorId) {
//       setShowAddForm(false);
//       dispatch(fetchGivenBniConnection(vendorId));
//     }
//   }, [dispatch, subTab, vendorId]);

//   useFocusEffect(
//     React.useCallback(() => {
//       setShowAddForm(false);
//     }, [])
//   );

//   useEffect(() => {
//     if (showAddForm && bniCategories.length === 0) {
//       dispatch(fetchBniCategories());
//     }
//     if (showAddForm && bniIndustries.length === 0) {
//       dispatch(fetchBniIndustries());
//     }
//     if (showAddForm && bniCities.length === 0) {
//       dispatch(fetchBniCities());
//     }
//   }, [dispatch, showAddForm, bniCategories.length, bniIndustries.length, bniCities.length]);

//   const resetForm = () => {
//     setFullName('');
//     setDesignation('');
//     setCompanyName('');
//     setCategory(null);
//     setIndustry(null);
//     setCompanyAddress('');
//     setCity(null);
//     setShowCategoryDropdown(false);
//     setShowIndustryDropdown(false);
//     setIsOtherIndustry(false);
//     setCustomIndustryName('');
//     setShowCityDropdown(false);
//     setIsOtherCity(false);
//     setCustomCityName('');
//   };

//   const handleAddIndustry = () => {
//     if (!customIndustryName.trim()) return;
//     dispatch(addBniIndustry(customIndustryName.trim()))
//       .unwrap()
//       .then((res) => {
//         setIndustry(res?.data || { name: customIndustryName.trim() });
//         setIsOtherIndustry(false);
//         setCustomIndustryName('');
//       })
//       .catch((err) => Alert.alert('Error', err || 'Failed to add industry'));
//   };

//   const handleAddCity = () => {
//     if (!customCityName.trim()) return;
//     dispatch(addBniCity(customCityName.trim()))
//       .unwrap()
//       .then((res) => {
//         setCity(res?.data || { name: customCityName.trim() });
//         setIsOtherCity(false);
//         setCustomCityName('');
//       })
//       .catch((err) => Alert.alert('Error', err || 'Failed to add city'));
//   };

//   const handleAddConnection = () => {
//     if (!fullName.trim() || !companyName.trim() || !category) {
//       Alert.alert('Missing details', 'Please fill full name, company name and category.');
//       return;
//     }

//     dispatch(
//       addGivenBniConnection({
//         fullName: fullName.trim(),
//         designation: designation.trim(),
//         companyName: companyName.trim(),
//         categoryId: getCategoryId(category),
//         industry: getIndustryName(industry),
//         city: getCityName(city),
//         companyAddress: companyAddress.trim(),
//         vendorId,
//       })
//     )
//       .unwrap()
//       .then(() => {
//         resetForm();
//         setShowAddForm(false);
//         dispatch(fetchGivenBniConnection(vendorId));
//       })
//       .catch((err) => Alert.alert('Error', err || 'Failed to add connection'));
//   };

//   const filtered = bniConnections || [];

//   const renderBusinessCard = ({ item }, { hideAddedBy = false } = {}) => {
//     const id = item.id ?? item.connectionId;
//     const name = item.companyName ?? item.name ?? item.businessName ?? item.fullName;
//     const category = item.categoryName ?? item.category;
//     const location = [item.city, item.companyAddress].filter(Boolean).join(', ') || item.location || item.address;
//     const desc = [item.fullName, item.designation, item.industry].filter(Boolean).join(' • ') || item.desc || item.description || '';
//     const addedBy = item.addedByVendor ?? item.addedByName ?? item.addedBy ?? item.createdBy ?? '';
//     const phone = item.addedByVendorContact ?? item.phone ?? item.mobile ?? item.contact ?? '';

//     return (
//       <View key={id} style={styles.card}>
//         <Text style={styles.cardTitle}>{name}</Text>

//         {!!category && (
//           <View style={styles.categoryBadge}>
//             <Text style={styles.categoryText}>{category}</Text>
//           </View>
//         )}

//         {!!location && (
//           <View style={styles.locationRow}>
//             <Feather name="map-pin" size={14} color={COLORS.textGray} style={{ marginRight: 6 }} />
//             <Text style={styles.locationText}>{location}</Text>
//           </View>
//         )}

//         {!!desc && <Text style={styles.descText}>{desc}</Text>}

//         <View style={styles.dashedLine} />

//         <View style={styles.footerInfo}>
//           {!hideAddedBy && (
//             <View style={styles.addedByRow}>
//               <Text style={styles.addedByLabel}>Added by   </Text>
//               <Text style={styles.addedByName}>{addedBy} </Text>
//               <View style={styles.bniBadge}>
//                 <Text style={styles.bniBadgeText}>BNI</Text>
//               </View>
//             </View>
//           )}
//           <Text style={[styles.phoneText, hideAddedBy && { marginLeft: 0 }]}>{phone}</Text>
//         </View>
//       </View>
//     );
//   };

//   const renderGivenBusinessCard = (props) => renderBusinessCard(props, { hideAddedBy: true });

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

//       {/* Top Toggle Tabs */}
//       <View style={[styles.subTabRow, { marginTop: insets.top + 16 }]}>
//         <TouchableOpacity
//           style={[styles.subTabButton, subTab === 'Ask' ? styles.subTabButtonActive : styles.subTabButtonInactive]}
//           onPress={() => setSubTab('Ask')}
//           activeOpacity={0.8}
//         >
//           <Text style={[styles.subTabText, subTab === 'Ask' ? styles.subTabTextActive : styles.subTabTextInactive]}>
//             Ask
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.subTabButton, subTab === 'Given' ? styles.subTabButtonActive : styles.subTabButtonInactive]}
//           onPress={() => setSubTab('Given')}
//           activeOpacity={0.8}
//         >
//           <Text style={[styles.subTabText, subTab === 'Given' ? styles.subTabTextActive : styles.subTabTextInactive]}>
//             Given
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Conditional Rendering Based on Active Tab */}
//       {subTab === 'Ask' ? (
//         <View style={{ flex: 1 }}>
//           <View style={styles.logoContainer}>
//             <Image
//               source={require('../../assets/myconnections.png')}
//               style={styles.logoImage}
//               resizeMode="contain"
//             />
//           </View>

//           <View style={styles.searchContainer}>
//             <Feather name="search" size={18} color={COLORS.textLight} />
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search business name, category or location..."
//               placeholderTextColor={COLORS.textLight}
//               value={search}
//               onChangeText={setSearch}
//             />
//           </View>

//           {!search.trim() ? (
//             <View style={styles.emptyGivenContainer}>
//               <Feather name="search" size={32} color={COLORS.border} />
//               <Text style={styles.emptyText}>Start typing to search businesses</Text>
//             </View>
//           ) : (
//             <>
//               <Text style={styles.resultsCount}>
//                 {bniConnectionsLoading ? 'Searching...' : `${filtered.length} Businesses Found`}
//               </Text>

//               {bniConnectionsLoading ? (
//                 <ActivityIndicator style={{ marginTop: 24 }} size="small" color={COLORS.primary} />
//               ) : (
//                 <FlatList
//                   data={filtered}
//                   keyExtractor={(item, index) => String(item.id ?? item.connectionId ?? index)}
//                   contentContainerStyle={styles.listContent}
//                   showsVerticalScrollIndicator={false}
//                   renderItem={renderBusinessCard}
//                   ListEmptyComponent={
//                     <Text style={styles.emptyText}>No businesses found</Text>
//                   }
//                 />
//               )}
//             </>
//           )}
//         </View>
//       ) : (
//         <View style={{ flex: 1 }}>
//           {givenConnectionLoading ? (
//             <ActivityIndicator style={{ marginTop: 40 }} size="small" color={COLORS.primary} />
//           ) : showAddForm ? (
//             <KeyboardAvoidingView
//               style={{ flex: 1 }}
//               behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//               keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
//             >
//             <ScrollView
//               style={styles.formContainer}
//               showsVerticalScrollIndicator={false}
//               keyboardShouldPersistTaps="handled"
//             >
//               <Text style={styles.formTitle}>Add Business</Text>

//               <View style={styles.inputGroup}>
//                 <Text style={styles.inputLabel}>Full Name</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Harsha Kumar"
//                   placeholderTextColor={COLORS.textLight}
//                   value={fullName}
//                   onChangeText={setFullName}
//                 />
//               </View>

//               <View style={styles.inputGroup}>
//                 <Text style={styles.inputLabel}>Designation</Text>
//                 <TextInput style={styles.input} value={designation} onChangeText={setDesignation} />
//               </View>

//               <View style={styles.inputGroup}>
//                 <Text style={styles.inputLabel}>Company Name</Text>
//                 <TextInput style={styles.input} value={companyName} onChangeText={setCompanyName} />
//               </View>

//               <View style={styles.inputGroup}>
//                 <Text style={styles.inputLabel}>Category</Text>
//                 <TouchableOpacity
//                   style={styles.dropdownInput}
//                   activeOpacity={0.7}
//                   onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
//                   disabled={bniCategoriesLoading}
//                 >
//                   <Text style={[styles.dropdownText, !category && { color: COLORS.textLight }]}>
//                     {bniCategoriesLoading ? 'Loading...' : getCategoryName(category) || 'Select Category'}
//                   </Text>
//                   {bniCategoriesLoading ? (
//                     <ActivityIndicator size="small" color={COLORS.textGray} />
//                   ) : (
//                     <Feather name="chevron-down" size={18} color={COLORS.textGray} />
//                   )}
//                 </TouchableOpacity>
//                 {showCategoryDropdown && (
//                   <View style={styles.dropdownMenu}>
//                     {bniCategories.map((c) => (
//                       <TouchableOpacity
//                         key={getCategoryId(c)}
//                         style={styles.dropdownItem}
//                         onPress={() => {
//                           setCategory(c);
//                           setShowCategoryDropdown(false);
//                         }}
//                       >
//                         <Text style={styles.dropdownItemText}>{getCategoryName(c)}</Text>
//                       </TouchableOpacity>
//                     ))}
//                   </View>
//                 )}
//               </View>

//               <View style={styles.inputGroup}>
//                 <Text style={styles.inputLabel}>Industry</Text>
//                 {isOtherIndustry ? (
//                   <View style={styles.codeRow}>
//                     <TextInput
//                       style={[styles.input, { flex: 1 }]}
//                       value={customIndustryName}
//                       onChangeText={setCustomIndustryName}
//                       placeholder="Enter Industry Name"
//                       placeholderTextColor={COLORS.textLight}
//                       autoFocus
//                     />
//                     <TouchableOpacity
//                       style={styles.addInlineButton}
//                       onPress={handleAddIndustry}
//                       disabled={bniIndustryAdding}
//                     >
//                       {bniIndustryAdding ? (
//                         <ActivityIndicator size="small" color={COLORS.white} />
//                       ) : (
//                         <Text style={styles.addInlineButtonText}>Add</Text>
//                       )}
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={styles.cancelIconButton}
//                       onPress={() => {
//                         setIsOtherIndustry(false);
//                         setCustomIndustryName('');
//                       }}
//                     >
//                       <Feather name="x" size={18} color={COLORS.textGray} />
//                     </TouchableOpacity>
//                   </View>
//                 ) : (
//                   <>
//                     <TouchableOpacity
//                       style={styles.dropdownInput}
//                       activeOpacity={0.7}
//                       onPress={() => setShowIndustryDropdown(!showIndustryDropdown)}
//                       disabled={bniIndustriesLoading}
//                     >
//                       <Text style={[styles.dropdownText, !industry && { color: COLORS.textLight }]}>
//                         {bniIndustriesLoading ? 'Loading...' : getIndustryName(industry) || 'Select Industry'}
//                       </Text>
//                       {bniIndustriesLoading ? (
//                         <ActivityIndicator size="small" color={COLORS.textGray} />
//                       ) : (
//                         <Feather name="chevron-down" size={18} color={COLORS.textGray} />
//                       )}
//                     </TouchableOpacity>
//                     {showIndustryDropdown && (
//                       <View style={styles.dropdownMenu}>
//                         {bniIndustries.map((i) => (
//                           <TouchableOpacity
//                             key={getIndustryId(i)}
//                             style={styles.dropdownItem}
//                             onPress={() => {
//                               setIndustry(i);
//                               setShowIndustryDropdown(false);
//                             }}
//                           >
//                             <Text style={styles.dropdownItemText}>{getIndustryName(i)}</Text>
//                           </TouchableOpacity>
//                         ))}
//                         <TouchableOpacity
//                           style={[styles.dropdownItem, { borderBottomWidth: 0 }]}
//                           onPress={() => {
//                             setShowIndustryDropdown(false);
//                             setIsOtherIndustry(true);
//                           }}
//                         >
//                           <Text style={[styles.dropdownItemText, { color: COLORS.primary }]}>
//                             Others (Add New)
//                           </Text>
//                         </TouchableOpacity>
//                       </View>
//                     )}
//                   </>
//                 )}
//               </View>

//               <View style={styles.inputGroup}>
//                 <Text style={styles.inputLabel}>Company Address</Text>
//                 <TextInput style={styles.input} value={companyAddress} onChangeText={setCompanyAddress} />
//               </View>

//               <View style={styles.inputGroup}>
//                 <Text style={styles.inputLabel}>City</Text>
//                 {isOtherCity ? (
//                   <View style={styles.codeRow}>
//                     <TextInput
//                       style={[styles.input, { flex: 1 }]}
//                       value={customCityName}
//                       onChangeText={setCustomCityName}
//                       placeholder="Enter City Name"
//                       placeholderTextColor={COLORS.textLight}
//                       autoFocus
//                     />
//                     <TouchableOpacity
//                       style={styles.addInlineButton}
//                       onPress={handleAddCity}
//                       disabled={bniCityAdding}
//                     >
//                       {bniCityAdding ? (
//                         <ActivityIndicator size="small" color={COLORS.white} />
//                       ) : (
//                         <Text style={styles.addInlineButtonText}>Add</Text>
//                       )}
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={styles.cancelIconButton}
//                       onPress={() => {
//                         setIsOtherCity(false);
//                         setCustomCityName('');
//                       }}
//                     >
//                       <Feather name="x" size={18} color={COLORS.textGray} />
//                     </TouchableOpacity>
//                   </View>
//                 ) : (
//                   <>
//                     <TouchableOpacity
//                       style={styles.dropdownInput}
//                       activeOpacity={0.7}
//                       onPress={() => setShowCityDropdown(!showCityDropdown)}
//                       disabled={bniCitiesLoading}
//                     >
//                       <Text style={[styles.dropdownText, !city && { color: COLORS.textLight }]}>
//                         {bniCitiesLoading ? 'Loading...' : getCityName(city) || 'Select City'}
//                       </Text>
//                       {bniCitiesLoading ? (
//                         <ActivityIndicator size="small" color={COLORS.textGray} />
//                       ) : (
//                         <Feather name="chevron-down" size={18} color={COLORS.textGray} />
//                       )}
//                     </TouchableOpacity>
//                     {showCityDropdown && (
//                       <View style={styles.dropdownMenu}>
//                         <ScrollView
//                           style={styles.dropdownScroll}
//                           nestedScrollEnabled
//                           showsVerticalScrollIndicator={true}
//                           keyboardShouldPersistTaps="handled"
//                         >
//                           {bniCities.map((c) => (
//                             <TouchableOpacity
//                               key={getCityId(c)}
//                               style={styles.dropdownItem}
//                               onPress={() => {
//                                 setCity(c);
//                                 setShowCityDropdown(false);
//                               }}
//                             >
//                               <Text style={styles.dropdownItemText}>{getCityName(c)}</Text>
//                             </TouchableOpacity>
//                           ))}
//                         </ScrollView>
//                         <TouchableOpacity
//                           style={[styles.dropdownItem, { borderBottomWidth: 0 }]}
//                           onPress={() => {
//                             setShowCityDropdown(false);
//                             setIsOtherCity(true);
//                           }}
//                         >
//                           <Text style={[styles.dropdownItemText, { color: COLORS.primary }]}>
//                             Others (Add New)
//                           </Text>
//                         </TouchableOpacity>
//                       </View>
//                     )}
//                   </>
//                 )}
//               </View>

//               <TouchableOpacity
//                 style={[styles.submitButton, addGivenConnectionLoading && { opacity: 0.7 }]}
//                 onPress={handleAddConnection}
//                 disabled={addGivenConnectionLoading}
//               >
//                 {addGivenConnectionLoading ? (
//                   <ActivityIndicator color={COLORS.white} />
//                 ) : (
//                   <Text style={styles.submitText}>Add Business</Text>
//                 )}
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.cancelButton}
//                 onPress={() => {
//                   resetForm();
//                   setShowAddForm(false);
//                 }}
//               >
//                 <Text style={styles.cancelText}>Cancel</Text>
//               </TouchableOpacity>

//               <View style={{ height: 40 }} />
//             </ScrollView>
//             </KeyboardAvoidingView>
//           ) : givenConnections.length > 0 ? (
//             <View style={{ flex: 1 }}>
//               <FlatList
//                 data={givenConnections}
//                 keyExtractor={(item, index) => String(item.id ?? item.connectionId ?? index)}
//                 contentContainerStyle={[styles.listContent, styles.givenListContent]}
//                 showsVerticalScrollIndicator={false}
//                 renderItem={renderGivenBusinessCard}
//               />
//               <TouchableOpacity
//                 style={styles.fabAddButton}
//                 onPress={() => setShowAddForm(true)}
//                 activeOpacity={0.8}
//               >
//                 <Feather name="plus" size={24} color={COLORS.white} />
//               </TouchableOpacity>
//             </View>
//           ) : (
//             <View style={styles.emptyGivenContainer}>
//               <Feather name="users" size={32} color={COLORS.border} />
//               <Text style={styles.emptyText}>You haven't added a connection yet</Text>
//               <TouchableOpacity style={styles.addButton} onPress={() => setShowAddForm(true)} activeOpacity={0.8}>
//                 <Feather name="plus" size={16} color={COLORS.white} style={{ marginRight: 6 }} />
//                 <Text style={styles.addButtonText}>Add</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// export default BniConnectionsScreen;

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     backgroundColor: COLORS.white 
//   },
  
//   // Toggle Tabs
//   subTabRow: {
//     flexDirection: 'row',
//     paddingHorizontal: 20,
//     marginTop: 16,
//     marginBottom: 16,
//     gap: 12,
//   },
//   subTabButton: {
//     flex: 1,
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     borderWidth: 1,
//   },
//   subTabButtonActive: { 
//     backgroundColor: COLORS.primaryLight,
//     borderColor: COLORS.primary,
//   },
//   subTabButtonInactive: { 
//     backgroundColor: COLORS.white,
//     borderColor: COLORS.border,
//   },
//   subTabText: { 
//     fontSize: 14, 
//     fontWeight: '600',
//   },
//   subTabTextActive: { 
//     color: COLORS.primary,
//   },
//   subTabTextInactive: { 
//     color: COLORS.textDark,
//   },

//   // ----------------- ASK TAB STYLES ----------------- //

//   // Logo Area
//   logoContainer: {
//     alignItems: 'center',
//     marginTop: 24,
//     marginBottom: 20,
//   },
//   logoImage: {
//     width: 180,
//     height: 180,
//   },

//   // Search
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: 20,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     borderRadius: 24,
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     marginBottom: 20,
//     backgroundColor: COLORS.white,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 10,
//     fontSize: 13,
//     color: COLORS.textDark,
//     padding: 0,
//   },

//   // Results Count
//   resultsCount: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: COLORS.textDark,
//     marginHorizontal: 20,
//     marginBottom: 12,
//   },

//   // List
//   listContent: {
//     paddingHorizontal: 20,
//     paddingBottom: 40
//   },
//   givenListContent: {
//     paddingTop: 4,
//   },
//   emptyText: {
//     textAlign: 'center',
//     color: COLORS.textGray,
//     fontSize: 13,
//     marginTop: 40,
//   },

//   // Card
//   card: {
//     backgroundColor: COLORS.white,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.03,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   cardTitle: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: COLORS.textDark,
//     marginBottom: 8,
//   },
//   categoryBadge: {
//     backgroundColor: COLORS.primaryLight,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 12,
//     alignSelf: 'flex-start',
//     marginBottom: 10,
//   },
//   categoryText: {
//     color: COLORS.primary,
//     fontSize: 10,
//     fontWeight: '600',
//   },
//   locationRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   locationText: {
//     fontSize: 12,
//     color: COLORS.textDark,
//     fontWeight: '500',
//   },
//   descText: {
//     fontSize: 12,
//     color: COLORS.textGray,
//     lineHeight: 18,
//     marginBottom: 12,
//   },
//   dashedLine: {
//     height: 1,
//     borderBottomWidth: 1,
//     borderColor: COLORS.border,
//     borderStyle: 'dashed',
//     marginBottom: 12,
//   },
  
//   // Footer Info
//   footerInfo: {
//     paddingLeft: 4,
//   },
//   addedByRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   addedByLabel: {
//     fontSize: 12,
//     color: COLORS.textGray,
//   },
//   addedByName: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: COLORS.textDark,
//   },
//   bniBadge: {
//     backgroundColor: COLORS.primary,
//     paddingHorizontal: 4,
//     paddingVertical: 2,
//     borderRadius: 4,
//   },
//   bniBadgeText: {
//     color: COLORS.white,
//     fontSize: 8,
//     fontWeight: 'bold',
//   },
//   phoneText: {
//     fontSize: 12,
//     color: COLORS.textDark,
//     marginLeft: 62,
//   },

//   // ----------------- GIVEN TAB STYLES (Form) ----------------- //

//   formContainer: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 24,
//   },
//   formTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: COLORS.textDark,
//     marginBottom: 20,
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   inputLabel: {
//     fontSize: 12,
//     color: COLORS.textLight,
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     borderRadius: 8,
//     height: 48,
//     paddingHorizontal: 14,
//     fontSize: 14,
//     color: COLORS.textDark,
//     backgroundColor: COLORS.white,
//   },
//   dropdownInput: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     borderRadius: 8,
//     height: 48,
//     paddingHorizontal: 14,
//     backgroundColor: COLORS.white,
//   },
//   dropdownText: {
//     fontSize: 14,
//     color: COLORS.textDark,
//   },
//   dropdownMenu: {
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     borderRadius: 8,
//     backgroundColor: COLORS.white,
//     marginTop: 4,
//     maxHeight: 220,
//   },
//   dropdownScroll: {
//     maxHeight: 138,
//   },
//   dropdownItem: {
//     paddingVertical: 12,
//     paddingHorizontal: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.border,
//   },
//   dropdownItemText: {
//     fontSize: 14,
//     color: COLORS.textDark,
//   },
//   submitButton: {
//     backgroundColor: COLORS.primary,
//     height: 50,
//     borderRadius: 25,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 10,
//   },
//   submitText: {
//     color: COLORS.white,
//     fontSize: 15,
//     fontWeight: 'bold',
//   },
//   cancelButton: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 14,
//   },
//   cancelText: {
//     color: COLORS.textGray,
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   emptyGivenContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 40,
//   },
//   addButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: COLORS.primary,
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 24,
//     marginTop: 16,
//   },
//   addButtonText: {
//     color: COLORS.white,
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   fabAddButton: {
//     position: 'absolute',
//     right: 20,
//     bottom: 20,
//     width: 52,
//     height: 52,
//     borderRadius: 26,
//     backgroundColor: COLORS.primary,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   codeRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   addInlineButton: {
//     backgroundColor: COLORS.primary,
//     borderRadius: 8,
//     paddingHorizontal: 14,
//     paddingVertical: 12,
//     marginLeft: 8,
//   },
//   addInlineButtonText: {
//     color: COLORS.white,
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   cancelIconButton: {
//     marginLeft: 8,
//     padding: 6,
//   },
// });
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import {
  searchBniConnections,
  fetchGivenBniConnection,
  addGivenBniConnection,
  fetchBniCategories,
  fetchBniIndustries,
  addBniIndustry,
  fetchBniCities,
  addBniCity,
} from '../../redux/reducers/auth';

const getCategoryId = (item) => item?.id ?? item?.categoryId;
const getCategoryName = (item) => item?.name ?? item?.categoryName ?? '';
const getIndustryId = (item) => item?.id ?? item?.industryId;
const getIndustryName = (item) => item?.name ?? item?.industryName ?? '';
const getCityId = (item) => item?.id ?? item?.cityId;
const getCityName = (item) => item?.name ?? item?.cityName ?? '';

const COLORS = {
  primary: '#002161', // brand navy
  primaryLight: '#FFF0F3',
  white: '#FFFFFF',
  textDark: '#1A1A1A',
  textGray: '#666666',
  textLight: '#999999',
  border: '#EAEAEA',
  background: '#FFFFFF',
};

const BniConnectionsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [subTab, setSubTab] = useState('Ask'); // 'Ask' or 'Given'
  const [search, setSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [isOtherIndustry, setIsOtherIndustry] = useState(false);
  const [customIndustryName, setCustomIndustryName] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [isOtherCity, setIsOtherCity] = useState(false);
  const [customCityName, setCustomCityName] = useState('');
  const debounceRef = useRef(null);

  const [fullName, setFullName] = useState('');
  const [designation, setDesignation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [category, setCategory] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [companyAddress, setCompanyAddress] = useState('');
  const [city, setCity] = useState(null);

  const {
    bniConnections,
    bniConnectionsLoading,
    vendorId,
    givenConnections,
    givenConnectionLoading,
    addGivenConnectionLoading,
    bniCategories,
    bniCategoriesLoading,
    bniIndustries,
    bniIndustriesLoading,
    bniIndustryAdding,
    bniCities,
    bniCitiesLoading,
    bniCityAdding,
  } = useSelector((state) => state.Auth);

  useEffect(() => {
    if (subTab !== 'Ask') return;

    const query = search.trim();
    if (!query) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      // dispatch(searchBniConnections(query));
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [dispatch, subTab, search]);

  useEffect(() => {
    if (subTab === 'Given' && vendorId) {
      setShowAddForm(false);
      // dispatch(fetchGivenBniConnection(vendorId));
    }
  }, [dispatch, subTab, vendorId]);

  useFocusEffect(
    React.useCallback(() => {
      setShowAddForm(false);
    }, [])
  );

  useEffect(() => {
    if (showAddForm && bniCategories.length === 0) {
      dispatch(fetchBniCategories());
    }
    if (showAddForm && bniIndustries.length === 0) {
      dispatch(fetchBniIndustries());
    }
    if (showAddForm && bniCities.length === 0) {
      dispatch(fetchBniCities());
    }
  }, [dispatch, showAddForm, bniCategories.length, bniIndustries.length, bniCities.length]);

  const resetForm = () => {
    setFullName('');
    setDesignation('');
    setCompanyName('');
    setCategory(null);
    setIndustry(null);
    setCompanyAddress('');
    setCity(null);
    setShowCategoryDropdown(false);
    setShowIndustryDropdown(false);
    setIsOtherIndustry(false);
    setCustomIndustryName('');
    setShowCityDropdown(false);
    setIsOtherCity(false);
    setCustomCityName('');
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

  const handleAddConnection = () => {
    if (!fullName.trim() || !companyName.trim() || !category) {
      Alert.alert('Missing details', 'Please fill full name, company name and category.');
      return;
    }

    dispatch(
      addGivenBniConnection({
        fullName: fullName.trim(),
        designation: designation.trim(),
        companyName: companyName.trim(),
        categoryId: getCategoryId(category),
        industry: getIndustryName(industry),
        city: getCityName(city),
        companyAddress: companyAddress.trim(),
        vendorId,
      })
    )
      .unwrap()
      .then(() => {
        resetForm();
        setShowAddForm(false);
        dispatch(fetchGivenBniConnection(vendorId));
      })
      .catch((err) => Alert.alert('Error', err || 'Failed to add connection'));
  };

  const filtered = bniConnections || [];

  const renderBusinessCard = ({ item }, { hideAddedBy = false } = {}) => {
    const id = item.id ?? item.connectionId;
    const name = item.companyName ?? item.name ?? item.businessName ?? item.fullName;
    const category = item.categoryName ?? item.category;
    const location = [item.city, item.companyAddress].filter(Boolean).join(', ') || item.location || item.address;
    const desc = [item.fullName, item.designation, item.industry].filter(Boolean).join(' • ') || item.desc || item.description || '';
    const addedBy = item.addedByVendor ?? item.addedByName ?? item.addedBy ?? item.createdBy ?? '';
    const phone = item.addedByVendorContact ?? item.phone ?? item.mobile ?? item.contact ?? '';

    return (
      <View key={id} style={styles.card}>
        <Text style={styles.cardTitle}>{name}</Text>

        {!!category && (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>
        )}

        {!!location && (
          <View style={styles.locationRow}>
            <Feather name="map-pin" size={14} color={COLORS.textGray} style={{ marginRight: 6 }} />
            <Text style={styles.locationText}>{location}</Text>
          </View>
        )}

        {!!desc && <Text style={styles.descText}>{desc}</Text>}

        <View style={styles.dashedLine} />

        <View style={styles.footerInfo}>
          {!hideAddedBy && (
            <View style={styles.addedByRow}>
              <Text style={styles.addedByLabel}>Added by   </Text>
              <Text style={styles.addedByName}>{addedBy} </Text>
              <View style={styles.bniBadge}>
                <Text style={styles.bniBadgeText}>BNI</Text>
              </View>
            </View>
          )}
          <Text style={[styles.phoneText, hideAddedBy && { marginLeft: 0 }]}>{phone}</Text>
        </View>
      </View>
    );
  };

  const renderGivenBusinessCard = (props) => renderBusinessCard(props, { hideAddedBy: true });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Top Toggle Tabs */}
      <View style={[styles.subTabRow, { marginTop: insets.top + 16 }]}>
        <TouchableOpacity
          style={[styles.subTabButton, subTab === 'Ask' ? styles.subTabButtonActive : styles.subTabButtonInactive]}
          onPress={() => setSubTab('Ask')}
          activeOpacity={0.8}
        >
          <Text style={[styles.subTabText, subTab === 'Ask' ? styles.subTabTextActive : styles.subTabTextInactive]}>
            Ask
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.subTabButton, subTab === 'Given' ? styles.subTabButtonActive : styles.subTabButtonInactive]}
          onPress={() => setSubTab('Given')}
          activeOpacity={0.8}
        >
          <Text style={[styles.subTabText, subTab === 'Given' ? styles.subTabTextActive : styles.subTabTextInactive]}>
            Given
          </Text>
        </TouchableOpacity>
      </View>

      {/* Conditional Rendering Based on Active Tab */}
      {subTab === 'Ask' ? (
        <View style={{ flex: 1 }}>
          {/*
          // Logo Area
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/icon.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.headerSubtitle}>CONNECT | COLLABORATE | GROW</Text>
          </View>

          // Search Bar
          <View style={styles.searchContainer}>
            <Feather name="search" size={18} color={COLORS.textLight} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search business name, category or location..."
              placeholderTextColor={COLORS.textLight}
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {!search.trim() ? (
            <View style={styles.emptyGivenContainer}>
              <Feather name="search" size={32} color={COLORS.border} />
              <Text style={styles.emptyText}>Start typing to search businesses</Text>
            </View>
          ) : (
            <>
              // Results Count
              <Text style={styles.resultsCount}>
                {bniConnectionsLoading ? 'Searching...' : `${filtered.length} Businesses Found`}
              </Text>

              // List
              {bniConnectionsLoading ? (
                <ActivityIndicator style={{ marginTop: 24 }} size="small" color={COLORS.primary} />
              ) : (
                <FlatList
                  data={filtered}
                  keyExtractor={(item, index) => String(item.id ?? item.connectionId ?? index)}
                  contentContainerStyle={styles.listContent}
                  showsVerticalScrollIndicator={false}
                  renderItem={renderBusinessCard}
                  ListEmptyComponent={
                    <Text style={styles.emptyText}>No businesses found</Text>
                  }
                />
              )}
            </>
          )}
          */}

          <View style={styles.emptyGivenContainer}>
            <Text style={styles.emptyText}>Coming soon</Text>
          </View>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {/*
          givenConnectionLoading ? (
            <ActivityIndicator style={{ marginTop: 40 }} size="small" color={COLORS.primary} />
          ) : showAddForm ? (
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
            <ScrollView
              style={styles.formContainer}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.formTitle}>Add Business</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Harsha Kumar"
                  placeholderTextColor={COLORS.textLight}
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Designation</Text>
                <TextInput style={styles.input} value={designation} onChangeText={setDesignation} />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Company Name</Text>
                <TextInput style={styles.input} value={companyName} onChangeText={setCompanyName} />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Category</Text>
                <TouchableOpacity
                  style={styles.dropdownInput}
                  activeOpacity={0.7}
                  onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  disabled={bniCategoriesLoading}
                >
                  <Text style={[styles.dropdownText, !category && { color: COLORS.textLight }]}>
                    {bniCategoriesLoading ? 'Loading...' : getCategoryName(category) || 'Select Category'}
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
                  </View>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Industry</Text>
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
                      style={styles.addInlineButton}
                      onPress={handleAddIndustry}
                      disabled={bniIndustryAdding}
                    >
                      {bniIndustryAdding ? (
                        <ActivityIndicator size="small" color={COLORS.white} />
                      ) : (
                        <Text style={styles.addInlineButtonText}>Add</Text>
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
                      activeOpacity={0.7}
                      onPress={() => setShowIndustryDropdown(!showIndustryDropdown)}
                      disabled={bniIndustriesLoading}
                    >
                      <Text style={[styles.dropdownText, !industry && { color: COLORS.textLight }]}>
                        {bniIndustriesLoading ? 'Loading...' : getIndustryName(industry) || 'Select Industry'}
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
                            key={getIndustryId(i)}
                            style={styles.dropdownItem}
                            onPress={() => {
                              setIndustry(i);
                              setShowIndustryDropdown(false);
                            }}
                          >
                            <Text style={styles.dropdownItemText}>{getIndustryName(i)}</Text>
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
                <Text style={styles.inputLabel}>Company Address</Text>
                <TextInput style={styles.input} value={companyAddress} onChangeText={setCompanyAddress} />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>City</Text>
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
                      style={styles.addInlineButton}
                      onPress={handleAddCity}
                      disabled={bniCityAdding}
                    >
                      {bniCityAdding ? (
                        <ActivityIndicator size="small" color={COLORS.white} />
                      ) : (
                        <Text style={styles.addInlineButtonText}>Add</Text>
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
                      activeOpacity={0.7}
                      onPress={() => setShowCityDropdown(!showCityDropdown)}
                      disabled={bniCitiesLoading}
                    >
                      <Text style={[styles.dropdownText, !city && { color: COLORS.textLight }]}>
                        {bniCitiesLoading ? 'Loading...' : getCityName(city) || 'Select City'}
                      </Text>
                      {bniCitiesLoading ? (
                        <ActivityIndicator size="small" color={COLORS.textGray} />
                      ) : (
                        <Feather name="chevron-down" size={18} color={COLORS.textGray} />
                      )}
                    </TouchableOpacity>
                    {showCityDropdown && (
                      <View style={styles.dropdownMenu}>
                        <ScrollView
                          style={styles.dropdownScroll}
                          nestedScrollEnabled
                          showsVerticalScrollIndicator={true}
                          keyboardShouldPersistTaps="handled"
                        >
                          {bniCities.map((c) => (
                            <TouchableOpacity
                              key={getCityId(c)}
                              style={styles.dropdownItem}
                              onPress={() => {
                                setCity(c);
                                setShowCityDropdown(false);
                              }}
                            >
                              <Text style={styles.dropdownItemText}>{getCityName(c)}</Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
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
                style={[styles.submitButton, addGivenConnectionLoading && { opacity: 0.7 }]}
                onPress={handleAddConnection}
                disabled={addGivenConnectionLoading}
              >
                {addGivenConnectionLoading ? (
                  <ActivityIndicator color={COLORS.white} />
                ) : (
                  <Text style={styles.submitText}>Add Business</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  resetForm();
                  setShowAddForm(false);
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <View style={{ height: 40 }} />
            </ScrollView>
            </KeyboardAvoidingView>
          ) : givenConnections.length > 0 ? (
            <View style={{ flex: 1 }}>
              <FlatList
                data={givenConnections}
                keyExtractor={(item, index) => String(item.id ?? item.connectionId ?? index)}
                contentContainerStyle={[styles.listContent, styles.givenListContent]}
                showsVerticalScrollIndicator={false}
                renderItem={renderGivenBusinessCard}
              />
              <TouchableOpacity
                style={styles.fabAddButton}
                onPress={() => setShowAddForm(true)}
                activeOpacity={0.8}
              >
                <Feather name="plus" size={24} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyGivenContainer}>
              <Feather name="users" size={32} color={COLORS.border} />
              <Text style={styles.emptyText}>You haven't added a connection yet</Text>
              <TouchableOpacity style={styles.addButton} onPress={() => setShowAddForm(true)} activeOpacity={0.8}>
                <Feather name="plus" size={16} color={COLORS.white} style={{ marginRight: 6 }} />
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          )
          */}

          <View style={styles.emptyGivenContainer}>
            <Text style={styles.emptyText}>Coming soon</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default BniConnectionsScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.white 
  },
  
  // Toggle Tabs
  subTabRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 16,
    gap: 12,
  },
  subTabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  subTabButtonActive: { 
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  subTabButtonInactive: { 
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
  },
  subTabText: { 
    fontSize: 14, 
    fontWeight: '600',
  },
  subTabTextActive: { 
    color: COLORS.primary,
  },
  subTabTextInactive: { 
    color: COLORS.textDark,
  },

  // ----------------- ASK TAB STYLES ----------------- //

  // Logo Area
  logoContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  logoImage: {
    width: 150,
    height: 65,
  },
  headerSubtitle: { 
    fontSize: 9, 
    color: COLORS.textGray, 
    letterSpacing: 2, 
    marginTop: 4,
    fontWeight: '500',
  },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    color: COLORS.textDark,
    padding: 0,
  },

  // Results Count
  resultsCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginHorizontal: 20,
    marginBottom: 12,
  },

  // List
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40
  },
  givenListContent: {
    paddingTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textGray,
    fontSize: 13,
    marginTop: 40,
  },

  // Card
  card: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  categoryText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    color: COLORS.textDark,
    fontWeight: '500',
  },
  descText: {
    fontSize: 12,
    color: COLORS.textGray,
    lineHeight: 18,
    marginBottom: 12,
  },
  dashedLine: {
    height: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    marginBottom: 12,
  },
  
  // Footer Info
  footerInfo: {
    paddingLeft: 4,
  },
  addedByRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  addedByLabel: {
    fontSize: 12,
    color: COLORS.textGray,
  },
  addedByName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  bniBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  bniBadgeText: {
    color: COLORS.white,
    fontSize: 8,
    fontWeight: 'bold',
  },
  phoneText: {
    fontSize: 12,
    color: COLORS.textDark,
    marginLeft: 62,
  },

  // ----------------- GIVEN TAB STYLES (Form) ----------------- //

  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 14,
    fontSize: 14,
    color: COLORS.textDark,
    backgroundColor: COLORS.white,
  },
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 14,
    backgroundColor: COLORS.white,
  },
  dropdownText: {
    fontSize: 14,
    color: COLORS.textDark,
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    marginTop: 4,
    maxHeight: 220,
  },
  dropdownScroll: {
    maxHeight: 138,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dropdownItemText: {
    fontSize: 14,
    color: COLORS.textDark,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  submitText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  cancelText: {
    color: COLORS.textGray,
    fontSize: 14,
    fontWeight: '600',
  },
  emptyGivenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 16,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  fabAddButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addInlineButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginLeft: 8,
  },
  addInlineButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  cancelIconButton: {
    marginLeft: 8,
    padding: 6,
  },
});