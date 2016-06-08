var planets = [];
var OFFSET = 10;
var fieldSizes = ['small', 'medium', 'large'];
var planetSizes = ['regular', 'dwarf', 'giant'];
var planetColours = ['red', 'blue', 'cornsilk'];

var PLANET_TEMPLATE = '<div class="planet"><div class="gravity-field"><div class="planet-surface"></div></div></div>';
var $planets = $('.planets');

function planetOverlap(planet1, planet2) {
    var lim = planet1.radiusPlanet + planet2.radiusPlanet + Math.max(planet1.radiusField, planet2.radiusField) - OFFSET;
    var dist = Math.sqrt( Math.pow(planet1.centerX - planet2.centerX, 2) + Math.pow(planet1.centerY - planet2.centerY, 2) );
    return dist < lim;
}

function randomPlanetDiv() {
    var sizeOuter = Math.floor(Math.random() * 3);
    var sizeInner = Math.floor(Math.random() * 3);
    var colour = Math.floor(Math.random() * 3);
    
    var fieldSize = fieldSizes[sizeOuter];
    var planetSize = planetSizes[sizeInner];
    var planetColour = planetColours[colour];
    
    var $elem = $(PLANET_TEMPLATE);
    $elem.addClass(fieldSize);
    $elem.find('.planet-surface').addClass(planetSize);
    $elem.find('.planet-surface').addClass(planetColour);
    
    // TEST
    /*$elem.css('left', '+=200px');
    planets.push(createPlanet($elem));
    $planets.append($elem);*/
    return $elem;
}

function randomPlanet(x, y) {
    var $elem = randomPlanetDiv();
    $elem.css('left', '+=' + x + 'px');
    $elem.css('top', '+=' + y + 'px');
    var planet = createPlanet($elem);
    var success = true;
    
    planets.forEach(function(p) {
        if (planetOverlap(p, planet)) {
            success = false;
            return;
        }
    });
    
    if (success) {
        planets.push(planet);
        $planets.append($elem);
    }
    return success;
}

function createPlanet($elem) {
    var $gravity = $elem.find('.gravity-field');
    
    function overlapsField(x, y) {
        var val = (x - planet.centerX) * (x - planet.centerX) + (y - planet.centerY) * (y - planet.centerY);
        return val <= planet.radiusField * planet.radiusField;
    }

    function collides(x, y) {
        var val = (x - planet.centerX) * (x - planet.centerX) + (y - planet.centerY) * (y - planet.centerY);
        return val <= planet.radiusPlanet * planet.radiusPlanet;
    }
    
    var planet = {
        $planet: $elem,
        radiusField: $gravity.width() / 2,
        radiusPlanet: $elem.find('.planet-surface').width() / 2,
        centerX: $gravity.offset().left + $gravity.width() / 2,
        centerY: $gravity.offset().top + $gravity.height() / 2,
        collides: collides,
        overlaps: overlapsField
    };
    
    return planet;
}

function init($elem) {
    planets.push(createPlanet($elem));
}

function allPlanets() {
    return planets;
}

exports.init = init;
exports.allPlanets = allPlanets;
exports.randomPlanet = randomPlanet;