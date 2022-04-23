import formidable from 'formidable';
import path from 'path';
import fs from 'fs';
import {
  findOneEntity, updateOneEntity,
} from '../models';
import { decodeToken } from '../helpers/auth';
import User from '../models/users';

export async function updateCurrency(req, res) {
  const input = req.body;
  const token = req.headers.authorization;
  const payload = await decodeToken(token);
  const { id, email } = payload.data;
  const { currency } = input;

  const findUser = await findOneEntity(User, { email });
  // Check if this user exists
  if (!findUser) {
    console.error('User does not exists!');
    return res.status(400).json({ message: 'User does not exists' });
  }

  await updateOneEntity(User, { _id: id }, { currency });

  const findUpdatedUser = await findOneEntity(User, { _id: id });
  const response = ({ ...findUpdatedUser }._doc);
  delete response.password;

  return res.status(200).json(response);
}

export async function update(req, res) {
  const token = req.headers.authorization;
  const payload = await decodeToken(token);
  const userId = payload.data.id;
  // Check incoming validation
  const form = new formidable.IncomingForm();
  form.multiples = true;
  form.maxFileSize = 50 * 1024 * 1024; // 5MB

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: 'Unable to parse Input' });
    }

    const {
      name, bio, address, phone, email, gender, birthday,
    } = fields;
    let { avatarUrl } = fields;
    if (files.avatarUrl) {
      const tempFilePath = files.avatarUrl.filepath;
      const fileName = `image-${Date.now()}${path.extname(files.avatarUrl.originalFilename)}`;
      const uploadedFolder = './public/uploads/';

      if (!fs.existsSync(uploadedFolder)) {
        fs.mkdirSync(uploadedFolder, { recursive: true });
      }

      fs.readFile(tempFilePath, (err, data) => {
        fs.writeFile(uploadedFolder + fileName, data, (err) => {
          fs.unlink(tempFilePath, (err) => {
            if (err) {
              console.error(err);
            }
          });
        });
      });
      const [first, ...rest] = (uploadedFolder + fileName).split('/');
      avatarUrl = rest.join('/');
    }
    const user = await findOneEntity(User, { _id: userId });
    // Check if this user exists
    if (!user) {
      return res.status(400).json({ message: "User doesn't exists" });
    }

    await updateOneEntity(User, { _id: userId }, {
      name, bio, phone, email, address, avatarUrl, gender, birthday, updatedAt: new Date(),
    });

    const findUpdatedUser = await findOneEntity(User, { _id: userId });

    const response = ({ ...findUpdatedUser }._doc);
    delete response.password;

    return res.status(200).json(response);
  });
}
