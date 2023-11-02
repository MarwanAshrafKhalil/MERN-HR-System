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
    <>
      <div className="bg-slate-100 h-screen flex  min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 bg-white sm:mx-auto sm:w-full sm:max-w-sm p-4 shadow-lg rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6 " type="submit">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>

              <div className="mt-2">
                <input
                  className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  id="username"
                  type="text"
                  required
                  placeholder="Username"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm"></div>
              </div>
            </div>
            <div className="mt-2">
              <input
                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="password"
                type="password"
                required
                placeholder="Password"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              {employeeError && (
                <span className="py-1 text-red-600">{employeeError}</span>
              )}
              <button className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
