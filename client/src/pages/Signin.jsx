import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

export default function Signin() {
  const [formData, SetFormData] = useState({});

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  function handleChange(e) {
    SetFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("formdata: ", formData);
    try {
      const res = await fetch("api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("res: ", res);

      const data = await res.json();
      console.log("data: ", data);

      if (data.success === false) {
        return;
      }
      navigate("/punch");
    } catch (error) {
      // dispatch();
      console.log("failed: ", error);
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  gap-4  items-center justify-center rounded-lg  my-4 py-4 bg-slate-600 "
        type="submit"
      >
        <h1 className="text-white font-semibold text-2xl uppercase">
          Sign In{" "}
        </h1>

        <input
          className=" rounded-md p-2 "
          id="username"
          type="text"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          className=" rounded-md p-2"
          id="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button className="my-2 w-24 h-12  rounded-md bg-slate-900 text-white hover:bg-opacity-70">
          Login
        </button>
      </form>
    </div>
  );
}
