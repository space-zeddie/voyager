var ship = require('./ship');
var generator = require('./generator');
var canvas = null;
var animFrame = null;

function init(canvas, animFrame) {
    var ctx = canvas.getContext('2d');
    
    generator.generateLevel();
    generator.planets().forEach(function (p) {
        alert(JSON.stringify(p));
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
        $shuttle.animate({
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
                //move();
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
                //move();
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