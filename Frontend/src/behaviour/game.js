var ship = require('./ship');
var generator = require('./generator');
var cosmos = require('./planet');

function init(player) {
    generator.generateLevel();
    
    var $shuttle = $('.ship'), degree = 0, timer;
    ship.setPosition($shuttle.offset().left, $shuttle.offset().top);
    var $planets = $('.planets').find('.planet');
    var vx = 50;
    var vy = 0;
    
    function setVY(degree) {
        
    }
    
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
                $shuttle.css({ WebkitTransform: 'rotate(' + currentDeg + 'deg)'});  
                $shuttle.css({ '-moz-transform': 'rotate(' + currentDeg + 'deg)'}); 
            }
        });
            }, 5);
        ship.updatePosition(0, vy);
    }    
    
    $(document).keydown(function (e) {
        if (e.which === 39 || e.which === 68) {
           /* $('.planets').find('.planet').animate({
                'left': '+=10px'
            });*/
            
            rotate(true);
        }
        else if (e.which === 37 || e.which === 65) {
           /* $('.planets').find('.planet').animate({
                'left': '-=10px'
            });*/
            
            rotate(false);
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
    
    $planets.animate({
        left: '-' + generator.levelWidth() + 'px'
    }, 
    {
        duration: 50000, 
        queue: false,
        step: function (currentX) {
            generator.planets().forEach(function (p) {
                cosmos.movePlanet(p, currentX, 0);
            });
           
        }
    });
}

exports.init = init;