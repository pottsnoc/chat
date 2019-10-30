const cookieParser = req => {
    const {cookie} = req.headers;
    if(!cookie) return null;
    const items = cookie.split('; ');
    return items.reduce((acc, cur) => {
        const sepIdx = cur.indexOf('=');
        acc[cur.slice(0, sepIdx)] = cur.slice(sepIdx + 1);
        return acc;
    }, {})
}

module.exports = cookieParser;