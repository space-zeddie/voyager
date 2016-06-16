var cosmos = require('./planet');
var levelWidth = 10000;
var levelHeight = 900;
var sectionWidth = 1000;
var planets = [];

var PLANET_TEMPLATE = '<div class="planet"><div class="gravity-field"><div class="planet-surface"></div></div></div>';
var $planets = $('.planets');

function generatePlanet() {
    
    function planetsOverlap(planet1, planet2) {
        var cx1 = planet1.physics.centerX;
        var cy1 = planet1.physics.centerY;
        var cx2 = planet2.physics.centerX;
        var cy2 = planet2.physics.centerY;
        var dist = Math.sqrt((cx1 - cx2) * (cx1 - cx2) + (cy1 - cy2) * (cy1 - cy2));
        var lim1 = planet1.physics.fieldRadius + planet2.physics.surfaceRadius;
        var lim2 = planet2.physics.fieldRadius + planet1.physics.surfaceRadius;
        
        return dist <= lim1 || dist <= lim2;
    }
    
    function appendPlanetDiv(planet) {
        var $elem = $(PLANET_TEMPLATE);
        $elem.addClass(planet.style.fieldSize);
        $elem.find('.planet-surface').addClass(planet.style.planetSize);
        $elem.find('.planet-surface').addClass(planet.style.planetColour);
        $planets.append($elem);
    }
    
    function randomPlanet() {    
       // alert(planets.length);
        
        function newPlanet() {
            var x = Math.random() * $(document).innerWidth();
            var y = Math.random() * $(document).innerHeight();
            var g = Math.random();
            return cosmos.Planet(x, y, g);
        }
        
        function overlaps(planet, planets) {
            if (!planet)
                return true;
            planets.forEach(function (p) {
                if (planetsOverlap(p, planet))
                    return true;
               // alert(planetsOverlap(p, planet));
            });
            return false;
        }
        
        var planet = newPlanet();
        while (!overlaps(planet)) {
            planet = newPlanet();   
          //  alert('iter');
        }
       // } else {
        appendPlanetDiv(planet);
        planets.push(planet);   
    }
    
   // var planet1 = cosmos.Planet(500, 500, 0.9);
   // var planet2 = cosmos.Planet(600, 600, 0.9);
   // appendPlanetDiv(planet1);
   // appendPlanetDiv(planet2);
   // alert(planetsOverlap(planet1, planet2));
    randomPlanet();
    randomPlanet();
    
}

exports.generatePlanet = generatePlanet;