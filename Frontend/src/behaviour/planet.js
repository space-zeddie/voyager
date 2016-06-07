var $planet = null;
var radiusField = 0;
var radiusPlanet = 0;
var centerX = 0;
var centerY = 0;

function overlapsField(x, y) {
    var val = (x - centerX) * (x - centerX) + (y - centerY) * (y - centerY);
    return val <= radiusField * radiusField;
}



function init($elem) {
    $planet = $elem;
    var $gravity = $planet.find('.gravity-field');
    radiusField = $planet.find('.gravity-field').width() / 2;
    radiusPlanet = $planet.find('.planet-surface').width() / 2;
    //alert(radiusField + ', ' + radiusPlanet);

    centerX = $gravity.offset().left + $gravity.width() / 2;
    centerY = $gravity.offset().top + $gravity.height() / 2;
    
    $planet.click(function (e) {
        var x = e.pageX;
        var y = e.pageY;
        alert(overlapsField(x, y));
    });
}

exports.init = init;