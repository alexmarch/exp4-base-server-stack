(function() {
    Pace.start();
    Pace.on('done', function () {
        var b = document.querySelector('.preload');
        if (b !== null) {
            b.style.display = 'block';
        }
    });
})();