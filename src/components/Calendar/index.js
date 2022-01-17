import React, { useEffect, useState } from "react";
import moment from "moment";
function Calendar({
  checkInDate,
  checkOutDate,
  currentMonth,
  currentYear,
  daysInMonth,
  daysInYear,
  prevMonth,
  handleChangeMonth,
  nextMonth,
  selectDate,
  selectedItems,
  visibleCheck,
  handleChangeYear,
}) {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const minYears = Array(currentYear - (currentYear - 20))
    .fill("")
    .map((v, idx) => currentYear - 1 - idx);
  const maxYears = Array(currentYear + 20 - currentYear)
    .fill("")
    .map((v, idx) => currentYear + idx);
  const years = [...minYears.reverse(), ...maxYears];

  //Seçilen ayları koyulaştır
  const setColor = (item) => {
    if (checkInDate === item || checkOutDate === item) {
      return "#1a8fffb5";
    }
  };

  return (
    <div className="wrapper">
      <div className="calendar">
        <header className="header">
          <div>
            <button className="btn-close" onClick={() => visibleCheck("close")}>
              X
            </button>
          </div>
          <div>
            <button className="btn-arrow" onClick={() => prevMonth()}>
              <span className="material-icons">arrow_back_ios</span>
            </button>
          </div>
          <div className="show-now">
            <select
              className="select-month"
              name="calendarId"
              value={currentMonth + 1}
              onChange={(e) => handleChangeMonth(e)}
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {moment()
                    .month(month - 1)
                    .format("MMM")}
                </option>
              ))}
            </select>
          </div>
          <div className="show-now">
            <select
              className="select-year"
              name="calendarId"
              value={currentYear}
              onChange={(e) => handleChangeYear(e)}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {moment().year(year).format("YYYY")}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button className="btn-arrow" onClick={() => nextMonth()}>
              <span className="material-icons">arrow_forward_ios</span>
            </button>
          </div>
        </header>
        <div>
          <div className="days">
            {daysInMonth.map((item) => (
              <button
                key={item}
                className={selectedItems(item)}
                style={{ backgroundColor: setColor(item), cursor: "pointer" }}
                onClick={() => selectDate(item)}
              >
                {item.slice(0, 2)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
