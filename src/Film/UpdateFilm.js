document.addEventListener("DOMContentLoaded", function () {
    // Hent filmid fra sessionStorage eller URLSearchParams
    let filmid = sessionStorage.getItem("filmid");
    if (!filmid) {
        const urlParams = new URLSearchParams(window.location.search);
        filmid = urlParams.get("filmid");
    }

    if (!filmid) {
        console.error("Ingen filmid fundet!");
        return;
    }

    // Hent filmen fra backend og udfyld formularen
    fetch(`http://localhost:8080/films/${filmid}`)
        .then(response => response.json())
        .then(film => {
            document.getElementById("title").value = film.title;
            document.getElementById("description").value = film.description;
            document.getElementById("duration").value = film.duration;
            document.getElementById("genre").value = film.genre;
            document.getElementById("releaseDate").value = film.releaseDate;
        })
        .catch(error => console.error("Fejl ved hentning af film:", error));

    // Håndter opdatering af filmen
    document.getElementById("updateFilmForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const updatedFilm = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            duration: parseInt(document.getElementById("duration").value, 10),
            genre: document.getElementById("genre").value,
            releaseDate: document.getElementById("releaseDate").value
        };

        fetch(`http://localhost:8080/films/${filmid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedFilm)
        })
            .then(response => response.json())
            .then(updatedFilm => {
                console.log("Film opdateret:", updatedFilm);
                alert("Filmen er opdateret!");
            })
            .catch(error => console.error("Fejl ved opdatering af film:", error));
    });
});
