import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector, useStore } from "react-redux";
import { signinEmployee } from "../redux/features/employee/employee.actions";
import { fetchPunchEmp } from "../redux/features/punch/punch.actions";

export default function Punch() {
  const [formData, SetFormData] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useStore();

  const { username: employeeUsername, _id: employeeId } = useSelector(
    (state) => state.employee.currentEmployee
  );

  const {
    punchIn: punchInTime,
    punchOut: punchOutTime,
    punchInstate,
    punchOutState,
  } = useSelector((state) => state.punch);
  console.log(employeeUsername, employeeId);
  const employeeError = useSelector((state) => state.employee.error);

  const [errorEmp, setErrorEmp] = useState("");
  const [punchIn, setPunchIn] = useState("");

  useEffect(() => {
    const res = dispatch(fetchPunchEmp(employeeId));
    setPunchIn(res);
  }, []);

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
      <div className="bg-slate-100 mt-6  h-screen flex  min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full max-w-2xl sm:max-w-lg">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {/* Punch In */}
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

            {punchIn ? (
              <div className="p-2">
                <label className="block text-lg font-medium pt-4 leading-6 text-gray-900">
                  Pucnh In:
                </label>

                <p className=" font-md font-semibold text-center shadow-md rounded-md p-4">
                  {punchInTime}
                </p>
              </div>
            ) : (
              ""
            )}

            {punchOutTime ? (
              <div className="p-2">
                <label className="block text-lg font-medium pt-4 leading-6 text-gray-900">
                  Pucnh Out:
                </label>

                <p className=" font-md font-semibold text-center shadow-md rounded-md p-4">
                  {punchOutTime}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="flex flex-col gap-2 pt-6">
            <button className="flex w-full justify-center rounded-md bg-slate-600  py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              {punchOutState ? "Punch In" : "Punch Out"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
