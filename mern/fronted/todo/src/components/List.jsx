import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const List = () => {
  const [taskData, settaskDAta] = useState();
  useEffect(() => {
    listApi();
  }, []);
  const listApi = async () => {
    let responce = await fetch("http://localhost:3200/add-list");
    responce = await responce.json();
    settaskDAta(responce.result);
  };
  console.log(taskData);

  const deleteTask = async (id) => {
    try {
      console.log(id);
      let deletedResponce = await fetch("http://localhost:3200/delete/" + id, {
        method: "delete",
      });
      deletedResponce = await deletedResponce.json();
      if (deletedResponce.success) {
        listApi();
        console.log("items has been deleted");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-5">
      <h1 className="font-bold text-5xl my-11">Todo List App</h1>
      <div className="w-full">
        <ul className="flex gap-1.5 w-full">
          <li className="bg-gray-600 text-white p-3 text-3xl rounded-[3px] w-30 font-medium  ">
            S.no
          </li>
          <li className="bg-gray-600 text-white p-3 text-3xl rounded-[3px] w-200 font-medium  ">
            Title
          </li>
          <li className="bg-gray-600 text-white p-3 text-3xl rounded-[3px] w-full font-medium  ">
            Description
          </li>
          <li className="bg-gray-600 border border-[#cccccc57] font-normal text-white p-3 text-3xl rounded-[3px] w-45">
            Action
          </li>
        </ul>

        {taskData &&
          taskData.map((items, index) => (
            <div className="flex gap-1.5 w-full mt-3.5 list-none" key={index}>
              <li className="bg-[#f0f0f0] border border-[#cccccc57] font-medium text-black p-3 text-3xl rounded-[5px] w-30    ">
                {index + 1}
              </li>
              <li className="bg-[#f0f0f0] border border-[#cccccc57] font-normal text-black/90 p-3 text-3xl rounded-[1px] w-200    ">
                {items.Title}
              </li>
              <li className="bg-[#f0f0f0] border border-[#cccccc57] font-normal text-black/80 p-3 text-3xl rounded-[1px] w-full    ">
                {items.Description}
              </li>
              <li className="flex gap-2 bg-[#f0f0f0] border border-[#cccccc57] font-normal text-black/80 p-3 text-3xl rounded-[1px] w-90">
                <button
                  onClick={() => deleteTask(items._id)}
                  className="bg-red-500 text-white text-[22px] px-4 py-2 rounded-[3px] text-center hover:bg-red-800 hover:cursor-pointer"
                >
                  Delete
                </button>

                <Link
                  to={"updateTask/" + items._id}
                  className="bg-green-900 text-white text-[22px] px-4 py-2 rounded-[3px] text-center hover:bg-green-800 hover:cursor-pointer"
                >
                  Update
                </Link>
              </li>
            </div>
          ))}
      </div>
    </div>
  );
};

export default List;
