import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="w-full bg-black font-bold text-white flex justify-between items-center p-8 border-b-[0.1px] border-white/10">
      <div className="text-4xl ml-10">Todo</div>
      <ul className="flex justify-around items-center gap-8 text-4xl mr-20">
        <li>
          <Link to="/">List</Link>
        </li>
        <li>
          <Link to="/Add">AddTodo</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
