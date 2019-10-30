module.exports = class Session {
    constructor(token, data, expires) {
        this.token = token;
        this.data = data || {};
        this.expires = expires || Date.now() + 60000;
    }
    get(key) {
        if(typeof key == 'undefined') {
            return this.data;
        }
        return this.data[key] || null;
    }
    set(key, value) {
        this.data[key] = value;
    }
    delete(key) {
        delete this.data[key];
    }
    refresh() {
        this.data.expires = new Date() + 60000;
    }
}