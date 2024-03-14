function timeForm() {
  const timeForm = document.getElementById("timeForm");
  const data = [];
  timeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let formData = new FormData(timeForm);
    const dateSelector = document.getElementById("dateSelector");
    formData = Object.fromEntries(formData);
    if (dateSelector.value === "Please select a date first") {
      alert("Please select a date first");
      return;
    } else if (
      !data.some((item) => Object.keys(item)[0] === dateSelector.value)
    ) {
      data.push({
        [dateSelector.value]: [`${formData.start}-${formData.end}`],
      });
    } else {
      data.forEach((item) => {
        if (
          Object.keys(item)[0] === dateSelector.value &&
          item[dateSelector.value].includes(
            `${formData.start}-${formData.end}`,
          ) === false
        ) {
          item[dateSelector.value].push(`${formData.start}-${formData.end}`);
        }
      });
    }
    alert("Time slot added");
    console.log(data); // to be sanitzed and sent to PHP
  });

  document.querySelector("#event>button").addEventListener("click", () => {
    if (data.length > 0) {
      // eslint-disable-next-line no-undef
      changeAppState("preview");
    } else {
      alert("Please add at least one time slot");
    }
  });
}

timeForm();
