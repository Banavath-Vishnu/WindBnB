import express from 'express';
import upload from '../utils/multerConfig.js';
import { uploadByLink, uploadPhotos } from '../controllers/uploadController.js';

const router = express.Router();

router.post('/upload-by-link', uploadByLink);
router.post('/upload', upload.array('photos', 100), uploadPhotos);

export default router; 