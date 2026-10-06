import { Alert, Platform } from 'react-native';

export const makeId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

// Alert.alert does nothing on web, so fall back to window.confirm there.
export function confirmAction(title, message, confirmText, onConfirm) {
  if (Platform.OS === 'web') {
    // eslint-disable-next-line no-alert
    if (typeof window !== 'undefined' && window.confirm(`${title}\n\n${message}`)) onConfirm();
    return;
  }
  Alert.alert(title, message, [
    { text: 'Cancel', style: 'cancel' },
    { text: confirmText, style: 'destructive', onPress: onConfirm },
  ]);
}
