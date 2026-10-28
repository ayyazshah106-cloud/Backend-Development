import { useState } from "react";

import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Add_task from "./components/Add_task";
import List from "./components/List";
import UpdateTask from "./components/UpdateTask";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/Add" element={<Add_task />} />
        <Route path="/updateTask/:id" element={<UpdateTask />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
