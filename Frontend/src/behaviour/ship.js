var posX = 0;
var posY = 0;

function updatePosition(x, y) {
    posX += x;
    posY += y;
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