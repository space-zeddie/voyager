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