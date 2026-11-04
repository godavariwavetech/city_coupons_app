import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Linking,
  AppState,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../screens/BniAsk/theme';
import {
  checkAppVersion,
  getFallbackStoreUrl,
  onForceUpdateRequired,
} from '../services/appVersion';

/**
 * Checks the backend version rules on launch and whenever the app returns to the foreground.
 * - forceUpdate: full-screen blocker, cannot be dismissed (Android back is swallowed by the Modal)
 * - softUpdate: dismissible prompt, shown once per app session per version
 */
const ForceUpdateGate = () => {
  const [update, setUpdate] = useState(null); // { force, latestVersion, storeUrl, message }
  const dismissedVersion = useRef(null);
  const appState = useRef(AppState.currentState);

  const runCheck = useCallback(async () => {
    const result = await checkAppVersion();
    if (result.forceUpdate) {
      setUpdate({ ...result, force: true });
    } else if (result.softUpdate && dismissedVersion.current !== result.latestVersion) {
      setUpdate({ ...result, force: false });
    } else {
      setUpdate(null);
    }
  }, []);

  useEffect(() => {
    runCheck();

    const subscription = AppState.addEventListener('change', (next) => {
      if (appState.current.match(/inactive|background/) && next === 'active') {
        runCheck();
      }
      appState.current = next;
    });

    // Server rejected a request with HTTP 426 (see utils/api.js)
    const unsubscribe = onForceUpdateRequired((info) => setUpdate({ ...info, force: true }));

    return () => {
      subscription.remove();
      unsubscribe();
    };
  }, [runCheck]);

  const openStore = async () => {
    const url = update?.storeUrl || getFallbackStoreUrl();
    try {
      if (!url) throw new Error('No store link');
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Update', 'Please update the app from the Play Store / App Store.');
    }
  };

  const later = () => {
    dismissedVersion.current = update?.latestVersion ?? null;
    setUpdate(null);
  };

  if (!update) return null;

  return (
    <Modal
      visible
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={update.force ? () => {} : later}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Feather name="download" size={28} color={COLORS.primary} />
          </View>
          <Text style={styles.title}>{update.force ? 'Update Required' : 'Update Available'}</Text>
          <Text style={styles.message}>
            {update.message ||
              (update.force
                ? 'This version is no longer supported. Please update the app to continue.'
                : 'A new version of the app is available with improvements and fixes.')}
          </Text>
          {!!update.latestVersion && (
            <Text style={styles.version}>Latest version: {update.latestVersion}</Text>
          )}

          <TouchableOpacity style={styles.primaryButton} onPress={openStore} activeOpacity={0.85}>
            <Text style={styles.primaryText}>Update Now</Text>
          </TouchableOpacity>

          {!update.force && (
            <TouchableOpacity style={styles.secondaryButton} onPress={later}>
              <Text style={styles.secondaryText}>Later</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ForceUpdateGate;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 20,
    alignItems: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.warningBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: { fontFamily: FONTS.bold, fontSize: 20, color: COLORS.textDark, marginBottom: 8 },
  message: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textGray,
    textAlign: 'center',
  },
  version: { fontFamily: FONTS.medium, fontSize: 12, color: COLORS.textLight, marginTop: 10 },
  primaryButton: {
    alignSelf: 'stretch',
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  primaryText: { fontFamily: FONTS.bold, fontSize: 16, color: COLORS.white },
  secondaryButton: { paddingVertical: 12, marginTop: 6 },
  secondaryText: { fontFamily: FONTS.semibold, fontSize: 14, color: COLORS.textGray },
});
