var ship = require('./ship');
var generator = require('./generator');
var cosmos = require('./planet');
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
        var currentX = $shuttle.offset().left();
        var currentY = $shuttle.offset().top();
        if (currentY + vy >= generator.width() || currentY - vy <= 0)
            return;
        $shuttle.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});  
        $shuttle.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});
        vy = 2*degree;
        clearTimeout(timer);
            timer = setTimeout(function() {
                degree += 2; rotate();
                
        $shuttle.animate({
            top: '+=' + vy + 'px'
        }, {duration: 400, queue: false});
            }, 5);
    }    
    
    $(document).keydown(function (e) {
        if (e.which === 39 || e.which === 68) {
           /* $('.planets').find('.planet').animate({
                'left': '+=10px'
            });*/
            
            rotate();
        }
        else if (e.which === 37 || e.which === 65) {
           /* $('.planets').find('.planet').animate({
                'left': '-=10px'
            });*/
            
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
   // alert('end');
}

exports.init = init;