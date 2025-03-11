
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

function getFilmPoster(title) {
    const posters = {
        "The Great Escape": "https://m.media-amazon.com/images/M/MV5BNzAxODkzMTYtNGY5NS00OTViLWEzNDEtMDYwYWVkMDBiNzhhXkEyXkFqcGc@._V1_.jpg",
        "Romance in Paris": "https://cdn.moviefone.com/image-assets/690095/hLu5Dguf214I7zqCzkMcNxiXFkk.jpg?d=360x540&q=60",
        "Myster Island": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxNzt2YXHIXxn-b_V6nz1pBAXzxW66w_Q-gQ&s"
    };
    return posters[title] || "https://via.placeholder.com/300x450?text=No+Poster";
}

document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search-film");
    const createButton = document.getElementById("create-film");

    createButton.addEventListener("click", () => {
        window.location.href = "AddFilm.html";
    });

    function fetchFilms() {
        fetch("http://localhost:8080/films/all")
            .then(response => response.json())
            .then(films => renderFilms(films))
            .catch(error => console.error("Fejl ved hentning af film:", error));
    }

    function renderFilms(films) {
        const container = document.getElementById("film-container");
        container.innerHTML = "";

        films.forEach(film => {
            const filmDiv = document.createElement("div");
            filmDiv.classList.add("film-card");
            const imgSrc = getFilmPoster(film.title);

            filmDiv.innerHTML = `
                <img src="${imgSrc}" alt="${film.title}">
                <h2>${film.title}</h2>
                <p>${film.description}</p>
                <p>Varighed: ${film.duration} min</p>
                <p>Genre: ${film.genre}</p>
                <p>Udgivelsesdato: ${film.releaseDate}</p>
                <div class="button-group">
                    <button class="delete-button" data-id="${film.id}">Slet</button>
                    <button class="edit-button" data-id="${film.id}">Redigere</button>
                </div>
            `;
            container.appendChild(filmDiv);
        });
        addEventListeners();
    }

    function addEventListeners() {
        document.querySelectorAll(".delete-button").forEach(button => {
            button.addEventListener("click", function() {
                const filmId = this.getAttribute("data-id");
                if (confirm("Er du sikker på, at du vil slette denne film?")) {
                    fetch(`http://localhost:8080/films/delete/${filmId}`, { method: "DELETE" })
                        .then(() => fetchFilms())
                        .catch(error => console.error("Fejl ved sletning:", error));
                }
            });
        });

        document.querySelectorAll(".edit-button").forEach(button => {
            button.addEventListener("click", function() {
                const filmId = this.getAttribute("data-id");
                window.location.href = `EditFilm.html?id=${filmId}`;
            });
        });
    }

    searchInput.addEventListener("input", function() {
        const query = searchInput.value.toLowerCase();
        document.querySelectorAll(".film-card").forEach(card => {
            const title = card.querySelector("h2").textContent.toLowerCase();
            card.style.display = title.includes(query) ? "block" : "none";
        });
    });

    fetchFilms();
});

