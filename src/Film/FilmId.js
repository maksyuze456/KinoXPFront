// Find HTML-elementerne
const fetchButton = document.getElementById("fetchButton");
const filmIdInput = document.getElementById("filmIdInput");
const filmDetails = document.getElementById("filmDetails");


// Tilføj eventlistener til knappen
fetchButton.addEventListener("click", () => {
    // Hent ID fra input-feltet
    const filmId = filmIdInput.value;


    // Hvis feltet er tomt, vis en advarsel
    if (!filmId) {
        alert("Angiv et film ID!");
        return;
    }


    // Lav et fetch-kald til dit backend-endpoint
    fetch(`http://localhost:8080/films/${filmId}`)
        .then(response => {
            // Hvis status ikke er 2xx, kaster vi en fejl
            if (!response.ok) {
                throw new Error(`Film ikke fundet (status: ${response.status})`);
            }
            return response.json();
        })
        .then(film => {
            // Opdater DOM med filmdata
            filmDetails.innerHTML = `
       <h2>${film.title}</h2>
       <p>${film.description}</p>
       <p>Varighed: ${film.duration} min</p>
       <p>Genre: ${film.genre}</p>
       <p>Udgivelsesdato: ${film.releaseDate}</p>
     `;
        })
        .catch(error => {
            // Vis eventuelle fejl i DOM'en
            filmDetails.innerHTML = `<p style="color: red;">Der opstod en fejl: ${error.message}</p>`;
        });
});

