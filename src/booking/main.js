document.addEventListener("DOMContentLoaded", function () {
    const bookingList = document.querySelector("#bookingList");
    const bookingModal = document.querySelector("#bookingModal");
    const closeModal = document.querySelector("#closeModal");
    const form = document.querySelector("#bookingForm");

    // Hent bookinger fra backend
    function fetchBookings() {
        fetch("http://localhost:8080/booking/")
            .then(response => response.json())
            .then(bookings => {
                bookingList.innerHTML = "";
                bookings.forEach(booking => {
                    bookingList.innerHTML += `
                        <tr>
                            <td>${booking.name} ${booking.lastName}</td>
                            <td>${booking.phone}</td>
                            <td>${booking.amount}</td>
                            <td>${booking.show ? booking.show.film.title + " - " + booking.show.date : "Ukendt"}</td>
                            <td>
                                <button class="editBtn" onclick="editBooking(${booking.bookingID})">✏️</button>
                                <button class="deleteBtn" onclick="deleteBooking(${booking.bookingID})">❌</button>
                            </td>
                        </tr>
                    `;
                });
            });
    }

    // Hent shows fra backend
    function fetchShows() {
        fetch("http://localhost:8080/allshows/allshowsData")
            .then(response => response.json())
            .then(shows => {
                const showSelect = document.getElementById("showSelect");
                showSelect.innerHTML = shows.map(show =>
                    `<option value="${show.showID}">${show.film.title} - ${show.date} ${show.time}</option>`
                ).join('');
            });
    }

    // Åbn modal for oprettelse/redigering
    document.querySelector("#btnAddBooking").addEventListener("click", function () {
        bookingModal.style.display = "block";
        form.reset();
    });

    // Luk modal
    closeModal.addEventListener("click", function () {
        bookingModal.style.display = "none";
    });

    // Slet booking
    function deleteBooking(id) {
        fetch(`http://localhost:8080/booking/${id}`, { method: "DELETE" })
            .then(() => fetchBookings());
    }

    // Håndter booking submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const data = {
            name: document.querySelector("#name").value,
            lastName: document.querySelector("#lastName").value,
            phone: document.querySelector("#phone").value,
            amount: document.querySelector("#amount").value,
            showID: document.getElementById("showSelect").value
        };

        fetch("http://localhost:8080/booking/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => { bookingModal.style.display = "none"; fetchBookings(); });
    });

    fetchBookings();
    fetchShows();
});
