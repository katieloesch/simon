console.log('Hello World!');

//defining variables for the game
let sequence;
let attempt=[];
let flashes;
let turn;
let match;
let compTurn;
let intervalId;
let win;
let strict = false;
let mute = false;
let on = true;

// selecting the 4 different panels and saving each one to a variable
const green = document.getElementById('green');
const red = document.getElementById('red');
const blue = document.getElementById('blue');
const yellow = document.getElementById('yellow');
 
// selecting buttons from centre panel and saving each one to a variable
const btnStart = document.getElementById('btn-start');
const btnStrict = document.getElementById('toggle-strict');
const labelStrict = document.getElementById('label-strict');
const counter = document.getElementById('counter');
const btnMute = document.getElementById('toggle-mute');
const labelMute = document.getElementById('label-mute');


//attaching event listeners to panels and buttons
const panels = [green, red, blue, yellow];

panels.forEach((panel) => {
    panel.addEventListener('click', () => {
        if (on) {
            flash(panel)
            attempt.push(panels.indexOf(panel)+1)
            console.log(attempt)
            checkAttempt();
        };
    })
})

btnStrict.addEventListener('change', (e) => {
    strict = e.target.checked;
    console.log(strict);
})

labelStrict.addEventListener('click', (e) => {
    strict = !strict;
    btnStrict.checked = !btnStrict.checked;
    console.log(strict);
})

btnMute.addEventListener('change', (e) => {
    mute = e.target.checked;
    console.log(mute);
})

labelMute.addEventListener('click', (e) => {
    mute = !mute;
    btnMute.checked = !btnMute.checked;
    console.log(mute);
})

btnStart.addEventListener('click', (e) => {
    if (win || on) {
        play();
    }
});

//Sound effects
    //.wav sound files are located in the audio folder
    // source: https://freesound.org/people/Jaz_the_MAN_2/packs/17749/

const sounds = {
    green: new Audio("./../audio/do.wav"),
    red: new Audio("./../audio/mi.wav"),
    blue: new Audio("./../audio/sol.wav"),
    yellow: new Audio ("./../audio/do_octave.wav"),
    fail: new Audio ("./../audio/fail.mp3"),
    win: new Audio ("./../audio/win.mp3")
}
    
// function that flashes a panel when clicked
function flash(panel) {
    console.log('flash runnings')
    console.log(panel.id)
    panel.classList.add('active');
    if (!mute) {
        sounds[panel.id].play();
    }
    
    setTimeout(() => {
        panel.classList.remove('active');
    }, 500);

    console.log('flash done')
}

function flashAll() {
    panels.forEach((panel) => {
        panel.classList.add('active');
        setTimeout(() => {
            panel.classList.remove('active');
        }, 500);
    })
}

// function that returns a random sequence of 20 indexes ranging from 1-4
function getRandomSequence() {
    let arr = [];
    for (let i = 0; i < 20; i++) {
        arr.push(Math.floor(Math.random() * 4) + 1);
    }
   
    console.log(arr);
    return arr;
}

function gameWon() {
    flashAll();
    counter.innerHTML = 'WIN!';
    on = false;
    win = true;

    if (!mute) {
        sounds['win'].play();
    }
}

function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

function checkAttempt() {
    if (!arrayEquals(attempt, sequence.slice(0, attempt.length))) {
        console.log('FAIL')
        console.log('expected: ', sequence.slice(0, attempt.length))
        console.log('given: ', attempt)
        console.log('bool: ', arrayEquals(attempt, sequence.slice(0, attempt.length)))
        match = false;
        counter.innerHTML = "NO!"
        if (!mute) {
            sounds['fail'].play();
        }
        flashAll();
        setTimeout(() => {
            counter.innerHTML = turn;
            if (strict) {
                play()
            } else {
                compTurn = true;
                flashes = 0;
                attempt = [];
                match = true;
                intervalId = setInterval(gameTurn, 800)
            }
        }, 800)
    }
    if (turn === attempt.length && match && !win) {
        turn++;
        attempt = [];
        compTurn = true;
        flashes = 0;
        counter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);
    }

    if (attempt.length === 20 && match) {
        gameWon();
    }
}

function gameTurn() {
    console.log('game turn running')
    on = false; // player can't click on panels

    if (flashes == turn) { //compTurn is over
        console.log('player turn')
        clearInterval(intervalId);
        compTurn = false;
        on = true;
    }

    if (compTurn) {
        console.log("computer's turn")
        setTimeout(() => { // clockwise: 1 -> green | 2 -> red | 3 -> blue | 4 -> yellow
            if (sequence[flashes] === 1) {
                flash(green);
            } else if (sequence[flashes] === 2) {
                flash(red);
            } else if (sequence[flashes] === 3) {
                flash(blue);
            } else {
                flash(yellow);
            }
            flashes++
        }, 200);

    }
    console.log('flashes: ', flashes)
}

//function that runs after start button is clicked
function play() {
    console.log('play running')
    win = false;
    sequence = getRandomSequence();
    attempt = [];
    intervalId = 0;
    flashes = 0;
    turn = 1;
    counter.innerHTML = 1;
    match = true;
    compTurn = true;
    intervalId = setInterval(gameTurn, 800);
}


