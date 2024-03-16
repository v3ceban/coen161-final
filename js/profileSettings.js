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
          changeAppState("login");
        } else {
          alert("Error: " + xhr.status);
        }
      }
    };
  });
}

profileSettings();
