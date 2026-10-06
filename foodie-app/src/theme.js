import { Platform } from 'react-native';

export const COLORS = {
  primary: '#1F6B4F', // basil green
  primaryDark: '#164E3A',
  primarySoft: '#E3F0E9',
  accent: '#F2B33D', // saffron
  bg: '#F6F7F2',
  card: '#FFFFFF',
  text: '#1C2420',
  muted: '#6B756F',
  border: '#E2E6DF',
  heart: '#E0453A', // tomato
  danger: '#C73A2F',
};

export const shadow = Platform.select({
  ios: {
    shadowColor: '#1C2420',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  android: { elevation: 3 },
  default: { boxShadow: '0px 4px 14px rgba(28, 36, 32, 0.08)' },
});
