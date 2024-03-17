// eslint-disable-next-line no-unused-vars
function logoutUser() {
  localStorage.removeItem("newEventID");

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
}
