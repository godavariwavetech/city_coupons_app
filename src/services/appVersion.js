import axios from 'axios';
import { Platform } from 'react-native';
import VersionCheck from 'react-native-version-check';
import { baseURL, endpoints } from '../config/config';

// Installed app version (Android versionName / iOS MARKETING_VERSION), null if it can't be read
export const getInstalledVersion = () => {
  try {
    return VersionCheck.getCurrentVersion() || null;
  } catch (error) {
    console.log('[AppVersion] could not read installed version:', error);
    return null;
  }
};

// Play Store page for this app's own applicationId (com.city_coupons)
export const getFallbackStoreUrl = () => {
  if (Platform.OS !== 'android') return null; // iOS store link must come from the backend (needs the App Store id)
  let packageName = 'com.city_coupons';
  try {
    packageName = VersionCheck.getPackageName() || packageName;
  } catch (error) {}
  return `market://details?id=${packageName}`;
};

/**
 * Asks the backend whether this build must / should be updated.
 * Never throws: on any failure the app is allowed to continue.
 * → { forceUpdate, softUpdate, latestVersion, storeUrl, message }
 */
export const checkAppVersion = async () => {
  const version = getInstalledVersion();
  if (!version) return { forceUpdate: false, softUpdate: false };
  try {
    // Plain axios (not the app's api client) so this works before login
    const response = await axios.get(`${baseURL}/${endpoints.APP_VERSION}`, {
      params: { platform: Platform.OS, version },
      timeout: 8000,
    });
    const data = response.data?.data || response.data || {};
    return {
      forceUpdate: !!data.forceUpdate,
      softUpdate: !!data.softUpdate,
      latestVersion: data.latestVersion,
      storeUrl: data.storeUrl,
      message: data.message,
    };
  } catch (error) {
    console.log('[AppVersion] check failed:', error?.response?.status || error.message);
    return { forceUpdate: false, softUpdate: false };
  }
};

// Lets the api client (HTTP 426) open the update screen from anywhere
const listeners = new Set();
export const onForceUpdateRequired = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
export const emitForceUpdateRequired = (info) => {
  listeners.forEach((listener) => listener(info));
};
