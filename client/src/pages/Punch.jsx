import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector, useStore } from "react-redux";
import { signinEmployee } from "../redux/features/employee/employee.actions";

export default function Punch() {
  const [formData, SetFormData] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useStore();

  const employeeUsername = useSelector(
    (state) => state.employee.currentEmployee.username
  );
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
        <div className="sm:mx-auto sm:w-full max-w-2xl sm:max-w-lg">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Punch In
          </h2>
        </div>
        <div
          id="box"
          className="mt-10 bg-white sm:mx-auto sm:w-full  sm:max-w-xl p-4 shadow-lg rounded-lg"
        >
          <div>
            <div className="text-center">
              <h1 className="text-slate-800  font-bold text-2xl ">
                Hi, {employeeUsername}!
              </h1>
              <p className=" font-semibold pt-2  text-blue-600">
                Ready for a productive day?!
              </p>
            </div>

            <label className="block text-sm font-medium leading-6 text-gray-900">
              Pucnh In:
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
          <div className="mt-2"></div>

          <div className="flex flex-col gap-2 pt-6">
            <button className="flex w-full justify-center rounded-md bg-slate-600  py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Punch In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
