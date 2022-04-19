import path from 'path';
import multer from 'multer';
import fs from 'fs';
import { updateOneEntity } from '../models';
import Shop from '../models/shop';
import User from '../models/users';

const storage = multer.diskStorage({
  destination(req, file, callback) {
    const folder = './public/shop/';
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    callback(null, folder);
  },
  filename(req, file, cb) {
    cb(null, `image-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const uploadImage = multer({
  storage,
  limits: { fileSize: 1000000 }, // 1 MB
}).single('myImage');

export default async function upload(req, res) {
  uploadImage(req, res, async (err) => {
    if (err) {
      return res.status(400).json('Error in uploading file');
    }

    if (req.body.type === 'user') {
      await updateOneEntity(User, { email: req.body.id }, { avatarUrl: req.file.path });
    } else if (req.body.type === 'shop') {
      await updateOneEntity(Shop, { id: req.body.id }, { avatarUrl: req.file.path });
    } else {
      console.log('No valid type found');
      return res.status(400).json('Error in uploading file!');
    }

    console.log('Image Uploaded Successfully!');
    return res.status(200).json('Uploaded Successfully!');
  });
}
