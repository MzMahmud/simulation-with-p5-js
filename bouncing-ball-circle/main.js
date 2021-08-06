const containerR = 275;
let center, g, particles;

function init() {
    background(255);
    translate(width / 2, height / 2);
    g = createVector(0, .1);
    center = createVector(0, 0);
    particles = [];
    const pos1 = JSON.parse(document.getElementById("coord-ball-1").value);
    const pos2 = JSON.parse(document.getElementById("coord-ball-2").value);
    particles.push(new Particle(1, pos1[0], -pos1[1]));
    particles.push(new Particle(1, pos2[0], -pos2[1]));
}

function setup() {
    createCanvas(600, 600);
    init();
}

function draw() {
    background(255);
    translate(width / 2, height / 2);

    fill(5, 25, 51);
    circle(center.x, center.y, containerR * 2);

    particles.forEach((particle, index) => {
        particle.applyForce(p5.Vector.mult(g, particle.m));
        particle.update();
        containWithinCircle(particle);
        if (index == 0) {
            particle.show(255, 196, 107);
            particle.showPath(255, 196, 107);
        }
        else {
            particle.show(132, 223, 251);
            particle.showPath(132, 223, 251);
        }

        if (checkContainerEdge(particle)) {
            const n = getContainerNormal(particle.s);
            particle.collideWithWall(n);
        }
    });
}

document.getElementById("reset").addEventListener("click", init);
document.getElementById("pause").addEventListener("click", () => noLoop());
document.getElementById("play").addEventListener("click", () => loop());

function checkContainerEdge(particle) {
    return (dist(particle.s.x, particle.s.y, center.x, center.y) + particle.r) >= containerR;
}

function getContainerNormal(pos) {
    return p5.Vector.sub(center, pos);
}

function containWithinCircle(particle) {
    particle.s.limit(containerR - particle.r);
}