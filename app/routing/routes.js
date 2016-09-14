'use strict';
module.exports = function(app) {
var users_routing = require('./user_routing'),
 roles_routing = require('./roles_routing'),
 schools_routing = require('./schools_routing'),
 configs_routing = require('./configs_routing');
     // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // frontend routes =========================================================
    app.post('/api/schools/list/',schools_routing.list)
    app.get('/api/role/',roles_routing.list)
    app.post('/api/user/list/',users_routing.list)
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
    app.post('/api/user/create/',users_routing.crea)
    app.post('/api/user/mail/',users_routing.checkMail)
    app.post('/api/user/login/',users_routing.login)
    app.post('/api/user/trash',users_routing.trash)
    app.post('/api/user/2BeEnabled/',users_routing.toBeEnabled)
    app.put('/api/user/update/',users_routing.update)
    app.post('/api/schools/crea/',schools_routing.crea)
    app.post('/api/user/retrieveUser/',users_routing.retrieveUser)
    app.post('/api/schools/trash/',schools_routing.trash)
    app.post('/api/schools/update/',schools_routing.update)
    app.post('/api/user/email/',users_routing.sendEmail)
    app.post('/api/config/retrieve/',configs_routing.retrieve)
    app.post('/api/config/list/',configs_routing.list)
    app.post('/api/config/update/',configs_routing.update)
    app.post('/api/config/path/',configs_routing.path)
};