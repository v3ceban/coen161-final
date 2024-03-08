function myCalendar() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const yearInput = document.querySelector("select[name='year']");
  const monthInput = document.querySelector("select[name='month']");
  const calendar = [];
  const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function getDayName(firstDay, day) {
    return daysOfTheWeek[(firstDay + (day - 1)) % 7];
  }

  function addYear(year) {
    let newYear = {};
    newYear.year = year;
    newYear.month = [
      { days: 31 },
      { days: 28 },
      { days: 31 },
      { days: 30 },
      { days: 31 },
      { days: 30 },
      { days: 31 },
      { days: 31 },
      { days: 30 },
      { days: 31 },
      { days: 30 },
      { days: 31 },
    ];
    if (year % 4 === 0) {
      newYear.month[1].days = 29;
    }
    for (let i = 0; i < 12; i++) {
      newYear.month[i].firstDay = new Date(year, i, 1).getDay();
    }
    calendar.push(newYear);
  }

  function getMonthName(month) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[month];
  }

  function setDays() {
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);
    const thisMonth = calendar.find((y) => y.year === year).month[month];
    const days = thisMonth.days;
    const firstDay = thisMonth.firstDay;
    const calendarContainer = document.getElementById("calendar");
    calendarContainer.innerHTML = "";
    daysOfTheWeek.forEach((day) => {
      const p = document.createElement("p");
      p.textContent = day.substring(0, 1);
      p.className = day;
      calendarContainer.appendChild(p);
    });
    for (let i = 1; i <= days; i++) {
      const label = document.createElement("label");
      label.innerHTML = `${i}<input type="checkbox" name="day" value="${i}" />`;
      label.className = getDayName(firstDay, i);
      calendarContainer.appendChild(label);
    }
  }

  for (let i = 0; i < 5; i++) {
    if (i === 0) {
      addYear(currentYear);
    } else {
      addYear(currentYear - i);
      addYear(currentYear + i);
    }
  }
  calendar.sort((a, b) => a.year - b.year);

  for (let i = 0; i < calendar.length; i++) {
    const optionYear = document.createElement("option");
    optionYear.value = calendar[i].year;
    optionYear.textContent = calendar[i].year;
    yearInput.appendChild(optionYear);
    yearInput.value = currentYear;
  }

  for (let i = 0; i < 12; i++) {
    const optionMonth = document.createElement("option");
    optionMonth.value = i;
    optionMonth.textContent = getMonthName(i);
    monthInput.appendChild(optionMonth);
    monthInput.value = currentMonth;
  }

  yearInput.addEventListener("change", setDays);
  monthInput.addEventListener("change", setDays);
  document.addEventListener("DOMContentLoaded", setDays);
}

myCalendar();
