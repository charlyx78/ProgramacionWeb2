import path from 'path';
import fs from 'fs';
import multer from 'multer';
import sharp from 'sharp';

const storage = multer.memoryStorage(); // Almacenamiento en memoria

export const uploadFiles = multer({
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
});

export const handleUpload = async (req, res, next) => {
    uploadFiles.single('attachment')(req, res, async function(err) {
        if (err) {
            return res.status(400).send({ message: 'Error uploading file', error: err.message });
        }

        if (req.file) {
            if (req.file.mimetype.startsWith('image/')) {
                try {
                    const uploadPath = 'uploads/posts';
                    await fs.promises.mkdir(uploadPath, { recursive: true });

                    const compressedFilePath = path.join(uploadPath, 'compressed-' + Date.now() + '-' + Math.random() + '.jpeg');

                    await sharp(req.file.buffer)
                        .resize(800) // Redimensionar la imagen a un ancho de 800px
                        .toFormat('jpeg', { quality: 80 }) // Convertir a JPEG con calidad de 80%
                        .toFile(compressedFilePath);

                    // Añadir el path del archivo comprimido a la request
                    req.file.path = compressedFilePath;

                    next();
                } catch (error) {
                    return res.status(500).send({ message: 'Error processing image', error: error.message });
                }
            } else {
                // Si no es una imagen, simplemente pasar al siguiente middleware
                next();
            }
        } else {
            return res.status(400).send({ message: 'No file uploaded' });
        }
    });
};
