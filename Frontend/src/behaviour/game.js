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