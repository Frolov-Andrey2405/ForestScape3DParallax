const canvas = document.getElementsByClassName('rain')[0];
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function randomNum(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function RainDrop(x, y, endy, velocity, opacity) {
    this.x = x;
    this.y = y;
    this.endy = endy;
    this.velocity = velocity;
    this.opacity = opacity;

    this.draw = function () {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y - this.endy);
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.stroke();
    };

    this.update = function () {
        const rainEnd = window.innerHeight + 100;
        if (this.y >= rainEnd) {
            this.y = this.endy - 100;
        } else {
            this.y += this.velocity;
        }
        this.draw();
    };
}

const rainArray = [];

for (let i = 0; i < 140; i++) {
    const rainXLocation = Math.floor(Math.random() * window.innerWidth) + 1;
    const rainYLocation = Math.random() * -500;
    const randomRainHeight = randomNum(10, 2);
    const randomSpeed = randomNum(20, 0.2);
    const randomOpacity = Math.random() * 0.55;
    rainArray.push(new RainDrop(rainXLocation, rainYLocation, randomRainHeight, randomSpeed, randomOpacity));
}

function animateRain() {
    requestAnimationFrame(animateRain);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (const rainDrop of rainArray) {
        rainDrop.update();
    }
}

animateRain();
