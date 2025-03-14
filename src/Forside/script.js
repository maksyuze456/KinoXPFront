document.addEventListener("DOMContentLoaded", function() {
    // Gør filmkarusellen mere dynamisk
    const carousel = document.querySelector('.carousel');
    let currentIndex = 0;

    function nextSlide() {
        currentIndex = (currentIndex + 1) % carousel.children.length;
        let offset = -currentIndex * 25; // 25% for hvert billede
        carousel.style.transform = `translateX(${offset}%)`;
    }

    setInterval(nextSlide, 3000); // Skift billede hver 3 sek.
});
document.addEventListener("DOMContentLoaded", function () {
    const btnAdmin = document.querySelector("#btnAdmin");
    if (btnAdmin) {
        btnAdmin.addEventListener("click", function () {
            window.location.href = "Film/FullFilm.html";
        });
    }
});

