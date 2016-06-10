(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ship = require('./ship');
var generator = require('./generator');
var canvas = null;
var animFrame = null;

function init(canvas, animFrame) {
    generator.generatePlanet();
    var $shuttle = $('.ship'), degree = 0, timer;
    var $planets = $('.planets').find('.planet'), planetsTimer;
    var vx = 2;
    var vy = 0;
    
    function rotate() {        
        $shuttle.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});  
        $shuttle.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});
        vy = degree;
    }    
    
    function movePlanets() {
        $planets.animate({
            'left': '+=' + vx + 'px',
            'top': '+=' + vy + 'px'
        });
    }
    
    $(document).keydown(function (e) {
        if (e.which === 39 || e.which === 68) {
           /* $('.planets').find('.planet').animate({
                'left': '+=10px'
            });*/
            clearTimeout(timer);
            timer = setTimeout(function() {
                degree += 2; rotate();
                movePlanets();
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
                movePlanets();
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
}

exports.init = init;
},{"./generator":2,"./ship":4}],2:[function(require,module,exports){
var planets = require('./planet');

function generatePlanet() {
    planets.init($('.planet'));
    
    var x = Math.random() * $(document).innerWidth();
    var y = Math.random() * $(document).innerHeight();
    //alert('width: ' + $(document).innerWidth() + '; height: ' + $(document).innerHeight());
    
    planets.randomPlanet(x, y);
}

exports.generatePlanet = generatePlanet;
},{"./planet":3}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
function init() {
    var $ship = $('.ship');
}

exports.init = init;
},{}],5:[function(require,module,exports){
$(function() {
    var game = require('./behaviour/game');
    
    (function () {
        var canvas = $('#canvas');
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
