import React, { useState } from "react";

import { useFormik } from "formik";
import Calendar from "react-calendar";
import CalendarInput from "../components/CalenderInput";
import "react-calendar/dist/Calendar.css";
import { CalendarMonth } from "@mui/icons-material";
import { basicSchema } from "../schemas/schema";

function Leaves() {
  const [dateInputs, setDateInputs] = useState([
    { id: "fromCalendar", isOpen: false },
    { id: "toCalendar", isOpen: false },
  ]);

  const handleDateChange = (id, date) => {
    console.log(date);
    console.log(id);
    setDateInputs((prevInputs) => {
      return prevInputs.map((input) => {
        if (input.id === id) {
          handleChange({
            target: { name: input.id, value: date },
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

  const onSubmit = async (values, actions) => {
    console.log("submitted");
    console.log(values);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
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
  console.log(values);
  // console.log(errors);

  const leaveTypeOptions = ["", "Annual", "Casual"];

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

        {/* {dateInputs.map((input) => (
          <div key={input.id} className="formLine">
            <label htmlFor={input.id} className=" formLabel">
              {input.id === "fromCalendar" ? "From Date" : "To Date"}
            </label>
            <input
              id={`${input.id}`}
              className="inputData "
              type="text"
              name={input.id}
              required
              placeholder="yyyy-mm-dd"
              value={values[`${input.id}`]} ////hereee
              readOnly
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <button
              id={input.id}
              type="button"
              className="calendar-button"
              onClick={handleButtonClick}
            >
              <CalendarMonth id={input.id} />
            </button>
            {input.isOpen && (
              <div>
                <Calendar
                  className="absolute inset-x-auto "
                  onChange={(date) => handleDateChange(input.id, date)}
                />
              </div>
            )}
          </div>
        ))} */}

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
            <option value="">--Select--</option>
            <option value="HalfDay">Half Day</option>
            <option value="FullDay">Full Day</option>
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

        <button type="submit">Apply</button>
      </form>
    </div>
  );
}

export default Leaves;
