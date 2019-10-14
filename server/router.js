const routes = require('./routes')

module.exports = (req, res) => {
    console.log(req.url);
    let route = routes.get(req.url) || routes.get(getUnknownRoute(req.url));

    if(route) {
        route(req, res);
    } else {
        res.statusCode = 404;
        res.end('Not Found');
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