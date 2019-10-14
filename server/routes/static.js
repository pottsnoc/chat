const fs = require('fs'),
      path =require('path');

module.exports = (req, res) => {
    fs.readFile(path.join('client', req.url), (err, file) => {
        if(err) {
            if(err.code = 'ENOENT') {
                res.statusCode = 404;
                res.statusMessage = 'Not found';
            }
            console.log(err);
        } else {
            res.end(file);
        }
    })
}