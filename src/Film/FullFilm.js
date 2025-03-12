const API_BASE = "http://localhost:8080/films";

// Kører, når DOM er fuldt indlæst
document.addEventListener('DOMContentLoaded', () => {

    // Tjek om vi er på forsiden (index.html) = har et #filmContainer?
    const filmContainer = document.getElementById('filmContainer');
    if (filmContainer) {
        fetchAllFilms(); // Hent og vis film
        // Eventuelt kan du tilføje eventlistener til søgefelt her, hvis du ikke bruger inline onclick.
    }

    // Tjek om vi er på ADDFilm.html = har vi et #addFilmForm?
    const addFilmForm = document.getElementById('addFilmForm');
    if (addFilmForm) {
        addFilmForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addFilm();
        });
    }

    // Tjek om vi er på EditFilm.html = har vi et #updateFilmForm?
    const updateFilmForm = document.getElementById('updateFilmForm');
    if (updateFilmForm) {
        // Læs film-id fra URL (fx ?id=3)
        const urlParams = new URLSearchParams(window.location.search);
        const filmid = urlParams.get('id');

        if (filmid) {
            fetchFilmData(filmid); // Hent filmdata og udfyld formularen
        }

        updateFilmForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateFilm();
        });
    }
});

/* ================================
  Funktioner til forsiden (index.html)
  ================================ */

/**
 * Hent alle film fra backend (GET /all)
 */
function fetchAllFilms() {
    fetch(`${API_BASE}/all`)
        .then(response => response.json())
        .then(films => {
            displayFilms(films);
        })
        .catch(error => console.error("Fejl ved hentning af film:", error));
}

/**
 * Vis filmene som "kort" i #filmContainer
 */
function displayFilms(films) {
    const container = document.getElementById('filmContainer');
    container.innerHTML = ""; // Ryd containeren

    films.forEach(film => {
        const card = document.createElement("div");
        card.className = "film-card";

        // Gem filmid som data-attribut
        card.setAttribute('data-filmid', film.filmid);

        // Vælg billede baseret på filmens titel
        let imageUrl = "https://via.placeholder.com/300x200?text=Film";
        const titleLower = film.title.toLowerCase();
        if (titleLower.includes("escape")) {
            imageUrl = "https://m.media-amazon.com/images/M/MV5BNzAxODkzMTYtNGY5NS00OTViLWEzNDEtMDYwYWVkMDBiNzhhXkEyXkFqcGc@._V1_.jpg";
        } else if (titleLower.includes("romance")) {
            imageUrl = "https://cdn.moviefone.com/image-assets/690095/hLu5Dguf214I7zqCzkMcNxiXFkk.jpg?d=360x540&q=60";
        } else if (titleLower.includes("myster")) {
            imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxNzt2YXHIXxn-b_V6nz1pBAXzxW66w_Q-gQ&s";
        }
        // Nye filmbilleder
        else if (titleLower.includes("black panther")) {
            imageUrl = "https://play-lh.googleusercontent.com/ic0BimGj4wDmnr_qkOPFsikYMBaW_dkyeR2Ixz1iBSATekMej27SPE4291wwy3345Ae6axHWt6z9lnG2NOcE";
        } else if (titleLower.includes("avatar")) {
            imageUrl = "https://m.media-amazon.com/images/M/MV5BNmQxNjZlZTctMWJiMC00NGMxLWJjNTctNTFiNjA1Njk3ZDQ5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg";
        } else if (titleLower.includes("spider-man")) {
            imageUrl = "https://m.media-amazon.com/images/M/MV5BNThiZjA3MjItZGY5Ni00ZmJhLWEwN2EtOTBlYTA4Y2E0M2ZmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg";
        } else if (titleLower.includes("guardians")) {
            imageUrl = "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg";
        } else if (titleLower.includes("fast") || titleLower.includes("furious")) {
            imageUrl = "https://m.media-amazon.com/images/M/MV5BYzEwZjczOTktYzU1OS00YjJlLTgyY2UtNWEzODBlN2RjZDEwXkEyXkFqcGc@._V1_QL75_UX190_CR0,10,190,281_.jpg";
        } else if (titleLower.includes("jurassic")) {
            imageUrl = "https://m.media-amazon.com/images/M/MV5BZGExMWU2NWMtNzczYi00NjQ4LTk2YzctZGZkYmRmMDdhMjllXkEyXkFqcGc@._V1_QL75_UY281_CR3,0,190,281_.jpg";
        }

        card.innerHTML = `
         <img src="${imageUrl}" alt="Film plakat">
         <h2>${film.title}</h2>
         <p><strong>Beskrivelse:</strong> ${film.description || ""}</p>
         <p><strong>Varighed:</strong> ${film.duration || 0} min</p>
         <p><strong>Genre:</strong> ${film.genre || ""}</p>
         <p><strong>Udgivelsesdato:</strong> ${film.releaseDate || ""}</p>
         <button onclick="goToEditFilm(${film.filmid})">Rediger</button>
         <button onclick="deleteFilm(${film.filmid})">Slet</button>
       `;

        container.appendChild(card);
    });
}

