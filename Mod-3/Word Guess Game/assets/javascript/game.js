// Global variables

// Creating array of word bank
const wordBank = ['golf', 'baseball','tennis','rugby','soccer', 'basketball', 'football',];

// variables for game
let chosenWord = '';
let lettersInChosenWord = [];
let blankWord = []; 
let letterCount = 0;
let wrongGuess = [];

//Game counters
let wins = 0;
let loss = 0;
let numGuess = 13;



// Start of game Function

function start()  { 
    // reset game values
    numGuess = 13;
   


    // choose a random word
    chosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    // test chosenWord selection
    console.log(chosenWord);
    // convert the random word into a string
    lettersInChosenWord = chosenWord.split('');
    letterCount = lettersInChosenWord.length;
    //testing indexing of random word
    console.log(letterCount);
    
    blankWord = [];

    wrongGuess = [];
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

// // Function to run after a guess has been made
function afterGuess () {

    console.log('Wins' + wins, 'Loss' + loss, 'Guess Left' + numGuess);

    // Dom manipulation to html file update id tags
    document.getElementById('current-word-text').innerHTML = blankWord.join('');
    document.getElementById('letters-guessed-text').innerHTML = wrongGuess.join('');
    document.getElementById('guesses-remaining-text').innerHTML = numGuess;

    // If all the correct letters have been guessed
    if (lettersInChosenWord.toString() === blankWord.toString()) {
        wins++;
        alert('You Win! ' + 'Word is ' + chosenWord);
        document.getElementById('wins-text').innerHTML = wins;
        
        //restart the game
        start();
    }
    // if number of guesses have ran out
    else if (numGuess === 0) {
        loss++;
        alert('You lose');
        document.getElementById('loss-text').innerHTML = loss;
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
}
