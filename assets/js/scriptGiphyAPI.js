// //placing variable from index html. 
// var gifEl_1 = document.getElementById('giphy1') ;
// var btnSearch = document.getElementById('btnsearch');

// // placing my API Key here
// const giphyKey = "QRQ4VnDC8nQFb9LYpgi1mywDZ8oJ8C8i";


// // placing the API fetch information here based off the keyword from the search bar. 
// function getGiphyData(){
//     const searchInput1 = document.getElementById('txtsearchval1').value;
//     console.log(typeof(searchInput1));
//     console.log(searchInput1); /// doesnt show me a txt just a blank ''

    
//     //const gifApiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${giphyKey}"&q=${searchInput1}&limit=1`;

//     const gifApiUrl = "https://api.giphy.com/v1/gifs/search?api_key=QRQ4VnDC8nQFb9LYpgi1mywDZ8oJ8C8i&q=superbad%27&limit=1"

//     fetch(gifApiUrl)
//     .then(function(response){
//         return response.json();
//     })
//     .then(function (data) {
//         appendGifImage(data);
//     });
// };
// getGiphyData();

// // adding event for search button to pull the text from the search bar to append the gif image url
// btnsearch.addEventListener('click', getGiphyData)



// function appendGifImage (data){
//     console.log(data);
//     const gifDisplay = data.data[0].images.original.url;
    
//     console.log(gifDisplay);
//     document.querySelector('#giphy1').src = `${gifDisplay}`;
    
// };

// function onImgLoad(){
//     return new Promise((resolve, reject) => {
//         img.onload = resolve;
//     });
// }

//pulling the function for the form submission on this. 
// function listenOnFormSubmit(){
//     $('#form').submit( async(event) => {
//         event.preventDefault();
//         let $input = $('#txtsearchval1');
//         main($input.val());
//         // console.log($input.val());
//     });
// }

// async function example 
// async function main(keyword){
//     const result = await getGiphyData(keyword);
//     $('#giphy1').html('');
//     let promises = [];
//     result.data.forEach(gif => {
//         let img = new Image();
//         img.src = gif.images.original.url;
//         promises.push(onImgLoad(img));
//         appendImage(img);
//     });
//     await Promise.all(promises);
// }




