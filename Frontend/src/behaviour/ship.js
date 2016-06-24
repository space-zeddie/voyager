var posX = 0;
var posY = 0;
var bottom = $(document).innerHeight() - 50;

function updatePosition(x, vy, ya, t) {
    posX += x;
    var newY = posY + vy*t + 0.5*ya*t*t;
    if ((posY >= bottom || posY <= 0) && (newY >= bottom || newY <= 0))
        return;
    //if (t !== 0) alert(x + ', ' + vy +', ' + t);
    posY = newY;
}

function setPosition(x, y) {
    posX = x;
    posY = y;
}

function setX(x){posX += x;}

function position() {
    return {x: posX, y: posY};
}

exports.updatePosition = updatePosition;
exports.setPosition = setPosition;
exports.setX = setX;
exports.position = position;