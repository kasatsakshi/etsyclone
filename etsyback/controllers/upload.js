import path from "path";
import multer from "multer";
import { updateEntity } from "../models";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const folder = './public/shop/';
    if (!fs.existsSync(folder)){
      fs.mkdirSync(folder, { recursive: true });  
    }
    callback(null, folder);
  },
  filename: function(req, file, cb){
     cb(null,"image-" + Date.now() + path.extname(file.originalname));
  }
});

const uploadImage = multer({
  storage: storage,
  limits:{fileSize: 1000000}, //1 MB
}).single("myImage");

export default async function upload(req, res) {
  uploadImage(req, res, async (err) => {
    if(err) {
      return res.status(400).json('Error in uploading file');
    }

    if(req.body.type === 'user') {
      await updateEntity(req.body.type, {'avatarUrl': req.file.path}, ['email',req.body.id])
    } else if(req.body.type === 'shop') {
      await updateEntity(req.body.type, {'avatarUrl': req.file.path}, ['id',req.body.id])
    }  else {
      console.log('No valid type found');
      return res.status(400).json('Error in uploading file!');
    }
  
    console.log("Image Uploaded Successfully!");
    return res.status(200).json('Uploaded Successfully!');
 });
}