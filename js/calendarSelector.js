/* eslint-disable no-undef */
function myCalendarSelector() {
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
  let dates = [];
  let isDragging = false;

  window.addEventListener("mousedown", () => {
    isDragging = true;
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  function toTwoDigits(num) {
    return String(num).padStart(2, "0");
  }

  function getDayName(firstDay, day) {
    return daysOfTheWeek[(firstDay + (day - 1)) % 7];
  }

  function createLabel(day, year, month, value, firstDay, index) {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "day";
    checkbox.value = `${toTwoDigits(year)} - ${toTwoDigits(month)} - ${toTwoDigits(value)}`;
    checkbox.addEventListener("click", (e) => {
      e.preventDefault();
    });

    label.appendChild(document.createTextNode(day));
    label.appendChild(checkbox);

    label.className = getDayName(firstDay, index);

    label.addEventListener("mousedown", () => {
      checkbox.checked = !checkbox.checked;
      const value = checkbox.value.replace(/\s/g, "");
      if (checkbox.checked) {
        label.classList.add("active");
      } else {
        label.classList.remove("active");
      }
      if (checkbox.checked && !dates.includes(value)) {
        dates.push(value);
      } else if (!checkbox.checked && dates.includes(value)) {
        dates = dates.filter((date) => date !== value);
      }
      updateSelector(dates);
      renderCalendars(dates);
    });

    label.addEventListener("mouseover", () => {
      if (isDragging) {
        const currentCheckbox = checkbox;
        const value = checkbox.value.replace(/\s/g, "");
        label.classList.toggle("active");
        currentCheckbox.checked = !currentCheckbox.checked;
        if (checkbox.checked && !dates.includes(value)) {
          dates.push(value);
        } else if (!checkbox.checked && dates.includes(value)) {
          dates = dates.filter((date) => date !== value);
        }
        updateSelector(dates);
        renderCalendars(dates);
      }
    });

    return label;
  }

  // Year object
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

  // Function to display the calendar
  function setDays() {
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);
    const thisMonth = calendar.find((y) => y.year === year).month[month];
    const days = thisMonth.days;
    const firstDay = thisMonth.firstDay;
    const calendarContainer = document.getElementById("calendar");
    calendarContainer.innerHTML = "";

    // Fill days of the week
    daysOfTheWeek.forEach((day) => {
      const p = document.createElement("p");
      p.textContent = day.substring(0, 3);
      p.className = day;
      calendarContainer.appendChild(p);
    });

    // Get number of days to display for previous and next months
    const prevMonthDays = new Date(year, month, 0).getDate();
    const nextMonthDays = 42 - days - firstDay;

    // Fill previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const label = createLabel(
        prevMonthDays - i,
        year,
        month,
        prevMonthDays - i,
        firstDay,
        -i,
      );
      label.style.gridRow = 2;
      label.classList.add("notCurrent");
      calendarContainer.appendChild(label);
    }

    // Fill current month days
    for (let i = 1; i <= days; i++) {
      const row = Math.ceil((i + firstDay) / 7) + 1;
      const label = createLabel(i, year, month + 1, i, firstDay, i);
      label.style.gridRow = row;
      calendarContainer.appendChild(label);
    }

    // Fill next month days
    for (let i = 1; i <= nextMonthDays; i++) {
      const nextMonth = month === 11 ? 1 : month + 2;
      const nextYear = month === 11 ? year + 1 : year;
      const label = createLabel(i, nextYear, nextMonth, i, firstDay, days + i);
      label.classList.add("notCurrent");
      label.style.gridRow = Math.ceil((days + firstDay + i) / 7) + 1;
      calendarContainer.appendChild(label);
    }
  }

  // Add 5 years
  for (let i = 0; i < 5; i++) {
    if (i === 0) {
      addYear(currentYear);
    } else {
      addYear(currentYear + i);
    }
  }
  calendar.sort((a, b) => a.year - b.year);

  // Add options for each year
  for (let i = 0; i < calendar.length; i++) {
    const optionYear = document.createElement("option");
    optionYear.value = calendar[i].year;
    optionYear.textContent = calendar[i].year;
    yearInput.appendChild(optionYear);
    yearInput.value = currentYear;
  }

  // Add options for each month
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

myCalendarSelector();
