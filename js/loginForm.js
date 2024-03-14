async function loginForm() {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    let login = false;

    try {
      const response = await fetch("../jsons/data.json");
      const json = await response.json();

      json.forEach((obj) => {
        if (obj.email === data.email && obj.password === data.password) {
          login = true;
          return;
        }
      });

      if (login) {
        // eslint-disable-next-line no-undef
        changeAppState("event");
      } else {
        alert("Incorrect email or password");
      }
    } catch (error) {
      console.log(error);
    }
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
