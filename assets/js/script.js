
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

    $('#txtseachval1').val('');
    $('#txtseachval2').val('');

}


//Event listner for search button to start the comparison of the two movies
btnsearch.addEventListener("click", CompareMovies)
