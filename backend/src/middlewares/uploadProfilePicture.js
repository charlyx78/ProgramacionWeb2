import path from 'path'
import fs from 'fs';
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const uploadPath = `uploads/${req.body.username}`;
        
        fs.mkdir(uploadPath, { recursive: true }, function(err) {
            if (err) {
                return cb(err);
            }
            cb(null, uploadPath);
        });
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + '-' + Math.random() + ext)
    }
})

export const uploadFiles = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        if(
            file.mimetype =="image/png" ||
            file.mimetype =="image/jpg" ||
            file.mimetype =="image/jpeg" 
        ) {
            callback(null, true)
        } else {
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 20
    }
})