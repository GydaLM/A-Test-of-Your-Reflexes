updateView()
function updateView(){
    main.innerHTML = /*HTML*/ `
    <h1>A Test of Your Reflexes!</h1>
    <label for="themeOptions">Choose Theme:</label>
    <select id="themeOptions" onchange="changeTheme(this.value)">
        <option value="default">Default</option>
        <option value="dark">Dark</option>
        <option value="blue">Blue</option>
    </select>
    <div class="circleContainer">${drawCircles()}</div>
    <p>Time: ${reactionTime ?? '--'}</p>
    <p>High Score: ${highScore ?? '--'}</p>
    <h3>Last five scores:</h3>
    <ul>${drawLastFive(lastFive)}</ul>
    `
    //?? '--' means that if the value of reactionTime is null or undefined, show --
    addListener()
    setTimeout(selectDiv, 3000)
    //add this so it will load the previously saved theme instead of using default
    loadSavedTheme()
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