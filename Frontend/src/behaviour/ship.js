var posX = 0;
var posY = 0;
var bottom = $(document).innerHeight();

function updatePosition(vx, vy, t) {
    if (posY >= bottom || posY <= 0)
        return;
    posX += vx*t;
    posY += vy*t;
}

function setPosition(x, y) {
    posX = x;
    posY = y;
}

function position() {
    return {x: posX, y: posY};
}

exports.updatePosition = updatePosition;
exports.setPosition = setPosition;
exports.position = position;