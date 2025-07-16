
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "./Signup.css";
import axios from "axios";

const Signup = () => {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  console.log(userData);

   const [addData, setAddData] = useState([]);

   async function  handleAdd(e) {
    e.preventDefault();
try{

  const data = await axios.post("http://localhost:3699/auth/signup",userData);

  console.log(data);
    
        toast.success("Signup successful!");

        setAddData([...addData, userData]);

        setUserData({
          userName: "",
          email: "",
          password: "",
        });

}catch(err){
  console.log(err.response.data);

}
    
      }
  //http://localhost:3699/auth/signup
 
  return (
    <>
      <h1>SignUp</h1>
<form onSubmit={handleAdd}>
        <div>
          <label htmlFor="userName">Name</label>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Enter Your Name ..."
            value={userData.userName}
            onChange={(event) =>
              setUserData({ ...userData, userName: event.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email ..."
            value={userData.email}
            onChange={(event) =>
              setUserData({ ...userData, email: event.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Your Password ..."
            value={userData.password}
            onChange={(event) =>
              setUserData({ ...userData, password: event.target.value })
            }
          />
        </div>
        <button type="submit">Signup</button>
        <span>
          Alreday have an account ?<Link to="/login">Login</Link>
        </span>
      </form>

      <div>
        <div>
          {addData.map((item, index) => (
            <div key={index}>
              <p>{item.userName}</p>
              <p>{item.email}</p>
              <p>{item.password}</p>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
