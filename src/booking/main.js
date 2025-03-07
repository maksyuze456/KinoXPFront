
let heading = document.querySelector("h1");

let allBookings = [];
let form = document.querySelector("form");
form.addEventListener('submit', fetchSubmit);
fetch('http://localhost:8080/booking/')
    .then(response => response.json())
    .then(data => {
        allBookings = data;
        dynamicData(allBookings); 
    })


async function dynamicData(allBookings) {
    allBookings.forEach(booking => {
        const markup = `
            <div class="booking">
            <div style="display: flex; gap: 0.3125rem;">
                <img src="images/user.png" alt="user">
                <div class="wrapper">
                    <h4>${booking.name} ${booking.lastName}</h4>
                    <div class="meta-data">
                        <p>${booking.amount}</p>
                        <p>${booking.phone}</p>
                    </div>
                </div>
            </div>
            <img id="edit" src="images/edit.png" alt="edit">
            </div>
        `;
        document.querySelector(".bookings").insertAdjacentHTML('beforeend', markup);
    })
}

function fetchSubmit(event) {
    event.preventDefault();
    let form = document.querySelector("form")
    let formData = new FormData(form);
    let data = Object.fromEntries(formData);
    let formJson = JSON.stringify(data);
    console.log(formJson);
    /*fetch('http://localhost:8080/booking/create',
        {
            method: 'POST',
            body: formJson,
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }
    )
    */
}