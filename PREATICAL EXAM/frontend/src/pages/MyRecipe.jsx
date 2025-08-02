import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const MyRecipe = () => {
  const { token } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const [boolean, setBoolean] = useState(false);
  const [editRecipe, setEditRecipe] = useState(null);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:3690/recipe", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecipes(res.data.recipes);
      console.log("Fetched recipes:", res.data.recipes);
    } catch (err) {
      console.log("Failed to fetch recipes:", err);
    }
  };

  const handleEdit = (id) => {
    setEditRecipe(id);
    setBoolean(true);
    navigate(`/updaterecipe/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3690/recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecipes(recipes.filter((recipe) => recipe._id !== id));
      alert("Recipe deleted successfully!");
    } catch (err) {
      console.error("Failed to delete recipe:", err.message);
      alert("Failed to delete recipe. Please try again.");
    }
  };

  useEffect(() => {
    if (!token) {
      alert("Please login to view your recipes.");
      navigate("/signin");
    } else {
      fetchRecipes();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-12 px-4 sm:px-6 lg:px-12">
      {/* Page Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600">
              My Recipes
            </h1>
            <Link
              to="/addrecipe"
              className="flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 rounded-full text-sm font-semibold text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>Add New Recipe</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {recipes.length === 0 ? (
          <div className="text-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-700">
              No recipes found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding your first recipe.
            </p>
            <div className="mt-6">
              <Link
                to="/addrecipe"
                className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-sm font-semibold text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="-ml-1 mr-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add Recipe
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recipes.map((recipe) => (
              <div
                key={recipe._id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {recipe.image && (
                  <img
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                    src={recipe.image}
                    alt={recipe.title}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="p-5 relative z-10">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors duration-300">
                    {recipe.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {recipe.instructions}
                  </p>
                  <div className="flex justify-end items-center space-x-2">
                    <button
                      onClick={() => handleEdit(recipe._id)}
                      className="text-sm font-semibold text-teal-600 hover:text-teal-500 transition-colors duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(recipe._id)}
                      className="text-sm font-semibold text-red-600 hover:text-red-500 transition-colors duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyRecipe;
