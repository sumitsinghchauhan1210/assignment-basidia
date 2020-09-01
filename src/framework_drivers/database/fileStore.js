const path = require('path')
const multer = require('multer')
const _ = require('lodash')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/')
    },
    filename: function (req, file, cb) {
        console.log('File is', file)
        cb(null, Date.now() + '.' + file.originalname.split('.').pop())
    }
})
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        console.log('in the multer upload file check method')
        if (!_.isEqual('.png', ext) && !_.isEqual('.jpeg', ext) && !_.isEqual('.jpg', ext)) {
            return callback(new Error('Only pdf files are allowed.'))
        }
        callback(null, true)
    },
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})
module.exports = upload