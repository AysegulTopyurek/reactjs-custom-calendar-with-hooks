import React, { useState } from "react";
import Calendar from "../../components/Calendar";
import moment from "moment";
import "moment/locale/tr";
moment.locale("tr");

const Home = () => {
  const [checkIn, setCheckIn] = useState(false); //check-in görünürlüğü
  const [checkOut, setCheckOut] = useState(false); //check-out görünürlüğü
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const daysInYear = [];
  const daysInMonth = [];

  const getAllDaysInMonth = (month, year) => {
    var date = new Date(year, month, 1);

    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    console.log(days.toLocaleString());
    return days;
  };
  const getAllDays = (month) => {
    return getAllDaysInMonth(month, currentYear).map((x) =>
      x.toLocaleDateString("en-GB", {
        // you can use undefined as first argument
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    );
  };

  //12 ayın bütün günlerini arraye push eder
  for (let i = 0; i < 12; i++) {
    daysInYear.push(getAllDays(i));
  }

  // 12 ay içerisindeki mevcut ayın günlerini alır ve daysInMontha push eder
  for (let i = 0; i < daysInYear[currentMonth].length; i++) {
    daysInMonth.push(daysInYear[currentMonth][i]);
  }

  //takvimde geri gitme
  const prevMonth = () => {
    if (currentMonth <= 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  //takvimde ileri gitme
  const nextMonth = () => {
    if (currentMonth >= 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  //Seçilen ayın renklerini koyulaştırmak için günleri belirler
  const selectDate = (item) => {
    if (checkInDate === null) {
      setCheckInDate(item);
    } else if (checkInDate != null && checkOutDate === null) {
      setCheckOutDate(item);
    } else {
      setCheckInDate(item);
      setCheckOutDate(null);
    }
  };
  //Seçilen aynı ayın içindeki aralıkları  koyulaştır. Class binding
  const selectedItems = (days) => {
    let handledDays = moment(days, "DD/MM/YYYY");
    let handledCheckInDate = moment(checkInDate, "DD/MM/YYYY");
    let handledCheckOutDate = moment(checkOutDate, "DD/MM/YYYY");

    if (handledDays > handledCheckInDate && handledDays < handledCheckOutDate) {
      return "selected";
    }

    if (handledDays > handledCheckOutDate && handledDays < handledCheckInDate) {
      setCheckInDate(checkOutDate);
      setCheckOutDate(checkInDate);

      return "selected";
    }
  };

  const handleChangeMonth = (e) => {
    setCurrentMonth(Number(e.target.value) - 1);
  };
  const handleChangeYear = (e) => {
    setCurrentYear(Number(e.target.value));
  };
  //check-in check-out butonlarının görünürlüğü
  const visibleCheck = (status) => {
    if (status === "in") {
      setCheckIn(true);
      setCheckOut(false);
    } else if (status === "out") {
      setCheckIn(false);
      setCheckOut(true);
    } else {
      setCheckIn(false);
      setCheckOut(false);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="container">
        <div className="date-picker">
          <div className="checked-date">{checkInDate}</div>
          <button className="btn-date" onClick={() => visibleCheck("in")}>
            CheckIn
          </button>
          {checkIn && (
            <div>
              <Calendar
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                currentMonth={currentMonth}
                currentYear={currentYear}
                daysInMonth={daysInMonth}
                daysInYear={daysInYear}
                prevMonth={prevMonth}
                handleChangeMonth={handleChangeMonth}
                nextMonth={nextMonth}
                selectDate={selectDate}
                selectedItems={selectedItems}
                visibleCheck={visibleCheck}
                handleChangeYear={handleChangeYear}
              />
            </div>
          )}
        </div>
        <div className="date-picker">
          <div className="checked-date">{checkOutDate}</div>
          <button className="btn-date" onClick={() => visibleCheck("out")}>
            CheckOut
          </button>
          {checkOut && (
            <div>
              <Calendar
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                currentMonth={currentMonth}
                currentYear={currentYear}
                daysInMonth={daysInMonth}
                daysInYear={daysInYear}
                prevMonth={prevMonth}
                handleChangeMonth={handleChangeMonth}
                nextMonth={nextMonth}
                selectDate={selectDate}
                selectedItems={selectedItems}
                visibleCheck={visibleCheck}
                handleChangeYear={handleChangeYear}
              />
            </div>
          )}
        </div>
      </div>
      <footer>
        <p>
          Bu Proje <b>Ayşegül TOPYÜREK</b> tarafından yapılmıştır.
        </p>
        <div className="btn-set">
          <a
            href="https://github.com/AysegulTopyurek"
            target={"_blank"}
            rel={"noReferrer"}
          >
            <img
              src={require("../../assets/github.svg").default}
              alt="github"
            />
          </a>
          <a
            href={"https://www.linkedin.com/in/aysegultopyurek/"}
            target={"_blank"}
            rel={"noReferrer"}
          >
            <img
              src={require("../../assets/linkedin.svg").default}
              alt="linkedin"
            />
          </a>
        </div>
      </footer>
    </div>
  );
};
export default Home;
