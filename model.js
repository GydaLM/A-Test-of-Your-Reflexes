const main = document.getElementById('main');

let selectedIndex = undefined;
let startTime = null;
let finishTime = null;
let reactionTime = null;
let lastFive = [];

//this loads the highScore if it exists, the highScore string is the label you ask 
//the program to get information from
let highScore = localStorage.getItem('highScore');
if(highScore !== null){
    highScore = parseFloat(highScore);
}
