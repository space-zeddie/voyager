var planets = require('./planet');

function generatePlanet() {
    planets.init($('.planet'));
    
    var x = Math.random() * $(document).innerWidth();
    var y = Math.random() * $(document).innerHeight();
    
    planets.randomPlanet(x, y);
}

exports.generatePlanet = generatePlanet;