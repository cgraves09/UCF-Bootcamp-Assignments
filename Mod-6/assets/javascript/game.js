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
        t.text(topics[i].toUpperCase());
        $('#topics').append(t)
        

    } 
}


// using ajax function link topic array strings to names in api search
function displayGifs () {
    let offset = 0;
    $('#gif-area').empty();
    let topic = $(this).attr('data-name')
    let apiKey = '?api_key=28WX8jFtVq5aEdJnrIaa04824K6Y9oBZ';
    let queryUrl = 'https://api.giphy.com/v1/gifs/search' + apiKey + '&q=' + topic + '&limit=10&offset=' + offset;
    
    $.ajax({
        url: queryUrl,
        method: 'GET'
        
    }).then (function (response) {
        // empty to prevent duplicates
        $('.more-gifs').empty();
        $('.gif-description').empty();
         // create a button that says load 10 more gifs
         let moreGif = $('<button>');
         moreGif.addClass('btn btn-danger btn-lg');
         moreGif.addClass('more-gifs');
         moreGif.text('GIVE ME MORE ' + topic.toUpperCase() + ' GIFS!!!!!')
         $('#gif-area').append(moreGif)
        //  description for gifs
         let description =$('<h4>');
         description.addClass('gif-description');
         description.text('Click on a Gif to animate, press again to stop the animation')
         $('#gif-area').append(description);
        
        // Variable for new div using bootstrap rows
        let gifDivRow = $('<div class = "row" >')
        
        // Creating a loop to go through the data array of object 
        for (let j = 0; j < response.data.length; j++){
            $('#gif-area').append(gifDivRow)
            // Creating divs for column using bootstrap
            let gifDivCol = $('<div id = "gif-col" class = "col-md-4">')
            let stillImg = response.data[j].images.fixed_height_still.url;
            let movingImg = response.data[j].images.fixed_height.url;
            let gifImgs = $('<button>');
            gifImgs.addClass('gif-img');
            gifImgs.attr('img-url',stillImg);
            gifImgs.attr('moving-img',movingImg);
            gifImgs.html('<img src= "' + stillImg + '">');

            // conditionals to push data to columns
            if (j < 3) {
                $(gifDivCol).append('<h3 id= "gif-title">' + response.data[j].title + '</h3>');
                $(gifDivCol).append('<h4 id= "rating-text"> Rating: ' + response.data[j].rating + '</h4>');
                 $(gifDivCol).append(gifImgs)
                 $(gifDivRow).prepend(gifDivCol)
            }else  {
                $(gifDivCol).append('<h3 id= "gif-title">' + response.data[j].title + '</h3>');
                $(gifDivCol).append('<h4 id= "rating-text"> Rating: '+ response.data[j].rating + '</h4>');
                 $(gifDivCol).append(gifImgs)
                 $(gifDivRow).prepend(gifDivCol)
            }
            
        };

       
        // when the button is clicked change the offset in the url to 11
        $(moreGif).click(function () {
            offset = offset + 11;
            console.log(offset)
            queryUrl = 'https://api.giphy.com/v1/gifs/search' + apiKey + '&q=' + topic + '&limit=10&offset=' + offset;

            $.ajax({
                url:queryUrl,
                method: 'GET'
            }).then (function (response) {
                for (let j = 0; j < response.data.length; j++){
            
                    // Creating divs for column using bootstrap
                    let gifDivCol = $('<div id = "gif-col" class = "col-md-4">')
                    let stillImg = response.data[j].images.fixed_height_still.url;
                    let movingImg = response.data[j].images.fixed_height.url;
                    let gifImgs = $('<button>');
                    gifImgs.addClass('gif-img');
                    gifImgs.attr('img-url',stillImg);
                    gifImgs.attr('moving-img',movingImg);
                    gifImgs.html('<img src= "' + stillImg + '">');
        
                            
                    // conditionals to push data to columns
                    if (j < 3) {
                        $(gifDivCol).append('<h3 id= "gif-title">' + response.data[j].title + '</h3>');
                         $(gifDivCol).append('<h3 id= "rating-text"> Rating: ' + response.data[j].rating + '</h3>');
                         $(gifDivCol).append(gifImgs)
                         $(gifDivRow).prepend(gifDivCol)
                    }else  {
                        $(gifDivCol).append('<h3 id= "gif-title">' + response.data[j].title + '</h3>');
                        $(gifDivCol).append('<h4 id= "rating-text"> Rating: '+ response.data[j].rating + '</h4>');
                         $(gifDivCol).append(gifImgs)
                         $(gifDivRow).prepend(gifDivCol)
                    }
                };    
            });
        });
        // append new images to the bottom of the page
        
       });
}

// onclick function for gifs to animate and stop animate on second click use boolen for true or false variable isRunning
function gifAnimate () {
    let gif = $(this);
    let movingGif = $(this).attr('moving-img')
    let stillGif = $(this).attr('img-url')
    console.log(movingGif);
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
        let textVal = $('#gif-input');
        let newGif = $('#gif-input').val().trim();
        if (textVal.val() === ''){
            return false;
        }else {
            topics.push(newGif);
            renderButtons();
            $('#gif-input').val('');
        }
        
        
        
        
    })
// click functions for gifs
$(document).on('click', '.gif',displayGifs)
$(document).on('click', '.gif-img',gifAnimate)

renderButtons();

 
        
              
       



