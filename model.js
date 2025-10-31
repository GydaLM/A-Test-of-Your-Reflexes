const main = document.getElementById('main');
const Zenos = document.getElementById('testOfReflexesZenos');
const rickRoll = document.getElementById('rickRollAudio');
const trollFace = document.getElementById('trollFaceImg');
const bgMusic = document.getElementById('bgMusic');
bgMusic.loop = true;
const laserShot = document.getElementById('laserShot');
const newHighScore = document.getElementById('newHighScore');

let startTime = null;
let finishTime = null;
let reactionTime = null;
let lastFive = [];
let pause = true;
let arcadeMode = false;

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
