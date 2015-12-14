var c                = document.getElementById("myCanvas"),
    ctx              = c.getContext("2d"),
    fps              = 60,
    impactPrcLoss    = 10,
    cps              = 60, // calculations per second
    particleSize     = 2,
    particleAmount   = 10000;

function Particle(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.v = {
        x:vx,
        y:vy
    };
}

Particle.prototype.a = {
    x:0,
    y:100
};

Particle.prototype.move = function () {
        this.x += this.v.x / cps;
        this.y += this.v.y / cps;

        //collision check
        var impactCoefficient = (100 - impactPrcLoss) / 100;
        if (this.x > c.width - particleSize) {
            this.v.x = -this.v.x;
            this.x = c.width - particleSize;
            this.v.x *= impactCoefficient;
        }
        if (this.x <= 0) {
            this.v.x = -this.v.x;
            this.x = 0;
            this.v.x *= impactCoefficient;
        }
        if (this.y > c.height - particleSize) {
            this.v.y = -this.v.y;
            this.y = c.height - particleSize;
            this.v.y *= impactCoefficient;
        }
        if (this.y <= 0) {
            this.v.y = -this.v.y;
            this.y = 0;
            this.v.y *= impactCoefficient;
        }
};

Particle.prototype.accelerate = function () {
    this.v.x += this.a.x / cps;
    this.v.y += this.a.y / cps;
};

var particles = [];
for (var i = 0; i < particleAmount; i++) {
    particles[i] = new Particle(
            rand(0,c.width-particleSize),
            rand(0,c.width-particleSize),
            rand(-50,100),
            rand(-50,100)
            );
}

function rand(min, range) {
    return Math.floor((Math.random() * range) + min);
}

function draw() {
    ctx.clearRect(0, 0, c.width, c.height);

    for (var i = 0; i < particleAmount; i++) {
        ctx.fillRect(particles[i].x, particles[i].y, particleSize, particleSize);
    }
    setTimeout(draw, 1000 / fps);
}

function calculate() {
    for (var i = 0; i < particleAmount; i++) {
        particles[i].move();
        particles[i].accelerate();
    }

    setTimeout(calculate, 1000 / cps);
}

calculate();
draw();
