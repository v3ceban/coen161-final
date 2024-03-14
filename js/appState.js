function changeAppState(toDisplay) {
  const states = ["login", "account", "create", "preview"];

  states.forEach((state) => {
    if (state === toDisplay) {
      document.getElementById(state).style.display = "block";
    } else {
      document.getElementById(state).style.display = "none";
    }
  });
}

changeAppState("login");
