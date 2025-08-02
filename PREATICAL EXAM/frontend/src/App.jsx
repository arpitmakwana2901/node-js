import React from "react";
import { Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MyRecipe from "./pages/MyRecipe";
import PrivateRoute from "./components/PrivateRoute";
import RecipeForm from "./pages/RecipeForm";
import UpdateRecipe from "./pages/UpdateRecipe";

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/myrecipes"
          element={
            <PrivateRoute>
              <MyRecipe />
            </PrivateRoute>
          }
        />
        <Route path="/addrecipe" element={<RecipeForm />} />
        <Route path="/updaterecipe/:id" element={<UpdateRecipe />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
