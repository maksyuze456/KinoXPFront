const urlParams = new URLSearchParams(window.location.search);
const bookingId = urlParams.get("id");
if(bookingId != null) {
    fetchBookingById(bookingId);
} else {
    createForm();
}

async function fetchBookingById(bookingId){
    try {
        let response = await fetch(`http://localhost:8080/booking/${bookingId}`);
        let booking = await response.json();
        fillForm(booking);
    } catch(err) {
        console.log("Error: " + err);
    }
}

function fillForm(booking) {
    let form = document.querySelector("form");
    const markup = `
        <input type="text" id="name" name="name" value="${booking.name}">
        <input type="text" id="lastName" name="lastName" value="${booking.lastName}">
        <input type="text" id="phone" name="phone" value="${booking.phone}">
        <input type="number" id="amount" name="amount" value="${booking.amount}">
        <input class="submit-button" type="submit" value="Save">
    `;
    form.insertAdjacentHTML("beforeend", markup);

    form.addEventListener("submit", handleUpdate);
    
}

function createForm() {
    let form = document.querySelector("form");
    const markup = `
        <label for="name">First Name:</label>
        <input type="text" id="name" name="name">

        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName">

        <label for="phone">Phone:</label>
        <input type="text" id="phone" name="phone">

        <label for="amount">Amount:</label>
        <input type="number" id="amount" name="amount">

        <input class="submit-button" type="submit" value="Create">
    `;
    form.insertAdjacentHTML("beforeend", markup);
    form.addEventListener("submit", handleCreate)
}

async function handleCreate(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const lastName = document.getElementById("lastName").value;
    const phone = document.getElementById("phone").value;
    const amount = parseInt(document.getElementById("amount").value);

    const booking = { name, lastName, phone, amount };
    try {
        let response = await fetch(`http://localhost:8080/booking/create`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(booking)
        });
        let createdBooking = await response.json();
        console.log(createdBooking);
        window.location.href = `/src/booking/bookings.html`;
    } catch(err) {
        console.log("Error: " + err)
    }
}

async function handleUpdate(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const lastName = document.getElementById("lastName").value;
    const phone = document.getElementById("phone").value;
    const amount = parseInt(document.getElementById("amount").value);

    const booking = { name, lastName, phone, amount };
    try {
        let response = await fetch(`http://localhost:8080/booking/update/${bookingId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(booking)
        });
        let updatedBooking = await response.json();
        console.log(updatedBooking);
        window.location.href = `/src/booking/bookings.html`;
    } catch(err) {
        console.log("Error: " + err);
    }
}