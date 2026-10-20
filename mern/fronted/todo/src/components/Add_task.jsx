import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";

const Add_task = () => {
  const [task, setTask] = useState("");
  const navigate = useNavigate();
  const handleTaskAdd = async () => {
    let result = await fetch("http://localhost:3200/add", {
      method: "post",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result) {
      navigate("/");
      console.log("resulagaya hai");
    }
  };

  return (
    <div
      className=" w-[700px] h-[520px] shadow-md  rounded-[8px] justify-self-center p-10
 mt-15 "
    >
      <h1 className="text-3xl text-center font-medium">Add New Task</h1>
      <div className="px-1 border-black p-2.5 grid">
        <label className="text-[18px] mb-0.5" htmlFor="">
          Title
        </label>
        <input
          onChange={(e) => setTask({ ...task, Title: e.target.value })}
          className="border rounded-sm border-gray-300 font-thin placeholder:text-gray-500 text-[18px] p-1 focus:outline-none "
          type="text"
          name="Title"
          placeholder="Enter task title"
        />
        <label className="text-[18px] my-1" htmlFor="">
          Descrption:
        </label>
        <textarea
          onChange={(e) => setTask({ ...task, Description: e.target.value })}
          className="w-full h-32 max-h-32 p-1 border rounded-sm border-gray-300 font-thin placeholder:text-gray-500  text-[18px] focus:outline-none overflow-y-auto
  "
          name="Descrption"
          type="text"
          placeholder="Enter task Description"
        />
        <button
          onClick={handleTaskAdd}
          className="place-items-center bg-blue-600 text-[18px] p-1 text-white rounded-2xl mt-4 hover:cursor-pointer hover:bg-blue-700 font-mono "
        >
          Add New Task
        </button>
      </div>
    </div>
  );
};

export default Add_task;
