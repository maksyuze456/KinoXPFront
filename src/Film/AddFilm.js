document.getElementById('add-film-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Forhindrer standard form submission

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const duration = parseInt(document.getElementById('duration').value);
    const genre = document.getElementById('genre').value;
    const releaseDate = document.getElementById('releaseDate').value; // Format: YYYY-MM-DD

    // Opret film objekt med de indsamlede data
    const film = { title, description, duration, genre, releaseDate };

    fetch("http://localhost:8080/films/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(film)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Netværksfejl: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            alert("Film tilføjet med ID: " + data.filmid);
            // Ryd formularen efter tilføjelse
            document.getElementById('add-film-form').reset();
        })
        .catch(error => {
            console.error("Der opstod en fejl:", error);
            alert("Der opstod en fejl under tilføjelsen af filmen.");
        });
});
