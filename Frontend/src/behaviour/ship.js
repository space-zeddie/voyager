var posX = 0;
var posY = 0;
var bottom = $(document).innerHeight();

function updatePosition(x, vy, ya, t) {
   // if (posY >= bottom || posY <= 0)
     //   return;
    posX += x;
    //if (t !== 0) alert(x + ', ' + vy +', ' + t);
    posY += vy*t + 0.5*ya*t*t;
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