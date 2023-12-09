import React from "react";
import Calendar from "react-calendar";
import { CalendarMonth } from "@mui/icons-material";

const CalenderInput = ({
  id,
  value,
  onClick,
  isOpen,
  onDateChange,
  handleChange,
  handleBlur,
}) => (
  <div key={id} className="formLine">
    <label htmlFor={id} className="formLabel">
      {id === "fromCalendar" ? "From Date" : "To Date"}
    </label>
    <input
      id={id}
      className="inputData"
      type="text"
      name={id}
      required
      placeholder="yyyy-mm-dd"
      value={value}
      readOnly
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <button id={id} type="button" className="calendar-button" onClick={onClick}>
      <CalendarMonth id={id} />
    </button>
    {isOpen && (
      <div>
        <Calendar
          className="absolute inset-x-auto "
          onChange={(date) => onDateChange(id, date)}
        />
      </div>
    )}
  </div>
);

export default CalenderInput;
