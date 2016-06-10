var planets = [];
var OFFSET = 10;
var fieldSizes = ['small', 'medium', 'large'];
var planetSizes = ['regular', 'dwarf', 'giant'];
var planetColours = ['red', 'blue', 'cornsilk'];

var PLANET_TEMPLATE = '<div class="planet"><div class="gravity-field"><div class="planet-surface"></div></div></div>';
var $planets = $('.planets');

function getPositions($box) {
    var pos = $box.position();
    var width = $box.width();
    var height = $box.height();
    return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
}

function position($item) {
    var pos = $item.offset();
    var width = $item.width();
    var height = $item.height();
    return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
}
        
function comparePositions(p1, p2) {
   // alert(p1 + '; ' + p2);
    var x1 = p1[0] < p2[0] ? p1 : p2;
    var x2 = p1[0] < p2[0] ? p2 : p1;
    return x1[1] > x2[0] || x1[0] === x2[0];
}

function collision($div1, $div2) {
    var pos = position($div1);
    var pos2 = position($div2);
    var horizontalMatch = comparePositions(pos[0], pos2[0]);
    var verticalMatch = comparePositions(pos[1], pos2[1]);       
    return horizontalMatch && verticalMatch;
}

function randomPlanetDiv() {    
    var fieldSize = fieldSizes[Math.floor(Math.random() * 3)];
    var planetSize = planetSizes[Math.floor(Math.random() * 3)];
    var planetColour = planetColours[Math.floor(Math.random() * 3)];
    
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
    console.log(x + ', ' + y);
    var $elem = randomPlanetDiv();
    $elem.css('left', x + 'px');
    $elem.css('top', y + 'px');
    //$elem.addClass('new');
    var planet = createPlanet($elem);
    var success = true;
    
    //alert('elem: ' + JSON.stringify($elem.position()) + ', ' + $elem.width());
    
    $planets.append($elem);
    $planets.children().each(function() {
       // p.toggle();
        if (collision($(this), $elem)) {
          //  alert('collision!');
            x = Math.random() * $(document).innerWidth();
            y = Math.random() * $(document).innerHeight();
            $elem.css('left', x + 'px');
            $elem.css('top', y + 'px');
        }
    });
    
   // if (success) {
        planets.push(planet);
       // $planets.append($elem);
       // $elem.removeClass('new');
     //   planetOverlap(planet);
   // } else 
      //  $planets.remove('.new');
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