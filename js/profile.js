// eslint-disable-next-line no-unused-vars
async function displayProfileEvents(userID) {
  const usersRes = await fetch("../jsons/data.json");
  const usersJSON = await usersRes.json();
  const eventsRes = await fetch("../jsons/info.json");
  const eventsJSON = await eventsRes.json();
  const events = [];

  eventsJSON.forEach((obj) => {
    if (obj.users.split(",").includes(userID)) {
      events.push(obj.eventID);
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
    div.innerHTML = `
      <h2>${eventsJSON[event - 1].name}</h2>
      <p>Dates: ${eventsJSON[event - 1].days.map((obj) => obj.date).join(", ")}</p>
      <button>View</button>
      <button class="danger">Delete</button>
    `;
    document.querySelector("#userEvents").appendChild(div);
  });
}

function profileSettings() {
  const profileButton = document.querySelector("header button");
  let currentState;
  profileButton.addEventListener("click", (e) => {
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
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../php/login.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("logout=true");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // eslint-disable-next-line no-undef
          currentState = changeAppState("login");
        } else {
          alert("Error: " + xhr.status);
        }
      }
    };
    profileButton
      .querySelector("span")
      .classList.replace("fa-xmark", "fa-bars");
  });
}

profileSettings();
