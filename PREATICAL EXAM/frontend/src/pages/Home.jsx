import React from "react";
import { Link } from "react-router";

const recipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    ingredients: "Spaghetti, Eggs, Parmesan Cheese, Pancetta, Pepper",
    instructions:
      "1. Boil pasta in salted water until al dente.\n2. Cook pancetta until crispy.\n3. Whisk eggs and cheese together.\n4. Toss pasta with pancetta, then mix in egg mixture off heat.\n5. Season with pepper and serve.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx74JDLCprZQ8cllj_fZefe-ICza2E6HoaRA&s",
  },
  {
    id: 2,
    title: "Vegetable Stir Fry",
    ingredients: "Broccoli, Bell Peppers, Soy Sauce, Garlic, Ginger, Oil",
    instructions:
      "1. Heat oil in a wok.\n2. Add minced garlic and ginger.\n3. Toss in vegetables and stir-fry for 5-7 minutes.\n4. Add soy sauce and stir for 1 minute.\n5. Serve hot with rice.",
    image:
      "https://cdn.loveandlemons.com/wp-content/uploads/2025/02/stir-fry-recipe.jpg",
  },
  {
    id: 3,
    title: "Chicken Tikka Masala",
    ingredients: "Chicken, Yogurt, Tomatoes, Cream, Spices, Onion",
    instructions:
      "1. Marinate chicken in yogurt and spices.\n2. Grill chicken until charred.\n3. Cook onions, tomatoes, and spices for sauce.\n4. Add cream and simmer.\n5. Combine with chicken and serve with naan.",
    image:
      "https://www.kitchensanctuary.com/wp-content/uploads/2019/09/Chicken-Tikka-Masala-square-FS-51.jpg",
  },
  {
    id: 4,
    title: "Caprese Salad",
    ingredients: "Tomatoes, Mozzarella, Basil, Olive Oil, Balsamic Vinegar",
    instructions:
      "1. Slice tomatoes and mozzarella.\n2. Arrange with basil leaves.\n3. Drizzle with olive oil and balsamic vinegar.\n4. Season with salt and pepper.\n5. Serve fresh.",
    image:
      "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Beef Tacos",
    ingredients: "Ground Beef, Tortillas, Lettuce, Cheese, Salsa, Spices",
    instructions:
      "1. Cook beef with spices until browned.\n2. Warm tortillas.\n3. Add beef, lettuce, cheese, and salsa to tortillas.\n4. Serve with lime wedges.",
    image:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Mushroom Risotto",
    ingredients: "Arborio Rice, Mushrooms, Parmesan, White Wine, Broth",
    instructions:
      "1. Sauté mushrooms until golden.\n2. Cook rice with wine and broth gradually.\n3. Stir in mushrooms and parmesan.\n4. Season and serve creamy.",
    image:
      "https://www.sandravalvassori.com/wp-content/uploads/2024/02/Risotto-Mushroom-2-352-500x500.jpg",
  },
  {
    id: 7,
    title: "Greek Salad",
    ingredients: "Cucumber, Tomatoes, Feta, Olives, Red Onion, Olive Oil",
    instructions:
      "1. Chop vegetables and feta.\n2. Toss with olives and onion.\n3. Drizzle with olive oil and lemon juice.\n4. Season with oregano and serve.",
    image:
      "https://www.onceuponachef.com/images/2023/06/greek-salad-1-1200x1477.jpg",
  },
  {
    id: 8,
    title: "Pancakes",
    ingredients: "Flour, Milk, Eggs, Sugar, Butter, Baking Powder",
    instructions:
      "1. Mix dry and wet ingredients separately.\n2. Combine to form batter.\n3. Cook spoonfuls on a hot griddle.\n4. Flip when bubbles form.\n5. Serve with syrup.",
    image:
      "https://www.chocolatesandchai.com/wp-content/uploads/2024/12/Chocolate-Pancakes-Featured.jpg",
  },
  {
    id: 9,
    title: "Butter Chicken",
    ingredients: "Chicken, Butter, Cream, Tomatoes, Spices, Garlic",
    instructions:
      "1. Marinate chicken with spices.\n2. Cook chicken until browned.\n3. Simmer tomatoes, butter, and cream for sauce.\n4. Add chicken and cook through.\n5. Serve with rice.",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    title: "Avocado Toast",
    ingredients: "Bread, Avocado, Lemon, Salt, Pepper, Olive Oil",
    instructions:
      "1. Toast bread.\n2. Mash avocado with lemon juice, salt, and pepper.\n3. Spread on toast.\n4. Drizzle with olive oil.\n5. Serve immediately.",
    image:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 11,
    title: "Lentil Soup",
    ingredients: "Lentils, Carrots, Celery, Onion, Tomatoes, Spices",
    instructions:
      "1. Sauté vegetables.\n2. Add lentils and tomatoes.\n3. Simmer with broth until lentils are soft.\n4. Season and serve hot.",
    image:
      "https://detoxinista.com/wp-content/uploads/2020/01/red-lentil-soup-recipe.jpg",
  },
  {
    id: 12,
    title: "Chocolate Cake",
    ingredients: "Flour, Cocoa, Sugar, Eggs, Butter, Baking Powder",
    instructions:
      "1. Mix dry ingredients.\n2. Combine with wet ingredients.\n3. Pour into a greased pan.\n4. Bake at 350°F for 30-35 minutes.\n5. Cool and frost.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-12 px-4 sm:px-6 lg:px-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600 mb-12 animate-bounce-subtle">
        🍽️ Featured Recipes
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="p-5 relative z-10">
              <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors duration-300">
                {recipe.title}
              </h2>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                <span className="font-semibold text-gray-700">
                  🧂 Ingredients:
                </span>{" "}
                {recipe.ingredients}
              </p>
              <p className="text-gray-600 text-sm whitespace-pre-line line-clamp-3">
                <span className="font-semibold text-gray-700">
                  📋 Instructions:
                </span>{" "}
                {recipe.instructions}
              </p>
              {/* <button className="mt-4 w-full py-2 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 opacity-0 group-hover:opacity-100">
                View Recipe
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
