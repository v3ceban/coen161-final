function renderCalendars() {
  const calendarContainers = document.querySelectorAll(".calendarContainer");
  // this dates should be retrieved from the database
  const dates = ["2024-01-31", "2024-02-01"];

  calendarContainers.forEach((container, index) => {
    // eslint-disable-next-line no-undef
    let calendar = new FullCalendar.Calendar(container, {
      initialDate: dates[index],
      initialView: "dayGridDay",
      headerToolbar: {
        right: "",
      },
    });
    // also need a way to render events for each day
    calendar.render();
  });
}

renderCalendars();
