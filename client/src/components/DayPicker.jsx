import React, { useState } from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarOpen, setCalendarOpen] = useState(false);

  const handleDayClick = (day) => {
    setSelectedDate(day);
    setCalendarOpen(false);
  };

  return (
    <div className="flex items-center relative">
      <input
        type="text"
        value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
        readOnly
        className="border p-2 rounded-md mr-2"
      />

      <button
        onClick={() => setCalendarOpen(!isCalendarOpen)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Open Calendar
      </button>

      {isCalendarOpen && (
        <DayPicker
          selected={selectedDate}
          onDayClick={handleDayClick}
          className="absolute mt-2"
        />
      )}
    </div>
  );
};

export default DatePicker;
