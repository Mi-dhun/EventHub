
/* Event Details */
let events = [
    {
        name: "Web Development Workshop",
        category: "Technical Workshop",
        date: "10-12-2026",
        venue: "Computer Lab",
        fee: 100,
        description: "Learn HTML, CSS and JavaScript."
    },
    {
        name: "AI Seminar",
        category: "Seminar",
        date: "15-12-2026",
        venue: "Auditorium",
        fee: 50,
        description: "Learn about Artificial Intelligence."
    },
    {
        name: "Coding Competition",
        category: "Coding Competition",
        date: "20-12-2026",
        venue: "Programming Lab",
        fee: 150,
        description: "Show your programming skills."
    },
    {
        name: "Cultural Fest",
        category: "Cultural Event",
        date: "25-12-2026",
        venue: "College Ground",
        fee: 0,
        description: "Enjoy dance, music and cultural programs."
    },
    {
        name: "Career Guidance",
        category: "Career Development",
        date: "28-12-2026",
        venue: "Seminar Hall",
        fee: 0,
        description: "Learn about career and interview preparation."
    }
];

/* Registration Array */
let registrations = [];

/* Display Events */
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
                    <h3>${events[i].name}</h3>
                    <p>Category: ${events[i].category}</p>
                    <p>Date: ${events[i].date}</p>
                    <p>Venue: ${events[i].venue}</p>
                    <p>${events[i].description}</p>
                    <p>Fee: ₹${events[i].fee}</p>

                    <button onclick="details(${i})">View Details</button>
                    <button onclick="selectEvent(${i})">Register Now</button>
                </div>
            `;
        }
    }

    if (list.innerHTML == "") {
        list.innerHTML = "<p>No events found.</p>";
    }
}

/* View Details */
function details(i) {
    alert(
        "Event: " + events[i].name +
        "\nCategory: " + events[i].category +
        "\nDate: " + events[i].date +
        "\nVenue: " + events[i].venue +
        "\nFee: ₹" + events[i].fee +
        "\n" + events[i].description
    );
}

/* Select Event for Registration */
function selectEvent(i) {
    document.getElementById("eventName").value = events[i].name;
    document.getElementById("register").scrollIntoView();
}

/* Search Events */
document.getElementById("search").addEventListener("keyup", showEvents);

/* Fill Event Dropdown */
for (let i = 0; i < events.length; i++) {
    document.getElementById("eventName").innerHTML +=
        `<option value="${events[i].name}">${events[i].name}</option>`;
}

/* Registration Form */
document.getElementById("regForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let gender = document.querySelector('input[name="gender"]:checked');
    let department = document.getElementById("department").value;
    let year = document.getElementById("year").value;
    let eventName = document.getElementById("eventName").value;

    let interest = document.querySelectorAll('input[name="interest"]:checked');

    /* Validation */
    if (name.length < 3) {
        alert("Name must have at least 3 characters");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Enter a valid email");
        return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
        alert("Mobile number must contain 10 digits");
        return;
    }

    if (gender == null) {
        alert("Please select gender");
        return;
    }

    if (department == "" || year == "" || eventName == "") {
        alert("Please select department, year and event");
        return;
    }

    if (interest.length == 0) {
        alert("Select at least one area of interest");
        return;
    }

    /* Generate Registration */
    let id = "EVT" + (registrations.length + 1);
    let date = new Date().toLocaleDateString();

    let reg = {
        id: id,
        name: name,
        email: email,
        mobile: mobile,
        gender: gender.value,
        department: department,
        year: year,
        event: eventName,
        date: date,
        status: "Registered"
    };

    registrations.push(reg);

    document.getElementById("message").innerHTML =
        "Registration successful! Your ID is " + id;

    alert("Registration Successful!\nYour Registration ID: " + id);

    this.reset();

    showRegistrations();
    dashboard();
});

/* Display Registrations */
function showRegistrations() {
    let table = document.getElementById("regTable");
    table.innerHTML = "";

    for (let i = 0; i < registrations.length; i++) {
        table.innerHTML += `
            <tr>
                <td>${registrations[i].id}</td>
                <td>${registrations[i].name}</td>
                <td>${registrations[i].email}</td>
                <td>${registrations[i].event}</td>
                <td>${registrations[i].date}</td>
                <td>${registrations[i].status}</td>
                <td>
                    ${registrations[i].status == "Registered"
                    ? `<button class="cancel" onclick="cancelReg(${i})">Cancel</button>`
                    : "Cancelled"}
                </td>
            </tr>
        `;
    }
}

/* Cancel Registration */
function cancelReg(i) {
    let confirmCancel = confirm("Do you want to cancel this registration?");

    if (confirmCancel) {
        registrations[i].status = "Cancelled";
        showRegistrations();
        dashboard();
        alert("Registration cancelled.");
    }
}

/* Dashboard */
function dashboard() {
    let technical = 0;
    let cultural = 0;
    let cancelled = 0;

    for (let i = 0; i < events.length; i++) {
        if (events[i].category == "Technical Workshop") {
            technical++;
        }

        if (events[i].category == "Cultural Event") {
            cultural++;
        }
    }

    for (let i = 0; i < registrations.length; i++) {
        if (registrations[i].status == "Cancelled") {
            cancelled++;
        }
    }

    document.getElementById("totalEvents").innerHTML = events.length;
    document.getElementById("totalReg").innerHTML = registrations.length;
    document.getElementById("technical").innerHTML = technical;
    document.getElementById("cultural").innerHTML = cultural;
    document.getElementById("cancelled").innerHTML = cancelled;
}

/* Initial Display */
showEvents();
dashboard();
