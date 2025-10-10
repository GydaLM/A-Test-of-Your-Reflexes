function selectDiv(){
//finds all elements that has the .circle class and adds it to a NodeList (similar to an array)
//querySelector just gives you the first match
const allCircles = document.querySelectorAll('.circle');
    randomIndex = Math.floor(Math.random()*allCircles.length);
    document.getElementById(randomIndex).classList.add('targetToClick');
    //saves the time the function runs aka when the div has the targetToClick class added
    startTime = new Date().getTime();
}

function addListener(){
    const allCircles = document.querySelectorAll('.circle');
    //adds an eventListener to every element with circle on it that activates the function 
    //targetClick when clicked
    for(let i=0; i<allCircles.length; i++){
        const circle = allCircles[i];

        if(difficulty==='Mavi'){
            //mouseenter makes it so that the event activates *once* when you hover over
            //the element the event listener is on
            //event get's passed into the code as a parameter after the arrow and along
            //to the trollMavi function
            circle.addEventListener('mouseenter', (event) => {
                if(circle.classList.contains('targetToClick')){
                    trollMavi(event);
                }
            });
        }
        else{
            circle.addEventListener('click', targetClick);
        }
    }
}
//changes the appearance of the grid depending on the amount of circles
function adjustGrid(){
    const container = document.querySelector('.circleContainer');
    if(!container) return;
    //gives the value of the amount the number chosen by getAmount
    const amount = getAmount();
    //finds the square root of the selected amount of circles
    const gridSize = Math.sqrt(amount);
    //this changes the gap between the cells in the grid (aka the space between circles in this case)
    //and changes it based on the amount of circles
    let gapSize;
    if(amount <= 9) gapSize = '40px';
    else if(amount <= 16) gapSize = '30px';
    else if(amount <= 25) gapSize = '20px';
    else gapSize = '15px';

    container.style.display = 'grid';
    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.gap = gapSize;
}

//event is a built in function of the browser with information it sends by default, one of the
//things it sends is when it was clicked
function targetClick(event){
    //if the element that is clicked on does NOT contain the class targetToClick, jump out of 
    //the function and don't run the rest of the code in it
    if(!event.currentTarget.classList.contains('targetToClick')) return;

    finishTime = new Date().getTime();
    let spentMilliseconds = Math.floor(finishTime - startTime);
    reactionTime = spentMilliseconds / 1000;

    if(highScore === null || reactionTime<highScore){
        highScore=reactionTime;
        //saves the highScore in the web browser so that it is remembered if you refresh the page
        //the 'highScore' is the label you give it so you can look for it later, can be anything
        //highScore is the variable aka the information/value itself
        localStorage.setItem('highScore', highScore);
    }

    //unshift adds reactionTime to the beginning of the array aka index 0 and moves the other
    //items in the array one to the right
    lastFive.unshift(reactionTime);
    //makes it so that the if statement activates when the array has more than 5 items
    if(lastFive.length > 5){
        //removes the oldest score aka the item with highest index in the array
        lastFive.pop();
    }
    updateView()
}

//adds an event that checks if the spacebar button has been pressed down, does NOT wait
//until it has been released (that is keyup instead of keydown)
document.addEventListener('keydown', function(event){
    if(event.code === 'Space') {
        // //puts the variable to be what it ISN'T before aka toggle between pause = true/false
        // //moved it down to onclick function so it does the same as the button with onclick
        // pause = !pause;
        //add this to prevent the screen from scrolling when you click spacebar
        event.preventDefault();
        togglePause()
    }
});
function togglePause(){
    pause = !pause;
    const overlay = document.getElementById('pauseSection');
    if(pause){
        overlay.classList.remove('hidden');
        document.body.classList.toggle('paused', pause);
    }
    else{
        overlay.classList.add('hidden');
        //checks if the difficulty is Mavi once you unpause, and if it is it runs the
        //rickRollTroll function after 10 seconds
        if(difficulty === 'Mavi') setTimeout(rickRollTroll, 10000);
    }
    updateView()
}

