function updateSelector(dates) {
    // Dates should be retrieved from calenderSelector.js
    const selector = document.getElementById("dateSelector");
    selector.innerHTML = "";
    for (let i = 0; i < dates.length; i++) {
        const option = document.createElement("option");
        // The below values are not set in stone yet
        option.value = dates[i];
        option.textContent = dates[i];
        selector.appendChild(option);
    }
}

dateSelector();