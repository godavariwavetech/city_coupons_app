import { Platform, PermissionsAndroid } from 'react-native';
import notifee, { AndroidImportance, AndroidStyle } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

const CHANNEL_ID = 'default';

const ensureChannel = () =>
  notifee.createChannel({
    id: CHANNEL_ID,
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
    sound: 'default',
    vibration: true,
  });

// Android 13+ needs the runtime POST_NOTIFICATIONS permission; iOS asks through Firebase
export const requestNotificationPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      if (Platform.Version < 33) return true;
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      return result === PermissionsAndroid.RESULTS.GRANTED;
    }
    const status = await messaging().requestPermission();
    return (
      status === messaging.AuthorizationStatus.AUTHORIZED ||
      status === messaging.AuthorizationStatus.PROVISIONAL
    );
  } catch (error) {
    console.error('Notification permission error:', error);
    return false;
  }
};

export const getFCMToken = async () => {
  try {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

export const displayNotification = async (remoteMessage) => {
  const title = remoteMessage?.notification?.title ?? remoteMessage?.data?.title;
  const body = remoteMessage?.notification?.body ?? remoteMessage?.data?.body;
  if (!title && !body) return;

  try {
    await ensureChannel();
    await notifee.displayNotification({
      title,
      body,
      data: remoteMessage?.data,
      android: {
        channelId: CHANNEL_ID,
        importance: AndroidImportance.HIGH,
        color: '#003366',
        style: { type: AndroidStyle.BIGTEXT, text: body || '' },
        pressAction: { id: 'default', launchActivity: 'default' },
      },
      ios: {
        foregroundPresentationOptions: { badge: true, sound: true, banner: true, list: true },
      },
    });
  } catch (error) {
    console.error('Error displaying notification:', error);
  }
};

// Firebase does not show notifications while the app is open, so display them with notifee.
// Returns an unsubscribe function.
export const listenForegroundNotifications = () => {
  try {
    return messaging().onMessage(async (remoteMessage) => {
      console.log('Foreground notification:', remoteMessage);
      displayNotification(remoteMessage);
    });
  } catch (error) {
    console.error('Foreground notification listener error:', error);
    return () => {};
  }
};

// Called with the new token whenever Firebase rotates it. Returns an unsubscribe function.
export const listenTokenRefresh = (onToken) => {
  try {
    return messaging().onTokenRefresh(onToken);
  } catch (error) {
    console.error('Token refresh listener error:', error);
    return () => {};
  }
};

// Must be registered outside React (index.js) to handle messages while the app is in background/quit
export const registerBackgroundHandler = () => {
  try {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      // Messages with a `notification` block are shown by the system; data-only ones need notifee
      if (!remoteMessage?.notification) {
        await displayNotification(remoteMessage);
      }
    });
  } catch (error) {
    console.error('Background notification handler error:', error);
  }
};
