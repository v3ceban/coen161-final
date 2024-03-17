// eslint-disable-next-line no-unused-vars
function saveEvent() {
  document.getElementById("saveEvent").addEventListener("click", async (e) => {
    e.preventDefault();

    const calendars = document.querySelectorAll(".calendarContainer");
    const dates = [];
    const startTimes = [];
    const endTimes = [];

    calendars.forEach((calendar) => {
      const date = calendar.id;
      dates.push(date);
      calendar.querySelectorAll(".fc-event-time").forEach((time) => {
        const [start, end] = time.innerText.split(" - ");
        const formattedStart = `T${start}:00`;
        const formattedEnd = `T${end}:00`;
        startTimes.push(date + formattedStart);
        endTimes.push(date + formattedEnd);
      });
    });

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../php/login.php", true);
    xhr.send();

    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          if (
            !isNaN(xhr.responseText) &&
            xhr.responseText > 0 &&
            xhr.responseText !== ""
          ) {
            const newEventID = localStorage.getItem("newEventID");
            const userID = xhr.responseText;
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

            saveRec.send(
              "id=" +
              newEventID +
              "&name=" +
              encodeURIComponent(name) +
              "&userID=" +
              userID +
              "&dates=" +
              encodeURIComponent(JSON.stringify(dates)) +
              "&startTimes=" +
              encodeURIComponent(JSON.stringify(startTimes)) +
              "&endTimes=" +
              encodeURIComponent(JSON.stringify(endTimes)),
            );

            saveRec.onreadystatechange = function() {
              if (saveRec.readyState === XMLHttpRequest.DONE) {
                if (saveRec.status === 200) {
                  console.log(saveRec.responseText);
                } else {
                  console.error("Error: " + saveRec.status);
                }
              }
            };
          } else {
            // eslint-disable-next-line no-undef
            logoutUser();
          }
        } else {
          console.error("Error: " + xhr.status);
        }
      }
    };
  });
}

saveEvent();
