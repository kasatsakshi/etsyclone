import { findEntity, updateEntity } from "../models";
import { isValidEmail } from "../helpers/validator";
import formidable from 'formidable';
import path from "path";
import fs from "fs";

function cleanInput(input) {
  const {
    email,
  } = input;

  input.email = email.trim();

  return input;
}

async function validateInput(input) {
  const {
    email,
  } = input;

  let errorMsg;
  if (!email) {
    errorMsg = 'Email is missing';
  }

  if (!isValidEmail(email)) {
    errorMsg = 'Email is in incorrect format';
  }

  if (errorMsg) {
    return errorMsg;
  }

  return;
}

export async function user(req, res) {
  const input = req.body;
  const trimmedInput = cleanInput(input);
  const inputError = await validateInput(trimmedInput);

  if (inputError) {
    return res.status(400).json({ message: inputError });
  }

  const findUser = await findEntity('user', ['*'], ['email', trimmedInput.email]);
  //Check if this user email exists
  if (findUser.length === 0) {
    console.error("Email does not exists!");
    // Adding the below message so someone cannot create fake accounts
    return res.status(400).json({ message: "Email does not exists" });
  }

  // TODO: Use joins here
  const address = await findEntity('address', ['*'], ['id', findUser[0].addressId]);
  delete findUser[0].addressId;
  delete findUser[0].password;
  const response = {
    ...findUser[0],
    address: address[0]
  }

  return res.status(200).json(response);
}

export async function update(req, res) {
  //Check incoming validation
  const form = new formidable.IncomingForm();
  form.multiples = true;
  form.maxFileSize = 50 * 1024 * 1024; // 5MB

  form.parse(req, async (err, fields, files) => {
    if(err) {
      console.log(err);
      return res.status(400).json({message: "Unable to parse Input"});
    }

    const {userId, name, bio, address1, address2, city, state, country, zipcode, phone, email, gender, birthday } = fields;
    let {avatarUrl} = fields;
    if(files.avatarUrl) {
      const tempFilePath = files.avatarUrl.filepath;
      const fileName = "image-" + Date.now() + path.extname(files.avatarUrl.originalFilename);
      const uploadedFolder = './public/uploads/';

      if (!fs.existsSync(uploadedFolder)){
        fs.mkdirSync(uploadedFolder, { recursive: true });  
      }

      fs.readFile(tempFilePath, function(err, data) {
        fs.writeFile(uploadedFolder + fileName, data, function(err) {
            fs.unlink(tempFilePath, function(err) {
                if (err) {
                  console.error(err);
                }
            });
        });
      });
      const [first, ...rest] = (uploadedFolder + fileName).split('/');
      avatarUrl = rest.join('/');
    } 
    const user = await findEntity('user', ['*'], ['id', parseInt(userId)]);
    //Check if this user id exists
    if(user.length === 0) {
      return res.status(400).json({message: "User doesn't exists"});
    }

    await updateEntity('address', {address1, address2, city, state, country, zipcode}, ['id', user[0].addressId])
    await updateEntity('user',{name, bio, phone, email, avatarUrl, gender, birthday },['id', userId] )

    const findAddress = await findEntity('address', ['*'], ['id', user[0].addressId]);
    const findUpdatedUser = await findEntity('user', ['*'], ['id', parseInt(userId)]);
    delete findUpdatedUser[0].addressId;
    delete findUpdatedUser[0].password;
    const response = {
      ...findUpdatedUser[0],
      address: findAddress[0]
    }
    return res.status(200).json(response);
  });
}
