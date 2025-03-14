document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#showForm");
    const btnCreate = document.querySelector("#btnCreate");
    const btnBack = document.querySelector("#btnBack");
    const confirmationMessage = document.querySelector("#confirmationMessage");

    // Opret dropdown-label og dropdown
    const filmSelectWrapper = document.createElement("div");
    filmSelectWrapper.style.marginBottom = "10px";

    const filmSelectLabel = document.createElement("label");
    filmSelectLabel.textContent = "Vælg en film:";
    filmSelectLabel.setAttribute("for", "filmSelect");

    const filmSelect = document.createElement("select");
    filmSelect.id = "filmSelect";
    filmSelect.name = "film";
    filmSelect.required = true;
    filmSelect.style.width = "100%"; // Sikrer at dropdown ser normal ud

    // Tilføj label og dropdown til UI
    filmSelectWrapper.appendChild(filmSelectLabel);
    filmSelectWrapper.appendChild(filmSelect);
    form.insertBefore(filmSelectWrapper, form.firstChild);

    // Hent film fra backend
    fetch("http://localhost:8080/films/all")
        .then(response => {
            if (!response.ok) throw new Error("Fejl ved hentning af film.");
            return response.json();
        })
        .then(films => {
            if (films.length === 0) {
                let option = document.createElement("option");
                option.textContent = "Ingen film tilgængelige";
                option.disabled = true;
                filmSelect.appendChild(option);
            } else {
                let defaultOption = document.createElement("option");
                defaultOption.textContent = "Vælg en film";
                defaultOption.value = "";
                defaultOption.disabled = true;
                defaultOption.selected = true;
                filmSelect.appendChild(defaultOption);

                films.forEach(film => {
                    let option = document.createElement("option");
                    option.value = film.filmid;
                    option.textContent = film.title;
                    filmSelect.appendChild(option);
                });
            }
        })
        .catch(error => console.error("Fejl:", error));

    // Event listener til oprettelse af show
    btnCreate.addEventListener("click", () => {
        const date = document.querySelector("#date").value;
        const time = document.querySelector("#time").value;
        const selectedFilmId = parseInt(document.getElementById("filmSelect").value, 10); // Konverter til int

        if (!date || !time || isNaN(selectedFilmId)) {
            alert("Udfyld venligst alle felter!");
            return;
        }

        // Opret JSON-objekt med film-reference
        const data = {
            date,
            time,
            film: { filmid: selectedFilmId } // Sender filmid som et heltal
        };

        fetch("http://localhost:8080/allshows/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Fejl ved oprettelse af forestilling.");
                }
                return response.json();
            })
            .then(result => {
                console.log("Forestillingen er oprettet:", result);
                showConfirmation();
            })
            .catch(error => {
                console.error("Fejl:", error);
                alert("Kunne ikke oprette forestilling. Prøv igen.");
            });
    });

    // Tilbage-knap funktion
    btnBack.addEventListener("click", () => {
        window.history.back();
    });

    // Bekræftelsesmeddelelse
    function showConfirmation() {
        confirmationMessage.classList.remove("hidden");
        setTimeout(() => {
            window.location.href = "index.html"; // Omdiriger til hovedsiden
        }, 2000);
    }
});
