function myCalendar() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const yearInput = document.querySelector("select[name='year']")
  const monthInput = document.querySelector("select[name='month']");
  const calendar = [];

  function addYear(year) {
    let newYear = {};
    newYear.year = year;
    newYear.month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 4 === 0) {
      newYear.month[1] = 29;
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

  yearInput.addEventListener("change", () => {
    monthInput.value = 0;
    monthInput.dispatchEvent(new Event('change'));
  });

  monthInput.addEventListener("change", (e) => {
    const month = parseInt(e.target.value);
    const year = parseInt(yearInput.value);
    const monthName = getMonthName(month);
    const days = calendar.find((y) => y.year === year).month[month];
    alert(`${monthName} has ${days} days.`);
  });
}

myCalendar();
