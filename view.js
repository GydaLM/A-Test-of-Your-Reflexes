updateView()
function updateView(){
    main.innerHTML = /*HTML*/ `
    <h1>A Test of Your Reflexes!</h1>
    ${drawThemeSelection()}
    <br>
    ${drawDifficultySelection()}
    ${drawAmtOfCircles()}
    <br>
    <button onclick="togglePause()">${pause ? 'Resume' : 'Pause'}</button>
    <button onclick="resetScores()">Reset All Scores</button>
    <div class="circleContainer">${drawCircles()}</div>
    <p>Time: ${reactionTime ?? '--'}</p>
    <p>High Score: ${highScore ?? '--'}</p>
    <h3>Last five scores:</h3>
    <ul>${drawLastFive(lastFive)}</ul>
    `
    //?? '--' means that if the value of reactionTime is null or undefined, show --
    addListener()
    //changes the appearance to keep the grid 3x3, 4x4 etc. based on amount of circles
    adjustGrid()
    //if the game is NOT paused, the setTimeout will run the selectDiv function
    if(!pause){
        const delay = getDelay();
        setTimeout(selectDiv, delay)
    }
    //add this so it will load the previously saved theme instead of using default
    loadSavedTheme()
    //this sets the drop down menu to match the currently chosen difficulty
    const chosenDifficulty = document.getElementById('difficultyOptions');
    if(chosenDifficulty) chosenDifficulty.value = difficulty;
    //this sets the drop down menu to match the currently chosen amount of circles
    const chosenAmount = document.getElementById('amtOfCirclesOptions');
    if(chosenAmount) chosenAmount.value = amtOfCircles;
}

function drawThemeSelection(){
    let html = /*HTML*/`
        <label for="themeOptions">Selected Theme:</label>
        <select id="themeOptions" onchange="changeTheme(this.value)">
            <option value="default">Default</option>
            <option value="dark">Dark</option>
            <option value="blue">Blue</option>
            <option value="Stephanie">Stephanie</option>
        </select>
    `
    return html;
}

function drawDifficultySelection(){
    let html = /*HTML*/`
        <label for="difficultyOptions">Selected Difficulty:</label>
        <select id="difficultyOptions" onchange="changeDifficulty(this.value)">
            <option value="easy">Easy</option>
            <option value="normal">Normal</option>
            <option value="hard">Hard</option>
        </select>
    `
    return html;
}

function drawAmtOfCircles(){
    let html = /*HTML*/`
        <label for="amtOfCirclesOptions">Selected Amount of Circles</label>
        <select id="amtOfCirclesOptions" onchange="changeAmtOfCircles(this.value)">
            <option value="nine">9</option>
            <option value="sixteen">16</option>
            <option value="twentyfive">25</option>
            <option value="thirtysix">36</option>
        </select>
    `
    return html;
}

function drawCircles(){
    let html = ``;
    for(let i=0; i<getAmount(); i++){
        html+=/*HTML*/`
        <div id="${i}" class="circle"></div>
        `
    }
    return html;
}

function drawLastFive(scores){
    let html = ``;
    for(let i=0; i<scores.length; i++){
        html+=/*HTML*/`
        <li>${scores[i]} sec</li>
        `
    }
    return html;
}