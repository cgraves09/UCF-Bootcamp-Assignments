
// Create array of objects questions and answers
let questions = [
 { 
    question: 'When Michael Jordan played for the Chicago Bulls, how many NBA Championships did he win?',
        a: '7',
        b: '4',
        c: '6',
        d: '3',
    correctAnswer: 'c',
    image: "assets/images/jordan.jpg"
},

 { 
        question: 'Which planet has the most gravity?',
            a: 'Jupiter',
            b: 'Mars',
            c: 'Pluto',
            d: 'Venus',
        correctAnswer: 'a',
        image: "assets/images/jupiter.png"
    },

 { 
        question: 'What or who is the Ford Mustang named after?',
            a: 'The mustang horse',
            b: 'General Thomas Mustang',
            c: 'Captain Thomas Mustang',
            d: 'A fighter plane from WWII',
        correctAnswer: 'd',
        image: "assets/images/mustang.jpg"
        },

   { 
        question: 'Which European nation was said to invent hot dogs?',
            a: 'Italy',
            b: 'Germany',
            c: 'France',
            d: 'England',
        correctAnswer: 'b',
        image: "assets/images/germany.jpg"
    }];
let questionsTwo = [
{
    question: 'What country won the very first FIFA World Cup in 1930?',
    a: 'Italy',
    b: 'Uraguay',
    c: 'Germany',
    d: 'Brazil',
correctAnswer: 'b',
image: "assets/images/uraguay.jpg"
},
{
question: 'Which company owns Bugatti, Lamborghini. Audi, Porsche and Ducati?',
a: 'Mercedes',
b: 'Bremen LLC',
c: 'Volkswagen',
d: 'BMW',
correctAnswer: 'c',
image: "assets/images/volkswagen.png"
},
{
question: 'How many times does the heart beat per day?',
a: '10,00',
b: '75,000',
c: '78,500',
d: 'More than 100,000',
correctAnswer: 'd',
image: "assets/images/heart.gif"
},
{
question: 'How many Grammys does John Legend have?',
a: '5',
b: '7',
c: '0',
d: '10',
correctAnswer: 'd',
image: "assets/images/legend.jpg"
}];
// global variables
let runningQuestion = 0;
let counter;
let timer;
let correct = 0;
let incorrect = 0;
let isQuestionsLoaded = false;
let choicesHidden = $('#a,#b,#c,#d');
let rounds;
// clear out any html on the page
clear();
// hide title for animation on start
$('#title').hide();
setTimeout(function (){$('#title').slideDown(4000)}, 2000);
// start the game with click
let startButton = $('#start-button').click(function () {
    correct = 0;
    incorrect = 0;
    runningQuestion = 0;
    audioIntro()
    clear();
    renderQuestion(questions);
});

// function to pull object questions
function renderQuestion (question) {
    startButton.hide();
    // argument will be saved in rounds variable
    rounds = question;
    console.log(question);
    isQuestionsLoaded = false;
    console.log(runningQuestion);
    let q = question[runningQuestion];
    // timeout functions to load questions one by one
    setTimeout(function() {$('#question').text(q.question).show()},1000);
    setTimeout(function() {$('#a').html("<h3> A: " + q.a + "</h3").show()},1000);
    setTimeout(function() {$('#b').html("<h3> B: " + q.b + "</h3").show()},2000);
    setTimeout(function() {$('#c').html("<h3> C: " + q.c + "</h3").show()},3000);
    setTimeout(function() {$('#d').html("<h3> D: " + q.d + "</h3").show()},4000);
    setTimeout(function (){isQuestionsLoaded = true;},5000);
    setTimeout(function (){$('#time-left').show()},5000);
    
    counter = 15;
    // Interval set for question timer
    timer = setInterval(function(){
        counter--;
        $('#time-left').html("<h3> Time Remaining: " + counter + "</h3>");
        if (counter === 0) {
            audioWrong();
            clearInterval(timer)
            timeUp();
        }
    }, 1000); 

};

