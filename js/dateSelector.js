function updateSelector(dates) {
    // Dates should be retrieved from calenderSelector.js
    sorted_dates = dates.sort();
    const selector = document.getElementById("dateSelector");
    selector.innerHTML = "";
    for (let i = 0; i < dates.length; i++) {
        const option = document.createElement("option");
        // The below values are not set in stone yet
        option.value = dates[i];
        option.textContent = dates[i];
        selector.appendChild(option);
    }
    // Send to PHP
}