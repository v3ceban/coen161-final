// eslint-disable-next-line no-unused-vars
async function displayProfileEvents(userID) {
  const response = await fetch("../jsons/info.json");
  const json = await response.json();
  const events = [];

  json.forEach((obj) => {
    if (obj.users.split(",").includes(userID)) {
      events.push(obj.eventID);
    }
  });

  events.forEach((event) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <h2>${json[event - 1].name}</h2>
      <p>Dates: ${json[event - 1].days.map((obj) => obj.date).join(", ")}</p>
      <button>View</button>
      <button>Delete</button>
    `;
    document.querySelector("#userEvents").appendChild(div);
  });
}
