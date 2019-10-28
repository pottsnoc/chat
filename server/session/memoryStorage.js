module.exports = class MemoryStorage {
    constructor() {
        this.storage = {};
    }
    save(token, session) {
        return new Promise(resolve => {
            this.storage[token] = session;
            resolve();
        });
    }
    get(token) {
        return new Promise((resolve, reject) => {
            if(!this.storage.hasOwnProperty(token)) {
                reject(new Error('Session not found'));
            }
            resolve(this.storage[token]);
        });
    }
    getAll() {
        return new Promise(resolve => {
            resolve(Object.keys(this.storage));
        });
    }

    remove(token) {
        return new Promise((resolve, reject) => {
            if(!this.storage.hasOwnProperty(token)) {
                reject(new Error('Session not found'));
            }
            resolve(delete this.storage[token]);
        });
    }

}