var c                = document.getElementById("myCanvas"),
    ctx              = c.getContext("2d"),
    fps              = 50,
    impactPrcLoss    = 10,
    cps              = 100 // calculations per second;

var particle = {
    x          : 400,
    y          : 400,
    v          : [0, 0],
    a          : [-3, -3]

    move       : function () {
                    this.x += this.v[0] / cps;
                    this.y += this.v[1] / cps;

                    var impactCoefficient = (100 - impactPrcLoss) / 100;
                    if (this.x > c.width) {
                        this.v[0] = -this.v[0];
                        this.x = c.width;
                        this.v[0] *= impactCoefficient;
                    }
                    if (this.x <= 0) {
                        this.v[0] = -this.v[0];
                        this.x = 0;
                        this.v[0] *= impactCoefficient;
                    }
                    if (this.y > c.height) {
                        this.v[1] = -this.v[1];
                        this.y = c.height;
                        this.v[1] *= impactCoefficient;
                    }
                    if (this.y <= 0) {
                        this.v[1] = -this.v[1];
                        this.y = 0;
                        this.v[1] *= impactCoefficient;
                    }
                },
    accelerate : function () {
                    this.v[0] += this.a[0] / cps;
                    this.v[1] += this.a[1] / cps;
                }
}

function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillRect(particle.x, particle.y, 5, 5);

    setTimeout(draw, 1000 / fps);
}

function calculate() {
    particle.move();
    particle.accelerate();

    setTimeout(calculate, 1000 / cps);
}

calculate();
draw();
