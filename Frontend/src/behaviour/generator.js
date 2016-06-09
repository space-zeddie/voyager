var planets = require('./planet');

function generatePlanet() {
    planets.init($('.planet'));
    
    var x = Math.random() * $(document).innerWidth();
    var y = Math.random() * $(document).innerHeight();
    
    while (!planets.randomPlanet(x, y)) {
        x = Math.random() * $(document).innerWidth();
        y = Math.random() * $(document).innerHeight();
    }
}

exports.generatePlanet = generatePlanet;