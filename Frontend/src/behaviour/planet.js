var planet = {
    $planet: null,
    radiusField: 0,
    radiusPlanet: 0,
    centerX: 0,
    centerY: 0
};

function overlapsField(x, y) {
    var val = (x - planet.centerX) * (x - planet.centerX) + (y - planet.centerY) * (y - planet.centerY);
    return val <= planet.radiusField * planet.radiusField;
}

function collides(x, y) {
    var val = (x - planet.centerX) * (x - planet.centerX) + (y - planet.centerY) * (y - planet.centerY);
    return val <= planet.radiusPlanet * planet.radiusPlanet;
}

function init($elem) {
    planet.$planet = $elem;
    var $gravity = planet.$planet.find('.gravity-field');
    planet.radiusField = planet.$planet.find('.gravity-field').width() / 2;
    planet.radiusPlanet = planet.$planet.find('.planet-surface').width() / 2;

    planet.centerX = $gravity.offset().left + $gravity.width() / 2;
    planet.centerY = $gravity.offset().top + $gravity.height() / 2;
    
   /* $planet.click(function (e) {
        var x = e.pageX;
        var y = e.pageY;
        alert(collides(x, y));
    });*/
}

exports.init = init;