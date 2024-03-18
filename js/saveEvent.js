// eslint-disable-next-line no-unused-vars
function saveEvent() {
  document.getElementById("saveEvent").addEventListener("click", async (e) => {
    e.preventDefault();

    const calendars = document.querySelectorAll(".calendarContainer");
    const dates = [];
    const times = [];

    calendars.forEach((calendar) => {
      const date = calendar.id;
      dates.push(date);
      calendar.querySelectorAll(".fc-event-time").forEach((time, index) => {
        const [start, end] = time.innerText.split(" - ");
        const formattedStart = `T${start}:00`;
        const formattedEnd = `T${end}:00`;
        const title =
          calendar.querySelectorAll(".fc-event-title")[index].innerText;
        times.push({
          title: title,
          start: date + formattedStart,
          end: date + formattedEnd,
        });
      });
    });

    const newEventID = localStorage.getItem("newEventID");
    const userID = localStorage.getItem("userID");
    let name = document.getElementById("event-name-2").textContent;
    if (name === "Event name") {
      name = `New event #${newEventID}`;
    }

    let saveRec = new XMLHttpRequest();
    saveRec.open("POST", "../php/saveEvent.php", true);
    saveRec.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded",
    );

    saveRec.onreadystatechange = function() {
      if (saveRec.readyState === XMLHttpRequest.DONE) {
        if (saveRec.status === 200) {
          alert(`Your event was saved as "${saveRec.responseText}"`);
          document.getElementById("event-name-2").textContent =
            saveRec.responseText;
        } else {
          alert("Error: " + saveRec.status);
        }
      }
    };

    saveRec.send(
      "id=" +
      newEventID +
      "&userID=" +
      userID +
      "&name=" +
      encodeURIComponent(name) +
      "&dates=" +
      encodeURIComponent(JSON.stringify(dates)) +
      "&times=" +
      encodeURIComponent(JSON.stringify(times)),
    );
  });
}

saveEvent();
