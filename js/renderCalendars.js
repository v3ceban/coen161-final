// eslint-disable-next-line no-unused-vars
async function renderCalendars(dates, events) {
  document.querySelectorAll(".calendarContainer").forEach((calendar) => {
    if (!dates.includes(calendar.id)) {
      calendar.remove();
    }
  });

  dates = dates.sort();
  const mainContainer = document.getElementById("main-container");

  const usersRes = await fetch("../jsons/data.json");
  const usersJSON = await usersRes.json();

  dates.forEach((date) => {
    const calendarContainer = document.createElement("div");
    calendarContainer.classList.add("calendarContainer");
    calendarContainer.id = `${date}`;
    mainContainer.appendChild(calendarContainer);

    // eslint-disable-next-line no-undef
    let calendar = new FullCalendar.Calendar(calendarContainer, {
      editable: true,
      selectable: true,
      allDaySlot: false,
      select: function(arg) {
        let title = "You";
        const event = calendar.addEvent({
          color: "#6682FC",
          title: title,
          start: arg.start,
          end: arg.end,
          allDay: arg.allDay,
        });
        events.push(event);
        calendar.unselect();
      },
      initialDate: date,
      initialView: "timeGridDay",
      headerToolbar: {
        right: "",
      },
      eventClick: function(info) {
        if (confirm("Are you sure you want to delete this availability?")) {
          if (info.event.title !== "You") {
            alert("You can't delete other person's availability");
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
    if (dates.includes(calendar.el.id)) {
      calendar.render();
    }
  });

  const timeForm = document.getElementById("timeForm");
  timeForm.onsubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(timeForm);
    const dateSelector = document.getElementById("dateSelector");
    formData = Object.fromEntries(formData);
    if (dateSelector.value === "Please select a date first") {
      alert("Please select a date first");
      return;
    }
    let event = {
      title: "You",
      start: dateSelector.value + "T" + formData.start + ":00",
      end: dateSelector.value + "T" + formData.end + ":00",
    };
    if (formData.start === "00:00" && formData.end === "00:00") {
      event.start = dateSelector.value + "T00:00:00";
      event.end = dateSelector.value + "T24:00:00";
    }
    events.push(event);
    renderCalendars([], []);
    renderCalendars(dates, events);
    // alert("Time slot added");
  };
}
