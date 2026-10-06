import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RecipeImage from './RecipeImage';
import HeartButton from './HeartButton';
import { getCategory } from '../data/recipes';
import { COLORS, shadow } from '../theme';

export default function RecipeCard({ recipe, onPress, footer }) {
  const category = recipe.categoryId ? getCategory(recipe.categoryId) : null;
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.card}>
      <View style={styles.top}>
        <RecipeImage recipe={recipe} style={styles.image} emojiSize={34} />
        <View style={styles.body}>
          <Text style={styles.category}>{category ? category.name : 'My Food'}</Text>
          <Text style={styles.name} numberOfLines={2}>
            {recipe.name}
          </Text>
          <View style={styles.metaRow}>
            {recipe.prepTime ? (
              <View style={styles.meta}>
                <Ionicons name="time-outline" size={14} color={COLORS.muted} />
                <Text style={styles.metaText}>{recipe.prepTime}</Text>
              </View>
            ) : null}
            {recipe.difficulty ? (
              <View style={styles.meta}>
                <Ionicons name="speedometer-outline" size={14} color={COLORS.muted} />
                <Text style={styles.metaText}>{recipe.difficulty}</Text>
              </View>
            ) : null}
          </View>
        </View>
        <HeartButton recipeId={recipe.id} style={styles.heart} />
      </View>
      {footer}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 12,
    marginBottom: 12,
    ...shadow,
  },
  top: { flexDirection: 'row', alignItems: 'center' },
  image: { width: 76, height: 76, borderRadius: 14 },
  body: { flex: 1, marginLeft: 12 },
  category: { fontSize: 12, color: COLORS.primary, fontWeight: '600', marginBottom: 2 },
  name: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  metaRow: { flexDirection: 'row', marginTop: 6 },
  meta: { flexDirection: 'row', alignItems: 'center', marginRight: 12 },
  metaText: { marginLeft: 4, fontSize: 13, color: COLORS.muted },
  heart: { padding: 6, alignSelf: 'flex-start' },
});
