export const CATEGORIES = [
  { id: 'breakfast', name: 'Breakfast', emoji: '🥞', color: '#FCEFD4' },
  { id: 'salads', name: 'Salads', emoji: '🥗', color: '#E3F0E9' },
  { id: 'soups', name: 'Soups', emoji: '🍲', color: '#FBE3D9' },
  { id: 'pasta', name: 'Pasta', emoji: '🍝', color: '#FFF1CC' },
  { id: 'chicken', name: 'Chicken', emoji: '🍗', color: '#F8E4CF' },
  { id: 'beef', name: 'Beef', emoji: '🥩', color: '#F6DCDC' },
  { id: 'seafood', name: 'Seafood', emoji: '🦐', color: '#DDEEF6' },
  { id: 'vegetarian', name: 'Vegetarian', emoji: '🥦', color: '#E6F2DC' },
  { id: 'desserts', name: 'Desserts', emoji: '🍰', color: '#F8E1EC' },
  { id: 'snacks', name: 'Snacks', emoji: '🥨', color: '#F4EAD8' },
  { id: 'drinks', name: 'Drinks', emoji: '🥤', color: '#E4E8F7' },
  { id: 'baking', name: 'Baking', emoji: '🥐', color: '#F7EBD9' },
];

export const getCategory = (id) => CATEGORIES.find((c) => c.id === id);

const r = (id, categoryId, name, emoji, prepTime, servings, calories, difficulty, ingredients, instructions) => {
  const category = getCategory(categoryId);
  return {
    id,
    categoryId,
    name,
    emoji,
    color: category ? category.color : '#E3F0E9',
    prepTime,
    servings,
    calories,
    difficulty,
    ingredients,
    instructions,
    isUserRecipe: false,
  };
};

