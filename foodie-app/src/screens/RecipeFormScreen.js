import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Header from '../components/Header';
import { useRecipes } from '../context/RecipeContext';
import { makeId } from '../utils/helpers';
import { COLORS } from '../theme';

const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

const toRows = (list) => (list && list.length ? list : ['']).map((text) => ({ id: makeId(), text }));

// Editable list used for both ingredients and step-by-step instructions.
function ListEditor({ label, rows, setRows, placeholder, numbered, addLabel }) {
  const update = (id, text) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, text } : r)));
  const remove = (id) =>
    setRows((rs) => (rs.length > 1 ? rs.filter((r) => r.id !== id) : [{ id: makeId(), text: '' }]));
  const add = () => setRows((rs) => [...rs, { id: makeId(), text: '' }]);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      {rows.map((row, i) => (
        <View key={row.id} style={styles.listRow}>
          <View style={[styles.badge, numbered ? styles.badgeNum : styles.badgeDot]}>
            {numbered ? <Text style={styles.badgeText}>{i + 1}</Text> : null}
          </View>
          <TextInput
            style={[styles.input, styles.listInput, numbered && styles.multiline]}
            value={row.text}
            onChangeText={(t) => update(row.id, t)}
            placeholder={numbered ? `Describe step ${i + 1}` : placeholder}
            placeholderTextColor={COLORS.muted}
            multiline={numbered}
          />
          <TouchableOpacity
            onPress={() => remove(row.id)}
            accessibilityLabel={`Remove ${numbered ? 'step' : 'ingredient'} ${i + 1}`}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="close-circle" size={24} color={COLORS.muted} />
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.addRow} onPress={add}>
        <Ionicons name="add" size={20} color={COLORS.primary} />
        <Text style={styles.addRowText}>{addLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function RecipeFormScreen({ params = {}, goBack }) {
  const { getRecipeById, addRecipe, updateRecipe } = useRecipes();
  const existing = params.recipeId ? getRecipeById(params.recipeId) : null;
  const isEdit = !!existing;

  const [name, setName] = useState(existing ? existing.name : '');
  const [image, setImage] = useState(existing ? existing.image : null);
  const [ingredients, setIngredients] = useState(toRows(existing && existing.ingredients));
  const [steps, setSteps] = useState(toRows(existing && existing.instructions));
  const [prepTime, setPrepTime] = useState(existing && existing.prepTime ? existing.prepTime : '');
  const [servings, setServings] = useState(existing && existing.servings ? String(existing.servings) : '');
  const [calories, setCalories] = useState(existing && existing.calories ? String(existing.calories) : '');
  const [difficulty, setDifficulty] = useState(existing && existing.difficulty ? existing.difficulty : 'Easy');
  const [error, setError] = useState('');

  const pickImage = async () => {
    setError('');
    try {
      if (Platform.OS !== 'web') {
        const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!perm.granted) {
          setError('Allow photo access in your settings to upload an image.');
          return;
        }
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.6,
      });
      if (!result.canceled && result.assets && result.assets.length) {
        setImage(result.assets[0].uri);
      }
    } catch (e) {
      setError('The photo library could not be opened. Try again.');
    }
  };

  const save = () => {
    const cleanIngredients = ingredients.map((r) => r.text.trim()).filter(Boolean);
    const cleanSteps = steps.map((r) => r.text.trim()).filter(Boolean);

    if (!name.trim()) return setError('Enter a recipe name.');
    if (!cleanIngredients.length) return setError('Add at least one ingredient.');
    if (!cleanSteps.length) return setError('Add at least one instruction step.');

    const pt = prepTime.trim();
    const recipe = {
      id: existing ? existing.id : makeId(),
      name: name.trim(),
      image: image || null,
      ingredients: cleanIngredients,
      instructions: cleanSteps,
      prepTime: pt ? (/^\d+$/.test(pt) ? `${pt} min` : pt) : '',
      servings: parseInt(servings, 10) || null,
      calories: parseInt(calories, 10) || null,
      difficulty,
      emoji: '🍽️',
      color: '#E3F0E9',
      categoryId: null,
      isUserRecipe: true,
      createdAt: existing && existing.createdAt ? existing.createdAt : Date.now(),
    };

    if (isEdit) updateRecipe(recipe);
    else addRecipe(recipe);
    goBack();
  };

  return (
    <View style={styles.screen}>
      <Header title={isEdit ? 'Edit Recipe' : 'Add New Recipe'} onBack={goBack} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.label}>Recipe name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="e.g. Grandma's apple pie"
            placeholderTextColor={COLORS.muted}
          />

          <Text style={styles.label}>Photo</Text>
          {image ? (
            <View>
              <Image source={{ uri: image }} style={styles.preview} />
              <View style={styles.imageActions}>
                <TouchableOpacity style={styles.smallBtn} onPress={pickImage}>
                  <Ionicons name="images-outline" size={16} color={COLORS.primary} />
                  <Text style={styles.smallBtnText}>Change image</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallBtn} onPress={() => setImage(null)}>
                  <Ionicons name="close-outline" size={16} color={COLORS.danger} />
                  <Text style={[styles.smallBtnText, { color: COLORS.danger }]}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity style={styles.upload} onPress={pickImage} accessibilityRole="button">
              <Ionicons name="cloud-upload-outline" size={32} color={COLORS.primary} />
              <Text style={styles.uploadText}>Upload Image</Text>
              <Text style={styles.uploadHint}>Choose a photo from your device</Text>
            </TouchableOpacity>
          )}

          <ListEditor
            label="Ingredients"
            rows={ingredients}
            setRows={setIngredients}
            placeholder="e.g. 2 cups flour"
            addLabel="Add ingredient"
          />

          <ListEditor
            label="Step-by-step instructions"
            rows={steps}
            setRows={setSteps}
            numbered
            addLabel="Add step"
          />

          <Text style={styles.label}>Details (optional)</Text>
          <View style={styles.detailsRow}>
            <View style={styles.detailCol}>
              <Text style={styles.smallLabel}>Prep time</Text>
              <TextInput
                style={styles.input}
                value={prepTime}
                onChangeText={setPrepTime}
                placeholder="30 min"
                placeholderTextColor={COLORS.muted}
              />
            </View>
            <View style={styles.detailCol}>
              <Text style={styles.smallLabel}>Servings</Text>
              <TextInput
                style={styles.input}
                value={servings}
                onChangeText={setServings}
                placeholder="4"
                keyboardType="number-pad"
                placeholderTextColor={COLORS.muted}
              />
            </View>
            <View style={styles.detailCol}>
              <Text style={styles.smallLabel}>Calories per serving</Text>
              <TextInput
                style={styles.input}
                value={calories}
                onChangeText={setCalories}
                placeholder="350"
                keyboardType="number-pad"
                placeholderTextColor={COLORS.muted}
              />
            </View>
          </View>

          <Text style={styles.smallLabel}>Difficulty</Text>
          <View style={styles.chips}>
            {DIFFICULTIES.map((d) => (
              <TouchableOpacity
                key={d}
                onPress={() => setDifficulty(d)}
                style={[styles.chip, difficulty === d && styles.chipActive]}
              >
                <Text style={[styles.chipText, difficulty === d && styles.chipTextActive]}>{d}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {error ? (
            <View style={styles.error}>
              <Ionicons name="alert-circle" size={18} color={COLORS.danger} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <TouchableOpacity style={styles.saveBtn} onPress={save} accessibilityRole="button">
            <Ionicons name="checkmark-circle" size={22} color="#fff" />
            <Text style={styles.saveText}>Save Recipe</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 16, paddingBottom: 48 },
  label: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginTop: 20, marginBottom: 8 },
  smallLabel: { fontSize: 13, fontWeight: '600', color: COLORS.muted, marginBottom: 6, marginTop: 4 },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.text,
  },
  multiline: { minHeight: 48, textAlignVertical: 'top' },
  listRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  listInput: { flex: 1, marginHorizontal: 10 },
  badge: { alignItems: 'center', justifyContent: 'center' },
  badgeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.accent, marginHorizontal: 9 },
  badgeNum: { width: 26, height: 26, borderRadius: 13, backgroundColor: COLORS.primary },
  badgeText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  addRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, alignSelf: 'flex-start' },
  addRowText: { color: COLORS.primary, fontWeight: '700', marginLeft: 4, fontSize: 15 },
  upload: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primarySoft,
    borderRadius: 16,
    paddingVertical: 28,
    alignItems: 'center',
  },
  uploadText: { marginTop: 6, fontSize: 16, fontWeight: '700', color: COLORS.primary },
  uploadHint: { marginTop: 2, fontSize: 13, color: COLORS.muted },
  preview: { width: '100%', height: 200, borderRadius: 16 },
  imageActions: { flexDirection: 'row', marginTop: 8 },
  smallBtn: { flexDirection: 'row', alignItems: 'center', marginRight: 18, paddingVertical: 6 },
  smallBtnText: { marginLeft: 4, color: COLORS.primary, fontWeight: '600' },
  detailsRow: { flexDirection: 'row', marginHorizontal: -4 },
  detailCol: { flex: 1, marginHorizontal: 4 },
  chips: { flexDirection: 'row', marginTop: 2 },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    marginRight: 8,
  },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { fontWeight: '600', color: COLORS.text },
  chipTextActive: { color: '#fff' },
  error: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FBE6E4',
    borderRadius: 12,
    padding: 12,
    marginTop: 20,
  },
  errorText: { marginLeft: 8, color: COLORS.danger, fontWeight: '600', flex: 1 },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 24,
  },
  saveText: { color: '#fff', fontSize: 17, fontWeight: '700', marginLeft: 8 },
});
