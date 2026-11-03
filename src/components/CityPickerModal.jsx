import React, { useMemo, useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BRAND = '#002161';

/**
 * Full-screen INOX-style city picker.
 * - cities: [{ id, name }] from bni/cities
 * - selectedCity: { id, name } | null
 * - onSelect(city): called with the tapped city
 * - dismissable: when false the close button is hidden (first-time selection)
 */
const CityPickerModal = ({
  visible,
  cities = [],
  loading = false,
  selectedCity,
  onSelect,
  onClose,
  dismissable = true,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!visible) setQuery('');
  }, [visible]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const sorted = [...cities].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    return q ? sorted.filter((c) => (c.name || '').toLowerCase().includes(q)) : sorted;
  }, [cities, query]);

  const renderCity = ({ item }) => {
    const active = selectedCity?.id === item.id;
    return (
      <TouchableOpacity
        style={styles.tile}
        activeOpacity={0.7}
        onPress={() => onSelect(item)}
      >
        <View style={[styles.iconCircle, active && styles.iconCircleActive]}>
          <MaterialCommunityIcons
            name="city-variant-outline"
            size={30}
            color={active ? '#FFFFFF' : BRAND}
          />
          {active && (
            <View style={styles.checkBadge}>
              <Feather name="check" size={10} color="#FFFFFF" />
            </View>
          )}
        </View>
        <Text style={[styles.tileText, active && styles.tileTextActive]} numberOfLines={1}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={() => dismissable && onClose()}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Select your city</Text>
          {dismissable && (
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Feather name="x" size={24} color="#000000" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.searchBox}>
          <Feather name="search" size={18} color="#888888" />
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Search for your city"
            placeholderTextColor="#999999"
            autoCorrect={false}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Feather name="x-circle" size={18} color="#888888" />
            </TouchableOpacity>
          )}
        </View>

        {selectedCity && !query && (
          <View style={styles.currentRow}>
            <Feather name="map-pin" size={16} color={BRAND} />
            <Text style={styles.currentText}>
              Current city: <Text style={styles.currentCity}>{selectedCity.name}</Text>
            </Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>{query ? 'RESULTS' : 'AVAILABLE CITIES'}</Text>

        {loading && cities.length === 0 ? (
          <ActivityIndicator size="large" color={BRAND} style={styles.loader} />
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderCity}
            numColumns={3}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.grid}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                {query ? `No cities match "${query}"` : 'No cities available'}
              </Text>
            }
          />
        )}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
  },
  title: { fontSize: 20, color: '#000000', fontFamily: 'SF-Pro-Display-Bold' },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#F2F4F7',
    height: 46,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#000000',
    fontFamily: 'SF-Pro-Display-Regular',
    paddingVertical: 0,
  },
  currentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 16,
  },
  currentText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#555555',
    fontFamily: 'SF-Pro-Display-Regular',
  },
  currentCity: { color: BRAND, fontFamily: 'SF-Pro-Display-Bold' },
  sectionTitle: {
    marginHorizontal: 20,
    marginTop: 22,
    marginBottom: 8,
    fontSize: 13,
    letterSpacing: 0.8,
    color: '#888888',
    fontFamily: 'SF-Pro-Display-Semibold',
  },
  grid: { paddingHorizontal: 12, paddingBottom: 30 },
  row: { justifyContent: 'flex-start' },
  tile: { width: '33.33%', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 4 },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#D6DEE8',
    backgroundColor: '#F5F8FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircleActive: { backgroundColor: BRAND, borderColor: BRAND },
  checkBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#22A06B',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileText: {
    marginTop: 8,
    fontSize: 13,
    color: '#333333',
    fontFamily: 'SF-Pro-Display-Regular',
  },
  tileTextActive: { color: BRAND, fontFamily: 'SF-Pro-Display-Bold' },
  loader: { marginTop: 40 },
  emptyText: {
    textAlign: 'center',
    color: '#888888',
    marginTop: 40,
    fontFamily: 'SF-Pro-Display-Regular',
  },
});

export default CityPickerModal;
