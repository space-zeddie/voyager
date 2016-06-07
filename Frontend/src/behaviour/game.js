var ship = require('./ship');
var generator = require('./generator');
var canvas = null;
var animFrame = null;

function init(canvas, animFrame) {
    generator.generatePlanet();
    
    $(document).keydown(function (e) {
        if (e.which === 39) {
            var planets = $('.planets').find('.planet').css('left', '+=10px');
           // alert(JSON.stringify($('.planets').children()));
            /*planets.forEach(function (elem) {
                alert('elem');
                elem.position.left += 10;
            });*/
        }
    });
}

exports.init = init;