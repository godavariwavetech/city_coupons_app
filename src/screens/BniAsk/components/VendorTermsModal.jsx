import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../theme';
import {
  VENDOR_TERMS_TITLE,
  VENDOR_TERMS_UPDATED,
  VENDOR_TERMS_INTRO,
  VENDOR_TERMS_SECTIONS,
} from '../data/vendorTermsContent';

// Rendered as a plain in-tree overlay (not RN's <Modal>) because RN's core
// Modal does not open a separate Android window under react-native-screens
// on some devices, which leaves touch/scroll routed to the screen behind it.
const VendorTermsModal = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Terms & Conditions</Text>
          <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Feather name="x" size={22} color={COLORS.textDark} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          overScrollMode="always"
          nestedScrollEnabled
        >
          <Text style={styles.title}>{VENDOR_TERMS_TITLE}</Text>
          <Text style={styles.updated}>{VENDOR_TERMS_UPDATED}</Text>

          {VENDOR_TERMS_INTRO.map((line, idx) => (
            <Text key={`intro-${idx}`} style={styles.paragraph}>
              {line}
            </Text>
          ))}

          {VENDOR_TERMS_SECTIONS.map((section, sIdx) => (
            <View key={`section-${sIdx}`} style={styles.section}>
              <Text style={styles.sectionHeading}>{section.heading}</Text>
              {section.items.map((item, iIdx) =>
                Array.isArray(item) ? (
                  <View key={`sub-${sIdx}-${iIdx}`} style={styles.subList}>
                    {item.map((sub, subIdx) => (
                      <View key={`sub-${sIdx}-${iIdx}-${subIdx}`} style={styles.bulletRow}>
                        <Text style={styles.bulletDot}>{'•'}</Text>
                        <Text style={styles.bulletText}>{sub}</Text>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text key={`item-${sIdx}-${iIdx}`} style={styles.paragraph}>
                    {item}
                  </Text>
                )
              )}
            </View>
          ))}

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default VendorTermsModal;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.white,
    zIndex: 999,
    elevation: 999,
  },
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
  headerTitle: { fontFamily: FONTS.bold, fontSize: 18, color: COLORS.textDark },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 16 },
  title: { fontFamily: FONTS.bold, fontSize: 16, color: COLORS.textDark, marginBottom: 4 },
  updated: { fontFamily: FONTS.regular, fontSize: 12, color: COLORS.textGray, marginBottom: 16 },
  paragraph: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textDark,
    lineHeight: 20,
    marginBottom: 10,
  },
  section: { marginTop: 8, marginBottom: 8 },
  sectionHeading: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 8,
  },
  subList: { marginBottom: 10, paddingLeft: 8 },
  bulletRow: { flexDirection: 'row', marginBottom: 6, paddingRight: 8 },
  bulletDot: { fontSize: 13, color: COLORS.textDark, marginRight: 6 },
  bulletText: { flex: 1, fontFamily: FONTS.regular, fontSize: 13, color: COLORS.textDark, lineHeight: 20 },
});
