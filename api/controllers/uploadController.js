import imageDownloader from 'image-downloader';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads/');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const uploadByLink = async (req, res) => {
  const { link } = req.body;

  if (!link) {
    return res.status(400).json({ error: 'Image link is required' });
  }

  try {
    const extension = path.extname(new URL(link).pathname) || '.jpg';
    const newName = `photo_${Date.now()}${extension}`;
    const uploadPath = path.join(uploadDir, newName);

    await imageDownloader.image({
      url: link,
      dest: uploadPath,
    });

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${newName}`;
    res.status(200).json({ message: 'Image uploaded successfully', url: imageUrl });
  } catch (error) {
    console.error('Error downloading image:', error);
    res.status(500).json({ error: 'Failed to download image' });
  }
};

const uploadPhotos = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  try {
    const uploadedFiles = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
    res.status(200).json({ message: 'Images uploaded successfully', files: uploadedFiles });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ error: 'Failed to upload images' });
  }
};

export { uploadByLink, uploadPhotos };
