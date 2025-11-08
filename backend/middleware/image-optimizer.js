const multer = require('multer')
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const storage = multer.memoryStorage();

const upload = multer({ storage }).single('image');

const imageOptimizer = async (req, res, next) => {
    if (!req.file) return next();

    const baseName = path.parse(req.file.originalname).name.split(' ').join('_');
    const optimizedFilename = `${baseName}_${Date.now()}.webp`;
    const outputPath = path.join('images', optimizedFilename);

    try {
        await sharp(req.file.buffer).webp({ quality: 80 }).toFile(outputPath);

        req.file.filename = optimizedFilename;
        req.file.path = outputPath;

        next();

    } catch (error) {
        console.error('Erreur lors de l’optimisation d’image:', error);
        next(error);
    }
};

module.exports = { upload, imageOptimizer };