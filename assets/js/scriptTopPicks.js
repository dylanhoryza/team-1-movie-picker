//Call to get top picks from local storage and add them to a unorder list item
function Gettoppicks(){

    const storedArray = localStorage.getItem('MoviePicks');
    const myArray = storedArray ? JSON.parse(storedArray) : [];

    myArray.sort((a, b) => {
        const scoresa = a.MovieScore
        const scoresb = b.MovieScore
        return scoresb - scoresa; 
    });

    const hslist = document.getElementById('listtoppickscore');

    myArray.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item.MovieScore;
    hslist.appendChild(listItem);
    });


    const hslistname = document.getElementById('listtoppickname');

    myArray.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item.MovieTitle;
    hslistname.appendChild(listItem);
    });

}

function init(){
    Gettoppicks();
}

init();