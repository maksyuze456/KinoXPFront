// Hent Show ID fra URL (For eksempel: update.html?showID=3)
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const showID = params.get('showID');

    if (!showID) {
        alert("Fejl: Intet Show ID fundet!");
        window.location.href = "index.html"; // Send brugeren tilbage, hvis ID mangler
        return;
    }

    document.querySelector('#showID').value = showID; // Sæt Show ID i feltet

    fetchShowDetails(showID);
});

// Hent forestillingsdata fra backend
function fetchShowDetails(showID) {
    fetch(`http://localhost:8080/allshows/${showID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Forestilling ikke fundet.");
            }
            return response.json();
        })
        .then(show => {
            document.querySelector('#filmid').textContent = show.filmid;
            document.querySelector('#date').value = show.date;
            document.querySelector('#time').value = show.time;
        })
        .catch(error => {
            console.error('Fejl ved hentning af forestilling:', error);
            alert("Kunne ikke finde forestilling. Tjek om ID'et er korrekt.");
        });
}

// Opdater forestilling
document.querySelector('#btnUpdate').addEventListener('click', () => {
    const showID = new URLSearchParams(window.location.search).get('showID');
    const date = document.querySelector('#date').value;
    const time = document.querySelector('#time').value;

    if (!date || !time) {
        alert("Udfyld venligst alle felter!");
        return;
    }

    const data = { date, time };

    fetch(`http://localhost:8080/allshows/update/${showID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Fejl ved opdatering af forestilling.");
            }
            return response.json();
        })
        .then(result => {
            console.log('Forestillingen er opdateret:', result);
            showConfirmation();
        })
        .catch(error => {
            console.error('Fejl ved opdatering:', error);
            alert("Kunne ikke opdatere forestilling. Prøv igen.");
        });
});

function showConfirmation() {
    document.querySelector('#confirmationMessage').classList.remove('hidden');
    setTimeout(() => {
        window.location.href = "index.html"; // Send tilbage til hovedsiden efter 2 sekunder
    }, 2000);
}

// Gå tilbage til forrige side
document.querySelector('#btnBack').addEventListener('click', () => {
    window.history.back();
});
