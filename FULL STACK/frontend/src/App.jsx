import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Todolist from "./pages/Todolist";
import { AuthProvider } from "./components/context/AuthContext";

const App = () => {
  return (
    <>
      <Navbar />
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/todolist" element={<Todolist />} />
          <Route path="/logout"/>
          <Route />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
