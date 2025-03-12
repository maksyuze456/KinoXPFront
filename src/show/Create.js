document.querySelector('#btnCreate').addEventListener('click', () => {
    const date = document.querySelector('#date').value;
    const time = document.querySelector('#time').value;

    if (!date || !time) {
        alert("Udfyld venligst alle felter!");
        return;
    }

    const data = { date, time };

    fetch('http://localhost:8080/allshows/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
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
            console.log('Forestillingen er oprettet:', result);
            showConfirmation();
        })
        .catch(error => {
            console.error('Fejl ved oprettelse:', error);
            alert("Kunne ikke oprette forestilling. Prøv igen.");
        });
});

function showConfirmation() {
    document.querySelector('#confirmationMessage').classList.remove('hidden');
    setTimeout(() => {
        window.location.href = "index.html"; // Send tilbage til hovedsiden efter 2 sekunder
    }, 2000);
}

// Gå tilbage
