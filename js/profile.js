let currentSettingsState;

// eslint-disable-next-line no-unused-vars
async function displayProfileEvents(userID) {
  const usersRes = await fetch("../jsons/data.json");
  const usersJSON = await usersRes.json();
  const eventsRes = await fetch("../jsons/events.json");
  const eventsJSON = await eventsRes.json();
  const events = [];
  const eventsContainer = document.querySelector("#profileEventsContainer");
  eventsContainer.innerHTML = "";

  eventsJSON.forEach((obj) => {
    if (obj.participants.includes(userID)) {
      events.push(obj);
    }
  });

  usersJSON.forEach((obj) => {
    if (obj.id === userID) {
      const userName = obj.email.split("@")[0];
      document.querySelector("#profile-name").textContent = userName;
    }
  });

  events.forEach((event) => {
    const div = document.createElement("div");
    div.classList.add("card");
    const h2 = document.createElement("h2");
    h2.textContent = event.name;

    const p = document.createElement("p");
    p.textContent = "Dates: " + event.dates.join(", ");

    const viewButton = document.createElement("button");
    viewButton.textContent = "View";
    viewButton.addEventListener("click", () => {
      document.getElementById("event-name-2").textContent = event.name;
      document.querySelectorAll("#event>section")[0].style.display = "none";
      localStorage.setItem("displayedEventID", event.id);
      // eslint-disable-next-line no-undef
      prepareCalendars();
      // eslint-disable-next-line no-undef
      renderCalendars(event.dates, event.times);
      // eslint-disable-next-line no-undef
      currentSettingsState = changeAppState("event");
      document
        .querySelector("header button")
        .querySelector("span")
        .classList.replace("fa-xmark", "fa-bars");
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("danger");

    div.appendChild(h2);
    div.appendChild(p);
    div.appendChild(viewButton);
    div.appendChild(deleteButton);

    eventsContainer.appendChild(div);
  });
}

function profileSettings() {
  const profileButton = document.querySelector("header button");
  profileButton.addEventListener("click", (e) => {
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
            displayProfileEvents(xhr.responseText);
            const eventsContainer = document.querySelector("#userEvents");
            const newEvent = document.createElement("button");
            newEvent.textContent = "Create new event";
            newEvent.addEventListener("click", () => {
              let newID = localStorage.getItem("newEventID");
              newID++;
              document.querySelectorAll("#event>section")[0].style.display = "block";
              localStorage.setItem("newEventID", newID);
              localStorage.setItem("displayedEventID", newID);
              // eslint-disable-next-line no-undef
              prepareCalendars();
              // eslint-disable-next-line no-undef
              renderCalendars([], []);
              // eslint-disable-next-line no-undef
              currentSettingsState = changeAppState("event");
              profileButton
                .querySelector("span")
                .classList.replace("fa-xmark", "fa-bars");
            });
            if (eventsContainer.children.length === 1) {
              eventsContainer.prepend(newEvent);
            }
          } else {
            profileButton
              .querySelector("span")
              .classList.replace("fa-xmark", "fa-bars");
            currentSettingsState = "login";
            // eslint-disable-next-line no-undef
            logoutUser();
          }
        } else {
          console.error("Error: " + xhr.status);
        }
      }
    };

    e.preventDefault();
    if (currentSettingsState !== "profile") {
      // eslint-disable-next-line no-undef
      currentSettingsState = changeAppState("profile");
      profileButton
        .querySelector("span")
        .classList.replace("fa-bars", "fa-xmark");
    } else {
      // eslint-disable-next-line no-undef
      currentSettingsState = changeAppState("event");
      profileButton
        .querySelector("span")
        .classList.replace("fa-xmark", "fa-bars");
    }
  });

  const profileSelect = document.querySelector(
    "#profile select[name='profile']",
  );
  profileSelect.addEventListener("change", (e) => {
    if (e.target.value === "myEvents") {
      document.querySelectorAll("#profile section")[0].style.display = "block";
      document.querySelectorAll("#profile section")[1].style.display = "none";
    } else {
      document.querySelectorAll("#profile section")[0].style.display = "none";
      document.querySelectorAll("#profile section")[1].style.display = "block";
    }
  });

  const logoutButton = document.querySelector("#profile>button");
  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-undef
    logoutUser();
    // eslint-disable-next-line no-undef
    currentSettingsState = "login";
    profileButton
      .querySelector("span")
      .classList.replace("fa-xmark", "fa-bars");
  });
}

profileSettings();
