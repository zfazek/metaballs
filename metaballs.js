var WIDTH = 150;
var HEIGHT = 150;

var balls = [];
var tempBalls = [];
var N = 4;
var looping = true;

function setup() {
    pixelDensity(1);
    result = select('#result');
    var myCanvas = createCanvas(WIDTH, HEIGHT);
    myCanvas.parent('myCanvas');
    for (var i = 0; i < N; i++) {
        var r = random(20, 30);
        balls.push(new Ball(random(WIDTH), random(r, HEIGHT - r), r, i));
    }
}

function drawFrameRate() {
    if (frameCount % 10 === 0) {
        result.html("FPS: " + floor(frameRate()));
    }
}

function drawBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].draw();
    }
}

function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        tempBalls[i] = balls[i];
    }
    for (var i = 0; i < balls.length; i++) {
        balls[i].update();
    }
}

function update() {
    var max = 0;
    var min = 1000000;
    loadPixels();
    for (var x = 0; x < WIDTH; x++) {
        for (var y = 0; y < HEIGHT; y++) {
            var index = x + y * WIDTH;
            index *= 4;
            var sum = 0;
            for (var i = 0; i < balls.length; i++) {
                var d = dist(x, y, balls[i].pos.x, balls[i].pos.y);
                sum += 75 * balls[i].r / d;
            }
            if (sum > max) max = floor(sum);
            if (sum < min) min = floor(sum);
            var value = map(sum, min, max, 0, 255);
            value = sum;
            pixels[index] = value;
            pixels[index + 1] = value;
            pixels[index + 2] = value;
            pixels[index + 3] = 255;
        }
    }
    updatePixels();
}

function draw() {
    background(51);
    update();
    updateBalls();

    drawFrameRate();
//    drawBalls();
}

function mousePressed() {
    if (looping) {
        noLoop();
        looping = false;
    } else {
        loop();
        looping = true;
    }
}
