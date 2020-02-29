$(document).ready(function(){

// Create game counter hold values of wins and loss & text for win or loss
let wins = 0;
let loss = 0;
let total = 0;
let ruby = Math.floor(Math.random() * 11) + 1;
let diamond = Math.floor(Math.random() * 11) + 1;
let citrine = Math.floor(Math.random() * 11) + 1;
let emerald = Math.floor(Math.random() * 11) + 1;

  
// Generate computer score number between 30 and 50
let computerScore = Math.floor(Math.random()* 102) + 19 ;
$('#computer-score').html(computerScore);


total = 0;
$('#user-score').text(total);

// 4 buttons that have different random values use on 'click' function
$('#ruby').click(function(){
    total += ruby;
    $('#user-score').text(total);
    result()
});

$('#diamond').click(function(){
    total += diamond;
    $('#user-score').text(total);
    result() ;
});

$('#citrine').click(function(){
    total += citrine;
    $('#user-score').text(total);
    result();
});

$('#emerald').click(function(){
    total += emerald;
    $('#user-score').text(total);
   result();
  
   
});


// if statement user score === computer score win ... vis versa
function result() {
    if ( total === computerScore) {
        wins++;
        $('#game-text').text('You Win!');
        $('#wins-text').text('Wins: ' + wins);
        
        secondReset();
    } else if ( total > computerScore) {
        loss++;
        $('#game-text').text('You Lose!');
        $('#loss-text').text('Loss: ' + loss);
        
        secondReset();
    }
};
//  Figuring out a reset for the game to add new values attached to crystals
function secondReset() {
     total = 0;
    $('#user-score').html(total);
    computerScore = Math.floor(Math.random()* 102) + 19 ;
    $('#computer-score').html(computerScore);
    ruby = Math.floor(Math.random() * 11) + 1;
    diamond = Math.floor(Math.random() * 11) + 1;
    citrine = Math.floor(Math.random() * 11) + 1;
    emerald = Math.floor(Math.random() * 11) + 1;
    console.log(total);


};


});
