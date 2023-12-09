import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import Calendar from "react-calendar";
import CalendarInput from "../components/CalenderInput";
import "react-calendar/dist/Calendar.css";
import { CalendarMonth } from "@mui/icons-material";
import { basicSchema } from "../schemas/schema";

import { useDispatch, useSelector } from "react-redux";
import { applyLeave } from "../redux/features/leaves/leaves.actions";
import moment from "moment";

function Leaves() {
  const dispatch = useDispatch();
  const employeeId = useSelector((state) => state.employee.currentEmployee._id);
  const [dateInputs, setDateInputs] = useState([
    { id: "fromCalendar", isOpen: false },
    { id: "toCalendar", isOpen: false },
  ]);

  const [formError, setFormError] = useState("");

  const handleDateChange = (id, date) => {
    console.log(date);
    console.log(id);
    setDateInputs((prevInputs) => {
      return prevInputs.map((input) => {
        if (input.id === id) {
          handleChange({
            target: {
              name: input.id,
              value: moment(date).format("L"),
            },
          });
          return { ...input, isOpen: false };
        } else {
          return input;
        }
      });
    });
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    const id = e.target.id;
    console.log(id);
    setDateInputs((prevInputs) => {
      return prevInputs.map((input) => {
        return input.id === e.target.id
          ? { ...input, isOpen: !input.isOpen }
          : input;
      });
    });
    console.log(dateInputs);
  };

  const validateDate = (values) => {
    const fromDate = new Date(values.fromCalendar);
    const toDate = new Date(values.toCalendar);

    if (toDate < fromDate) {
      setFormError("To Date could not be before the From Date");
      return false;
    } else return true;
  };

  const onSubmit = async (values, actions) => {
    if (validateDate(values)) {
      const data = { employeeId, ...values };

      dispatch(applyLeave(data));
      console.log(values);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      actions.resetForm();
      setFormError("");
    }
  };

  const {
    values,
    errors,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      type: "",
      fromCalendar: "",
      toCalendar: "",
      duration: "",
      comment: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });
  // console.log(values);
  // console.log(errors);

  const leaveTypeOptions = ["", "Annual", "Casual"];
  const durationOptions = ["", "Full Day", "Half Day"];

  return (
    <div className="flex flex-col m-10 pb-5  max-w-lg mx-auto ">
      <h1 className="mx-auto">Apply Leave</h1>
      <hr />
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="flex flex-col mt-4 gap-4 "
      >
        <div id="leaveType" className="formLine ">
          <label htmlFor="leaveType" className=" formLabel">
            Leave Type
          </label>

          <select
            id="leave_type"
            className="inputData"
            name="type"
            value={values.type}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {leaveTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option ? option : "--Select--"}
              </option>
            ))}
          </select>
        </div>

        {dateInputs.map((input) => (
          <CalendarInput
            key={input.id}
            id={input.id}
            value={values[input.id]}
            onClick={handleButtonClick}
            isOpen={input.isOpen}
            onDateChange={handleDateChange}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        ))}
        <div id="duration" className="formLine">
          <label htmlFor="duration" className=" formLabel">
            Duration
          </label>
          <select
            id="duration"
            className="inputData"
            required
            value={values.duration}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {durationOptions.map((option) => {
              <option key={option} value={option}>
                {option ? option : "--Select--"}
              </option>;
            })}
          </select>
        </div>
        <div id="comment" className="formLine">
          <label htmlFor="comment_Section" className=" formLabel">
            Comment
          </label>
          <input
            id="comment_Section"
            className="inputData"
            name="comment"
            type="text"
            placeholder="comment"
            value={values.comment}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        {formError && formError}
        <button type="submit">Apply</button>
      </form>
    </div>
  );
}

export default Leaves;
