function saveEvent() {
  document
    .getElementById("shareForm")
    .querySelectorAll("button")[0]
    .addEventListener("click", (e) => {
      e.preventDefault();
      // send data to saveEvent.php
      console.log(document.getElementById("event-name-2").textContent);
      console.log(localStorage.getItem("userID"));
      console.log(localStorage.getItem("dates"));
      console.log(localStorage.getItem("events"));
    });
}

saveEvent();
