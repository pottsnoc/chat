const server = require('./server/server')

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
});