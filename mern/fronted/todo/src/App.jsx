import { useState } from "react";

import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Add_task from "./components/Add_task";
import List from "./components/List";
import UpdateTask from "./components/UpdateTask";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/Add" element={<Add_task />} />
        <Route path="/updateTask/:id" element={<UpdateTask />} />
      </Routes>
    </>
  );
}

export default App;
