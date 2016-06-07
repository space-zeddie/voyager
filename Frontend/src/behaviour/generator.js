var planets = require('./planet');

function generatePlanet() {
    planets.init($('.planet'));
}

exports.generatePlanet = generatePlanet;