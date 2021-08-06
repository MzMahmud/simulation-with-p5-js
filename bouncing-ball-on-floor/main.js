let particles, g, wind;

function setup() {
    createCanvas(1000, 400);
    g = createVector(0, .1);
    wind = createVector(0.01, 0);
    particles = [];
    for (let i = 0; i < 10; i++) {
        particles.push(new Particle(random(1, 3), random(width), random(height / 3)));
    }
}

function draw() {
    background(80);
    for (const particle of particles) {
        particle.applyForce(p5.Vector.mult(g, particle.m));
        particle.applyForce(wind);
        particle.update();
        particle.show();
        checkEdges(particle);
    }
}

function checkEdges(particle) {
    if (particle.s.x > width) {
        particle.collideWithWall(createVector(1, 0));
        particle.s.x = width;
    } else if (particle.s.x < 0) {
        particle.collideWithWall(createVector(-1, 0));
        particle.s.x = 0;
    }
    if (particle.s.y > height) {
        particle.s.y = height;
        particle.collideWithWall(createVector(0, -1));
    }
}

function hitfloor(p) {
    return p.s.y >= height;
}

function keyPressed() {
    console.log(key);
}