const searchBtn = document.getElementById("search-btn")
const startScreen = document.getElementById("start-screen")
const movieContainer = document.getElementById("movie-container")
let watchlistArray = []


function saveToWatchlist(fullMovie) {
  const isDuplicate = watchlistArray.some(movie => movie.imdbID === fullMovie.imdbID);
  
  if (isDuplicate) {
    console.log("Duplicate!");
  } else {
    watchlistArray.push(fullMovie);
    localStorage.setItem("watchlist", JSON.stringify(watchlistArray));
    console.log("Saved movie:", fullMovie);
   
  }
}


   
  // Backup image error handler
function imageError(event) {
    event.target.onerror = null; // stops the loop
    event.target.src = "images/placeholder-unsplash.jpg";
}

function showMessage(messageText) {
    const message = document.createElement("div");
    message.classList.add("start-screen");
    message.textContent = messageText;
    movieContainer.innerHTML = "";
    movieContainer.appendChild(message);
}



// Performs all searches
function performSearch() {
    const searchInput = document.getElementById("search-input").value;

    if (!searchInput) {
        showMessage("Unable to find what you’re looking for. Please try another search.");
        return;
    }

    startScreen.style.display = "none"; // hide start screen
    movieContainer.style.display = "block"; // show search results
    movieContainer.innerHTML = ""; // Clear previous results

    // 1st fetch: search by title
    fetch(`https://www.omdbapi.com/?apikey=5b5a9a07&s=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            if (!data.Search) {
            showMessage("Unable to find what you’re looking for. Please try another search.");
            return;
        }
                    // Loop through search results
            data.Search.forEach(movie => {
                // 2nd fetch: get full details for each movie
                fetch(`https://www.omdbapi.com/?apikey=5b5a9a07&i=${movie.imdbID}`)
                    .then(res => res.json())
                    .then(fullMovie => {
                        const movieCard = document.createElement("div");
                        movieCard.classList.add("fullMovie-info");
                       
            // No poster? Do this:
            const posterUrl = fullMovie.Poster === "N/A" 
                ? "images/placeholder-unsplash.jpg" 
                : fullMovie.Poster;

            movieCard.innerHTML = `
                <img src="${posterUrl}" alt="${fullMovie.Title} Poster" class="poster" onerror="imageError(event)"> 
                <div class="movie-content">
                            <div class="movie-content">
                                <div class="title-wrapper">
                                    <h2 class="title">${fullMovie.Title}</h2>
                                    <div class="title-rating">
                                        <i class="fa-solid fa-star star-rating"></i>
                                        <span>${fullMovie.imdbRating}</span>
                                    </div>
                                </div>                         
                                <div class="movie-details">
                                    <span>${fullMovie.Runtime}</span>
                                    <span>${fullMovie.Genre}</span>
                                    <div class="watchlist-btn">
                                        <i class="fa-solid fa-circle-plus plus-icon" data-id="${fullMovie.imdbID}"></i>
                                        <span>Watchlist</span>
                                    </div>
                                </div>
                                <p class="plot">${fullMovie.Plot}</p>
                            </div>
                        `;
                        movieContainer.appendChild(movieCard);

                        // Add event listeners to the plus icon
                        const plusIcon = movieCard.querySelector(".plus-icon");
                        plusIcon.addEventListener("click", () => {
                            saveToWatchlist(fullMovie);
                        });
                    });
            });
        });
}


// Button click
searchBtn.addEventListener("click", function () {
    performSearch();
});

// Enter key
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        performSearch();
    }
});


  
