//watchlist.js

const watchlistString = localStorage.getItem("watchlist"); //retrieve from local storage
const watchlistArray2 = JSON.parse(watchlistString);//convert back to a string
const movieContainer = document.getElementById('movie-container');
const startScreen = document.getElementById("start-screen")

   if (!watchlistArray2 || watchlistArray2.length === 0) {
    // Show default screen from HTML
    startScreen.style.display = "block";
    movieContainer.style.display = "none";
} else {
    startScreen.style.display = "none";
    movieContainer.style.display = "block";
    movieContainer.innerHTML = ""; // Clear and render
}


    
watchlistArray2.forEach(function(fullMovie){
    const movieCard = document.createElement("div");
    movieCard.classList.add("fullMovie-info");


 movieCard.innerHTML = `
                <img src="${fullMovie.Poster}" alt="${fullMovie.Title} Poster"  class="poster"
                onerror="imageError(event)"> 
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
                                        <i class="fa-solid fa-square-minus minus-icon" data-id="${fullMovie.imdbID}"></i>
                                    </div>
                                </div>
                                <p class="plot">${fullMovie.Plot}</p>
                            </div>
                        `;
                        movieContainer.appendChild(movieCard);
                        
                    // Add event listener to minus icons
                      const minusIcon = movieCard.querySelector(".minus-icon")
                        minusIcon.addEventListener("click", function(event){
                            const movieId = event.target.dataset.id
                            console.log("Clicked movie with ID:", movieId)
                            removeFromWatchlist(movieId, movieCard)
                           
                        })
                        

})

  function removeFromWatchlist(movieId, cardElement){
   const retrievedString = localStorage.getItem("watchlist"); //grab array named watchlist from local storage
   const retrievedArray = JSON.parse(retrievedString); //turns string back into array
        const index = retrievedArray.findIndex(movie => movie.imdbID === movieId)
        console.log(index);
        retrievedArray.splice(index, 1)//remove object at index
        
        //return to string and save the updated array back to localStorage
        localStorage.setItem("watchlist", JSON.stringify(retrievedArray))
        cardElement.remove() //remove from DOM
        
        if (retrievedArray.length === 0) {
        startScreen.style.display = "block";
        movieContainer.style.display = "none";
    }
        
    };
    
       
       
    