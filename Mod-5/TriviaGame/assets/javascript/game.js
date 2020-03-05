// Create array of objects questions and answers
let questions =[
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
// global variables
let lastQuestionIndex = questions.length -1;
let runningQuestion = 0;
let counter;
let timer;
let score;
let correct = 0;
let incorrect = 0;
let isQuestionsLoaded = false;
// clear out any html on the page
clear();
// start the game with click
let startButton = $('#start-button').click(function () {
    correct = 0;
    incorrect = 0;
    runningQuestion = 0;
    audioIntro()
    clear();
    renderQuestion();
});

// function to pull object questions
function renderQuestion () {
    startButton.hide();
    isQuestionsLoaded = false;
    let q = questions[runningQuestion];
    setTimeout(function() {$('#question').text(q.question).show()},1000);
    setTimeout(function() {$('#a').html("<h3> A: " + q.a + "</h3").show()},1000);
    setTimeout(function() {$('#b').html("<h3> B: " + q.b + "</h3").show()},2000);
    setTimeout(function() {$('#c').html("<h3> C: " + q.c + "</h3").show()},3000);
    setTimeout(function() {$('#d').html("<h3> D: " + q.d + "</h3").show()},4000);
    setTimeout(function (){isQuestionsLoaded = true;},5000);
    setTimeout(function (){$('#time-left').show()},5000);
    counter = 15;
    
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
    if (!isQuestionsLoaded) {
        return false;
    }
    if(questions[runningQuestion].correctAnswer === answer) {
        audioCorrect();
        correct++;
        $('#time-left').text('');
        $('#question').html("<h1> Get ready for the next question </h1>");
        $('#a').html("<h1> Congrats you got it right!</h1>");
        $('#b').html('<img src="' + questions[runningQuestion].image + '" width="460" height="345">');
        $('#c').hide();
        $('#d').hide();
        clearInterval(timer)
        setTimeout(clear,4000);
        setTimeout(nextQuestion,5000); 
        
    }else if ((questions[runningQuestion].correctAnswer != answer)){
        audioWrong();
        incorrect++;
        $('#time-left').text('');
        $('#question').html("<h1> Correct Answer was : " + questions[runningQuestion].correctAnswer + "</h1>");
        $('#a').html("<h1> WRONG! </h1>");
        $('#b').html('<img src= "assets/images/wrong.gif" width="460" height="345">');
        $('#c').hide();
        $('#d').hide();
        clearInterval(timer);
        setTimeout(clear,4000);
        setTimeout(nextQuestion,5000);
    } 
    
};
// function to go to the next question in array
function nextQuestion () {
    if (runningQuestion < lastQuestionIndex) {
        runningQuestion++;
        renderQuestion();
    } else {
        $('#start-button').text('Try Again').show();
        $('#time-left').text('');
        $('#question').html("<h1> Not too Shabby </h1>").show();
        $('#a').html("<h1> Answers Right: " + correct +  "</h1>").show();
        $('#b').html("<h1> Answers Wrong: " + incorrect +  "</h1>").show();
        $('#c').html('<img src= "assets/images/celebration.gif" width="460" height="345">').show();
        $('#d').hide();
        clearInterval(timer)
    }
}
// clear function to clear any html
function clear () {
    $('#time-left').hide(); 
    $('#question').hide(); 
    $('#a').hide(); 
    $('#b').hide(); 
    $('#c').hide();
    $('#d').hide(); 
}
// Function to display html when counter has reached 0
function timeUp () {
        incorrect++;
        $('#time-left').text('');
        $('#question').html("<h1> Times Up</h1>");
        $('#a').html("<h1> Correct Answer was : " + questions[runningQuestion].correctAnswer + "</h1>");
        $('#b').html('<img src="assets/images/times-up.gif" width="460" height="345">');
        $('#c').hide();
        $('#d').hide();
        clearInterval(timer)
        setTimeout(clear,5000);
        setTimeout(nextQuestion,6000); 
}

// audio functions
function audioIntro () {
    let audio = document.getElementById('myAudioStart');
    audio.play();
}
function audioCorrect () {
    let audio = document.getElementById('myAudioCorrect');
    audio.play();
}
function audioWrong () {
    let audio = document.getElementById('myAudioLoss');
    audio.play();
}




