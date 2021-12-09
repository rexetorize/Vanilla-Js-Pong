import Ball from './Ball.js';
import Paddle from './Paddle.js';

const ball = new Ball(document.getElementById('ball'));
const playerPaddle = new Paddle(document.getElementById('p1'));
const ComputerPaddle = new Paddle(document.getElementById('p2'));

const playerScore = document.getElementById('s1');
const computerScore = document.getElementById('s2');

let lastTime;

function update(time) {
    if(lastTime != null) {
        const delta = time - lastTime;

        ball.update(delta, [playerPaddle.rect(), ComputerPaddle.rect()]);
        ComputerPaddle.computerMove(ball.y, delta);
    }

    
     lastTime = time;
    
     if(isLose()) {
            handleLose();
     }

     window.requestAnimationFrame(update);
}

function isLose() {
    const rect = ball.rect;
    if(rect.left <= 0 || rect.right >= window.innerWidth) {
        return true;
    }
}

function handleLose() {
    const rect = ball.rect;



    if(rect.left <= 0) {
        computerScore.innerText = parseInt(computerScore.innerText) + 1;
    }

    if(rect.right >= window.innerWidth) {
        playerScore.innerText = parseInt(playerScore.innerText) + 1;
    }
    ball.reset();
}


document.addEventListener('mousemove', event => {
    playerPaddle.update((event.y/window.innerHeight  ) * 100)
})

window.requestAnimationFrame(update);