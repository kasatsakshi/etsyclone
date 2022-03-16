import path from "path";
import multer from "multer";
import { updateEntity } from "../models";

const storage = multer.diskStorage({
  // destination: "./public/uploads/",
  destination: function (req, file, callback) {
    callback(null, './public/uploads/');
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
    } else {
      console.log('No valid type found');
      return res.status(400).json('Error in uploading file!');
    }
  
    console.log("Image Uploaded Successfully!");
    return res.status(200).json('Uploaded Successfully!');
 });
}