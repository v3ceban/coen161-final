let eventNameButton = document.getElementById("event-name-button");
eventNameButton.addEventListener("click", (e) => {
  e.preventDefault();
  let eventName = document.getElementById("event-name");
  let eventName2 = document.getElementById("event-name-2");
  let name = document.getElementById("event-name-input").value;
  if (name === "") {
    alert("Please enter a name for the event");
    return;
  }
  eventName.innerHTML = name;
  eventName2.innerHTML = name;
  // Send to PHP
});
