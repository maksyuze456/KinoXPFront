document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:8080/films/all")
        .then(response => {
            if (!response.ok) {
                throw new Error("Netværksfejl: " + response.status);
            }
            return response.json();
        })
        .then(films => {
            const container = document.getElementById("film-container");
            films.forEach(film => {
                const filmDiv = document.createElement("div");
                filmDiv.innerHTML = `
                    <h2>${film.title}</h2>
                    <p>${film.description}</p>
                    <p>Varighed: ${film.duration} min</p>
                    <p>Genre: ${film.genre}</p>
                    <p>Udgivelsesdato: ${film.releaseDate}</p>
                `;
                container.appendChild(filmDiv);
            });
        })
        .catch(error => {
            console.error("Der opstod en fejl:", error);
        });
});

