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


var h2 = document.querySelector("h2");
let modul1 = document.getElementById("start");
let modul2 = document.getElementById("win");
let spieler= document.querySelector(".player");
let startKnopf= document.querySelector(".startButton");
const allEnemies = [];
let counter = document.querySelector(".score");
const allGems = [];
            




class Hero {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.stepWidth = 101;
        this.jumpHeight = 83;
        this. sprite ='images/grass-block.png';
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
                let moves1=counter.innerHTML;
                
                
                    moves1=0;
                    this.x=this.startX;
                this.y=this.startY;
                    counter.innerHTML=moves1;
               
            }
            
        }
        // console.log(this.y);
     if(this.y===-23){
            console.log("Win!");
            
            let moves=counter.innerHTML;
            modul2.classList.add("show");
            setTimeout(() => {
                
            moves++;
            this.x=this.startX;
            this.y=this.startY;
            counter.innerHTML=moves;
            modul2.classList.remove("show");
            },1000);
            
            

        }
        // Check collision here // Did player x and y collide with enemy? // Check win here?// Did player x and y reach final tile?
    }
};

class Gems  {
    constructor(){
        this.x1 = 0;
        this.y1 = 0;
        this.stepWidth1 = 101;
        this.jumpHeight1 = 83;
        this. sprite1 ='images/Gem Blue.png';
        this.startX = this.stepWidth1* 1;
        this.startY = (this.jumpHeight1 * 0) + 60;
        this.x1 = this.startX;
        this.y1 = this.startY;
       
    }
    render () {
        ctx.drawImage(Resources.get(this.sprite1), this.x1, this.y1);
    }
    update(){
        if(player.y===this.y1 && player.x===this.x1){
            console.log("Collect");
    
        }
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
        if(target.classList.contains("buttonI")){
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
    
    startButton();
    
}

const player=new Hero();
const gem = new Gems();

startGame();




function startButton(){
    startKnopf.addEventListener("click", function startButton(e) {
        let target=e.target;
        if(target.classList.contains("startButton")){
            // player;
            const cocinelle1 = new Enemy(-101,0,200);
            const cocinelle2 = new Enemy(-101,83,400);
            const cocinelle21 = new Enemy(-101,83,800);
            const cocinelle3 = new Enemy(-101,(83*2),300);
            const cocinelle4 = new Enemy(-101,(83*2),500);
            allEnemies.push(cocinelle1);
            allEnemies.push(cocinelle2);
            allEnemies.push(cocinelle21);
            allEnemies.push(cocinelle3);
            allEnemies.push(cocinelle4);
        }
    });
}
function Restart(){
    document.addEventListener("click", function reset(e){
        let target=e.target;
        if(target.classList.contains("restartButton")){
            let restartScore=counter.innerHTML;
            restartScore=0;
            counter.innerHTML=restartScore;
        }
    });
}
Restart();
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
