// Global variables

// Creating array of word bank
const wordBank = ['golf', 'baseball','tennis','volleyball','soccer', 'basketball', 'football',];

// variables for game
let chosenWord = '';
let lettersInChosenWord = [];
let blankWord = []; 
let letterCount = 0;
let wrongGuess = [];
let descriptionText = '';
//Game counters
let wins = 0;
let loss = 0;
let numGuess = 13;



// Start of game Function

function start()  { 
    // reset game values
    numGuess = 13;
    blankWord = [];
    wrongGuess = [];

    // choose a random word
    chosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    // test chosenWord selection
    console.log(chosenWord);
    // convert the random word into a string
    lettersInChosenWord = chosenWord.split('');
    letterCount = lettersInChosenWord.length;
    //testing indexing of random word
    console.log(letterCount);
    
    // creating blank spaces for the letterCount
    for(i = 0; i < letterCount; i++){
        blankWord.push(' _ ');
    };
    //test of blanks in letterCount array
    console.log(blankWord);
    document.getElementById('current-word-text').innerHTML = blankWord;
    
};

function checkLetters(letters) {
    // setting variable to false 
    let letterInWord = false;

    // creating a loop to check if letter occurs in chosenWord
    for (let i = 0; i < letterCount; i++) {
        if (chosenWord[i] === letters) {
            letterInWord = true;
        }
    }

    // Creating second loop to check other occurences of letter in chosenWord
    if(letterInWord) {
        for(let j = 0; j < letterCount; j++) {
            if (chosenWord[j] === letters) {
                blankWord[j] = letters;
            
            }
        }
         console.log(blankWord);
    }
    else {
        wrongGuess.push(letters);
        numGuess--;
    }
};
// Function for image matching wordChoice
function imgPic () {
    let image = document.getElementById('img-pic');

    if (chosenWord === 'football'){
       image.src = 'assets/images/football.jpg';    
    } 
     else if (chosenWord === 'soccer') {
        image.src = 'assets/images/soccer.png'; 
    }

    else if (chosenWord === 'golf'){
        image.src = 'assets/images/golf.png';    
     } 
     else if (chosenWord === 'basketball') {
         image.src = 'assets/images/basketball.png'; 
     }
     else if (chosenWord === 'volleyball'){
        image.src = 'assets/images/volleyball.png';    
     } 
     else if (chosenWord === 'baseball') {
         image.src = 'assets/images/baseball.png'; 
     }
     else if (chosenWord === 'tennis') {
        image.src = 'assets/images/tennis.png'; 
    }
    
};



// function to display loser image
function loserImg () {
    let image = document.getElementById('img-pic');
    image.src = 'assets/images/loser.jpg';
};
// function for audio win and loss
function audioWin () {
    let audio = document.getElementById('myAudio');

    audio.play();
};

function audioLose () {
    let audioLoser = document.getElementById('myAudioLoss');
    audioLoser.play();
};


// // Function to run after a guess has been made
function afterGuess () {

    // Dom manipulation to html file update id tags
    document.getElementById('current-word-text').innerHTML = blankWord.join('');
    document.getElementById('letters-guessed-text').innerHTML = wrongGuess.join('');
    document.getElementById('guesses-remaining-text').innerHTML = numGuess;

    // If all the correct letters have been guessed
    if (lettersInChosenWord.toString() === blankWord.toString()) {
        wins++;
        
        document.getElementById('description-text').innerHTML = ('You Win! ' + 'Word is ' + chosenWord);
        document.getElementById('wins-text').innerHTML = wins;
        // pushes correct image to chosen word
        imgPic();
        audioWin();
        //restart the game
        start();
        
        
    }
    // if number of guesses have ran out
    else if (numGuess === 0) {
        loss++;
        document.getElementById('description-text').innerHTML = ('Haha you lose!');
        document.getElementById('loss-text').innerHTML = loss;
        loserImg();
        audioLose();
        start();
    }
    
}


//Start the game

start();
// Capture the users guess on the keyboard
document.onkeyup = function(event) {
    let userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    
    //Runs function to check user guess
    checkLetters(userGuess);
    // Run Function after each guess
    afterGuess();
};
