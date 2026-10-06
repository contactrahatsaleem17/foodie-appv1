import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import HeartButton from '../components/HeartButton';
import RecipeImage from '../components/RecipeImage';
import EmptyState from '../components/EmptyState';
import { useRecipes } from '../context/RecipeContext';
import { getCategory } from '../data/recipes';
import { confirmAction } from '../utils/helpers';
import { COLORS, shadow } from '../theme';

export default function RecipeDetailScreen({ params, navigate, goBack }) {
  const { getRecipeById, deleteRecipe } = useRecipes();
  const recipe = getRecipeById(params.recipeId);

  if (!recipe) {
    return (
      <View style={styles.screen}>
        <Header title="Recipe" onBack={goBack} />
        <EmptyState emoji="🗑️" title="This recipe was deleted." message="Go back to see your other recipes." />
      </View>
    );
  }

  const category = recipe.categoryId ? getCategory(recipe.categoryId) : null;
  const stats = [
    { icon: 'time-outline', label: 'Prep time', value: recipe.prepTime || 'Not set' },
    { icon: 'people-outline', label: 'Servings', value: recipe.servings ? String(recipe.servings) : 'Not set' },
    { icon: 'flame-outline', label: 'Calories per serving', value: recipe.calories ? `${recipe.calories} kcal` : 'Not set' },
    { icon: 'speedometer-outline', label: 'Difficulty', value: recipe.difficulty || 'Not set' },
  ];

  const handleDelete = () =>
    confirmAction('Delete recipe?', `"${recipe.name}" will be removed from My Recipes.`, 'Delete', () => {
      deleteRecipe(recipe.id);
      goBack();
    });

  return (
    <View style={styles.screen}>
      <Header title="Recipe" onBack={goBack} right={<HeartButton recipeId={recipe.id} size={26} />} />
      <ScrollView contentContainerStyle={styles.content}>
        <RecipeImage recipe={recipe} style={styles.hero} emojiSize={88} />

        <Text style={styles.category}>{category ? category.name : 'My Food'}</Text>
        <Text style={styles.name}>{recipe.name}</Text>

        <View style={styles.statsGrid}>
          {stats.map((s) => (
            <View key={s.label} style={styles.stat}>
              <Ionicons name={s.icon} size={20} color={COLORS.primary} />
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {recipe.isUserRecipe ? (
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.editBtn]}
              onPress={() => navigate('RecipeForm', { recipeId: recipe.id })}
            >
              <Ionicons name="create-outline" size={18} color={COLORS.primary} />
              <Text style={[styles.actionText, { color: COLORS.primary }]}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={handleDelete}>
              <Ionicons name="trash-outline" size={18} color={COLORS.danger} />
              <Text style={[styles.actionText, { color: COLORS.danger }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <Text style={styles.section}>Ingredients</Text>
        <View style={styles.box}>
          {recipe.ingredients.map((item, i) => (
            <View key={i} style={styles.ingredientRow}>
              <View style={styles.dot} />
              <Text style={styles.bodyText}>{item}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.section}>Instructions</Text>
        <View style={styles.box}>
          {recipe.instructions.map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={styles.stepNum}>
                <Text style={styles.stepNumText}>{i + 1}</Text>
              </View>
              <Text style={styles.bodyText}>{step}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 16, paddingBottom: 40 },
  hero: { width: '100%', height: 220, borderRadius: 22 },
  category: { marginTop: 16, fontSize: 13, fontWeight: '700', color: COLORS.primary },
  name: { fontSize: 26, fontWeight: '800', color: COLORS.text, marginTop: 2, letterSpacing: -0.4 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 16, marginHorizontal: -5 },
  stat: {
    width: '50%',
    padding: 5,
  },
  statValue: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginTop: 4 },
  statLabel: { fontSize: 12, color: COLORS.muted },
  actions: { flexDirection: 'row', marginTop: 16 },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  editBtn: { borderColor: COLORS.primary, marginRight: 6 },
  deleteBtn: { borderColor: COLORS.danger, marginLeft: 6 },
  actionText: { marginLeft: 6, fontWeight: '700', fontSize: 15 },
  section: { fontSize: 19, fontWeight: '800', color: COLORS.text, marginTop: 24, marginBottom: 10 },
  box: { backgroundColor: COLORS.card, borderRadius: 18, padding: 16, ...shadow },
  ingredientRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 6 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: COLORS.accent, marginTop: 7, marginRight: 12 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 8 },
  stepNum: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  bodyText: { flex: 1, fontSize: 15, lineHeight: 22, color: COLORS.text },
});
