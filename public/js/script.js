const modal = document.querySelector("#modal");

function showDetails(movieID) {
    const details = document.querySelector(`#details-${movieID}`)
    details.style.display = "flex";
}

function hideDetails(movieID) {
    const details = document.querySelector(`#details-${movieID}`)
    details.style.display = "none";
}

async function requestDetails(movieID) {
    const response = await fetch(`/movie/${movieID}`);
    if (!response.ok) throw new Error("Erro na requisição");

    const movieDetails = await response.json();
    return movieDetails;
}

async function showDetailsModal(movieID) {
    try {
        const movieDetails = await requestDetails(movieID); // <--- await aqui
        console.log(movieDetails);

        modal.querySelector("#modal-movie-img").src = document.querySelector(`#movie-${movieID} img`).src;
        modal.querySelector("#modal-movie-title").textContent = movieDetails.title;
        movieDetails.genres.forEach(genre => {
            modal.querySelector("#modal-movie-generos").textContent += ` ${genre.name} `;
        });
        modal.querySelector("#modal-movie-overview").textContent = movieDetails.overview;
        modal.querySelector("#modal-movie-date").textContent = movieDetails.release_date;

        const buttonClose = modal.querySelector(".close");
        buttonClose.addEventListener("click", () => {
            modal.classList.remove("show");
        });

        modal.classList.add("show");
    } catch (error) {
        console.error("Erro ao carregar detalhes do filme:", error.message);
    }
}
 
function searchMovie() {
    const movieName = document.getElementById("search-movie").value;
    if (movieName.trim() !== "") {
        window.location.href = `/movies/search?query=${encodeURIComponent(movieName)}`;
    }
}

