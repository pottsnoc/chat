const fs = require('fs');

module.exports = (req, res) => {
    fs.readFile('./client/index.html', (err, file) => {
        if(err) {
            console.log(err)
        }
        res.end(file)
    })
}