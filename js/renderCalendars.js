// eslint-disable-next-line no-unused-vars
function renderCalendars(dates, events) {
  dates = dates.sort();
  const mainContainer = document.getElementById("main-container");

  dates.forEach((date) => {
    const calendarContainer = document.createElement("div");
    calendarContainer.classList.add("calendarContainer");
    calendarContainer.id = `${date}`;
    if (!document.getElementById(`${date}`)) {
      mainContainer.appendChild(calendarContainer);
    }

    // eslint-disable-next-line no-undef
    let calendar = new FullCalendar.Calendar(calendarContainer, {
      editable: true,
      selectable: true,
      select: function(arg) {
        let title = "You";
        calendar.addEvent({
          color: "#6682FC",
          title: title,
          start: arg.start,
          end: arg.end,
          allDay: arg.allDay,
          overlap: false,
        });
        calendar.unselect();
      },
      initialDate: date,
      initialView: "timeGridDay",
      headerToolbar: {
        right: "",
      },
      eventOverlap: false,
      eventClick: function(info) {
        if (confirm("Are you sure you want to delete this event?")) {
          info.event.remove(); // Delete the clicked event
        }
      },
      eventTimeFormat: {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      },
    });
    events.forEach((event) => {
      event.editable = true;
      event.color = "#6682FC";
      event.overlap = false;
      calendar.addEvent(event);
    });
    calendar.render();
  });
}
