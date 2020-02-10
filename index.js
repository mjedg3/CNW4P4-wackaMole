const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

// integral, hich generates random pop up function 
randomTime = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

randomHole = (holes) => {
    const holeGen = Math.floor(Math.random() * holes.length);
    const hole = holes[holeGen];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}
peep = () => {
    const time = randomTime(400, 2000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

// start game - score is set to 0 peep function runs and time is set
startGame = () => {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 30000)
}
bonk = (e) => {
    if (MouseEvent.isTrusted) return;
    score++;
    //   removes camera on click
    e.target.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}
moles.forEach(mole => mole.addEventListener('click', bonk));

// moles = camera 