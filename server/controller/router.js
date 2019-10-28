const routes = require('../routes'),
      Client = require('./client'),
      SessionStore = require('../session/sessionStore');

const sessionStore = new SessionStore();

module.exports = async (req, res) => {
    let route = routes.get(req.url) || routes.get(getUnknownRoute(req.url));
    const client = new Client(req, res);
    await sessionStore.get(client);
    res.on('finish', () => {
        sessionStore.save(client);
    });
    if(route) {
        route(client);
    } else {
        client.setStatus(404, 'Not Found');
        client.send();
    }
}

function getUnknownRoute(url) {
    for(key of routes) {
        const match = url.match(key[0]);
        if(match && match.length > 1) {
            return key[0];
        }
    }
}