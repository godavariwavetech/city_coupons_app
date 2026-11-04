import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { saveFcmToken, removeFcmToken } from '../redux/reducers/auth';
import {
  requestNotificationPermission,
  getFCMToken,
  listenForegroundNotifications,
  listenTokenRefresh,
} from '../services/NotificationsService';

/**
 * Registers this device's FCM token for the logged-in account.
 * - Sends the token every time the screen using it comes into focus
 * - Resends it when Firebase rotates the token
 * - Shows notifications that arrive while the app is open
 * role: 'user' | 'vendor', id: userId / vendorId
 */
const useFcmTokenSync = (role, id) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused || !id) return;
    (async () => {
      await requestNotificationPermission();
      const fcmToken = await getFCMToken();
      if (fcmToken) {
        dispatch(saveFcmToken({ role, id, fcmToken }));
      }
    })();
  }, [dispatch, isFocused, role, id]);

  useEffect(() => {
    if (!id) return;
    const unsubscribeMessages = listenForegroundNotifications();
    const unsubscribeRefresh = listenTokenRefresh((fcmToken) =>
      dispatch(saveFcmToken({ role, id, fcmToken }))
    );
    return () => {
      unsubscribeMessages();
      unsubscribeRefresh();
    };
  }, [dispatch, role, id]);
};

// Call before clearing auth on logout; never blocks logout if it fails
export const unregisterFcmToken = async (dispatch) => {
  try {
    const fcmToken = await getFCMToken();
    if (fcmToken) {
      await dispatch(removeFcmToken(fcmToken));
    }
  } catch (error) {
    console.log('Unregister FCM token error:', error);
  }
};

export default useFcmTokenSync;
