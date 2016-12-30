function Ball(x, y, r, idx) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(2, 4));
    this.r = r;
    this.idx = idx;

    this.update = function() {
        this.pos.add(this.vel);
        if (this.pos.x + this.r > WIDTH) {
            this.vel.x *= -1;
            this.pos.x = WIDTH - this.r;
        }
        if (this.pos.x - this.r < 0) {
            this.vel.x *= -1;
            this.pos.x = this.r;
        }
        if (this.pos.y + this.r > HEIGHT) {
            this.vel.y *= -1;
            this.pos.y = HEIGHT - this.r;
        }
        if (this.pos.y - this.r < 0) {
            this.vel.y *= -1;
            this.pos.y = this.r;
        }
    }

    this.draw = function() {
        fill('red');
        stroke(0);
        ellipse(this.pos.x, this.pos.y, 2 * this.r, 2 * this.r);
    }
}
