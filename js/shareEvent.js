function shareEvent() {
  const shareForm = document.getElementById("shareForm");

  shareForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("event-name-2").textContent;
    if (name === "Event name") {
      alert("Please save the event first");
      return;
    }
    let formData = new FormData(shareForm);
    formData = Object.fromEntries(formData);
    const email = formData.invitation;

    let shareRec = new XMLHttpRequest();
    shareRec.open("POST", "../php/shareEvent.php", true);
    shareRec.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded",
    );

    shareRec.onreadystatechange = function() {
      if (shareRec.readyState === XMLHttpRequest.DONE) {
        if (shareRec.status === 200) {
          if (shareRec.responseText === "") {
            alert(`Event "${name}" shared with ${email}`);
          } else {
            alert("Error: " + shareRec.responseText);
          }
        } else {
          alert("Error: " + shareRec.status);
        }
      }
    };
    shareForm.reset();

    shareRec.send(
      "name=" +
      encodeURIComponent(name) +
      "&email=" +
      encodeURIComponent(email),
    );
  });
}

shareEvent();