export const RECIPES = [
  // Breakfast
  r('b1', 'breakfast', 'Fluffy Buttermilk Pancakes', '🥞', '20 min', 4, 350, 'Easy',
    ['2 cups all-purpose flour', '2 tbsp sugar', '2 tsp baking powder', '2 cups buttermilk', '2 eggs', '3 tbsp melted butter'],
    ['Whisk flour, sugar and baking powder in a large bowl.', 'In another bowl, whisk buttermilk, eggs and melted butter.', 'Fold the wet mixture into the dry until just combined; a few lumps are fine.', 'Cook ¼ cup portions on a buttered pan over medium heat until bubbles form, then flip.', 'Serve warm with maple syrup and berries.']),
  r('b2', 'breakfast', 'Avocado Toast with Egg', '🥑', '10 min', 2, 290, 'Easy',
    ['2 slices sourdough bread', '1 ripe avocado', '2 eggs', '1 tsp lemon juice', 'Chili flakes', 'Salt and pepper'],
    ['Toast the bread until golden.', 'Mash the avocado with lemon juice, salt and pepper.', 'Fry or poach the eggs to your liking.', 'Spread avocado on toast, top with an egg and sprinkle chili flakes.']),

  // Salads
  r('s1', 'salads', 'Classic Greek Salad', '🥗', '15 min', 4, 210, 'Easy',
    ['3 tomatoes, chopped', '1 cucumber, sliced', '½ red onion, sliced', '½ cup Kalamata olives', '150 g feta cheese', '3 tbsp olive oil', '1 tsp dried oregano'],
    ['Combine tomatoes, cucumber, onion and olives in a bowl.', 'Drizzle with olive oil and season with salt and oregano.', 'Place the feta on top in one block or crumbled.', 'Toss gently just before serving.']),
  r('s2', 'salads', 'Chicken Caesar Salad', '🥬', '25 min', 2, 480, 'Medium',
    ['1 romaine lettuce head', '1 chicken breast', '1 cup croutons', '¼ cup grated Parmesan', '4 tbsp Caesar dressing', '1 tbsp olive oil'],
    ['Season the chicken and cook in olive oil for 6–7 minutes per side.', 'Rest the chicken for 5 minutes, then slice.', 'Chop the romaine and toss with the dressing.', 'Top with chicken, croutons and Parmesan.']),

  // Soups
  r('so1', 'soups', 'Creamy Tomato Soup', '🍅', '35 min', 4, 220, 'Easy',
    ['2 tbsp butter', '1 onion, diced', '3 garlic cloves', '800 g canned tomatoes', '2 cups vegetable stock', '½ cup cream', 'Fresh basil'],
    ['Melt butter and soften the onion for 5 minutes.', 'Add garlic and cook for 1 minute.', 'Add tomatoes and stock; simmer for 20 minutes.', 'Blend until smooth, stir in cream and season.', 'Serve topped with torn basil.']),
  r('so2', 'soups', 'Chicken Noodle Soup', '🍜', '45 min', 6, 260, 'Medium',
    ['2 chicken breasts', '2 carrots, sliced', '2 celery stalks, sliced', '1 onion, diced', '8 cups chicken stock', '2 cups egg noodles', 'Fresh parsley'],
    ['Sauté onion, carrot and celery for 6 minutes.', 'Add stock and chicken; simmer for 20 minutes.', 'Remove the chicken, shred it and return it to the pot.', 'Add noodles and cook for 7 minutes.', 'Season and finish with parsley.']),

  // Pasta
  r('p1', 'pasta', 'Spaghetti Carbonara', '🍝', '25 min', 4, 620, 'Medium',
    ['400 g spaghetti', '150 g pancetta or turkey bacon', '3 egg yolks + 1 whole egg', '1 cup grated Pecorino', 'Black pepper'],
    ['Boil spaghetti in salted water until al dente.', 'Crisp the pancetta in a large pan.', 'Whisk eggs with Pecorino and plenty of pepper.', 'Toss hot pasta with pancetta off the heat, then stir in the egg mixture.', 'Loosen with pasta water until glossy and serve.']),
  r('p2', 'pasta', 'Creamy Pesto Penne', '🌿', '20 min', 4, 540, 'Easy',
    ['400 g penne', '½ cup basil pesto', '½ cup cream', '1 cup cherry tomatoes', '¼ cup Parmesan'],
    ['Cook penne until al dente.', 'Warm pesto and cream in a pan.', 'Add halved cherry tomatoes and cook 2 minutes.', 'Toss with pasta and top with Parmesan.']),

  // Chicken
  r('c1', 'chicken', 'Lemon Herb Roast Chicken', '🍗', '1 hr 20 min', 6, 450, 'Medium',
    ['1 whole chicken (1.6 kg)', '1 lemon', '4 garlic cloves', '2 tbsp olive oil', '1 tbsp mixed dried herbs', 'Salt and pepper'],
    ['Heat the oven to 200°C (400°F).', 'Rub the chicken with oil, herbs, salt and pepper.', 'Stuff the cavity with halved lemon and garlic.', 'Roast for 70–75 minutes until juices run clear.', 'Rest for 10 minutes before carving.']),
  r('c2', 'chicken', 'Chicken Tikka Masala', '🍛', '50 min', 4, 520, 'Medium',
    ['600 g chicken thighs', '½ cup yogurt', '2 tbsp tikka masala paste', '1 onion, diced', '400 g tomato puree', '½ cup cream', 'Fresh coriander'],
    ['Marinate chicken in yogurt and half the paste for 20 minutes.', 'Sear the chicken until charred; set aside.', 'Cook onion with the remaining paste for 5 minutes.', 'Add tomato puree and simmer 10 minutes.', 'Return chicken, stir in cream and simmer 10 minutes.', 'Garnish with coriander and serve with rice or naan.']),

  // Beef
  r('be1', 'beef', 'Classic Beef Burger', '🍔', '25 min', 4, 680, 'Easy',
    ['500 g ground beef', '4 burger buns', '4 cheese slices', 'Lettuce and tomato', '1 tsp salt', '½ tsp black pepper'],
    ['Divide the beef into 4 patties and season both sides.', 'Grill or pan-fry for 4 minutes per side.', 'Add cheese in the last minute to melt.', 'Toast the buns and build with lettuce and tomato.']),
  r('be2', 'beef', 'Beef Stir-Fry', '🥢', '25 min', 4, 410, 'Medium',
    ['400 g beef sirloin, thinly sliced', '1 bell pepper', '1 cup broccoli florets', '3 tbsp soy sauce', '1 tbsp oyster sauce', '1 tsp cornstarch', '2 garlic cloves'],
    ['Toss beef with cornstarch and 1 tbsp soy sauce.', 'Sear beef in a very hot wok for 2 minutes; remove.', 'Stir-fry vegetables and garlic for 3 minutes.', 'Return beef, add sauces and toss for 1 minute.', 'Serve over steamed rice.']),

  // Seafood
  r('sf1', 'seafood', 'Garlic Butter Shrimp', '🦐', '15 min', 3, 300, 'Easy',
    ['450 g shrimp, peeled', '3 tbsp butter', '4 garlic cloves, minced', '1 tbsp lemon juice', 'Chopped parsley'],
    ['Melt butter in a skillet over medium-high heat.', 'Add garlic and cook 30 seconds.', 'Add shrimp and cook 2 minutes per side until pink.', 'Finish with lemon juice and parsley.']),
  r('sf2', 'seafood', 'Baked Salmon with Dill', '🐟', '25 min', 4, 390, 'Easy',
    ['4 salmon fillets', '2 tbsp olive oil', '1 lemon, sliced', '2 tbsp fresh dill', 'Salt and pepper'],
    ['Heat the oven to 200°C (400°F).', 'Place salmon on a lined tray and brush with oil.', 'Season and top with dill and lemon slices.', 'Bake for 12–15 minutes until it flakes easily.']),

  // Vegetarian
  r('v1', 'vegetarian', 'Chickpea Curry', '🫘', '35 min', 4, 380, 'Easy',
    ['2 cans chickpeas, drained', '1 onion, diced', '2 tbsp curry powder', '400 ml coconut milk', '200 g spinach', '1 tbsp ginger-garlic paste'],
    ['Soften onion with ginger-garlic paste for 5 minutes.', 'Add curry powder and cook 1 minute.', 'Add chickpeas and coconut milk; simmer 15 minutes.', 'Stir in spinach until wilted and season.']),
  r('v2', 'vegetarian', 'Veggie Fried Rice', '🍚', '20 min', 4, 340, 'Easy',
    ['3 cups cooked rice (day-old)', '1 cup mixed vegetables', '2 eggs', '3 tbsp soy sauce', '2 spring onions', '1 tbsp sesame oil'],
    ['Heat sesame oil and scramble the eggs; set aside.', 'Stir-fry the vegetables for 3 minutes.', 'Add rice and soy sauce; fry until hot.', 'Fold in eggs and spring onions.']),

  // Desserts
  r('d1', 'desserts', 'Chocolate Lava Cake', '🍫', '25 min', 4, 450, 'Hard',
    ['120 g dark chocolate', '½ cup butter', '2 eggs + 2 yolks', '¼ cup sugar', '2 tbsp flour'],
    ['Heat the oven to 220°C (425°F) and butter 4 ramekins.', 'Melt chocolate and butter together.', 'Whisk eggs, yolks and sugar until pale, then fold in chocolate.', 'Fold in flour and divide between ramekins.', 'Bake 12 minutes; centres should wobble. Turn out and serve.']),
  r('d2', 'desserts', 'No-Bake Cheesecake Cups', '🍰', '20 min', 6, 360, 'Easy',
    ['1 cup crushed graham crackers', '3 tbsp melted butter', '250 g cream cheese', '½ cup powdered sugar', '1 cup whipped cream', 'Fresh berries'],
    ['Mix crumbs with butter and press into 6 cups.', 'Beat cream cheese with sugar until smooth.', 'Fold in whipped cream and spoon over the base.', 'Chill for 2 hours and top with berries.']),

  // Snacks
  r('sn1', 'snacks', 'Loaded Nachos', '🧀', '20 min', 4, 520, 'Easy',
    ['200 g tortilla chips', '1½ cups shredded cheddar', '1 cup black beans', '½ cup salsa', '1 jalapeño, sliced', 'Sour cream'],
    ['Heat the oven to 200°C (400°F).', 'Layer chips, beans and cheese on a tray.', 'Bake 8 minutes until the cheese melts.', 'Top with salsa, jalapeño and sour cream.']),
  r('sn2', 'snacks', 'Classic Hummus', '🥙', '10 min', 6, 180, 'Easy',
    ['1 can chickpeas', '¼ cup tahini', '1 lemon, juiced', '1 garlic clove', '2 tbsp olive oil', '2–3 tbsp cold water'],
    ['Blend chickpeas, tahini, lemon juice and garlic.', 'Add cold water a spoon at a time until creamy.', 'Season with salt and drizzle with olive oil.']),

  // Drinks
  r('dr1', 'drinks', 'Mango Lassi', '🥭', '5 min', 2, 220, 'Easy',
    ['1 cup mango pulp', '1 cup plain yogurt', '½ cup cold milk', '2 tbsp sugar', 'Pinch of cardamom'],
    ['Add everything to a blender.', 'Blend until smooth and frothy.', 'Pour over ice and serve chilled.']),
  r('dr2', 'drinks', 'Berry Banana Smoothie', '🫐', '5 min', 2, 190, 'Easy',
    ['1 banana', '1 cup mixed berries', '1 cup milk', '½ cup yogurt', '1 tbsp honey'],
    ['Add all ingredients to a blender.', 'Blend for 45 seconds until smooth.', 'Serve immediately.']),

  // Baking
  r('bk1', 'baking', 'Chocolate Chip Cookies', '🍪', '30 min', 24, 160, 'Easy',
    ['2¼ cups flour', '1 cup butter, softened', '¾ cup brown sugar', '½ cup white sugar', '2 eggs', '1 tsp baking soda', '2 cups chocolate chips'],
    ['Heat the oven to 190°C (375°F).', 'Cream butter and sugars, then beat in eggs.', 'Mix in flour and baking soda, then the chocolate chips.', 'Scoop onto trays and bake 9–11 minutes.']),
  r('bk2', 'baking', 'Banana Bread', '🍞', '1 hr 10 min', 10, 240, 'Medium',
    ['3 ripe bananas', '⅓ cup melted butter', '¾ cup sugar', '1 egg', '1 tsp baking soda', '1½ cups flour'],
    ['Heat the oven to 175°C (350°F) and grease a loaf pan.', 'Mash bananas and stir in butter.', 'Mix in sugar, egg and baking soda.', 'Fold in flour and pour into the pan.', 'Bake 55–60 minutes until a skewer comes out clean.']),
];
