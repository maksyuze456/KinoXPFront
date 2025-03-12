document.addEventListener('DOMContentLoaded', () => {
    const deleteForm = document.getElementById('delete-film-form');


    deleteForm.addEventListener('submit', function(e) {
        e.preventDefault();


        const filmId = document.getElementById('filmid').value;
        console.log(`Forsøger at slette film med ID: ${filmId}`);


        fetch(`http://localhost:8080/films/delete/${filmId}`, {
            method: 'DELETE'
        })
            .then(response => {
                console.log('Response status:', response.status);
                if (response.status === 204) {
                    alert(`Film med ID ${filmId} er slettet.`);
                } else if (response.status === 404) {
                    alert('Film ikke fundet.');
                } else {
                    throw new Error('Netværksfejl: ' + response.status);
                }
            })
            .catch(error => {
                console.error('Fejl ved sletning af film:', error);
                alert('Der opstod en fejl ved sletning af filmen.');
            });
    });
});

