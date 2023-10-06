
// HTML References
const searchFirstMovie = $('#txtsearchval1');
const searchSecondMovie = $('#txtsearchval2');
const searchResult1 = $('#searchresult1');
const searchResult2 = $('#searchresult2');
const formEl = $('#form');
const modal = $('.modal');
const gifContainer = $('.gif-container');
const suggestionContainer = $('#result-suggestion');


let firstMovie = '';
let secondMovie = '';
let movie1Data = '';
let movie2Data = '';

function openModal($el) {
  $el.classList.add('is-active');
}

function closeModal($el) {
  $el.classList.remove('is-active');
}

function openModal($el) {
  $el.classList.add('is-active');

  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });
}

function closeModal() {
const modal1 = document.getElementById('searchError');  
modal1.classList.remove('is-active');
}


//Add code here to compare movies from API
function CompareMovies(event){

event.preventDefault();

firstMovie = searchFirstMovie.val().trim();
secondMovie = searchSecondMovie.val().trim();

if (firstMovie == '' || secondMovie == ''){
 const modal1 = document.getElementById('searchError');  
 openModal(modal1);
  
}else{


    $('#result-suggestion').empty();  
    searchResult1.removeClass("hide");
    searchResult2.removeClass("hide"); 
    gifContainer.removeClass("hide");
    suggestionContainer.removeClass('hide');
   

  
    getFirstMovie();
    getSecondMovie();


  }



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

    localStorage.setItem("MoviePicks",  JSON.stringify(searchcompare));

    $('#txtsearchval1').val();
    $('#txtsearchval2').val();

}


//Event listner for search button to start the comparison of the two movies
  btnsearch.addEventListener("click", CompareMovies)

// function to get first movie data
function getFirstMovie() {

  firstMovie = searchFirstMovie.val().trim();

  const apiUrl = `https://www.omdbapi.com/?t=${firstMovie}&apikey=b52306fa`
  
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

  secondMovie = searchSecondMovie.val().trim();

  const apiUrl = `https://www.omdbapi.com/?t=${secondMovie}&apikey=b52306fa`

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
  reveiewScoreEl.text(`Rotten Tomatoes: ${reviewScore} 🍅`);



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
  reveiewScoreEl.text(`Rotten Tomatoes: ${reviewScore} 🍅`);


}

function compareReviewScores() {
 

  // Parse the numeric values from the review scores
  const reviewScore1 = parseFloat(movie1Data.Ratings[1].Value);
  const reviewScore2 = parseFloat(movie2Data.Ratings[1].Value);
  const suggestionCard = $('<div class="col">');
  const suggestionContainer = $('#result-suggestion');
 
  // Compare the review scores and append HTML 
  if (!isNaN(reviewScore1) && !isNaN(reviewScore2)) {
    if (reviewScore1 >= reviewScore2) {
     suggestionCard.html(`<h2 class="suggestion-header">Suggestion</h2>
     <p class="movie-result"> 🍿 <span class="result-change"> Based on reviews, 
     you should watch:</span> <br> ${firstMovie} </p>`);


     getGiphyData(`${firstMovie}`);
     SaveComparisonInfo(`${firstMovie}`, reviewScore1);

    } else if (reviewScore1 < reviewScore2) {
      suggestionCard.html(`<h2 class="suggestion-header">Suggestion</h2>
     <p class="movie-result"> 🍿 <span class="result-change"> Based on reviews, 
     you should watch:</span> <br> ${secondMovie} </p>`);

     getGiphyData(`${secondMovie}`);
     SaveComparisonInfo(`${secondMovie}`, reviewScore2);
    } 
    suggestionContainer.append(suggestionCard);
}
};


//placing variable from index html. 
var gifEl_1 = document.getElementById('giphy1') ;
var btnSearch = document.getElementById('btnsearch');

// placing my API Key here for giphy API
const giphyKey = "QRQ4VnDC8nQFb9LYpgi1mywDZ8oJ8C8i";

// placing the API fetch information here based off the winning Moving Title after it went through compareReviewScore(). 
function getGiphyData(MovieTitle){
  const gifApiUrl = `https://api.giphy.com/v1/gifs/search?api_key=QRQ4VnDC8nQFb9LYpgi1mywDZ8oJ8C8i&q=${MovieTitle}%27&limit=1`

    fetch(gifApiUrl)
    .then(function(response){
        return response.json();
    })
    .then(function (data) {
        appendGifImage(data);
    });
};
// Pulling from the API data from getGiphyData() 
function appendGifImage (data){
    // This targets the object properties and for the url
    const gifDisplay = data.data[0].images.original.url;
    // Appending the img url to the blank src from the object properties from the API 
    document.querySelector('#giphy1').src = `${gifDisplay}`;  
};



