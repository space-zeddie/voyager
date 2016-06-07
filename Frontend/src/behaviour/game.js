var ship = require('./ship');
var generator = require('./generator');
var canvas = null;
var animFrame = null;

function init(canvas, animFrame) {
    generator.generatePlanet();
}

exports.init = init;