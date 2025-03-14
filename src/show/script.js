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
            <td><img src="${getFilmImage(show.film.title)}" alt="${show.film.title}" style="width:100px; height:auto;"></td>
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
function getFilmImage(title) {
    const titleLower = title.toLowerCase();

    if (titleLower.includes("escape")) {
        return "https://m.media-amazon.com/images/M/MV5BNzAxODkzMTYtNGY5NS00OTViLWEzNDEtMDYwYWVkMDBiNzhhXkEyXkFqcGc@._V1_.jpg";
    } else if (titleLower.includes("romance")) {
        return "https://cdn.moviefone.com/image-assets/690095/hLu5Dguf214I7zqCzkMcNxiXFkk.jpg?d=360x540&q=60";
    } else if (titleLower.includes("black panther")) {
        return "https://play-lh.googleusercontent.com/ic0BimGj4wDmnr_qkOPFsikYMBaW_dkyeR2Ixz1iBSATekMej27SPE4291wwy3345Ae6axHWt6z9lnG2NOcE";
    } else if (titleLower.includes("avatar")) {
        return "https://m.media-amazon.com/images/M/MV5BNmQxNjZlZTctMWJiMC00NGMxLWJjNTctNTFiNjA1Njk3ZDQ5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg";
    } else if (titleLower.includes("spider-man")) {
        return "https://m.media-amazon.com/images/M/MV5BNThiZjA3MjItZGY5Ni00ZmJhLWEwN2EtOTBlYTA4Y2E0M2ZmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg";
    } else if (titleLower.includes("jurassic")) {
        return "https://m.media-amazon.com/images/M/MV5BZGExMWU2NWMtNzczYi00NjQ4LTk2YzctZGZkYmRmMDdhMjllXkEyXkFqcGc@._V1_QL75_UY281_CR3,0,190,281_.jpg";
    }

    // Default placeholder-billede
    return "https://via.placeholder.com/100x150?text=Film";
}
