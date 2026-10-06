import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import EmptyState from '../components/EmptyState';
import { useRecipes } from '../context/RecipeContext';
import { confirmAction } from '../utils/helpers';
import { COLORS } from '../theme';

export default function MyFoodScreen({ navigate, goBack }) {
  const { myRecipes, deleteRecipe } = useRecipes();

  const handleDelete = (recipe) =>
    confirmAction('Delete recipe?', `"${recipe.name}" will be removed from My Recipes.`, 'Delete', () =>
      deleteRecipe(recipe.id)
    );

  return (
    <View style={styles.screen}>
      <Header title="My Food" onBack={goBack} />
      <FlatList
        data={myRecipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <TouchableOpacity style={styles.addBtn} onPress={() => navigate('RecipeForm')} accessibilityRole="button">
              <Ionicons name="add-circle" size={26} color="#fff" />
              <Text style={styles.addText}>Add New Recipe</Text>
            </TouchableOpacity>
            <Text style={styles.section}>My Recipes ({myRecipes.length})</Text>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            emoji="👩‍🍳"
            title="You haven't added any recipes yet"
            message="Tap Add New Recipe to save your first one."
          />
        }
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => navigate('RecipeDetail', { recipeId: item.id })}
            footer={
              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.editBtn]}
                  onPress={() => navigate('RecipeForm', { recipeId: item.id })}
                >
                  <Ionicons name="create-outline" size={16} color={COLORS.primary} />
                  <Text style={[styles.actionText, { color: COLORS.primary }]}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={() => handleDelete(item)}>
                  <Ionicons name="trash-outline" size={16} color={COLORS.danger} />
                  <Text style={[styles.actionText, { color: COLORS.danger }]}>Delete</Text>
                </TouchableOpacity>
              </View>
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 16, paddingBottom: 32 },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 16,
  },
  addText: { color: '#fff', fontSize: 17, fontWeight: '700', marginLeft: 8 },
  section: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginTop: 24, marginBottom: 12 },
  actions: {
    flexDirection: 'row',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1.5,
  },
  editBtn: { borderColor: COLORS.primary, marginRight: 6 },
  deleteBtn: { borderColor: COLORS.danger, marginLeft: 6 },
  actionText: { marginLeft: 6, fontWeight: '700', fontSize: 14 },
});
