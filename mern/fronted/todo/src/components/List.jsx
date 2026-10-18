import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const List = () => {
  const [list, setlist] = useState();
  useEffect(() => {
    listApi();
  }, []);
  const listApi = async () => {
    let responce = await fetch("http://localhost:3000/add-list");
    responce = await responce.json();
    setlist(responce.result);
    console.log(list);
  };

  return (
    <div>
      <h1 className="text-center text-4xl font-medium mt-4 ">Todo List App</h1>

      <ul>
        <li>S.no</li>
        <li>Title</li>
        <li>Description</li>
      </ul>

      {list.map((item) => console.log(item))}
    </div>
  );
};

export default List;
