import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchPunchEmp,
  punchInEmp,
  punchOutEmp,
} from "../redux/features/punch/punch.actions";
import { signinEmployee } from "../redux/features/employee/employee.actions";

export default function Punch() {
  const dispatch = useDispatch();

  const { username: employeeUsername, _id: employeeId } = useSelector(
    (state) => state.employee.currentEmployee
  );

  const {
    punchIn: punchInTime,
    punchOut: punchOutTime,
    punchInState,
    punchOutState,
    punchListExist,
  } = useSelector((state) => state.punch);

  useEffect(() => {
    try {
      dispatch(fetchPunchEmp(employeeId));
    } catch (error) {
      console.log(error);
    }
  }, []);

  // function setError() {
  //   setErrorEmp(employeeError);
  // }

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log("in");

    try {
      if (punchOutState || !punchListExist) {
        // console.log("first");
        const punchInT = new Date();
        const punchInTrig = moment(punchInT).format("MMMM Do YYYY, h:mm:ss a");

        const punchData = { employeeId, punchInTrig };
        // console.log("PunchData: ", punchData);
        await dispatch(punchInEmp(punchData));
      } else if (punchInState && !punchOutState) {
        // console.log("second");

        const punchOutT = new Date();
        const punchOutTrig = moment(punchOutT).format(
          "MMMM Do YYYY, h:mm:ss a"
        );

        const punchData = { employeeId, punchOutTrig };
        dispatch(punchOutEmp(punchData));
      }
    } catch (error) {
      // dispatch();
      console.log("failed: ", error);
    }
  }

  return (
    <>
      <div
        id="punch-page"
        className="bg-slate-100   h-screen flex  min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
      >
        <div className="sm:mx-auto sm:w-full max-w-2xl sm:max-w-lg"></div>
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

            {punchInTime && (
              <div className="p-2">
                <label className="block text-lg font-medium pt-4 leading-6 text-gray-900">
                  Pucnh In:
                </label>

                <p className=" font-md font-semibold text-center shadow-md rounded-md p-4">
                  {punchInTime}
                </p>
              </div>
            )}

            {punchOutTime && (
              <div className="p-2">
                <label className="block text-lg font-medium pt-4 leading-6 text-gray-900">
                  Pucnh Out:
                </label>

                <p className=" font-md font-semibold text-center shadow-md rounded-md p-4">
                  {punchOutTime}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 pt-6">
            <button
              onClick={(e) => handleSubmit(e)}
              className="flex w-full justify-center rounded-md bg-slate-600  py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {punchInState ? "Punch Out" : "Punch In"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
