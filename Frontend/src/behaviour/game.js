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
    var vy = 10;
    var time = 0;
    var pull = null;
    
    function inGravityFieldOf(x, y) {
        pull = null;
       // alert(x + ', ' + y);
        generator.planets().forEach(function (p) {
            if (p.physics.insideGravityField(x, y))
                pull = p;
        });
        return pull;
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
               // $shuttle.css({ WebkitTransform: 'rotate(' + currentDeg + 'deg)'});  
               // $shuttle.css({ '-moz-transform': 'rotate(' + currentDeg + 'deg)'}); 
            }
        });
            }, 5);
        ship.updatePosition(0, vy);
    }    
    
    function steer(clockwise) {
        clearTimeout(timer);
        
        var velocity;
        //var time = 0;
        time = 0;
       // var pull = null;
        timer = setTimeout(function() {
            if (clockwise) velocity = -1;
            else velocity = 1;
            time += 1;
            //alert('time:' + time);
            ship.updatePosition(0, velocity, 0, time);  
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
        
            //alert(JSON.stringify(ship.position()));
    }
    
    $(document).keydown(function (e) {
        if (e.which === 39 || e.which === 68) {
           // time = 0;
           steer(false);
           // time = 0;
           // vy = 0;
            
           // rotate(true);
        }
        else if (e.which === 37 || e.which === 65) {
         // time = 0;
            steer(true);
          // time = 0;
          //  vy = 0;
            //rotate(false);
        }
    });
    
    $(document).keyup(function (e) {
        clearTimeout(timer);
        time = 0;
    });
    
    var velX = generator.levelWidth() / 50000;
    // alert(velX);
    $planets.animate({
        left: '-=' + generator.levelWidth() + 'px'
    }, 
    {
        duration: 50000, 
        queue: false,
        step: function (currentX) {
           /// generator.planets().forEach(function (p) {
              //  cosmos.movePlanet(p, currentX, 0);
            //});
            //alert(ship.position().x + ', ' + ship.position().y);
            /*inGravityFieldOf(ship.position().x, ship.position().y);
            var a = 0;
            /*if (pull){ a = pull.physics.g;
            alert(JSON.stringify(pull));
                     }*/
          /*  ship.updatePosition(velX, vy, a, time);  
           $shuttle.animate({
                top: ship.position().y + 'px'
            }, {
                duration: 50000,
                queue: false,
                step: function (deg) {
                   // alert(ship.position().x);
                   // $shuttle.css({ WebkitTransform: 'rotate(' + deg + 'deg)'});  
                   // $shuttle.css({ '-moz-transform': 'rotate(' + deg + 'deg)'});                        
                }
            });*/
        },
        complete: function () { alert (ship.position().x + ', ' + ship.position().y); }
    });
}

exports.init = init;