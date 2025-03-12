document.querySelector('#btnGetAll').addEventListener('click', () => {
    fetch("http://localhost:8080/allshowsData")
        .then(response => response.json())
        .then(shows => {
            console.log("Liste over shows:", shows);
            displayShows(shows);
        })
        .catch(error => console.error("Fejl ved hentning af shows:", error));
});

function displayShows(shows) {
    const showList = document.querySelector('#showList');
    showList.innerHTML = '';

    shows.forEach(show => {
        const listItem = document.createElement('li');
        listItem.textContent = `showID: ${show.showID}, Dato: ${show.date}, Tid: ${show.time}`;
        showList.appendChild(listItem);
    });
}
