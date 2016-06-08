var planets = require('./planet');

function generatePlanet() {
    planets.init($('.planet'));
    planets.randomPlanet();
}

exports.generatePlanet = generatePlanet;