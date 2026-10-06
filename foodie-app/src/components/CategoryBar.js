import React from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES } from '../data/recipes';
import { COLORS } from '../theme';

const SPECIAL = [
  { id: 'myfood', name: 'My Food', icon: 'restaurant' },
  { id: 'favorites', name: 'Favorites', icon: 'heart' },
];

export default function CategoryBar({ onSelect }) {
  const items = [...SPECIAL, ...CATEGORIES];
  return (
    <FlatList
      horizontal
      data={items}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => onSelect(item)}
          accessibilityRole="button"
          accessibilityLabel={`Open ${item.name}`}
        >
          {item.icon ? (
            <View style={[styles.circle, { backgroundColor: item.id === 'favorites' ? COLORS.heart : COLORS.primary }]}>
              <Ionicons name={item.icon} size={26} color="#fff" />
            </View>
          ) : (
            <View style={[styles.circle, { backgroundColor: item.color }]}>
              <Text style={styles.emoji}>{item.emoji}</Text>
            </View>
          )}
          <Text style={styles.label} numberOfLines={1}>
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 12, paddingVertical: 4 },
  item: { alignItems: 'center', width: 78, marginHorizontal: 4 },
  circle: { width: 62, height: 62, borderRadius: 31, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 28 },
  label: { marginTop: 6, fontSize: 13, fontWeight: '600', color: COLORS.text },
});
