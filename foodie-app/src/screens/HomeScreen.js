import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Header from '../components/Header';
import CategoryBar from '../components/CategoryBar';
import RecipeCard from '../components/RecipeCard';
import { RECIPES } from '../data/recipes';
import { COLORS } from '../theme';

export default function HomeScreen({ navigate }) {
  const handleSelect = (item) => {
    if (item.id === 'myfood') navigate('MyFood');
    else if (item.id === 'favorites') navigate('Favorites');
    else navigate('Category', { categoryId: item.id });
  };

  return (
    <View style={styles.screen}>
      <Header title="Foodie" />
      <FlatList
        data={RECIPES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <View style={styles.intro}>
              <Text style={styles.hello}>What are we cooking today?</Text>
              <Text style={styles.sub}>Pick a category or browse every recipe below.</Text>
            </View>
            <Text style={styles.section}>Categories</Text>
            <CategoryBar onSelect={handleSelect} />
            <Text style={styles.section}>All recipes</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.pad}>
            <RecipeCard recipe={item} onPress={() => navigate('RecipeDetail', { recipeId: item.id })} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },
  content: { paddingBottom: 32 },
  intro: { paddingHorizontal: 16, paddingTop: 18 },
  hello: { fontSize: 26, fontWeight: '800', color: COLORS.text, letterSpacing: -0.5 },
  sub: { marginTop: 4, fontSize: 15, color: COLORS.muted },
  section: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginTop: 22, marginBottom: 10, paddingHorizontal: 16 },
  pad: { paddingHorizontal: 16 },
});
