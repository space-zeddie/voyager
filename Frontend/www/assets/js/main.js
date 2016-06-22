(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ship = require('./ship');
var generator = require('./generator');
var canvas = null;
var animFrame = null;

function init(canvas, animFrame) {
    //var ctx = canvas.getContext('2d');
    generator.generateLevel();
    generator.planets().forEach(function (p) {
       // alert(JSON.stringify(p));
    });
    var $shuttle = $('.ship'), degree = 0, timer;
    var timerShuttle;
    var $planets = $('.planets').find('.planet');
    var vx = 50;
    var vy = 0;
    
    function rotate() {        
        $shuttle.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});  
        $shuttle.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});
        vy = degree;
    }    
    
    function move() {
        $planets.animate({
            top: '-=' + vy + 'px'
        }, {duration: 400, queue: false});
        /*$shuttle.animate({
            top: '+=' + vy + 'px'
        });*/
    }
    
    $(document).keydown(function (e) {
        if (e.which === 39 || e.which === 68) {
           /* $('.planets').find('.planet').animate({
                'left': '+=10px'
            });*/
            clearTimeout(timer);
            timer = setTimeout(function() {
                degree += 2; rotate();
                
        $planets.animate({
            top: '-=' + vy + 'px'
        }, {duration: 400, queue: false});
            }, 5);
            rotate();
        }
        else if (e.which === 37 || e.which === 65) {
           /* $('.planets').find('.planet').animate({
                'left': '-=10px'
            });*/
            clearTimeout(timer);
            timer = setTimeout(function() {
                degree -= 2; rotate();
                
        $planets.animate({
            top: '-=' + vy + 'px'
        }, {duration: 400, queue: false});
            }, 5);
            rotate();
        }
    });
    
    $(document).keyup(function (e) {
        clearTimeout(timer);
    });
    
    
    $(document).click(function() {
        clearTimeout(timer);
    }, function() {
       rotate();
    });
    
   /* clearTimeout(timerShuttle);
    timerShuttle = setTimeout(function() {
        move();
    }, 0);
    move();*/
    $planets.animate({
        left: '-' + generator.levelWidth() + 'px',
    }, {duration: 50000, queue: false});
   // alert('end');
}

exports.init = init;
},{"./generator":2,"./ship":4}],2:[function(require,module,exports){
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
        $elem.css('top', (planet.physics.centerY - planet.physics.fieldRadius) + 'px');
        $elem.css('left', (planet.physics.centerX - planet.physics.fieldRadius) + 'px');
        $planets.append($elem);
    }
    
   // function randomPlanetInSector(limWidthLower, limWidth, limHeight, planets) {    
       // alert(planets.length);
        
        function newPlanet() {
           /// var x = Math.random() * limWidth + limWidthLower;
           // var y = Math.random() * limHeight;
            var x = limWidth;
            var y = limHeight / 2;
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
        widthLower = planets[counter++].physics.centerX;
        widthHigher += widthLower;
        alert(widthHigher + ', ' + widthLower)
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

exports.init = init;
exports.Planet = Planet;
},{}],4:[function(require,module,exports){
function init() {
    var $ship = $('.ship');
}

exports.init = init;
},{}],5:[function(require,module,exports){
$(function() {
    var game = require('./behaviour/game');
    
    (function () {
        var canvas = $('#gameCanvas');
        //var ctx = canvas.getContext("2d");
        var player = {
            distance: 0
        };
        
        /**
        * Request Animation Polyfill
        */
        var requestAnimFrame = (function(){
            return  window.requestAnimationFrame   ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.oRequestAnimationFrame      ||
                window.msRequestAnimationFrame     ||
                function(callback, element) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();
        
        game.init(canvas, requestAnimFrame);
  
    })();
});
},{"./behaviour/game":1}]},{},[5]);
