function renderCalendars() {
  const calendarContainer = document.getElementById("calendarsContainer");
  // eslint-disable-next-line no-undef
  let calendar = new FullCalendar.Calendar(calendarContainer, {
    initialDate: "2024-01-31",
    // initialView: "dayGridDay",
    headerToolbar: {
      right: "",
    },
  });
  calendar.render();
}

renderCalendars();
