(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ship = require('./ship');
var generator = require('./generator');
var cosmos = require('./planet');


function init(player) {
    generator.generateLevel();
    
    var $shuttle = $('.ship'), degree = 0, timer;
   // ship.setPosition(0.45 * $(document).innerWidth(), 0.45 * $(document).innerHeight());
    ship.setPosition($('.ship').offset().left, $('.ship').offset().top);
    alert(JSON.stringify(ship.position()));
    var $planets = $('.planets').find('.planet');
    var vx = 50;
    var vy = 200;
    var a = 0;
    var a1 = 0;
    var time = 0;
    var pull = null;
    var steering = false;
    
    function gameOver() {
        $shuttle.stop();
        $planets.stop();
        alert('Game over!');
        alert('You\'ve flown ' + player.distance + ' light years!');
    }

    
    function inGravityFieldOf(x, y) {
        pull = null;
       // alert(x + ', ' + y);
        generator.planets().forEach(function (p) {
            if (p.physics.insideGravityField(x, y))
                pull = p;
        });
        return pull;
    }

    function steer(clockwise) {
        clearTimeout(timer);
        var velocity;
        time = 0;
        var deg = 0;
        var degInc = 0.5;
        if (!clockwise) degInc = -0.5;
        
        timer = setTimeout(function() {
            if (clockwise) velocity = 1;
            else velocity = -1;
            time += 1;
            
             
            $({prop: 0}).animate({
                prop: 100
            }, {
                duration: 200,
                queue: false,
                step: function (s) {
                        $shuttle.css({ WebkitTransform: 'rotate(' + deg + 'deg)'});  
                        $shuttle.css({ '-moz-transform': 'rotate(' + deg + 'deg)'}); 
                        deg += degInc;
                        ship.updatePosition(0, velocity, a + a1, time);
                        $shuttle.animate({
                            top: ship.position().y + 'px'
                        }, {
                            duration: 200,
                            queue: false
                        });
                        a *= a;
                }
            });
        });
    }
    
    $(document).keydown(function (e) {
        if (e.which === 39 || e.which === 68) {
            a1 -= 0.2;
           steer(false);
        }
        else if (e.which === 37 || e.which === 65) {
            a1 -= 0.2;
            steer(true);
        }
    });
    
    $(document).keyup(function (e) {
        clearTimeout(timer);
        time = 0;
    });
    
    var initial = $planets.get(0).offsetLeft;
    var velX = generator.levelWidth() / 50000;
    var prevVel = velX;
    $planets.animate({
        left: '-=' + generator.levelWidth() + 'px'
    }, 
    {
        duration: 50000, 
        queue: false,
        step: function (currentX) {
            prevVel = velX;
            velX = - $planets.get(0).offsetLeft + initial;
            ship.setX(Math.abs(velX - prevVel));
            player.distance += Math.abs(velX - prevVel);
            
            var steerX = ship.position().x + $shuttle.width();
            var steerY = ship.position().y + $shuttle.height()/2;
            inGravityFieldOf(steerX, steerY);
            
            if (pull) { 
                a1 = pull.physics.g;
                if (steerY > pull.physics.centerY) {
                    steer(false);
                }
                else { steer(true); }
                if (pull.physics.collides(steerX, steerY))
                    gameOver();
            }
            else a1 = 0;
        },
        complete: gameOver 
    });
}

exports.init = init;
},{"./generator":2,"./planet":3,"./ship":4}],2:[function(require,module,exports){
var cosmos = require('./planet');
var levelWidth = 10000;
var levelHeight = 500;
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
    }
    
    function appendPlanetDiv(planet) {
        var $elem = $(PLANET_TEMPLATE);
        $elem.addClass(planet.style.fieldSize);
        $elem.find('.planet-surface').addClass(planet.style.planetSize);
        $elem.find('.planet-surface').addClass(planet.style.planetColour);
        $elem.css('top', (planet.physics.centerY - planet.physics.fieldRadius) + 'px');
        $elem.css('left', (planet.physics.centerX - planet.physics.fieldRadius) + 'px');
        $planets.append($elem);
    }
    
   // function randomPlanetInSector(limWidthLower, limWidth, limHeight, planets) {    
       // alert(planets.length);
        
        function newPlanet() {
            var x = Math.random() * limWidth + limWidthLower;
            var y = Math.random() * limHeight;
            //var x = limWidth;
           // var y = limHeight / 2;
            var g = Math.random();
           // alert(x + ', ' + y);
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
    var widthLower = $('.ship').offset().left + 500;
    var widthHigher = offset;
    var counter = 0;
    var limit = widthLower + levelWidth;
    
    while (widthLower <= limit) {
        generatePlanet(widthLower, widthHigher, levelHeight, planets);
        widthLower = planets[counter].physics.centerX + planets[counter++].physics.surfaceRadius;
        widthHigher = widthLower + offset;
        //alert(widthHigher + ', ' + widthLower)
    }
}

function width() {
    return levelWidth;
}
function height() {
    return levelHeight;
}

function allPlanets() {
    return planets;
}

exports.generateLevel = generateLevel;
exports.levelWidth = width;
exports.levelHeight = height;
exports.planets = allPlanets;
},{"./planet":3}],3:[function(require,module,exports){
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

/*function randomPlanetDiv() {    
    var fieldSize = fieldSizes[Math.floor(Math.random() * 3)];
    var planetSize = planetSizes[Math.floor(Math.random() * 3)];
    var planetColour = planetColours[Math.floor(Math.random() * 3)];
    
    var $elem = $(PLANET_TEMPLATE);
    $elem.addClass(fieldSize);
    $elem.find('.planet-surface').addClass(planetSize);
    $elem.find('.planet-surface').addClass(planetColour);
    
    return $elem;
}*/

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
},{}],4:[function(require,module,exports){
var posX = 0;
var posY = 0;
var bottom = $(document).innerHeight();

function updatePosition(x, vy, ya, t) {
   // if (posY >= bottom || posY <= 0)
     //   return;
    posX += x;
    //if (t !== 0) alert(x + ', ' + vy +', ' + t);
    posY += vy*t + 0.5*ya*t*t;
}

function setPosition(x, y) {
    posX = x;
    posY = y;
}

function setX(x){posX += x;}

function position() {
    return {x: posX, y: posY};
}

exports.updatePosition = updatePosition;
exports.setPosition = setPosition;
exports.setX = setX;
exports.position = position;
},{}],5:[function(require,module,exports){
$(function() {
    var game = require('./behaviour/game');
    
    (function () {
        var canvas = $('#gameCanvas');
        //var ctx = canvas.getContext("2d");
        var player = {
            distance: 0
        };
        
        game.init(player);
  
    })();
});
},{"./behaviour/game":1}]},{},[5]);
