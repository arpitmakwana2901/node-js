import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Todolist = () => {
  const [task, setTask] = useState("");
  const [todoData, setTodoData] = useState([]);
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  async function handleAdd() {
    try {
      let response = await axios.post(
        "http://localhost:3690/todolist",
        { task: task }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      alert(response.data.message); 
    } catch (error) {
      console.log(error);
    }
    setTask("");
  }
  async function fetchTodos() {
    try {
      const response = await axios.get("http://localhost:3690/todolist", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTodoData(response.data.todos);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  }

  function handleLogout() {
    alert("logout successfully");
    logout();
    navigate("/");
  }
  
  useEffect(() => {
    if (token) {
      fetchTodos();
    }
  }, [token, todoData]);

  return (
    <>
      <div>
        <button onClick={handleLogout}>Logout</button>
        <h1>My Task</h1>
        <div>
          <label htmlFor="">Task</label>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={handleAdd}>Add Task</button>

          <div>
            {todoData.map((item) => {
              return <h1 key={item._id}>{item.task}</h1>;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todolist;
