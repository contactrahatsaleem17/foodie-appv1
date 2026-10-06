import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme';

export default function EmptyState({ emoji, title, message }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingVertical: 48, paddingHorizontal: 32 },
  emoji: { fontSize: 48, marginBottom: 12 },
  title: { fontSize: 17, fontWeight: '700', color: COLORS.text, textAlign: 'center' },
  message: { marginTop: 6, fontSize: 14, color: COLORS.muted, textAlign: 'center', lineHeight: 20 },
});
