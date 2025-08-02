import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const UpdateRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    instructions: "",
    image: "",
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:3690/recipe/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(res.data.recipe);
        console.log("Fetched recipe:", res.data.recipe);
      } catch (err) {
        console.log("Error fetching recipe:", err);
      }
    };

    if (token) {
      fetchRecipe();
    } else {
      alert("Please login first.");
      navigate("/signin");
    }
  }, [token, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3690/recipe/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Recipe updated successfully!");
      navigate("/myrecipes");
    } catch (err) {
      console.log("Error updating recipe:", err);
      //   alert("Failed to update recipe. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-teal-700">
          Update Recipe
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Instructions</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={(e) =>
                setFormData({ ...formData, instructions: e.target.value })
              }
              rows={5}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            ></textarea>
          </div>

          <div>
            <label className="block font-medium mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              placeholder="https://example.com/image.jpg"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-md font-semibold hover:from-teal-500 hover:to-emerald-500 transition duration-300"
          >
            Update Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRecipe;
