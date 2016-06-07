(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ship = require('./ship');
var generator = require('./generator');
var canvas = null;
var animFrame = null;

function init(canvas, animFrame) {
    generator.generatePlanet();
    
    $(document).keydown(function (e) {
        if (e.which === 39 || e.which === 68) {
            $('.planets').find('.planet').animate({
                'left': '+=10px'
            });
        }
        else if (e.which === 37 || e.which === 65) {
            $('.planets').find('.planet').animate({
                'left': '-=10px'
            });
        }
    });
}

exports.init = init;
},{"./generator":2,"./ship":4}],2:[function(require,module,exports){
var planets = require('./planet');

function generatePlanet() {
    planets.init($('.planet'));
}

exports.generatePlanet = generatePlanet;
},{"./planet":3}],3:[function(require,module,exports){
var planet = {
    $planet: null,
    radiusField: 0,
    radiusPlanet: 0,
    centerX: 0,
    centerY: 0
};

function overlapsField(x, y) {
    var val = (x - planet.centerX) * (x - planet.centerX) + (y - planet.centerY) * (y - planet.centerY);
    return val <= planet.radiusField * planet.radiusField;
}

function collides(x, y) {
    var val = (x - planet.centerX) * (x - planet.centerX) + (y - planet.centerY) * (y - planet.centerY);
    return val <= planet.radiusPlanet * planet.radiusPlanet;
}

function init($elem) {
    planet.$planet = $elem;
    var $gravity = planet.$planet.find('.gravity-field');
    planet.radiusField = planet.$planet.find('.gravity-field').width() / 2;
    planet.radiusPlanet = planet.$planet.find('.planet-surface').width() / 2;

    planet.centerX = $gravity.offset().left + $gravity.width() / 2;
    planet.centerY = $gravity.offset().top + $gravity.height() / 2;
    
   /* $planet.click(function (e) {
        var x = e.pageX;
        var y = e.pageY;
        alert(collides(x, y));
    });*/
}

exports.init = init;
},{}],4:[function(require,module,exports){
function al() {
    //alert('hi');
}

exports.al = al;
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
