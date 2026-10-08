import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../theme';

/**
 * Dropdown for State / District / City.
 * - items: [{ id, name }]
 * - onAddNew(name): optional; when given, an "Add new" row is shown at the end of the list.
 *   It must return a promise resolving to the created item ({ id, name }) or null on failure.
 */
const LocationSelect = ({
  label,
  placeholder,
  items = [],
  value,
  onSelect,
  loading = false,
  disabled = false,
  adding = false,
  onAddNew,
  error,
}) => {
  const [open, setOpen] = useState(false);
  const [adder, setAdder] = useState(false);
  const [newName, setNewName] = useState('');

  const handleAdd = async () => {
    const name = newName.trim();
    if (!name) return;
    const created = await onAddNew(name);
    if (created) {
      onSelect(created);
      setNewName('');
      setAdder(false);
      setOpen(false);
    }
  };

  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[styles.input, disabled && styles.disabled]}
        onPress={() => setOpen(!open)}
        disabled={disabled || loading}
      >
        <Text style={[styles.text, !value && styles.placeholder]}>
          {loading ? 'Loading...' : value?.name || placeholder}
        </Text>
        {loading ? (
          <ActivityIndicator size="small" color={COLORS.textGray} />
        ) : (
          <Feather name="chevron-down" size={18} color={COLORS.textGray} />
        )}
      </TouchableOpacity>

      {open && (
        <View style={styles.menu}>
          <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="handled" style={styles.list}>
            {items.map((it) => (
              <TouchableOpacity
                key={it.id}
                style={styles.item}
                onPress={() => {
                  onSelect(it);
                  setOpen(false);
                  setAdder(false);
                }}
              >
                <Text style={styles.itemText}>{it.name}</Text>
              </TouchableOpacity>
            ))}
            {items.length === 0 && <Text style={styles.empty}>No options available</Text>}
            {onAddNew && (
              <TouchableOpacity style={styles.item} onPress={() => setAdder(!adder)}>
                <Text style={[styles.itemText, styles.addText]}>+ Add new {label.toLowerCase()}</Text>
              </TouchableOpacity>
            )}
          </ScrollView>

          {onAddNew && adder && (
            <View style={styles.adderRow}>
              <TextInput
                style={styles.adderInput}
                value={newName}
                onChangeText={setNewName}
                placeholder={`Enter ${label.toLowerCase()} name`}
                placeholderTextColor={COLORS.textLight}
              />
              <TouchableOpacity style={styles.adderButton} onPress={handleAdd} disabled={adding}>
                {adding ? (
                  <ActivityIndicator size="small" color={COLORS.white} />
                ) : (
                  <Text style={styles.adderButtonText}>Add</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default LocationSelect;

const styles = StyleSheet.create({
  group: { marginBottom: 16 },
  label: { fontFamily: FONTS.semibold, fontSize: 13, color: COLORS.textDark, marginBottom: 8 },
  input: {
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
  disabled: { opacity: 0.5 },
  text: { fontFamily: FONTS.medium, fontSize: 15, color: COLORS.textDark },
  placeholder: { color: COLORS.textLight },
  menu: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    marginTop: 4,
  },
  list: { maxHeight: 180 },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  itemText: { fontFamily: FONTS.medium, fontSize: 14, color: COLORS.textDark },
  addText: { color: COLORS.primary },
  empty: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.textGray, padding: 14 },
  adderRow: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  adderInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.textDark,
    backgroundColor: COLORS.inputBg,
  },
  adderButton: {
    marginLeft: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 58,
    alignItems: 'center',
  },
  adderButtonText: { fontFamily: FONTS.bold, fontSize: 13, color: COLORS.white },
  error: { fontFamily: FONTS.regular, fontSize: 12, color: COLORS.primary, marginTop: 4 },
});
