const main = document.getElementById('main');

let startTime = null;
let finishTime = null;
let reactionTime = null;
let lastFive = [];
let pause = true;

let amtOfCircles = localStorage.getItem('amtCircles') || 'twentyfive';

//declares a global variable that can be used while also loading
//the difficulty saved if it has been saved
let difficulty = localStorage.getItem('difficulty') || 'normal';

//this loads the highScore if it exists, the highScore string is the label you ask 
//the program to get information from
let highScore = localStorage.getItem('highScore');
if(highScore !== null){
    highScore = parseFloat(highScore);
}
