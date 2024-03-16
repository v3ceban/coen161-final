// eslint-disable-next-line no-unused-vars
function renderCalendars(dates, events) {
  dates = dates.sort();
  localStorage.setItem("dates", JSON.stringify(dates));
  localStorage.setItem("events", JSON.stringify(events));
  const mainContainer = document.getElementById("main-container");

  const observer = new MutationObserver(() => {
    if (document.getElementById("preview").style.display !== "none") {
      dates.forEach((date) => {
        const calendarContainer = document.createElement("div");
        calendarContainer.classList.add("calendarContainer");
        calendarContainer.id = `cal_date:${date}`;
        if (!document.getElementById(`cal_date:${date}`)) {
          mainContainer.appendChild(calendarContainer);
        }

        // eslint-disable-next-line no-undef
        let calendar = new FullCalendar.Calendar(calendarContainer, {
          initialDate: date,
          initialView: "timeGridDay",
          headerToolbar: {
            right: "",
          },
        });
        events.forEach((event) => {
          event.editable = true;
          event.color = "#6682FC";
          calendar.addEvent(event);
        });
        // console.log(date, events);
        calendar.render();
      });
    }
  });

  observer.observe(document.getElementById("preview"), { attributes: true });
}
