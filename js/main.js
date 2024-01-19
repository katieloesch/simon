console.log('Hello World!');


// selecting the 4 different panels and saving each one to a variable
const green = document.getElementById('green');
    green.addEventListener('click', () => {
        flash(green);
    })
const red = document.getElementById('red');
    red.addEventListener('click', () => {
        flash(red);
    })
const yellow = document.getElementById('yellow');
    yellow.addEventListener('click', () => {
        flash(yellow);
    })
const blue = document.getElementById('blue');
    blue.addEventListener('click', () => {
        flash(blue);
    })

// saving all panels into an array
const panels = [green, red, yellow, blue];

const sounds = {
    green: new Audio("./../audio/do.wav"),
    red: new Audio("./../audio/mi.wav"),
    blue: new Audio("./../audio/sol.wav"),
    yellow: new Audio ("./../audio/do_octave.wav"),
    error: new Audio ("https://s3.amazonaws.com/adam-recvlohe-sounds/error.wav")
}
    

// selecting buttons from centre panel
const btnStart = document.getElementById('btn-start');
const btnStrict = document.getElementById('toggle-strict');
const labelStrict = document.getElementById('label-strict');




//Sound effects
    //.wav sound files are located in the audio folder
    // source: https://freesound.org/people/Jaz_the_MAN_2/packs/17749/



// function that flashes a panel
function flash(panel) {
    console.log(panel.id)
    panel.classList.add('active');
    setTimeout(() => {
        panel.classList.remove('active');
    }, 750);
    sounds[panel.id].play();
}