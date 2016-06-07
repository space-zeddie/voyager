var planets = [];

function init($elem) {
    var $gravity = $elem.find('.gravity-field');
    
    var planet = {
        $planet: $elem,
        radiusField: $gravity.width() / 2,
        radiusPlanet: $elem.find('.planet-surface').width() / 2,
        centerX: $gravity.offset().left + $gravity.width() / 2,
        centerY: $gravity.offset().top + $gravity.height() / 2,
        collides: collides,
        overlaps: overlapsField
    };
    
    function overlapsField(x, y) {
        var val = (x - planet.centerX) * (x - planet.centerX) + (y - planet.centerY) * (y - planet.centerY);
        return val <= planet.radiusField * planet.radiusField;
    }

    function collides(x, y) {
        var val = (x - planet.centerX) * (x - planet.centerX) + (y - planet.centerY) * (y - planet.centerY);
        return val <= planet.radiusPlanet * planet.radiusPlanet;
    }
    
    planet.$planet.click(function (e) {
        var x = e.pageX;
        var y = e.pageY;
        alert(collides(x, y));
    });
    
    planets.push(planet);
}

function allPlanets() {
    return planets;
}

exports.init = init;
exports.allPlanets = allPlanets;