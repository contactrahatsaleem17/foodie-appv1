import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import EmptyState from '../components/EmptyState';
import { useRecipes } from '../context/RecipeContext';
import { COLORS } from '../theme';

export default function FavoritesScreen({ navigate, goBack }) {
  const { favoriteRecipes } = useRecipes();

  return (
    <View style={styles.screen}>
      <Header title="Favorites" onBack={goBack} />
      <FlatList
        data={favoriteRecipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          <EmptyState
            emoji="🤍"
            title="No favorites yet"
            message="Tap the heart on any recipe to save it here."
          />
        }
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
});
