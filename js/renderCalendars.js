function renderCalendars(dates) {
  console.log(dates);
  // const calendarContainers = document.querySelectorAll(".calendarContainer");
  // this dates should be retrieved from the database
  const mainContainer = document.getElementById("main-container");
  mainContainer.innerHTML = "";
  let containers = [];

  for (let i = 0; i < dates.length; i++) {
    const calendarContainer = document.createElement("div");
    calendarContainer.classList.add("calendarContainer");
    mainContainer.appendChild(calendarContainer);
    containers.push(calendarContainer);
  }

  containers.forEach((container, index) => {
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