/**
 * Navigér til EditFilm.html med filmens ID (f.eks. EditFilm.html?id=3)
 */
function goToEditFilm(filmid) {
    window.location.href = `EditFilm.html?id=${filmid}`;
}

/**
 * Slet film (DELETE /delete/{id})
 */
function deleteFilm(filmid) {
    if (confirm("Er du sikker på, at du vil slette denne film?")) {
        fetch(`${API_BASE}/delete/${filmid}`, { method: "DELETE" })
            .then(response => {
                if (response.ok) {
                    fetchAllFilms(); // Opdater oversigten
                } else {
                    console.error("Fejl ved sletning af film");
                }
            })
            .catch(error => console.error("Fejl:", error));
    }
}

/**
 * Enkel client-side søgefunktion der kun søger efter FilmId
 */
function filterFilms() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.film-card');

    cards.forEach(card => {
        const filmId = card.getAttribute('data-filmid');
        if (filmId && filmId.toString().toLowerCase().includes(query)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

/* ================================
  Funktioner for ADDFilm.html
  ================================ */

/**
 * Tilføj film (POST /add)
 */
function addFilm() {
    const newFilm = {
        title: document.getElementById('newTitle').value,
        description: document.getElementById('newDescription').value,
        duration: parseInt(document.getElementById('newDuration').value),
        genre: document.getElementById('newGenre').value,
        releaseDate: document.getElementById('newReleaseDate').value
    };

    fetch(`${API_BASE}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFilm)
    })
        .then(response => {
            // Hvis responsen ikke er OK, men status er 404, ignoreres fejlen
            if (!response.ok && response.status !== 404) {
                throw new Error("Fejl ved tilføjelse af film");
            }
            return response;
        })
        .then(() => {
            alert("Filmen er blevet tilføjet succesfuldt!");
            setTimeout(() => {
                window.location.href = "FullFilm.html";
            }, 2000);
        })
        .catch(error => console.error("Fejl:", error));
}

/**
 * Fortryd (navigér tilbage til index.html)
 */
function cancel() {
    window.location.href = "FullFilm.html";
}

/* ================================
  Funktioner for EditFilm.html
  ================================ */

/**
 * Hent data for én film (GET /{id}) og udfyld redigeringsformularen
 */
function fetchFilmData(filmid) {
    fetch(`${API_BASE}/${filmid}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Fejl ved hentning af filmdata");
            }
            return response.json();
        })
        .then(film => {
            document.getElementById('updateFilmId').value = film.filmid;
            document.getElementById('updateTitle').value = film.title;
            document.getElementById('updateDescription').value = film.description;
            document.getElementById('updateDuration').value = film.duration;
            document.getElementById('updateGenre').value = film.genre;
            document.getElementById('updateReleaseDate').value = film.releaseDate;
        })
        .catch(error => console.error("Fejl:", error));
}

/**
 * Opdater film (PUT /{id})
 */
function updateFilm() {
    const filmid = document.getElementById('updateFilmId').value;
    const updatedFilm = {
        title: document.getElementById('updateTitle').value,
        description: document.getElementById('updateDescription').value,
        duration: parseInt(document.getElementById('updateDuration').value),
        genre: document.getElementById('updateGenre').value,
        releaseDate: document.getElementById('updateReleaseDate').value
    };

    fetch(`${API_BASE}/${filmid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFilm)
    })
        .then(response => {
            if (!response.ok && response.status !== 404) {
                throw new Error("Fejl ved opdatering af film");
            }
            return response;
        })
        .then(() => {
            alert("Filmen er blevet opdateret succesfuldt!");
            setTimeout(() => {
                window.location.href = "FullFilm.html";
            }, 2000);
        })
        .catch(error => console.error("Fejl:", error));
}
