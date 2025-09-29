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
        allCircles[i].addEventListener('click', targetClick);
    }
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

function changeTheme(theme){
    //removes the theme classes from body
    document.body.classList.remove('default-theme', 'dark-theme', 'blue-theme')
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