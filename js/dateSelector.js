function updateSelector(dates) {
  // Dates should be retrieved from calenderSelector.js
  const selector = document.getElementById("dateSelector");
  const button = document.querySelector("#timeForm button");
  if (dates.length === 0) {
    selector.innerHTML = "<option>Please select a date first</option>";
    selector.disabled = true;
    button.disabled = true;
    button.textContent = "Please select a date first";
  } else {
    dates = dates.sort();
    selector.disabled = false;
    button.disabled = false;
    button.textContent = "Add";
    selector.innerHTML = "";
    for (let i = 0; i < dates.length; i++) {
      const option = document.createElement("option");
      // The below values are not set in stone yet
      option.value = dates[i];
      option.textContent = dates[i];
      selector.appendChild(option);
    }
  }
  // Send to PHP
}

updateSelector("");
