//Call to get top picks from local storage and add them to a unorder list item
function Gettoppicks(){

    const storedArray = localStorage.getItem('MoviePicks');
    const myArray = storedArray ? JSON.parse(storedArray) : [];

    myArray.sort((a, b) => {
        const scoresa = a.MovieScore
        const scoresb = b.MovieScore
        return scoresb - scoresa; 
    });

    const hslistimg = document.getElementById('listtoppickimage');

    myArray.forEach(item => {
    const listItem = document.createElement('li');
    const imga = document.createElement('img');
    imga.classList.add('movie-poster')
    imga.src = item.MovieImage;
    imga.style.width ="50px"
    imga.style.height ="75px"
    listItem.appendChild(imga);
    hslistimg.appendChild(listItem);
    });

    const hslist = document.getElementById('listtoppickscore');

    myArray.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item.MovieScore;
    listItem.style.height = "85px"
    hslist.appendChild(listItem);
    });


    const hslistname = document.getElementById('listtoppickname');

    myArray.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item.MovieTitle;
    listItem.style.height = "85px"
    hslistname.appendChild(listItem);
    });

}

function init(){
    Gettoppicks();
}

init();