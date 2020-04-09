require("dotenv").config()
const axios = require('axios');
const spotifyNode = require('node-spotify-api');
const moment = require('moment');
const keys = require("./keys.js");
const fs = require("fs");
var bandApiKey = keys.bandsInTown.apiKey
var movieApiKey = keys.ombd.apiKey


// GLOBAL VARIABLES 
var arg = process.argv;
var options = process.argv[2];
var emptyArray = [];
var argString;
var spotifyLimit = 5;

// Conditionals based on user entry
if (options === "spotify-this-song") {
  for (var i = 3; i < arg.length; i++){
    emptyArray.push(arg[i]);
  };  
  argString = emptyArray.join('+');    
  thisSong();
}

if (options === "concert-this"){
  for (var i = 3; i < arg.length; i++){
    emptyArray.push(arg[i]);
  };  
  argString = emptyArray.join('+');    
  concerts();
}
if (options === "movie-this"){
  if(process.argv[3] === undefined){
    argString = "mr+nobody"
    noMovie();
  }else{
    for (var i = 3; i < arg.length; i++){
      emptyArray.push(arg[i]);
    };  
    argString = emptyArray.join('+');    
    movies();    
  }

}
if(options === "do-what-it-says"){
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
    return console.log(error);
  }
  
    var dataArr = data.split(",");
    options = dataArr[0];
    argString = dataArr[1]
    thisSong();
  })
}

// Spotify Api Function
function thisSong(){
  var spotify = new spotifyNode(keys.spotify);
  spotify
    .search({ type: 'track', query: argString,limit: spotifyLimit })
    .then(function(response) {
      
      var itemsArray = response.tracks.items;
      
      for(var j = 0; j < itemsArray.length; j++ ){
        
        for(var k = 0; k < itemsArray[j].artists.length; k++  ){
          var artist = itemsArray[j].artists[k].name;
          var songName = itemsArray[j].name;
          var url = itemsArray[j].preview_url;
          var album = itemsArray[j].album.name;
          console.log("\nArtist Name: " + artist + "\n Song: " + songName + "\n Preview Url " + url + "\n Album: " + album + "\n"); 
        }
      }
      if(itemsArray[0]=== undefined){
        songString = "the+sign";
        spotifyLimit = 1;
        thisSong();
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}
// Bands In Town Api Function
function concerts(){
  axios.get("https://rest.bandsintown.com/artists/" + argString + "/events?app_id=" + bandApiKey)
  .then(function(response){
    var data = response.data
    for (var i = 0; i < data.length; i++){
      var venue = data[i].venue.name
      var location = data[i].venue.city + " " + data[i].venue.region;
      var formatDate = moment(data[i].datetime).format("dddd, MMMM Do YYYY, h:mm");
      console.log("\nVenue: " + venue + "\n Location: " + location + "\n Time: " + formatDate + "\n");
    }
  })
}
// OMB Api Function
function movies(){
  axios.get("http://www.omdbapi.com/?t=" + argString + "&apikey=" + movieApiKey)
  .then(function(response){
    var data = response.data;
    var title = data.Title;
    var year = data.Year;
    var imdbRating = data.Ratings[0].Value;
    var rtRating = data.Ratings[1].Value;
    var country = data.Country;
    var language = data.Language;
    var plot = data.Plot;
    var actors = data.Actors;
    console.log("\nTitle: " + title + "\n Year: " + year + "\n Imdb Rating: " + imdbRating + "\n Rotten Tomatos Rating: "
     + rtRating + "\n Country Produced: " + country + "\n Language: " + language + "\n Plot: " + plot + "\n Actors: " + actors + "\n");
    
  })
}

function noMovie (){
  axios.get("http://www.omdbapi.com/?t=" + argString + "&apikey=trilogy")
    .then(function(response){
      var data = response.data;
      var title = data.Title;
      var year = data.Year;
      var imdbRating = data.imdbRating;
      var country = data.Country;
      var language = data.Language;
      var plot = data.Plot;
      var actors = data.Actors;
      console.log("\nTitle: " + title + "\n Year: " + year + "\n Imdb Rating: " + imdbRating
        + "\n Country Produced: " + country + "\n Language: " + language + "\n Plot: " + plot + "\n Actors: " + actors + "\n");
    
  })  
}


