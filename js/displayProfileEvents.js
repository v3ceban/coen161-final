// eslint-disable-next-line no-unused-vars
async function displayProfileEvents(userID) {
  const usersRes = await fetch("../jsons/data.json");
  const usersJSON = await usersRes.json();
  const eventsRes = await fetch("../jsons/info.json");
  const eventsJSON = await eventsRes.json();
  const events = [];

  eventsJSON.forEach((obj) => {
    if (obj.users.split(",").includes(userID)) {
      events.push(obj.eventID);
    }
  });

  usersJSON.forEach((obj) => {
    if (obj.id === userID) {
      const userName = obj.email.split("@")[0];
      document.querySelector("#profile-name").textContent = userName;
    }
  });

  events.forEach((event) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <h2>${eventsJSON[event - 1].name}</h2>
      <p>Dates: ${eventsJSON[event - 1].days.map((obj) => obj.date).join(", ")}</p>
      <button>View</button>
      <button>Delete</button>
    `;
    document.querySelector("#userEvents").appendChild(div);
  });
}
