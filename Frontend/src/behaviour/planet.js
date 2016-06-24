var fieldSizes = ['small', 'medium', 'large'];
var fieldSizesPx = {small: 250, medium: 500, large: 750};
var planetSizes = ['regular', 'dwarf', 'giant'];
var planetSizesRatio = {regular: 0.5, dwarf: 0.25, giant: 0.75};
var planetColours = ['red', 'blue', 'cornsilk'];

function Planet(edgeX, centerY, g) {
    var fieldSize = fieldSizes[Math.floor(Math.random() * 3)];
    var planetSize = planetSizes[Math.floor(Math.random() * 3)];
    var planetColour = planetColours[Math.floor(Math.random() * 3)];
    
    var fieldRadius = fieldSizesPx[fieldSize] / 2;
    var surfaceRadius = fieldRadius * planetSizesRatio[planetSize];
    var centerX = edgeX + surfaceRadius;
    
    function insideGravityField(x, y) {
        var val = (x - centerX) * (x - centerX) + (y - centerY) * (y - centerY);
        return val <= fieldRadius * fieldRadius;
    }

    function collides(x, y) {
        var val = (x - centerX) * (x - centerX) + (y - centerY) * (y - centerY);
        return val <= surfaceRadius * surfaceRadius;;
    }
    
    function move(x, y) {
        centerX += x;
        centerY += y;
    }
    
    return {
        physics: {
            centerX: centerX,
            centerY: centerY,
            fieldRadius: fieldRadius,
            surfaceRadius: surfaceRadius,
            g: g,
            insideGravityField: insideGravityField,
            collides: collides
        },
        style: {
            fieldSize: fieldSize,
            planetSize: planetSize,
            planetColour: planetColour
        }
    };
    
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
    createPlanet($elem);
    var elemInnerDiameter = $elem.find('.planet-surface').width();   
    alert('elemInnerDiameter: ' + elemInnerDiameter);
}

function movePlanet(planet, x, y) {
    planet.physics.centerX += x;
    planet.physics.centerY += y;
}

exports.init = init;
exports.Planet = Planet;
exports.movePlanet = movePlanet;