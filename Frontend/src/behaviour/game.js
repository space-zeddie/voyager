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
    var vy = 30;
    var a = 0;
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
            
            ship.updatePosition(0, velocity, a, time);  
            $shuttle.animate({
                top: ship.position().y + 'px'
            }, {
                duration: 200,
                queue: false,
                step: function (s) {
                    //if (deg > -30 && deg < 30) {
                        $shuttle.css({ WebkitTransform: 'rotate(' + deg + 'deg)'});  
                        $shuttle.css({ '-moz-transform': 'rotate(' + deg + 'deg)'}); 
                        deg += degInc;
                  //  }
                }
            });
        });
    }
    
    $(document).keydown(function (e) {
        if (e.which === 39 || e.which === 68) {
            a -= 0.2;
           if (!steering) steer(false);
        }
        else if (e.which === 37 || e.which === 65) {
            a -= 0.2;
            if (!steering) steer(true);
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
                a = pull.physics.g;
                if (steerY > pull.physics.centerY) {
                    steering = true;
                    steer(false);
                    steering = false;
                }
                else { steering = true; steer(true); steering = false; }
                if (pull.physics.collides(steerX, steerY))
                    gameOver();
            }
            else a = 0;
        },
        complete: gameOver 
    });
}

exports.init = init;