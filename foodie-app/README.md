# Foodie 🍳

A recipe app built with React Native and Expo for the IBM / Coursera course
"React Native: Developing Android and iOS Apps".

## Features
- Main feed with 12 recipe categories in a horizontal bar, plus My Food and Favorites
- Recipe details: ingredients, instructions, prep time, servings, calories and difficulty
- Category pages that show only that category's recipes
- Heart icon to favorite and unfavorite any recipe; Favorites screen lists them
- My Food: Add New Recipe form with name, image upload, ingredients list, step-by-step instructions and a Save Recipe button
- My Recipes list with working Edit and Delete buttons
- Back button on every inner screen (and the Android hardware back button)
- Favorites and your own recipes are saved on the device with AsyncStorage

## Run it
- **Snack:** open https://snack.expo.dev, choose Import Git repository, paste this repo's URL
- **Locally:** `npm install` then `npx expo start`

## Project structure
```
App.js                     screen stack + back handling
src/data/recipes.js        categories and built-in recipes
src/context/RecipeContext  favorites + My Recipes state (AsyncStorage)
src/components/            Header, CategoryBar, RecipeCard, HeartButton, ...
src/screens/               Home, Category, RecipeDetail, Favorites, MyFood, RecipeForm
```
