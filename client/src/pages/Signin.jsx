import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector, useStore } from "react-redux";
import { signinEmployee } from "../redux/features/employee/employee.actions";

export default function Signin() {
  const [formData, SetFormData] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useStore();

  const employeeFetch = useSelector((state) => state.employee.currentEmployee);
  const employeeError = useSelector((state) => state.employee.error);

  const [errorEmp, setErrorEmp] = useState("");

  function handleChange(e) {
    SetFormData({ ...formData, [e.target.id]: e.target.value });
  }

  // function setError() {
  //   setErrorEmp(employeeError);
  // }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("formdata: ", formData);
    try {
      await dispatch(signinEmployee(formData));
      let employeeError = store.getState().employee.error;
      console.log("Errr: ", employeeError);
      if (employeeError) {
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
