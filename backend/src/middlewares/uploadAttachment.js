import path from 'path';
import fs from 'fs';
import multer from 'multer';
import sharp from 'sharp';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const uploadPath = `uploads/posts`;
        
        fs.mkdir(uploadPath, { recursive: true }, function(err) {
            if (err) {
                return cb(err);
            }
            cb(null, uploadPath);
        });
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + '-' + Math.random() + ext);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "video/mp4" ||
            file.mimetype == "video/webm"
        ) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 200
    }
}).single('file'); // Asumiendo que el campo del formulario es 'file'

export const uploadFiles = (req, res, next) => {
    upload(req, res, function(err) {
        if (err) {
            return res.status(400).send({ message: 'Error uploading file', error: err.message });
        }

        // Solo comprimir si el archivo es una imagen
        if (req.file.mimetype.startsWith('image/')) {
            const filePath = req.file.path;
            const compressedFilePath = path.join(path.dirname(filePath), 'compressed-' + req.file.filename);
            
            sharp(filePath)
                .resize(800) // Redimensionar la imagen a un ancho de 800px (puedes ajustar esto)
                .toFormat('jpeg', { quality: 80 }) // Convertir a JPEG con calidad de 80%
                .toFile(compressedFilePath, (err, info) => {
                    if (err) {
                        return res.status(500).send({ message: 'Error processing image', error: err.message });
                    }
                    
                    // Opcionalmente, eliminar el archivo original sin comprimir
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error('Error deleting original file:', err);
                        }
                    });

                    // Añadir el path del archivo comprimido a la request
                    req.file.path = compressedFilePath;

                    next();
                });
        } else {
            // Si no es una imagen, simplemente pasar al siguiente middleware
            next();
        }
    });
};