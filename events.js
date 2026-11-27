
// List of events
let events = [
    {
        name: "Web Development Workshop",
        category: "Technical Workshop",
        date: "10-12-2026",
        venue: "Computer Lab",
        fee: 100,
        description: "Learn HTML, CSS and JavaScript.",
        image: "images/web.jpg"
    },
    {
        name: "AI Seminar",
        category: "Seminar",
        date: "15-12-2026",
        venue: "Auditorium",
        fee: 50,
        description: "Learn about Artificial Intelligence.",
        image: "images/seminar.jpg"
    },
    {
        name: "Coding Competition",
        category: "Coding Competition",
        date: "20-12-2026",
        venue: "Programming Lab",
        fee: 150,
        description: "Show your programming skills.",
        image: "images/competition.jpg"
    },
    {
        name: "Cultural Fest",
        category: "Cultural Event",
        date: "25-12-2026",
        venue: "College Ground",
        fee: 0,
        description: "Enjoy dance and music.",
        image: "images/cultural.jpg"
    },
    {
        name: "Career Guidance",
        category: "Career Development",
        date: "28-12-2026",
        venue: "Seminar Hall",
        fee: 0,
        description: "Learn about career opportunities.",
        image: "images/career.jpg"
    }
];

// Display events
function showEvents() {

    let list = document.getElementById("eventList");

    let search = document.getElementById("search").value.toLowerCase();

    let category = document.getElementById("category").value;

    list.innerHTML = "";

    for (let i = 0; i < events.length; i++) {

        if (events[i].name.toLowerCase().includes(search) &&
            (category == "All" || events[i].category == category)) {

            list.innerHTML += `
                <div class="card">

                    <img src="${events[i].image}" 
                         alt="${events[i].name}" 
                         class="event-image">

                    <h3>${events[i].name}</h3>

                    <p>Category: ${events[i].category}</p>

                    <p>Date: ${events[i].date}</p>

                    <p>Venue: ${events[i].venue}</p>

                    <p>${events[i].description}</p>

                    <p>Fee: ₹${events[i].fee}</p>

                    <button onclick="details(${i})">
                        View Details
                    </button>

                    <button onclick="registerEvent(${i})">
                        Register Now
                    </button>

                </div>
            `;
        }
    }

    if (list.innerHTML == "") {
        list.innerHTML = "<p>No events found.</p>";
    }
}

// View event details
function details(i) {

    alert(
        "Event: " + events[i].name +
        "\nCategory: " + events[i].category +
        "\nDate: " + events[i].date +
        "\nVenue: " + events[i].venue +
        "\nFee: ₹" + events[i].fee
    );
}

// Go to registration page
function registerEvent(i) {

    window.location.href =
        "registrations.html?event=" +
        encodeURIComponent(events[i].name);
}

// Search event
document.getElementById("search").addEventListener("keyup", showEvents);

// Filter category
document.getElementById("category").addEventListener("change", showEvents);

// Show all events when page opens
showEvents();
