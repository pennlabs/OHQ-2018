"use strict";
exports.__esModule = true;
var path = require('path');
function router(app) {
    app.get('/', function (req, res, next) {
        res.sendFile(path.join(__dirname, '..', '/index.html'));
    });
    app.get('/:route', function (req, res, next) {
        res.sendFile(path.join(__dirname, '..', '/index.html'));
    });
}
exports["default"] = router;
