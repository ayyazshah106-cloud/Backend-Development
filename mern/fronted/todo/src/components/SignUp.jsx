import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [userData, setuserData] = useState("");
  console.log(userData);

  const dataSubmit = async () => {
    let res = await fetch("http://localhost:3200/Sign-up", {
      method: "post",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (result) {
      console.log("sign up has been done");
      document.cookie = "token=" + result.token;
    }
  };

  return (
    <div
      className=" w-[500px] h-[520px] shadow-md  rounded-[8px] justify-self-center p-10 border border-[#0000000f]
 mt-15  "
    >
      <h1 className="text-3xl text-center font-medium"> Update Task</h1>
      <div className="px-1 border-black p-2.5 grid gap-[8px]">
        <label className="text-[18px] mb-0.5" htmlFor="">
          Name
        </label>
        <input
          onChange={(event) =>
            setuserData({ ...userData, name: event.target.value })
          }
          className="border rounded-sm border-gray-300 font-thin placeholder:text-gray-500 text-[18px] p-1 focus:outline-none "
          type="text"
          name="name"
          placeholder="Enter Your Name"
        />
        <label className="text-[18px] mb-0.5" htmlFor="">
          Email
        </label>
        <input
          onChange={(event) =>
            setuserData({ ...userData, email: event.target.value })
          }
          className="border rounded-sm border-gray-300 font-thin placeholder:text-gray-500 text-[18px] p-1 focus:outline-none "
          type="email"
          name="email"
          placeholder="Enter Your Email"
        />
        <label className="text-[18px] mb-0.5" htmlFor="">
          Password
        </label>
        <input
          onChange={(event) =>
            setuserData({ ...userData, password: event.target.value })
          }
          className="border rounded-sm border-gray-300 font-thin placeholder:text-gray-500 text-[18px] p-1 focus:outline-none "
          type="password"
          name="password"
          placeholder="Enter Password"
        />

        <button
          onClick={dataSubmit}
          className="place-items-center bg-blue-600 text-[18px] p-1 text-white rounded-2xl mt-4 hover:cursor-pointer hover:bg-blue-700 font-mono "
        >
          Sign Up
        </button>
        <Link className="text-center mt-2.5" to="/Login">
          Already have an account? Log in{" "}
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
