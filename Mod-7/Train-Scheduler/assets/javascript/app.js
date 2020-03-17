var firebaseConfig = {
  apiKey: "AIzaSyAWAH_-G_Zl20QJgt_f176mDthHJd1ZL4Q",
  authDomain: "mod-7-b6fec.firebaseapp.com",
  databaseURL: "https://mod-7-b6fec.firebaseio.com",
  projectId: "mod-7-b6fec",
  storageBucket: "mod-7-b6fec.appspot.com",
  messagingSenderId: "505060654433",
  appId: "1:505060654433:web:940e102ad4c212753b5920"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

// Function to capture train information and display to current train Schedule
function trainSchedule () {
  let tName = $('#train-input').val();
  let destination = $('#destination-input').val();
  let frequency = $('#frequency-input').val();
  let trainTimeHr = $('#train-time-input-hr').val();
  let trainTimeMin = $('#train-time-input-min').val();
  let firstTrain = trainTimeHr + trainTimeMin
  console.log(frequency)
 
  if (tName === '' || destination === '' || frequency === '' || frequency === '0' || firstTrain === ''){
    alert('Please check inputs')
    return false
  }
  database.ref().push({
    Train: tName,
    Destination: destination,
    frequency: frequency,
    firstTrain: firstTrain
    
  })

}

database.ref().on('child_added', function(snapshot){

  let trainDivCol = $('<div class="col-md-2">');
  let destinationDivCol = $('<div class="col-md-2">');
  let frequencyDivCol = $('<div class="col-md-2">');
  let trainTimeDivCol = $('<div class="col-md-2">');
  let minutesDivCol = $('<div class="col-md-4">');
  let lineBreak = $('<hr>');

  // First train time sets the starting time
  // frequency sets the next arrival div
  let currentTime = moment();
  let trainStart = moment(snapshot.val().firstTrain, 'HH:mm').subtract(1,'years');
  let diffTime = currentTime.diff(moment(trainStart), 'minutes');
  let tRemainder = diffTime % snapshot.val().frequency;
  let minAway = snapshot.val().frequency - tRemainder;
  let nextArrivalMin = moment().add(minAway, 'minutes');
  let nextArrival = moment(nextArrivalMin).format('hh:mm')
  
  
  trainDivCol.text(snapshot.val().Train);
  destinationDivCol.text(snapshot.val().Destination);
  frequencyDivCol.text(snapshot.val().frequency);
  trainTimeDivCol.text(nextArrival);
  minutesDivCol.text(minAway);
  $('#current-train').append(trainDivCol,destinationDivCol,frequencyDivCol,trainTimeDivCol,minutesDivCol,lineBreak);
})
function audioTrain (){
  let audio = document.getElementById('train-horn');
  audio.play();
}
$('#submit').click(function(event){
  event.preventDefault();
  audioTrain();
  trainSchedule();
})