document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#bookingForm");
    const confirmationMessage = document.querySelector("#confirmationMessage");
    const showSelect = document.querySelector("#showSelect");

    // Hent forestillinger fra backend
    function fetchShows() {
        fetch("http://localhost:8080/booking")
            .then(response => response.json())
            .then(shows => {
                let defaultOption = document.createElement("option");
                defaultOption.textContent = "Vælg en forestilling";
                defaultOption.value = "";
                defaultOption.disabled = true;
                defaultOption.selected = true;
                showSelect.appendChild(defaultOption);

                shows.forEach(show => {
                    let option = document.createElement("option");
                    option.value = show.showID;
                    option.textContent = `${show.film.title} - ${show.date} ${show.time}`;
                    showSelect.appendChild(option);
                });
            })
            .catch(error => console.error("Fejl:", error));
    }

    // Send booking data til backend
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.querySelector("#name").value;
        const lastName = document.querySelector("#lastName").value;
        const phone = document.querySelector("#phone").value;
        const amount = document.querySelector("#amount").value;
        const showID = parseInt(document.getElementById("showSelect").value, 10);

        if (!name || !lastName || !phone || !amount || isNaN(showID)) {
            alert("Udfyld venligst alle felter!");
            return;
        }

        const data = { name, lastName, phone, amount, showID };

        fetch("http://localhost:8080/booking/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                console.log("Booking oprettet:", result);
                confirmationMessage.classList.remove("hidden");
                setTimeout(() => confirmationMessage.classList.add("hidden"), 3000);
                form.reset();
            })
            .catch(error => {
                console.error("Fejl:", error);
                alert("Kunne ikke oprette booking. Prøv igen.");
            });
    });

    fetchShows();
});
