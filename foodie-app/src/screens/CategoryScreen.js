import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import EmptyState from '../components/EmptyState';
import { RECIPES, getCategory } from '../data/recipes';
import { COLORS } from '../theme';

export default function CategoryScreen({ params, navigate, goBack }) {
  const category = getCategory(params.categoryId);
  const recipes = RECIPES.filter((r) => r.categoryId === params.categoryId);

  return (
    <View style={styles.screen}>
      <Header title={category ? `${category.emoji} ${category.name}` : 'Category'} onBack={goBack} />
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <Text style={styles.count}>
            {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}
          </Text>
        }
        ListEmptyComponent={<EmptyState emoji="🍽️" title="No recipes in this category yet." />}
        renderItem={({ item }) => (
          <RecipeCard recipe={item} onPress={() => navigate('RecipeDetail', { recipeId: item.id })} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 16, paddingBottom: 32 },
  count: { fontSize: 14, color: COLORS.muted, marginBottom: 12 },
});