function resetScores(){
    highScore = null;
    reactionTime = null;
    lastFive = [];
    localStorage.removeItem('highScore');
    updateView()
}

//Functions related to changing the difficulty!

function changeDifficulty(level){
    difficulty = level;
    if(difficulty === 'hard'){
        Zenos.volume = 0.5;
        Zenos.play()
    }
    else if(difficulty === 'Mavi'){
        setTimeout(rickRollTroll, 10000)
    }
    //saves the chosen diffculty to local storage, like with the high score
    localStorage.setItem('difficulty', difficulty);
    updateView()
}

//this functions decides how long the delay will be depending on what difficulty is chosen
function getDelay(){
    if(difficulty === 'easy'){
        return 0;
    }
    else if(difficulty === 'normal'){
        return 3000;
    }
    else if(difficulty === 'hard'){
        //4001 so it will be 4000 ms = 4 sec exactly and not 3999 ms which is right under 4 sec
        return Math.floor(Math.random()*4001);
    }
    else return 1000;
}

//Functions related to changing the amount of circles

function changeAmtOfCircles(amount){
    amtOfCircles = amount;
    //saves the chosen amount of circles to local storage, like with the high score
    localStorage.setItem('amtCircles', amtOfCircles);
    updateView()
}

function getAmount(){
    if(amtOfCircles === 'nine'){
        return 9;
    }
    else if(amtOfCircles === 'sixteen'){
        return 16;
    }
    else if(amtOfCircles === 'twentyfive'){
        return 25;
    }
    else return 36;
}

//Functions related to changing the theme!

//This way doesnt require a global theme variable since it is stored locally and only used there
function changeTheme(theme){
    //removes the theme classes from body
    document.body.classList.remove('default-theme', 'dark-theme', 'blue-theme', 'Stephanie-theme')
    //adds the selected theme to body
    document.body.classList.add(`${theme}-theme`)
    //save the theme in local storage so it stays, like with the high score
    localStorage.setItem('saveTheme', theme)
}

function loadSavedTheme(){
    //looks if there is any theme saved in the saveTheme and if that fails it loads default
    const theme = localStorage.getItem('saveTheme') || 'default';
    changeTheme(theme);
    //finds the drop down element from the drop down list
    const themeOptions = document.getElementById('themeOptions');
    //checks if the element with id theme selector exists and if it does it changes the value
    //of the dropdown menu to show the currently selected theme
    if(themeOptions){
        themeOptions.value = theme;
    }
}
//function that makes the difficulty "Mavi"
function trollMavi(event){
    const allCircles = document.querySelectorAll('.circle');
    const target = document.querySelector('.targetToClick');
    
    //checks if the target has value and if it does, removes the classlist that shows
    //it's the one to be clicked
    if(target){
        target.classList.remove('targetToClick');
    }

    let newIndex;
    do{
        newIndex = Math.floor(Math.random()*allCircles.length);
    }
    while(allCircles[newIndex]===target);

    allCircles[newIndex].classList.add('targetToClick');

    startTime = new Date().getTime();
}
function rickRollTroll(){
    if(!pause){
        rickRoll.volume = 0.5;
        rickRoll.play()

        trollFace.classList.remove('hidden');
        trollFace.classList.add('show');
        //removes the troll face img when the music file is done playing
        rickRoll.onended = () => {
            trollFace.classList.remove('show');
            trollFace.classList.add('hidden');
        }
    }
}
//function that makes sure everything loads correctly as paused when you first open the page
//it listenes for when the HTML elements are fully loaded, but before any media is done loading
//the () is for parameters you would want to pass to the function => replaces function() and
//directly runs the code after rather than having it in it's own function
document.addEventListener('DOMContentLoaded', () =>{
    const overlay = document.getElementById('pauseSection');
    //checks if pause is true and overlay has a value
    if(pause && overlay) overlay.classList.remove('hidden');
    //you can skip the {} if the if check only has one condition (it's a shorthand version)
    if(typeof updateView === 'function') updateView();
});
