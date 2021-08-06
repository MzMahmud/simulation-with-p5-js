const dt = .0000001;
let particle, g;
const containerR = 300;
let center;
let particles = [];

function setup() {
    createCanvas(650, 650);
    g = createVector(0, .1);
    wind = createVector(0.01, 0);
    center = createVector(0, 0);
    translate(width / 2, height / 2);
    particles.push(new Particle(1, 1.0120, -200));
    particles.push(new Particle(1, 1.0121, -200));
}

function draw() {
    background(255);
    translate(width / 2, height / 2);


    fill(90);
    circle(center.x, center.y, containerR * 2);

    particles.forEach((particle, index) => {
        particle.applyForce(p5.Vector.mult(g, particle.m));
        particle.update();
        containWithinCircle(particle);
        if (index == 0) {
            particle.show(255, 56, 56);
            particle.showPath(255, 56, 56);
        }
        else {
            particle.show(38, 255, 49);
            particle.showPath(38, 255, 49);
        }

        if (checkContainerEdge(particle)) {
            const n = getContainerNormal(particle.s);
            particle.collideWithWall(n);
        }
    });
}

function checkContainerEdge(particle) {
    return (dist(particle.s.x, particle.s.y, center.x, center.y) + particle.r) >= containerR;
}

function getContainerNormal(pos) {
    return p5.Vector.sub(center, pos);
}

function containWithinCircle(particle) {
    particle.s.limit(containerR - particle.r);
}

function keyPressed() {
    console.log(key);
}