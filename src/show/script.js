document.addEventListener('DOMContentLoaded', () => {
    fetchShows();
});

function fetchShows() {
    fetch("http://localhost:8080/allshows/allshowsData")
        .then(response => response.json())
        .then(shows => {
            displayShows(shows);
        })
        .catch(error => console.error("Fejl ved hentning af shows:", error));
}

function displayShows(shows) {
    const showList = document.querySelector('#showList');
    showList.innerHTML = '';

    shows.forEach(show => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td><img src="placeholder.jpg" alt="Film plakat"></td>
            <td>${show.date}</td>
            <td>${show.time}</td>
            <td>${show.bookings || 0}</td>
            <td>
                <button class="action-btn slet" onclick="deleteShow(${show.showID})">🗑️</button>
                <button class="action-btn rediger" onclick="editShow(${show.showID})">✏️</button>
            </td>
        `;

        showList.appendChild(row);
    });
}

function deleteShow(showID) {
    if (confirm("Er du sikker på, at du vil slette denne forestilling?")) {
        fetch(`http://localhost:8080/allshows/delete/${showID}`, { method: 'DELETE' })
            .then(() => {
                alert("Show slettet!");
                fetchShows();
            })
            .catch(error => console.error("Fejl ved sletning:", error));
    }
}

function editShow(showID) {
    window.location.href = `UpdateShow.html?showID=${showID}`;
}

// Knappen "+ Opret ny forestilling"
document.querySelector("#btnAddShow").addEventListener("click", () => {
    window.location.href = "create.html";
});
