
let allBookings = []
fetchAllBookings();


async function fetchAllBookings() {
    try{
        const response = await fetch('http://localhost:8080/booking/')
        allBookings = await response.json();
        console.log(allBookings);
        dynamicData();
    }
    catch(err) {
        console.log("Error: " + err)
    }
}

function dynamicData() {

    allBookings.forEach(booking => {
        const markup = `
        <tr>
            <td>${booking.id}</td>
            <td>${booking.name}</td>
            <td>${booking.lastName}</td>
            <td>${booking.phone}</td>
            <td>${booking.show}</td>
            <td class="table-buttons">
                <img class="edit-button" data-id="${booking.id}" src="/images/edit.png" alt="edit">
                <img class="delete-button" data-id="${booking.id}" src="/images/trash-bin.png" alt="edit">
            </td>
        </tr>
        `;
        document.querySelector("tbody").insertAdjacentHTML('beforeend', markup)
    })

    document.querySelectorAll(".edit-button").forEach(img => {
        img.addEventListener("click", function() {
            const bookingId = this.getAttribute("data-id");
            window.location.href = `/src/booking/updateBooking.html?id=${bookingId}`;
        })
    })

    document.querySelectorAll(".delete-button").forEach(img => {
        img.addEventListener("click", function() {
            const bookingId = this.getAttribute("data-id");
            fetchDeleteById(bookingId);
        })
    })

}

async function fetchDeleteById(bookingId) {
    try {
        let response = await fetch(`http://localhost:8080/booking/${bookingId}`, {
            method: "DELETE"
        });
        if(response.ok) {
           alert("Booking has been deleted!"); 
           window.location.href = `/src/booking/bookings.html`;
        } else {
            
        }

    } catch(err) {
        console.log("Error: " + err);
    }

}



