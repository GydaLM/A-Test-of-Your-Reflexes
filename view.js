updateView()
function updateView(){
    main.innerHTML = /*HTML*/ `
    <h1>A Test of Your Reflexes!</h1>
    ${drawThemeSelection()}
    ${drawDifficultySelection()}
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

function drawCircles(){
    let html = ``;
    for(let i=0; i<25; i++){
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