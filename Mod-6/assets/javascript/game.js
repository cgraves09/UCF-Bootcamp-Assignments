// Create a variable to hold array of topics
let topics = ['trending', 'sports', 'funny', 'movies', 'rachet', 'coronavirus']
let isPlaying = false;
// Take the array and push and append to new buttons using a for loop
function renderButtons () {
    $('#topics').empty();

   for (let i = 0; i < topics.length; i++ ) {
        let t = $('<button>');
        t.addClass('gif');
        t.addClass('btn btn-danger btn-lg')
        t.attr('data-name',topics[i]);
        t.text(topics[i]);
        $('#topics').append(t)

    } 
}


// using ajax function link topic array strings to names in api search
function displayGifs () {

    $('#gif-area').empty();
    let topic = $(this).attr('data-name')
    let apiKey = '?api_key=28WX8jFtVq5aEdJnrIaa04824K6Y9oBZ';
    let queryUrl = 'https://api.giphy.com/v1/gifs/search' + apiKey + '&q=' + topic + '&limit=10';
    
    $.ajax({
        url: queryUrl,
        method: 'GET'
        
    }).then (function (response) {
        
        // Variable for new div using bootstrap rows
        let gifDivRow = $('<div class = "row" >')
        $('#gif-area').prepend(gifDivRow)
        // Creating a loop to go through the data array of object 
        for (let j = 0; j < response.data.length; j++){
            
            // Creating divs for column using bootstrap
            let gifDivCol = $('<div class = "col-md-4">')
            let stillImg = response.data[j].images.fixed_height_still.url;
            let movingImg = response.data[j].images.fixed_height.url;
            let gifImgs = $('<button>');
            gifImgs.addClass('gif-img');
            gifImgs.attr('img-url',stillImg);
            gifImgs.attr('moving-img',movingImg);
            gifImgs.html('<img src= "' + stillImg + '">');

                    
            // conditionals to push data to columns
            if (j < 3) {
                 $(gifDivCol).append('<h3 id= "rating-text">' + response.data[j].rating + '</h3>');
                 $(gifDivCol).append(gifImgs)
                 $(gifDivRow).prepend(gifDivCol)
            }else  {
                $(gifDivCol).append('<h3 id= "rating-text">'+ response.data[j].rating + '</h3>');
                 $(gifDivCol).append(gifImgs)
                 $(gifDivRow).prepend(gifDivCol)
            }
            
        };
        
       });
}

// onclick function for gifs to animate and stop animate on second click use boolen for true or false variable isRunning
function gifAnimate () {
    let gif = $(this);
    let movingGif = $(this).attr('moving-img')
    let stillGif = $(this).attr('img-url')
    console.log(movingGif);
    // console.log(movingGif)
    if (!isPlaying) {
        gif.html('<img src= "' + movingGif + '">');
        isPlaying = true;
    }else {
        gif.html('<img src= "' + stillGif + '">');
        isPlaying = false;
    }     
    
}
// create an onclick function for the submit button to push the val().trim to the array
    $('#add-gif').click(function (event){
        event.preventDefault();
        let newGif = $('#gif-input').val().trim();
        console.log(newGif)
        topics.push(newGif);
        renderButtons();
        $('#gif-input').val('');
        
        
        
        
    })
// click functions for gifs
$(document).on('click', '.gif',displayGifs)
$(document).on('click', '.gif-img',gifAnimate)

renderButtons();

 
        
              
       



