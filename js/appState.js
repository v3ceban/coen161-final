function changeAppState(toDisplay) {
  const states = ["login", "profile", "event", "preview"];
  const header = document.querySelector("header");
  const profileButton = document.querySelector("header button");
  let currentState;

  states.forEach((state) => {
    const stateElement = document.getElementById(state);
    if (state === toDisplay) {
      currentState = state;
      stateElement.style.display = "block";
    } else {
      stateElement.style.display = "none";
      stateElement.style.animation =
        "fade-in 0.9s cubic-bezier(0.390, 0.575, 0.565, 1.000) both";
    }
  });

  if (currentState === "login") {
    header.style.placeContent = "center";
    profileButton.style.display = "none";
  } else {
    header.style.placeContent = "space-between";
    profileButton.style.display = "flex";
  }

  return currentState;
}

changeAppState("login");
