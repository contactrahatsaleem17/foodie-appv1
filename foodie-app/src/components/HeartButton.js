import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRecipes } from '../context/RecipeContext';
import { COLORS } from '../theme';

export default function HeartButton({ recipeId, size = 24, style }) {
  const { isFavorite, toggleFavorite } = useRecipes();
  const fav = isFavorite(recipeId);
  return (
    <TouchableOpacity
      onPress={() => toggleFavorite(recipeId)}
      style={style}
      accessibilityRole="button"
      accessibilityLabel={fav ? 'Remove from favorites' : 'Add to favorites'}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Ionicons name={fav ? 'heart' : 'heart-outline'} size={size} color={fav ? COLORS.heart : COLORS.muted} />
    </TouchableOpacity>
  );
}
