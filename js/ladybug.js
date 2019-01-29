'use strict';
//Code from Zack Ensign on  https://codepen.io/zensign/pen/RPoEPG

let pi2 = Math.PI * 2;

function Ladybug() {
    this.speed = .5,
        this.rotation = 0,
        this.tRotatation = 0,
        this.sprite = null,


        this.init = function(ix, iy, irotation) {
            this.rotation = irotation;
            this.tRotatation = irotation;
            this.sprite = document.createElement('div');
            this.sprite.setAttribute('class', 'ladybug');
            this.sprite.innerHTML = '<span></span><i></i><span></span>';
            document.getElementById('container').appendChild(this.sprite);

            this.x = ix;
            this.y = iy;
        },

        this.wander = function(objects) {
            if ((this.x < 0 || this.x > window.innerWidth || this.y < 0 || this.y > window.innerHeight)) {
                this.repel = true;
                this.tRotatation += .01;

            } else if (count % Math.round(Math.random() * 100) == 0 && !this.repel) {
                count = 0;
                this.tRotatation = this.tRotatation + ((Math.random() * 2) - 1);
            } else {
                this.repel = false;
            }

            if (this.rotation < 0 || this.rotation > pi2) {
                this.rotation = Math.abs(pi2 - this.rotation);
                this.tRotatation = Math.abs(pi2 - this.tRotatation);
            }

            this.rotation += (this.tRotatation - this.rotation) * .05;

            this.y += this.speed * Math.cos(this.rotation);
            this.x += this.speed * Math.sin(this.rotation);

            let transformStyle = 'rotate(' + (-this.rotation) + 'rad)';

            this.sprite.style.transform = transformStyle;
            this.sprite.style.webkitTransform = transformStyle;
            this.sprite.style.mozTransform = transformStyle;
            this.sprite.style.oTransform = transformStyle;
            this.sprite.style.left = this.x + 'px';
            this.sprite.style.top = this.y + 'px';
        },

        this.distance = function(x1, y1, x2, y2) {
            let distX = x2 - x1;
            distX = distX * distX;
            let distY = y2 - y1;
            distY = distY * distY;
            return Math.sqrt(distX + distY);
        }
}

function App() {
    this.ladies = [],
        this.totalLadies = 20,

        this.createLadies = function() {
            for (let i = 0; i < this.totalLadies; i++) {
                let lady = new Ladybug();
                lady.init(Math.random() * window.innerWidth, Math.random() * window.innerHeight, Math.random() * pi2);

                this.ladies.push(lady);
            }
        },

        this.updateLadies = function() {
            for (let i = 0; i < this.totalLadies; i++) {
                this.ladies[i].wander(this.ladies);
            }
        }
}
let count = 0;
let app = new App();
app.createLadies();

function step() {
    app.updateLadies();
    window.requestAnimationFrame(step);
    count++;
}

window.requestAnimationFrame(step);