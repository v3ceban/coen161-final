// eslint-disable-next-line no-unused-vars
async function displayProfileEvents(userID) {
  const usersRes = await fetch("../jsons/data.json");
  const usersJSON = await usersRes.json();
  const eventsRes = await fetch("../jsons/events.json");
  const eventsJSON = await eventsRes.json();
  const events = [];
  const eventsContainer = document.querySelector("#userEvents");
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
  let currentState;
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
          } else {
            profileButton
              .querySelector("span")
              .classList.replace("fa-xmark", "fa-bars");
            currentState = "login";
            // eslint-disable-next-line no-undef
            logoutUser();
          }
        } else {
          console.error("Error: " + xhr.status);
        }
      }
    };

    e.preventDefault();
    if (currentState !== "profile") {
      // eslint-disable-next-line no-undef
      currentState = changeAppState("profile");
      profileButton
        .querySelector("span")
        .classList.replace("fa-bars", "fa-xmark");
    } else {
      // eslint-disable-next-line no-undef
      currentState = changeAppState("event");
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
    currentState = "login";
    profileButton
      .querySelector("span")
      .classList.replace("fa-xmark", "fa-bars");
  });
}

profileSettings();
