// eslint-disable-next-line no-unused-vars
async function renderCalendars(dates, events) {
  dates = dates.sort();
  console.log(localStorage.getItem("displayedEventID"));
  const mainContainer = document.getElementById("main-container");

  const usersRes = await fetch("../jsons/data.json");
  const usersJSON = await usersRes.json();

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
        });
        calendar.unselect();
      },
      initialDate: date,
      initialView: "timeGridDay",
      headerToolbar: {
        right: "",
      },
      eventClick: function(info) {
        if (confirm("Are you sure you want to delete this event?")) {
          if (info.event.title !== "You") {
            alert("You can't delete other people's availability");
            return;
          }
          info.event.remove();
        }
      },
      eventTimeFormat: {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      },
    });
    events.forEach((event) => {
      usersJSON.forEach((user) => {
        if (event.title === localStorage.getItem("userID")) {
          event.title = "You";
          event.editable = true;
        } else if (event.title === user.id.toString()) {
          event.title = user.email;
          event.editable = false;
        }
      });
      event.color = "#6682FC";
      calendar.addEvent(event);
    });
    calendar.render();
  });

  document.querySelectorAll(".calendarContainer").forEach((calendar) => {
    if (!dates.includes(calendar.id)) {
      calendar.remove();
    }
  });
}
