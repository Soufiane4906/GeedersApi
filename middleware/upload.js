import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configuration du stockage pour multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/';
        // Créer le répertoire s'il n'existe pas
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

// Filtrer les types de fichiers
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('audio/') ||
        file.mimetype.startsWith('image/') ||
        file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Format de fichier non supporté'), false);
    }
};

// Export du middleware multer configuré
export const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10MB
    fileFilter: fileFilter
});