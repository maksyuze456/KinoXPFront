document.addEventListener("DOMContentLoaded", function () {
    const bookingList = document.querySelector("#bookingList");

    // 🔹 Hent bookinger fra backend
    function fetchBookings() {
        fetch("http://localhost:8080/booking/")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Fejl ved hentning af bookinger.");
                }
                return response.json();
            })
            .then(bookings => {
                bookingList.innerHTML = ""; // Ryd tabellen før indsættelse

                if (bookings.length === 0) {
                    bookingList.innerHTML = `<tr><td colspan="5">Ingen bookinger fundet.</td></tr>`;
                } else {
                    bookings.forEach(booking => {
                        bookingList.innerHTML += `
                            <tr>
                                <td>${booking.name} ${booking.lastName}</td>
                                <td>${booking.phone}</td>
                                <td>${booking.amount}</td>
                                <td>${booking.show ? booking.show.film.title + " - " + booking.show.date + " " + booking.show.time : "Ukendt"}</td>
                                <td>
                                    <button class="editBtn" onclick="editBooking(${booking.id})">✏️</button>
                                    <button class="deleteBtn" onclick="deleteBooking(${booking.id})">❌</button>
                                </td>
                            </tr>
                        `;
                    });
                }
            })
            .catch(error => {
                console.error("Fejl:", error);
                bookingList.innerHTML = `<tr><td colspan="5">Kunne ikke hente bookinger.</td></tr>`;
            });
    }

    // 🔹 Slet booking
    function deleteBooking(id) {
        if (confirm("Er du sikker på, at du vil slette denne booking?")) {
            fetch(`http://localhost:8080/booking/${id}`, { method: "DELETE" })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Fejl ved sletning af booking.");
                    }
                    fetchBookings(); // Genindlæs listen
                })
                .catch(error => console.error("Fejl:", error));
        }
    }

    // 🔹 Rediger booking (omdiriger til redigeringsside)
    function editBooking(id) {
        window.location.href = `EditBooking.html?id=${id}`;
    }

    fetchBookings(); // Hent bookinger når siden indlæses
});
