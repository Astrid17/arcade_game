"use strict";
/////////////////////////////////

//    INFORMATION
//    Project..............Arcade Game (Udacity Front-end Nanodegree Programm)
//    Creator..............Astrid Deleersnyder

//    CONTENTS
//    1. LADYBUG.JS
//       Walking ladybugs background
//       Code from  Zack Ensign  on https://codepen.io/zensign/pen/RPoEPG

//    2. APP.JS
//      1) Hero initialization..........
//      2) Gem  initialization...........
//      3) Enemy initialization...
//      4) Start Game Function...
//      5) Start Button Function.........
//      6) Restart Button Function.........
//      7) Reset Game Function.........
//      8) Keyup Event Listener Function.........

///////////////////////////////////////////////

let modul1 = document.getElementById("start");
let modul2 = document.getElementById("win");
let spieler = document.querySelector(".player");
let startKnopf = document.querySelector(".startButton");
const allEnemies = [];
let counter = document.querySelector(".score");
let canvas = document.querySelector("canvas");
let allGems = ['images/Gem Blue.png', 'images/Gem Orange.png', 'images/Gem Green.png'];
let x1;
let y1;


// 1) Hero initialization

class Hero {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.stepWidth = 101;
        this.jumpHeight = 83;
        this.sprite = 'images/grass-block.png';
        this.startX = this.stepWidth * 2;
        this.startY = (this.jumpHeight * 4) + 60;
        this.x = this.startX;
        this.y = this.startY;
    }

    // Draw  hero sprite on current x and y coord position
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Defines how the player moves
    handleInput(input) {
        if (input === 'right') {
            if (this.x < this.stepWidth * 4) {
                this.x += this.stepWidth;
            }
        } else if (input === 'left') {
            if (this.x > 0) {
                this.x -= this.stepWidth;
            }

        } else if (input === 'up') {
            if (this.y > 0) {
                this.y -= this.jumpHeight;
            }

        } else if (input === 'down') {
            if (this.y < this.jumpHeight * 4) {
                this.y += this.jumpHeight;
            }

        }
    }
    //Defines collision with Enemy and Gem
    update() {

        for (let enemy of allEnemies) {

            if (this.y === enemy.y && enemy.x < this.x && this.x < enemy.x + 101) {

                let moves1 = counter.innerHTML;


                moves1 = 0;
                this.x = this.startX;
                this.y = this.startY;
                counter.innerHTML = moves1;

            }


        }
        //If collision with gem than hide gem
        if (this.y === gem.y1 && this.x === gem.x1) {
            counter.innerHTML = parseInt(counter.innerHTML, 0) + 10;
            gem.x1 = -101;
            gem.y1 = -101;

            //Defines Win when player in water is
        } else if (this.y === -23) {

            let moves = counter.innerHTML;

            modul2.classList.add("show");
            setTimeout(() => {
                moves++;
                this.x = this.startX;
                this.y = this.startY;

                counter.innerHTML = moves;

                modul2.classList.remove("show");
                resetGem();

            }, 1000);



        }

    }
};

// 2) Gem Initialization
class Gems {
    constructor() {
        this.x1 = 0;
        this.y1 = 0;
        this.stepWidth1 = 101;
        this.jumpHeight1 = 83;
        this.sprite1 = allGems[Math.floor(Math.random() * 3)];
        this.startX = this.stepWidth1 * 1;
        this.startY = (this.jumpHeight1 * 0) + 60;
        this.x1 = this.startX;
        this.y1 = this.startY;

    }
    render() {
        ctx.drawImage(Resources.get(this.sprite1), this.x1, this.y1);

    }

};


//  3) Enemy initialization

let Enemy = function(x, y, speed) {

    this.x = 0;
    this.y = y + 60;
    this.speed = speed;
    this.stepWidth = 101;
    this.sprite = 'images/enemy-bug.png';
    this.boundary = this.stepWidth * 5;
    this.resetPos = -this.stepWidth;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    if (this.x < this.boundary) {
        this.x += this.speed * dt;
    } else {
        this.x = this.resetPos;
    }
    // If enemy is not passed boundary
    // Move forward
    // Increment x by speed * dt
    // else
    // Reset pos to start
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// 4) Start Game Function
// User can choose which player he wants to play
function startGame() {
    modul1.classList.add("show");
    spieler.addEventListener("click", function spielerButton(e) {
        const target = e.target;
        if (target.classList.contains("buttonI")) {
            modul1.classList.remove("show");
            player.sprite = ('images/char-boy.png');
        } else if (target.classList.contains("button2")) {
            modul1.classList.remove("show");
            player.sprite = ('images/char-cat-girl.png');
        } else if (target.classList.contains("button3")) {
            modul1.classList.remove("show");
            player.sprite = ('images/char-horn-girl.png');
        } else if (target.classList.contains("button4")) {
            modul1.classList.remove("show");
            player.sprite = ('images/char-pink-girl.png');
        } else if (target.classList.contains("button5")) {
            modul1.classList.remove("show");
            player.sprite = ('images/char-princess-girl.png');
        }
    });

    startButton();

}

const player = new Hero();
let gem = new Gems();



startGame();



// 5) Start Button Function
//If Start Button clicked than Bugs are walking
function startButton() {
    startKnopf.addEventListener("click", function startButton(e) {
        let target = e.target;
        if (target.classList.contains("startButton")) {
            allEnemies = [
                new Enemy(-101, 0, 200),
                new Enemy(-101, 83, 50),
                new Enemy(-101, 83, 300),
                new Enemy(-101, (83 * 2), 250),
                new Enemy(-101, (83 * 2), 150)
            ];
        }
    });
}

// 6) Restart Button Function
//Resets Counter
function Restart() {
    document.addEventListener("click", function reset(e) {
        let target = e.target;
        if (target.classList.contains("restartButton")) {
            let restartScore = counter.innerHTML;
            restartScore = 0;
            counter.innerHTML = restartScore;
        }
    });
}
Restart();

// 7) Reset Gem Function
//Reset Gem on a random position and color
function resetGem() {
    gem.x1 = Math.floor(Math.random() * 5) * 101;
    gem.y1 = Math.floor(Math.random() * 4) * 83 + 60;
    gem.sprite1 = allGems[Math.floor(Math.random() * 3)];
};

// 8) Keyup Event Listener Function
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});