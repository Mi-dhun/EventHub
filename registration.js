// Get old registration details
let registrations = JSON.parse(localStorage.getItem("registrations")) || [];

// Event names
let events = [
    "Web Development Workshop",
    "AI Seminar",
    "Coding Competition",
    "Cultural Fest",
    "Career Guidance"
];

// Add events to dropdown
let eventSelect = document.getElementById("eventName");

for (let i = 0; i < events.length; i++) {

    eventSelect.innerHTML +=
        `<option value="${events[i]}">${events[i]}</option>`;
}

// Select event from Events page
let selectedEvent = new URLSearchParams(window.location.search).get("event");

if (selectedEvent && events.includes(selectedEvent)) {
    eventSelect.value = selectedEvent;
}

// Registration form
document.getElementById("regForm").addEventListener("submit", function(e) {

    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let mobile = document.getElementById("mobile").value.trim();

    let gender = document.querySelector('input[name="gender"]:checked');

    let department = document.getElementById("department").value;
    let year = document.getElementById("year").value;
    let eventName = document.getElementById("eventName").value;

    let interests = document.querySelectorAll('input[name="interest"]:checked');

    let comments = document.getElementById("comments").value;

    // Check name
    if (name.length < 3) {
        alert("Name must contain at least 3 characters");
        return;
    }

    // Check email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Enter a valid email");
        return;
    }

    // Check mobile number
    if (!/^[0-9]{10}$/.test(mobile)) {
        alert("Enter a valid 10 digit mobile number");
        return;
    }

    // Check gender
    if (gender == null) {
        alert("Please select gender");
        return;
    }

    // Check department, year and event
    if (department == "" || year == "" || eventName == "") {
        alert("Please select department, year and event");
        return;
    }

    // Check interests
    if (interests.length == 0) {
        alert("Select at least one area of interest");
        return;
    }

    // Store selected interests
    let interestList = [];

    for (let i = 0; i < interests.length; i++) {
        interestList.push(interests[i].value);
    }

    // Create registration ID
    let id = "EVT" + Date.now();

    // Create registration object
    let registration = {
        id: id,
        name: name,
        email: email,
        mobile: mobile,
        gender: gender.value,
        department: department,
        year: year,
        event: eventName,
        interests: interestList,
        comments: comments,
        date: new Date().toLocaleDateString(),
        status: "Registered"
    };

    // Add details to array
    registrations.push(registration);

    // Save details in browser
    localStorage.setItem("registrations", JSON.stringify(registrations));

    document.getElementById("message").innerHTML =
        "Registration successful! Your ID is " + id;

    alert("Registration Successful!\nYour ID: " + id);

    // Clear form
    this.reset();

    // Update registration table
    showRegistrations();
});

// Display registration details
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
                    ${
                        registrations[i].status == "Registered"
                        ? `<button class="cancel" onclick="cancelReg(${i})">Cancel</button>`
                        : "Cancelled"
                    }
                </td>
            </tr>
        `;
    }
}

// Cancel registration
function cancelReg(i) {

    let answer = confirm("Do you want to cancel this registration?");

    if (answer == true) {

        registrations[i].status = "Cancelled";

        localStorage.setItem("registrations", JSON.stringify(registrations));

        showRegistrations();

        alert("Registration cancelled successfully");
    }
}

// Display registrations when page opens
showRegistrations();