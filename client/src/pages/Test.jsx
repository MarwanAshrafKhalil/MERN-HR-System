import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Test = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarOpen, setCalendarOpen] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCalendarOpen(false);
  };

  const handleButtonClick = () => {
    setCalendarOpen(!isCalendarOpen);
  };

  return (
    <div>
      <input type="text" value={selectedDate.toDateString()} readOnly />
      <button onClick={handleButtonClick}>Open Calendar</button>
      {isCalendarOpen && (
        <div className="absolute">
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </div>
      )}
    </div>
  );
};

export default Test;
