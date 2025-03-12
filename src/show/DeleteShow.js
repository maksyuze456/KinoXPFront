document.querySelector('#btnDelete').addEventListener('click', () => {
    const showID = document.querySelector('#showId').value;

    fetch(`http://localhost:8080/allshows/delete/${showID}`, {
        method: 'DELETE'
    })
        .then(() => {
            console.log(`Show med ID ${showID} slettet.`);
        })
        .catch(error => {
            console.error('Fejl ved sletning:', error);
        });
});
