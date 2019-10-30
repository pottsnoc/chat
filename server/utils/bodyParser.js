const formidable = require('formidable');
    
const UPLOAD_DIR = 'server/uploads';

const bodyParser = async req => {
    return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.uploadDir = UPLOAD_DIR;
        form.parse(req, (err, fields, files) => err ? reject(err) : resolve({fields, files}));
    });
}

module.exports = bodyParser;