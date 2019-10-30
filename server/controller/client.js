const { bodyParser, cookieParser } = require('../utils');

const COOKIE_DELETE = `=deleted;path=/;expires=${new Date(0)}`;

module.exports = class Client {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.preparedCookies = [];
        this.cookies = cookieParser(req);
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
    async getBody() {
        const {req} = this;
        return bodyParser(req);
    }
}