import React, { useState } from "react";
import { format } from "date-fns";
import { useFormik } from "formik";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { basicSchema } from "../schemas/schema";

function Leaves() {
  const [selected, setSelected] = useState();

  const onSubmit = () => {
    console.log("submitted");
  };

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      type: "",
      fromDate: "",
      toDate: "",
      duration: "",
      comment: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });
  console.log(errors);

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, "PP")}.</p>;
  }
  return (
    <div className="flex flex-col m-10 pb-5">
      <h1 className=" ">Apply Leave</h1>

      <hr />

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="grid grid-cols-1 mt-4 gap-4"
      >
        <div className="formLine ">
          <label htmlFor="leaveType" className=" formLabel">
            Leave Type
          </label>

          <select
            id="leave_type"
            className="inputData"
            type="select"
            required
            placeholder="--select--"
            value={values.type}
            onChange={handleChange}
            onBlur={handleBlur}
          ></select>
        </div>

        <div className="formLine">
          <label htmlFor="from date" className=" formLabel">
            From Date
          </label>
          <input
            id="fromDate"
            className="inputData"
            type="text"
            required
            placeholder="yyyy-mm-dd"
            value={values.fromDate}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div className="formLine">
          <label htmlFor="toDate" className=" formLabel">
            To Date
          </label>

          <input
            id="to_date"
            className="inputData"
            type="text"
            required
            placeholder="yyyy-mm-dd"
            value={values.toDate}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="formLine">
          <label htmlFor="duration" className=" formLabel">
            Duration
          </label>

          <select
            id="duration"
            className="inputData"
            type="select"
            required
            placeholder="yyyy-mm-dd"
            value={values.duration}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {" "}
          </select>
        </div>
        <div className="formLine">
          <label htmlFor="commentSection" className=" formLabel">
            Comment
          </label>

          <input
            id="comment_Section"
            className="inputData"
            type="text"
            placeholder=""
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
