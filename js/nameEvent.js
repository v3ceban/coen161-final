let eventNameButton = document.getElementById('event-name-button');
eventNameButton.addEventListener('click', (e) => {
    e.preventDefault();
    let eventName = document.getElementById('event-name');
    let eventName2 = document.getElementById('event-name-2');
    let event = document.getElementById('event-name-input').value;
    eventName.innerHTML = event;
    eventName2.innerHTML = event;
    // Send to PHP
});