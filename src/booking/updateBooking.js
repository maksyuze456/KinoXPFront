const urlParams = new URLSearchParams(window.location.search);
const bookingId = urlParams.get("id");
fetchBookingById();

async function fetchBookingById(){
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
        <input type="submit" value="Submit">
    `;
    form.insertAdjacentHTML("beforeend", markup);

    form.addEventListener("submit", handleUpdate);
    
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
    } catch(err) {
        console.log("Error: " + err);
    }
}