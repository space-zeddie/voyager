var ship = require('./ship');
var generator = require('./generator');
var cosmos = require('./planet');

function init(player) {
    generator.generateLevel();
    
    var $shuttle = $('.ship'), degree = 0, timer;
    ship.setPosition(0.45 * $(document).innerWidth(), 0.45 * $(document).innerHeight());
    var $planets = $('.planets').find('.planet');
    var vx = 50;
    var vy = 0;
    
    function rotate(clockwise) {
        /*var currentY = $shuttle.offset().top;
        if (currentY + vy >= generator.levelWidth() + 200 || currentY - vy <= 0) {
            alert('nowhere to rotate');
            $shuttle.animate(
                {
                    top: '45%',
                    left: '45%'
                }, {duration: 400, queue: false});
            return;
        }*/
        if (clockwise)
            vy = -degree;
        else vy = degree;
        clearTimeout(timer);
            timer = setTimeout(function() {
                degree += 0.5;// rotate();
        
       // $shuttle.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});  
       // $shuttle.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});        
        $shuttle.animate({
            top: '+=' + vy + 'px'
        }, {
            duration: 400, 
            queue: false,
            step: function (currentDeg) {
                $shuttle.css('top', '+=' + currentDeg + 'px');
               // $shuttle.css({ WebkitTransform: 'rotate(' + currentDeg + 'deg)'});  
               // $shuttle.css({ '-moz-transform': 'rotate(' + currentDeg + 'deg)'}); 
            }
        });
            }, 5);
        ship.updatePosition(0, vy);
    }    
    
    function steer() {
        clearTimeout(timer);
        var velocity = 10;
        var time = 0;
        timer = setTimeout(function() {
            //velocity = 1;
            time += 1;
            ship.updatePosition(0, velocity, time);
            $shuttle.animate({
                top: ship.position().y + 'px'
            }, {
                duration: 400,
                queue: false,
                step: function (deg) {
                   // $shuttle.css({ WebkitTransform: 'rotate(' + deg + 'deg)'});  
                   // $shuttle.css({ '-moz-transform': 'rotate(' + deg + 'deg)'}); 
                }
            });
        });
    }
    
    $(document).keydown(function (e) {
        if (e.which === 39 || e.which === 68) {
           steer();
            
           // rotate(true);
        }
        else if (e.which === 37 || e.which === 65) {
          
            steer();
            //rotate(false);
        }
    });
    
    $(document).keyup(function (e) {
        clearTimeout(timer);
    });
    
    
    $planets.animate({
        left: '-=' + generator.levelWidth() + 'px'
    }, 
    {
        duration: 50000, 
        queue: false,
        step: function (currentX) {
            generator.planets().forEach(function (p) {
                cosmos.movePlanet(p, currentX, 0);
            });
           
        },
        complete: function () { alert ('game over'); }
    });
}

exports.init = init;