import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RecipeForm = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: "",
    instructions: "",
    image: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3690/recipe/add",
        recipe,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      console.log("Recipe added successfully:", response.data);
      console.log("Recipe added successfully:", response.data.recipe.image);
      navigate("/myrecipes");
      setRecipe({
        title: "",
        instructions: "",
        image: "",
      });
    } catch (error) {
      console.error("Error submitting recipe:", error);
      alert("Failed to add recipe. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-8 lg:p-12">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600">
            Add Your Recipe 🍳
          </h1>
          <Link
            to="/myrecipes"
            className="text-gray-600 hover:text-teal-600 font-medium transition-colors duration-300"
          >
            ← Back to My Recipes
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="title"
                className="block text-gray-700 font-medium text-sm sm:text-base mb-2"
              >
                Recipe Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="e.g. Spaghetti Carbonara"
                className="w-full bg-gray-100 border border-gray-300 rounded-full px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400 text-sm sm:text-base transition-all duration-300"
                value={recipe.title}
                onChange={(e) =>
                  setRecipe({ ...recipe, title: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-gray-700 font-medium text-sm sm:text-base mb-2"
              >
                Image URL
              </label>
              <input
                type="text"
                id="image"
                placeholder="Paste image URL here"
                className="w-full bg-gray-100 border border-gray-300 rounded-full px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400 text-sm sm:text-base transition-all duration-300"
                value={recipe.image}
                onChange={(e) =>
                  setRecipe({ ...recipe, image: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="instructions"
                className="block text-gray-700 font-medium text-sm sm:text-base mb-2"
              >
                Instructions
              </label>
              <textarea
                id="instructions"
                rows="6"
                placeholder="Write detailed cooking steps"
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400 text-sm sm:text-base transition-all duration-300"
                value={recipe.instructions}
                onChange={(e) =>
                  setRecipe({ ...recipe, instructions: e.target.value })
                }
                required
              ></textarea>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Add Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
