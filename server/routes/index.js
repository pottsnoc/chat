const routes = new Map();

routes.set('/', require('./home'));
routes.set('/static/(.*)', require('./static'));

module.exports = routes;