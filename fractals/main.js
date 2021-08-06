const initLen = 150;
let dir, center, gen = 0, angleLeft, angleRight;

function setup() {
    createCanvas(600, 600);
    frameRate(1);
}

function draw() {
    background(83);
    if (!gen) {
        angleLeft = random(10, 60);
        angleRight = random(20, 80);
    }
    gen = (gen + 1) % 15;
    console.log(gen);
    center = createVector(width / 2, height);
    dir = createVector(0, -1);

    drawTree(center, dir, initLen, gen, angleLeft, angleRight);
}

function drawKoch(pos, dir, len, gen) {
    if (gen === 0) {
        const startX = pos.x;
        const startY = pos.y;
        pos.add(p5.Vector.mult(dir, len));
        stroke(255);
        line(startX, startY, pos.x, pos.y);
        return;
    }
    drawKoch(pos, dir, len / 3.0, gen - 1);

    dir.rotate(-PI / 3);
    drawKoch(pos, dir, len / 3.0, gen - 1);

    dir.rotate(2 * PI / 3);
    drawKoch(pos, dir, len / 3.0, gen - 1);

    dir.rotate(-PI / 3);
    drawKoch(pos, dir, len / 3.0, gen - 1);
}

function drawKochSnow(pos, gen) {
    let dir = createVector(1, 0);

    dir.rotate(-PI / 3);
    drawKoch(pos, dir, canvasSize, gen);

    dir.rotate(2 * PI / 3);
    drawKoch(pos, dir, canvasSize, gen);

    dir.rotate(2 * PI / 3);
    drawKoch(pos, dir, canvasSize, gen);
}

function drawTree(pos, dir, len, depth, angleLeft, angleRight) {
    if (depth === 0)
        return;

    const startX = pos.x;
    const startY = pos.y;
    pos.add(p5.Vector.mult(dir, len));
    stroke(255);
    line(startX, startY, pos.x, pos.y);

    let prevPos = createVector(pos.x, pos.y);

    drawTree(pos, p5.Vector.rotate(dir, angleLeft * PI / 180), len * 3 / 4, depth - 1, angleLeft, angleRight);
    drawTree(prevPos, p5.Vector.rotate(dir, -angleRight * PI / 180), len * 3.0 / 4, depth - 1, angleLeft, angleRight);
}