import React from 'react';
import { View, Text, Image } from 'react-native';
import { COLORS } from '../theme';

// Shows the uploaded photo if there is one, otherwise the recipe emoji on a colored tile.
export default function RecipeImage({ recipe, style, emojiSize = 40 }) {
  if (recipe.image) {
    return <Image source={{ uri: recipe.image }} style={style} resizeMode="cover" />;
  }
  return (
    <View
      style={[
        style,
        { backgroundColor: recipe.color || COLORS.primarySoft, alignItems: 'center', justifyContent: 'center' },
      ]}
    >
      <Text style={{ fontSize: emojiSize }}>{recipe.emoji || '🍽️'}</Text>
    </View>
  );
}
