function LayerManager () {
    const cycleSpeed = 50;
    var cycleCount = 0;

    var _trailLayers = [];
    var _spriteLayers = [];

    this.addTrail = function (canvas) {
        _trailLayers.push(canvas);
    }

    this.addSprite = function (canvas) {
        _spriteLayers.push(canvas);
    }

    this.cycleLayers = function () {
        if (cycleCount < cycleSpeed) {
            cycleCount++;
            return;
        }

        cycleCount = 0;

        _trailLayers.push(_trailLayers.shift());
        _spriteLayers.push(_spriteLayers.shift());

        var zIndex = 1;

        _trailLayers.forEach(layer => {
            layer.style.zIndex = zIndex++;
        })

        _spriteLayers.forEach(layer => {
            layer.style.zIndex = zIndex++;
        })
    } 
}