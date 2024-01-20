console.log('Hello World!');

//defining variables for the game
let sequence;
let attempt;
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
const yellow = document.getElementById('yellow');
const blue = document.getElementById('blue');
 
// selecting buttons from centre panel and saving each one to a variable
const btnStart = document.getElementById('btn-start');
const btnStrict = document.getElementById('toggle-strict');
const labelStrict = document.getElementById('label-strict');
const counter = document.getElementById('counter');
const btnResetCounter = document.getElementById('btn-reset-counter');
const btnMute = document.getElementById('toggle-mute');
const labelMute = document.getElementById('label-mute');


//attaching event listeners to panels and buttons
const panels = [green, red, yellow, blue];
panels.forEach((panel) => {
    panel.addEventListener('click', () => {
        if (on) {
            flash(panel)
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

btnResetCounter.addEventListener('click', () => {
    counter.innerHTML = "-";
    clearInterval(intervalId);
})

//Sound effects
    //.wav sound files are located in the audio folder
    // source: https://freesound.org/people/Jaz_the_MAN_2/packs/17749/

const sounds = {
    green: new Audio("./../audio/do.wav"),
    red: new Audio("./../audio/mi.wav"),
    blue: new Audio("./../audio/sol.wav"),
    yellow: new Audio ("./../audio/do_octave.wav"),
    error: new Audio ("https://s3.amazonaws.com/adam-recvlohe-sounds/error.wav")
}
    
// function that flashes a panel when clicked
function flash(panel) {
    console.log(panel.id)
    panel.classList.add('active');
    if (!mute) {
        sounds[panel.id].play();
    }
    
    
    setTimeout(() => {
        panel.classList.remove('active');
    }, 500);
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

function gameTurn() {
    on = false; // player can't click on panels?

    if (flashes === turn) { //compTurn is over
        clearInterval(intervalId);
        compTurn = false;
        // clearColor();
        on = true;
    }

    if (compTurn) {
        // clearColor();
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
            flash++
        }, 200);

    }
}

//function that runs after start button is clicked
function play() {
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


