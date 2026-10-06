import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RECIPES } from '../data/recipes';

const FAVORITES_KEY = '@foodie/favorites';
const MY_RECIPES_KEY = '@foodie/myRecipes';

const RecipeContext = createContext(null);

export function RecipeProvider({ children }) {
  const [favorites, setFavorites] = useState([]); // array of recipe ids
  const [myRecipes, setMyRecipes] = useState([]); // user-created recipes
  const [loaded, setLoaded] = useState(false);

  // Load saved data once.
  useEffect(() => {
    (async () => {
      try {
        const [fav, mine] = await Promise.all([
          AsyncStorage.getItem(FAVORITES_KEY),
          AsyncStorage.getItem(MY_RECIPES_KEY),
        ]);
        if (fav) setFavorites(JSON.parse(fav));
        if (mine) setMyRecipes(JSON.parse(mine));
      } catch (e) {
        // Start empty if storage is unavailable.
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  // Save whenever data changes (after the first load).
  useEffect(() => {
    if (loaded) AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)).catch(() => {});
  }, [favorites, loaded]);

  useEffect(() => {
    if (loaded) AsyncStorage.setItem(MY_RECIPES_KEY, JSON.stringify(myRecipes)).catch(() => {});
  }, [myRecipes, loaded]);

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites]);

  const toggleFavorite = useCallback((id) => {
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  }, []);

  const getRecipeById = useCallback(
    (id) => RECIPES.find((r) => r.id === id) || myRecipes.find((r) => r.id === id) || null,
    [myRecipes]
  );

  const addRecipe = useCallback((recipe) => {
    setMyRecipes((list) => [recipe, ...list]);
  }, []);

  const updateRecipe = useCallback((recipe) => {
    setMyRecipes((list) => list.map((r) => (r.id === recipe.id ? recipe : r)));
  }, []);

  const deleteRecipe = useCallback((id) => {
    setMyRecipes((list) => list.filter((r) => r.id !== id));
    setFavorites((f) => f.filter((x) => x !== id));
  }, []);

  const favoriteRecipes = favorites.map((id) => getRecipeById(id)).filter(Boolean);

  return (
    <RecipeContext.Provider
      value={{
        favorites,
        favoriteRecipes,
        myRecipes,
        loaded,
        isFavorite,
        toggleFavorite,
        getRecipeById,
        addRecipe,
        updateRecipe,
        deleteRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export const useRecipes = () => useContext(RecipeContext);
