import { isValidEmail } from '../helpers/validator';
import {
  findOneEntity,
} from '../models';
import { decodeToken } from '../helpers/auth';
import User from '../models/users';

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
    }
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
    }
    callback(null, response);
  }

  const data = ({ ...findUser }._doc);
  delete data.password;

  const response = {
    message: data,
    status: 200,
  }
  callback(null, response);

}