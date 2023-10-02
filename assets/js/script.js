



//Add code here to compare movies from API
function CompareMovies(){


}

//Store the movie info in local storage
function SaveComparisonInfo(MovieTitle, MovieScore){

    var lastcompare = {MovieTitle: MovieTitle, MovieScore: MovieScore}

    var searchcompare = localStorage.getItem('MoviePicks');

    if (searchcompare) {
        searchcompare = JSON.parse(searchcompare);
    } else {
        searchcompare = [];
    }

    searchcompare.push(lastcompare);

    localStorage.setItem("currentsearch",  JSON.stringify(currentsearch));

    $('#txtsearchval1').val('');
    $('#txtsearchval2').val('');

}


//Event listner for search button to start the comparison of the two movies
btnsearch.addEventListener("click", CompareMovies)


// HTML References
const searchFirstMovie = $('#txtsearchval1');
const searchSecondMovie = $('#txtsearchval2');
const formEl = $('#form');


let firstMovie = '';
let secondMovie = '';
let movie1Data = '';
let movie2Data = '';

// const formSubmitHandler = function (event) {
//   event.preventDefault();

//   firstMovie = searchFirstMovie.val().trim();
//   secondMovie = searchSecondMovie.val().trim();

//   if (firstMovie && secondMovie) {
//     getFirstMovie(firstMovie);
//     getSecondMovie(secondMovie);

//     searchFirstMovie.val('');
//     searchSecondMovie.val('');
//   }
// }


// function to get first movie data
function getFirstMovie() {
  const apiUrl = `https://www.omdbapi.com/?t=superbad&apikey=b52306fa`
  
  fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    displayFirstMovie(data);
    movie1Data = data;
    console.log(data);
    console.log(data.Ratings[1])
    
  })
}
// function to get second movie data
function getSecondMovie() {
  const apiUrl = `https://www.omdbapi.com/?t=$toy-story&apikey=b52306fa`

  fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    displaySecondMovie(data);
    movie2Data = data;
    console.log(data);
    console.log(data.Ratings[1])
    compareReviewScores();
  });
};

getFirstMovie();
getSecondMovie();

//function to display first movie
function displayFirstMovie(data) {
  const movieName = data.Title;
  const year = data.Year;
  const runtime = data.Runtime;
  const plot = data.Plot;
  const reviewScore = data.Ratings[1].Value;
  const moviePoster = data.Poster;
 
  // define variables from html elements
  const movieTitleEl = $('#movie-title');
  const releaseYearEl = $('#release-year');
  const runtimeEl = $('#runtime');
  const moviePosterEL = $('.movie-poster');
  const moviePlotEl = $('#plot');
  const reveiewScoreEl = $('#review-score');

  // update HTML with current movie data
  movieTitleEl.text(`${movieName}`);
  releaseYearEl.text(`${year}`);
  runtimeEl.text(`${runtime}`);
  document.querySelector('#poster').src = `${moviePoster}`;
  moviePlotEl.text(`${plot}`);
  reveiewScoreEl.text(`Rotten Tomatoes:${reviewScore}`);



}
//function to display second movie
function displaySecondMovie(data) {
  const movieName = data.Title;
  const year = data.Year;
  const runtime = data.Runtime;
  const plot = data.Plot;
  const reviewScore = data.Ratings[1].Value;
  const moviePoster = data.Poster;
 
  // define variables from html elements
  const movieTitleEl = $('#movie-title-2');
  const releaseYearEl = $('#release-year-2');
  const runtimeEl = $('#runtime-2');
  const moviePosterEL = $('#poster-2');
  const moviePlotEl = $('#plot-2');
  const reveiewScoreEl = $('#review-score-2');

  // update HTML with current movie data
  movieTitleEl.text(`${movieName}`);
  releaseYearEl.text(`${year}`);
  runtimeEl.text(`${runtime}`);
  document.querySelector('#poster-2').src = `${moviePoster}`;
  moviePlotEl.text(`${plot}`);
  reveiewScoreEl.text(`Rotten Tomatoes:${reviewScore}`);


}

function compareReviewScores() {
  // Parse the numeric values from the review scores
  const reviewScore1 = parseFloat(movie1Data.Ratings[1].Value);
  const reviewScore2 = parseFloat(movie2Data.Ratings[1].Value);
  const suggestionCard = $('<div class="col">');
  const suggestionContainer =$('#result-suggestion');

  // Compare the review scores and append HTML 
  if (!isNaN(reviewScore1) && !isNaN(reviewScore2)) {
    if (reviewScore1 >= reviewScore2) {
     suggestionCard.html(`<h2 class="suggestion-header">Suggestion</h2>
     <img src="assets/images/popcorn.png" class="popcorn-icon">
     <p class="movie-result"> Based on reviews, 
     you should watch: Movie 1 </p>`);

    } else if (reviewScore1 < reviewScore2) {
      suggestionCard.html(`<h2 class="suggestion-header">Suggestion</h2>
     <img src="assets/images/popcorn.png" class="popcorn-icon">
     <p class="movie-result"> Based on reviews, 
     you should watch: Movie 2 </p>`);
    } 
    suggestionContainer.append(suggestionCard);
}
};



// formEl.on('submit', formSubmitHandler);