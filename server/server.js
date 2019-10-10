const http = require('http'),
      fs = require('fs');

const server = http.createServer();
const port = process.env.PORT || '3000';

server.listen(port, (...args) => {
    console.log(`server is running on http://localhost:${port}`)
});

server.on('request', (req, res) => {
    fs.readFile('package.json', (err, file) => {
        res.end(file)
    })
})