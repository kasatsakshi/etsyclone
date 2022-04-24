import path from 'path';
import fs from 'fs';
import AWS from 'aws-sdk';
import { updateOneEntity } from '../models';
import { decodeToken } from '../helpers/auth';
import Shop from '../models/shop';

const BUCKET_NAME = 'cmpe273sakshi';

export const upload = async (requestPayload, callback) => {
  const { input, token } = requestPayload;
  const { files, fields } = input;

  const payload = await decodeToken(token);
  const userId = payload.data.id;
  let avatarUrl = null;

  console.log(files);
  console.log(fields);

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

  const {
    shopId,
  } = fields;

  await updateOneEntity(Shop, { _id: shopId }, { avatarUrl });

  const response = {
    message: 'Image Uplaoded Successfully',
    status: 200,
  };

  callback(null, response);
};
