import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const DANGER = '#D32F2F';

// Confirmation popup for permanently deleting the user's / vendor's account.
// The screen owns the actual delete call and passes it in as onConfirm.
const DeleteAccountModal = ({ visible, onCancel, onConfirm, loading = false }) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={loading ? undefined : onCancel} // Android back button
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={loading ? undefined : onCancel} />

        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Feather name="alert-triangle" size={26} color={DANGER} />
          </View>

          <Text style={styles.title}>Delete Account?</Text>
          <Text style={styles.message}>
            This will permanently delete your account and all of its data, including your
            profile and coupons. This action cannot be undone.
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
              disabled={loading}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.deleteButton, loading && { opacity: 0.7 }]}
              onPress={onConfirm}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.deleteText}>Delete</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteAccountModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFEBEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'SF-Pro-Display-Bold',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'SF-Pro-Display-Regular',
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#F2F2F2',
  },
  deleteButton: {
    backgroundColor: DANGER,
  },
  cancelText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'SF-Pro-Display-Medium',
  },
  deleteText: {
    fontSize: 16,
    color: '#FFF',
    fontFamily: 'SF-Pro-Display-Bold',
  },
});
