var c                = document.getElementById("myCanvas"),
    ctx              = c.getContext("2d"),
    fps              = 50,
    impactPrcLoss    = 10,
    cps              = 100, // calculations per second
    particleSize     = 10;

var particle = {
    x:        400,
    y:        400,
    v:        {
                x:10,
                y:11
              },
    a:        {
                x:0,
                y:0
              },

    move:        function () {
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
                },
    accelerate:  function () {
                    this.v.x += this.a.x / cps;
                    this.v.y += this.a.y / cps;
                }
}

function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillRect(particle.x, particle.y, particleSize, particleSize);

    setTimeout(draw, 1000 / fps);
}

function calculate() {
    particle.move();
    particle.accelerate();

    setTimeout(calculate, 1000 / cps);
}

calculate();
draw();
