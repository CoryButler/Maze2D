function LayerManager () {
    const _cycleSpeed = 500;
    var _isCycling = false;
    var _trailLayers = [];
    var _spriteLayers = [];

    this.addTrail = function (canvas) {
        _trailLayers.push(canvas);
        if (_trailLayers.length > 1 && !_isCycling) {
            _isCycling = true;
            cycleLayers();
        }
    }

    this.addSprite = function (canvas) {
        _spriteLayers.push(canvas);
        if (_spriteLayers.length > 1 && !_isCycling) {
            _isCycling = true;
            cycleLayers();
        }
    }

    this.clearLayers = () => {
        _trailLayers.forEach(tLayer => {
            document.body.removeChild(tLayer);
        });
        _trailLayers = [];
        
        _spriteLayers.forEach(sLayer => {
            document.body.removeChild(sLayer);
        });
        _spriteLayers = [];
    }

    const cycleLayers = function () {
        if (!_isCycling) return;

        var zIndex = 1;

        _trailLayers.push(_trailLayers.shift());
        _spriteLayers.push(_spriteLayers.shift());

        _trailLayers.forEach(layer => {
            layer.style.zIndex = zIndex++;
        })

        _spriteLayers.forEach(layer => {
            layer.style.zIndex = zIndex++;
        })

        setTimeout(() => { cycleLayers(); }, _cycleSpeed);
    } 
}