// function to check users selection
function checkAnswer(answer) {
    // Check if questions have loaded
    if (!isQuestionsLoaded) {
        return false
    }
    if(rounds[runningQuestion].correctAnswer === answer) {
        audioCorrect();
        correct++;
        $('#time-left').text('');
        $('#question').html('');
        $('#answer-check').show().html("<h1> Correct!</h1>");
        $('#answer-check').show().append('<img class= "img-thumbnail" src=' + rounds[runningQuestion].image +  '>');
        choicesHidden.hide();
        clearInterval(timer)
        setTimeout(clear,4000);
        setTimeout(nextQuestion,5000); 
        
    }else if ((rounds[runningQuestion].correctAnswer != answer)){
        audioWrong();
        incorrect++;
        $('#time-left').text('');
        $('#question').html("<h1> Correct Answer was : " + rounds[runningQuestion].correctAnswer.toUpperCase() + "</h1>");
        $('#answer-check').show().html("<h1> WRONG! </h1>");
        $('#answer-check').show().append('<img class= "img-thumbnail" src= "assets/images/wrong.gif" alt = >');
        choicesHidden.hide();
        clearInterval(timer);
        setTimeout(clear,4000);
        setTimeout(nextQuestion,5000);
    } 
    
};
// function to go to the next question in array
function nextQuestion () {
    let score = correct + incorrect;
    console.log(score);
    let lastQuestionIndex = rounds.length -1;
    // Check if there are questions left
    if (runningQuestion < lastQuestionIndex) {
        runningQuestion++;
        renderQuestion(rounds);
    } else {
        if( score === 4){
            $('#question').show().html("<h1> Score Update </h1>");        
            $('#counter').show().html("<h1> Answers Right: " + correct +  "</h1>");
            $('#counter').show().append("<h1> Answers Wrong: " + incorrect +  "</h1>");
            $('#next-round-button').text('Next Round').show();
            $('#time-left').text('');
            if (correct > incorrect){
                $('#answer-check').show().html("<h1> What a Smarty Pants! </h1>");
                $('#counter').show().append('<img class= "img-thumbnail" src= "assets/images/smarty.gif" >');
            }
            else if (correct === incorrect){
            $('#answer-check').show().html("<h1> You can do better! </h1>");
            $('#counter').show().append('<img class= "img-thumbnail" src= "assets/images/do-better.gif" >');
            }
            else {
            $('#answer-check').show().html("<h1> Jeeze read a book! </h1>");
            $('#counter').show().append('<img class= "img-thumbnail" src= "assets/images/read.gif" >');
            };

        choicesHidden.hide();
        clearInterval(timer)
        } else {
            $('#start-button').text('Try Again').show();    
            $('#counter').show().html("<h1> Answers Right: " + correct +  "</h1>");
            $('#counter').show().append("<h1> Answers Wrong: " + incorrect +  "</h1>");
            if (correct > incorrect){
                $('#answer-check').show().html("<h1> What a Smarty Pants! </h1>");
                $('#counter').show().append('<img class= "img-thumbnail" src= "assets/images/not-mad.gif" >');
            }
            else if (correct === incorrect){
            $('#answer-check').show().html("<h1> Well I guess your'e half an idiot! </h1>");
            $('#counter').show().append('<img class= "img-thumbnail" src= "assets/images/shake-head.gif" >');
            }
            else {
            $('#answer-check').show().html("<h1> Thats just embarrassing! </h1>");
            $('#counter').show().append('<img class= "img-thumbnail" src= "assets/images/half-idiot.gif" >');
            };
            
        choicesHidden.hide();
        clearInterval(timer)
        }
    }
};
// clear function to clear html inbetween dynamic changes
function clear () {
    $('#next-round-button').hide();
    $('#time-left').hide(); 
    $('#question').hide(); 
    $('#answer-check').hide();
    $('#counter').hide();
    choicesHidden.hide();
    
};

// Function to display html when counter has reached 0
function timeUp () {
        
        incorrect++;
        $('#time-left').text('');
        $('#question').html("<h1> Times Up</h1>");
        $('#answer-check').show().html("<h1> Correct Answer was : " + rounds[runningQuestion].correctAnswer.toUpperCase() + "</h1>");
        $('#answer-check').show().append('<img class= "img-thumbnail" src="assets/images/times-up.gif">');
        choicesHidden.hide();
        clearInterval(timer)
        setTimeout(clear,5000);
        setTimeout(nextQuestion,6000); 
};

// audio functions
function audioIntro () {
    let audio = document.getElementById('myAudioStart');
    audio.play();
};
function audioCorrect () {
    let audio = document.getElementById('myAudioCorrect');
    audio.play();
};
function audioWrong () {
    let audio = document.getElementById('myAudioLoss');
    audio.play();
};
// Function for second round of questions
let nextRoundButton = $('#next-round-button').click(function () {
    runningQuestion = 0;
    audioIntro()
    clear();
    renderQuestion(questionsTwo);
});