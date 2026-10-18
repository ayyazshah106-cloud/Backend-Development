import { useState } from "react";

import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Add_task from "./components/Add_task";
import List from "./components/List";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/Add" element={<Add_task />} />
      </Routes>

      <div className="grid place-items-center h-screen font-bold text-white">
        <h1>Todo List App</h1>
      </div>
    </>
  );
}

export default App;
