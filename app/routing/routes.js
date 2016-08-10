'use strict';
module.exports = function(app) {
var users_routing = require('./user_routing')
    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
    app.post('/api/user/create/',users_routing.crea)
    app.post('/api/user/mail/',users_routing.checkMail)
    app.post('/api/user/login',users_routing.login)
    app.put('/api/user/update',users_routing.update)
};