import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTask = () => {
  const { id } = useParams();
  const [task, setTask] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchValue();
  }, []);

  const fetchValue = async () => {
    let res = await fetch(`http://localhost:3200/updateTask/${id}`);
    res = await res.json();
    setTask(res.result);
  };
  console.log(task);
  return (
    <div
      className=" w-[700px] h-[520px] shadow-md  rounded-[8px] justify-self-center p-10
 mt-15 "
    >
      <h1 className="text-3xl text-center font-medium"> Update Task</h1>
      <div className="px-1 border-black p-2.5 grid">
        <label className="text-[18px] mb-0.5" htmlFor="">
          Title
        </label>
        <input
          value={task.Title}
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
          value={task.Description}
          onChange={(e) => setTask({ ...task, Description: e.target.value })}
          className="w-full h-32 max-h-32 p-1 border rounded-sm border-gray-300 font-thin placeholder:text-gray-500  text-[18px] focus:outline-none overflow-y-auto
  "
          name="Descrption"
          type="text"
          placeholder="Enter task Description"
        />
        <button
          onClick={UpdateTask}
          className="place-items-center bg-blue-600 text-[18px] p-1 text-white rounded-2xl mt-4 hover:cursor-pointer hover:bg-blue-700 font-mono "
        >
          Update Task
        </button>
      </div>
    </div>
  );
};

export default UpdateTask;
