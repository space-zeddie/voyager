var cosmos = require('./planet');
var levelWidth = 10000;
var levelHeight = 900;
var sectionWidth = 1000;
var planets = [];

var PLANET_TEMPLATE = '<div class="planet"><div class="gravity-field"><div class="planet-surface"></div></div></div>';
var $planets = $('.planets');

function generatePlanet(limWidthLower, limWidth, limHeight, planets) {
    
    function planetsOverlap(planet1, planet2) {
        var cx1 = planet1.physics.centerX;
        var cy1 = planet1.physics.centerY;
        var cx2 = planet2.physics.centerX;
        var cy2 = planet2.physics.centerY;
        var dist = Math.sqrt((cx1 - cx2) * (cx1 - cx2) + (cy1 - cy2) * (cy1 - cy2));
        var lim1 = planet1.physics.fieldRadius + planet2.physics.surfaceRadius;
        var lim2 = planet2.physics.fieldRadius + planet1.physics.surfaceRadius;
        
        return (dist <= lim1 || dist <= lim2);
        //alert(dist <= lim1);
        //return (dist <= lim1);
    }
    
    function appendPlanetDiv(planet) {
        var $elem = $(PLANET_TEMPLATE);
        $elem.addClass(planet.style.fieldSize);
        $elem.find('.planet-surface').addClass(planet.style.planetSize);
        $elem.find('.planet-surface').addClass(planet.style.planetColour);
        $elem.css('top', (planet.physics.centerX - planet.physics.fieldRadius) + 'px');
        $elem.css('left', (planet.physics.centerY - planet.physics.fieldRadius) + 'px');
        $planets.append($elem);
    }
    
   // function randomPlanetInSector(limWidthLower, limWidth, limHeight, planets) {    
       // alert(planets.length);
        
        function newPlanet() {
            var x = Math.random() * limWidth + limWidthLower;
            var y = Math.random() * limHeight;
            var g = Math.random();
            return cosmos.Planet(x, y, g);
        }
        
        function overlaps(planet, planets) {
            var over = false;
            planets.forEach(function (p) {
                //alert(JSON.stringify(p));
                if (planetsOverlap(p, planet))
                    over = true;
               // alert(planetsOverlap(p, planet));
            });
            return over;
        }
        
        var planet = newPlanet();
       // alert(overlaps(planet, planets));
    /*    while (overlaps(planet, planets)) {
            planet = newPlanet();   
            //alert('iter');
        }*/
        appendPlanetDiv(planet);
        planets.push(planet);   
   // }


}

function generateLevel() {
    var offset = 100;
    var height = levelHeight;
    var widthLower = 0;
    var widthHigher = offset;
    var counter = 0;
    
    while (widthLower <= levelWidth) {
        generatePlanet(widthLower, widthHigher, height, planets);
        widthLower = planets[counter++].physics.centerX * 2;
        widthHigher += widthLower;
    }
    
    //generatePlanet(0, offset, $(document).innerHeight(), planets);
   // var nextLim = planets[0].physics.centerX;
   // generatePlanet(2*nextLim, 2*nextLim + offset, $(document).innerHeight(), planets);
}

function width() {
    return levelWidth;
}
function height() {
    return levelHeight;
}

exports.generateLevel = generateLevel;
exports.levelWidth = width;
exports.levelHeight = height;