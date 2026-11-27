// Event details
let events = [
    { category: "Technical Workshop" },
    { category: "Seminar" },
    { category: "Coding Competition" },
    { category: "Cultural Event" },
    { category: "Career Development" }
];

// Get registration details
let registrations = JSON.parse(localStorage.getItem("registrations")) || [];

let technical = 0;
let cultural = 0;
let cancelled = 0;

// Count event categories
for (let i = 0; i < events.length; i++) {

    if (events[i].category == "Technical Workshop") {
        technical++;
    }

    if (events[i].category == "Cultural Event") {
        cultural++;
    }
}

// Count cancelled registrations
for (let i = 0; i < registrations.length; i++) {

    if (registrations[i].status == "Cancelled") {
        cancelled++;
    }
}

// Display dashboard details
document.getElementById("totalEvents").innerHTML = events.length;

document.getElementById("totalReg").innerHTML = registrations.length;

document.getElementById("technical").innerHTML = technical;

document.getElementById("cultural").innerHTML = cultural;

document.getElementById("cancelled").innerHTML = cancelled;