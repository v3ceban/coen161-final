function hashPassword(password) {
  let hash = 0;
  if (password.length === 0) {
    return hash;
  }
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
}

async function userAuthentication(userID) {
  if (!isNaN(userID) && userID > 0 && userID !== "") {
    // eslint-disable-next-line no-undef
    displayProfileEvents(userID);
    localStorage.setItem("userID", userID);
    const eventsRes = await fetch("../jsons/events.json");
    const eventsJSON = await eventsRes.json();
    const newEventID = eventsJSON[eventsJSON.length - 1].id + 1;
    localStorage.setItem("newEventID", newEventID);

    // eslint-disable-next-line no-undef
    prepareCalendars();
    // eslint-disable-next-line no-undef
    renderCalendars([], []);
    document.querySelectorAll("#event>section")[0].style.display = "block";
    document.getElementById("event-name-2").textContent =
      document.getElementById("event-name").textContent;
    // eslint-disable-next-line no-undef
    changeAppState("event");
    return true;
  } else {
    return false;
  }
}

async function loginForm() {
  document.addEventListener("DOMContentLoaded", async () => {
    let checkSessionRec = new XMLHttpRequest();
    checkSessionRec.open("POST", "../php/login.php", true);
    checkSessionRec.send();
    checkSessionRec.onreadystatechange = function() {
      if (checkSessionRec.readyState === XMLHttpRequest.DONE) {
        if (checkSessionRec.status === 200) {
          userAuthentication(checkSessionRec.responseText);
        } else {
          console.error("Error: " + checkSessionRec.status);
        }
      }
    };
  });

  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    let loginRec = new XMLHttpRequest();
    loginRec.open("POST", "../php/login.php", true);
    loginRec.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded",
    );
    loginRec.send(
      "email=" + data.email + "&password=" + hashPassword(data.password),
    );
    loginRec.onreadystatechange = function() {
      (async () => {
        if (loginRec.readyState === XMLHttpRequest.DONE) {
          if (loginRec.status === 200) {
            if (
              (await userAuthentication(loginRec.responseText)) === true &&
              loginRec.responseText !== "User not found"
            ) {
              form.reset();
            } else {
              alert("Invalid email or password");
            }
          } else {
            console.error("Error: " + loginRec.status);
          }
        }
      })();
    };
    return;
  });

  form.querySelectorAll("a").forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      if (index === 0) {
        const overlay = document.createElement("div");
        overlay.setAttribute("id", "overlay");

        const overlayForm = document.createElement("form");
        overlayForm.setAttribute("method", "POST");
        overlayForm.classList.add("container");

        const h2 = document.createElement("h2");
        h2.textContent = "Reset password";
        overlayForm.appendChild(h2);

        const p = document.createElement("p");
        p.textContent =
          "Enter your email address and we will send you a link to reset your password.";
        overlayForm.appendChild(p);

        const labelEmail = document.createElement("label");
        labelEmail.textContent = "Email";
        const inputEmail = document.createElement("input");
        inputEmail.setAttribute("type", "email");
        inputEmail.setAttribute("name", "email");
        inputEmail.setAttribute("placeholder", "Email");
        inputEmail.setAttribute("required", "");
        labelEmail.appendChild(inputEmail);

        const submitButton = document.createElement("button");
        submitButton.setAttribute("type", "submit");
        submitButton.textContent = "Reset password";
        submitButton.classList.add("danger");
        submitButton.addEventListener("click", (e) => {
          e.preventDefault();
          const formData = new FormData(overlayForm);
          const data = Object.fromEntries(formData);
          let resetPassRec = new XMLHttpRequest();
          resetPassRec.open("POST", "../php/resetPassword.php", true);
          resetPassRec.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded",
          );
          resetPassRec.send("email=" + data.email);
          resetPassRec.onreadystatechange = function() {
            if (resetPassRec.readyState === XMLHttpRequest.DONE) {
              if (resetPassRec.status === 200) {
                if (!document.getElementById("rickroll")) {
                  overlayForm.innerHTML += resetPassRec.responseText;
                  document.getElementById("rickroll").click();
                  document.getElementById("rickroll").remove();
                  document.body.removeChild(overlay);
                }
              } else {
                console.error("Error: " + resetPassRec.status);
              }
            }
          };
        });

        const cancelButton = document.createElement("button");
        cancelButton.setAttribute("type", "reset");
        cancelButton.textContent = "Cancel";
        cancelButton.classList.add("warning");
        cancelButton.addEventListener("click", () => {
          document.body.removeChild(overlay);
        });

        overlayForm.appendChild(labelEmail);
        overlayForm.appendChild(submitButton);
        overlayForm.appendChild(cancelButton);

        overlay.appendChild(overlayForm);
        document.body.appendChild(overlay);
      } else {
        const overlay = document.createElement("div");
        overlay.setAttribute("id", "overlay");

        const overlayForm = document.createElement("form");
        overlayForm.setAttribute("method", "POST");
        overlayForm.classList.add("container");

        const h2 = document.createElement("h2");
        h2.textContent = "Create an account";
        overlayForm.appendChild(h2);

        const labelEmail = document.createElement("label");
        labelEmail.textContent = "Email";
        const inputEmail = document.createElement("input");
        inputEmail.setAttribute("type", "email");
        inputEmail.setAttribute("name", "email");
        inputEmail.setAttribute("placeholder", "Email");
        inputEmail.setAttribute("required", "");
        labelEmail.appendChild(inputEmail);

        const labelPassword = document.createElement("label");
        labelPassword.textContent = "Password";
        const inputPassword = document.createElement("input");
        inputPassword.setAttribute("type", "password");
        inputPassword.setAttribute("name", "password");
        inputPassword.setAttribute("placeholder", "Password");
        inputPassword.setAttribute("required", "");
        labelPassword.appendChild(inputPassword);

        const submitButton = document.createElement("button");
        submitButton.setAttribute("type", "submit");
        submitButton.textContent = "Create account";
        submitButton.addEventListener("click", (e) => {
          e.preventDefault();
          const formData = new FormData(overlayForm);
          const data = Object.fromEntries(formData);
          let createAccRec = new XMLHttpRequest();
          createAccRec.open("POST", "../php/newAccount.php", true);
          createAccRec.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded",
          );
          createAccRec.send(
            "email=" + data.email + "&password=" + hashPassword(data.password),
          );
          createAccRec.onreadystatechange = function() {
            if (createAccRec.readyState === XMLHttpRequest.DONE) {
              if (createAccRec.status === 200) {
                if (createAccRec.responseText === "Account created") {
                  alert("Account created. Please log in!");
                  document.body.removeChild(overlay);
                } else {
                  alert("Error: " + createAccRec.responseText);
                  document.body.removeChild(overlay);
                }
              } else {
                console.error("Error: " + createAccRec.status);
              }
            }
          };
        });

        const cancelButton = document.createElement("button");
        cancelButton.setAttribute("type", "reset");
        cancelButton.textContent = "Cancel";
        cancelButton.classList.add("warning");
        cancelButton.addEventListener("click", () => {
          document.body.removeChild(overlay);
        });

        overlayForm.appendChild(labelEmail);
        overlayForm.appendChild(labelPassword);
        overlayForm.appendChild(submitButton);
        overlayForm.appendChild(cancelButton);

        overlay.appendChild(overlayForm);
        document.body.appendChild(overlay);
      }
    });
  });
}

loginForm();
