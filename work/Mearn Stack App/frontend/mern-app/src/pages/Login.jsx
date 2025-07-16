import axios from "axios";
import React, { useState } from "react";
import { data } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // const [loginArr, setLoginArr] = useState([]);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const data = await axios.post(
        "http://localhost:3699/auth/login",
        loginData
      );
      console.log(data);
      toast.success("login successfully");
      console.log(loginData);
    } catch (err) {
      console.log(err);
      toast.success(err.response.data.message);
    }
  }

  return (
    <>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              value={loginData.email}
              onChange={(event) =>
                setLoginData({ ...loginData, email: event.target.value })
              }
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              value={loginData.password}
              onChange={(event) =>
                setLoginData({ ...loginData, password: event.target.value })
              }
            />
          </div>
          <button type="submit">Signin</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
