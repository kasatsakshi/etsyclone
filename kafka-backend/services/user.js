import fs from 'fs';
import path from 'path';
import AWS from 'aws-sdk';
import { isValidEmail } from '../helpers/validator';
import {
  findOneEntity,
  updateOneEntity,
} from '../models';
import { decodeToken } from '../helpers/auth';
import User from '../models/users';

const BUCKET_NAME = 'cmpe273sakshi';

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

  return null;
}

export const user = async (token, callback) => {
  const payload = await decodeToken(token);
  const input = payload.data;
  const trimmedInput = cleanInput(input);
  const inputError = await validateInput(trimmedInput);

  if (inputError) {
    const response = {
      message: inputError,
      status: 400,
    };
    callback(null, response);
  }

  const findUser = await findOneEntity(User, { email: trimmedInput.email });
  // Check if this user email exists
  if (!findUser) {
    console.error('Email does not exists!');
    // Adding the below message so someone cannot create fake accounts
    const response = {
      message: 'User does not exists',
      status: 400,
    };
    callback(null, response);
  }

  const data = ({ ...findUser }._doc);
  delete data.password;

  const response = {
    message: data,
    status: 200,
  };
  callback(null, response);
};

export const updateCurrency = async (inputPayload, callback) => {
  const { token, input } = inputPayload;
  const payload = await decodeToken(token);
  const { id, email } = payload.data;
  const { currency } = input;

  const findUser = await findOneEntity(User, { email });
  // Check if this user exists
  if (!findUser) {
    console.error('User does not exists!');
    const response = {
      message: 'User does not exists',
      status: 400,
    };
    callback(null, response);
  }

  await updateOneEntity(User, { _id: id }, { currency });

  const findUpdatedUser = await findOneEntity(User, { _id: id });
  const data = ({ ...findUpdatedUser }._doc);
  delete data.password;

  const response = {
    message: data,
    status: 200,
  };

  callback(null, response);
};

export const updateUser = async (inputPayload, callback) => {
  const { input, token } = inputPayload;
  const payload = await decodeToken(token);
  const userId = payload.data.id;
  const { files, fields } = input;

  const {
    name, bio, address, phone, email, gender, birthday,
  } = fields;
  let { avatarUrl } = fields;
  if (files.avatarUrl) {
    const s3 = new AWS.S3({
      accessKeyId: 'AKIA3UMIWUHMD2YBFSTL',
      secretAccessKey: '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',
    });

    const tempFilePath = files.avatarUrl.filepath;
    const fileContent = fs.readFileSync(tempFilePath);
    const fileName = `image-${Date.now()}${path.extname(files.avatarUrl.originalFilename)}`;

    // Setting up S3 upload parameters
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName, // File name you want to save as in S3
      Body: fileContent,
    };

    // Uploading files to the bucket
    const data = await s3.upload(params).promise();
    console.log(`User image uploaded successfully. ${data.Location}`);
    avatarUrl = data.Location;
  }
  const user = await findOneEntity(User, { _id: userId });
  // Check if this user exists
  if (!user) {
    console.error('User does not exists!');
    const response = {
      message: 'User does not exists',
      status: 400,
    };
    callback(null, response);
  }

  await updateOneEntity(User, { _id: userId }, {
    name, bio, phone, email, address, avatarUrl, gender, birthday, updatedAt: new Date(),
  });

  const findUpdatedUser = await findOneEntity(User, { _id: userId });

  const data = ({ ...findUpdatedUser }._doc);
  delete data.password;

  const response = {
    message: data,
    status: 200,
  };

  callback(null, response);
};
