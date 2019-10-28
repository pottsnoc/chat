const COOKIE_DELETE = `=deleted;path=/;expires=${new Date(0)}`;

module.exports = class Client {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.preparedCookies = [];
        this.cookies = Client.parseCookie(req);
    }
    send(data) {
        this.res.setHeader('Set-Cookie', this.preparedCookies);
        this.res.end(data);
    }
    setStatus(code, message) {
        this.res.statusCode = code;
        this.res.statusMessage = message;
    }
    setCookie({name, value, path='/', httpOnly=false, expires}) {
        this.preparedCookies.push(`${name}=${value};path=${path};${httpOnly};expires=${expires}`);
    }
    deleteCookie(key) {
        this.preparedCookies.push(key + COOKIE_DELETE);
    }
    static parseCookie(req) {
        const {cookie} = req.headers;
        if(!cookie) return null;
        const items = cookie.split('; ');
        return items.reduce((acc, cur) => {
            const sepIdx = cur.indexOf('=');
            acc[cur.slice(0, sepIdx)] = cur.slice(sepIdx + 1);
            return acc;
        }, {})
    }
}