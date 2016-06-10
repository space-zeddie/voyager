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