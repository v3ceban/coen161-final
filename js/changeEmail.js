function changeEmail() {
  const form = document.getElementById("changeEmailForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const userID = localStorage.getItem("userID");
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../php/changeEmail.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          if (xhr.responseText === userID) {
            alert("Email changed successfully");
          } else {
            const response = xhr.responseText.replace(/^\d+/, "");
            alert("Error: " + response);
          }
          form.reset();
        } else {
          alert("Error: " + xhr.status);
          form.reset();
        }
      }
    };
    xhr.send(
      "userID=" +
      userID +
      "&email=" +
      data.newEmail +
      "&password=" +
      data.currentPassword,
    );
  });
}

changeEmail();
