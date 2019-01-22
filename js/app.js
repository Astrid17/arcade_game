// Hero class
     // Constructor
        // Properties
            // x pos
            // y pos
            // Sprite image
        // Methods
            // Update collision 
                // Check collision here
                    // Did player x and y collide with enemy?
                // Check win here?
                    // Did player x and y reach final tile?
            // Render
                // Draw player sprite on current x and y coord position
            // Handle keyboard input
                // Update player's x and y property according to input
            // Reset Hero
                // Set x and y to starting x and y
var timerCount;
let timerPause = false;
let timerStart = false;
let delay = 1200;
var seconds = 0;
var minutes = 0;
var hours = 0;
let time = document.querySelector('.time');
var h2 = document.querySelector("h2");
let modul1 = document.getElementById("start");
let spieler= document.querySelector(".player");
const allEnemies = [];

function add() {

    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    h2.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function timer() {

    timerCount = setTimeout(add, 1000);
    timerStart = true;
}

//Resets Timer 
function clearTime() {

    seconds = 0;
    minutes = 0;
    hours = 0;
    h2.innerHTML = "00:00:00";


}
//  timer();


class Hero {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.stepWidth = 101;
        this.jumpHeight = 83;
        this. sprite ='images/char-cat-girl.png';
        this.startX = this.stepWidth* 2;
        this.startY = (this.jumpHeight * 4) + 60;
        this.x = this.startX;
        this.y = this.startY;
    }

    // Draw  hero sprite on current x and y coord position
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(input){
        if(input==='right'){
            if (this.x <this.stepWidth *4){
                this.x+=this.stepWidth;
            } 
        }
        else if(input==='left'){
            if(this.x>0){
                this.x-=this.stepWidth;
            }
            
        }
        else if(input==='up'){
            if(this.y>0){
                this.y-=this.jumpHeight;
            }
            
        }
        else if(input==='down'){
            if(this.y< this.jumpHeight*4){
                this.y+=this.jumpHeight;
            }
            
        }
    }
    update(){
        for(let enemy of allEnemies){
            // console.log(enemy);
            
            if(this.y===enemy.y && enemy.x<this.x && this.x<enemy.x+101  ){
                console.log(" same row");
                console.log(" same column");
                console.log("Hit");
                this.x=this.startX;
                this.y=this.startY;
            }
            
        }
        console.log(this.y);
     if(this.y===-23){
            console.log("Win!");
        }
        // Check collision here // Did player x and y collide with enemy? // Check win here?// Did player x and y reach final tile?
    }
};


// Enemies our player must avoid

var Enemy = function(x,y, speed){
    
    this.x = 0;
    this.y = y+60;
    this.speed = speed;
    this.stepWidth= 101;
    this.sprite = 'images/enemy-bug.png';
    this.boundary = this.stepWidth * 5;
    this.resetPos = -this.stepWidth;
    

    
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if(this.x < this.boundary){
        this.x+=this.speed*dt;
    }
    else{
        this.x=this.resetPos;
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

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

function startGame(){
    modul1.classList.add("show");
    spieler.addEventListener("click", function spielerButton(e) {
        const target = e.target;
        if(target.classList.contains("button1")){
            console.log("Erste button");
            modul1.classList.remove("show");
            player.sprite=('images/char-boy.png');
        }else if(target.classList.contains("button2")){
            console.log("zweite button");
            modul1.classList.remove("show");
            player.sprite=('images/char-cat-girl.png');
        }else if(target.classList.contains("button3")){
            console.log("dritte button");
            modul1.classList.remove("show");
            player.sprite=('images/char-horn-girl.png');
        }else if(target.classList.contains("button4")){
            console.log("vier button");
            modul1.classList.remove("show");
            player.sprite=('images/char-pink-girl.png');
        }else if(target.classList.contains("button5")){
            console.log("fünfte button");
            modul1.classList.remove("show");
            player.sprite=('images/char-princess-girl.png');
        }
    });
    
}


startGame();
const player = new Hero();
const cocinelle1 = new Enemy(-101,0,200);
const cocinelle2 = new Enemy(-101,83,300);
const cocinelle3 = new Enemy(-101,(83*2),300);

allEnemies.push(cocinelle1);
allEnemies.push(cocinelle2);
allEnemies.push(cocinelle3);

function startButton(){
    
}

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
