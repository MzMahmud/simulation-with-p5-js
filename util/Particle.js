class Particle {
    constructor(m, x, y) {
        this.m = m;
        this.r = this.m * 8;
        this.s = createVector(x, y);
        this.v = createVector(0, 0);
        this.a = createVector(0, 0);
        this.path = [];
    }

    applyForce(f) {
        const a = p5.Vector.div(f, this.m);
        this.a.add(a);
    }

    update() {
        this.path.push(createVector(this.s.x, this.s.y));
        if (this.path.length > 5000) {
            this.path = [];
        }
        this.v.add(this.a);
        this.s.add(this.v);
        this.a.mult(0);
    }

    collideWithWall(wallNormal) {
        const n = p5.Vector.normalize(wallNormal);
        const doubleVdotN = 2 * this.v.dot(n);
        const neg = p5.Vector.mult(n, doubleVdotN);
        this.v.sub(neg);
    }

    show(r, g, b) {
        if (r === undefined) {
            r = 255;
            g = 255;
            b = 255;
        }
        fill(r, g, b);
        circle(this.s.x, this.s.y, this.r * 2);
    }

    showPath(r, g, b) {
        beginShape();
        for (const point of this.path) {
            stroke(r, g, b, 150);
            noFill();
            vertex(point.x, point.y);
        }
        endShape();
    }
}