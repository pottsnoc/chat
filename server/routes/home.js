const fs = require('fs'),
      pug = require('pug');

module.exports = (client) => {
    const loggedUser = client.session.get('login');
    let html;
    if(loggedUser) {
        html = pug.renderFile('server/views/chat-page.pug', {login: loggedUser});
    } else {
        html = pug.renderFile('server/views/login.pug');
    }
    client.send(html);
}