import bcrypt from 'bcrypt';
import { findOneEntity, updateOneEntity } from '../models';
import { isValidEmail } from '../helpers/validator';
import User from '../models/users';
import { signToken } from '../helpers/auth';

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
    password,
  } = input;

  let errorMsg;
  if (!email) {
    errorMsg = 'Email is missing';
  } else if (!password) {
    errorMsg = 'Password is missing';
  }

  if (!isValidEmail(email)) {
    errorMsg = 'Email is in incorrect format';
  }

  if (errorMsg) {
    return errorMsg;
  }

  return null;
}

export const login = async (input, callback) => {
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
    console.error('Account does not exists!');
    // Adding the below message so someone cannot create fake accounts
    const response = {
      message: 'Invalid Username and Password',
      status: 400,
    }
    callback(null, response);
  }

  const isValidPassword = await bcrypt.compare(trimmedInput.password, findUser.password);
  if (!isValidPassword) {
    console.error('Invalid Username and Password');
    const response = {
      message: 'Invalid Username and Password',
      status: 400,
    }
    callback(null, response);
  } else {
    await updateOneEntity(
      User,
      { _id: findUser._id },
      { lastLoginAt: new Date(), updatedAt: new Date() },
    );
  
    const data = ({ ...findUser }._doc);
    delete data.password;
  
    // Generate JWT token
    const token = await signToken(findUser);
  
    const response = {
      token,
      message: data,
      status: 200,
    }
  
    callback(null, response);
  }
};