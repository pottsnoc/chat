const crypto = require('crypto'),
      Session = require('./session'),
      MemStorage = require('./memoryStorage');

module.exports = class SessionStore {
    constructor(store) {
        this.storage = store || new MemStorage();
    }
    async get(client) {
        const {cookies} = client;
        if(cookies && cookies.token) {
            try {
                const session = await this.storage.get(cookies.token);
                if(new Date(session.expires) < Date.now()) {
                    console.log('User connected. User\'s session expired', session.expires);
                    await this.create(client);
                    return;
                }
                client.session = new Session(cookies.token, session.data, session.expires);
                console.log('User connected. Last visit: ', new Date(session.data.lastVisit), session);
                client.session.set('lastVisit', Date.now());
            } catch(e) {
                if(e.message === 'Session not found') {
                    await this.create(client);
                }
            }
        } else {
            await this.create(client);
        }
    }
    async create(client) {
        const token = this.generateToken();
        client.session = new Session(token);
        client.setCookie({name: 'token', value:token, httpOnly: true, expires: new Date(Date.now() + 3600000)});
        client.session.set('lastVisit', Date.now());
        console.log('New User connected.');
    }
    async save(client) {
        if (client.session) {
            await this.storage.save(client.session.token, client.session);
        }
    }
    checkExpiration() {
        const tokens = this.storage.getAll();
        toke
    }
    generateToken() {
        return crypto.randomBytes(64).toString('hex');
    }
}

