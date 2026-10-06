import React, { useState, useEffect, useCallback } from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { RecipeProvider } from './src/context/RecipeContext';
import { COLORS } from './src/theme';
import HomeScreen from './src/screens/HomeScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import MyFoodScreen from './src/screens/MyFoodScreen';
import RecipeFormScreen from './src/screens/RecipeFormScreen';

const SCREENS = {
  Home: HomeScreen,
  Category: CategoryScreen,
  RecipeDetail: RecipeDetailScreen,
  Favorites: FavoritesScreen,
  MyFood: MyFoodScreen,
  RecipeForm: RecipeFormScreen,
};

export default function App() {
  // Simple screen stack: the last item is the screen on display.
  const [stack, setStack] = useState([{ name: 'Home', params: {}, key: 'home' }]);

  const navigate = useCallback((name, params = {}) => {
    setStack((s) => [...s, { name, params, key: `${name}-${Date.now()}` }]);
  }, []);

  const goBack = useCallback(() => {
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  }, []);

  // Android hardware back button goes to the previous screen.
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (stack.length > 1) {
        goBack();
        return true;
      }
      return false;
    });
    return () => sub && sub.remove && sub.remove();
  }, [stack.length, goBack]);

  const current = stack[stack.length - 1];
  const Screen = SCREENS[current.name];

  return (
    <SafeAreaProvider>
      <RecipeProvider>
        <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
          <StatusBar style="dark" />
          <Screen
            key={current.key}
            params={current.params}
            navigate={navigate}
            goBack={goBack}
          />
        </SafeAreaView>
      </RecipeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
});
