async function loginForm() {
  document.addEventListener("DOMContentLoaded", async () => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../php/login.php", true);
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const userID = xhr.responseText;
          if (!isNaN(userID) && userID > 0 && userID !== "") {
            // eslint-disable-next-line no-undef
            displayProfileEvents(userID);
            // eslint-disable-next-line no-undef
            changeAppState("event");
          }
        } else {
          console.error("Error: " + xhr.status);
        }
      }
    };
  });

  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../php/login.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("email=" + data.email + "&password=" + data.password);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const userID = xhr.responseText;
          if (!isNaN(userID) && userID > 0 && userID !== "") {
            // eslint-disable-next-line no-undef
            displayProfileEvents(userID);
            // eslint-disable-next-line no-undef
            changeAppState("event");
          } else {
            alert("Invalid email or password");
          }
        } else {
          console.error("Error: " + xhr.status);
        }
      }
    };
    return;
  });

  form.querySelectorAll("a").forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "../php/login.php", true);
      xhr.send();
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
        submitButton.addEventListener("click", (e) => {
          e.preventDefault();
          const formData = new FormData(overlayForm);
          const data = Object.fromEntries(formData);
          // validate and handle data here
          console.log(data.email);
          // Send to PHP
        });

        const cancelButton = document.createElement("button");
        cancelButton.setAttribute("type", "reset");
        cancelButton.textContent = "Cancel";
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
          let xhr2 = new XMLHttpRequest();
          xhr2.open("POST", "../php/login.php", true);
          xhr2.send("email=" + data.email + "&password=" + data.password);
          const formData = new FormData(overlayForm);
          const data = Object.fromEntries(formData);
          // validate and handle data here
          console.log(data.email, data.password);
          // Send to PHP
        });

        const cancelButton = document.createElement("button");
        cancelButton.setAttribute("type", "reset");
        cancelButton.textContent = "Cancel";
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
